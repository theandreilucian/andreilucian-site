/**
 * Build 12 Dan Koe-style long-form Substack newsletters
 * Run: node scripts/build_substack_dan_koe_series.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";
import { getDanKoeEmails } from "./substack-dan-koe-topics.mjs";
import {
  formatDanKoeLetter,
  sectionsToHtml,
  escHtml,
  WORD_TARGETS,
} from "./substack-dan-koe-format.mjs";
import { getHeroSvg, getHeroCaption } from "./substack-dan-koe-heroes.mjs";
import { getDiagramExport, getDiagramCaption } from "./substack-dan-koe-diagrams.mjs";
import { RICH_PASTE_JS } from "./substack-dan-koe-rich-paste.mjs";
import { buildLetterPages } from "./build_newsletter_letter_pages.mjs";
import { renderSiteNav } from "./dan-koe-letter-page.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const HERO_DIR = path.join(ROOT, "assets", "newsletter-dan-koe");
const PNG_DIR = path.join(HERO_DIR, "png");
const DIAGRAM_DIR = path.join(HERO_DIR, "diagrams");
const OUT_HTML = path.join(ROOT, "substack-12-emails-dan-koe-style.html");
const PASTE_HTML = path.join(ROOT, "substack-12-emails-paste-kit.html");
const GALLERY_HTML = path.join(ROOT, "newsletter-graphics-gallery.html");

const RANGE_START = new Date(2026, 6, 3); // Fri Jul 3, 2026 — biweekly

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
    const heroFile = `email-${String(i + 1).padStart(2, "0")}-hero.svg`;
    const heroPath = path.join(HERO_DIR, heroFile);
    const pngFile = `email-${String(i + 1).padStart(2, "0")}-hero-woodcut.png`;
    const pngPath = path.join(PNG_DIR, pngFile);
    const diagramFile = `email-${String(i + 1).padStart(2, "0")}-diagram.svg`;
    const diagramPath = path.join(DIAGRAM_DIR, diagramFile);
    fs.mkdirSync(HERO_DIR, { recursive: true });
    fs.mkdirSync(PNG_DIR, { recursive: true });
    fs.mkdirSync(DIAGRAM_DIR, { recursive: true });
    fs.writeFileSync(heroPath, getHeroSvg(topic.num), "utf8");
    const diagramSvg = getDiagramExport(topic.num);
    if (diagramSvg) fs.writeFileSync(diagramPath, diagramSvg, "utf8");

    const heroPngRel = `assets/newsletter-dan-koe/png/${pngFile}`;
    const heroDisplayRel = fs.existsSync(pngPath)
      ? heroPngRel
      : `assets/newsletter-dan-koe/${heroFile}`;

    return {
      ...topic,
      ...formatted,
      date: dates[i].toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      heroRel: heroDisplayRel,
      heroSvgRel: `assets/newsletter-dan-koe/${heroFile}`,
      heroPngRel: fs.existsSync(pngPath) ? heroPngRel : null,
      diagramRel: diagramSvg ? `assets/newsletter-dan-koe/diagrams/${diagramFile}` : null,
      heroCaption: getHeroCaption(topic.num),
      diagramCaption: getDiagramCaption(topic.num),
      htmlBody: sectionsToHtml(topic.sections),
    };
  });
}

const CLIPBOARD_JS = `
async function copyImageFromImg(img, maxW) {
  if (!img || !img.naturalWidth) throw new Error('Image not loaded');
  const cap = maxW || 1456;
  let w = img.naturalWidth, h = img.naturalHeight;
  if (w > cap) { h = Math.round(h * cap / w); w = cap; }
  const canvas = document.createElement('canvas');
  canvas.width = w; canvas.height = h;
  canvas.getContext('2d').drawImage(img, 0, 0, w, h);
  const blob = await new Promise((res, rej) => canvas.toBlob((b) => (b ? res(b) : rej(new Error('toBlob failed'))), 'image/png', 0.92));
  if (!navigator.clipboard || !window.ClipboardItem) throw new Error('Clipboard API unavailable');
  await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
}

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
    navigator.clipboard.writeText(el.value).then(() => flashBtn(btn)).catch(() => alert('Copy failed — select the text area and press Ctrl+C'));
  });
});

document.querySelectorAll('[data-copy-img]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const img = document.getElementById(btn.dataset.copyImg);
    if (!img) return;
    try {
      await copyImageFromImg(img);
      flashBtn(btn, 'Image copied!');
    } catch (e) {
      alert('Could not copy image to clipboard.\\n\\nTry: right-click the image → Copy image\\nOr drag the image into the Substack editor.\\n\\n(If you opened this file from disk, run: npx serve . in the Website folder)');
    }
  });
});

${RICH_PASTE_JS}
`;

function letterArticleHtml(e) {
  return `<article class="letter" data-letter-root>
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
    </article>`;
}

function renderIndex(emails) {
  const cards = emails
    .map((e) => {
      const href = `newsletters/letter-${String(e.num).padStart(2, "0")}.html`;
      return `<article class="koe-archive-card">
  <a href="${escHtml(href)}" class="koe-archive-thumb-link" tabindex="-1" aria-hidden="true">
    <div class="koe-archive-thumb"><img src="${escHtml(e.heroRel)}" alt="" loading="lazy" /></div>
  </a>
  <h3 class="koe-archive-title"><a href="${escHtml(href)}">${escHtml(e.subject)}</a></h3>
  <p class="koe-archive-excerpt">${escHtml(e.preheader)}</p>
  <a href="${escHtml(href)}" class="koe-archive-read">Read Full Post</a>
</article>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>The Andrei Lucian Letters</title>
  <link rel="stylesheet" href="styles.css" />
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
</head>
<body>
  ${renderSiteNav("")}

  <section class="koe-archive-section">
    <div class="koe-archive-header">
      <p class="koe-archive-eyebrow">The Letters</p>
      <h1 class="koe-archive-title-main">The Andrei Lucian Letters</h1>
      <p class="koe-archive-sub">Long-form letters on writing, growth, and building in public — vintage woodcut visuals, blunt proof, no guru noise.</p>
    </div>
    <div class="koe-archive-grid-wrap">
      <div class="koe-archive-grid">${cards}</div>
    </div>
    <p class="koe-archive-foot"><a href="index.html#newsletter-signup">Subscribe free</a></p>
  </section>
</body>
</html>`;
}

function renderGallery(emails) {
  const cards = emails
    .map(
      (e) => `<section class="card" id="g${e.num}">
  <header><span class="num">#${String(e.num).padStart(2, "0")}</span><h2>${escHtml(e.subject)}</h2><p>${escHtml(e.heroCaption)}</p></header>
  <div class="pair">
    <div class="asset"><span class="label">Featured hero · woodcut PNG</span><a href="${escHtml(e.heroRel)}" target="_blank"><img src="${escHtml(e.heroRel)}" alt="Hero ${e.num}" loading="lazy"/></a>${e.heroSvgRel ? `<span class="sub"><a href="${escHtml(e.heroSvgRel)}" target="_blank">SVG fallback</a></span>` : ""}</div>
    ${e.diagramRel ? `<div class="asset"><span class="label">Inline diagram · SVG</span><a href="${escHtml(e.diagramRel)}" target="_blank"><img src="${escHtml(e.diagramRel)}" alt="Diagram ${e.num}" loading="lazy"/></a></div>` : ""}
  </div>
</section>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en"><head>
<meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<title>Newsletter Graphics Gallery — 24 assets</title>
<link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;600&display=swap" rel="stylesheet"/>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Inter,system-ui,sans-serif;background:#050505;color:#eee;padding:24px 16px 80px}
  .wrap{max-width:1100px;margin:0 auto}
  h1{font-family:"Instrument Serif",Georgia,serif;font-size:2.2rem;font-weight:400;margin-bottom:8px}
  .lead{color:#888;margin-bottom:32px;line-height:1.6;max-width:640px}
  .card{background:#111;border:1px solid #222;border-radius:8px;padding:20px;margin-bottom:28px}
  .card header{margin-bottom:16px}
  .num{font-size:.65rem;letter-spacing:.12em;color:#666;text-transform:uppercase}
  .card h2{font-family:"Instrument Serif",Georgia,serif;font-size:1.35rem;font-weight:400;margin:6px 0;color:#f6f4ef;line-height:1.3}
  .card header p{font-size:.85rem;color:#888}
  .pair{display:grid;grid-template-columns:1fr 1fr;gap:16px}
  @media(max-width:800px){.pair{grid-template-columns:1fr}}
  .asset{background:#0a0a0a;border:1px solid #1a1a1a;border-radius:6px;overflow:hidden}
  .label{display:block;font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:#666;padding:10px 12px;border-bottom:1px solid #1a1a1a}
  .asset img{width:100%;display:block}
  .asset a{display:block;transition:opacity .15s}
  .asset a:hover{opacity:.9}
  .sub{display:block;font-size:.7rem;padding:8px 12px 10px;color:#555}
  .sub a{color:#888}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px;flex-wrap:wrap;margin-bottom:32px}
  .top a{color:#aaa;font-size:.85rem}
</style></head><body><div class="wrap">
<div class="top"><div><h1>Newsletter graphics</h1><p class="lead">12 AI woodcut hero PNGs + 12 inline diagram SVGs — black ink on cream paper. Stippling, cross-hatch, symbolic metaphors. Click any image to open full file.</p></div>
<a href="substack-12-emails-dan-koe-style.html">← Back to newsletters</a></div>
${cards}
</div></body></html>`;
}

function renderPasteKit(emails) {
  const nav = emails
    .map((e) => `<a href="#paste-${e.num}">#${String(e.num).padStart(2, "0")}</a>`)
    .join("");

  const cards = emails
    .map(
      (e) => `<section class="card paste-section" id="paste-${e.num}">
  <header class="head">
    <span class="idx">#${String(e.num).padStart(2, "0")}</span>
    <div>
      <h2>${escHtml(e.date)} · ${escHtml(e.format || "essay")}</h2>
      <p class="meta">${e.words} words · ${escHtml(e.subject)}</p>
    </div>
  </header>
  <div class="substack-box">
    <div class="paste-head">
      <span>One-click paste</span>
    </div>
    <p class="substack-hint">Copies <strong>hero + title + subtitle + body + diagram</strong> as rich HTML. In Substack → click <em>Start writing…</em> → Ctrl+V</p>
    <div class="copy-row">
      <button type="button" class="btn primary" data-copy-rich="paste-${e.num}" data-label="Copy full post">Copy full post (images + text)</button>
      <button type="button" class="btn" data-copy="subject${e.num}" data-label="Copy subject">Subject only</button>
      <button type="button" class="btn" data-copy="preheader${e.num}" data-label="Copy subtitle">Subtitle only</button>
    </div>
    <textarea id="subject${e.num}" class="sr-only" readonly aria-hidden="true">${escHtml(e.subject)}</textarea>
    <textarea id="preheader${e.num}" class="sr-only" readonly aria-hidden="true">${escHtml(e.preheader)}</textarea>
  </div>
  <div class="rich-source" aria-hidden="true">
    <img data-hero-img src="${escHtml(e.heroRel)}" alt="" crossorigin="anonymous" />
    ${letterArticleHtml(e)}
  </div>
</section>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Substack Paste Kit — 12 Premium Newsletters</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root { --bg:#08090c; --card:#111318; --border:#252a35; --text:#eaecf0; --muted:#8b939f; --accent:#e8e4dc; --accent2:#c9a227; }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:Inter,system-ui,sans-serif; background:var(--bg); color:var(--text); padding:20px 14px 64px; line-height:1.55; }
    .wrap { max-width:720px; margin:0 auto; }
    h1 { font-size:1.65rem; font-weight:700; letter-spacing:-0.03em; }
    .lead { color:var(--muted); margin:8px 0 16px; font-size:0.9rem; line-height:1.6; }
    .hero { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px 18px; margin-bottom:20px; font-size:0.84rem; color:var(--muted); line-height:1.65; }
    .hero strong { color:#fff; }
    .hero a { color:var(--accent2); }
    .hero code { background:#1a1e26; padding:2px 6px; border-radius:4px; font-size:0.8rem; }
    .nav { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:24px; }
    .nav a { font-size:0.7rem; font-weight:600; color:var(--muted); text-decoration:none; padding:5px 8px; border:1px solid var(--border); border-radius:5px; }
    .nav a:hover { color:#fff; border-color:var(--accent2); }
    .card { background:var(--card); border:1px solid var(--border); border-radius:14px; margin-bottom:24px; overflow:hidden; border-top:3px solid var(--accent2); }
    .head { display:flex; gap:12px; padding:14px 16px 0; }
    .idx { font-size:0.65rem; font-weight:700; color:var(--muted); background:var(--bg); border:1px solid var(--border); padding:4px 7px; border-radius:5px; height:fit-content; }
    .head h2 { font-size:0.92rem; font-weight:700; }
    .meta { font-size:0.74rem; color:var(--muted); margin-top:2px; }
    .visuals { padding:12px 16px 0; }
    .visual-label { font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted); margin-bottom:8px; }
    .visual-grid { display:grid; gap:12px; }
    .visual-card { background:#f6f4ef; border:1px solid var(--border); border-radius:10px; overflow:hidden; }
    .visual-card img { width:100%; display:block; }
    .visual-actions { display:flex; flex-wrap:wrap; gap:6px; padding:10px 12px; background:#0a0c10; border-top:1px solid var(--border); }
    .visual-caption { font-size:0.72rem; color:var(--muted); padding:8px 12px 10px; border-top:1px solid var(--border); background:var(--bg); }
    .substack-box { margin:14px 16px 16px; padding:14px; background:#0a0c10; border:2px solid var(--accent2); border-radius:12px; }
    .substack-hint { font-size:0.78rem; color:var(--muted); margin:8px 0 10px; line-height:1.55; }
    .substack-hint strong { color:#fff; font-weight:600; }
    .copy-row { display:flex; flex-wrap:wrap; gap:6px; }
    .substack-area { min-height:280px; border-color:#3a4555; font-family:Inter,system-ui,sans-serif; font-size:0.92rem; line-height:1.65; }
    .paste-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:8px; flex-wrap:wrap; }
    .paste-head > span { font-size:0.65rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--accent2); }
    .paste-area { width:100%; min-height:320px; padding:14px; background:#060708; border:2px solid var(--accent2); border-radius:10px; color:#f4f5f7; font-family:Inter,system-ui,sans-serif; font-size:0.92rem; line-height:1.65; resize:vertical; white-space:pre-wrap; }
    .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0; }
    .btn { padding:7px 12px; border-radius:7px; border:1px solid var(--border); background:#1a1e26; color:var(--text); font-weight:600; font-size:0.78rem; cursor:pointer; text-decoration:none; display:inline-block; }
    .btn:hover { border-color:#555; }
    .btn.primary { background:var(--accent); color:#0c0c0c; border-color:var(--accent); }
    .btn.ghost { background:transparent; }
    .btn.ok { background:#1a4d3a; border-color:#2d6b52; color:#a8e6c7; }
    .rich-source { position:absolute; left:-9999px; width:720px; opacity:0; pointer-events:none; }
    .substack-hint strong { color:#fff; }
    .top-links { margin-bottom:16px; font-size:0.82rem; }
    .top-links a { color:var(--muted); margin-right:12px; }
  </style>
</head>
<body>
  <div class="wrap">
    <p class="top-links"><a href="substack-12-emails-dan-koe-style.html">← Preview newsletters</a><a href="newsletter-graphics-gallery.html">Graphics gallery</a></p>
    <h1>Substack paste kit</h1>
    <p class="lead">One button per newsletter — copies hero image, title, subtitle, body, and inline diagram together.</p>
    <div class="hero">
      <strong>How to use</strong><br />
      1. Click <strong>Copy full post (images + text)</strong><br />
      2. In Substack → click <em>Start writing…</em> → <strong>Ctrl+V</strong><br />
      3. Optional: copy <strong>Subject only</strong> / <strong>Subtitle only</strong> into Substack header fields<br /><br />
      Use Chrome or Edge. If paste fails, open via <code>npx serve .</code> → localhost.
    </div>
    <nav class="nav">${nav}</nav>
    ${cards}
  </div>
  <script>${CLIPBOARD_JS}</script>
</body>
</html>`;
}

const emails = buildEmails();
buildLetterPages();
try {
  execSync("node scripts/build_classic_article_pages.mjs", { cwd: ROOT, stdio: "inherit" });
} catch {
  console.warn("Could not rebuild classic articles — run: node scripts/build_classic_article_pages.mjs");
}
try {
  execSync("node scripts/build_index_newsletter_grid.mjs", { cwd: ROOT, stdio: "inherit" });
} catch {
  console.warn("Could not refresh index.html grid — run: node scripts/build_index_newsletter_grid.mjs");
}
fs.writeFileSync(OUT_HTML, renderIndex(emails), "utf8");
fs.writeFileSync(PASTE_HTML, renderPasteKit(emails), "utf8");
fs.writeFileSync(GALLERY_HTML, renderGallery(emails), "utf8");

const summary = emails.map((e) => `#${e.num} ${e.words}w ${e.inRange ? "OK" : "LOW"} — ${e.subject}`).join("\n");
console.log(`Wrote ${OUT_HTML}`);
console.log(`Wrote ${PASTE_HTML}`);
console.log(`Wrote ${GALLERY_HTML}`);
console.log(`Heroes: ${HERO_DIR}`);
console.log(`PNG heroes: ${PNG_DIR}`);
console.log(`Diagrams: ${DIAGRAM_DIR}`);
console.log(`${emails.length} newsletters\nTarget: ${WORD_TARGETS.min}–${WORD_TARGETS.max} words\n\n${summary}`);
