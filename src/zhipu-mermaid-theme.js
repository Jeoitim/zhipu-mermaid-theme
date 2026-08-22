/**
 * Clean-room reconstruction of the Mermaid presentation layer observed in
 * chatglm.cn's 2026-08-22 public web bundle. This is not the original bundle.
 *
 * Usage:
 *   import mermaid from "mermaid";
 *   import { initializeZhipuMermaid, renderZhipuMermaid } from "./zhipu-mermaid-theme.js";
 *   initializeZhipuMermaid(mermaid);
 *   await renderZhipuMermaid(mermaid, container, source);
 */

export const zhipuPalette = {
  backgrounds: ["#DBEAFE", "#DCFCE7", "#FEF3C7", "#FCE7F3", "#EDE9FE", "#CFFAFE"],
  borders: ["#3B82F6", "#22C55E", "#F59E0B", "#EC4899", "#8B5CF6", "#06B6D4"],
  text: ["#1E40AF", "#15803D", "#92400E", "#9F1239", "#6D28D9", "#0E7490"],
  title: "#0F172A",
  body: "#475569",
  grid: "#E5E7EB",
  line: "#64748B",
  connector: "#CBD5E1",
};

export const zhipuDarkPalette = {
  backgrounds: ["#172554", "#052E16", "#451A03", "#500724", "#2E1065", "#083344"],
  borders: ["#60A5FA", "#4ADE80", "#FBBF24", "#F472B6", "#A78BFA", "#22D3EE"],
  text: ["#BFDBFE", "#BBF7D0", "#FDE68A", "#FBCFE8", "#DDD6FE", "#A5F3FC"],
  title: "#F8FAFC",
  body: "#CBD5E1",
  grid: "#334155",
  line: "#94A3B8",
  connector: "#475569",
};

const [blueBg, greenBg, amberBg, pinkBg, violetBg, cyanBg] = zhipuPalette.backgrounds;
const [blue, green, amber, pink, violet, cyan] = zhipuPalette.borders;
const [blueText, greenText, amberText, pinkText, violetText, cyanText] = zhipuPalette.text;

