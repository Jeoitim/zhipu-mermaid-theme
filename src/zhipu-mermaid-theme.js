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

export const zhipuMermaidConfig = {
  startOnLoad: false,
  theme: "base",
  themeVariables,
  flowchart: {
    padding: 22,
    nodeSpacing: 45,
    rankSpacing: 55,
    curve: "basis",
    htmlLabels: true,
  },
  suppressErrorRendering: false,
  sequence: { mirrorActors: false, messageAlign: "center" },
  gantt: { titleTopMargin: 25, barHeight: 24, barGap: 6 },
  mindmap: { padding: 14, useMaxWidth: false },
  fontFamily: '"PingFang SC", "Microsoft YaHei", "trebuchet ms", sans-serif',
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
}`).join("")}`;

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

function renderMermaidSerially(mermaid, id, input) {
  const task = mermaidRenderQueue.then(() => mermaid.render(id, input));
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
      fill: zhipuPalette.title, size: 26, weight: 700, anchor: "middle", lineHeight: 34,
    });
    y += 68;
  }
  const vertical = svgNode("line", {
    x1: lineX, x2: lineX, y1: y, y2: y,
    stroke: zhipuPalette.connector, "stroke-width": 2,
  });
  svg.appendChild(vertical);
  let lastY = y;

  parsed.sections.forEach((section, sectionIndex) => {
    const paletteIndex = sectionIndex % zhipuPalette.backgrounds.length;
    const background = zhipuPalette.backgrounds[paletteIndex];
    const border = zhipuPalette.borders[paletteIndex];
    const textColor = zhipuPalette.text[paletteIndex];
    const ringY = y + 14;
    svg.appendChild(svgNode("circle", {
      cx: lineX, cy: ringY, r: 11, fill: "#FFFFFF", stroke: border, "stroke-width": 4,
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
        stroke: zhipuPalette.connector, "stroke-width": 2,
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
          fill: zhipuPalette.body, size: 16, lineHeight: 22,
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

function replaceFilledPathsWithCards(svg) {
  const borderMap = new Map();
  zhipuPalette.backgrounds.forEach((background, index) => {
    borderMap.set(background.toUpperCase(), zhipuPalette.borders[index]);
    const value = Number.parseInt(background.slice(1), 16);
    borderMap.set(`rgb(${(value >> 16) & 255}, ${(value >> 8) & 255}, ${value & 255})`, zhipuPalette.borders[index]);
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

export function postprocessTimeline(svg, radius = 10) {
  svg.querySelectorAll("line").forEach((line) => {
    const className = line.getAttribute("class") || "";
    if (/(^|\s)node-line/.test(className)) {
      line.remove();
    } else if (
      line.hasAttribute("marker-end") ||
      line.hasAttribute("marker-start") ||
      /lineWrapper/.test(line.parentNode?.getAttribute?.("class") || "")
    ) {
      line.setAttribute("stroke", zhipuPalette.connector);
      line.setAttribute("stroke-dasharray", "4 4");
    }
  });

  replaceFilledPathsWithCards(svg);
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
  const normalized = normalizeTimelineColons(source);
  const type = normalized.trim().split(/\s/)[0];
  const containerWidth = options.width || container.clientWidth || 720;
  const mobile = type === "timeline" && (
    options.layout === "mobile" ||
    (options.layout !== "desktop" && containerWidth <= (options.mobileBreakpoint || 640))
  );
  if (mobile) return renderMobileTimeline(container, normalized, { ...options, width: containerWidth });
  const prepared = type === "timeline" ? prepareDesktopTimeline(normalized, containerWidth) : normalized;
  const input = type === "timeline"
    ? `%%{init: {"themeVariables": {"fontSize": "16px"}}}%%\n${prepared}`
    : prepared;
  const id = `mmd-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  // Mermaid mutates shared renderer state while lazy-loading diagram modules.
  // Serializing calls prevents simultaneous editor and gallery renders from
  // intermittently dropping a diagram or attaching it to the wrong target.
  const { svg } = await renderMermaidSerially(mermaid, id, input);
  container.innerHTML = svg;
  const element = container.querySelector("svg");
  if (!element) return null;
  element.style.maxWidth = "100%";
  element.style.height = "auto";
  container.style.overflowX = type === "timeline" ? "auto" : "";
  if (type === "timeline") postprocessTimeline(element, 10);
  return element;
}
