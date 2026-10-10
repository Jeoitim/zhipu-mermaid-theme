const supported = (value) => value === "en" || value === "zh";
const requested = new URL(location.href).searchParams.get("lang");
const saved = localStorage.getItem("mermaid-language");
let language = supported(requested) ? requested : supported(saved) ? saved
  : navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";

export const getLanguage = () => language;
export function setLanguage(value) {
  if (!supported(value)) return;
  language = value;
  localStorage.setItem("mermaid-language", value);
  const url = new URL(location.href);
  url.searchParams.set("lang", value);
  history.replaceState(null, "", url);
}

export function initializeLanguageButton(button) {
  button.innerHTML = '<svg class="language-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 5h12M9 3v2M5 5c1 5 4 8 8 10M13 5c-1 5-4 8-9 11M13 21l4-10 4 10M14.5 17h5"/></svg>';
  updateLanguageButton(button);
}

export function updateLanguageButton(button) {
  const label = language === "zh" ? "Switch to English" : "切换为中文";
  button.title = label;
  button.setAttribute("aria-label", label);
}

const english = {
  "在线编辑器": "Live Editor", "Mermaid 在线编辑器": "Mermaid Live Editor",
  "Mermaid 在线编辑器首页": "Mermaid Live Editor home", "主导航": "Main navigation",
  "切换明暗模式": "Toggle light/dark mode", "导出与分享": "Export and share",
  "导出图表": "Export diagram", "全部在浏览器本地完成": "Processed locally in your browser",
  "PNG 尺寸": "PNG size", "自动 2×": "Auto 2×", "宽度": "Width", "PNG 宽度": "PNG width",
  "高清位图": "High-resolution image", "可编辑矢量图": "Editable vector image", ".mmd 源码": ".mmd source",
  "复制 SVG": "Copy SVG", "复制 Mermaid 源码": "Copy Mermaid source", "复制分享链接": "Copy share link",
  "移动端编辑视图": "Mobile editor views", "代码": "Code", "预览": "Preview",
  "Mermaid 源码编辑区": "Mermaid source panel", "Mermaid 源码": "Mermaid source",
  "Mermaid 源码编辑器": "Mermaid source editor", "图表类型": "Diagram type", "Timeline 布局": "Timeline layout",
  "自适应": "Auto", "移动纵向": "Mobile vertical", "桌面横向": "Desktop horizontal",
  "拖动调整编辑器与预览宽度": "Resize editor and preview", "图表预览区": "Diagram preview",
  "Mermaid 渲染宽度": "Mermaid render width", "图表视图控制": "Diagram view controls",
  "适应画布": "Fit to canvas", "渲染宽度": "Render width", "缩小": "Zoom out", "放大": "Zoom in",
  "重置并适应画布": "Reset and fit to canvas", "全屏预览": "Fullscreen preview",
  "PNG 导出失败": "PNG export failed", "源码已复制": "Source copied", "SVG 已复制": "SVG copied",
  "分享链接已复制": "Share link copied",
};
const chinese = Object.fromEntries(Object.entries(english).map(([zh, en]) => [en, zh]));
export function t(text) { return language === "en" ? english[text] || text : text; }

export function applyEditorLanguage() {
  document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  document.title = t("Mermaid 在线编辑器");
  document.querySelector('meta[name="description"]').content = language === "en"
    ? "Mermaid live editor with real-time previews, pan and zoom, and local exports."
    : "支持实时预览、自由缩放与多格式导出的 Mermaid 在线编辑器。";
  // Only UI labels are translated. User code and rendered diagrams are never rewritten.
  const roots = document.querySelectorAll(".topbar, .pane-tabs, .mobile-view-switch, .floating-toolbar");
  const translations = language === "en" ? english : chinese;
  for (const root of roots) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let node; (node = walker.nextNode());) {
      const text = node.textContent.trim();
      if (translations[text]) node.textContent = node.textContent.replace(text, translations[text]);
    }
  }
  document.querySelectorAll("[aria-label], [title]").forEach((element) => {
    if (element.closest("#preview")) return;
    for (const attribute of ["aria-label", "title"]) {
      const text = element.getAttribute(attribute);
      if (translations[text]) element.setAttribute(attribute, translations[text]);
    }
  });
  updateLanguageButton(document.querySelector("#language-toggle"));
  document.querySelector('.topnav a[href*="demo"]').href = `./demo/?lang=${language}`;
}
