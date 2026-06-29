import { PRODUCT } from "./product-config.mjs";

export function bonusCard(item) {
  const tierClass = item.tier === "paid" ? "bonus-paid" : "bonus-free";
  const priceHtml = item.tier === "paid"
    ? `<div class="bonus-price"><span class="was">${item.wasPrice}</span><span class="now">${item.nowPrice}</span><span class="included">Included free</span></div>`
    : `<div class="bonus-price"><span class="free-pill">Free</span><span class="included">Included free</span></div>`;
  const pdfLink = item.pdf
    ? `<a class="bonus-dl" href="${item.pdf}" download onclick="event.stopPropagation()">Download PDF</a>`
    : "";
  const meta = [item.pages && `${item.pages} pages`, item.format].filter(Boolean).join(" · ");

  return `<div class="bonus-card ${tierClass}">
  <a class="bonus-card-link" href="${item.file}" target="_blank" rel="noopener">
    <div class="bonus-cover"><img src="${item.cover}" alt="${item.title} cover" loading="lazy" /></div>
    <div class="bonus-body">
      <div class="bonus-type">${item.badge}</div>
      ${priceHtml}
      <h3>${item.title}</h3>
      <p>${item.desc}</p>
      ${meta ? `<div class="bonus-meta">${meta}</div>` : ""}
    </div>
  </a>
  ${pdfLink}
</div>`;
}

export function bonusGrid(items) {
  return `<div class="bonus-grid bonus-grid-covers">${items.map(bonusCard).join("")}</div>`;
}

/** Playbooks — normally paid on Gumroad, included in 0→1K bundle */
export const PLAYBOOKS = [
  {
    id: "x-writing",
    title: "The X Writing Playbook",
    desc: "Hooks, threads, and posting rhythm — the writing system behind 5.3K on X without burning out.",
    file: "07-Bonuses/includes/x-writing-playbook.html",
    pdf: "07-Bonuses/includes/the-x-writing-playbook.pdf",
    cover: "07-Bonuses/covers/x-writing-playbook.png",
    badge: "Playbook",
    tier: "paid",
    wasPrice: "$27",
    nowPrice: "$19",
    format: "HTML + PDF",
  },
  {
    id: "linkedin-writing",
    title: "The LinkedIn Writing Playbook",
    desc: "Authority posts, profile, DMs — repurpose X wins on LinkedIn (16.2K followers).",
    file: "07-Bonuses/includes/linkedin-writing-playbook.html",
    pdf: "07-Bonuses/includes/the-linkedin-writing-playbook.pdf",
    cover: "07-Bonuses/covers/linkedin-writing-playbook.png",
    badge: "Playbook",
    tier: "paid",
    wasPrice: "$19",
    nowPrice: "$10",
    format: "HTML + PDF",
  },
];

/** Free ebooks — normally list-building freebies */
export const EBOOKS_FREE = [
  {
    id: "playing-to-win",
    title: "Playing to Win",
    desc: "21-page mindset guide — improve your life without overthinking. Zero fluff.",
    file: "07-Bonuses/includes/playing-to-win.html",
    cover: "07-Bonuses/covers/playing-to-win.png",
    badge: "Ebook · Mindset",
    tier: "free",
    pages: "21",
    format: "HTML",
  },
  {
    id: "x-simplified",
    title: "X Simplified",
    desc: "26 pages on high-performing Twitter content — the writing framework that 3x'd my growth.",
    file: "07-Bonuses/includes/x-simplified.html",
    cover: "07-Bonuses/covers/x-simplified.png",
    badge: "Ebook · X",
    tier: "free",
    pages: "26",
    format: "HTML",
  },
];

/** Extra ebooks bundled in the vault */
export const EBOOKS_EXTRA = [
  {
    id: "personal-branding",
    title: "The Personal Branding System",
    desc: "Build authority online — positioning, content, and the system behind a real personal brand.",
    file: "07-Bonuses/includes/personal-branding-system.html",
    cover: "07-Bonuses/covers/personal-branding-system.png",
    badge: "Ebook · Brand",
    tier: "paid",
    wasPrice: "$29",
    nowPrice: "$19",
    format: "HTML",
  },
  {
    id: "120-followers",
    title: "120 Followers in 23 Days",
    desc: "The rapid-growth system — daily schedule, engagement framework, and what actually worked.",
    file: "07-Bonuses/includes/120-followers-23-days.html",
    cover: "07-Bonuses/covers/120-followers.png",
    badge: "Ebook · Growth",
    tier: "paid",
    wasPrice: "$17",
    nowPrice: "$9",
    format: "HTML",
  },
];

export const BONUS_VAULT_VALUE = "$29+";

export function bonusesPageBody(lessonNavHtml = "") {
  return `
<header class="hero bonuses-hero">
  <div class="badge">Module 7 · Included free</div>
  <h1>Bonuses &amp; Resources</h1>
  <p class="sub">Paid playbooks + extra tools — all yours with this system.</p>
  <div class="vault-banner">
    <strong>${BONUS_VAULT_VALUE} retail value</strong> · 2 playbooks · bundled at no extra cost
  </div>
</header>
${lessonNavHtml}
<nav class="bonus-jump" aria-label="Resource sections">
  <a href="#toolkit">Toolkit</a>
  <a href="#playbooks">Writing Playbooks</a>
</nav>
<section class="block" id="toolkit"><h2>Execution toolkit (included)</h2>
<div class="toolkit-grid">
  <a class="tool-card featured" href="QUICK-WINS.html"><span class="tool-tag">Day 1</span><h3>First 24 Hours</h3><p>Hour-by-hour quick wins</p></a>
  <a class="tool-card" href="WORKSHEETS.html"><span class="tool-tag">Interactive</span><h3>Worksheets</h3><p>Bio builder + niche + audit</p></a>
  <a class="tool-card" href="REPLY-BANK.html"><span class="tool-tag">15</span><h3>Reply Bank</h3><p>Strategic reply templates</p></a>
  <a class="tool-card" href="THREAD-STARTERS.html"><span class="tool-tag">10</span><h3>Thread Starters</h3><p>Authority thread hooks</p></a>
  <a class="tool-card" href="CHEATSHEET.html"><span class="tool-tag">Print</span><h3>Cheat Sheet</h3><p>Daily one-pager</p></a>
</div></section>
<section class="block" id="playbooks">
  <h2>Writing playbooks <span class="section-tag">Normally paid · yours free</span></h2>
  <p class="section-lead">These sell on Gumroad for $19 and $10. Included in ${PRODUCT.name} — open in browser or download PDF.</p>
  ${bonusGrid(PLAYBOOKS)}
</section>`;
}
