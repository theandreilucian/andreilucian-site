/**
 * Regenerate homepage letter archive — Dan Koe grid with Read Full Post links.
 * Run: node scripts/build_index_newsletter_grid.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDanKoeEmails } from "./substack-dan-koe-topics.mjs";
import { LEGACY_NEWSLETTER_ARTICLES } from "./legacy-newsletter-articles.mjs";
import { CLASSIC_HERO_MAP, CLASSIC_DATE_MAP } from "./newsletter-hero-map.mjs";
import { getPremiumLetterDates, formatLetterDateShort } from "./letter-dates.mjs";
import {
  renderHomepageHero,
  HOMEPAGE_SIGNUP_MARKER,
  HOMEPAGE_SIGNUP_END,
} from "./homepage-hero.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");

const GRID_START = "<!-- LETTER_ARCHIVE_GRID_START -->";
const GRID_END = "<!-- LETTER_ARCHIVE_GRID_END -->";
const ARCHIVE_MARKER = "<!-- Newsletter — Dan Koe letter archive -->";
const SIGNUP_MARKER = HOMEPAGE_SIGNUP_MARKER;
const SIGNUP_END = HOMEPAGE_SIGNUP_END;
const SIGNUP_SECTION = renderHomepageHero() + "\n";

const ARCHIVE_SECTION = `    ${ARCHIVE_MARKER}
    <section class="koe-archive-section" id="newsletters">
        <div class="koe-archive-header">
            <p class="koe-archive-eyebrow">The Letters</p>
            <h2 class="koe-archive-title-main">Explore Your Curiosity</h2>
            <p class="koe-archive-sub">
                Deep dives on writing, audience growth, and building a one-person business online.
            </p>
        </div>

        <div class="koe-archive-grid-wrap">
            <div class="koe-archive-grid" id="letterArchiveGrid">
                ${GRID_START}
                ${GRID_END}
            </div>
            <div class="koe-archive-load-wrap">
                <button type="button" class="koe-archive-load-more" id="loadMoreLetters" hidden>Load more</button>
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

function renderArchiveCard({ href, img, title, excerpt, dateLabel, index }) {
  const hidden = index >= 9 ? ' data-archive-extra="true" class="koe-archive-card koe-archive-card--extra"' : ' class="koe-archive-card"';
  const byline = dateLabel
    ? `<p class="koe-archive-byline">Andrei Lucian · ${escHtml(dateLabel)}</p>`
    : `<p class="koe-archive-byline">Andrei Lucian</p>`;

  return `                <article${hidden}>
                    <a href="${escHtml(href)}" class="koe-archive-thumb-link" tabindex="-1" aria-hidden="true">
                        <div class="koe-archive-thumb">
                            <img src="${escHtml(img)}" alt="" loading="lazy" />
                        </div>
                    </a>
                    <h3 class="koe-archive-title"><a href="${escHtml(href)}">${escHtml(title)}</a></h3>
                    <p class="koe-archive-excerpt">${escHtml(excerpt)}</p>
                    <a href="${escHtml(href)}" class="koe-archive-read">Read Full Post</a>
                    ${byline}
                </article>`;
}

function renderPremiumCards() {
  const letters = getDanKoeEmails();
  const dates = getPremiumLetterDates(letters.length);

  return letters.map((e, i) => {
    const p = String(e.num).padStart(2, "0");
    return renderArchiveCard({
      href: `newsletters/letter-${p}.html`,
      img: `assets/newsletter-dan-koe/png/email-${p}-hero-woodcut.png`,
      title: e.subject,
      excerpt: e.preheader,
      dateLabel: formatLetterDateShort(dates[i]),
      index: i,
    });
  });
}

function renderClassicCards() {
  return LEGACY_NEWSLETTER_ARTICLES.map((a, i) =>
    renderArchiveCard({
      href: a.href,
      img: CLASSIC_HERO_MAP[a.href] || "assets/newsletter-dan-koe/png/email-01-hero-woodcut.png",
      title: a.title,
      excerpt: a.excerpt,
      dateLabel: CLASSIC_DATE_MAP[a.href] || "",
      index: getDanKoeEmails().length + i,
    })
  );
}

function renderCombinedGrid() {
  return [...renderPremiumCards(), ...renderClassicCards()].join("\n\n");
}

function ensureSignupSection(html) {
  const start = html.indexOf(SIGNUP_MARKER);
  const end = html.indexOf(SIGNUP_END);
  if (start !== -1 && end !== -1) {
    return html.slice(0, start) + renderHomepageHero().trim() + "\n\n    " + html.slice(end + SIGNUP_END.length);
  }
  const navEnd = html.indexOf("</nav>");
  if (navEnd === -1) throw new Error("Could not find nav in index.html");
  const insertAt = navEnd + "</nav>".length;
  return html.slice(0, insertAt) + "\n\n" + SIGNUP_SECTION + "\n" + html.slice(insertAt);
}

function ensureArchiveSection(html) {
  const endMarker = '<div class="container">';
  const end = html.indexOf(endMarker);
  if (end === -1) throw new Error("Could not find .container in index.html");

  const start = html.indexOf(ARCHIVE_MARKER);
  if (start === -1) {
    const signupEnd = html.indexOf(SIGNUP_END);
    const insertAt = signupEnd === -1 ? html.indexOf("</nav>") + "</nav>".length : signupEnd + SIGNUP_END.length;
    return html.slice(0, insertAt) + "\n\n" + ARCHIVE_SECTION + "\n\n    " + html.slice(end);
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
html = ensureSignupSection(html);
html = ensureArchiveSection(html);
html = replaceBetween(html, GRID_START, GRID_END, renderCombinedGrid());
fs.writeFileSync(INDEX, html, "utf8");

const total = getDanKoeEmails().length + LEGACY_NEWSLETTER_ARTICLES.length;
console.log(`Updated index.html: ${total} archive cards with Read Full Post links`);
