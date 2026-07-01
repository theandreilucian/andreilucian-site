/** Woodcut hero PNGs for classic article pages + homepage cards */
import { CLASSIC_COVER_MAP, coverPath } from "./article-cover-registry.mjs";

export const CLASSIC_HERO_MAP = Object.fromEntries(
  Object.entries(CLASSIC_COVER_MAP).map(([href, id]) => [href, coverPath(id)])
);

export const CLASSIC_DATE_MAP = {
  "article-one-person-business.html": "Jan 12, 2025",
  "article-11-steps-freedom.html": "Feb 4, 2025",
  "article-24-lessons.html": "Mar 18, 2025",
  "article-book-full-time.html": "Apr 2, 2025",
  "article-authority-offer.html": "May 9, 2025",
  "article-twitter-audience.html": "Jun 14, 2025",
  "article-story-hooks.html": "Jul 21, 2025",
  "article-consistency-penalty.html": "Aug 8, 2025",
  "article-value-first.html": "Sep 3, 2025",
};
