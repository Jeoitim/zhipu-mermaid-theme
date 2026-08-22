# Mermaid Theme & Live Editor
A responsive Mermaid theme toolkit and browser editor with fixed Timeline layouts.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy demo to GitHub Pages](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml)

[中文](README.zh.md) · [Open editor](https://jeoitim.github.io/zhipu-mermaid-theme/) · [Browse gallery](https://jeoitim.github.io/zhipu-mermaid-theme/demo/)

## Overview
This project combines an independent clean-room Mermaid presentation layer with a Mermaid Live Editor-inspired browser workspace. It fixes vertical Timeline section overlap, wraps long desktop labels, provides coordinated light and dark diagram palettes, and keeps editing, previewing, sharing, and exporting entirely in the browser.

## Key Capabilities
- Responsive Timeline renderer: automatic mobile vertical layout without the TD directive and wrapped desktop labels
- Monaco editor with first-line diagram detection and 16 built-in Mermaid examples
- SVG pan and zoom with wheel zooming, drag panning, fit-to-canvas, fullscreen preview, and resizable panes
- Timeline-only render-width popover with a 480px default and persistent user preference
- Coordinated light and dark UI/diagram themes, including dark Timeline, Flowchart, Sequence, Gantt, Pie, GitGraph, Mindmap, Quadrant, and XY Chart colors
- Local SVG, PNG, and Mermaid source export, SVG/source copy, and source-encoded share links
- Dedicated `/demo/` theme gallery and automated GitHub Pages deployment
- Random free ports for local development and preview to avoid project collisions

## Supported Diagrams

Timeline, Flowchart, Sequence, Class, State, ER, Gantt, Pie, Journey, Git Graph, Mindmap, Quadrant, XY Chart, Requirement, Kanban, and Block.

## System Components
- Theme configuration and responsive render helpers (`src/zhipu-mermaid-theme.js`)
- Monaco editor, pan/zoom canvas, theme switching, detection, sharing, and exports (`src/main.js`)
- Theme gallery (`demo/index.html`, `src/gallery.js`, and `src/gallery.css`)
- GitHub Pages workflow (`.github/workflows/deploy-pages.yml`)

## Quick Start
```bash
pnpm install
pnpm dev
```

The development server selects a random free local port. To create the library and GitHub Pages bundles, run `pnpm build`.

## Library Usage

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

`width` determines when Timeline switches between its desktop and mobile layouts; it does not resize other Mermaid diagram types. Use `mode: "light"` or `mode: "dark"` to select the matching palette.

## Project Structure
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

## License

Released under the [MIT License](LICENSE). Third-party dependency notices are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Credits
Mermaid is maintained by the Mermaid project. The editor interaction is inspired by Mermaid Live Editor. ChatGLM and Zhipu are trademarks of their respective owners; this repository is an independent clean-room reconstruction.
