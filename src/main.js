import "./style.css";
import { Canvg } from "canvg";
import { initializeZhipuMermaid, renderZhipuMermaid } from "./zhipu-mermaid-theme.js";

const mermaid = globalThis.mermaid;
initializeZhipuMermaid(mermaid);

const $ = (selector) => document.querySelector(selector);
const source = $("#source");
const preset = $("#preset");
const layout = $("#layout");
const preview = $("#preview");
const previewSurface = $("#preview-surface");
const previewTransform = $("#preview-transform");
const renderError = $("#render-error");
const renderIndicator = $("#render-indicator");
const renderStatus = $("#render-status");
const diagramMeta = $("#diagram-meta");
const sourceMeta = $("#source-meta");
const zoomLevel = $("#zoom-level");
const exportMenu = $("#export-menu");
const toast = $("#toast");

const presets = {
  timeline: `timeline
    title 产品演进
    section 起步
        需求验证与用户访谈 : 验证产品方向并形成最小可行产品方案
        第一版正式发布 : 完成核心功能开发、联调与上线
    section 成长
        体验与性能持续优化 : 完善复杂场景下的交互体验与响应性能
        规模化推广 : 扩展更多业务场景并建立稳定运营体系`,
  graph: `flowchart LR
    A[需求分析] --> B{方案评审}
    B -->|通过| C[开发实现]
    B -->|调整| E[修改方案]
    E --> C
    C --> D[上线发布]`,
  gantt: `gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    section 设计
    信息架构 :done, a1, 2026-08-01, 5d
    视觉设计 :active, a2, after a1, 6d
    section 开发
    前端实现 :crit, a3, 2026-08-10, 8d
    联调上线 :a4, after a3, 4d`,
};

const viewport = {
  scale: 1, x: 0, y: 0, naturalWidth: 640, naturalHeight: 400,
  autoFit: true, dragging: false, pointerX: 0, pointerY: 0,
};

let renderTimer;
let toastTimer;
let renderSequence = 0;

function diagramType(text = source.value) {
  const value = text.trim().split(/\s+/)[0] || "diagram";
  return value === "graph" || value === "flowchart" ? "Flowchart" : value[0]?.toUpperCase() + value.slice(1);
}

function updateSourceMeta() {
  sourceMeta.textContent = `${diagramType()} · ${source.value.split("\n").length} 行`;
}

function setRenderState(state, message) {
  renderIndicator.className = `status-dot ${state}`;
  renderStatus.textContent = message;
}

function notify(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1500);
}

function applyViewport() {
  previewTransform.style.transform = `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.scale})`;
  zoomLevel.textContent = `${Math.round(viewport.scale * 100)}%`;
}

function svgSize(svg) {
  const viewBox = svg.viewBox?.baseVal;
  const width = viewBox?.width || Number.parseFloat(svg.getAttribute("width")) || svg.getBBox().width || 640;
  const height = viewBox?.height || Number.parseFloat(svg.getAttribute("height")) || svg.getBBox().height || 400;
  return { width: Math.max(1, width), height: Math.max(1, height) };
}

function prepareCanvasSvg(svg) {
  const size = svgSize(svg);
  viewport.naturalWidth = size.width;
  viewport.naturalHeight = size.height;
  preview.style.width = `${size.width}px`;
  preview.style.height = `${size.height}px`;
  svg.style.width = `${size.width}px`;
  svg.style.height = `${size.height}px`;
  svg.setAttribute("width", size.width);
  svg.setAttribute("height", size.height);
  diagramMeta.textContent = `${diagramType()} · ${Math.round(size.width)} × ${Math.round(size.height)} px`;
}

