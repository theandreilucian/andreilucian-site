#!/usr/bin/env node
/**
 * Builds The 0 to 1K X System product (HTML hub + 7 modules).
 * Run: node scripts/build_0_to_1k_product.mjs
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PRODUCT, threeStepPathHtml, competitorTableHtml } from "./product-config.mjs";
import {
  diagramDomainMastery,
  diagramGAP,
  diagramIEE,
  diagramEcosystem,
  diagramCreativityProductivity,
  diagramIdeaBank,
  diagramDaily,
  diagram90Phases,
  diagramEngagementTiers,
  diagramToolStack,
  diagramWhoFor,
} from "./product-diagrams.mjs";
import { REPLY_TEMPLATES, THREAD_STARTERS, replyCard, threadCard } from "./product-extras.mjs";
import { engagementWritingSections } from "./product-engagement-writing.mjs";
import { bonusesPageBody } from "./product-bonuses.mjs";
import { stackWeaponsTableHtml } from "./product-stack.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.join(__dirname, "..");
const ROOT = path.join(REPO, "0-to-1K-X-System");

const PAGE_ORDER = [
  ["INDEX.html", "Hub", null],
  ["01-Start-Here.html", "Start", "Start Here"],
  ["05-Level-4-Philosophy.html", "Basics", "Growth Basics"],
  ["02-Level-1-Profile-Weapons.html", "Profile", "Your Profile"],
  ["03-Level-2-Content-Arsenal.html", "Posts", "Posts & Templates"],
  ["04-Level-3-Content-Production.html", "Batch", "Weekly Batch"],
  ["06-Level-5-Breakthrough-90-Day.html", "Daily", "90-Day Daily"],
  ["07-Bonuses.html", "Vault", "Bonus Vault"],
];

function headMeta(desc = PRODUCT.metaDescription) {
  return `<meta name="theme-color" content="#050505" />
  <meta name="description" content="${desc}" />
  <link rel="icon" href="product-icon.svg" type="image/svg+xml" />`;
}

function footer() {
  return "";
}

function cheatsheetBody() {
  return `
<header class="hero">
  <div class="badge">Print &amp; pin</div>
  <h1>90-Day Cheat Sheet</h1>
  <p class="sub">One page. Everything that matters daily. Bookmark or print.</p>
  <div class="cta-row no-print">
    <button type="button" class="btn-primary" onclick="window.print()">Print this page</button>
    <a class="btn-secondary" href="06-Level-5-Breakthrough-90-Day.html">Open Command Center</a>
  </div>
</header>
<section class="block"><h2>Daily non-negotiables</h2>
<table class="simple"><tr><th>When</th><th>Do this</th></tr>
<tr><td>Morning</td><td>1 post + 10 strategic replies</td></tr>
<tr><td>Midday</td><td>1 post + reply to comments + 10 replies</td></tr>
<tr><td>Evening</td><td>1 personality post + 10–20 replies + queue tomorrow</td></tr>
</table>
<p><strong>Totals:</strong> 2–3 posts · 30–50 quality replies</p></section>
<section class="block"><h2>GAP mix (weekly)</h2>
<table class="simple"><tr><th>Pillar</th><th>%</th><th>Job</th></tr>
<tr><td>Growth</td><td>30%</td><td>Reach, hooks, shares</td></tr>
<tr><td>Authority</td><td>30%</td><td>Proof, trust, expertise</td></tr>
<tr><td>Personality</td><td>40%</td><td>Connection, story, you</td></tr>
</table></section>
<section class="block"><h2>IEE — every post</h2>
<p><strong>E</strong>ntertainment (hook) + <strong>E</strong>ducation (value) + <strong>I</strong>nspiration (action)</p></section>
<section class="block"><h2>90-minute weekly batch</h2>
<ol><li>Pick 10–15 ideas from Notion</li><li>Hook variations (ChatGPT)</li><li>Fill templates (Module 4)</li><li>Quality check 7/8+</li><li>Queue 7–14 days in Hypefury</li></ol></section>
<section class="block"><h2>Engagement tiers</h2>
<table class="simple"><tr><th>Tier</th><th>Size</th><th>How often</th></tr>
<tr><td>1</td><td>50K+</td><td>2–3×/week, high-value</td></tr>
<tr><td>2</td><td>10K–50K</td><td>Daily</td></tr>
<tr><td>3</td><td>1K–10K</td><td>Daily, build peers</td></tr>
</table></section>
<section class="block"><h2>Stuck? Quick fix</h2>
<table class="simple"><tr><th>Symptom</th><th>Fix</th></tr>
<tr><td>Low impressions</td><td>More Growth templates + stronger hooks</td></tr>
<tr><td>No follows</td><td>Fix bio + pinned tweet</td></tr>
<tr><td>Stalled growth</td><td>More Tier 2/3 replies</td></tr>
<tr><td>Burnout</td><td>Batch Sundays · 2 posts max</td></tr>
</table></section>
<section class="block"><h2>90-day phases</h2>
<table class="simple"><tr><th>Days</th><th>Focus</th><th>Target</th></tr>
<tr><td>1–14</td><td>Profile + templates + habit</td><td>50–150</td></tr>
<tr><td>15–60</td><td>Daily GAP + replies + thread</td><td>150–500</td></tr>
<tr><td>61–90</td><td>Winners + lead magnet + DMs</td><td>500–1,000</td></tr>
</table></section>
<section class="block"><h2>Bio formula (copy)</h2>
<textarea class="tpl" readonly>I help [audience] go from 0 to 1K on X in 90 days with daily systems + strategic replies.

Building in public. Follow for the playbook.</textarea>
<button type="button" class="copy-btn">Copy</button>
</section>`;
}

// Recommended learning order (inspired by structured courses — adapted for 0→1K on X)
const CURRICULUM = [
  {
    id: "m1", num: 1, title: "Start Here", file: "01-Start-Here.html",
    lessons: [
      { id: "welcome", title: "Welcome & Orientation" },
      { id: "who-benefits", title: "Who This Is For" },
      { id: "about-me", title: "About Andrei — Why Listen" },
      { id: "philosophy", title: "My Growth Philosophy" },
      { id: "how-to-use", title: "How To Use This System" },
      { id: "platform-setup", title: "Platform Controls & Rules" },
    ],
  },
  {
    id: "m2", num: 2, title: "Growth Fundamentals", file: "05-Level-4-Philosophy.html",
    lessons: [
      { id: "what-to-post", title: "What Do You Post About?" },
      { id: "who-for", title: "Who Are You Writing For?" },
      { id: "awareness", title: "Awareness & Attention" },
      { id: "gap-pillars", title: "The GAP Content Mix" },
      { id: "ecosystem", title: "Your 3-Layer X Ecosystem" },
      { id: "networking", title: "Connect Without Being Needy" },
    ],
  },
  {
    id: "m3", num: 3, title: "Profile & Positioning", file: "02-Level-1-Profile-Weapons.html",
    lessons: [
      { id: "profile-audit", title: "Profile Audit Checklist" },
      { id: "bio-formulas", title: "Bio Formulas That Convert" },
      { id: "pinned-tweet", title: "Your Pinned Tweet" },
      { id: "niche-clarity", title: "Niche Clarity (3 Questions)" },
    ],
  },
  {
    id: "m4", num: 4, title: "The X Content Playbook", file: "03-Level-2-Content-Arsenal.html",
    lessons: [
      { id: "gap-framework", title: "GAP Framework" },
      { id: "iee-framework", title: "IEE — Hook, Value, Action" },
      { id: "domain-mastery", title: "Domain of Mastery" },
      { id: "engagement-mindset", title: "The Engagement Writing System" },
      { id: "idea-sourcing", title: "High-Performing Idea Sources" },
      { id: "idea-to-content", title: "Turn Ideas Into Posts" },
      { id: "tweet-structures", title: "22 Tweet Structures" },
      { id: "more-structures", title: "More Ways To Find Posts" },
      { id: "growth-templates", title: "15 Growth Templates" },
      { id: "authority-templates", title: "15 Authority Templates" },
      { id: "personality-templates", title: "15 Personality Templates" },
    ],
  },
  {
    id: "m5", num: 5, title: "The Daily Workflow", file: "04-Level-3-Content-Production.html",
    lessons: [
      { id: "creativity-productivity", title: "Creativity vs Productivity" },
      { id: "research-not-scroll", title: "Research, Don't Mindlessly Scroll" },
      { id: "idea-bank", title: "The Idea Bank System" },
      { id: "batch-routine", title: "The 90-Minute Batch" },
      { id: "queue-winners", title: "Queue, Schedule & Remix Winners" },
    ],
  },
  {
    id: "m6", num: 6, title: "90-Day Command Center", file: "06-Level-5-Breakthrough-90-Day.html",
    lessons: [
      { id: "daily-checklist", title: "Daily Checklist" },
      { id: "engagement-tiers", title: "Engagement Tiers (Pokedex)" },
      { id: "phases", title: "90-Day Phases" },
      { id: "diagnosis", title: "Stuck? Diagnosis" },
      { id: "dms", title: "Non-Needy DM Framework" },
    ],
  },
  {
    id: "m7", num: 7, title: "Bonuses & Resources", file: "07-Bonuses.html",
    lessons: [
      { id: "toolkit", title: "Execution Toolkit" },
      { id: "playbooks", title: "Writing Playbooks" },
    ],
  },
];

function lessonNav(moduleFile) {
  const mod = CURRICULUM.find((m) => m.file === moduleFile);
  if (!mod) return "";
  return `<nav class="lesson-outline" aria-label="Lessons in this module">${mod.lessons
    .map((l, i) => `<a href="#${l.id}"><span class="lo-num">${i + 1}</span>${l.title}</a>`)
    .join("")}</nav>`;
}

function curriculumHtml() {
  return `<section class="block curriculum-wrap">
  <h2>Course curriculum</h2>
  <p class="curriculum-intro">Work through in order — fundamentals → profile → content → workflow → daily execution. Click a lesson to jump in.</p>
  <div class="curriculum" id="curriculum">${CURRICULUM.map((mod) => {
    const n = mod.lessons.length;
    return `<div class="cur-module" data-module="${mod.id}">
      <button type="button" class="cur-module-head" aria-expanded="false">
        <span class="cur-module-title">Module ${mod.num}: ${mod.title}</span>
        <span class="cur-module-meta"><span class="cur-count" data-mod="${mod.id}">0/${n}</span><span class="cur-chevron" aria-hidden="true">▼</span></span>
      </button>
      <ul class="cur-lessons">${mod.lessons
        .map((l) => `<li><a href="${mod.file}#${l.id}" data-lesson="${mod.id}:${l.id}"><span class="cur-check" aria-hidden="true"></span>${l.title}</a></li>`)
        .join("")}</ul>
    </div>`;
  }).join("")}</div>
</section>`;
}

function copyBonuses() {
  const dest = path.join(ROOT, "07-Bonuses", "includes");
  const coversDest = path.join(ROOT, "07-Bonuses", "covers");
  fs.mkdirSync(dest, { recursive: true });
  fs.mkdirSync(coversDest, { recursive: true });

  const files = [
    ["EBOOK_THE_X_WRITING_PLAYBOOK.html", "x-writing-playbook.html"],
    ["EBOOK_LINKEDIN_WRITING_PLAYBOOK.html", "linkedin-writing-playbook.html"],
    ["playing-to-win.html", "playing-to-win.html"],
    ["x-simplified.html", "x-simplified.html"],
    ["THE_PERSONAL_BRANDING_SYSTEM_EBOOK.html", "personal-branding-system.html"],
    ["x-growth-giveaway-ebook.html", "120-followers-23-days.html"],
  ];
  for (const [src, out] of files) {
    const from = path.join(REPO, src);
    if (!fs.existsSync(from)) continue;
    let html = fs.readFileSync(from, "utf8");
    if (out === "playing-to-win.html" || out === "x-simplified.html") {
      html = patchEbookLanding(html, out);
    }
    fs.writeFileSync(path.join(dest, out), html);
  }

  const covers = [
    ["assets/ebook-cover-the-x-writing-playbook.png", "x-writing-playbook.png"],
    ["assets/ebook-cover-linkedin-playbook.png", "linkedin-writing-playbook.png"],
    ["assets/ebook-cover-playing-to-win.png", "playing-to-win.png"],
    ["assets/ebook-cover-x-playbook.png", "x-simplified.png"],
    ["assets/ebook-cover-center.png", "personal-branding-system.png"],
    ["assets/ebook-cover-blueprint-fiction.png", "120-followers.png"],
  ];
  for (const [src, out] of covers) {
    const from = path.join(REPO, src);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(coversDest, out));
  }

  const pdfs = [
    ["assets/the-x-writing-playbook.pdf", "the-x-writing-playbook.pdf"],
    ["assets/the-linkedin-writing-playbook.pdf", "the-linkedin-writing-playbook.pdf"],
  ];
  for (const [src, out] of pdfs) {
    const from = path.join(REPO, src);
    if (fs.existsSync(from)) fs.copyFileSync(from, path.join(dest, out));
  }
}

function patchEbookLanding(html, filename) {
  const gumroad =
    filename === "playing-to-win.html"
      ? "https://andreilucian.gumroad.com/l/smyhyb"
      : "https://andreilucian.gumroad.com/l/fjaid";
  const cover =
    filename === "playing-to-win.html" ? "../covers/playing-to-win.png" : "../covers/x-simplified.png";

  return html
    .replace(/assets\/images\/playing-to-win-cover\.png\.jpg/g, cover)
    .replace(/assets\/images\/x-simplified-cover\.png\.png/g, cover)
    .replace(/href="index\.html"/g, 'href="../../INDEX.html"')
    .replace(
      /<div class="product-form-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
      `<div class="product-form-wrapper">
                <p style="color:#00d26a;font-weight:700;margin-bottom:12px;font-size:14px">✓ Included with ${PRODUCT.name} — no email required</p>
                <a href="${gumroad}" target="_blank" rel="noopener" class="product-submit-btn" style="display:inline-block;text-decoration:none;text-align:center">Read full ebook →</a>
            </div>
        </div>
    </div>`
    )
    .replace(/<script src="script\.js[^"]*"><\/script>/g, "")
    .replace(/<script>[\s\S]*?handleConvertKitSubmission[\s\S]*?<\/script>/g, "");
}

function nav(active) {
  return `<div class="nav-wrap"><nav class="top">${PAGE_ORDER.map(([href, label]) =>
    `<a href="${href}" class="${href === active ? "active" : ""}">${label}</a>`
  ).join("")}</nav></div>`;
}

function pageNav(active) {
  const idx = PAGE_ORDER.findIndex(([href]) => href === active);
  if (idx < 0) return "";
  const prev = idx > 0 ? PAGE_ORDER[idx - 1] : null;
  const next = idx < PAGE_ORDER.length - 1 ? PAGE_ORDER[idx + 1] : null;
  if (!prev && !next) return "";
  return `<nav class="page-nav" aria-label="Module navigation">
  ${prev ? `<a href="${prev[0]}" class="prev"><span class="nav-label">← Previous</span><span class="nav-title">${prev[2] || prev[1]}</span></a>` : '<span class="spacer"></span>'}
  ${next ? `<a href="${next[0]}" class="next"><span class="nav-label">Next →</span><span class="nav-title">${next[2] || next[1]}</span></a>` : ""}
</nav>`;
}

function page(title, active, body, opts = {}) {
  const dataAttr = opts.dataPage ? ` data-page="${opts.dataPage}"` : "";
  const bodyClass = opts.bodyClass ? ` class="${opts.bodyClass}"` : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — ${PRODUCT.name}</title>
  ${headMeta(opts.description)}
  <link rel="stylesheet" href="product-styles.css" />
</head>
<body${dataAttr}${bodyClass}>
<div class="wrap">
${nav(active)}
${body}
${pageNav(active)}
${footer()}
</div>
<script src="product.js"></script>
</body>
</html>`;
}

function tplCard(pillar, num, name, formula, example, blank) {
  const cls = pillar.toLowerCase();
  return `<div class="template-card ${cls}">
  <div class="num">${pillar} Template ${num}</div>
  <h4>${name}</h4>
  <div class="formula">${formula}</div>
  <div class="example">${example}</div>
  <textarea class="tpl">${blank}</textarea>
  <button type="button" class="copy-btn">Copy</button>
</div>`;
}

const GROWTH_TEMPLATES = [
  ["Comparison (2 lines)", "You don't need [X]. You need [Y].", "You don't need more followers.\nYou need more engagement.", "You don't need [_____].\nYou need [_____]."],
  ["Comparison (4 lines)", "Line 1: You don't need X. Line 2: You need Y. Line 3: reason. Line 4: CTA.", "You don't need a perfect profile.\nYou need a clear bio.\nClarity converts.\nFix yours today.", "You don't need [_____].\nYou need [_____].\n[One reason].\n[CTA]."],
  ["Powerful One-Liner", "One sentence. One bold concept.", "You feel stuck because your subconscious knows you're capable of more.", "You feel [emotion] because [bold truth about your audience]."],
  ["List Tweet", "Hook + 5–9 bullets", "The best habits for growing on X:\n• Post daily\n• Reply 30x\n• Study winners\n• Fix your bio\n• Track metrics\n• Ship imperfect\n• Repeat 90 days", "[Hook statement]:\n• [item]\n• [item]\n• [item]\n• [item]\n• [item]"],
  ["Hook–List–Takeaway", "Hook → bullets → one-line closer", "How to hit 1K in 90 days:\n• Fix profile\n• Post 2-3x daily\n• 30 strategic replies\n• 1 thread/week\n• Review winners Sunday\n\nDon't overcomplicate it.", "How to [outcome]:\n• [step]\n• [step]\n• [step]\n• [step]\n\n[Takeaway line]."],
  ["Rule of Three", "Three parallel lines. Same structure.", "Post to be seen.\nReply to be known.\nThread to be trusted.", "[Verb] to [outcome].\n[Verb] to [outcome].\n[Verb] to [outcome]."],
  ["2×3 Before/After", "Time 1: 3 bullets. Time 2: 3 bullets. Closer.", "Month 1:\n• 50 followers\n• No system\n• Random posts\n\nMonth 3:\n• 600 followers\n• Daily queue\n• Weekly threads\n\nSystems beat motivation.", "[Time A]:\n• [state]\n• [state]\n• [state]\n\n[Time B]:\n• [state]\n• [state]\n• [state]\n\n[Closer]."],
  ["The Callout", "Common excuse → sharp correction", "\"I don't have time to post.\"\n\nWrong.\nYou have time. You lack a system.", "\"[Common excuse].\"\n\nWrong.\n[Sharp correction]."],
  ["Repetition List", "Repeat opener 6–9 times", "Reply.\nReply.\nReply.\nReply.\nReply.\nThen watch your followers move.", "[Word/phrase].\n[repeat 6-9x]\n[Punchline]."],
  ["Stop X / Start Y", "Stop [trap]. Start [better behavior].", "Stop posting without replying.\nStart treating X like a conversation.", "Stop [_____].\nStart [_____]."],
  ["99% Stat", "99% of [X] would be solved if [Y].", "99% of \"stuck at 200 followers\" problems would be solved if people replied 30x per day.", "99% of [problem] would be solved if [action]."],
  ["Challenging Belief", "You don't need [credential]. You need [skill].", "You don't need 10K followers to monetize.\nYou need 100 people who trust you.", "You don't need [_____].\nYou need [_____]."],
  ["If / Then", "If [condition], then [outcome]. One line each.", "If you reply to 30 accounts daily,\nthen your impressions 3x in 30 days.\n\nSimple math.", "If you [action],\nthen [outcome].\n\n[Closer]."],
  ["Unpopular Opinion", "Unpopular opinion: + bold take + one-line proof", "Unpopular opinion:\n\nPosting less grows you faster.\n\nI cut from 6 to 3 posts and doubled followers in 6 weeks.", "Unpopular opinion:\n\n[Bold take].\n\n[One-line proof]."],
  ["Question Hook", "Scroll-stopping question → short answer → CTA", "Why do small accounts get more engagement than big ones?\n\nBecause they reply like humans.\n\nBe human today.", "Why do [surprising thing]?\n\nBecause [insight].\n\n[CTA]."],
];

const AUTHORITY_TEMPLATES = [
  ["Process", "Result claim + disclaimers + numbered steps", "I gained 800 followers in 24 hours.\nNo ads. No bots.\n\n5 steps we used:\n1. Fixed the profile\n2. Posted 5x that day\n3. 50 strategic replies\n4. One thread\n5. Pinned the winner", "I [specific result].\nNo [bad tactics].\n\n[N] steps:\n1. [step]\n2. [step]\n3. [step]"],
  ["Strategies List", "Top [audience]: + 8–13 tactics", "Creators who hit 1K fast:\n• Post before they feel ready\n• Reply before they post\n• Study one mentor deeply\n• Batch weekly\n• Track winners\n• Cut generic comments\n• Thread weekly\n• Show proof early", "Top [audience]:\n• [tactic]\n• [tactic]\n• [tactic]\n• [tactic]"],
  ["Social Proof", "Free value given → 3 outcomes → closer", "I did 20 free profile reviews.\n\nThis let me:\n• Collect testimonials\n• Learn real pain points\n• Build trust fast\n\nOverdeliver before you sell.", "I did [free value].\n\nThis let me:\n• [outcome]\n• [outcome]\n• [outcome]\n\n[Closer]."],
  ["Case Study", "Name: metric A → B in timeframe + process hook", "Client went from 0 to 800 in 24 hours.\n\nHere's the 5-step system:\n(Thread)", "[Who] went from [A] to [B] in [time].\n\nHere's the [N]-step process:"],
  ["Niche Insight", "Common belief overrated + your data + focus line", "Posting more is overrated.\n\nMy growth doubled when I cut to 3 posts and 40 replies.\n\nFocus on conversations.", "[Belief] is overrated.\n\nMy [metric] improved when I [action].\n\nFocus on [what works]."],
  ["Proof Post", "Specific result + grind reality + lesson", "I hit [X followers] in [Y days].\n\nThe grind:\n• Inconsistent weeks\n• Bad hooks\n• Zero replies some days\n\nCompetence compounds. Keep shipping.", "I hit [result] in [timeframe].\n\nThe grind:\n• [reality]\n• [reality]\n• [reality]\n\n[Lesson]."],
  ["How-To Start Over", "I achieved X. If I started over:", "I grew to [X] on X.\n\nIf I started at 0 today:\n1. Fix bio today\n2. Queue 7 days in Hypefury\n3. 30 replies daily\n4. 1 thread/week\n5. Review Sundays", "I [achievement].\n\nIf I started over:\n1. [step]\n2. [step]\n3. [step]"],
  ["Deep Dive Hook", "Contrarian opener + borrowed learning + promise", "Most growth advice is recycled.\n\nI studied [mentor/resource] for [time].\n\n7 ideas you won't see on the timeline:\n(Thread)", "[Contrarian hook].\n\nI studied [source].\n\n[N] ideas:\n(Thread)"],
  ["Showing Competence", "Skill is a superpower + benefits + CTA", "Strategic replies are a superpower.\n\nMore impressions.\nMore followers.\nMore DMs.\n\nLearn the reply game."],
  ["Framework Thread", "Hook + problem + 3-5 steps + example + CTA", "90% of creators under 1K make this mistake...\n\nThey post without engaging.\n\nFix:\n1. Post 2-3x\n2. Reply 30x\n3. Tier your accounts\n4. Track weekly\n\nFollow for the 90-day system."],
  ["Before/After Results", "2×3 timeline with your numbers", "Day 1:\n• 12 followers\n• No bio\n• No queue\n\nDay 90:\n• 1,047 followers\n• Pinned thread\n• Gumroad live\n\nSystems work."],
  ["Competence List", "Skills that matter in [niche]", "Skills that matter on X in 2026:\n• Hooks\n• Replies\n• Batching\n• Pattern recognition\n• Shipping daily\n\nPick one. Master it this week."],
  ["Mistakes List", "N mistakes I made + lesson", "5 mistakes that kept me under 500 followers:\n• Posting without replying\n• Generic hooks\n• No pinned tweet\n• Ignoring analytics\n• Quitting after 2 weeks\n\nDon't repeat mine.", "N mistakes that [held you back]:\n• [mistake]\n• [mistake]\n• [mistake]\n\n[Lesson]."],
  ["Tool Stack", "Tools I use for [outcome] + why each", "My 0→1K tool stack:\n• X (free) — the platform\n• Notion (free) — ideas + winners\n• ChatGPT (free) — hooks + reply angles\n• Hypefury (paid) — scheduling + engagement lists\n\nStack beats talent.", "My [outcome] tool stack:\n• [tool] — [why]\n• [tool] — [why]\n• [tool] — [why]\n\n[Closer]."],
  ["Myth Buster", "Everyone says X → what actually works", "Everyone says \"post more.\"\n\nWhat actually worked:\n3 quality posts + 40 replies daily.\n\nVolume without conversation is noise.", "Everyone says \"[common advice].\"\n\nWhat actually worked:\n[your approach].\n\n[Takeaway]."],
];

const PERSONALITY_TEMPLATES = [
  ["Ideas Framework", "One big idea + short list", "Creators are sense-makers.\n\nLearn → Connect → Teach.\n\nThat's the whole job.", "[Big idea].\n\n• [point]\n• [point]\n• [point]"],
  ["Past → Present Story", "Rock bottom bullets → today bullets → lesson", "2024 me:\n• 0 followers\n• Overthinking every post\n• Zero system\n\n2026 me:\n• Building in public\n• Daily queue\n• Helping others hit 1K\n\nStart before you're ready.", "[Past year] me:\n• [state]\n• [state]\n\n[Now]:\n• [state]\n• [state]\n\n[Lesson]."],
  ["Transformation List", "I'm a [identity]. Before: / After:", "I'm a builder.\n\n2023: Consuming, never shipping\n2026: 3 posts/day, 90-day systems\n\nFind better habits.", "I'm [identity].\n\n[Year A]: [habits]\n[Year B]: [habits]\n\n[CTA]."],
  ["Milestone Post", "Hit X + reflection + CTA", "I hit 500 followers.\n\nTook longer than I wanted.\nBut I showed up anyway.\n\nYou're closer than you think. Keep going.", "I hit [milestone].\n\n[Honest reflection].\n\n[CTA for reader]."],
  ["Values / Rules", "N personal rules list", "My X rules:\n• Ship daily\n• Reply before scrolling\n• No generic comments\n• One thread/week\n• Review Sundays\n• Help people 2 steps behind", "My [domain] rules:\n• [rule]\n• [rule]\n• [rule]\n• [rule]"],
  ["Behind the Scenes", "What you're building + photo optional", "Building in public this quarter:\n• 0→1K system\n• Daily posts\n• Helping 10 people hit 1K\n\nLet's see what happens.", "Building:\n• [project]\n• [project]\n\n[Inviting line]."],
  ["Goals in Public", "Public goal + deadline + share lessons", "Goal: 1,000 followers by [date].\n\nStarting from [X].\n\nI'll share what works and what fails.", "Goal: [target] by [date].\n\nStarting from [current].\n\nI'll document the journey here."],
  ["Lifestyle", "Favorite thing about creator life", "My favorite part of writing online:\n\nControlling my mornings.\n\nMoney is nice.\nFreedom is better.", "My favorite part of [path]:\n\n[specific freedom].\n\n[Short closer]."],
  ["Vulnerability → Strength", "Unexpected truth + proof + attitude", "I'm not a native English speaker.\n\nI still write daily.\nI still teach.\nI still ship.\n\nYour excuse isn't valid.", "I'm not [expected].\n\n• [proof]\n• [proof]\n\n[Attitude line]."],
  ["Subtweet Yourself", "Advice you'd give yourself today", "You're not stuck.\nYou're inconsistent.\n\nPost today.\nReply today.\nReview Sunday.\n\nThat's the whole game.", "[Advice to yourself — positioned at reader]."],
  ["Metaphor", "X is like Y because Z", "Growing on X is like going to the gym.\n\nMiss a week — you feel it.\nShow up daily — compounding kicks in.", "[Concept] is like [thing].\n\n[Because / explanation]."],
  ["Polarity (Past/Future/Present)", "Three groups + where they live", "Stuck creators live in overthinking.\nAnxious creators live in comparison.\nGrowing creators live in daily action.", "[Group A] live in [state].\n[Group B] live in [state].\n[Group C] live in [state]."],
  ["Gratitude Post", "Thank [audience] + specific reason + invite", "Shoutout to everyone who replied to my posts this week.\n\nYou taught me more than any course.\n\nLet's keep building together.", "Shoutout to [who].\n\n[Specific reason].\n\n[Inviting closer]."],
  ["Belief Shift", "I used to believe X → what changed my mind", "I used to think you needed viral posts to grow.\n\nThen I hit 400 followers with zero virality.\n\nConsistency > lottery tickets.", "I used to think [old belief].\n\nThen [what changed].\n\n[New belief]."],
  ["Week Reflection", "This week I learned / shipped / failed", "This week:\n• Shipped 18 posts\n• Learned replies beat hooks\n• Failed a thread (deleted it)\n\nProgress isn't perfect. It's daily.", "This week:\n• [shipped]\n• [learned]\n• [failed or struggled]\n\n[Honest closer]."],
];

function templateSection(pillar, templates, tagClass) {
  const cards = templates.map(([name, formula, example, blank], i) =>
    tplCard(pillar, i + 1, name, formula, example, blank || example)
  ).join("\n");
  return `<section class="block" id="${pillar.toLowerCase()}-templates">
  <span class="pillar-tag ${tagClass}">${pillar}</span>
  <h2>Winning ${pillar} Templates (${templates.length})</h2>
  <p>Fill in the blanks. Copy. Post. Tag each post <strong>${pillar}</strong> in Notion. Aim for 30% Growth · 30% Authority · 40% Personality weekly.</p>
  ${cards}
</section>`;
}

// --- FILE GENERATION ---

fs.mkdirSync(ROOT, { recursive: true });
copyBonuses();

// INDEX
const TOTAL_LESSONS = CURRICULUM.reduce((s, m) => s + m.lessons.length, 0);

fs.writeFileSync(path.join(ROOT, "INDEX.html"), page("Hub", "INDEX.html", `
<header class="hero hub-hero">
  <div class="badge">${PRODUCT.author} · ${PRODUCT.name}</div>
  <h1>${PRODUCT.name}</h1>
  <p class="sub">${PRODUCT.tagline} — ${PRODUCT.pitch}</p>
  <div class="hub-stats">
    <div class="hub-stat"><div class="val">3</div><div class="lbl">Simple steps</div></div>
    <div class="hub-stat"><div class="val">90+</div><div class="lbl">Copy-paste posts</div></div>
    <div class="hub-stat"><div class="val">90</div><div class="lbl">Day plan</div></div>
    <div class="hub-stat"><div class="val">$${PRODUCT.priceLaunch}</div><div class="lbl">Launch price</div></div>
  </div>
  <div class="cta-row">
    <a class="btn-primary" href="QUICK-WINS.html">Start Day 1 →</a>
    <a class="btn-secondary" href="06-Level-5-Breakthrough-90-Day.html">Daily Command Center</a>
  </div>
</header>
<div class="wow-banner">
  <strong>${PRODUCT.bundleNote}.</strong> Worth $${PRODUCT.priceAnchor}+ · you paid $${PRODUCT.priceLaunch}.
</div>
${threeStepPathHtml()}
<div id="resume-card" class="resume-card" hidden>
  <div class="resume-text"><strong>Continue where you left off</strong><span id="resume-label">your last lesson</span></div>
  <a id="resume-link" class="btn-primary" href="01-Start-Here.html">Resume →</a>
</div>
<div class="progress-panel">
  <h2>Your progress</h2>
  <div class="progress-track"><div class="progress-fill" id="overall-progress"></div></div>
  <div class="progress-label" id="overall-progress-label">0% overall</div>
  <div style="margin-top:14px">
    <div style="font-size:0.75rem;color:var(--muted);margin-bottom:6px" id="lesson-progress-label">0 / ${TOTAL_LESSONS} lessons</div>
    <div class="progress-track" style="height:4px"><div class="progress-fill" id="lesson-progress" style="background:var(--gold)"></div></div>
  </div>
</div>
<div class="follower-tracker hub-tracker" id="hub-follower-tracker">
  <h2>Your 0→1K progress</h2>
  <p class="tracker-sub">Set your start count once. Update weekly. Watch the bar move.</p>
  <div class="tracker-inputs">
    <label>Starting followers<input type="number" id="followers-start" min="0" placeholder="e.g. 47" /></label>
    <label>Current followers<input type="number" id="followers-current" min="0" placeholder="e.g. 312" /></label>
  </div>
  <div class="tracker-bar-wrap"><div class="tracker-bar" id="followers-progress"></div></div>
  <div class="tracker-meta"><span id="followers-label">0% to 1,000</span><span id="followers-remaining">1,000 to go</span></div>
  <div class="milestone-row" id="milestone-row">
    <span data-ms="100">100</span><span data-ms="250">250</span><span data-ms="500">500</span><span data-ms="1000">1K</span>
  </div>
</div>
<section class="block">
  <h2>What's included</h2>
  <div class="value-stack value-stack-simple">
    <div class="value-item"><span>90-day system + daily command center</span><span>$97</span></div>
    <div class="value-item"><span>90+ templates (posts, replies, threads)</span><span>$93</span></div>
    <div class="value-item"><span>Worksheets + follower tracker</span><span>$47</span></div>
    <div class="value-item"><span>2 playbooks + 4 ebooks (bonus vault)</span><span>$91</span></div>
  </div>
  <div class="value-total"><span>Total value</span><span class="amount">$${PRODUCT.priceAnchor}+</span></div>
  <p class="value-note">Competitors charge $39–49 for a playbook alone. You get the full stack for $${PRODUCT.priceLaunch}.</p>
</section>
<section class="block">
  <h2>Power tools (use daily)</h2>
  <div class="toolkit-grid">
    <a class="tool-card featured" href="QUICK-WINS.html"><span class="tool-tag">Start here</span><h3>First 24 Hours</h3><p>Hour-by-hour wins before day 2</p></a>
    <a class="tool-card" href="WORKSHEETS.html"><span class="tool-tag">Interactive</span><h3>Worksheets</h3><p>Bio builder · niche clarity · audit</p></a>
    <a class="tool-card" href="REPLY-BANK.html"><span class="tool-tag">15 templates</span><h3>Reply Bank</h3><p>Strategic replies that get follows</p></a>
    <a class="tool-card" href="THREAD-STARTERS.html"><span class="tool-tag">10 hooks</span><h3>Thread Starters</h3><p>Authority threads ready to fill</p></a>
    <a class="tool-card" href="CHEATSHEET.html"><span class="tool-tag">Print</span><h3>Cheat Sheet</h3><p>One-page daily reference</p></a>
    <a class="tool-card" href="03-Level-2-Content-Arsenal.html"><span class="tool-tag">45 templates</span><h3>Content Playbook</h3><p>Growth · Authority · Personality</p></a>
  </div>
</section>
<section class="block transform-block">
  <h2>90 days from now</h2>
  <div class="transform-grid">
    <div class="transform-card before"><h3>Today</h3><ul><li>Posting without a system</li><li>Bio that doesn't convert</li><li>Replies that go nowhere</li><li>No idea what's working</li></ul></div>
    <div class="transform-arrow">→</div>
    <div class="transform-card after"><h3>Day 90</h3><ul><li>1,000 followers who care</li><li>Profile that sells you</li><li>30–50 strategic replies/day</li><li>Content queue 2 weeks ahead</li></ul></div>
  </div>
</section>
${curriculumHtml()}
<section class="block">
  <h2>Recommended path (keep it simple)</h2>
  <ol>
    <li><strong>Day 1:</strong> <a href="QUICK-WINS.html">First 24 Hours</a> — bio, 3 posts, 15 replies</li>
    <li><strong>Week 1:</strong> Profile + Basics — then fill 10 templates</li>
    <li><strong>Week 2:</strong> Batch 7–14 days of posts (90-min Sunday)</li>
    <li><strong>Days 1–90:</strong> <a href="06-Level-5-Breakthrough-90-Day.html">Command Center</a> every morning</li>
  </ol>
  <div class="callout"><strong>Rule:</strong> 2 posts + 30 replies daily beats posting 5x with zero replies. That's what every top growth product agrees on.</div>
</section>
<div class="grid-2">
  <a class="card-link" href="01-Start-Here.html" data-step="01" data-progress-page="01-Start-Here.html"><h3>Start Here</h3><p>6 lessons · welcome &amp; setup</p><div class="module-progress"><div class="module-progress-fill"></div></div><div class="module-progress-text">—</div></a>
  <a class="card-link" href="05-Level-4-Philosophy.html" data-step="02" data-progress-page="05-Level-4-Philosophy.html"><h3>Growth Fundamentals</h3><p>6 lessons · what, who, attention</p><div class="module-progress"><div class="module-progress-fill"></div></div><div class="module-progress-text">—</div></a>
  <a class="card-link" href="02-Level-1-Profile-Weapons.html" data-step="03" data-progress-page="02-Level-1-Profile-Weapons.html"><h3>Profile &amp; Positioning</h3><p>4 lessons · bio, banner, pin</p><div class="module-progress"><div class="module-progress-fill"></div></div><div class="module-progress-text">—</div></a>
  <a class="card-link featured" href="03-Level-2-Content-Arsenal.html" data-step="04" data-progress-page="03-Level-2-Content-Arsenal.html"><h3>The X Content Playbook</h3><p>22 structures · 45 templates · GAP + IEE</p><div class="module-progress"><div class="module-progress-fill"></div></div><div class="module-progress-text">—</div></a>
  <a class="card-link" href="04-Level-3-Content-Production.html" data-step="05" data-progress-page="04-Level-3-Content-Production.html"><h3>The Daily Workflow</h3><p>5 lessons · batch &amp; queue</p><div class="module-progress"><div class="module-progress-fill"></div></div><div class="module-progress-text">—</div></a>
  <a class="card-link" href="06-Level-5-Breakthrough-90-Day.html" data-step="06" data-progress-page="06-Level-5-Breakthrough-90-Day.html"><h3>90-Day Command Center</h3><p>5 lessons · daily execution</p><div class="module-progress"><div class="module-progress-fill"></div></div><div class="module-progress-text">—</div></a>
  <a class="card-link" href="07-Bonuses.html" data-step="07" data-progress-page="07-Bonuses.html"><h3>Bonuses &amp; Resources</h3><p>Playbooks, ebooks, training</p><div class="module-progress"><div class="module-progress-fill"></div></div><div class="module-progress-text">—</div></a>
</div>
`, { dataPage: "hub" }));

// 01 Start Here
fs.writeFileSync(path.join(ROOT, "01-Start-Here.html"), page("01 Start Here", "01-Start-Here.html", `
<header class="hero">
  <div class="badge">Module 01</div>
  <h1>Let's Get Started</h1>
  <p class="sub">Welcome to the ${PRODUCT.name}. Read this once. Then open the Command Center daily.</p>
</header>
${lessonNav("01-Start-Here.html")}
<section class="block intro-letter" id="welcome">
  <h2>Welcome</h2>
  <p>It's a pleasure having you here.</p>
  <p>We have a lot to go over, so I'll keep this brief.</p>
  <p>In this system, you will learn a <strong>practical growth process</strong> — not theory for theory's sake. Meaning: high-impact posting on X, a daily system you can run in the real world, and the leverage you need before your next step (monetizing, launching a product, or scaling to LinkedIn).</p>
  <p>This is the same operating system I used to grow my personal brand over the past 2.5+ years. No ads. No bots. Just profile, content, replies, and consistency.</p>
</section>
<section class="block" id="who-benefits">
  <h2>Who will benefit most</h2>
  <p>This system is for anyone who wants to secure their future as a <strong>creator, coach, consultant, freelancer, or one-person business</strong> — anyone whose career will be built online.</p>
  <p>60% of future jobs haven't been created yet. You can bet they'll be created online. You can double-bet that <strong>writing and content</strong> will be how you attract people to whatever that job is.</p>
  <p>All of these paths demand one thing: <strong>people</strong>. How do you attract people? Value. What's the best way to deliver value at scale? Content. What's the foundation of content? <strong>Writing.</strong></p>
  <p>Yes — even the best videos and podcasts start with a written hook, outline, or script. This system is for anyone who wants to talk about their interests, generate opportunities, and set themselves up for future monetization.</p>
  <p><strong>Quick filter:</strong> Creators, coaches, founders, and freelancers <strong>stuck below 1,000 followers</strong> who want a 90-day operating system — not random tips.</p>
</section>
<section class="block" id="about-me">
  <h2>About me — why listen</h2>
  <p>I'm <strong>Andrei Lucian</strong>. I've been building in public and growing my personal brand for <strong>over 2.5 years</strong>. Not from a lucky viral moment — from showing up daily, testing what works, and refining systems.</p>
  <div class="stat-grid">
    <div class="stat-card"><div class="num">5.3K</div><div class="label">Followers on X</div></div>
    <div class="stat-card"><div class="num">16.2K</div><div class="label">Followers on LinkedIn</div></div>
    <div class="stat-card"><div class="num">2.5+</div><div class="label">Years building daily</div></div>
  </div>
  <p>I built this system for creators <strong>stuck below 1,000 on X</strong> — because that's where every journey starts. I remember posting into the void, fixing my bio for the 10th time, and wondering if replies even mattered.</p>
  <p>They do. Profile + content + strategic replies changed everything for me. This is that playbook — stripped to what moves the needle from 0→1K.</p>
</section>
<section class="block" id="philosophy">
  <h2>My growth philosophy</h2>
  <p>This system is <strong>not</strong> for people who want to study growth theory forever. It's for people who want to <strong>implement</strong> — post, reply, review, repeat.</p>
  <ul>
  <li>The fundamentals of X growth are free online. What's missing is a <strong>system to practice them</strong>.</li>
  <li>You don't learn by reading modules. You learn by <strong>experience, trial, and error</strong> — 90 days of it.</li>
  <li>Perfect grammar won't get you followers. <strong>Clear messages that help people</strong> will.</li>
  </ul>
  <div class="callout"><strong>Side note:</strong> Don't email me about typos in posts or landing pages. The ego hunts typos. Growing creators hunt <em>impact</em>. Focus on the message.</div>
  <p>We still live in a world of "posting but not growing." This system teaches you how to write with <strong>impact</strong> — hooks that stop the scroll, value that earns follows, and a rhythm you can sustain for 90 days.</p>
  <h3>Where this leads</h3>
  <p>Build a base of readers on X, then build whatever you want — digital products, coaching, freelancing, or scaling to LinkedIn (I went from X to 16K+ there).</p>
  <p>Creators don't start by talking about whatever they want. They start with <strong>proven topics</strong> in their own voice. That's what the 45 templates in Module 4 are for.</p>
  <h3>By the end, you'll have clarity on</h3>
  <ul>
  <li><strong>Who</strong> you're writing to · <strong>What problems</strong> they have</li>
  <li><strong>How</strong> you help · <strong>Why</strong> they should follow you</li>
  </ul>
  <p>Commit to <strong>90 days minimum</strong>. Given consistency, <strong>1,000 followers is more than possible</strong>.</p>
</section>
<section class="block" id="how-to-use">
  <h2>How to best use this product</h2>
  <ol>
  <li><strong>Read through once</strong> — take notes, don't implement yet</li>
  <li><strong>Go through a second time</strong> — implement module by module</li>
  <li><strong>Start small</strong> — fundamentals → profile → templates → daily execution</li>
  </ol>
  <p>Systems aren't linear. Understand the big picture before you try to run everything at once.</p>
  <p>Immerse yourself in your niche — follow creators, listen to podcasts, buy one good book. Novelty fuels ideas; <strong>pattern recognition</strong> fuels growth.</p>
  <div class="callout"><strong>Day 1:</strong> Open <a href="QUICK-WINS.html">First 24 Hours</a> — hour-by-hour wins before you binge the course.<br><strong>Daily driver:</strong> Bookmark <a href="06-Level-5-Breakthrough-90-Day.html">90-Day Command Center</a>. Open it every morning.</div>
</section>
<section class="block" id="platform-setup">
  <h2>Platform controls &amp; rules</h2>
  <h3>X Platform: Controls</h3>
<ul>
<li>Edit profile · Pin a post · Schedule (Hypefury) · Post threads · Plug link · Analytics · Lists · Follow/reply/DM</li>
</ul>
<h3>X Platform: Rules (safe limits)</h3>
<table class="simple"><tr><th>Max (platform)</th><th>Safe (recommended)</th></tr>
<tr><td>500 DMs/day</td><td>400 spaced out</td></tr>
<tr><td>2400 tweets+comments/day</td><td>2-3 posts + 30-50 quality replies</td></tr>
<tr><td>~400 follows/day</td><td>30/day (3×10)</td></tr>
<tr><td>30-40 follows at once</td><td>Action block risk — avoid</td></tr>
</table>
<h3>My tool stack (FREE + PAID)</h3>
<p>This is the exact stack I use. Start with the <strong>FREE</strong> tools — add paid when you're posting daily and need speed.</p>
${stackWeaponsTableHtml({ withHeading: false })}
<div class="callout"><strong>Minimum to start (all free):</strong> X + Notion + ChatGPT or Claude. Add Hypefury or Typefully when you're serious about the 90-day run.</div>
${diagramToolStack}
<h3>Course map</h3>
<ol>
<li>Growth Fundamentals — what, who, attention</li>
<li>Profile &amp; Positioning — fix follow rate</li>
<li>The X Content Playbook — <strong>45 winning templates</strong></li>
<li>The Daily Workflow — batch &amp; Hypefury</li>
<li>90-Day Command Center — <strong>your daily driver</strong></li>
<li>Bonuses &amp; Resources — playbooks &amp; ebooks</li>
</ol>
</section>
<section class="block checklist"><h2>Before Module 2</h2>
<label><input type="checkbox" /> Screenshot RULES + CONTROLS</label>
<label><input type="checkbox" /> Notion planner created (free tier)</label>
<label><input type="checkbox" /> ChatGPT or Claude ready for hooks</label>
<label><input type="checkbox" /> Hypefury connected (or manual queue for week 1)</label>
<label><input type="checkbox" /> Committed to 90 days</label>
</section>
`));

// 02 Profile
fs.writeFileSync(path.join(ROOT, "02-Level-1-Profile-Weapons.html"), page("03 Profile & Positioning", "02-Level-1-Profile-Weapons.html", `
<header class="hero">
  <div class="badge">Module 3 · Days 1–14</div>
  <h1>Profile &amp; Positioning</h1>
  <p class="sub">People won't follow what they don't understand. Fix this before you post.</p>
</header>
${lessonNav("02-Level-1-Profile-Weapons.html")}
<section class="block" id="profile-audit"><h2>Profile audit checklist</h2>
<ul>
<li>Professional photo (face, not logo)</li>
<li>Bio: who you help + what you post about + proof or outcome</li>
<li>Pinned tweet: your best value post or thread</li>
<li>Link: Gumroad / lead magnet / website</li>
<li>Banner: simple message or social proof (see Bonus: Banner Creation)</li>
</ul></section>
<section class="block" id="bio-formulas"><h2>Bio formulas that convert</h2>
<p><strong>Formula A:</strong> I help [audience] [achieve outcome] with [method]. [Proof]. [CTA]</p>
<p><strong>Formula B:</strong> [Role]. Writing about [topics]. [Result or mission]. [Link]</p>
<p><strong>Formula C:</strong> From [past] → [present]. Documenting [journey]. [CTA]</p>
<textarea class="tpl">I help [audience] go from 0 to 1K on X in 90 days with daily systems + strategic replies.

Building in public. Follow for the playbook.</textarea>
<button type="button" class="copy-btn">Copy</button>
</section>
<section class="block" id="pinned-tweet"><h2>Your pinned tweet</h2>
<p>Pin your highest-value thread or a post that shows <strong>who you help</strong> and <strong>what you know</strong>. Update monthly.</p></section>
<section class="block" id="niche-clarity"><h2>Niche clarity (3 questions)</h2>
<ol>
<li>Who is 1-3 steps behind you?</li>
<li>What problem did you have 6 months ago?</li>
<li>What 3 topics will you post about for 90 days?</li>
</ol></section>
<section class="block checklist"><h2>Level 1 complete when</h2>
<label><input type="checkbox" /> Bio rewritten</label>
<label><input type="checkbox" /> Banner updated (Bonus 01)</label>
<label><input type="checkbox" /> Profile photo set (Bonus 02)</label>
<label><input type="checkbox" /> Pinned tweet live</label>
<label><input type="checkbox" /> Link in bio works</label>
</section>
`));

// 03 Content Arsenal - THE BIG ONE
const level2Body = `
<header class="hero">
  <div class="badge">Module 4 · The Content Playbook ★</div>
  <h1>The X Content Playbook</h1>
  <p class="sub">GAP + IEE · 22 engagement structures · 45 fill-in templates</p>
</header>
${lessonNav("03-Level-2-Content-Arsenal.html")}
<nav class="pillar-jump" aria-label="Jump to section">
  <a href="#engagement-mindset" class="pj-structure">Engagement System</a>
  <a href="#tweet-structures" class="pj-structure">22 Structures</a>
  <a href="#growth-templates" class="pj-growth">Growth (${GROWTH_TEMPLATES.length})</a>
  <a href="#authority-templates" class="pj-authority">Authority (${AUTHORITY_TEMPLATES.length})</a>
  <a href="#personality-templates" class="pj-personality">Personality (${PERSONALITY_TEMPLATES.length})</a>
</nav>
<section class="block" id="gap-framework">
  <h2>GAP Framework</h2>
  <table class="simple">
  <tr><th>Pillar</th><th>Goal</th><th>% at 0→1K</th></tr>
  <tr><td><span class="pillar-tag pillar-growth">Growth</span></td><td>Reach, shares, profile clicks</td><td>30%</td></tr>
  <tr><td><span class="pillar-tag pillar-authority">Authority</span></td><td>Trust, proof, expertise</td><td>30%</td></tr>
  <tr><td><span class="pillar-tag pillar-personality">Personality</span></td><td>Connection, likability</td><td>40%</td></tr>
  </table>
  ${diagramGAP}
</section>
<section class="block" id="iee-framework">
  <h2>IEE Framework</h2>
  <p>Every post should hit <strong>Entertainment</strong> (hook) + <strong>Education</strong> (value) + <strong>Inspiration</strong> (action).</p>
  ${diagramIEE}
  <textarea class="tpl">[Curiosity hook]

[One useful insight]

[Clear next step or CTA]</textarea>
<button type="button" class="copy-btn">Copy</button>
</section>
<section class="block" id="domain-mastery">
  <h2>Domain of Mastery</h2>
  ${diagramDomainMastery}
  <ol>
  <li><strong>Money-making interest</strong> — what you can monetize (health, wealth, relationships, happiness → sub-niche)</li>
  <li><strong>Genuine interest</strong> — what you actually consume daily</li>
  <li><strong>Developmental interest</strong> — psychology, philosophy, self-improvement</li>
  </ol>
  <p>Write to your <strong>past, present, and future self</strong> — attracts people 1-3 steps behind you.</p>
</section>
${engagementWritingSections()}
${templateSection("Growth", GROWTH_TEMPLATES, "pillar-growth")}
${templateSection("Authority", AUTHORITY_TEMPLATES, "pillar-authority")}
${templateSection("Personality", PERSONALITY_TEMPLATES, "pillar-personality")}
<section class="block checklist">
  <h2>Level 2 complete when</h2>
  <label><input type="checkbox" /> 5+ engagement structures filled</label>
  <label><input type="checkbox" /> 15 Growth templates filled &amp; queued</label>
  <label><input type="checkbox" /> 15 Authority templates filled &amp; queued</label>
  <label><input type="checkbox" /> 15 Personality templates filled &amp; queued</label>
  <label><input type="checkbox" /> 7 days scheduled in Hypefury</label>
</section>
`;
fs.writeFileSync(path.join(ROOT, "03-Level-2-Content-Arsenal.html"), page("04 The X Content Playbook", "03-Level-2-Content-Arsenal.html", level2Body));

// 04 Production
fs.writeFileSync(path.join(ROOT, "04-Level-3-Content-Production.html"), page("05 The Daily Workflow", "04-Level-3-Content-Production.html", `
<header class="hero">
  <div class="badge">Module 5 · Workflow</div>
  <h1>The Daily Workflow</h1>
  <p class="sub">Creativity vs productivity · research · batch · queue · remix winners</p>
</header>
${lessonNav("04-Level-3-Content-Production.html")}
<section class="block" id="creativity-productivity"><h2>Creativity vs productivity</h2>
<p><strong>Creativity</strong> (walks, rest, default mode network): ideas. <strong>Productivity</strong> (focused blocks): outline, edit, queue. Don't mix them in the same hour.</p>
<ol><li>Capture idea in Notion</li><li>Let it simmer 24–48h</li><li>Batch write in a 45-min block</li><li>Queue in Hypefury</li></ol>
<p>Most creators fail because they try to invent and publish in one sitting. Separate the two modes.</p>
${diagramCreativityProductivity}</section>
<section class="block" id="research-not-scroll"><h2>Research, don't mindlessly scroll</h2>
<p>Scrolling X for "inspiration" is consumption disguised as work. <strong>Research</strong> has a purpose:</p>
<ul>
<li>Save 5 posts per week that outperform in your niche — note the hook structure</li>
<li>Study one account 1–3 steps ahead of you for 15 min/day</li>
<li>Capture patterns in Notion, not bookmarks you'll never open</li>
</ul>
<p>When you consume, ask: <em>What problem does this solve? Who is it for? Can I remix this in my voice?</em></p></section>
<section class="block" id="idea-bank"><h2>The idea bank system</h2>
<p>Your Notion idea bank has 3 columns:</p>
<table class="simple"><tr><th>Column</th><th>What goes here</th></tr>
<tr><td>Raw</td><td>Hooks, observations, reply sparks — capture fast</td></tr>
<tr><td>Ready</td><td>Matched to a template from Module 4</td></tr>
<tr><td>Winners</td><td>Top posts by impressions — remix weekly</td></tr>
</table>
<p>Rule: never sit down to write without 10+ ideas in <strong>Raw</strong>. Creativity is fed by research, not blank pages.</p>
${diagramIdeaBank}</section>
<section class="block" id="batch-routine"><h2>The 90-minute batch</h2>
<ol>
<li>Pick 10–15 ideas from Notion (15 min)</li>
<li>ChatGPT: 3 hook variations each (20 min)</li>
<li>Fill templates from Module 4 (40 min)</li>
<li>Quality check — 7/8 minimum (10 min)</li>
<li>Queue 7–14 days in Hypefury (5 min)</li>
</ol>
<p>Do this once per week. That's your entire content engine for 0→1K.</p></section>
<section class="block" id="queue-winners"><h2>Queue, schedule &amp; remix winners</h2>
<h3>Hypefury queue</h3>
<table class="simple"><tr><th>Slot</th><th>Type</th></tr>
<tr><td>Morning 8–9am</td><td>Growth</td></tr>
<tr><td>Midday 12–1pm</td><td>Authority</td></tr>
<tr><td>Evening 5–6pm</td><td>Personality</td></tr>
</table>
<h3>Sunday review (15 min)</h3>
<ol><li>Top 3 posts by impressions</li><li>Save to Notion Winners</li><li>Remix each 3 ways next week</li></ol>
<h3>Quality checklist (7+ to post)</h3>
<ul>
<li>Clear hook · Specific audience · Problem or promise · Actionable takeaway</li>
<li>IEE check · Line breaks · GAP pillar tagged · Sounds like you</li>
</ul></section>
`));

// 05 Philosophy → Growth Fundamentals
fs.writeFileSync(path.join(ROOT, "05-Level-4-Philosophy.html"), page("02 Growth Fundamentals", "05-Level-4-Philosophy.html", `
<header class="hero">
  <div class="badge">Module 2 · Fundamentals</div>
  <h1>Growth Fundamentals</h1>
  <p class="sub">What to post · who to write for · attention psychology · your X ecosystem</p>
</header>
${lessonNav("05-Level-4-Philosophy.html")}
<section class="block" id="what-to-post"><h2>What do you post about?</h2>
<p>Your niche is the intersection of three interests:</p>
<ol>
<li><strong>Money-making interest</strong> — what you can monetize (health, wealth, relationships → sub-niche)</li>
<li><strong>Genuine interest</strong> — what you actually consume daily</li>
<li><strong>Developmental interest</strong> — psychology, philosophy, self-improvement</li>
</ol>
<p>Interests are the <strong>how</strong>. Life experience is the <strong>why</strong>. Document both. Write to your past, present, and future self — this attracts people 1–3 steps behind you.</p>
${diagramDomainMastery}</section>
<section class="block" id="who-for"><h2>Who are you writing for?</h2>
<p>Not "everyone." One person, 1–3 steps behind you, with a specific problem you recently solved.</p>
<ol>
<li>Who is 1–3 steps behind you right now?</li>
<li>What problem did you have 6 months ago?</li>
<li>What 3 topics will you post about for 90 days straight?</li>
</ol>
<p>If you can't answer these in one sentence each, fix that before posting again.</p>
${diagramWhoFor}</section>
<section class="block" id="awareness"><h2>Awareness &amp; attention</h2>
<p>People scroll fast. You have 1–2 seconds. The 10 attention levers that work on X:</p>
<ol>
<li>Specific numbers</li><li>Pattern interrupt</li><li>Negativity bias (ethical)</li>
<li>Group callout ("Creators who…")</li><li>Problem callout</li><li>Clear benefit</li>
<li>Social proof</li><li>Confidence &amp; conviction ★</li><li>Active voice</li><li>Warnings ("Stop doing X")</li>
</ol>
<p>Stuck growing? Add one <strong>list post</strong> every 1–2 days. Lists never die — repurpose into threads and carousels.</p></section>
<section class="block" id="gap-pillars"><h2>The GAP content mix</h2>
<p>Under 1K, every post needs a job. Tag each post in Notion:</p>
<table class="simple">
<tr><th>Pillar</th><th>Goal</th><th>% weekly</th></tr>
<tr><td><span class="pillar-tag pillar-growth">Growth</span></td><td>Reach, shares, profile clicks</td><td>30%</td></tr>
<tr><td><span class="pillar-tag pillar-authority">Authority</span></td><td>Trust, proof, expertise</td><td>30%</td></tr>
<tr><td><span class="pillar-tag pillar-personality">Personality</span></td><td>Connection, likability</td><td>40%</td></tr>
</table>
<p>Module 4 has 15 templates per pillar. Fill them. That's your content engine for 90 days.</p>
${diagramGAP}</section>
<section class="block" id="ecosystem"><h2>Your 3-layer X ecosystem</h2>
${diagramEcosystem}
<p>Think in layers — not random posts:</p>
<ul>
<li><strong>Short (daily):</strong> Tweets test ideas fast — 2–3 per day from templates</li>
<li><strong>Medium (weekly):</strong> One thread = authority spike — pin your best</li>
<li><strong>Long (after 500+):</strong> Lead magnet, Gumroad, or newsletter — capture emails</li>
</ul>
<p>At 0→1K, focus 90% on short + replies. Add medium (threads) weekly. Long comes after the first milestone.</p></section>
<section class="block" id="networking"><h2>Connect without being needy</h2>
<p>Growth isn't solo. Build real relationships — never beg for RTs.</p>
<ol>
<li>Find someone you genuinely admire (similar size when starting)</li>
<li>Specific compliment with link to their post</li>
<li>Ask what they're building — listen</li>
<li>Lead with value before any ask</li>
<li>Optional: short call or voice note</li>
<li>Follow up with a useful resource</li>
<li>Soft share of your post — never beg</li>
</ol>
<p>Revisit this monthly. Your network is as important as your content calendar.</p></section>
`));

// 06 90-Day
fs.writeFileSync(path.join(ROOT, "06-Level-5-Breakthrough-90-Day.html"), page("06 90-Day Command Center", "06-Level-5-Breakthrough-90-Day.html", `
<header class="hero">
  <div class="badge">Module 6 · Daily driver</div>
  <h1>90-Day Command Center</h1>
  <p class="sub">Open this every day. Target: 0 → 1,000 followers in 90 days.</p>
</header>
${lessonNav("06-Level-5-Breakthrough-90-Day.html")}
<div class="day-counter">
  <div>
    <div style="font-size:0.8rem;color:var(--muted);margin-bottom:4px">Today is</div>
    <div class="big-day" id="challenge-day">—</div>
    <div style="font-size:0.85rem;color:var(--muted)">of 90</div>
  </div>
  <div>
    <label for="challenge-start">Challenge start date</label>
    <input type="date" id="challenge-start" />
  </div>
</div>
<div class="follower-tracker" id="page-follower-tracker">
  <h2>Follower growth tracker</h2>
  <p class="tracker-sub">Same tracker as the Hub — updates everywhere automatically.</p>
  <div class="tracker-inputs">
    <label>Starting followers<input type="number" id="followers-start-page" min="0" placeholder="Day 1 count" /></label>
    <label>Current followers<input type="number" id="followers-current-page" min="0" placeholder="Update weekly" /></label>
  </div>
  <div class="tracker-bar-wrap"><div class="tracker-bar" id="followers-progress-page"></div></div>
  <div class="tracker-meta"><span id="followers-label-page">0% to 1,000</span><span id="followers-remaining-page">1,000 to go</span></div>
</div>
<section class="block" id="daily-checklist"><h2>Daily checklist</h2>
<table class="simple"><tr><th>Time</th><th>Action</th></tr>
<tr><td>Morning</td><td>1 post (Hypefury) + 10 strategic replies</td></tr>
<tr><td>Midday</td><td>1 post + reply to comments + 10 replies</td></tr>
<tr><td>Evening</td><td>1 personality post + 10-20 Tier 1 replies + queue tomorrow</td></tr>
</table>
<p><strong>Daily totals:</strong> 2-3 posts · 30-50 quality replies</p>
${diagramDaily}</section>
<section class="block" id="time-budget"><h2>Pick your daily time budget</h2>
<p>Under 1K, <strong>replies matter more than posts</strong>. Match your routine to the time you have — then stay consistent 90 days.</p>
<table class="simple"><tr><th>Time</th><th>Posts</th><th>Replies</th><th>Best for</th></tr>
<tr><td><strong>30 min</strong></td><td>1 queued post</td><td>15 quality replies</td><td>Side hustle · day job</td></tr>
<tr><td><strong>1 hour</strong></td><td>2 posts</td><td>25 replies</td><td>Most buyers · recommended</td></tr>
<tr><td><strong>2 hours</strong></td><td>2-3 posts</td><td>40-50 replies</td><td>Aggressive 0→1K sprint</td></tr>
</table>
<div class="callout"><strong>2026 rule:</strong> Reply within 30 minutes on Tier 2 accounts for max visibility. Early replies get pushed to the top.</div></section>
<section class="block" id="engagement-tiers"><h2>Engagement tiers (your Pokedex)</h2>
<table class="simple"><tr><th>Tier</th><th>Followers</th><th>Count</th><th>Frequency</th></tr>
<tr><td>1</td><td>50K+</td><td>10-15</td><td>2-3x/week each, high-value replies</td></tr>
<tr><td>2</td><td>10K-50K</td><td>15-20</td><td>Daily</td></tr>
<tr><td>3</td><td>1K-10K</td><td>20-30</td><td>Daily, build peer relationships</td></tr>
</table>
<p>Build your list in Hypefury. Use the Reply Bank in Module 02 for angles — always personalize before you post.</p>
${diagramEngagementTiers}</section>
<section class="block" id="phases"><h2>90-day phases</h2>
${diagram90Phases}
<table class="simple"><tr><th>Phase</th><th>Days</th><th>Focus</th><th>Follower target</th></tr>
<tr><td>Foundation</td><td>1-14</td><td>Profile + first 45 templates + habit</td><td>50-150</td></tr>
<tr><td>Momentum</td><td>15-60</td><td>Daily GAP + replies + weekly thread</td><td>150-500</td></tr>
<tr><td>Push</td><td>61-90</td><td>Double winners + lead magnet + DM networking</td><td>500-1,000</td></tr>
</table></section>
<section class="block" id="diagnosis"><h2>Stuck? Diagnosis</h2>
<table class="simple"><tr><th>Symptom</th><th>Fix</th></tr>
<tr><td>Low impressions</td><td>More Growth templates, stronger hooks</td></tr>
<tr><td>Impressions but no follows</td><td>Fix bio + pinned tweet (Module 3)</td></tr>
<tr><td>Follows stalled</td><td>Increase replies to Tier 2/3</td></tr>
<tr><td>Generic replies</td><td>Cut to 30 quality — use Reply Bank templates + your own edit</td></tr>
<tr><td>Burnout</td><td>Batch Sundays, reduce to 2 posts</td></tr>
</table>
<h3>Milestones</h3>
<ul>
<li><strong>100</strong> — proof of concept; pin best thread</li>
<li><strong>250</strong> — add lead magnet in bio</li>
<li><strong>500</strong> — soft promote Gumroad/offer</li>
<li><strong>1,000</strong> — raise price, launch LinkedIn path</li>
</ul>
<p>Days 1–30, 31–60, 61–90: same daily checklist. Sunday = review analytics + remix winners + plan week.</p></section>
<section class="block" id="dms"><h2>Non-needy DM framework</h2>
<p>Full framework in <a href="05-Level-4-Philosophy.html#networking">Module 2 — Connect Without Being Needy</a>. Quick reference:</p>
<ol>
<li>Admire someone similar size · specific compliment with link</li>
<li>Ask what they're building · lead with value first</li>
<li>Follow up with a resource · soft share — never beg for RT</li>
</ol></section>
<section class="block checklist">
<label><input type="checkbox" /> Morning post queued</label>
<label><input type="checkbox" /> 30+ replies done</label>
<label><input type="checkbox" /> Evening post queued</label>
<label><input type="checkbox" /> Tomorrow queued in Hypefury</label>
</section>
`));

// 07 Bonuses
fs.writeFileSync(path.join(ROOT, "07-Bonuses.html"), page("07 Bonuses & Resources", "07-Bonuses.html", `
${bonusesPageBody(lessonNav("07-Bonuses.html"))}
`));

// Quick Wins — First 24 hours
fs.writeFileSync(path.join(ROOT, "QUICK-WINS.html"), page("Quick Wins", "QUICK-WINS.html", `
<header class="hero">
  <div class="badge">Day 1 accelerator</div>
  <h1>First 24 Hours</h1>
  <p class="sub">Don't read everything today. Win in the first day — then open the 90-Day Command Center tomorrow morning.</p>
  <div class="cta-row">
    <a class="btn-primary" href="WORKSHEETS.html">Open Bio Builder →</a>
    <a class="btn-secondary" href="06-Level-5-Breakthrough-90-Day.html">Set 90-day start date</a>
  </div>
</header>
<section class="block"><h2>Hour 0–1 · Orient</h2>
<ol>
<li>Bookmark <a href="INDEX.html">Hub</a>, <a href="CHEATSHEET.html">Cheat Sheet</a>, and <a href="06-Level-5-Breakthrough-90-Day.html">Command Center</a></li>
<li>Set your <strong>90-day start date</strong> in Command Center</li>
<li>Enter <strong>starting follower count</strong> in the Hub tracker</li>
<li>Skim Module 01 — don't binge the whole course today</li>
</ol></section>
<section class="block"><h2>Hour 1–2 · Profile fix</h2>
<ol>
<li>Open <a href="WORKSHEETS.html#bio-builder">Bio Builder</a> — write + copy your new bio</li>
<li>Update X bio + link (newsletter or best free resource)</li>
<li>Run the <a href="WORKSHEETS.html#profile-audit">Profile Audit</a> checklist</li>
<li>Pick your pinned tweet topic — draft in Module 3</li>
</ol></section>
<section class="block"><h2>Hour 2–3 · First posts</h2>
<ol>
<li>Open <a href="03-Level-2-Content-Arsenal.html">Content Playbook</a></li>
<li>Fill <strong>3 templates</strong>: 1 Growth · 1 Authority · 1 Personality</li>
<li>Post #1 today (don't wait for perfect)</li>
<li>Queue post #2 in Hypefury or save as draft</li>
</ol></section>
<section class="block"><h2>Hour 3–5 · Strategic replies</h2>
<ol>
<li>Open <a href="REPLY-BANK.html">Reply Bank</a></li>
<li>Find 10 accounts in your niche (1K–50K followers)</li>
<li>Send <strong>15 personalized replies</strong> using Reply 1, 4, or 8</li>
<li>Add 5 accounts to your Tier 2 list for tomorrow</li>
</ol></section>
<section class="block"><h2>Hour 5–6 · Systems</h2>
<ol>
<li>Create Notion Idea Bank (see Module 5)</li>
<li>Save 10 post ideas from today's scroll</li>
<li>Fill <a href="WORKSHEETS.html#niche">Niche Clarity</a> worksheet</li>
<li>Schedule Sunday batch block (90 min) in calendar</li>
</ol></section>
<section class="block"><h2>End of day 1 checklist</h2>
<div class="checklist">
<label><input type="checkbox" /> New bio live</label>
<label><input type="checkbox" /> 1–2 posts published</label>
<label><input type="checkbox" /> 15+ strategic replies sent</label>
<label><input type="checkbox" /> Follower tracker set on Hub</label>
<label><input type="checkbox" /> 90-day start date set</label>
<label><input type="checkbox" /> Idea Bank started (10 ideas)</label>
</div>
<div class="callout success"><strong>Day 1 done.</strong> Tomorrow: Command Center → 2 posts + 30 replies. Repeat for 90 days.</div></section>
`));

// Reply Bank
fs.writeFileSync(path.join(ROOT, "REPLY-BANK.html"), page("Reply Bank", "REPLY-BANK.html", `
<header class="hero">
  <div class="badge">15 templates · engagement weapon</div>
  <h1>Strategic Reply Bank</h1>
  <p class="sub">Replies are how you grow under 1K. Copy, personalize, send. Target: 30–50 quality replies per day.</p>
</header>
<section class="block"><h2>How to use</h2>
<ol>
<li>Find posts from accounts 1K–50K in your niche</li>
<li>Pick a reply formula that fits their post</li>
<li>Fill in the brackets — <strong>never</strong> send generic "great post"</li>
<li>Track Tier 2/3 accounts in Hypefury for daily engagement</li>
</ol>
<div class="callout"><strong>Rule:</strong> One thoughtful reply beats 20 lazy ones. Quality × volume = growth.</div></section>
<section class="block" id="replies">
<h2>15 reply templates</h2>
<div class="template-grid">${REPLY_TEMPLATES.map((r, i) => replyCard(r, i)).join("")}</div>
</section>
`));

// Thread Starters
fs.writeFileSync(path.join(ROOT, "THREAD-STARTERS.html"), page("Thread Starters", "THREAD-STARTERS.html", `
<header class="hero">
  <div class="badge">10 hooks · weekly authority spike</div>
  <h1>Thread Starter Bank</h1>
  <p class="sub">One thread per week from day 15+. Fill the hook, write 5–8 tweets, pin your best performer.</p>
</header>
<section class="block"><h2>Thread rhythm</h2>
<table class="simple"><tr><th>Phase</th><th>Days</th><th>Threads</th></tr>
<tr><td>Foundation</td><td>1–14</td><td>Focus on singles + replies</td></tr>
<tr><td>Momentum</td><td>15–60</td><td>1 thread/week</td></tr>
<tr><td>Push</td><td>61–90</td><td>1–2 threads/week + remix winners</td></tr>
</table></section>
<section class="block" id="threads">
<h2>10 thread starters</h2>
<div class="template-grid">${THREAD_STARTERS.map((r, i) => threadCard(r, i)).join("")}</div>
</section>
`));

// Worksheets
fs.writeFileSync(path.join(ROOT, "WORKSHEETS.html"), page("Worksheets", "WORKSHEETS.html", `
<header class="hero">
  <div class="badge">Interactive · saves locally</div>
  <h1>Worksheets &amp; Builders</h1>
  <p class="sub">Fill these once. Revisit when you pivot niche or hit 250/500/1K milestones.</p>
</header>
<section class="block" id="bio-builder"><h2>Bio Builder</h2>
<p>Live preview updates as you type. Copy when it sounds like you.</p>
<div class="worksheet-form">
<label>Who you help<input type="text" id="bio-audience" placeholder="e.g. coaches stuck below 1K" /></label>
<label>Problem they have<input type="text" id="bio-problem" placeholder="e.g. posting with no growth" /></label>
<label>Result you deliver<input type="text" id="bio-result" placeholder="e.g. 1K followers in 90 days" /></label>
<label>Your method (short)<input type="text" id="bio-method" placeholder="e.g. daily systems + strategic replies" /></label>
<label>CTA line<input type="text" id="bio-cta" placeholder="e.g. Building in public — follow for the playbook" /></label>
</div>
<label class="preview-label">Live bio preview</label>
<textarea class="tpl bio-preview" id="bio-preview" readonly></textarea>
<button type="button" class="copy-btn">Copy bio</button>
</section>
<section class="block" id="niche"><h2>Niche clarity (3 questions)</h2>
<p>If you can't answer in one sentence each, don't post again until you can.</p>
<label>Who is 1–3 steps behind you?<textarea class="tpl ws-field" id="niche-who" rows="2" placeholder="e.g. Solo creators with 50–400 followers posting about productivity"></textarea></label>
<label>What problem did you solve 6 months ago?<textarea class="tpl ws-field" id="niche-problem" rows="2" placeholder="e.g. I had content but zero reply strategy"></textarea></label>
<label>3 topics for 90 days straight<textarea class="tpl ws-field" id="niche-topics" rows="3" placeholder="1. Daily systems&#10;2. X growth&#10;3. Building in public"></textarea></label>
</section>
<section class="block" id="profile-audit"><h2>Profile audit</h2>
<p>Score yourself. Fix anything unchecked before your next post.</p>
<div class="checklist audit-checklist">
<label><input type="checkbox" /> Bio says who you help + result in line 1</label>
<label><input type="checkbox" /> Link goes to newsletter, lead magnet, or best free resource</label>
<label><input type="checkbox" /> Banner matches niche (not random stock photo)</label>
<label><input type="checkbox" /> Profile photo = clear face, not logo</label>
<label><input type="checkbox" /> Pinned tweet = best proof or lead magnet</label>
<label><input type="checkbox" /> Last 9 posts match your 3 topics</label>
<label><input type="checkbox" /> No political rage-bait unless that's your niche</label>
<label><input type="checkbox" /> Username is searchable (name or niche keyword)</label>
</div></section>
<section class="block" id="weekly-log"><h2>Weekly follower log</h2>
<p>Update every Sunday. Same data syncs to Hub tracker.</p>
<div class="tracker-inputs">
<label>Starting count (day 1)<input type="number" id="followers-start-ws" min="0" /></label>
<label>Current count<input type="number" id="followers-current-ws" min="0" /></label>
</div>
<table class="simple" id="week-log-table">
<tr><th>Week</th><th>Date</th><th>Followers</th><th>+/-</th></tr>
</table>
<button type="button" class="btn-secondary" id="log-week-btn">Log this week</button>
</section>
`));

// Gumroad sales page (seller reference — not in buyer nav)
const SALES_SHORT = `${PRODUCT.name} — ${PRODUCT.tagline}.

Simple 3-step system: fix profile · copy-paste posts & replies · execute daily for 90 days. Includes 90+ templates, follower tracker, and $91+ bonus vault (2 playbooks + 4 ebooks). By ${PRODUCT.author} (${PRODUCT.proof}).`;

const SALES_LONG = `You're posting. You're showing up. But you're stuck below 1,000 followers.

${PRODUCT.name} is the simple system I wish I had at 0 followers — not another $49 playbook with no daily routine.

3 STEPS:
1. SETUP (Day 1) — bio, profile, first posts
2. CONTENT (Week 1-2) — 90+ copy-paste templates + reply bank
3. EXECUTE (90 days) — daily command center: 2 posts + 30 replies

WHAT'S INCLUDED ($${PRODUCT.priceAnchor}+ value):
→ 90-day command center + follower tracker
→ 45 post templates + 22 structures + reply & thread banks
→ Worksheets + bio builder
→ X Writing Playbook + LinkedIn Playbook (PDF included)
→ 4 bonus ebooks (Playing to Win, X Simplified, and more)

PRICE: $${PRODUCT.priceLaunch} launch (${PRODUCT.priceLaunchLabel}) · then $${PRODUCT.priceStandard}

WHO THIS IS FOR:
• 0–1,000 followers on X
• Posting but not growing
• Want a simple daily routine — not a 40-hour course

${PRODUCT.author} — ${PRODUCT.proof}

30-day execution guarantee: show up daily, email me if you don't see progress.`;

fs.writeFileSync(path.join(ROOT, "GUMROAD-SALES-PAGE.html"), `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Sales Page — ${PRODUCT.name}</title>
  ${headMeta("Gumroad sales copy for " + PRODUCT.name)}
  <link rel="stylesheet" href="product-styles.css" />
</head>
<body>
<div class="wrap">
<div class="nav-wrap"><nav class="top"><a href="INDEX.html">← Back to Hub</a></nav></div>
<header class="hero sales-hero">
  <div class="badge">Gumroad · copy &amp; paste</div>
  <h1>${PRODUCT.name}</h1>
  <p class="sub">${PRODUCT.tagline} — without guessing what to post or who to reply to.</p>
  <p class="proof-line">Built by <strong>${PRODUCT.author}</strong> · ${PRODUCT.proof}</p>
  <div class="price-hero">
    <div class="price-hero-amount">$${PRODUCT.priceLaunch}</div>
    <div class="price-hero-note">${PRODUCT.priceLaunchLabel} · then $${PRODUCT.priceStandard} · worth $${PRODUCT.priceAnchor}+</div>
  </div>
</header>
<section class="block">
  <h2>Short description (Gumroad)</h2>
  <div class="copy-block">
  <textarea class="sales-copy" readonly>${SALES_SHORT}</textarea>
  <button type="button" class="copy-btn">Copy</button>
  </div>
</section>
<section class="block">
  <h2>Long description (Gumroad)</h2>
  <div class="copy-block">
  <textarea class="sales-copy" readonly style="min-height:280px">${SALES_LONG}</textarea>
  <button type="button" class="copy-btn">Copy</button>
  </div>
</section>
<section class="block"><h2>Before vs after</h2>
<div class="compare-grid">
  <div class="compare-card bad"><h3>Without a system</h3>
  <ul><li>Random posts, no growth</li><li>Generic replies, no follows</li><li>Bio that confuses visitors</li><li>Burnout by week 3</li><li>No idea what to post tomorrow</li></ul></div>
  <div class="compare-card good"><h3>With ${PRODUCT.name}</h3>
  <ul><li>3-step path — no overwhelm</li><li>90+ copy-paste templates</li><li>30/60/120-min daily routines</li><li>Follower tracker to 1K</li><li>2 playbooks + 4 ebooks included</li><li>Command Center you open daily</li></ul></div>
</div></section>
<section class="block"><h2>How we compare</h2>
<p class="section-lead">Top products charge $39–49 for a playbook alone. This is a full system at launch price.</p>
${competitorTableHtml()}
</section>
<section class="block"><h2>What you get</h2>
<div class="value-stack value-stack-simple">
  <div class="value-item"><span>90-day system + command center</span><span>$97</span></div>
  <div class="value-item"><span>90+ templates (posts, replies, threads)</span><span>$93</span></div>
  <div class="value-item"><span>Worksheets + follower tracker</span><span>$47</span></div>
  <div class="value-item"><span>2 playbooks + 4 ebooks</span><span>$91</span></div>
</div>
<div class="value-total"><span>Total value</span><span class="amount">$${PRODUCT.priceAnchor}+</span></div></section>
<section class="block"><h2>Pricing (Gumroad)</h2>
<div class="price-grid price-grid-simple">
  <div class="price-card featured"><div class="amount">$${PRODUCT.priceLaunch}</div><div class="tier">${PRODUCT.priceLaunchLabel}</div></div>
  <div class="price-card"><div class="amount">$${PRODUCT.priceStandard}</div><div class="tier">${PRODUCT.priceStandardLabel}</div></div>
</div>
<p class="value-note" style="margin-top:14px">Set Gumroad to <strong>$${PRODUCT.priceLaunch}</strong> at launch. Raise to $${PRODUCT.priceStandard} after 50 sales or 30 days — still underpriced vs competitors.</p></section>
<section class="block"><h2>FAQ (for sales page)</h2>
<div class="faq-item"><h3>Is this for complete beginners?</h3><p>Yes — if you're below 1,000 followers and willing to post + reply daily for 90 days.</p></div>
<div class="faq-item"><h3>Do I need paid tools?</h3><p>No to start. X + Notion + ChatGPT/Claude (all free) is enough for week 1. Hypefury or Typefully speed things up once you're posting daily.</p></div>
<div class="faq-item"><h3>How is this different from free X tips?</h3><p>Tips without a system don't compound. This is a daily operating system — templates, tiers, batch workflow, and a 90-day calendar.</p></div>
<div class="faq-item"><h3>Will this work in my niche?</h3><p>The templates are fill-in-the-blank. GAP framework works for any topic — you bring your niche, the system brings the structure.</p></div>
</section>
<section class="block"><h2>Guarantee line</h2>
<p>Follow the 90-day system for 30 days. If you show up daily and don't see measurable progress in impressions or followers, email for support.</p></section>
${footer()}
</div>
<script src="product.js"></script>
</body>
</html>`);

// Cheat sheet
fs.writeFileSync(path.join(ROOT, "CHEATSHEET.html"), page("Cheat Sheet", "INDEX.html", cheatsheetBody(), { bodyClass: "cheat-sheet" }));

console.log(`Built product at ${ROOT}`);
console.log("Files:", fs.readdirSync(ROOT).join(", "));
