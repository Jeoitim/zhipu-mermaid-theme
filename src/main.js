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
const renderWidth = $("#render-width");
const renderWidthValue = $("#render-width-value");
const renderWidthPopover = $("#render-width-popover");
const widthToggle = $("#width-toggle");
const layoutControl = $("#layout-control");
const themeToggle = $("#theme-toggle");

const presets = {
  timeline: `timeline
    title 产品演进
    section 起步
        需求验证与用户访谈 : 验证产品方向并形成最小可行产品方案
        第一版正式发布 : 完成核心功能开发、联调与上线
    section 成长
        体验与性能持续优化 : 完善复杂场景下的交互体验与响应性能
        规模化推广 : 扩展更多业务场景并建立稳定运营体系`,
  flowchart: `flowchart LR
    A[需求分析] --> B{方案评审}
    B -->|通过| C[开发实现]
    B -->|调整| E[修改方案]
    E --> C
    C --> D[上线发布]`,
  sequence: `sequenceDiagram
    actor U as 用户
    participant W as Web 应用
    participant A as API
    U->>W: 提交请求
    W->>A: 校验并处理
    A-->>W: 返回结果
    W-->>U: 更新界面`,
  class: `classDiagram
    class User {
      +String name
      +login()
    }
    class Order {
      +String id
      +checkout()
    }
    User "1" --> "many" Order : creates`,
  state: `stateDiagram-v2
    [*] --> Idle
    Idle --> Loading : 提交
    Loading --> Success : 成功
    Loading --> Error : 失败
    Error --> Loading : 重试
    Success --> [*]`,
  er: `erDiagram
    USER ||--o{ ORDER : places
    ORDER ||--|{ ORDER_ITEM : contains
    PRODUCT ||--o{ ORDER_ITEM : includes
    USER {
      string id PK
      string name
    }
    ORDER {
      string id PK
      date createdAt
    }`,
  gantt: `gantt
    title 项目计划
    dateFormat YYYY-MM-DD
    section 设计
    信息架构 :done, a1, 2026-08-01, 5d
    视觉设计 :active, a2, after a1, 6d
    section 开发
    前端实现 :crit, a3, 2026-08-10, 8d
    联调上线 :a4, after a3, 4d`,
  pie: `pie showData
    title 用户来源
    "自然搜索" : 42
    "内容推荐" : 28
    "合作渠道" : 18
    "直接访问" : 12`,
  journey: `journey
    title 用户购买旅程
    section 浏览
      发现产品: 5: 用户
      查看详情: 4: 用户
    section 购买
      加入购物车: 4: 用户
      完成支付: 3: 用户`,
  git: `gitGraph
    commit id: "初始化"
    branch develop
    checkout develop
    commit id: "新功能"
    checkout main
    merge develop
    commit id: "发布"`,
  mindmap: `mindmap
  root((产品规划))
    用户研究
      访谈
      数据分析
    产品设计
      信息架构
      交互原型
    研发交付
      开发
      测试`,
  quadrant: `quadrantChart
    title 功能优先级
    x-axis 低投入 --> 高投入
    y-axis 低价值 --> 高价值
    quadrant-1 重点项目
    quadrant-2 快速收益
    quadrant-3 暂缓
    quadrant-4 谨慎评估
    搜索优化: [0.28, 0.82]
    推荐系统: [0.72, 0.88]
    视觉升级: [0.35, 0.46]`,
  xychart: `xychart-beta
    title "月度活跃用户"
    x-axis "月份" [1, 2, 3, 4, 5, 6]
    y-axis "用户数" 0 --> 100
    bar [32, 45, 52, 68, 76, 91]
    line [28, 39, 58, 64, 82, 95]`,
  requirement: `requirementDiagram
    requirement login_requirement {
      id: 1
      text: "用户可以安全登录"
      risk: high
      verifymethod: test
    }
    element login_service {
      type: service
    }
    login_service - satisfies -> login_requirement`,
  kanban: `kanban
    todo[待办]
      task1[需求分析]
      task2[交互设计]
    doing[进行中]
      task3[前端开发]
    done[已完成]
      task4[项目初始化]`,
  block: `block-beta
    columns 5
    A["输入"] space B["处理"] space C["输出"]
    A --> B
    B --> C`,
};

