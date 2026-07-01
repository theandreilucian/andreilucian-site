/**
 * Article cover art — all use the original woodcut PNG heroes (01–12).
 * Premium letters own 01–12; Jul–Aug + classics rotate through the same pool.
 */
export const COVER_DIR = "assets/newsletter-dan-koe/png";

export function coverPath(id) {
  const n = ((Number(id) - 1) % 12) + 1;
  return `${COVER_DIR}/email-${String(n).padStart(2, "0")}-hero-woodcut.png`;
}

/** Premium letters 01–12 → matching PNG woodcut */
export function premiumCoverId(letterNum) {
  return letterNum;
}

/** Jul–Aug: offset rotation so cards differ from premium 01–12 next to them */
export function julAugCoverId(emailNum) {
  return ((emailNum + 4) % 12) + 1;
}

/** Classic articles — semantic match to original detailed woodcuts */
export const CLASSIC_COVER_MAP = {
  "article-one-person-business.html": 4,
  "article-11-steps-freedom.html": 12,
  "article-24-lessons.html": 2,
  "article-book-full-time.html": 5,
  "article-authority-offer.html": 8,
  "article-twitter-audience.html": 10,
  "article-story-hooks.html": 7,
  "article-consistency-penalty.html": 6,
  "article-value-first.html": 11,
};

export function classicCoverId(href) {
  return CLASSIC_COVER_MAP[href] || 1;
}

export function classicCoverPath(href) {
  return coverPath(classicCoverId(href));
}
