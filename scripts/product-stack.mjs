/**
 * Stack weapons — tools + affiliate links (single source of truth).
 * Update AFFILIATE URLs below with your referral links.
 */

/** @type {Record<string, string>} Replace values with your affiliate / referral URLs */
export const AFFILIATE = {
  hypefury: "https://hypefury.com/?via=andrei57",
  cursor: "https://cursor.com/referral?code=Y99TRRGTXDPE",
};

export const STACK_WEAPONS = [
  {
    id: "x",
    name: "X",
    cost: "free",
    priority: "Required",
    desc: "Your platform — post, reply, threads, DMs",
    siteUrl: "https://x.com",
    affiliateKey: null,
  },
  {
    id: "notion",
    name: "Notion",
    cost: "free",
    priority: "Required",
    desc: "Idea bank · 90-day planner · winners vault",
    siteUrl: "https://www.notion.so",
    affiliateKey: null,
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    cost: "free",
    priority: "Recommended",
    desc: "Hook variations · outlines · template remixes",
    siteUrl: "https://chat.openai.com",
    affiliateKey: null,
  },
  {
    id: "hypefury",
    name: "Hypefury",
    cost: "paid",
    priority: "Highly recommended",
    desc: "Schedule posts · queue 7–14 days · engagement lists",
    siteUrl: "https://hypefury.com",
    affiliateKey: "hypefury",
  },
  {
    id: "cursor",
    name: "Cursor",
    cost: "paid",
    priority: "Optional",
    desc: "Batch content · build pages · ship products faster",
    siteUrl: "https://cursor.com",
    affiliateKey: "cursor",
  },
];

function affiliateUrl(tool) {
  if (!tool.affiliateKey) return null;
  const url = AFFILIATE[tool.affiliateKey]?.trim();
  return url || null;
}

function linkCell(tool) {
  const aff = affiliateUrl(tool);
  if (aff) {
    return `<a class="stack-affiliate" href="${aff}" target="_blank" rel="noopener sponsored">Get ${tool.name} ↗</a>`;
  }
  if (tool.affiliateKey) {
    return `<a class="stack-site" href="${tool.siteUrl}" target="_blank" rel="noopener">Visit ${tool.name} ↗</a>`;
  }
  return `<span class="stack-free">Free</span>`;
}

function costTag(cost) {
  const cls = cost === "free" ? "free" : "paid";
  const label = cost === "free" ? "Free" : "Paid";
  return `<span class="cost-tag ${cls}">${label}</span>`;
}

/** Full stack weapons table (optional heading) */
export function stackWeaponsTableHtml({ withHeading = true } = {}) {
  const rows = STACK_WEAPONS.map(
    (t) => `<tr>
  <td><strong>${t.name}</strong></td>
  <td>${t.desc}</td>
  <td>${costTag(t.cost)}</td>
  <td class="stack-link">${linkCell(t)}</td>
</tr>`
  ).join("");

  const heading = withHeading
    ? `<h3>Stack weapons (my exact tools)</h3>
<p>Start with the free row. Add paid tools when you're posting daily and need speed.</p>
<p class="stack-affiliate-note"><em>Links marked ↗ may be affiliate links — I only recommend tools I use weekly.</em></p>`
    : "";

  return `${heading}
<table class="simple stack-weapons-table">
<tr><th>Tool</th><th>What it does in this system</th><th>Cost</th><th>Get it</th></tr>
${rows}
</table>`;
}

/** Compact list for simplified Start Here (free + paid bullets with affiliate links) */
export function stackWeaponsListsHtml() {
  const free = STACK_WEAPONS.filter((t) => t.cost === "free");
  const paid = STACK_WEAPONS.filter((t) => t.cost === "paid");

  const item = (t) => {
    const aff = affiliateUrl(t);
    const link = aff
      ? `<a href="${aff}" target="_blank" rel="noopener sponsored" class="stack-affiliate-inline">Get ${t.name} ↗</a>`
      : t.affiliateKey
        ? `<a href="${t.siteUrl}" target="_blank" rel="noopener" class="stack-affiliate-inline">Visit ${t.name} ↗</a>`
        : "";
    return `<li><strong>${t.name}</strong> — ${t.desc}${link ? ` · ${link}` : ""}</li>`;
  };

  return `<p><strong>Free (enough to start):</strong></p>
<ul>${free.map(item).join("")}</ul>
<p><strong>Paid (add when you're posting daily):</strong></p>
<ul>${paid.map(item).join("")}</ul>
<p class="stack-affiliate-note"><em>↗ links may be affiliate — no extra cost to you.</em></p>`;
}
