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
    .map(
      (e) => `<a class="index-card" href="newsletters/letter-${String(e.num).padStart(2, "0")}.html">
  <div class="index-thumb"><img src="${escHtml(e.heroRel)}" alt="" loading="lazy" /></div>
  <div class="index-meta">
    <span class="index-num">#${String(e.num).padStart(2, "0")}</span>
    <h3>${escHtml(e.subject)}</h3>
    <p>${escHtml(e.preheader)}</p>
    <span class="index-date">${escHtml(e.date)} · ${e.words} words · ${escHtml(e.format || "essay")}</span>
  </div>
</a>`
    )
    .join("\n");

  const letters = emails
    .map(
      (e) => `<section class="email-section" id="email-${e.num}">
  <div class="email-toolbar">
    <a class="back-link" href="#top">↑ All 12</a>
  </div>
  <div class="substack-guide">
    <div class="substack-guide-head">
      <span class="substack-tag">One-click Substack paste</span>
      <p class="substack-next">Copies <strong>hero image + title + subtitle + full body + inline diagram</strong> — paste once into Substack with Ctrl+V</p>
    </div>
    <div class="copy-row substack-copy-row">
      <button type="button" class="btn btn-primary btn-lg" data-copy-rich="email-${e.num}" data-label="Copy full post">Copy full post (images + text)</button>
      <button type="button" class="btn" data-copy="subject${e.num}" data-label="Copy subject only">Subject only</button>
      <button type="button" class="btn" data-copy="preheader${e.num}" data-label="Copy subtitle only">Subtitle only</button>
    </div>
    <p class="substack-foot">In Substack: paste in the editor (<em>Start writing…</em>). Title + subtitle are included in the paste — delete those lines at the top if Substack already has them in the header fields.</p>
  </div>
  <div class="stage">
    <div class="hero-wrap">
      <img id="hero-preview-${e.num}" data-hero-img src="${escHtml(e.heroRel)}" alt="${escHtml(e.subject)}" crossorigin="anonymous" />
    </div>
    ${letterArticleHtml(e)}
    <p class="word-count">${e.words} words${e.inRange ? "" : " · outside target"} · Week ${e.week}</p>
  </div>
  <textarea id="body${e.num}" class="sr-only" readonly>${escHtml(e.body)}</textarea>
  <textarea id="subject${e.num}" class="sr-only" readonly>${escHtml(e.subject)}</textarea>
  <textarea id="preheader${e.num}" class="sr-only" readonly>${escHtml(e.preheader)}</textarea>
  <textarea id="full${e.num}" class="sr-only" readonly>${escHtml(e.pasteBlock)}</textarea>
</section>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>12 Premium Newsletters — Andrei Lucian</title>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    :root {
      --ink: #0c0c0c; --paper: #f6f4ef; --paper-dark: #ebe8e1;
      --muted: #6b6560; --rule: #d4cfc6; --bg: #050505;
    }
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { font-family: Inter, system-ui, sans-serif; background: var(--bg); color: #eee; }
    .top-bar {
      position: sticky; top: 0; z-index: 200;
      display: flex; align-items: center; justify-content: space-between;
      gap: 12px; flex-wrap: wrap; padding: 12px 20px;
      background: rgba(12,12,12,0.95); backdrop-filter: blur(12px);
      border-bottom: 1px solid #222;
    }
    .top-bar h1 { font-size: 0.85rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #888; }
    .top-bar h1 span { color: #fff; }
    .analysis { max-width: 960px; margin: 0 auto; padding: 40px 20px 24px; }
    .analysis h2 { font-family: "Instrument Serif", Georgia, serif; font-size: 2rem; font-weight: 400; color: #f6f4ef; margin-bottom: 8px; }
    .analysis .lead { color: #888; font-size: 0.95rem; line-height: 1.6; max-width: 640px; margin-bottom: 24px; }
    .analysis-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 12px; margin-bottom: 32px; }
    .analysis-card { background: #111; border: 1px solid #222; border-radius: 6px; padding: 16px; }
    .analysis-card h4 { font-size: 0.65rem; letter-spacing: 0.12em; text-transform: uppercase; color: #666; margin-bottom: 6px; }
    .analysis-card p { font-size: 0.85rem; color: #ccc; line-height: 1.5; }
    .index { max-width: 960px; margin: 0 auto; padding: 0 20px 48px; }
    .index h3 { font-size: 0.7rem; letter-spacing: 0.14em; text-transform: uppercase; color: #666; margin-bottom: 16px; }
    .index-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .index-card {
      display: block; text-decoration: none; color: inherit;
      background: #111; border: 1px solid #222; border-radius: 6px; overflow: hidden;
      transition: border-color 0.15s;
    }
    .index-card:hover { border-color: #444; }
    .index-thumb { aspect-ratio: 16/9; overflow: hidden; background: #1a1a1a; }
    .index-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .index-meta { padding: 14px 16px; }
    .index-num { font-size: 0.65rem; letter-spacing: 0.1em; color: #666; }
    .index-meta h3 { font-family: "Instrument Serif", Georgia, serif; font-size: 1.1rem; color: #f6f4ef; margin: 6px 0; line-height: 1.3; font-weight: 400; }
    .index-meta p { font-size: 0.8rem; color: #888; line-height: 1.4; margin-bottom: 8px; }
    .index-date { font-size: 0.72rem; color: #555; }
    .email-section { border-top: 1px solid #1a1a1a; padding-top: 8px; }
    .email-toolbar {
      max-width: 720px; margin: 0 auto; padding: 16px 16px 0;
      display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;
    }
    .back-link { font-size: 0.78rem; color: #888; text-decoration: none; }
    .back-link:hover { color: #fff; }
    .copy-row { display: flex; gap: 8px; flex-wrap: wrap; }
    .btn {
      padding: 8px 14px; border-radius: 6px; border: 1px solid #333;
      background: #1a1a1a; color: #eee; font-size: 0.78rem; font-weight: 600;
      cursor: pointer;
    }
    .btn:hover { border-color: #555; }
    .btn-primary { background: #f6f4ef; color: #0c0c0c; border-color: #f6f4ef; }
    .btn.ok { background: #1a4d3a; border-color: #2d6b52; color: #a8e6c7; }
    .btn-lg { padding: 10px 18px; font-size: 0.85rem; }
    .substack-guide {
      max-width: 720px; margin: 0 auto 0; padding: 0 16px 16px;
      background: linear-gradient(180deg, #12150f 0%, #0a0c08 100%);
      border: 1px solid #3d4a2a; border-radius: 8px;
      box-shadow: 0 0 0 1px #1a1f14 inset;
    }
    .email-section .substack-guide { margin-top: 8px; margin-bottom: 8px; padding: 16px 18px; }
    .substack-guide-head { margin-bottom: 12px; }
    .substack-tag {
      display: inline-block; font-size: 0.62rem; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: #c9a227; margin-bottom: 6px;
    }
    .substack-next { font-size: 0.82rem; color: #b8c4a8; line-height: 1.5; }
    .substack-next strong { color: #f6f4ef; }
    .substack-next em { color: #c9a227; font-style: normal; }
    .substack-steps {
      margin: 0 0 14px 1.1em; font-size: 0.78rem; color: #888; line-height: 1.7;
    }
    .substack-steps li { margin-bottom: 2px; }
    .substack-steps .step-active { color: #e8e4dc; font-weight: 600; }
    .substack-steps .step-label {
      display: inline-block; min-width: 52px; font-size: 0.62rem; font-weight: 700;
      letter-spacing: 0.08em; text-transform: uppercase; color: #666; margin-right: 4px;
    }
    .substack-steps .step-active .step-label { color: #c9a227; }
    .substack-copy-row { gap: 8px; }
    .substack-foot { font-size: 0.72rem; color: #666; margin-top: 12px; line-height: 1.55; }
    .substack-foot em { color: #888; font-style: normal; }
    .stage { max-width: 720px; margin: 0 auto; padding: 24px 16px 64px; }
    .hero-wrap { border-radius: 4px; overflow: hidden; box-shadow: 0 24px 80px rgba(0,0,0,0.5); }
    .hero-wrap img { width: 100%; display: block; }
    .letter { background: var(--paper); border-radius: 0 0 4px 4px; padding: 48px 44px 56px; box-shadow: 0 24px 80px rgba(0,0,0,0.4); color: var(--ink); }
    @media (max-width: 600px) { .letter { padding: 32px 22px 40px; } }
    .letter-meta { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; font-size: 0.75rem; color: var(--muted); margin-bottom: 28px; padding-bottom: 20px; border-bottom: 1px solid var(--rule); }
    .letter-meta .dot { width: 3px; height: 3px; border-radius: 50%; background: var(--muted); }
    .letter h1 { font-family: "Instrument Serif", Georgia, serif; font-size: clamp(1.75rem, 5vw, 2.5rem); font-weight: 400; line-height: 1.12; letter-spacing: -0.02em; margin-bottom: 12px; }
    .subtitle { font-family: "Instrument Serif", Georgia, serif; font-style: italic; font-size: 1.1rem; color: var(--muted); margin-bottom: 36px; line-height: 1.5; }
    .letter-body { font-family: "Instrument Serif", Georgia, serif; font-size: 1.125rem; line-height: 1.82; color: #1a1816; }
    .letter-body p { margin-bottom: 1.35em; }
    .letter-body p.lead { font-size: 1.2rem; line-height: 1.75; }
    .letter-body h2 { font-family: Inter, sans-serif; font-size: 0.72rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); margin: 2.8em 0 1em; }
    .letter-body blockquote { margin: 2em 0; padding: 24px 28px; background: var(--paper-dark); border-left: 3px solid #1a1a1a; font-style: italic; font-size: 1.15rem; line-height: 1.65; }
    .letter-body blockquote cite { display: block; margin-top: 12px; font-style: normal; font-family: Inter, sans-serif; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); }
    .letter-body ul, .letter-body ol { margin: 0 0 1.35em 1.2em; }
    .letter-body li { margin-bottom: 0.5em; }
    .letter-body .pull { font-size: 1.3rem; font-style: italic; text-align: center; color: #3a3530; margin: 2em 0; padding: 0 1em; line-height: 1.6; }
    .letter-body .divider { border: none; border-top: 1px solid var(--rule); margin: 2.5em 0; }
    .framework { background: var(--paper-dark); border: 1px solid var(--rule); border-radius: 4px; padding: 24px 28px; margin: 2em 0; }
    .framework-title { font-family: Inter, sans-serif; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.12em; text-transform: uppercase; color: var(--muted); margin-bottom: 16px; }
    .framework ol { margin: 0; padding-left: 1.2em; font-family: Inter, sans-serif; font-size: 0.92rem; line-height: 1.7; }
    .inline-diagram { margin: 2em 0; border-radius: 2px; overflow: hidden; border: 1px solid var(--rule); background: #f3f1ec; }
    .inline-diagram svg { width: 100%; display: block; }
    .diagram-cap { font-family: Inter, sans-serif; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); text-align: center; padding: 10px; background: var(--paper-dark); border-top: 1px solid var(--rule); }
    .log-block { margin: 2em 0; border-left: 3px solid var(--ink); padding-left: 20px; font-family: Inter, sans-serif; font-size: 0.92rem; line-height: 1.8; }
    .log-row { margin-bottom: 12px; color: #2a2622; }
    .timeline { margin: 2em 0; padding-left: 8px; }
    .tl-row { display: flex; gap: 16px; margin-bottom: 20px; align-items: flex-start; }
    .tl-dot { width: 10px; height: 10px; border-radius: 50%; background: var(--ink); margin-top: 8px; flex-shrink: 0; }
    .tl-text { font-family: Inter, sans-serif; font-size: 0.95rem; line-height: 1.65; color: #2a2622; }
    .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin: 2em 0; }
    @media (max-width: 600px) { .stats-grid { grid-template-columns: repeat(2, 1fr); } }
    .stat-card { background: var(--paper-dark); border: 1px solid var(--rule); border-radius: 4px; padding: 16px; text-align: center; }
    .stat-val { display: block; font-family: Inter, sans-serif; font-size: 1.1rem; font-weight: 700; color: var(--ink); margin-bottom: 4px; }
    .stat-label { font-family: Inter, sans-serif; font-size: 0.68rem; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted); }
    .compare-grid { display: grid; gap: 12px; margin: 2em 0; }
    .compare-card { background: var(--paper-dark); border: 1px solid var(--rule); border-radius: 4px; padding: 18px 22px; }
    .compare-card h4 { font-family: Inter, sans-serif; font-size: 0.8rem; font-weight: 600; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.06em; }
    .compare-card .good { font-size: 0.92rem; color: #2a4a3a; margin-bottom: 6px; font-family: Inter, sans-serif; }
    .compare-card .bad { font-size: 0.92rem; color: #6b4545; font-family: Inter, sans-serif; }
    .split-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin: 2em 0; }
    @media (max-width: 600px) { .split-grid { grid-template-columns: 1fr; } }
    .split-col { background: #f0eeea; border: 1px solid var(--rule); border-radius: 4px; padding: 20px; }
    .split-col.accent { background: #fff; border-color: var(--ink); border-width: 2px; }
    .split-col h4 { font-family: Inter, sans-serif; font-size: 0.72rem; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted); margin-bottom: 12px; }
    .split-col p { font-family: Inter, sans-serif; font-size: 0.9rem; line-height: 1.6; margin-bottom: 8px; color: #2a2622; }
    .cta-block { margin-top: 2.5em; padding: 24px 28px; background: #0c0c0c; color: #e8e4dc; border-radius: 4px; }
    .cta-block p { font-family: Inter, sans-serif; font-size: 0.88rem; line-height: 1.65; margin-bottom: 12px; color: #aaa; }
    .cta-block a { color: #f6f4ef; font-weight: 600; text-decoration: none; border-bottom: 1px solid #555; }
    .word-count { text-align: center; margin-top: 24px; font-size: 0.72rem; color: #555; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); border: 0; }
  </style>
</head>
<body id="top">
  <div class="top-bar">
    <h1><span>12 Newsletters</span> · Premium Visual · Andrei Lucian</h1>
    <span style="font-size:0.75rem;color:#555">Biweekly · Jul–Dec 2026 · <a href="substack-12-emails-paste-kit.html" style="color:#c9a227">Paste kit →</a></span>
  </div>

  <div class="analysis">
    <h2>12 formats · woodcut visuals · your voice</h2>
    <p class="lead">Premium long-form letters — vintage black &amp; white engravings like top creator blogs. Hand-inked metaphors, cream paper texture, original Andrei proof.</p>
    <div class="analysis-grid">
      <div class="analysis-card"><h4>Formats</h4><p>Essay · experiment log · timeline · letter · autopsy · split-test · case study</p></div>
      <div class="analysis-card"><h4>Visual</h4><p>Woodcut engraving style · B&amp;W ink · stippling · symbolic metaphors</p></div>
      <div class="analysis-card"><h4>Voice</h4><p>Blunt, numeric, anti-guru — 5.3K 𝕏 · 16.2K LinkedIn · 1,100+ subs</p></div>
      <div class="analysis-card"><h4>Length</h4><p>${WORD_TARGETS.min}–${WORD_TARGETS.max} words · 6–8 min read each</p></div>
      <div class="analysis-card"><h4>Cadence</h4><p>Biweekly Fridays · Jul–Dec 2026</p></div>
      <div class="analysis-card"><h4>Workflow</h4><p><strong>Copy full post</strong> → paste once in Substack (hero + text + diagrams)</p></div>
    </div>
  </div>

  <div class="index">
    <h3>All 12 newsletters</h3>
    <div class="index-grid">${cards}</div>
  </div>

  ${letters}

  <script>${CLIPBOARD_JS}</script>
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
