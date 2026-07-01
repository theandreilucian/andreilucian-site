/**
 * Unique cover art per article — no image reused across the public archive.
 * Covers 01–12: premium letters · 13–29: Jul–Aug series · 30–38: classic articles
 */
export const COVER_DIR = "assets/newsletter-dan-koe/png";
export const COVER_SVG_DIR = "assets/newsletter-dan-koe";

export function coverPath(id) {
  const p = String(id).padStart(2, "0");
  if (id <= 12) {
    return `${COVER_DIR}/email-${p}-hero-woodcut.png`;
  }
  return `${COVER_SVG_DIR}/email-${p}-hero.svg`;
}

/** Jul–Aug 2026 letters (17) → covers 13–29 */
export const JUL_AUG_COVER_IDS = Array.from({ length: 17 }, (_, i) => i + 13);

/** Premium letters 01–12 → covers 01–12 (matches letter number) */
export function premiumCoverId(letterNum) {
  return letterNum;
}

/** Classic evergreen articles → covers 30–38 */
export const CLASSIC_COVER_MAP = {
  "article-one-person-business.html": 30,
  "article-11-steps-freedom.html": 31,
  "article-24-lessons.html": 32,
  "article-book-full-time.html": 33,
  "article-authority-offer.html": 34,
  "article-twitter-audience.html": 35,
  "article-story-hooks.html": 36,
  "article-consistency-penalty.html": 37,
  "article-value-first.html": 38,
};

export function julAugCoverId(emailNum) {
  return JUL_AUG_COVER_IDS[emailNum - 1];
}

export function classicCoverPath(href) {
  const id = CLASSIC_COVER_MAP[href];
  if (!id) return coverPath(1);
  return coverPath(id);
}

export function allCoverIds() {
  return [
    ...Array.from({ length: 12 }, (_, i) => i + 1),
    ...JUL_AUG_COVER_IDS,
    ...Object.values(CLASSIC_COVER_MAP),
  ];
}
