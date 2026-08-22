# Mermaid 主题与在线编辑器
一套修复 Timeline 排版缺陷的响应式 Mermaid 主题工具与浏览器编辑器。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy demo to GitHub Pages](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml)

[English](README.md) · [打开在线编辑器](https://jeoitim.github.io/zhipu-mermaid-theme/) · [浏览主题展示](https://jeoitim.github.io/zhipu-mermaid-theme/demo/)

## 项目简介
本项目将独立 clean-room 重构的 Mermaid 展示层与参考 Mermaid Live Editor 交互的浏览器工作区结合起来，修复 Timeline 纵向 section 遮挡与桌面长文本溢出，提供协调的亮色、暗色图表主题，并在浏览器内完成编辑、预览、分享与导出。

## 关键能力
- 响应式 Timeline：无需 TD 指令自动使用移动端纵向布局，并为桌面长文本自动换行
- Monaco 编辑器可根据首个有效类型声明自动识别图表，并内置 16 类 Mermaid 示例
- SVG 自由缩放与拖拽，支持滚轮缩放、一键适配、全屏预览及可调分栏
- 仅在 Timeline 下出现的渲染宽度气泡，默认 480px 并记忆用户设置
- 界面与图表同步的亮色、暗色主题，覆盖 Timeline、Flowchart、Sequence、Gantt、Pie、GitGraph、Mindmap、Quadrant 与 XY Chart 等图表
- 浏览器本地导出 SVG、PNG 和 Mermaid 源码，支持复制 SVG、复制源码及源码分享链接
- 独立 `/demo/` 主题展示页与自动化 GitHub Pages 部署
- 开发与预览使用随机空闲端口，避免本地项目端口冲突

## 支持的图表

Timeline、Flowchart、Sequence、Class、State、ER、Gantt、Pie、Journey、Git Graph、Mindmap、Quadrant、XY Chart、Requirement、Kanban 和 Block。

## 系统组件
- 主题配置与响应式渲染辅助模块（`src/zhipu-mermaid-theme.js`）
- Monaco 编辑、缩放画布、主题切换、类型识别、分享与导出（`src/main.js`）
- 主题展示页（`demo/index.html`、`src/gallery.js` 与 `src/gallery.css`）
- GitHub Pages 工作流（`.github/workflows/deploy-pages.yml`）

## 快速上手
```bash
pnpm install
pnpm dev
```

开发服务器会自动选择一个空闲的随机端口。运行 `pnpm build` 可同时生成库文件与 GitHub Pages 站点。

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
