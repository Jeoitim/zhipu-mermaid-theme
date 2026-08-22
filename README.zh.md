# 智谱清言风 Mermaid 主题
一套带响应式 Timeline 修复的智谱清言风 Mermaid 主题重构方案。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy demo to GitHub Pages](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml)

[English](README.md)

[打开在线编辑器](https://jeoitim.github.io/zhipu-mermaid-theme/)

## 项目简介
本项目根据智谱清言网页端公开运行时构建重构 Mermaid 展示层，提供可复用主题、避开官方纵向 section 遮挡的响应式 Timeline renderer、PC 长文本换行和在线编辑预览。

## 关键能力
- 六组品牌色覆盖 Flowchart、Sequence、Gantt、Pie、GitGraph、Quadrant 与 XYChart
- 无需 TD 指令的响应式移动端 Timeline renderer
- PC Timeline 文本测量与自动换行
- 支持布局切换、复制 SVG 和下载 SVG 的交互式编辑器
- 自动部署 GitHub Pages

## 系统组件
- 主题与渲染辅助模块（src/zhipu-mermaid-theme.js）
- 交互式演示编辑器（src/main.js）
- GitHub Pages 工作流（.github/workflows/deploy-pages.yml）

## 快速上手
```bash
pnpm install
pnpm dev
```

运行 `pnpm build` 可同时构建可复用主题库和 Pages 示例网站。

## 使用方法

```js
import mermaid from "mermaid";
import {
  initializeZhipuMermaid,
  renderZhipuMermaid,
} from "./src/zhipu-mermaid-theme.js";

initializeZhipuMermaid(mermaid);
await renderZhipuMermaid(mermaid, document.querySelector("#diagram"), source, {
  layout: "auto", // auto | mobile | desktop
  mobileBreakpoint: 640,
});
```

当容器较窄时，Timeline 会使用独立纵向 SVG 渲染器，不要求书写 `timeline TD`；桌面端保留 Mermaid 横向结构，并在渲染前测量长文本、自动插入换行，从源头避开 section 遮挡与文字溢出。

## 目录结构
```
zhipu-mermaid-theme/
├── .github/workflows/deploy-pages.yml
├── demo/zhipu-mermaid-gallery.html
├── public/vendor/mermaid.min.js
├── src/
│   ├── main.js
│   ├── style.css
│   └── zhipu-mermaid-theme.js
├── index.html
├── package.json
├── pnpm-lock.yaml
├── vite.config.js
└── vite.lib.config.js
```

## 许可证
MIT

## 鸣谢
Mermaid 由 Mermaid 项目维护。ChatGLM 与智谱相关商标归其权利人所有；本仓库为独立 clean-room 重构项目。
