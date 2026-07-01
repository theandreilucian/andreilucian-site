/**
 * Regenerate homepage newsletter grid — Dan Koe woodcut style.
 * Run: node scripts/build_index_newsletter_grid.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDanKoeEmails } from "./substack-dan-koe-topics.mjs";
import { formatDanKoeLetter } from "./substack-dan-koe-format.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");

const START = "<!-- NEWSLETTER_GRID_START -->";
const END = "<!-- NEWSLETTER_GRID_END -->";

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

function renderGrid() {
  const letters = getDanKoeEmails();
  const dates = biweeklyFridays(RANGE_START, letters.length);

  return letters
    .map((e, i) => {
      const formatted = formatDanKoeLetter(e);
      const p = String(e.num).padStart(2, "0");
      const href = `substack-12-emails-dan-koe-style.html#email-${e.num}`;
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

const html = fs.readFileSync(INDEX, "utf8");
const start = html.indexOf(START);
const end = html.indexOf(END);

if (start === -1 || end === -1) {
  throw new Error(`Markers ${START} / ${END} not found in index.html`);
}

const next =
  html.slice(0, start + START.length) +
  "\n" +
  renderGrid() +
  "\n                " +
  html.slice(end);

fs.writeFileSync(INDEX, next, "utf8");
console.log(`Updated newsletter grid in ${INDEX} (${getDanKoeEmails().length} woodcut cards)`);
