import "./style.css";
import { initializeZhipuMermaid, renderZhipuMermaid } from "./zhipu-mermaid-theme.js";

const mermaid = globalThis.mermaid;
initializeZhipuMermaid(mermaid);

const source = document.querySelector("#source");
const preset = document.querySelector("#preset");
const layout = document.querySelector("#layout");
const width = document.querySelector("#width");
const widthOutput = document.querySelector("#width-output");
const previewFrame = document.querySelector("#preview-frame");
const preview = document.querySelector("#preview");
const renderButton = document.querySelector("#render");
const copySvgButton = document.querySelector("#copy-svg");
const downloadSvgButton = document.querySelector("#download-svg");

const presets = {
  timeline: `timeline
    title 产品演进
    section 起步
        需求验证与用户访谈 : 验证产品方向并形成最小可行产品方案
        第一版正式发布 : 完成核心功能开发、联调与上线
    section 成长
        体验与性能持续优化 : 完善复杂场景下的交互体验与响应性能
        规模化推广 : 扩展更多业务场景并建立稳定运营体系`,
  graph: `graph TD
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

async function renderTimeline() {
  const selectedWidth = Number(width.value);
  widthOutput.value = `${selectedWidth}px`;
  previewFrame.style.width = `${selectedWidth}px`;
  const effectiveWidth = Math.max(320, Math.floor(preview.clientWidth || selectedWidth));
  preview.replaceChildren();
  try {
    await renderZhipuMermaid(mermaid, preview, source.value, {
      layout: layout.value,
      width: effectiveWidth,
    });
  } catch (error) {
    preview.textContent = `渲染失败：${error.message}`;
  }
}

let renderTimer;
function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(renderTimeline, 120);
}

width.addEventListener("input", scheduleRender);
layout.addEventListener("change", renderTimeline);
source.addEventListener("input", scheduleRender);
renderButton.addEventListener("click", renderTimeline);
window.addEventListener("resize", scheduleRender);
preset.addEventListener("change", () => {
  source.value = presets[preset.value];
  renderTimeline();
});

copySvgButton.addEventListener("click", async () => {
  const svg = preview.querySelector("svg");
  if (!svg) return;
  await navigator.clipboard.writeText(svg.outerHTML);
  copySvgButton.textContent = "已复制";
  setTimeout(() => { copySvgButton.textContent = "复制 SVG"; }, 1200);
});

downloadSvgButton.addEventListener("click", () => {
  const svg = preview.querySelector("svg");
  if (!svg) return;
  const blob = new Blob([svg.outerHTML], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${preset.value || "diagram"}.svg`;
  anchor.click();
  URL.revokeObjectURL(url);
});

const graphSource = `flowchart LR
  A[需求分析] --> B{方案评审}
  B -->|通过| C[开发实现]
  B -->|调整| E[修改方案]
  E --> C
  C --> D[上线发布]`;

const ganttSource = `gantt
  title 项目计划
  dateFormat YYYY-MM-DD
  section 设计
  信息架构 :done, a1, 2026-08-01, 5d
  视觉设计 :active, a2, after a1, 6d
  section 开发
  前端实现 :crit, a3, 2026-08-10, 8d
  联调上线 :a4, after a3, 4d`;

for (const [selector, diagramSource] of [
  ["#graph-demo", graphSource],
  ["#gantt-demo", ganttSource],
]) {
  const container = document.querySelector(selector);
  try {
    await renderZhipuMermaid(mermaid, container, diagramSource);
  } catch (error) {
    container.textContent = `渲染失败：${error.message}`;
    console.error(`示例图表 ${selector} 渲染失败`, error);
  }
}

await renderTimeline();
