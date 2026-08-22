# Zhipu Mermaid Theme
A clean-room Mermaid theme reconstruction with responsive Timeline rendering.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy demo to GitHub Pages](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml)

[中文](README.zh.md)

[Open the interactive editor](https://jeoitim.github.io/zhipu-mermaid-theme/)

## Overview
This project reconstructs the Mermaid presentation layer observed in public ChatGLM web bundles. It provides a reusable theme, a responsive Timeline renderer that avoids Mermaid's vertical section overlap, desktop text wrapping, and an interactive browser editor.

## Key Capabilities
- Six-color brand palette covering Flowchart, Sequence, Gantt, Pie, GitGraph, Quadrant and XYChart
- Responsive mobile Timeline renderer without requiring the TD directive
- Desktop Timeline text measurement and automatic line wrapping
- Interactive editor with layout controls, SVG copy and SVG download
- Automated GitHub Pages deployment

## System Components
- Theme and render helpers (src/zhipu-mermaid-theme.js)
- Interactive demo editor (src/main.js)
- GitHub Pages workflow (.github/workflows/deploy-pages.yml)

## Quick Start
```bash
pnpm install
pnpm dev
```

Build both the reusable library and the Pages demo with `pnpm build`.

## Usage

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

On narrow containers, Timeline diagrams use an independent vertical SVG renderer and do not require `timeline TD`. Desktop Timeline diagrams keep Mermaid's horizontal structure while measuring and wrapping long labels before rendering.

## Project Structure
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

## License
MIT

## Credits
Mermaid is maintained by the Mermaid project. ChatGLM and Zhipu are trademarks of their respective owners; this repository is an independent clean-room reconstruction.