const themeVariables = {
  primaryColor: blueBg,
  primaryBorderColor: blue,
  primaryTextColor: blueText,
  secondaryColor: violetBg,
  secondaryBorderColor: violet,
  secondaryTextColor: violetText,
  tertiaryColor: cyanBg,
  tertiaryBorderColor: cyan,
  tertiaryTextColor: cyanText,
  lineColor: zhipuPalette.line,
  textColor: zhipuPalette.title,
  titleColor: zhipuPalette.title,
  edgeLabelBackground: "#F1F5F9",
  fontSize: "14px",
  background: "#FFFFFF",
  mainBkg: blueBg,
  nodeBorder: blue,
  nodeTextColor: blueText,
  clusterBkg: "#F8FAFC",
  clusterBorder: zhipuPalette.grid,
  errorBkgColor: pinkBg,
  errorTextColor: pinkText,
  noteBkgColor: amberBg,
  noteBorderColor: amber,
  noteTextColor: amberText,

  actorBkg: blueBg,
  actorBorder: blue,
  actorTextColor: blueText,
  actorLineColor: zhipuPalette.connector,
  signalColor: zhipuPalette.line,
  signalTextColor: zhipuPalette.body,
  labelBoxBkgColor: violetBg,
  labelBoxBorderColor: violet,
  labelTextColor: violetText,
  loopTextColor: violetText,
  activationBkgColor: cyanBg,
  activationBorderColor: cyan,
  sequenceNumberColor: "#FFFFFF",

  sectionBkgColor: "#F8FAFC",
  altSectionBkgColor: "#FFFFFF",
  sectionBkgColor2: "#F1F5F9",
  taskBkgColor: blueBg,
  taskBorderColor: blue,
  taskTextColor: zhipuPalette.title,
  taskTextOutsideColor: zhipuPalette.body,
  activeTaskBkgColor: amberBg,
  activeTaskBorderColor: amber,
  doneTaskBkgColor: greenBg,
  doneTaskBorderColor: green,
  critBkgColor: pinkBg,
  critBorderColor: pink,
  gridColor: zhipuPalette.grid,
  todayLineColor: pink,

  git0: blue, git1: green, git2: amber, git3: pink,
  git4: violet, git5: cyan, git6: blue, git7: green,
  gitBranchLabel0: "#FFFFFF",
  gitBranchLabel1: "#14532D",
  gitBranchLabel2: "#78350F",
  gitBranchLabel3: "#FFFFFF",
  gitBranchLabel4: "#FFFFFF",
  gitBranchLabel5: "#164E63",
  gitBranchLabel6: "#FFFFFF",
  gitBranchLabel7: "#14532D",
  commitLabelColor: zhipuPalette.body,
  commitLabelBackground: "#F1F5F9",
  tagLabelColor: blueText,
  tagLabelBackground: blueBg,
  tagLabelBorder: blue,

  pie1: blue, pie2: green, pie3: amber, pie4: pink,
  pie5: violet, pie6: cyan, pie7: blueText, pie8: violetText,
  pieTitleTextColor: zhipuPalette.title,
  pieSectionTextColor: "#FFFFFF",
  pieLegendTextColor: zhipuPalette.body,
  pieStrokeColor: "#FFFFFF",
  pieStrokeWidth: "1px",
  pieOuterStrokeColor: "#FFFFFF",
  pieOuterStrokeWidth: "0px",

  attributeBackgroundColorOdd: "#FFFFFF",
  attributeBackgroundColorEven: "#F8FAFC",
  fillType0: blueBg, fillType1: greenBg, fillType2: amberBg, fillType3: pinkBg,
  fillType4: violetBg, fillType5: cyanBg, fillType6: blueBg, fillType7: greenBg,
  quadrant1Fill: blueBg,
  quadrant2Fill: greenBg,
  quadrant3Fill: amberBg,
  quadrant4Fill: violetBg,
  quadrant1TextFill: blueText,
  quadrant2TextFill: greenText,
  quadrant3TextFill: amberText,
  quadrant4TextFill: violetText,
  quadrantPointFill: blue,
  quadrantPointTextFill: zhipuPalette.title,
  quadrantXAxisTextFill: zhipuPalette.body,
  quadrantYAxisTextFill: zhipuPalette.body,
  quadrantTitleFill: zhipuPalette.title,
  quadrantInternalBorderStrokeFill: zhipuPalette.connector,
  quadrantExternalBorderStrokeFill: "#94A3B8",

  xyChart: {
    backgroundColor: "transparent",
    titleColor: zhipuPalette.title,
    xAxisTitleColor: zhipuPalette.body,
    xAxisLabelColor: zhipuPalette.body,
    xAxisTickColor: zhipuPalette.connector,
    xAxisLineColor: zhipuPalette.connector,
    yAxisTitleColor: zhipuPalette.body,
    yAxisLabelColor: zhipuPalette.body,
    yAxisTickColor: zhipuPalette.connector,
    yAxisLineColor: zhipuPalette.connector,
    plotColorPalette: zhipuPalette.borders.join(","),
  },
};

for (let index = 0; index < 24; index += 1) {
  themeVariables[`cScale${index}`] = zhipuPalette.backgrounds[index % 6];
  themeVariables[`cScaleLabel${index}`] = zhipuPalette.text[index % 6];
  themeVariables[`cScaleInv${index}`] = zhipuPalette.connector;
}

