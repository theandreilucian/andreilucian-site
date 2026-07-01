/**
 * Build public website pages for Jul–Aug 2026 Mon/Wed/Fri letter series.
 * Run: node scripts/build_3day_letter_pages.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { build3DaySchedule } from "./substack-3day-schedule.mjs";
import { publicBodyHtml } from "./substack-3day-body-html.mjs";
import { renderDanKoeLetterPage } from "./dan-koe-letter-page.mjs";
import { renderLetterProductCta } from "./letter-product-cta.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const LETTERS_DIR = path.join(ROOT, "newsletters", "jul-aug");

function renderLetterPage(email, prev, next) {
  const bodyHtml = publicBodyHtml(email.substackBody, email.diagramPageRel, email.captionB);

  return renderDanKoeLetterPage({
    title: email.subject,
    deck: email.preheader,
    dateLabel: email.dateLabel,
    heroSrc: email.heroPageRel,
    bodyHtml,
    productCtaHtml: renderLetterProductCta({
      href: "0-to-1K-X-System/LANDING.html",
      assetPrefix: "../../",
    }),
    assetPrefix: "../../",
    homeHref: "../../index.html#newsletters",
    prev: prev ? { href: prev.pageFile, label: `#${String(prev.num).padStart(2, "0")}` } : null,
    next: next ? { href: next.pageFile, label: `#${String(next.num).padStart(2, "0")}` } : null,
    readerMode: true,
  });
}

export function build3DayLetterPages() {
  fs.mkdirSync(LETTERS_DIR, { recursive: true });
  const emails = build3DaySchedule();
  const paths = [];

  emails.forEach((email, i) => {
    const outPath = path.join(LETTERS_DIR, email.pageFile);
    fs.writeFileSync(outPath, renderLetterPage(email, emails[i - 1], emails[i + 1]), "utf8");
    paths.push(outPath);
  });

  return { emails, paths, lettersDir: LETTERS_DIR };
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  const { paths, lettersDir } = build3DayLetterPages();
  console.log(`Wrote ${paths.length} Jul–Aug letter pages → ${lettersDir}`);
}
