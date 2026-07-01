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
} from "./substack-dan-koe-format.mjs";
import { getHeroSvg, getHeroCaption } from "./substack-dan-koe-heroes.mjs";
import { getDiagramExport, getDiagramCaption } from "./substack-dan-koe-diagrams.mjs";
import { renderDanKoeLetterPage } from "./dan-koe-letter-page.mjs";
import { renderLetterProductCta } from "./letter-product-cta.mjs";
import { getPremiumLetterDates, formatLetterDate } from "./letter-dates.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HERO_DIR = path.join(ROOT, "assets", "newsletter-dan-koe");
const PNG_DIR = path.join(HERO_DIR, "png");
const DIAGRAM_DIR = path.join(HERO_DIR, "diagrams");
const LETTERS_DIR = path.join(ROOT, "newsletters");

function stripPublicClosing(html) {
  return html
    .replace(/<aside class="koe-product-cta">[\s\S]*?<\/aside>/g, "")
    .replace(/<p>Thank you for reading\.<\/p>\s*/gi, "")
    .trim();
}

function buildEmails() {
  const topics = getDanKoeEmails();
  const dates = getPremiumLetterDates(topics.length);

  return topics.map((topic, i) => {
    const formatted = formatDanKoeLetter(topic);
    const pngFile = `email-${String(i + 1).padStart(2, "0")}-hero-woodcut.png`;
    const heroRel = `../assets/newsletter-dan-koe/png/${pngFile}`;
    const pageFile = `letter-${String(topic.num).padStart(2, "0")}.html`;

    return {
      ...topic,
      ...formatted,
      date: formatLetterDate(dates[i]),
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
  const bodyHtml = stripPublicClosing(e.htmlBody);

  return renderDanKoeLetterPage({
    title: e.subject,
    deck: e.preheader,
    dateLabel: e.date,
    heroSrc: e.heroRel,
    bodyHtml,
    productCtaHtml: renderLetterProductCta({ href: "0-to-1K-X-System/LANDING.html", assetPrefix: "../" }),
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