function fitDiagram() {
  const bounds = previewSurface.getBoundingClientRect();
  if (!bounds.width || !bounds.height || !preview.querySelector("svg")) return;
  const padding = bounds.width < 520 ? 24 : 56;
  viewport.scale = Math.min(
    (bounds.width - padding * 2) / viewport.naturalWidth,
    (bounds.height - padding * 2) / viewport.naturalHeight,
    2,
  );
  viewport.scale = Math.max(0.05, viewport.scale);
  viewport.x = (bounds.width - viewport.naturalWidth * viewport.scale) / 2;
  viewport.y = (bounds.height - viewport.naturalHeight * viewport.scale) / 2;
  viewport.autoFit = true;
  applyViewport();
}

function setActualSize() {
  const bounds = previewSurface.getBoundingClientRect();
  viewport.scale = 1;
  viewport.x = (bounds.width - viewport.naturalWidth) / 2;
  viewport.y = (bounds.height - viewport.naturalHeight) / 2;
  viewport.autoFit = false;
  applyViewport();
}

function zoomTo(nextScale, clientX, clientY) {
  const oldScale = viewport.scale;
  const next = Math.min(6, Math.max(0.05, nextScale));
  const bounds = previewSurface.getBoundingClientRect();
  const anchorX = clientX == null ? bounds.width / 2 : clientX - bounds.left;
  const anchorY = clientY == null ? bounds.height / 2 : clientY - bounds.top;
  const worldX = (anchorX - viewport.x) / oldScale;
  const worldY = (anchorY - viewport.y) / oldScale;
  viewport.scale = next;
  viewport.x = anchorX - worldX * next;
  viewport.y = anchorY - worldY * next;
  viewport.autoFit = false;
  applyViewport();
}

async function renderDiagram() {
  const sequence = ++renderSequence;
  clearTimeout(renderTimer);
  setRenderState("busy", "渲染中…");
  renderError.hidden = true;
  updateSourceMeta();
  localStorage.setItem("zhipu-mermaid-source", source.value);
  localStorage.setItem("zhipu-mermaid-layout", layout.value);
  try {
    const width = Math.max(320, Math.floor(previewSurface.clientWidth - 64));
    const svg = await renderZhipuMermaid(mermaid, preview, source.value, { layout: layout.value, width });
    if (sequence !== renderSequence || !svg) return;
    prepareCanvasSvg(svg);
    requestAnimationFrame(fitDiagram);
    setRenderState("ready", "已更新");
  } catch (error) {
    if (sequence !== renderSequence) return;
    preview.replaceChildren();
    renderError.textContent = error.message;
    renderError.hidden = false;
    diagramMeta.textContent = "语法错误";
    setRenderState("error", "渲染失败");
  }
}

function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(renderDiagram, 220);
}

function currentSvg() { return preview.querySelector("svg"); }