const darkThemeVariables = {
  ...themeVariables,
  darkMode: true,
  background: "#0F1117",
  primaryColor: zhipuDarkPalette.backgrounds[0],
  primaryBorderColor: zhipuDarkPalette.borders[0],
  primaryTextColor: zhipuDarkPalette.text[0],
  secondaryColor: zhipuDarkPalette.backgrounds[4],
  secondaryBorderColor: zhipuDarkPalette.borders[4],
  secondaryTextColor: zhipuDarkPalette.text[4],
  tertiaryColor: zhipuDarkPalette.backgrounds[5],
  tertiaryBorderColor: zhipuDarkPalette.borders[5],
  tertiaryTextColor: zhipuDarkPalette.text[5],
  lineColor: zhipuDarkPalette.line,
  textColor: zhipuDarkPalette.title,
  titleColor: zhipuDarkPalette.title,
  edgeLabelBackground: "#171A22",
  mainBkg: zhipuDarkPalette.backgrounds[0],
  nodeBorder: zhipuDarkPalette.borders[0],
  nodeTextColor: zhipuDarkPalette.text[0],
  clusterBkg: "#171A22",
  clusterBorder: zhipuDarkPalette.grid,
  errorBkgColor: zhipuDarkPalette.backgrounds[3],
  errorTextColor: zhipuDarkPalette.text[3],
  noteBkgColor: zhipuDarkPalette.backgrounds[2],
  noteBorderColor: zhipuDarkPalette.borders[2],
  noteTextColor: zhipuDarkPalette.text[2],
  actorBkg: zhipuDarkPalette.backgrounds[0],
  actorBorder: zhipuDarkPalette.borders[0],
  actorTextColor: zhipuDarkPalette.text[0],
  actorLineColor: zhipuDarkPalette.connector,
  signalColor: zhipuDarkPalette.line,
  signalTextColor: zhipuDarkPalette.body,
  labelBoxBkgColor: zhipuDarkPalette.backgrounds[4],
  labelBoxBorderColor: zhipuDarkPalette.borders[4],
  labelTextColor: zhipuDarkPalette.text[4],
  loopTextColor: zhipuDarkPalette.text[4],
  activationBkgColor: zhipuDarkPalette.backgrounds[5],
  activationBorderColor: zhipuDarkPalette.borders[5],
  sectionBkgColor: "#171A22",
  altSectionBkgColor: "#0F1117",
  sectionBkgColor2: "#1D212B",
  taskBkgColor: zhipuDarkPalette.backgrounds[0],
  taskBorderColor: zhipuDarkPalette.borders[0],
  taskTextColor: zhipuDarkPalette.title,
  taskTextOutsideColor: zhipuDarkPalette.body,
  activeTaskBkgColor: zhipuDarkPalette.backgrounds[2],
  activeTaskBorderColor: zhipuDarkPalette.borders[2],
  doneTaskBkgColor: zhipuDarkPalette.backgrounds[1],
  doneTaskBorderColor: zhipuDarkPalette.borders[1],
  critBkgColor: zhipuDarkPalette.backgrounds[3],
  critBorderColor: zhipuDarkPalette.borders[3],
  gridColor: zhipuDarkPalette.grid,
  todayLineColor: zhipuDarkPalette.borders[3],
  git0: zhipuDarkPalette.borders[0], git1: zhipuDarkPalette.borders[1],
  git2: zhipuDarkPalette.borders[2], git3: zhipuDarkPalette.borders[3],
  git4: zhipuDarkPalette.borders[4], git5: zhipuDarkPalette.borders[5],
  git6: zhipuDarkPalette.borders[0], git7: zhipuDarkPalette.borders[1],
  gitBranchLabel0: "#0F172A", gitBranchLabel1: "#052E16",
  gitBranchLabel2: "#451A03", gitBranchLabel3: "#500724",
  gitBranchLabel4: "#2E1065", gitBranchLabel5: "#083344",
  commitLabelColor: zhipuDarkPalette.body,
  commitLabelBackground: "#171A22",
  tagLabelColor: zhipuDarkPalette.text[0],
  tagLabelBackground: zhipuDarkPalette.backgrounds[0],
  tagLabelBorder: zhipuDarkPalette.borders[0],
  pie1: zhipuDarkPalette.borders[0], pie2: zhipuDarkPalette.borders[1],
  pie3: zhipuDarkPalette.borders[2], pie4: zhipuDarkPalette.borders[3],
  pie5: zhipuDarkPalette.borders[4], pie6: zhipuDarkPalette.borders[5],
  pie7: zhipuDarkPalette.text[0], pie8: zhipuDarkPalette.text[4],
  pieTitleTextColor: zhipuDarkPalette.title,
  pieLegendTextColor: zhipuDarkPalette.body,
  pieStrokeColor: "#0F1117",
  pieOuterStrokeColor: "#0F1117",
  attributeBackgroundColorOdd: "#0F1117",
  attributeBackgroundColorEven: "#171A22",
  fillType0: zhipuDarkPalette.backgrounds[0], fillType1: zhipuDarkPalette.backgrounds[1],
  fillType2: zhipuDarkPalette.backgrounds[2], fillType3: zhipuDarkPalette.backgrounds[3],
  fillType4: zhipuDarkPalette.backgrounds[4], fillType5: zhipuDarkPalette.backgrounds[5],
  fillType6: zhipuDarkPalette.backgrounds[0], fillType7: zhipuDarkPalette.backgrounds[1],
  quadrant1Fill: zhipuDarkPalette.backgrounds[0],
  quadrant2Fill: zhipuDarkPalette.backgrounds[1],
  quadrant3Fill: zhipuDarkPalette.backgrounds[2],
  quadrant4Fill: zhipuDarkPalette.backgrounds[4],
  quadrant1TextFill: zhipuDarkPalette.text[0],
  quadrant2TextFill: zhipuDarkPalette.text[1],
  quadrant3TextFill: zhipuDarkPalette.text[2],
  quadrant4TextFill: zhipuDarkPalette.text[4],
  quadrantPointFill: zhipuDarkPalette.borders[0],
  quadrantPointTextFill: zhipuDarkPalette.title,
  quadrantXAxisTextFill: zhipuDarkPalette.body,
  quadrantYAxisTextFill: zhipuDarkPalette.body,
  quadrantTitleFill: zhipuDarkPalette.title,
  quadrantInternalBorderStrokeFill: zhipuDarkPalette.connector,
  quadrantExternalBorderStrokeFill: zhipuDarkPalette.line,
  xyChart: {
    backgroundColor: "transparent",
    titleColor: zhipuDarkPalette.title,
    xAxisTitleColor: zhipuDarkPalette.body,
    xAxisLabelColor: zhipuDarkPalette.body,
    xAxisTickColor: zhipuDarkPalette.connector,
    xAxisLineColor: zhipuDarkPalette.connector,
    yAxisTitleColor: zhipuDarkPalette.body,
    yAxisLabelColor: zhipuDarkPalette.body,
    yAxisTickColor: zhipuDarkPalette.connector,
    yAxisLineColor: zhipuDarkPalette.connector,
    plotColorPalette: zhipuDarkPalette.borders.join(","),
  },
};