monaco.languages.register({ id: "mermaid" });
monaco.languages.setMonarchTokensProvider("mermaid", {
  tokenizer: {
    root: [
      [/^\s*(flowchart|graph|sequenceDiagram|classDiagram|stateDiagram(?:-v2)?|erDiagram|journey|gantt|pie|timeline|mindmap|quadrantChart|xychart-beta|requirementDiagram|gitGraph|kanban|block-beta)\b/, "keyword.diagram"],
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
monaco.editor.defineTheme("mermaid-live-dark", {
  base: "vs-dark",
  inherit: true,
  rules: [
    { token: "keyword.diagram", foreground: "FF86AA", fontStyle: "bold" },
    { token: "keyword", foreground: "C4B5FD" },
    { token: "keyword.control", foreground: "7DD3FC" },
    { token: "type.identifier", foreground: "86EFAC" },
    { token: "operator", foreground: "FDA4AF" },
    { token: "constant", foreground: "FDE68A" },
  ],
  colors: {
    "editor.background": "#0F1117",
    "editorGutter.background": "#0F1117",
    "editorLineNumber.foreground": "#596273",
    "editorLineNumber.activeForeground": "#D4D8E0",
    "editor.selectionBackground": "#7C234366",
    "editor.lineHighlightBackground": "#171A22",
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

let currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";

const editor = monaco.editor.create($("#source-editor"), {
  value: initialSource,
  language: "mermaid",
  theme: currentTheme === "dark" ? "mermaid-live-dark" : "mermaid-live",
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
const savedRenderWidth = Number.parseInt(localStorage.getItem("mermaid-render-width"), 10);
const defaultRenderWidth = 480;
renderWidth.value = String(Number.isFinite(savedRenderWidth) ? Math.max(320, Math.min(2000, savedRenderWidth)) : defaultRenderWidth);
renderWidthValue.value = `${renderWidth.value}px`;

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

function detectDiagramKey(text = sourceValue()) {
  const first = text.split("\n").map((line) => line.trim()).find((line) => line && !line.startsWith("%%") && !line.startsWith("#")) || "";
  const type = first.split(/\s+/)[0].toLowerCase();
  if (type === "graph" || type === "flowchart") return "flowchart";
  if (type === "sequencediagram") return "sequence";
  if (type === "classdiagram") return "class";
  if (type === "statediagram" || type === "statediagram-v2") return "state";
  if (type === "erdiagram") return "er";
  if (type === "gitgraph") return "git";
  if (type === "quadrantchart") return "quadrant";
  if (type === "xychart-beta") return "xychart";
  if (type === "requirementdiagram") return "requirement";
  if (type === "block-beta") return "block";
  return Object.hasOwn(presets, type) ? type : "custom";
}

function syncPresetToSource() {
  const detected = detectDiagramKey();
  preset.value = detected;
  layoutControl.classList.toggle("is-hidden", detected !== "timeline");
  widthToggle.hidden = detected !== "timeline";
  if (detected !== "timeline") {
    renderWidthPopover.hidden = true;
    widthToggle.setAttribute("aria-expanded", "false");
  }
}

function diagramType(text = sourceValue()) {
  const value = detectDiagramKey(text);
  return value === "custom" ? "diagram" : value;
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
    const isTimeline = detectDiagramKey() === "timeline";
    const width = isTimeline
      ? Number.parseInt(renderWidth.value, 10)
      : Math.max(320, Math.floor(previewSurface.clientWidth - 48));
    const svg = await renderZhipuMermaid(mermaid, preview, sourceValue(), { layout: layout.value, width, mode: currentTheme });
    if (sequence !== renderSequence || !svg) return;
    const size = svgSize(svg);
    naturalWidth = isTimeline ? width : size.width;
    naturalHeight = isTimeline ? Math.max(1, Math.round(width * size.height / size.width)) : size.height;
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

editor.onDidChangeModelContent(() => { syncPresetToSource(); scheduleRender(); });
layout.addEventListener("change", renderDiagram);
preset.addEventListener("change", () => {
  if (!presets[preset.value]) return;
  editor.setValue(presets[preset.value]);
  renderDiagram();
});
renderWidth.addEventListener("input", () => {
  renderWidthValue.value = `${renderWidth.value}px`;
  localStorage.setItem("mermaid-render-width", renderWidth.value);
  scheduleRender();
});
widthToggle.addEventListener("click", () => {
  renderWidthPopover.hidden = !renderWidthPopover.hidden;
  widthToggle.setAttribute("aria-expanded", String(!renderWidthPopover.hidden));
});
document.addEventListener("pointerdown", (event) => {
  if (renderWidthPopover.hidden || renderWidthPopover.contains(event.target) || widthToggle.contains(event.target)) return;
  renderWidthPopover.hidden = true;
  widthToggle.setAttribute("aria-expanded", "false");
});
themeToggle.addEventListener("click", () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = currentTheme;
  localStorage.setItem("mermaid-editor-theme", currentTheme);
  monaco.editor.setTheme(currentTheme === "dark" ? "mermaid-live-dark" : "mermaid-live");
  renderDiagram();
});
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
  if (event.key === "Escape") {
    renderWidthPopover.hidden = true;
    widthToggle.setAttribute("aria-expanded", "false");
    actionsMenu.open = false;
    return;
  }
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
syncPresetToSource();
try {
  await renderDiagram();
} finally {
  requestAnimationFrame(() => document.documentElement.classList.add("app-ready"));
}
