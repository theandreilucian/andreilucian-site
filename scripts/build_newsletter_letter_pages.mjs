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
import { RICH_PASTE_JS } from "./substack-dan-koe-rich-paste.mjs";

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

const CLIPBOARD_JS = `
function flashBtn(btn, okText) {
  const orig = btn.dataset.label || btn.textContent;
  btn.textContent = okText || 'Copied!';
  btn.classList.add('ok');
  setTimeout(() => { btn.textContent = orig; btn.classList.remove('ok'); }, 1600);
}
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.copy);
    if (!el) return;
    navigator.clipboard.writeText(el.value).then(() => flashBtn(btn)).catch(() => alert('Copy failed'));
  });
});
${RICH_PASTE_JS}
`;

function renderLetterPage(e, prev, next) {
  const navPrev = prev
    ? `<a class="letter-nav-link" href="${prev.pageFile}">← #${String(prev.num).padStart(2, "0")}</a>`
    : `<span class="letter-nav-link disabled"></span>`;
  const navNext = next
    ? `<a class="letter-nav-link" href="${next.pageFile}">#${String(next.num).padStart(2, "0")} →</a>`
    : `<span class="letter-nav-link disabled"></span>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(e.subject)} | Andrei Lucian</title>
  <link rel="stylesheet" href="../styles.css" />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body class="newsletter-letter-page" id="letter-${e.num}">
  <nav class="navbar">
    <div class="nav-container">
      <a href="../index.html#newsletters" class="brand">Andrei Lucian</a>
      <div class="nav-links">
        <a href="../index.html#newsletters" class="nav-link">All newsletters</a>
        <a href="../substack-12-emails-paste-kit.html#paste-${e.num}" class="nav-link">Paste kit</a>
      </div>
    </div>
  </nav>

  <main class="newsletter-letter-layout" id="email-${e.num}">
    <div class="newsletter-letter-toolbar">
      ${navPrev}
      <a class="letter-nav-home" href="../index.html#newsletters">All newsletters</a>
      ${navNext}
    </div>

    <div class="substack-guide substack-guide--letter">
      <p class="substack-next">Copy <strong>full post</strong> (hero + text + diagram) → paste in Substack with Ctrl+V</p>
      <div class="copy-row">
        <button type="button" class="btn btn-primary" data-copy-rich="email-${e.num}" data-label="Copy full post">Copy full post</button>
        <button type="button" class="btn" data-copy="subject${e.num}" data-label="Copy subject">Subject</button>
        <button type="button" class="btn" data-copy="preheader${e.num}" data-label="Copy subtitle">Subtitle</button>
      </div>
    </div>

    <div class="newsletter-letter-stage">
      <div class="hero-wrap">
        <img data-hero-img src="${escHtml(e.heroRel)}" alt="${escHtml(e.subject)}" crossorigin="anonymous" />
      </div>
      <article class="letter" data-letter-root>
        <div class="letter-meta">
          <span>Andrei Lucian</span>
          <span class="dot"></span>
          <span>${e.readMin} min read</span>
          <span class="dot"></span>
          <span>${escHtml(e.tag)}</span>
          <span class="dot"></span>
          <span>${escHtml(e.date)}</span>
        </div>
        <h1>${escHtml(e.subject)}</h1>
        <p class="subtitle">${escHtml(e.preheader)}</p>
        <div class="letter-body">
          ${e.htmlBody}
          <div class="cta-block">
            <p>When your system is sharp enough to ship daily —</p>
            <p><a href="https://andreilucian.com/0-to-1K-X-System/LANDING.html">The X System → 0 to 1K followers in 90 days</a></p>
          </div>
        </div>
      </article>
      <p class="word-count">${e.words} words · ${escHtml(e.format || "essay")}</p>
    </div>

    <textarea id="subject${e.num}" class="sr-only" readonly>${escHtml(e.subject)}</textarea>
    <textarea id="preheader${e.num}" class="sr-only" readonly>${escHtml(e.preheader)}</textarea>
  </main>

  <script>${CLIPBOARD_JS}</script>
</body>
</html>`;
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
