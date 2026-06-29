/** The X System — brand, pricing, delivery (single source of truth) */

export const PRODUCT = {
  name: "The X System",
  shortName: "X System",
  fullName: "Andrei Lucian — The X System",
  zipFolderName: "Andrei Lucian - The X System",
  zipFileName: "Andrei Lucian - The X System.zip",
  tagline: "0 → 1K Followers in 90 Days",
  hook: "Stop being invisible on X.",
  pitch:
    "The 90-day operating system for creators stuck under 1K — fix your profile, copy-paste what to post, reply strategically, execute daily.",
  metaDescription:
    "The X System — go from invisible to 1,000 followers on X in 90 days. Daily command center, 90+ templates, reply bank, and bonus vault.",
  author: "Andrei Lucian",
  proof: "5.3K on X · 16.3K on LinkedIn · 2.5+ years building daily",

  priceLaunch: 47,
  priceStandard: 79,
  priceAnchor: 197,
  currency: "EUR",
  currencySymbol: "€",
  priceLaunchLabel: "Launch · 5 days only",
  priceStandardLabel: "Standard price",

  checkoutProvider: "gumroad",
  gumroadProductUrl: "https://andreilucian.gumroad.com/l/glctvz",
  directCheckout: true,
  hubUrl: "https://andreilucian.com/0-to-1K-X-System/INDEX.html",
  zipUrl:
    "https://andreilucian.com/0-to-1K-X-System/downloads/Andrei%20Lucian%20-%20The%20X%20System.zip",

  bundleNote: "2 playbooks + 4 ebooks + 90+ templates — one payment, no upsells",
};

/** Format product price in EUR */
export function formatPrice(amount) {
  return `€${amount}`;
}

/** Affiliate URLs + copy — used in ZIP text files and hub */
export const AFFILIATE_LINKS = [
  {
    name: "Hypefury",
    url: "https://hypefury.com/?via=andrei57",
    when: "Week 2+ when you're posting daily",
    line1:
      "Schedules your posts so you batch once a week and never stare at a blank publish button.",
    line2: "Engagement lists pull up the accounts you reply to every morning.",
  },
  {
    name: "Cursor",
    url: "https://cursor.com/referral?code=Y99TRRGTXDPE",
    when: "When building a landing page, product, or site alongside X",
    line1: "AI code editor that edits your project files directly.",
    line2:
      "Build landing pages, product hubs, and Gumroad ZIP packages without hiring a developer.",
  },
];

/** WinRAR-style folder map — used for ZIP packaging + hub explorer */
export const DELIVERY_MODULES = [
  {
    num: "01",
    folder: "01-Start Here",
    title: "Start Here",
    summary: "Orientation · Day 1 · cheat sheet · worksheets",
    entry: "01-Start-Here.html",
    items: [
      { file: "01-Start-Here.html", label: "Welcome & how to use" },
      { file: "QUICK-WINS.html", label: "First 24 hours" },
      { file: "CHEATSHEET.html", label: "90-day cheat sheet" },
      { file: "WORKSHEETS.html", label: "Bio builder & worksheets" },
    ],
  },
  {
    num: "02",
    folder: "02-Level 0 - Engagement Weapons",
    title: "Engagement Weapons",
    summary: "Replies · threads · tools",
    entry: "REPLY-BANK.html",
    items: [
      { file: "REPLY-BANK.html", label: "Strategic reply bank" },
      { file: "THREAD-STARTERS.html", label: "Thread starters" },
      { file: "TOOL-STACK.html", label: "Free & paid tool stack" },
    ],
  },
  {
    num: "03",
    folder: "03-Level 1 - Profile & Positioning",
    title: "Profile & Positioning",
    summary: "Bio · pin · niche clarity",
    entry: "02-Level-1-Profile-Weapons.html",
    items: [{ file: "02-Level-1-Profile-Weapons.html", label: "Profile weapons" }],
  },
  {
    num: "04",
    folder: "04-Level 2 - Content Playbook",
    title: "Content Playbook",
    summary: "GAP · IEE · 90+ post templates",
    entry: "03-Level-2-Content-Arsenal.html",
    items: [{ file: "03-Level-2-Content-Arsenal.html", label: "Posts & templates" }],
  },
  {
    num: "05",
    folder: "05-Level 3 - Daily Workflow",
    title: "Daily Workflow",
    summary: "Batch · queue · remix winners",
    entry: "04-Level-3-Content-Production.html",
    items: [{ file: "04-Level-3-Content-Production.html", label: "Weekly batch system" }],
  },
  {
    num: "06",
    folder: "06-Level 4 - Growth Fundamentals",
    title: "Growth Fundamentals",
    summary: "What to post · who · attention",
    entry: "05-Level-4-Philosophy.html",
    items: [{ file: "05-Level-4-Philosophy.html", label: "Growth basics" }],
  },
  {
    num: "07",
    folder: "07-Level 5 - 90-Day Command Center",
    title: "90-Day Command Center",
    summary: "Daily checklist · phases · DMs",
    entry: "06-Level-5-Breakthrough-90-Day.html",
    items: [{ file: "06-Level-5-Breakthrough-90-Day.html", label: "Daily driver" }],
  },
  {
    num: "08",
    folder: "08-Bonuses",
    title: "Bonuses",
    summary: "Playbooks · ebooks · PDF vault",
    entry: "07-Bonuses.html",
    items: [
      { file: "07-Bonuses.html", label: "Bonus vault hub" },
      { file: "07-Bonuses/includes/", label: "Playbooks & ebooks (folder)" },
    ],
  },
];

