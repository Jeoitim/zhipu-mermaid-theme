import "./style.css";
import { Canvg } from "canvg";
import Hammer from "hammerjs";
import svgPanZoom from "svg-pan-zoom";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker";
import { initializeZhipuMermaid, renderZhipuMermaid } from "./zhipu-mermaid-theme.js";

self.MonacoEnvironment = { getWorker: () => new EditorWorker() };

const mermaid = globalThis.mermaid;
initializeZhipuMermaid(mermaid);

const $ = (selector) => document.querySelector(selector);
const preset = $("#preset");
const layout = $("#layout");
const preview = $("#preview");
const previewSurface = $("#preview-surface");
const renderError = $("#render-error");
const zoomLevel = $("#zoom-level");
const actionsMenu = $("#actions-menu");
const toast = $("#toast");
const editorShell = $("#editor-shell");
const splitHandle = $("#split-handle");

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

monaco.languages.register({ id: "mermaid" });
monaco.languages.setMonarchTokensProvider("mermaid", {
  tokenizer: {
    root: [
      [/^\s*(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram-v2|erDiagram|journey|gantt|pie|timeline|mindmap|quadrantChart|xychart-beta)\b/, "keyword.diagram"],
      [/^\s*(title|section|dateFormat|axisFormat|excludes|todayMarker)\b/, "keyword"],
      [/\b(subgraph|end|participant|actor|as|loop|alt|else|opt|par|and|rect|note|over|left of|right of)\b/, "keyword.control"],
      [/%%.*$/, "comment"],
      [/[A-Za-z_][\w-]*(?=\s*[\[{(])/, "type.identifier"],
      [/(-->|---|-.->|==>|--x|--o|<-->|:)/, "operator"],
      [/\b(done|active|crit|milestone)\b/, "constant"],
      [/\d{4}-\d{2}-\d{2}|\b\d+(?:\.\d+)?(?:d|h|m|s|%)?\b/, "number"],
      [/"[^"\\]*(?:\\.[^"\\]*)*"/, "string"],
    ],
  },
});
monaco.editor.defineTheme("mermaid-live", {
  base: "vs",
  inherit: true,
  rules: [
    { token: "keyword.diagram", foreground: "A3156B", fontStyle: "bold" },
    { token: "keyword", foreground: "7C3AED" },
    { token: "keyword.control", foreground: "0066B8" },
    { token: "type.identifier", foreground: "16825D" },
    { token: "operator", foreground: "C24170" },
    { token: "constant", foreground: "9A6700" },
  ],
  colors: {
    "editor.background": "#FFFFFF",
    "editorGutter.background": "#FFFFFF",
    "editorLineNumber.foreground": "#A0A7B4",
    "editorLineNumber.activeForeground": "#4B5563",
    "editor.selectionBackground": "#FBCFE8",
    "editor.lineHighlightBackground": "#F8FAFC",
  },
});

function encodeSource(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function decodeSource(value) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  return new TextDecoder().decode(Uint8Array.from(atob(padded), (char) => char.charCodeAt(0)));
}

const shared = new URL(location.href).hash.match(/^#code=(.+)$/)?.[1];
let initialSource = localStorage.getItem("zhipu-mermaid-source") || presets.timeline;
if (shared) {
  try { initialSource = decodeSource(shared); } catch { /* Ignore malformed links. */ }
}

const editor = monaco.editor.create($("#source-editor"), {
  value: initialSource,
  language: "mermaid",
  theme: "mermaid-live",
  automaticLayout: true,
  minimap: { enabled: false },
  fontFamily: '"Cascadia Code", "SFMono-Regular", Consolas, monospace',
  fontSize: 13.5,
  lineHeight: 23,
  lineNumbersMinChars: 3,
  padding: { top: 16, bottom: 32 },
  renderLineHighlight: "line",
  scrollBeyondLastLine: false,
  smoothScrolling: true,
  wordWrap: "off",
  tabSize: 2,
});

layout.value = localStorage.getItem("zhipu-mermaid-layout") || "auto";

let renderTimer;
let toastTimer;
let renderSequence = 0;
let exportSvgMarkup = "";
let naturalWidth = 640;
let naturalHeight = 400;
let panZoom;
let hammer;
let viewDirty = false;
let suppressViewEvents = false;

function sourceValue() { return editor.getValue(); }

function diagramType(text = sourceValue()) {
  const value = text.trim().split(/\s+/)[0] || "diagram";
  return value === "graph" || value === "flowchart" ? "Flowchart" : value[0]?.toUpperCase() + value.slice(1);
}

function setRenderState(state) {
  previewSurface.setAttribute("aria-busy", state === "busy" ? "true" : "false");
}

function notify(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1600);
}

function svgSize(svg) {
  const viewBox = svg.viewBox?.baseVal;
  const box = (() => { try { return svg.getBBox(); } catch { return null; } })();
  return {
    width: Math.max(1, viewBox?.width || Number.parseFloat(svg.getAttribute("width")) || box?.width || 640),
    height: Math.max(1, viewBox?.height || Number.parseFloat(svg.getAttribute("height")) || box?.height || 400),
  };
}

function destroyPanZoom() {
  hammer?.destroy();
  hammer = undefined;
  panZoom?.destroy();
  panZoom = undefined;
}

function updateZoomLabel(zoom = panZoom?.getZoom() || 1) {
  zoomLevel.textContent = `${Math.round(zoom * 100)}%`;
}

function resetView() {
  if (!panZoom) return;
  suppressViewEvents = true;
  panZoom.resize();
  panZoom.reset();
  panZoom.fit();
  panZoom.center();
  viewDirty = false;
  updateZoomLabel();
  requestAnimationFrame(() => { suppressViewEvents = false; viewDirty = false; });
}

function attachPanZoom(svg) {
  destroyPanZoom();
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.style.width = "100%";
  svg.style.height = "100%";
  svg.style.maxWidth = "none";
  panZoom = svgPanZoom(svg, {
    center: true,
    controlIconsEnabled: false,
    fit: true,
    minZoom: 0.05,
    maxZoom: 20,
    zoomScaleSensitivity: 0.2,
    dblClickZoomEnabled: false,
    preventMouseEventsDefault: true,
    customEventsHandler: {
      haltEventListeners: ["touchstart", "touchend", "touchmove", "touchleave", "touchcancel"],
      init(options) {
        const instance = options.instance;
        let initialScale = 1;
        let pannedX = 0;
        let pannedY = 0;
        hammer = new Hammer(options.svgElement);
        hammer.get("pinch").set({ enable: true });
        hammer.on("panstart panmove", (event) => {
          if (event.type === "panstart") { pannedX = 0; pannedY = 0; }
          instance.panBy({ x: event.deltaX - pannedX, y: event.deltaY - pannedY });
          pannedX = event.deltaX; pannedY = event.deltaY;
        });
        hammer.on("pinchstart pinchmove", (event) => {
          if (event.type === "pinchstart") { initialScale = instance.getZoom(); pannedX = 0; pannedY = 0; }
          instance.zoomAtPoint(initialScale * event.scale, { x: event.center.x, y: event.center.y });
          instance.panBy({ x: event.deltaX - pannedX, y: event.deltaY - pannedY });
          pannedX = event.deltaX; pannedY = event.deltaY;
        });
      },
      destroy() { hammer?.destroy(); hammer = undefined; },
    },
    onPan() { if (!suppressViewEvents) viewDirty = true; },
    onZoom(zoom) { if (!suppressViewEvents) viewDirty = true; updateZoomLabel(zoom); },
  });
  panZoom.disableDblClickZoom();
  resetView();
}

async function renderDiagram() {
  const sequence = ++renderSequence;
  setRenderState("busy");
  renderError.hidden = true;
  localStorage.setItem("zhipu-mermaid-source", sourceValue());
  localStorage.setItem("zhipu-mermaid-layout", layout.value);
  try {
    destroyPanZoom();
    const width = Math.max(320, Math.floor(previewSurface.clientWidth - 48));
    const svg = await renderZhipuMermaid(mermaid, preview, sourceValue(), { layout: layout.value, width });
    if (sequence !== renderSequence || !svg) return;
    const size = svgSize(svg);
    naturalWidth = size.width;
    naturalHeight = size.height;
    const exportClone = svg.cloneNode(true);
    exportClone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    exportClone.setAttribute("width", naturalWidth);
    exportClone.setAttribute("height", naturalHeight);
    exportClone.style.width = "";
    exportClone.style.height = "";
    exportSvgMarkup = new XMLSerializer().serializeToString(exportClone);
    attachPanZoom(svg);
    setRenderState("ready");
  } catch (error) {
    if (sequence !== renderSequence) return;
    destroyPanZoom();
    preview.replaceChildren();
    renderError.textContent = error.message;
    renderError.hidden = false;
    setRenderState("error");
  }
}

function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(renderDiagram, 220);
}

function serializedSvg(width = naturalWidth, height = naturalHeight) {
  if (!exportSvgMarkup) return "";
  const documentSvg = new DOMParser().parseFromString(exportSvgMarkup, "image/svg+xml").documentElement;
  documentSvg.setAttribute("width", width);
  documentSvg.setAttribute("height", height);
  return new XMLSerializer().serializeToString(documentSvg);
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
  const requestedWidth = document.querySelector('input[name="png-size"]:checked')?.value === "width"
    ? Number.parseInt($("#png-width").value, 10) : Math.round(naturalWidth * 2);
  const width = Math.min(10000, Math.max(3, requestedWidth || naturalWidth * 2));
  const height = Math.round(width * naturalHeight / naturalWidth);
  try {
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const renderer = await Canvg.fromString(canvas.getContext("2d"), serializedSvg(width, height), { ignoreAnimation: true, ignoreMouse: true });
    await renderer.render();
    canvas.toBlob((png) => png && downloadBlob(png, `${fileBase()}.png`), "image/png");
  } catch (error) {
    console.error("PNG export failed", error);
    notify("PNG 导出失败");
  }
}

editor.onDidChangeModelContent(scheduleRender);
layout.addEventListener("change", renderDiagram);
preset.addEventListener("change", () => { editor.setValue(presets[preset.value]); renderDiagram(); });
$("#zoom-in").addEventListener("click", () => panZoom?.zoomIn());
$("#zoom-out").addEventListener("click", () => panZoom?.zoomOut());
zoomLevel.addEventListener("click", resetView);
$("#fit").addEventListener("click", resetView);
previewSurface.addEventListener("dblclick", resetView);

$("#copy-source").addEventListener("click", async () => { await navigator.clipboard.writeText(sourceValue()); actionsMenu.open = false; notify("源码已复制"); });
$("#copy-svg").addEventListener("click", async () => { await navigator.clipboard.writeText(serializedSvg()); actionsMenu.open = false; notify("SVG 已复制"); });
$("#download-svg").addEventListener("click", () => { downloadBlob(new Blob([serializedSvg()], { type: "image/svg+xml;charset=utf-8" }), `${fileBase()}.svg`); actionsMenu.open = false; });
$("#download-png").addEventListener("click", () => { exportPng(); actionsMenu.open = false; });
$("#download-source").addEventListener("click", () => { downloadBlob(new Blob([sourceValue()], { type: "text/plain;charset=utf-8" }), `${fileBase()}.mmd`); actionsMenu.open = false; });
$("#share-link").addEventListener("click", async () => {
  const url = new URL(location.href);
  url.hash = `code=${encodeSource(sourceValue())}`;
  history.replaceState(null, "", url);
  await navigator.clipboard.writeText(url.href);
  actionsMenu.open = false;
  notify("分享链接已复制");
});
$("#fullscreen").addEventListener("click", async () => {
  if (document.fullscreenElement) await document.exitFullscreen();
  else await $("#preview-pane").requestFullscreen();
  requestAnimationFrame(resetView);
});
document.querySelectorAll('input[name="png-size"]').forEach((input) => input.addEventListener("change", () => {
  $("#png-width").disabled = document.querySelector('input[name="png-size"]:checked')?.value !== "width";
}));

document.addEventListener("keydown", (event) => {
  if (!(event.ctrlKey || event.metaKey)) return;
  if (event.key === "Enter") { event.preventDefault(); renderDiagram(); }
  if (event.key === "0") { event.preventDefault(); resetView(); }
  if (event.key === "+" || event.key === "=") { event.preventDefault(); panZoom?.zoomIn(); }
  if (event.key === "-") { event.preventDefault(); panZoom?.zoomOut(); }
});

let splitting = false;
function setSplit(clientX) {
  const bounds = editorShell.getBoundingClientRect();
  const percent = Math.min(75, Math.max(25, ((clientX - bounds.left) / bounds.width) * 100));
  editorShell.style.setProperty("--editor-width", `${percent}%`);
  localStorage.setItem("zhipu-mermaid-split", String(percent));
}
splitHandle.addEventListener("pointerdown", (event) => { splitting = true; splitHandle.setPointerCapture(event.pointerId); document.body.classList.add("resizing"); });
splitHandle.addEventListener("pointermove", (event) => { if (splitting) setSplit(event.clientX); });
splitHandle.addEventListener("pointerup", (event) => { splitting = false; splitHandle.releasePointerCapture(event.pointerId); document.body.classList.remove("resizing"); panZoom?.resize(); if (!viewDirty) resetView(); });
splitHandle.addEventListener("dblclick", () => { editorShell.style.setProperty("--editor-width", "50%"); localStorage.removeItem("zhipu-mermaid-split"); requestAnimationFrame(resetView); });
splitHandle.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
  const current = Number.parseFloat(getComputedStyle(editorShell).getPropertyValue("--editor-width")) || 50;
  editorShell.style.setProperty("--editor-width", `${Math.min(75, Math.max(25, current + (event.key === "ArrowLeft" ? -2 : 2)))}%`);
  requestAnimationFrame(() => panZoom?.resize());
});

const savedSplit = Number.parseFloat(localStorage.getItem("zhipu-mermaid-split"));
if (Number.isFinite(savedSplit)) editorShell.style.setProperty("--editor-width", `${Math.min(75, Math.max(25, savedSplit))}%`);
new ResizeObserver(() => { panZoom?.resize(); if (!viewDirty) resetView(); }).observe(previewSurface);
await renderDiagram();
