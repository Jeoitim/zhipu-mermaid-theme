export const galleryMessages = {
  zh: {
    title: "Mermaid 主题展示", heading: "图表示例",
    intro: "集中展示响应式 Timeline 与常用 Mermaid 图表的统一配色。点击任意示例，可将源码带回主编辑器继续修改。",
    description: "智谱清言网页端与移动端 App 图表主题的 clean-room Mermaid 重建示例。",
    editor: "打开编辑器", open: "在编辑器打开", theme: "切换明暗模式",
    gallery: "Mermaid 图表示例", error: "渲染失败：", desktop: "Timeline · 桌面横向", mobile: "Timeline · 移动纵向",
  },
  en: {
    title: "Mermaid Theme Gallery", heading: "Diagram examples",
    intro: "Explore responsive Timelines and coordinated Mermaid diagram colors. Open any example in the editor to customize its source.",
    description: "Clean-room Mermaid reconstructions of the diagram themes observed in Zhipu Qingyan's web client and mobile app.",
    editor: "Open editor", open: "Edit example", theme: "Toggle light/dark mode",
    gallery: "Mermaid diagram examples", error: "Rendering failed: ", desktop: "Timeline · Desktop horizontal", mobile: "Timeline · Mobile vertical",
  },
};

// Translate display labels only; Mermaid declarations, IDs and dates stay intact.
const englishLabels = [
  ["起步阶段与产品方向验证", "Discovery and product validation"],
  ["需求验证与用户访谈", "Validation and user interviews"],
  ["验证产品方向并形成最小可行产品方案", "Validate the product direction and define an MVP"],
  ["第一版正式发布", "First release"],
  ["完成核心功能开发、联调与上线", "Build, integrate and launch the core features"],
  ["体验与性能持续优化", "Experience and performance improvements"],
  ["完善复杂场景下的交互体验与响应性能", "Improve interactions and responsiveness in complex scenarios"],
  ["规模化推广", "Scale up"],
  ["扩展更多业务场景并建立稳定运营体系", "Expand use cases and establish reliable operations"],
  ["产品演进", "Product evolution"], ["最小可行产品", "Minimum viable product"],
  ["核心功能上线", "Launch core features"], ["完善交互与性能", "Improve interactions and performance"],
  ["扩展更多场景", "Expand use cases"], ["需求验证", "Validation"], ["体验优化", "Refinement"],
  ["第一版", "First release"], ["规模化", "Scale up"], ["起步", "Discovery"], ["成长", "Growth"],
  ["需求分析", "Requirements"], ["方案评审", "Review"], ["开发实现", "Implementation"],
  ["修改方案", "Revise plan"], ["上线发布", "Launch"], ["通过", "Approved"], ["调整", "Revise"],
  ["项目计划", "Project plan"], ["信息架构", "Information architecture"], ["视觉设计", "Visual design"],
  ["前端实现", "Frontend implementation"], ["联调上线", "Integration and launch"],
  ["设计", "Design"], ["开发", "Development"], ["Web 应用", "Web app"],
  ["提交请求", "Submit request"], ["校验并处理", "Validate and process"],
  ["返回结果", "Return result"], ["更新界面", "Update interface"],
  ["用户来源", "Traffic sources"], ["自然搜索", "Organic search"], ["内容推荐", "Recommendations"],
  ["合作渠道", "Partners"], ["直接访问", "Direct visits"], ["用户", "User"],
];

export function localizeExample(example, language) {
  const messages = galleryMessages[language];
  const title = example.layout === "desktop" ? messages.desktop
    : example.layout === "mobile" ? messages.mobile : example.title;
  const source = language === "en"
    ? englishLabels.reduce((text, [zh, en]) => text.replaceAll(zh, en), example.source)
    : example.source;
  return { ...example, title, source };
}
