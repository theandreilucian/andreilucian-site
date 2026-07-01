/**
 * Woodcut-style email graphics — reuses Dan Koe newsletter assets (PNG heroes + SVG diagrams).
 */
import { getHeroCaption } from "./substack-dan-koe-heroes.mjs";
import { getDiagramCaption } from "./substack-dan-koe-diagrams.mjs";

const WOODCUT_COUNT = 12;

function woodcutNum(emailNum) {
  return ((emailNum - 1) % WOODCUT_COUNT) + 1;
}

function pad(n) {
  return String(n).padStart(2, "0");
}

export function buildWoodcutEmailVisuals(_tpl, num) {
  const w = woodcutNum(num);
  const p = pad(w);
  const heroRel = `assets/newsletter-dan-koe/png/email-${p}-hero-woodcut.png`;
  const diagramRel = `assets/newsletter-dan-koe/diagrams/email-${p}-diagram.svg`;

  const visualA = `<img src="${heroRel}" alt="${heroRel}" width="980" style="width:100%;display:block;background:#f6f4ef" />`;
  const visualB = `<img src="${diagramRel}" alt="Diagram" width="900" style="width:100%;display:block;background:#f6f4ef" />`;

  return {
    visualA,
    visualB,
    heroRel,
    diagramRel,
    woodcutNum: w,
    captionA: getHeroCaption(w),
    captionB: getDiagramCaption(w),
  };
}
