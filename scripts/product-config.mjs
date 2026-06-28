/** The 0 to 1K X System — brand, pricing, positioning (single source of truth) */

export const PRODUCT = {
  name: "The 0 to 1K X System",
  tagline: "0 → 1,000 Followers in 90 Days",
  pitch:
    "The simple 90-day system for creators stuck below 1K — fix your profile, copy-paste what to post, reply strategically, execute daily.",
  metaDescription:
    "The 0 to 1K X System — go from 0 to 1,000 followers on X in 90 days with templates, reply bank, and a daily command center.",
  author: "Andrei Lucian",
  proof: "5.3K on X · 16.2K on LinkedIn · 2.5+ years building daily",

  // Pricing (Dan Koe ladder: entry trust product — launch low, raise later)
  priceLaunch: 47,
  priceStandard: 79,
  priceAnchor: 197,
  priceLaunchLabel: "Launch · first 50 buyers",
  priceStandardLabel: "Standard price",

  checkoutProvider: "stripe",
  stripePaymentLink: "https://buy.stripe.com/YOUR_LINK_HERE",
  checkoutUrl: "https://buy.stripe.com/YOUR_LINK_HERE",
  checkoutDirect: true,

  bundleNote: "2 playbooks + 4 ebooks + 90+ templates — one payment, no upsells",
};

export const COMPETITORS = [
  { name: "Twitter Growth Playbook (Easlo)", price: "$49", includes: "PDF playbook", gap: "No daily system or reply bank" },
  { name: "How to Dominate X (Dago)", price: "$39–49", includes: "Video course", gap: "No copy-paste templates" },
  { name: "0→1K Notion (free)", price: "Free", includes: "Notion doc", gap: "No worksheets, tracker, or bonuses" },
  { name: "1000 Followers Workshop", price: "$129+", includes: "Workshop", gap: "No 90-day command center" },
];

export function threeStepPathHtml() {
  return `<section class="block three-step-path">
  <h2>3 steps. 90 days. 1,000 followers.</h2>
  <p class="section-lead">Don't overthink it. Every top growth product boils down to the same loop — we just made it copy-paste simple.</p>
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
<tr class="you-row"><td><strong>${PRODUCT.name}</strong></td><td><strong>$${PRODUCT.priceLaunch}</strong></td><td>Course + 90+ assets + $91 bonus vault</td><td class="good">Nothing — it's all here</td></tr>
</table>`;
}
