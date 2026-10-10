# Zhipu Qingyan Mermaid Themes — Clean-room Reconstruction
An independent Mermaid theme reconstruction based on the visible diagram styles in **Zhipu Qingyan's web client and mobile app**, with a live browser editor and responsive Timeline fixes.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Deploy demo to GitHub Pages](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/Jeoitim/zhipu-mermaid-theme/actions/workflows/deploy-pages.yml)

[中文](README.zh.md) · [Open editor](https://jeoitim.github.io/zhipu-mermaid-theme/) · [Browse gallery in English](https://jeoitim.github.io/zhipu-mermaid-theme/demo/?lang=en)

## Overview
The theme library is the core of this project. Its visual references are Zhipu Qingyan (ChatGLM): the **web client's horizontal Timeline** and the **mobile app's vertical Timeline**, together with coordinated colors for common Mermaid diagrams. The editor and gallery let you explore and reuse these themes.

This is a **clean-room reconstruction**, not an official theme package or a claim of pixel-perfect parity. The rendering and layout code is independently implemented from observable output; it does not reuse Zhipu's proprietary renderer. Automatic text wrapping, overlap fixes, and coordinated dark palettes are project additions.

| Reference / component | What this project provides |
| --- | --- |
| Qingyan web client | Desktop horizontal Timeline styling and coordinated diagram colors |
| Qingyan mobile app | Independently implemented vertical Timeline cards and section markers |
| Theme library | Reusable Mermaid configuration and responsive rendering helpers |
| Editor & `/demo/` gallery | Browser editing, zooming, exports, and Chinese/English gallery examples |

## Key Capabilities
- Responsive Timeline renderer: automatic mobile vertical layout without the TD directive and wrapped desktop labels
- CodeMirror 6 editor with syntax highlighting, native browser context menus, first-line diagram detection, and 16 built-in Mermaid examples
- SVG pan and zoom with wheel zooming, drag panning, fit-to-canvas, fullscreen preview, and resizable panes
- Timeline-only render-width popover with a 480px default and persistent user preference
- Coordinated light and dark UI/diagram themes, including dark Timeline, Flowchart, Sequence, Gantt, Pie, GitGraph, Mindmap, Quadrant, and XY Chart colors
- Local SVG, PNG, and Mermaid source export, SVG/source copy, and source-encoded share links
- Chinese/English `/demo/` theme gallery (including translated diagram labels) and automated GitHub Pages deployment
- Random free ports for local development and preview to avoid project collisions

## Supported Diagrams

Timeline, Flowchart, Sequence, Class, State, ER, Gantt, Pie, Journey, Git Graph, Mindmap, Quadrant, XY Chart, Requirement, Kanban, and Block.

## System Components
- Theme configuration and responsive render helpers (`src/zhipu-mermaid-theme.js`)
- CodeMirror editor, pan/zoom canvas, theme switching, detection, sharing, and exports (`src/main.js`)
- Theme gallery (`demo/index.html`, `src/gallery.js`, and `src/gallery.css`)
- Gallery translations and English example labels (`src/gallery-i18n.js`)
- GitHub Pages workflow (`.github/workflows/deploy-pages.yml`)

## Quick Start
```bash
pnpm install
pnpm dev
```

The development server selects a random free local port. To create the library and GitHub Pages bundles, run `pnpm build`.

The gallery detects your browser language and remembers manual EN/中文 selections. Use `/demo/?lang=en` or `/demo/?lang=zh` to open a specific language; an explicit URL choice takes precedence over the saved preference. Opening an example transfers the currently displayed language's diagram source into the editor.

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

## License

Released under the [MIT License](LICENSE). Third-party dependency notices are listed in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md).

## Credits
Mermaid is maintained by the Mermaid project. The editor interaction is inspired by Mermaid Live Editor. ChatGLM and Zhipu are trademarks of their respective owners; this repository is an independent clean-room reconstruction.
