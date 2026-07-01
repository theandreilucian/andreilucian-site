/**
 * Build Substack emails — 3 per week (Mon educate · Wed story · Fri product)
 * Jul 1 – Aug 8, 2026 · Mon / Wed / Fri only
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { WORD_TARGETS, X_LANDING, X_SYSTEM_NAME, X_SYSTEM_PRICE } from "./substack-3day-format.mjs";
import { build3DaySchedule } from "./substack-3day-schedule.mjs";
import { bodyWithDiagramHtml } from "./substack-3day-body-html.mjs";
import { build3DayLetterPages } from "./build_3day_letter_pages.mjs";
import { RICH_PASTE_JS } from "./substack-dan-koe-rich-paste.mjs";
import { escHtml } from "./substack-dan-koe-format.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");


function buildSchedule() {
  return build3DaySchedule().map((e) => ({ ...e, date: e.dateHeading }));
}

function renderHtml(emails) {
  const cards = emails
    .map(
      (e) => `<article class="card role-${e.role}" id="email-${e.num}">
  <header class="head">
    <span class="idx">#${String(e.num).padStart(2, "0")}</span>
    <div>
      <h2>${escHtml(e.date)} · ${escHtml(e.roleLabel)}</h2>
      <p class="meta">Week ${e.week} · ${escHtml(e.format)} · ${e.words} words</p>
    </div>
  </header>
  <div class="substack-box">
    <div class="paste-head">
      <span>One-click Substack paste</span>
      <div class="copy-row">
        <button type="button" class="btn primary" data-copy-rich="email-${e.num}" data-label="Copy full post">Copy full post (images + text)</button>
        <button type="button" class="btn" data-copy="subject${e.num}" data-label="Copy subject">Subject only</button>
        <button type="button" class="btn" data-copy="preheader${e.num}" data-label="Copy subtitle">Subtitle only</button>
      </div>
    </div>
    <p class="substack-hint">Hero woodcut + diagram + body in one paste. Click <em>Start writing…</em> in Substack → Ctrl+V</p>
    <textarea id="subject${e.num}" class="sr-only" readonly aria-hidden="true">${escHtml(e.subject)}</textarea>
    <textarea id="preheader${e.num}" class="sr-only" readonly aria-hidden="true">${escHtml(e.preheader)}</textarea>
  </div>
  <div class="visuals">
    <p class="visual-label">Woodcut graphics · Dan Koe style</p>
    <div class="visual-grid">
      <div class="visual-card woodcut-card">${e.visualA}<p class="visual-caption">Hero · ${escHtml(e.captionA)}</p></div>
      <div class="visual-card woodcut-card">${e.visualB}<p class="visual-caption">Diagram · ${escHtml(e.captionB)}</p></div>
    </div>
  </div>
  <div class="rich-source" aria-hidden="true">
    <img data-hero-img src="${escHtml(e.heroRel)}" alt="" crossorigin="anonymous" />
    <article data-letter-root>
      <h1>${escHtml(e.subject)}</h1>
      <p class="subtitle">${escHtml(e.preheader)}</p>
      <div class="letter-body">${bodyWithDiagramHtml(e.substackBody, e.diagramRel, e.captionB)}</div>
    </article>
  </div>
  <details class="full-block">
    <summary>Plain text body only</summary>
    <div class="paste-box">
      <div class="paste-head">
        <span>Text</span>
        <button type="button" class="btn" data-copy="substack${e.num}" data-label="Copy body">Copy body</button>
      </div>
      <textarea id="substack${e.num}" class="paste-area substack-area" readonly spellcheck="false">${escHtml(e.substackBody)}</textarea>
    </div>
  </details>
  <div class="meta-row">
    <span class="wc ${e.inRange ? "ok" : "warn"}">${e.words} words</span>
    <span class="subj-preview">Subject: ${escHtml(e.subject)}</span>
  </div>
</article>`
    )
    .join("\n");

  const weekNav = emails
    .filter((e, i, arr) => i === 0 || e.week !== arr[i - 1].week)
    .map((e) => `<a href="#email-${e.num}">Week ${e.week}</a>`)
    .join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>17 Substack Emails — Jul–Aug 2026 · Mon/Wed/Fri</title>
  <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif&family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
  <style>
    :root { --bg:#050505; --card:#111; --border:#222; --text:#eee; --muted:#888; --accent:#c9a227; --paper:#f6f4ef; --edu:#9eb8d4; --story:#c4a8e8; }
    * { box-sizing:border-box; margin:0; padding:0; }
    body { font-family:Inter,system-ui,sans-serif; background:var(--bg); color:var(--text); padding:20px 14px 64px; line-height:1.55; }
    .wrap { max-width:720px; margin:0 auto; }
    h1 { font-family:"Instrument Serif",Georgia,serif; font-size:1.85rem; font-weight:400; letter-spacing:-0.02em; }
    .lead { color:var(--muted); margin:8px 0 16px; font-size:0.9rem; }
    .hero { background:var(--card); border:1px solid var(--border); border-radius:8px; padding:16px 18px; margin-bottom:20px; font-size:0.84rem; color:var(--muted); line-height:1.65; }
    .hero strong { color:#fff; }
    .hero a { color:var(--accent); }
    .nav { display:flex; flex-wrap:wrap; gap:5px; margin-bottom:24px; }
    .nav a { font-size:0.7rem; font-weight:600; color:var(--muted); text-decoration:none; padding:5px 8px; border:1px solid var(--border); border-radius:5px; }
    .nav a:hover { color:#fff; border-color:var(--accent); }
    .card { background:var(--card); border:1px solid var(--border); border-radius:8px; margin-bottom:24px; overflow:hidden; }
    .card.role-educate { border-top:3px solid var(--edu); }
    .card.role-story { border-top:3px solid var(--story); }
    .card.role-sell { border-top:3px solid var(--accent); }
    .head { display:flex; gap:12px; padding:14px 16px 0; }
    .idx { font-size:0.65rem; font-weight:700; color:var(--muted); background:var(--bg); border:1px solid var(--border); padding:4px 7px; border-radius:5px; height:fit-content; }
    .head h2 { font-size:0.92rem; font-weight:700; }
    .meta { font-size:0.74rem; color:var(--muted); margin-top:2px; }
    .visuals { padding:12px 16px 0; }
    .visual-label { font-size:0.65rem; text-transform:uppercase; letter-spacing:0.05em; color:var(--muted); margin-bottom:8px; }
    .visual-grid { display:grid; gap:12px; }
    .visual-card { border:1px solid var(--border); border-radius:6px; overflow:hidden; }
    .visual-card.woodcut-card { background:var(--paper); }
    .visual-card img { width:100%; display:block; }
    .visual-caption { font-size:0.72rem; color:var(--muted); padding:8px 12px 10px; border-top:1px solid var(--border); background:var(--bg); }
    .substack-box { margin:14px 16px 0; padding:14px; background:#0a0a08; border:2px solid var(--accent); border-radius:8px; }
    .substack-hint { font-size:0.78rem; color:var(--muted); margin:8px 0 0; }
    .substack-hint em { color:var(--accent); font-style:normal; }
    .copy-row { display:flex; flex-wrap:wrap; gap:6px; }
    .substack-area { min-height:280px; border-color:#3a4555; font-family:Inter,system-ui,sans-serif; font-size:0.92rem; line-height:1.65; }
    .full-block { margin:10px 16px 0; font-size:0.8rem; color:var(--muted); }
    .full-block summary { cursor:pointer; padding:8px 0; }
    .paste-box { margin:14px 16px 0; }
    .paste-head { display:flex; justify-content:space-between; align-items:center; margin-bottom:8px; gap:8px; flex-wrap:wrap; }
    .paste-head span { font-size:0.65rem; font-weight:700; text-transform:uppercase; letter-spacing:0.06em; color:var(--accent); }
    .paste-area { width:100%; min-height:320px; padding:14px; background:#060708; border:2px solid var(--border); border-radius:8px; color:#f4f5f7; font-family:Inter,system-ui,sans-serif; font-size:0.92rem; line-height:1.65; resize:vertical; white-space:pre-wrap; }
    .sr-only { position:absolute; width:1px; height:1px; padding:0; margin:-1px; overflow:hidden; clip:rect(0,0,0,0); border:0; }
    .rich-source { position:absolute; left:-9999px; width:720px; opacity:0; pointer-events:none; }
    .meta-row { display:flex; justify-content:space-between; padding:10px 16px 14px; font-size:0.72rem; color:var(--muted); flex-wrap:wrap; gap:6px; }
    .wc.ok { color:#6ee7a0; }
    .wc.warn { color:#ffb020; }
    .btn { padding:7px 12px; border-radius:7px; border:1px solid var(--border); background:#1a1a1a; color:var(--text); font-weight:600; font-size:0.78rem; cursor:pointer; }
    .btn.primary { background:var(--paper); border-color:var(--paper); color:#0c0c0c; }
    .btn.ok { background:#1a4d3a; border-color:#2d6b52; color:#a8e6c7; }
  </style>
</head>
<body>
  <div class="wrap">
    <h1>17 emails · Jul 1 – Aug 8, 2026</h1>
    <p class="lead">Mon / Wed / Fri · Mon+Wed ~700–800 words · Fri 200–350 · last send Fri Aug 7</p>
    <div class="hero">
      <strong>Weekly rhythm:</strong><br />
      Monday → <strong>Educate</strong> (personal brand, writing online, 𝕏, LinkedIn, platform choice)<br />
      Wednesday → <strong>Story</strong> (life, journey, mindset, lessons — no tactics)<br />
      Friday → <strong>${X_SYSTEM_NAME}</strong> (direct sale · 200–350 words)<br /><br />
      <strong>Visual style:</strong> Dan Koe woodcut — vintage B&amp;W heroes + cream diagrams<br /><br />
      <strong>Mon + Wed:</strong> value + soft P.S. with <a href="${X_LANDING}">landing page</a><br />
      <strong>Friday:</strong> lean pitch · bonuses · ${X_SYSTEM_PRICE}<br /><br />
      Regenerate: <code>node scripts/build_substack_3day_series.mjs</code>
    </div>
    <nav class="nav">${weekNav}</nav>
    ${cards}
  </div>
  <script>
    document.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const el = document.getElementById(btn.dataset.copy);
        if (!el) return;
        navigator.clipboard.writeText(el.value).then(() => flashBtn(btn)).catch(() => alert('Copy failed'));
      });
    });
    ${RICH_PASTE_JS}
  </script>
</body>
</html>`;
}

function renderTxt(emails) {
  return `17 SUBSTACK EMAILS — MON / WED / FRI — JUL 1 – AUG 8, 2026
Mon Story · Wed Educate · Fri Product · last send Fri Aug 7
${"=".repeat(70)}

${emails.map((e) => e.pasteBlock).join(`\n\n${"=".repeat(70)}\n\n`)}
`;
}

const emails = buildSchedule();
const htmlPath = path.join(ROOT, "substack-17-emails-jul-aug-2026.html");
const txtPath = path.join(ROOT, "substack-17-emails-jul-aug-2026.txt");
const gfxDir = path.join(ROOT, "assets", "substack-3day-graphics");

fs.mkdirSync(gfxDir, { recursive: true });
for (const e of emails) {
  const id = String(e.num).padStart(2, "0");
  fs.copyFileSync(path.join(ROOT, e.heroRel), path.join(gfxDir, `email-${id}-hero.png`));
  fs.copyFileSync(path.join(ROOT, e.diagramRel), path.join(gfxDir, `email-${id}-diagram.svg`));
}

const html = renderHtml(emails);
const txt = renderTxt(emails);

fs.writeFileSync(htmlPath, html, "utf8");
fs.writeFileSync(txtPath, txt, "utf8");

const inRange = emails.filter((e) => e.inRange).length;
const wordRange = emails.map((e) => e.words);
const monWed = emails.filter((e) => e.dow === "mon" || e.dow === "wed");
const fri = emails.filter((e) => e.dow === "fri");
console.log(
  `Wrote ${emails.length} emails · words ${Math.min(...wordRange)}–${Math.max(...wordRange)} · ${inRange}/${emails.length} in target range`
);
console.log(
  `Mon/Wed: ${monWed.filter((e) => e.inRange).length}/${monWed.length} in ${WORD_TARGETS.mon.min}–${WORD_TARGETS.mon.max} · Fri: ${fri.filter((e) => e.inRange).length}/${fri.length} in ${WORD_TARGETS.fri.min}–${WORD_TARGETS.fri.max}`
);
console.log(`Graphics → ${gfxDir}`);
console.log(htmlPath);

const { paths: letterPaths, lettersDir } = build3DayLetterPages();
console.log(`Public letter pages → ${lettersDir} (${letterPaths.length} files)`);