for (let index = 0; index < 24; index += 1) {
  darkThemeVariables[`cScale${index}`] = zhipuDarkPalette.backgrounds[index % 6];
  darkThemeVariables[`cScaleLabel${index}`] = zhipuDarkPalette.text[index % 6];
  darkThemeVariables[`cScaleInv${index}`] = zhipuDarkPalette.connector;
}

export const zhipuMermaidConfig = {
  startOnLoad: false,
  theme: "base",
  themeVariables,
  flowchart: {
    padding: 22,
    nodeSpacing: 45,
    rankSpacing: 55,
    curve: "basis",
    htmlLabels: false,
  },
  suppressErrorRendering: false,
  sequence: { mirrorActors: false, messageAlign: "center" },
  gantt: { titleTopMargin: 25, barHeight: 24, barGap: 6 },
  mindmap: { padding: 14, useMaxWidth: false },
  fontFamily: '"PingFang SC", "Microsoft YaHei", "trebuchet ms", sans-serif',
};

export const zhipuDarkMermaidConfig = {
  ...zhipuMermaidConfig,
  darkMode: true,
  themeVariables: darkThemeVariables,
};

export const zhipuBrandCss = `
svg[id] .mindmap-edges .edge,
svg[id] .edge.section-edge- {
  stroke: ${zhipuPalette.connector} !important;
  stroke-width: 1.5px !important;
  stroke-dasharray: none !important;
  stroke-linecap: round !important;
}
svg[id] .node-line- { stroke: transparent !important; }

svg[id] .section-root .node-bkg {
  fill: ${blueBg} !important;
  stroke: ${blue} !important;
  stroke-width: 1.5px !important;
}
svg[id] .section-root .nodeLabel {
  color: ${blueBg} !important;
  font-weight: 700 !important;
}
${zhipuPalette.backgrounds.map((background, index) => `
svg[id] .section-${index} .node-bkg,
svg[id] .section-${index + 6} .node-bkg {
  fill: ${background} !important;
  stroke: ${zhipuPalette.borders[index]} !important;
  stroke-width: 1.5px !important;
}
svg[id] .section-${index} .nodeLabel,
svg[id] .section-${index + 6} .nodeLabel {
  color: ${zhipuPalette.text[index]} !important;
  font-weight: 600 !important;
}`).join("")}
html[data-theme="dark"] svg[id] .mindmap-edges .edge,
html[data-theme="dark"] svg[id] .edge.section-edge- {
  stroke: ${zhipuDarkPalette.connector} !important;
}
html[data-theme="dark"] svg[id] .section-root .node-bkg {
  fill: ${zhipuDarkPalette.backgrounds[0]} !important;
  stroke: ${zhipuDarkPalette.borders[0]} !important;
}
${zhipuDarkPalette.backgrounds.map((background, index) => `
html[data-theme="dark"] svg[id] .section-${index} .node-bkg,
html[data-theme="dark"] svg[id] .section-${index + 6} .node-bkg {
  fill: ${background} !important;
  stroke: ${zhipuDarkPalette.borders[index]} !important;
}
html[data-theme="dark"] svg[id] .section-${index} .nodeLabel,
html[data-theme="dark"] svg[id] .section-${index + 6} .nodeLabel {
  color: ${zhipuDarkPalette.text[index]} !important;
}
`).join("")}`;

