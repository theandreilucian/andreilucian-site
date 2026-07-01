/**
 * Build standalone page per premium woodcut letter.
 * Run: node scripts/build_newsletter_letter_pages.mjs
 * (also called from build_substack_dan_koe_series.mjs)
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDanKoeEmails } from "./substack-dan-koe-topics.mjs";
import {
  formatDanKoeLetter,
  sectionsToHtml,
  escHtml,
  CLOSINGS,
} from "./substack-dan-koe-format.mjs";
import { getHeroSvg, getHeroCaption } from "./substack-dan-koe-heroes.mjs";
import { getDiagramExport, getDiagramCaption } from "./substack-dan-koe-diagrams.mjs";
import { renderDanKoeLetterPage } from "./dan-koe-letter-page.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HERO_DIR = path.join(ROOT, "assets", "newsletter-dan-koe");
const PNG_DIR = path.join(HERO_DIR, "png");
const DIAGRAM_DIR = path.join(HERO_DIR, "diagrams");
const LETTERS_DIR = path.join(ROOT, "newsletters");

const RANGE_START = new Date(2026, 6, 3);

function biweeklyFridays(start, count) {
  const dates = [];
  const d = new Date(start);
  while (dates.length < count) {
    if (d.getDay() === 5) dates.push(new Date(d));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function buildEmails() {
  const topics = getDanKoeEmails();
  const dates = biweeklyFridays(RANGE_START, topics.length);

  return topics.map((topic, i) => {
    const formatted = formatDanKoeLetter(topic);
    const pngFile = `email-${String(i + 1).padStart(2, "0")}-hero-woodcut.png`;
    const heroRel = `../assets/newsletter-dan-koe/png/${pngFile}`;
    const pageFile = `letter-${String(topic.num).padStart(2, "0")}.html`;

    return {
      ...topic,
      ...formatted,
      date: dates[i].toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      heroRel,
      pageFile,
      pageHref: `newsletters/${pageFile}`,
      heroCaption: getHeroCaption(topic.num),
      diagramCaption: getDiagramCaption(topic.num),
      htmlBody: sectionsToHtml(topic.sections),
    };
  });
}

function renderLetterPage(e, prev, next) {
  const closing = CLOSINGS[e.format] || "That's it.";
  const bodyHtml = `${e.htmlBody}
<p>${escHtml(closing)}</p>
<div class="cta-block">
  <p>When your system is sharp enough to ship daily —</p>
  <p><a href="https://andreilucian.com/0-to-1K-X-System/LANDING.html">The X System → 0 to 1K followers in 90 days</a></p>
</div>`;

  return renderDanKoeLetterPage({
    title: e.subject,
    deck: e.preheader,
    dateLabel: e.date,
    heroSrc: e.heroRel,
    bodyHtml,
    assetPrefix: "../",
    homeHref: "../index.html#newsletters",
    prev: prev ? { href: prev.pageFile, label: `#${String(prev.num).padStart(2, "0")}` } : null,
    next: next ? { href: next.pageFile, label: `#${String(next.num).padStart(2, "0")}` } : null,
    readerMode: true,
  });
}

export function buildLetterPages() {
  fs.mkdirSync(LETTERS_DIR, { recursive: true });
  fs.mkdirSync(PNG_DIR, { recursive: true });
  fs.mkdirSync(DIAGRAM_DIR, { recursive: true });

  const emails = buildEmails();
  const paths = [];

  emails.forEach((e, i) => {
    const heroFile = `email-${String(i + 1).padStart(2, "0")}-hero.svg`;
    const diagramFile = `email-${String(i + 1).padStart(2, "0")}-diagram.svg`;
    fs.writeFileSync(path.join(HERO_DIR, heroFile), getHeroSvg(e.num), "utf8");
    const diagramSvg = getDiagramExport(e.num);
    if (diagramSvg) fs.writeFileSync(path.join(DIAGRAM_DIR, diagramFile), diagramSvg, "utf8");

    const outPath = path.join(LETTERS_DIR, e.pageFile);
    fs.writeFileSync(outPath, renderLetterPage(e, emails[i - 1], emails[i + 1]), "utf8");
    paths.push(outPath);
  });

  return { emails, paths, lettersDir: LETTERS_DIR };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const { paths, lettersDir } = buildLetterPages();
  console.log(`Wrote ${paths.length} letter pages → ${lettersDir}`);
}
