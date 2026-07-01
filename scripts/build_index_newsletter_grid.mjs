/**
 * Regenerate homepage letter archive — Dan Koe grid with Read Full Post links.
 * Run: node scripts/build_index_newsletter_grid.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getDanKoeEmails } from "./substack-dan-koe-topics.mjs";
import { build3DaySchedule } from "./substack-3day-schedule.mjs";
import { LEGACY_NEWSLETTER_ARTICLES } from "./legacy-newsletter-articles.mjs";
import { CLASSIC_HERO_MAP, CLASSIC_DATE_MAP } from "./newsletter-hero-map.mjs";
import { coverPath, julAugCoverId } from "./article-cover-registry.mjs";
import { getPremiumLetterDates, formatLetterDateShort } from "./letter-dates.mjs";
import {
  renderHomepageHero,
  HOMEPAGE_SIGNUP_MARKER,
  HOMEPAGE_SIGNUP_END,
} from "./homepage-hero.mjs";
import { ARCHIVE_HEADER_HTML, RESOURCES_HEADER_HTML, renderHomepageJoinBand } from "./homepage-join-band.mjs";
import { execSync } from "child_process";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const INDEX = path.join(ROOT, "index.html");

const JOIN_BAND_START = "<!-- JOIN_BAND_START -->";
const JOIN_BAND_END = "<!-- JOIN_BAND_END -->";
const RESOURCES_HEADER_START = "<!-- RESOURCES_HEADER_START -->";
const RESOURCES_HEADER_END = "<!-- RESOURCES_HEADER_END -->";
const GRID_START = "<!-- LETTER_ARCHIVE_GRID_START -->";
const GRID_END = "<!-- LETTER_ARCHIVE_GRID_END -->";
const ARCHIVE_MARKER = "<!-- Newsletter — Dan Koe letter archive -->";
const SIGNUP_MARKER = HOMEPAGE_SIGNUP_MARKER;
const SIGNUP_END = HOMEPAGE_SIGNUP_END;
const SIGNUP_SECTION = renderHomepageHero() + "\n";

const ARCHIVE_SECTION = `    ${ARCHIVE_MARKER}
    <section class="koe-archive-section" id="newsletters">
${ARCHIVE_HEADER_HTML}

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

function renderJulAugCards() {
  return build3DaySchedule().map((e, i) =>
    renderArchiveCard({
      href: e.pageHref,
      img: coverPath(julAugCoverId(e.num)),
      title: e.subject,
      excerpt: e.preheader,
      dateLabel: e.dateShort,
      index: i,
    })
  );
}

function renderPremiumCards() {
  const letters = getDanKoeEmails();
  const dates = getPremiumLetterDates(letters.length);
  const offset = build3DaySchedule().length;

  return letters.map((e, i) => {
    const p = String(e.num).padStart(2, "0");
    return renderArchiveCard({
      href: `newsletters/letter-${p}.html`,
      img: `assets/newsletter-dan-koe/png/email-${p}-hero-woodcut.png`,
      title: e.subject,
      excerpt: e.preheader,
      dateLabel: formatLetterDateShort(dates[i]),
      index: offset + i,
    });
  });
}

function renderClassicCards() {
  const offset = build3DaySchedule().length + getDanKoeEmails().length;
  return LEGACY_NEWSLETTER_ARTICLES.map((a, i) =>
    renderArchiveCard({
      href: a.href,
      img: CLASSIC_HERO_MAP[a.href] || "assets/newsletter-dan-koe/png/email-01-hero-woodcut.png",
      title: a.title,
      excerpt: a.excerpt,
      dateLabel: CLASSIC_DATE_MAP[a.href] || "",
      index: offset + i,
    })
  );
}

function renderCombinedGrid() {
  return [...renderJulAugCards(), ...renderPremiumCards(), ...renderClassicCards()].join("\n\n");
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
  return html.slice(0, start + startMark.length) + "\n" + content + "\n    " + html.slice(end);
}

function ensureJoinBand(html) {
  const start = html.indexOf(JOIN_BAND_START);
  const end = html.indexOf(JOIN_BAND_END);
  if (start !== -1 && end !== -1) {
    const band = renderHomepageJoinBand()
      .split("\n")
      .map((line) => (line ? `    ${line}` : line))
      .join("\n");
    return replaceBetween(html, JOIN_BAND_START, JOIN_BAND_END, band);
  }
  return html.replace(
    /<section class="koe-join-band"[\s\S]*?<\/section>/,
    renderHomepageJoinBand().trim()
  );
}

function ensureResourcesHeader(html) {
  const start = html.indexOf(RESOURCES_HEADER_START);
  const end = html.indexOf(RESOURCES_HEADER_END);
  if (start !== -1 && end !== -1) {
    return replaceBetween(html, RESOURCES_HEADER_START, RESOURCES_HEADER_END, RESOURCES_HEADER_HTML);
  }
  return html.replace(
    /<div class="section-header">[\s\S]*?<\/div>/,
    RESOURCES_HEADER_HTML.trim()
  );
}

function replaceBetweenGrid(html, startMark, endMark, content) {
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
html = replaceBetweenGrid(html, GRID_START, GRID_END, renderCombinedGrid());
html = ensureJoinBand(html);
html = ensureResourcesHeader(html);
fs.writeFileSync(INDEX, html, "utf8");

try {
  execSync("node scripts/sync_site_footer.mjs", { cwd: ROOT, stdio: "inherit" });
} catch {
  console.warn("Could not sync footer — run: node scripts/sync_site_footer.mjs");
}

try {
  execSync("node scripts/sync_site_nav.mjs", { cwd: ROOT, stdio: "inherit" });
} catch {
  console.warn("Could not sync nav — run: node scripts/sync_site_nav.mjs");
}

const total = build3DaySchedule().length + getDanKoeEmails().length + LEGACY_NEWSLETTER_ARTICLES.length;
console.log(`Updated index.html: ${total} archive cards with Read Full Post links`);