export function initializeZhipuMermaid(mermaid) {
  mermaid.initialize(zhipuMermaidConfig);
  if (!document.getElementById("mermaid-brand-css")) {
    const style = document.createElement("style");
    style.id = "mermaid-brand-css";
    style.textContent = zhipuBrandCss;
    document.head.appendChild(style);
  }
}

export function normalizeTimelineColons(source) {
  if (!source.trim().startsWith("timeline")) return source;
  return source.split("\n").map((line) => {
    if (line.includes("title") || line.includes("section")) return line;
    const parts = line.split(":");
    return parts.length > 2 ? `${parts.shift()}:${parts.join("：")}` : line;
  }).join("\n");
}

let timelineMeasureContext;
let mermaidRenderQueue = Promise.resolve();

function renderMermaidSerially(mermaid, id, input, config = zhipuMermaidConfig) {
  const task = mermaidRenderQueue.then(() => {
    mermaid.initialize(config);
    return mermaid.render(id, input);
  });
  mermaidRenderQueue = task.catch(() => undefined);
  return task;
}

function measureTimelineText(text, fontSize = 16, fontWeight = 400) {
  if (!timelineMeasureContext) timelineMeasureContext = document.createElement("canvas").getContext("2d");
  timelineMeasureContext.font = `${fontWeight} ${fontSize}px ${zhipuMermaidConfig.fontFamily}`;
  return timelineMeasureContext.measureText(text).width;
}