function serializedSvg(width = viewport.naturalWidth, height = viewport.naturalHeight) {
  const svg = currentSvg();
  if (!svg) return "";
  const clone = svg.cloneNode(true);
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", width);
  clone.setAttribute("height", height);
  clone.style.width = "";
  clone.style.height = "";
  return new XMLSerializer().serializeToString(clone);
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function fileBase() { return `${diagramType().toLowerCase()}-diagram`; }

async function exportPng() {
  const maxSide = 8192;
  const factor = Math.min(2, maxSide / viewport.naturalWidth, maxSide / viewport.naturalHeight);
  const width = Math.round(viewport.naturalWidth * factor);
  const height = Math.round(viewport.naturalHeight * factor);
  const markup = serializedSvg(width, height);
  if (!markup) return;
  try {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const renderer = await Canvg.fromString(canvas.getContext("2d"), markup, {
      ignoreAnimation: true,
      ignoreMouse: true,
    });
    await renderer.render();
    canvas.toBlob((png) => png && downloadBlob(png, `${fileBase()}@2x.png`), "image/png");
  } catch (error) {
    console.error("PNG export failed", error);
    notify("PNG 导出失败");
  }
}

function encodeSource(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decodeSource(value) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  return new TextDecoder().decode(Uint8Array.from(binary, (char) => char.charCodeAt(0)));
}

source.addEventListener("input", scheduleRender);
layout.addEventListener("change", renderDiagram);
preset.addEventListener("change", () => { source.value = presets[preset.value]; renderDiagram(); });
$("#zoom-in").addEventListener("click", () => zoomTo(viewport.scale * 1.2));
$("#zoom-out").addEventListener("click", () => zoomTo(viewport.scale / 1.2));
zoomLevel.addEventListener("click", setActualSize);
$("#fit").addEventListener("click", fitDiagram);
previewSurface.addEventListener("dblclick", fitDiagram);
previewSurface.addEventListener("wheel", (event) => {
  event.preventDefault();
  zoomTo(viewport.scale * Math.exp(-event.deltaY * 0.0015), event.clientX, event.clientY);
}, { passive: false });

previewSurface.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  viewport.dragging = true;
  viewport.pointerX = event.clientX;
  viewport.pointerY = event.clientY;
  viewport.autoFit = false;
  previewSurface.classList.add("dragging");
  previewSurface.setPointerCapture(event.pointerId);
});
previewSurface.addEventListener("pointermove", (event) => {
  if (!viewport.dragging) return;
  viewport.x += event.clientX - viewport.pointerX;
  viewport.y += event.clientY - viewport.pointerY;
  viewport.pointerX = event.clientX;
  viewport.pointerY = event.clientY;
  applyViewport();
});
function stopDragging(event) {
  viewport.dragging = false;
  previewSurface.classList.remove("dragging");
  if (event.pointerId != null && previewSurface.hasPointerCapture(event.pointerId)) previewSurface.releasePointerCapture(event.pointerId);
}
previewSurface.addEventListener("pointerup", stopDragging);
previewSurface.addEventListener("pointercancel", stopDragging);

$("#copy-source").addEventListener("click", async () => { await navigator.clipboard.writeText(source.value); notify("源码已复制"); });
$("#copy-svg").addEventListener("click", async () => { await navigator.clipboard.writeText(serializedSvg()); exportMenu.open = false; notify("SVG 已复制"); });
$("#download-svg").addEventListener("click", () => { downloadBlob(new Blob([serializedSvg()], { type: "image/svg+xml;charset=utf-8" }), `${fileBase()}.svg`); exportMenu.open = false; });
$("#download-png").addEventListener("click", () => { exportPng(); exportMenu.open = false; });
$("#download-source").addEventListener("click", () => { downloadBlob(new Blob([source.value], { type: "text/plain;charset=utf-8" }), `${fileBase()}.mmd`); exportMenu.open = false; });
$("#share-link").addEventListener("click", async () => {
  const url = new URL(location.href);
  url.hash = `code=${encodeSource(source.value)}`;
  history.replaceState(null, "", url);
  await navigator.clipboard.writeText(url.href);
  exportMenu.open = false;
  notify("分享链接已复制");
});
$("#fullscreen").addEventListener("click", async () => {
  if (document.fullscreenElement) await document.exitFullscreen();
  else await $("#preview-pane").requestFullscreen();
  requestAnimationFrame(fitDiagram);
});

document.addEventListener("keydown", (event) => {
  if (!(event.ctrlKey || event.metaKey)) return;
  if (event.key === "Enter") { event.preventDefault(); renderDiagram(); }
  if (event.key === "0") { event.preventDefault(); fitDiagram(); }
  if (event.key === "+" || event.key === "=") { event.preventDefault(); zoomTo(viewport.scale * 1.2); }
  if (event.key === "-") { event.preventDefault(); zoomTo(viewport.scale / 1.2); }
});

new ResizeObserver(() => { if (viewport.autoFit) fitDiagram(); }).observe(previewSurface);

const shared = new URL(location.href).hash.match(/^#code=(.+)$/)?.[1];
if (shared) {
  try { source.value = decodeSource(shared); } catch { /* Ignore malformed shared links. */ }
} else {
  source.value = localStorage.getItem("zhipu-mermaid-source") || source.value;
}
layout.value = localStorage.getItem("zhipu-mermaid-layout") || "auto";
updateSourceMeta();
await renderDiagram();
