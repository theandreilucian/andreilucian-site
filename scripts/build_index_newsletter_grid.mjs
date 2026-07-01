/**
 * Regenerate homepage letter archive — Dan Koe grid with Read Full Post links.
 * Run: node scripts/build_index_newsletter_grid.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDanKoeEmails } from "./substack-dan-koe-topics.mjs";
import { LEGACY_NEWSLETTER_ARTICLES } from "./legacy-newsletter-articles.mjs";
import { CLASSIC_HERO_MAP } from "./newsletter-hero-map.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");

const GRID_START = "<!-- LETTER_ARCHIVE_GRID_START -->";
const GRID_END = "<!-- LETTER_ARCHIVE_GRID_END -->";

const ARCHIVE_SECTION = `    <!-- Newsletter — Dan Koe letter archive -->
    <section class="koe-archive-section" id="newsletters">
        <div class="koe-archive-header">
            <p class="koe-archive-eyebrow">The Letters</p>
            <h2 class="koe-archive-title-main">The Andrei Lucian Letters</h2>
            <p class="koe-archive-sub">
                Deep dives on writing, audience growth, and building a one-person business online.
            </p>
        </div>

        <div class="koe-archive-grid-wrap">
            <div class="koe-archive-grid">
                ${GRID_START}
                ${GRID_END}
            </div>
        </div>
    </section>

`;

function escHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderArchiveCard({ href, img, title, excerpt }) {
  return `                <article class="koe-archive-card">
                    <a href="${escHtml(href)}" class="koe-archive-thumb-link" tabindex="-1" aria-hidden="true">
                        <div class="koe-archive-thumb">
                            <img src="${escHtml(img)}" alt="" loading="lazy" />
                        </div>
                    </a>
                    <h3 class="koe-archive-title"><a href="${escHtml(href)}">${escHtml(title)}</a></h3>
                    <p class="koe-archive-excerpt">${escHtml(excerpt)}</p>
                    <a href="${escHtml(href)}" class="koe-archive-read">Read Full Post</a>
                </article>`;
}

function renderPremiumCards() {
  const letters = getDanKoeEmails();

  return letters.map((e) => {
    const p = String(e.num).padStart(2, "0");
    return renderArchiveCard({
      href: `newsletters/letter-${p}.html`,
      img: `assets/newsletter-dan-koe/png/email-${p}-hero-woodcut.png`,
      title: e.subject,
      excerpt: e.preheader,
    });
  });
}

function renderClassicCards() {
  return LEGACY_NEWSLETTER_ARTICLES.map((a) =>
    renderArchiveCard({
      href: a.href,
      img: CLASSIC_HERO_MAP[a.href] || "assets/newsletter-dan-koe/png/email-01-hero-woodcut.png",
      title: a.title,
      excerpt: a.excerpt,
    })
  );
}

function renderCombinedGrid() {
  return [...renderPremiumCards(), ...renderClassicCards()].join("\n\n");
}

function ensureArchiveSection(html) {
  const startMarker = "<!-- Newsletter";
  const endMarker = '<div class="container">';
  const start = html.indexOf(startMarker);
  const end = html.indexOf(endMarker);
  if (start === -1 || end === -1) {
    throw new Error("Could not find newsletter section in index.html");
  }
  return html.slice(0, start) + ARCHIVE_SECTION + "\n\n    " + html.slice(end);
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
html = ensureArchiveSection(html);
html = replaceBetween(html, GRID_START, GRID_END, renderCombinedGrid());
fs.writeFileSync(INDEX, html, "utf8");

const total = getDanKoeEmails().length + LEGACY_NEWSLETTER_ARTICLES.length;
console.log(`Updated index.html: ${total} archive cards with Read Full Post links`);