function wrapTimelineText(text, maxWidth, fontSize = 16, fontWeight = 400) {
  if (!text || measureTimelineText(text, fontSize, fontWeight) <= maxWidth) return [text];
  const tokens = text.match(/\s+|[\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]|[^\s\u2E80-\u9FFF\uF900-\uFAFF\uFF00-\uFFEF]+/g) || [];
  const lines = [];
  let current = "";
  for (const token of tokens) {
    const value = /^\s+$/.test(token) ? " " : token;
    const candidate = `${current}${value}`.trimEnd();
    if (current && value !== " " && measureTimelineText(candidate, fontSize, fontWeight) > maxWidth) {
      lines.push(current.trim());
      current = value.trimStart();
    } else {
      current += value;
    }
  }
  if (current.trim()) lines.push(current.trim());
  return lines.length ? lines : [text];
}

function parseTimelineSource(source) {
  const parsed = { title: "", sections: [] };
  let section = null;
  for (const rawLine of source.split("\n")) {
    const line = rawLine.trim();
    if (!line || line.startsWith("%%") || line.startsWith("#") || /^timeline(?:\s+TD)?$/i.test(line)) continue;
    if (/^title\s+/i.test(line)) {
      parsed.title = line.replace(/^title\s+/i, "").trim();
      continue;
    }
    if (/^section\s+/i.test(line)) {
      section = { title: line.replace(/^section\s+/i, "").trim(), events: [] };
      parsed.sections.push(section);
      continue;
    }
    if (!section) {
      section = { title: "", events: [] };
      parsed.sections.push(section);
    }
    const colon = line.indexOf(":");
    section.events.push(colon < 0
      ? { title: line, description: "" }
      : { title: line.slice(0, colon).trim(), description: line.slice(colon + 1).trim() });
  }
  return parsed;
}

function prepareDesktopTimeline(source, containerWidth) {
  const normalized = normalizeTimelineColons(source)
    .replace(/^(\s*timeline)\s+TD\b/im, "$1");
  const parsed = parseTimelineSource(normalized);
  const eventCount = Math.max(1, parsed.sections.reduce((sum, section) => sum + section.events.length, 0));
  const laneWidth = Math.max(112, Math.min(190, (Math.max(containerWidth, 480) - 80) / eventCount));
  let sectionIndex = -1;
  return normalized.split("\n").map((rawLine) => {
    const line = rawLine.trim();
    if (/^section\s+/i.test(line)) {
      sectionIndex += 1;
      const section = parsed.sections[sectionIndex];
      const maxWidth = Math.max(laneWidth - 18, laneWidth * Math.max(1, section?.events.length || 1) - 18);
      const value = line.replace(/^section\s+/i, "");
      return rawLine.replace(value, wrapTimelineText(value, maxWidth, 16, 600).join("<br>"));
    }
    if (!line || /^timeline\b/i.test(line) || /^title\s+/i.test(line) || line.startsWith("%%") || line.startsWith("#")) return rawLine;
    const colon = rawLine.indexOf(":");
    if (colon < 0) return rawLine;
    const left = rawLine.slice(0, colon);
    const right = rawLine.slice(colon + 1);
    const indent = left.match(/^\s*/)?.[0] || "";
    const wrappedLeft = wrapTimelineText(left.trim(), laneWidth - 20, 16, 600).join("<br>");
    const wrappedRight = wrapTimelineText(right.trim(), laneWidth - 20, 16, 400).join("<br>");
    return `${indent}${wrappedLeft} : ${wrappedRight}`;
  }).join("\n");
}

function svgNode(name, attributes = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  Object.entries(attributes).forEach(([key, value]) => node.setAttribute(key, value));
  return node;
}

function appendSvgText(svg, { x, y, lines, fill, size, weight = 400, anchor = "start", lineHeight = size * 1.35 }) {
  const text = svgNode("text", {
    x, y, fill, "font-size": size, "font-weight": weight,
    "text-anchor": anchor, "font-family": zhipuMermaidConfig.fontFamily,
  });
  lines.forEach((line, index) => {
    const span = svgNode("tspan", { x, dy: index === 0 ? 0 : lineHeight });
    span.textContent = line;
    text.appendChild(span);
  });
  svg.appendChild(text);
  return text;
}

