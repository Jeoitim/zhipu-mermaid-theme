# 智谱清言 Mermaid 主题 · Clean-room 重建
基于**智谱清言网页端与移动端 App** 可观察图表样式独立重建的 Mermaid 主题库，附带在线编辑器与响应式 Timeline 排版修复。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy demo to GitHub Pages](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml)

[English](README.md) · [打开在线编辑器](https://jeoitim.github.io/zhipu-mermaid-theme/) · [浏览中文主题展示](https://jeoitim.github.io/zhipu-mermaid-theme/demo/?lang=zh)

## 项目简介
项目核心是智谱清言（ChatGLM）图表主题的独立重建：参考**网页端横向 Timeline**、**移动端 App 纵向 Timeline**，以及常见 Mermaid 图表的协调配色。在线编辑器与主题展示页用于体验、调整和复用这套主题。

本项目采用 **clean-room 独立重建**方式，根据可观察的渲染结果自行实现主题与布局，不复用智谱的专有渲染器；它不是官方主题包，也不承诺像素级一致。长文本自动换行、section 遮挡修复与配套暗色主题是本项目的扩展。

| 参考来源 / 组件 | 本项目提供的内容 |
| --- | --- |
| 清言网页端 | 桌面横向 Timeline 样式与协调的图表配色 |
| 清言移动端 App | 独立实现的纵向 Timeline 卡片与阶段标记 |
| 主题库 | 可复用的 Mermaid 配置与响应式渲染辅助函数 |
| 编辑器与 `/demo/` 展示页 | 浏览器编辑、缩放、导出，以及中英文图表示例 |

## 关键能力
- 响应式 Timeline：无需 TD 指令自动使用移动端纵向布局，并为桌面长文本自动换行
- CodeMirror 6 编辑器保留语法高亮和浏览器原生右键菜单，根据首个有效类型声明自动识别图表，并内置 16 类 Mermaid 示例
- SVG 自由缩放与拖拽，支持滚轮缩放、一键适配、全屏预览及可调分栏
- 仅在 Timeline 下出现的渲染宽度气泡，默认 480px 并记忆用户设置
- 界面与图表同步的亮色、暗色主题，覆盖 Timeline、Flowchart、Sequence、Gantt、Pie、GitGraph、Mindmap、Quadrant 与 XY Chart 等图表
- 浏览器本地导出 SVG、PNG 和 Mermaid 源码，支持复制 SVG、复制源码及源码分享链接
- 中英文 `/demo/` 主题展示页（含图内示例文字翻译）与自动化 GitHub Pages 部署
- 开发与预览使用随机空闲端口，避免本地项目端口冲突

## 支持的图表

Timeline、Flowchart、Sequence、Class、State、ER、Gantt、Pie、Journey、Git Graph、Mindmap、Quadrant、XY Chart、Requirement、Kanban 和 Block。

## 系统组件
- 主题配置与响应式渲染辅助模块（`src/zhipu-mermaid-theme.js`）
- CodeMirror 编辑、缩放画布、主题切换、类型识别、分享与导出（`src/main.js`）
- 主题展示页（`demo/index.html`、`src/gallery.js` 与 `src/gallery.css`）
- 展示页界面翻译与英文示例标签（`src/gallery-i18n.js`）
- GitHub Pages 工作流（`.github/workflows/deploy-pages.yml`）

## 快速上手
```bash
pnpm install
pnpm dev
```

开发服务器会自动选择一个空闲的随机端口。运行 `pnpm build` 可同时生成库文件与 GitHub Pages 站点。

主题展示页自动识别浏览器语言，并记忆手动 EN/中文切换。可用 `/demo/?lang=en` 或 `/demo/?lang=zh` 指定语言，URL 参数优先于已保存的偏好。在编辑器打开示例时，传入的是当前语言的图表源码。

## 作为主题库使用

```js
import mermaid from "mermaid";
import {
  initializeZhipuMermaid,
  renderZhipuMermaid,
} from "./src/zhipu-mermaid-theme.js";

initializeZhipuMermaid(mermaid);

await renderZhipuMermaid(mermaid, container, source, {
  layout: "auto",
  width: 480,
  mode: "dark",
});
```

`width` 用于判断 Timeline 采用桌面还是移动布局，不会改变其他 Mermaid 图表的渲染尺寸。使用 `mode: "light"` 或 `mode: "dark"` 选择对应配色。

## 目录结构
```
zhipu-mermaid-theme/
├── .github/workflows/deploy-pages.yml
├── demo/
│   ├── index.html
│   └── zhipu-mermaid-gallery.html
├── public/vendor/mermaid.min.js
├── src/
│   ├── main.js
│   ├── gallery.js
│   ├── gallery-i18n.js
│   ├── gallery.css
│   ├── style.css
│   └── zhipu-mermaid-theme.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
└── vite.lib.config.js
```

## 许可证

项目采用 [MIT 许可证](LICENSE)。第三方依赖声明见 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)。

## 鸣谢
Mermaid 由 Mermaid 项目维护，编辑器交互参考 Mermaid Live Editor。ChatGLM 与智谱相关商标归其权利人所有；本仓库为独立 clean-room 重构项目。
