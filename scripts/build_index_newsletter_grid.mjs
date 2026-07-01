/**
 * Regenerate homepage newsletter grids — classic + premium woodcut letters.
 * Run: node scripts/build_index_newsletter_grid.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDanKoeEmails } from "./substack-dan-koe-topics.mjs";
import { formatDanKoeLetter } from "./substack-dan-koe-format.mjs";
import { LEGACY_NEWSLETTER_ARTICLES } from "./legacy-newsletter-articles.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");

const LEGACY_START = "<!-- LEGACY_GRID_START -->";
const LEGACY_END = "<!-- LEGACY_GRID_END -->";
const LETTERS_START = "<!-- NEWSLETTER_GRID_START -->";
const LETTERS_END = "<!-- NEWSLETTER_GRID_END -->";

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

function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderLegacyGrid() {
  return LEGACY_NEWSLETTER_ARTICLES.map(
    (a) => `                <a href="${escHtml(a.href)}" class="article-preview-card article-preview-card--woodcut">
                    <div class="article-visual article-visual--classic">
                        ${a.visual}
                    </div>
                    <div class="article-preview-body">
                        <span class="article-preview-num">Classic</span>
                        <h4 class="article-preview-title">${escHtml(a.title)}</h4>
                        <p class="article-preview-excerpt">${escHtml(a.excerpt)}</p>
                        <span class="article-preview-meta">${escHtml(a.meta)}</span>
                        <span class="article-read-link">Read full post</span>
                    </div>
                </a>`
  ).join("\n\n");
}

function renderLettersGrid() {
  const letters = getDanKoeEmails();
  const dates = biweeklyFridays(RANGE_START, letters.length);

  return letters
    .map((e, i) => {
      const formatted = formatDanKoeLetter(e);
      const p = String(e.num).padStart(2, "0");
      const href = `newsletters/letter-${p}.html`;
      const img = `assets/newsletter-dan-koe/png/email-${p}-hero-woodcut.png`;
      const dateStr = dates[i].toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      return `                <a href="${href}" class="article-preview-card article-preview-card--woodcut">
                    <div class="article-visual article-visual--woodcut">
                        <img src="${img}" alt="" loading="lazy" />
                    </div>
                    <div class="article-preview-body">
                        <span class="article-preview-num">#${p}</span>
                        <h4 class="article-preview-title">${escHtml(e.subject)}</h4>
                        <p class="article-preview-excerpt">${escHtml(e.preheader)}</p>
                        <span class="article-preview-meta">${dateStr} · ${formatted.words} words · ${escHtml(e.format || "essay")}</span>
                        <span class="article-read-link">Read letter</span>
                    </div>
                </a>`;
    })
    .join("\n\n");
}

function replaceBetween(html, startMark, endMark, content) {
  const start = html.indexOf(startMark);
  const end = html.indexOf(endMark);
  if (start === -1 || end === -1) {
    throw new Error(`Markers ${startMark} / ${endMark} not found in index.html`);
  }
  return html.slice(0, start + startMark.length) + "\n" + content + "\n                " + html.slice(end);
}

let html = fs.readFileSync(INDEX, "utf8");
html = replaceBetween(html, LEGACY_START, LEGACY_END, renderLegacyGrid());
html = replaceBetween(html, LETTERS_START, LETTERS_END, renderLettersGrid());
fs.writeFileSync(INDEX, html, "utf8");

console.log(
  `Updated index.html: ${LEGACY_NEWSLETTER_ARTICLES.length} classic + ${getDanKoeEmails().length} premium letter cards`
);