export function renderMobileTimeline(container, source, options = {}) {
  const palette = options.palette || zhipuPalette;
  const parsed = parseTimelineSource(normalizeTimelineColons(source));
  const width = Math.max(320, Math.floor(options.width || container.clientWidth || 420));
  const lineX = width < 390 ? 34 : 44;
  const cardX = lineX + 40;
  const cardWidth = width - cardX - 14;
  const svg = svgNode("svg", { width: "100%", role: "img", "aria-label": parsed.title || "Timeline" });
  svg.style.display = "block";
  svg.style.height = "auto";
  svg.dataset.mmdTimeline = "mobile";

  let y = 48;
  if (parsed.title) {
    appendSvgText(svg, {
      x: width / 2, y, lines: wrapTimelineText(parsed.title, width - 56, 26, 700),
      fill: palette.title, size: 26, weight: 700, anchor: "middle", lineHeight: 34,
    });
    y += 68;
  }
  const vertical = svgNode("line", {
    x1: lineX, x2: lineX, y1: y, y2: y,
    stroke: palette.connector, "stroke-width": 2,
  });
  svg.appendChild(vertical);
  let lastY = y;

  parsed.sections.forEach((section, sectionIndex) => {
    const paletteIndex = sectionIndex % palette.backgrounds.length;
    const background = palette.backgrounds[paletteIndex];
    const border = palette.borders[paletteIndex];
    const textColor = palette.text[paletteIndex];
    const ringY = y + 14;
    svg.appendChild(svgNode("circle", {
      cx: lineX, cy: ringY, r: 11, fill: options.mode === "dark" ? "#0F1117" : "#FFFFFF", stroke: border, "stroke-width": 4,
    }));
    if (section.title) {
      appendSvgText(svg, {
        x: cardX, y: ringY + 7, lines: wrapTimelineText(section.title, cardWidth, 20, 700),
        fill: textColor, size: 20, weight: 700, lineHeight: 27,
      });
    }
    y = ringY + 42;

    section.events.forEach((event) => {
      const titleLines = wrapTimelineText(event.title, cardWidth - 34, 18, 700);
      const descriptionLines = event.description
        ? wrapTimelineText(event.description, cardWidth - 34, 16, 400)
        : [];
      const cardHeight = Math.max(86, 28 + titleLines.length * 24 + descriptionLines.length * 22);
      const centerY = y + cardHeight / 2;
      svg.appendChild(svgNode("line", {
        x1: lineX + 6, x2: cardX, y1: centerY, y2: centerY,
        stroke: palette.connector, "stroke-width": 2,
      }));
      svg.appendChild(svgNode("circle", { cx: lineX, cy: centerY, r: 6, fill: border }));
      svg.appendChild(svgNode("rect", {
        x: cardX, y, width: cardWidth, height: cardHeight, rx: 12, ry: 12,
        fill: background, stroke: border, "stroke-width": 2,
      }));
      const titleY = y + 30;
      appendSvgText(svg, {
        x: cardX + 17, y: titleY, lines: titleLines,
        fill: textColor, size: 18, weight: 700, lineHeight: 24,
      });
      if (descriptionLines.length) {
        appendSvgText(svg, {
          x: cardX + 17, y: titleY + titleLines.length * 24 + 2, lines: descriptionLines,
          fill: palette.body, size: 16, lineHeight: 22,
        });
      }
      lastY = centerY;
      y += cardHeight + 16;
    });
    y += 22;
  });

  vertical.setAttribute("y2", Math.max(lastY + 34, y - 18));
  const height = Math.ceil(y + 12);
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("height", height);
  container.replaceChildren(svg);
  container.style.overflowX = "";
  return svg;
}

