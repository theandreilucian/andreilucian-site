/**
 * 12 woodcut-style inline diagrams
 */
import { diagramWoodcut, shade, stipple, INK, MUTED, BG } from "./substack-dan-koe-woodcut.mjs";

function wrap(num, cap, w, h, draw) {
  const d = diagramWoodcut(num, w, h, cap, draw);
  return { type: "diagram", num, caption: cap, svg: d.svg.replace(/<\?xml[^?]*\?>\s*/i, ""), exportSvg: d.svg };
}

export const DIAGRAMS = {
  1: wrap(1, "Generic tips sink · your proof floats", 900, 300, (p) => `
    <ellipse cx="280" cy="180" rx="100" ry="60" fill="none" stroke="${INK}" stroke-width="2" opacity="0.4"/>
    <text x="280" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${MUTED}">tips</text>
    <path d="M400 180 L520 180" stroke="${INK}" stroke-width="2" marker-end="url(#arr)"/>
    <ellipse cx="650" cy="180" rx="120" ry="70" fill="none" stroke="${INK}" stroke-width="3"/>
    ${shade(p, "M560 130 Q650 100 740 130 Q760 200 650 230 Q540 200 560 130")}
    <text x="650" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${INK}">your story</text>
    <path d="M770 180 L890 180" stroke="${INK}" stroke-width="2"/>
    <text x="820" y="185" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${INK}">saved</text>`),

  2: wrap(2, "Week 4 — +38 followers, zero viral posts", 900, 280, (p) => `
    <rect x="80" y="50" width="740" height="180" fill="none" stroke="${INK}" stroke-width="2"/>
    ${shade(p, "M80 50 H820 V90 H80 Z")}
    <text x="200" y="78" font-family="Inter,sans-serif" font-size="11" fill="${MUTED}" font-weight="600">INPUTS</text>
    <text x="450" y="78" font-family="Inter,sans-serif" font-size="11" fill="${MUTED}" font-weight="600">WEEK 4</text>
    <text x="680" y="78" font-family="Inter,sans-serif" font-size="11" fill="${MUTED}" font-weight="600">DELTA</text>
    <text x="200" y="140" font-family="Georgia,serif" font-size="24" fill="${INK}">47 replies/day</text>
    <text x="450" y="140" font-family="Georgia,serif" font-size="24" fill="${INK}">3 posts/day</text>
    <text x="680" y="140" font-family="Georgia,serif" font-size="24" fill="${INK}">+38</text>
    <text x="450" y="230" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="${MUTED}" font-style="italic">track inputs · ignore mood</text>`),

  3: wrap(3, "Almost quit at month 6", 900, 260, (p) => `
    <path d="M80 200 L820 200" stroke="${INK}" stroke-width="1.5"/>
    <path d="M80 200 L80 60" stroke="${INK}" stroke-width="1.5"/>
    <path d="M80 195 Q200 192 350 185 Q500 170 600 130 Q700 80 820 65" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <circle cx="500" cy="170" r="10" fill="${INK}"/>
    <text x="500" y="240" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${INK}" font-style="italic">you almost quit here</text>`),

  4: wrap(4, "Pick replies — ignore follower panic", 900, 240, (p) => `
    <circle cx="450" cy="120" r="36" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M430 100 a36 38 0 1 1 40 0")}
    <rect x="140" y="90" width="160" height="55" fill="none" stroke="${INK}" stroke-width="2.5"/>
    <text x="220" y="125" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="${INK}">replies</text>
    <rect x="600" y="90" width="160" height="55" fill="none" stroke="${INK}" stroke-width="1" opacity="0.35"/>
    <text x="680" y="125" text-anchor="middle" font-family="Georgia,serif" font-size="16" fill="${MUTED}">followers</text>`),

  5: wrap(5, "Signal starts at 1K", 900, 200, (p) => `
    <line x1="100" y1="100" x2="800" y2="100" stroke="${INK}" stroke-width="2"/>
    <circle cx="180" cy="100" r="12" fill="none" stroke="${INK}" stroke-width="2"/>
    <circle cx="350" cy="100" r="12" fill="none" stroke="${INK}" stroke-width="2"/>
    <circle cx="520" cy="100" r="16" fill="${INK}"/>
    <text x="520" y="145" text-anchor="middle" font-family="Georgia,serif" font-size="12" fill="${INK}">1K</text>
    <circle cx="690" cy="100" r="12" fill="none" stroke="${INK}" stroke-width="2"/>`),

  6: wrap(6, "Inputs → lag → output → review", 900, 260, (p) => `
    <rect x="60" y="100" width="140" height="60" fill="none" stroke="${INK}" stroke-width="2"/>
    <text x="130" y="138" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="${INK}">INPUTS</text>
    <text x="230" y="135" font-family="Georgia,serif" font-size="20" fill="${INK}">→</text>
    <rect x="260" y="100" width="140" height="60" fill="none" stroke="${INK}" stroke-width="2"/>
    ${shade(p, "M260 100 H400 V160 H260 Z")}
    <text x="330" y="138" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="${INK}">LAG</text>
    <text x="430" y="135" font-family="Georgia,serif" font-size="20" fill="${INK}">→</text>
    <rect x="460" y="100" width="140" height="60" fill="none" stroke="${INK}" stroke-width="2"/>
    <text x="530" y="138" text-anchor="middle" font-family="Inter,sans-serif" font-size="12" font-weight="600" fill="${INK}">OUTPUT</text>
    <path d="M600 160 Q750 220 450 240 Q150 220 130 160" fill="none" stroke="${INK}" stroke-width="1.5" stroke-dasharray="5"/>`),

  7: wrap(7, "Draft → shipped → 4 DMs", 900, 220, (p) => `
    <rect x="80" y="70" width="180" height="90" fill="none" stroke="${INK}" stroke-width="2" opacity="0.5"/>
    <text x="170" y="125" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${MUTED}">draft</text>
    <text x="300" y="125" font-family="Georgia,serif" font-size="22" fill="${INK}">→</text>
    <rect x="340" y="70" width="180" height="90" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M340 70 H520 V160 H340 Z")}
    <text x="430" y="125" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${INK}">shipped</text>
    <text x="560" y="125" font-family="Georgia,serif" font-size="22" fill="${INK}">→</text>
    <text x="680" y="120" text-anchor="middle" font-family="Georgia,serif" font-size="36" fill="${INK}">4</text>
    <text x="680" y="150" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="${MUTED}">DMs</text>`),

  8: wrap(8, "Climb the specificity ladder", 900, 280, (p) => `
    <rect x="150" y="210" width="600" height="40" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="450" y="236" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${MUTED}">"post more"</text>
    <rect x="190" y="160" width="520" height="40" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="450" y="186" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${INK}">"3x/day"</text>
    <rect x="230" y="110" width="440" height="40" fill="none" stroke="${INK}" stroke-width="1.5"/>
    <text x="450" y="136" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${INK}">"50 replies"</text>
    <rect x="270" y="60" width="360" height="40" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M270 60 H630 V100 H270 Z")}
    <text x="450" y="86" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${INK}">"$223 month 3"</text>`),

  9: wrap(9, "Replies → visits → DMs → followers", 900, 280, (p) => `
    <polygon points="450,50 700,150 450,250 200,150" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${stipple(p, "M250 130 L450 80 L650 130 L450 220 Z")}
    <text x="450" y="160" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${INK}">50 replies</text>
    <text x="450" y="260" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${MUTED}" font-style="italic">visibility before timeline</text>`),

  10: wrap(10, "Same idea · two packagings", 900, 240, (p) => `
    <rect x="60" y="50" width="360" height="140" fill="none" stroke="${INK}" stroke-width="2"/>
    <text x="240" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${MUTED}">𝕏 · 4 lines</text>
    <text x="240" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="${INK}">6.2K impressions</text>
    <rect x="480" y="50" width="360" height="140" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M480 50 H840 V90 H480 Z")}
    <text x="660" y="90" text-anchor="middle" font-family="Georgia,serif" font-size="13" fill="${INK}">LinkedIn · 12 lines</text>
    <text x="660" y="130" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="${INK}">3 inbound DMs</text>`),

  11: wrap(11, "80% short finds · 20% long keeps", 900, 260, (p) => `
    <path d="M200 180 Q300 80 450 180 Q600 80 700 180" fill="none" stroke="${INK}" stroke-width="2"/>
    <text x="350" y="210" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${MUTED}">attention</text>
    <path d="M500 180 Q600 100 700 180 Q800 100 900 180" fill="none" stroke="${INK}" stroke-width="2.5"/>
    ${shade(p, "M580 140 Q700 120 820 160 L800 180 Q700 200 580 180 Z")}
    <text x="700" y="210" text-anchor="middle" font-family="Georgia,serif" font-size="14" fill="${INK}">trust</text>`),

  12: wrap(12, "Compound stairs — no spikes", 900, 260, (p) => `
    ${[0, 1, 2, 3, 4, 5, 6].map((i) => {
      const x = 120 + i * 100;
      const y = 200 - i * 22;
      return `<path d="M${x} ${y + 60} H${x + 80} V${y + 100} H${x}" fill="none" stroke="${INK}" stroke-width="2"/>`;
    }).join("")}
    <text x="450" y="240" text-anchor="middle" font-family="Georgia,serif" font-size="15" fill="${MUTED}" font-style="italic">boring on the way up</text>`),
};

export function getDiagramExport(num) {
  return DIAGRAMS[num]?.exportSvg || null;
}

export function getDiagramCaption(num) {
  return DIAGRAMS[num]?.caption || "";
}

export function injectDiagrams(letter) {
  const raw = DIAGRAMS[letter.num];
  if (!raw) return letter;
  const sections = [...letter.sections];
  const h2idx = sections.findIndex((s, i) => s.type === "h2" && i > 2);
  const at = h2idx >= 0 ? h2idx + 1 : Math.min(4, sections.length);
  sections.splice(at, 0, { type: "diagram", num: raw.num, caption: raw.caption, svg: raw.svg });
  return { ...letter, sections };
}
