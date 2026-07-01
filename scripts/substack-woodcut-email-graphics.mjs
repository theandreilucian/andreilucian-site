/**
 * Woodcut-style email graphics — unique cover per article (see article-cover-registry.mjs).
 */
import { getHeroCaption } from "./substack-dan-koe-heroes.mjs";
import { getDiagramCaption } from "./substack-dan-koe-diagrams.mjs";
import { coverPath, julAugCoverId } from "./article-cover-registry.mjs";

function pad(n) {
  return String(n).padStart(2, "0");
}

export function buildWoodcutEmailVisuals(_tpl, num) {
  const coverId = julAugCoverId(num);
  const heroRel = coverPath(coverId);
  const diagramRel = `assets/newsletter-dan-koe/diagrams/email-${pad(((num - 1) % 12) + 1)}-diagram.svg`;

  const visualA = `<img src="${heroRel}" alt="${heroRel}" width="980" style="width:100%;display:block;background:#f6f4ef" />`;
  const visualB = `<img src="${diagramRel}" alt="Diagram" width="900" style="width:100%;display:block;background:#f6f4ef" />`;

  return {
    visualA,
    visualB,
    heroRel,
    diagramRel,
    coverId,
    woodcutNum: coverId,
    captionA: getHeroCaption(coverId),
    captionB: getDiagramCaption(((num - 1) % 12) + 1),
  };
}
