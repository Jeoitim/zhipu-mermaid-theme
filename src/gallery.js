import mermaid from "mermaid";
import { initializeZhipuMermaid, renderZhipuMermaid } from "./zhipu-mermaid-theme.js";
import { galleryMessages, localizeExample } from "./gallery-i18n.js";

initializeZhipuMermaid(mermaid);

const examples = [
  {
    title: "Timeline · 桌面横向",
    wide: true,
    layout: "desktop",
    source: `timeline
      title 产品演进
      section 起步阶段与产品方向验证
        需求验证与用户访谈 : 验证产品方向并形成最小可行产品方案
        第一版正式发布 : 完成核心功能开发、联调与上线
      section 成长
        体验与性能持续优化 : 完善复杂场景下的交互体验与响应性能
        规模化推广 : 扩展更多业务场景并建立稳定运营体系`,
  },
  {
    title: "Timeline · 移动纵向",
    layout: "mobile",
    width: 420,
    source: `timeline
      title 产品演进
      section 起步
        需求验证 : 最小可行产品
        第一版 : 核心功能上线
      section 成长
        体验优化 : 完善交互与性能
        规模化 : 扩展更多场景`,
  },
  {
    title: "Flowchart",
    source: `flowchart LR
      A[需求分析] --> B{方案评审}
      B -->|通过| C[开发实现]
      B -->|调整| E[修改方案]
      E --> C
      C --> D[上线发布]`,
  },
  {
    title: "Gantt",
    wide: true,
    source: `gantt
      title 项目计划
      dateFormat YYYY-MM-DD
      section 设计
      信息架构 :done, a1, 2026-08-01, 5d
      视觉设计 :active, a2, after a1, 6d
      section 开发
      前端实现 :crit, a3, 2026-08-10, 8d
      联调上线 :a4, after a3, 4d`,
  },
  {
    title: "Sequence",
    source: `sequenceDiagram
      participant U as 用户
      participant W as Web 应用
      participant A as API
      U->>W: 提交请求
      W->>A: 校验并处理
      A-->>W: 返回结果
      W-->>U: 更新界面`,
  },
  {
    title: "Pie",
    source: `pie showData
      title 用户来源
      "自然搜索" : 42
      "内容推荐" : 28
      "合作渠道" : 18
      "直接访问" : 12`,
  },
];

function encodeSource(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

const gallery = document.querySelector("#gallery");
const themeToggle = document.querySelector("#gallery-theme-toggle");
const languageToggle = document.querySelector("#gallery-language-toggle");
const requestedLanguage = new URL(location.href).searchParams.get("lang");
const savedLanguage = localStorage.getItem("mermaid-language");
let language = [requestedLanguage, savedLanguage].find((value) => value === "en" || value === "zh")
  || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
let currentTheme = document.documentElement.dataset.theme === "dark" ? "dark" : "light";
let renderGeneration = 0;

function applyLanguage() {
  const messages = galleryMessages[language];
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = messages.title;
  document.querySelector('meta[name="description"]').content = messages.description;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = messages[element.dataset.i18n];
  });
  const editorLink = document.querySelector(".primary-link");
  editorLink.lastChild.textContent = messages.editor;
  editorLink.setAttribute("aria-label", messages.editor);
  themeToggle.title = messages.theme;
  themeToggle.setAttribute("aria-label", messages.theme);
  gallery.setAttribute("aria-label", messages.gallery);
  languageToggle.textContent = language === "zh" ? "EN" : "中文";
  languageToggle.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换为中文");
}

async function renderGallery() {
  const generation = ++renderGeneration;
  const messages = galleryMessages[language];
  gallery.replaceChildren();
  for (const [index, original] of examples.entries()) {
    if (generation !== renderGeneration) return;
    const example = localizeExample(original, language);
    const card = document.createElement("article");
    card.className = `gallery-card${example.wide ? " wide" : ""}`;
    card.innerHTML = `<div class="card-head"><strong>${example.title}</strong><button type="button">${messages.open}</button></div><div class="card-canvas" id="example-${index}"></div>`;
    gallery.appendChild(card);
    card.querySelector("button").addEventListener("click", () => {
      location.href = `../#code=${encodeSource(example.source)}`;
    });
    const container = card.querySelector(".card-canvas");
    try {
      await renderZhipuMermaid(mermaid, container, example.source, {
        layout: example.layout || "auto",
        width: example.width || Math.max(640, container.clientWidth - 48),
        mode: currentTheme,
      });
    } catch (error) {
      container.textContent = `${messages.error}${error.message}`;
    }
  }
}

themeToggle.addEventListener("click", async () => {
  currentTheme = currentTheme === "dark" ? "light" : "dark";
  document.documentElement.dataset.theme = currentTheme;
  localStorage.setItem("mermaid-editor-theme", currentTheme);
  await renderGallery();
});

languageToggle.addEventListener("click", async () => {
  language = language === "zh" ? "en" : "zh";
  localStorage.setItem("mermaid-language", language);
  const url = new URL(location.href);
  url.searchParams.set("lang", language);
  history.replaceState(null, "", url);
  applyLanguage();
  await renderGallery();
});

applyLanguage();
try {
  await renderGallery();
} finally {
  requestAnimationFrame(() => document.documentElement.classList.add("app-ready"));
}