export const COMPETITORS = [
  { name: "Twitter Growth Playbook (Easlo)", price: "$49", includes: "PDF playbook", gap: "No daily system or reply bank" },
  { name: "How to Dominate X (Dago)", price: "$39–49", includes: "Video course", gap: "No copy-paste templates" },
  { name: "0→1K Notion (free)", price: "Free", includes: "Notion doc", gap: "No worksheets, tracker, or bonuses" },
  { name: "1000 Followers Workshop", price: "$129+", includes: "Workshop", gap: "No 90-day command center" },
];

export function threeStepPathHtml() {
  return `<section class="block three-step-path">
  <h2>3 steps. 90 days. 1,000 followers.</h2>
  <p class="section-lead">Every top growth product boils down to the same loop — we made it copy-paste simple.</p>
  <div class="steps-grid">
    <a class="step-card" href="QUICK-WINS.html">
      <div class="step-num">1</div>
      <h3>Setup <span>Day 1</span></h3>
      <p>Fix bio · profile audit · set your 90-day start date · first posts</p>
      <span class="step-cta">First 24 Hours →</span>
    </a>
    <a class="step-card" href="03-Level-2-Content-Arsenal.html">
      <div class="step-num">2</div>
      <h3>Content <span>Week 1–2</span></h3>
      <p>Fill templates · reply bank · batch a week of posts in 90 minutes</p>
      <span class="step-cta">Open Templates →</span>
    </a>
    <a class="step-card featured" href="06-Level-5-Breakthrough-90-Day.html">
      <div class="step-num">3</div>
      <h3>Execute <span>Daily · 90 days</span></h3>
      <p>2 posts + 30 replies · track followers · remix winners every Sunday</p>
      <span class="step-cta">Command Center →</span>
    </a>
  </div>
</section>`;
}

export function competitorTableHtml() {
  const rows = COMPETITORS.map(
    (c) => `<tr><td>${c.name}</td><td>${c.price}</td><td>${c.includes}</td><td class="gap">${c.gap}</td></tr>`
  ).join("");
  return `<table class="simple compare-table">
<tr><th>Product</th><th>Price</th><th>You get</th><th>Missing</th></tr>
${rows}
<tr class="you-row"><td><strong>${PRODUCT.name}</strong></td><td><strong>${formatPrice(PRODUCT.priceLaunch)}</strong></td><td>Full system + 90+ assets + €91 bonus vault</td><td class="good">Nothing — it's all here</td></tr>
</table>`;
}

/** Flat map: filename → folder name (null = product root) */
export function fileLocationMap() {
  const map = { "INDEX.html": null, "OPEN-FIRST.html": null };
  for (const mod of DELIVERY_MODULES) {
    for (const item of mod.items) {
      if (item.file.endsWith("/")) continue;
      map[item.file] = mod.folder;
    }
  }
  return map;
}