function replaceFilledPathsWithCards(svg, palette = zhipuPalette) {
  const borderMap = new Map();
  palette.backgrounds.forEach((background, index) => {
    borderMap.set(background.toUpperCase(), palette.borders[index]);
    const value = Number.parseInt(background.slice(1), 16);
    borderMap.set(`rgb(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255})`, palette.borders[index]);
  });

  svg.querySelectorAll("path").forEach((path) => {
    const style = getComputedStyle(path);
    if (!style.fill || style.fill === "none" || style.fill === "rgba(0, 0, 0, 0)") return;
    let box;
    try { box = path.getBBox(); } catch { return; }
    if (box.width < 10 || box.height < 10) return;

    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("x", box.x);
    rect.setAttribute("y", box.y);
    rect.setAttribute("width", box.width);
    rect.setAttribute("height", box.height);
    rect.setAttribute("fill", style.fill);
    if (style.fillOpacity !== "1") rect.setAttribute("fill-opacity", style.fillOpacity);
    const border = borderMap.get(style.fill) || borderMap.get(style.fill.toUpperCase());
    if (border) {
      rect.setAttribute("stroke", border);
      rect.setAttribute("stroke-width", "1.5");
    }
    path.parentNode.replaceChild(rect, path);
  });
}

export function postprocessTimeline(svg, radius = 10, palette = zhipuPalette) {
  svg.querySelectorAll("line").forEach((line) => {
    const className = line.getAttribute("class") || "";
    if (/(^|\s)node-line/.test(className)) {
      line.remove();
    } else if (
      line.hasAttribute("marker-end") ||
      line.hasAttribute("marker-start") ||
      /lineWrapper/.test(line.parentNode?.getAttribute?.("class") || "")
    ) {
      line.setAttribute("stroke", palette.connector);
      line.setAttribute("stroke-dasharray", "4 4");
    }
  });

  replaceFilledPathsWithCards(svg, palette);
  svg.querySelectorAll("rect").forEach((rect) => {
    const height = Number.parseFloat(rect.getAttribute("height") || "0");
    if (height < 10) return;
    const rounded = Math.max(4, Math.min(radius, height / 2 - 4));
    rect.setAttribute("rx", rounded);
    rect.setAttribute("ry", rounded);
  });
  svg.querySelectorAll("text, tspan").forEach((node) => {
    const size = Number.parseFloat(getComputedStyle(node).fontSize) || 0;
    if (!size || (size < 18 && size !== 16)) node.style.setProperty("font-size", "16px", "important");
  });
  svg.dataset.mmdTimeline = "1";
  svg.style.maxWidth = "none";
  const viewBox = (svg.getAttribute("viewBox") || "").split(/\s+/);
  if (viewBox.length === 4) svg.style.width = `${viewBox[2]}px`;
}

export async function renderZhipuMermaid(mermaid, container, source, options = {}) {
  const dark = options.mode === "dark";
  const palette = dark ? zhipuDarkPalette : zhipuPalette;
  const config = dark ? zhipuDarkMermaidConfig : zhipuMermaidConfig;
  const normalized = normalizeTimelineColons(source);
  const type = normalized.trim().split(/\s/)[0];
  const containerWidth = options.width || container.clientWidth || 720;
  const mobile = type === "timeline" && (
    options.layout === "mobile" ||
    (options.layout !== "desktop" && containerWidth <= (options.mobileBreakpoint || 640))
  );
  if (mobile) return renderMobileTimeline(container, normalized, { ...options, width: containerWidth, palette });
  const prepared = type === "timeline" ? prepareDesktopTimeline(normalized, containerWidth) : normalized;
  const input = type === "timeline"
    ? `%%{init: {"themeVariables": {"fontSize": "16px"}}}%%\n${prepared}`
    : prepared;
  const id = `mmd-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  // Mermaid mutates shared renderer state while lazy-loading diagram modules.
  // Serializing calls prevents simultaneous editor and gallery renders from
  // intermittently dropping a diagram or attaching it to the wrong target.
  const { svg } = await renderMermaidSerially(mermaid, id, input, config);
  container.innerHTML = svg;
  const element = container.querySelector("svg");
  if (!element) return null;
  element.style.maxWidth = "100%";
  element.style.height = "auto";
  container.style.overflowX = type === "timeline" ? "auto" : "";
  if (type === "timeline") postprocessTimeline(element, 10, palette);
  return element;
}
