import fs from "fs";

const path = "ghostwriting.html";
let html = fs.readFileSync(path, "utf8");

const cssInsert = `
    .proof-vault {
      margin-top: 28px;
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 18px;
      background: rgba(255,255,255,0.02);
      overflow: hidden;
    }
    .proof-vault > summary {
      list-style: none;
      cursor: pointer;
      padding: 18px 20px;
      font-size: 15px;
      font-weight: 650;
      color: #f0f0f2;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      flex-wrap: wrap;
    }
    .proof-vault > summary::-webkit-details-marker { display: none; }
    .proof-vault > summary::after {
      content: "+";
      color: var(--accent);
      font-size: 20px;
      font-weight: 700;
    }
    .proof-vault[open] > summary::after { content: "–"; }
    .proof-vault > summary span {
      color: var(--muted);
      font-weight: 500;
      font-size: 13px;
    }
    .proof-vault-body { padding: 0 16px 22px; }
    .package .price-band {
      margin: 10px 0 14px;
      font-size: 14px;
      color: var(--accent);
      font-weight: 650;
    }
`;

if (!html.includes(".proof-vault {")) {
  html = html.replace("    .hero-niche {", cssInsert + "\n    .hero-niche {");
}

html = html.replace(
  `          <div class="hero-niche">LinkedIn for B2B founders</div>
          <h1 class="hero-hook">
            <span class="hook-line">LinkedIn that</span>
            <span class="hook-accent-block">books you calls.</span>
          </h1>
          <p class="hero-subline">You run the company. I write the posts.</p>
          <p class="hero-lead">Your voice. You approve every line. Then I publish.</p>`,
  `          <div class="hero-niche">X + LinkedIn · for founders</div>
          <h1 class="hero-hook">
            <span class="hook-line">A personal brand that</span>
            <span class="hook-accent-block">books you calls.</span>
          </h1>
          <p class="hero-subline">You run the company. I write X + LinkedIn.</p>
          <p class="hero-lead">Your voice. You approve every line. Then I publish.</p>`
);

html = html.replace(
  `<p class="hero-cta-note">One LinkedIn message · <strong>fit first</strong> · then price</p>`,
  `<p class="hero-cta-note">Ghostwriting from <strong>$1K/mo</strong> · fit first · then exact price</p>`
);

html = html.replace(
  `            <div class="platform">Done-for-you · Ghostwriting</div>
            <h3 class="display pkg-line">I write LinkedIn. <em>You run the company.</em></h3>
            <div class="promise">Positioning, weekly posts, inbound — without you living in the feed. <span>I write. You approve. Nothing ships without you.</span></div>
            <div class="outcome-line">Best if you’re too busy building to own the content calendar.</div>
            <div class="badge-row">
              <span>LinkedIn-first</span>
              <span>X optional</span>
              <span>35+ clients</span>
            </div>`,
  `            <div class="platform">Done-for-you · Ghostwriting</div>
            <h3 class="display pkg-line">I write. <em>You run the company.</em></h3>
            <div class="promise">Positioning, weekly posts, inbound on <strong>LinkedIn + X</strong> — without you living in the feed. <span>I write. You approve. Nothing ships without you.</span></div>
            <div class="price-band">From $1K/mo · price after fit</div>
            <div class="outcome-line">Best if you’re too busy building to own the content calendar.</div>
            <div class="badge-row">
              <span>LinkedIn</span>
              <span>X</span>
              <span>35+ clients</span>
            </div>`
);

html = html.replace(
  `          <span class="eyebrow">Two offers</span>
          <h2 class="display">I write. Or I direct.</h2>
          <p>Same standard. Different involvement. Pick a lane. DM the word. Price comes after fit.</p>`,
  `          <span class="eyebrow">Two offers · X + LinkedIn</span>
          <h2 class="display">I write. Or I direct.</h2>
          <p>Same standard. Different involvement. Most founders start with ghostwriting. Price after fit.</p>`
);

html = html.replace(
  `          <span class="eyebrow">Proof · middle</span>
          <h2 class="display">Client breakouts. Platform walls.</h2>
          <p>Post spikes + LinkedIn/X receipts. Messages and the full wall close the page.</p>`,
  `          <span class="eyebrow">Proof · LinkedIn + X</span>
          <h2 class="display">Breakouts on both platforms.</h2>
          <p>LinkedIn opens inbound. X compounds the brand. Same voice. Different doors.</p>`
);

const vaultStart =
  '        <div class="own-case-label" style="margin-top:36px;">LinkedIn receipts · biggest numbers</div>';
const vaultEndMarker = `<div class="mid-cta reveal" style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;margin:40px 0 8px;padding:22px 18px;border:1px solid rgba(94,234,212,0.22);border-radius:16px;background:rgba(255,255,255,0.03);">
          <p style="margin:0;color:#e8eeef;font-size:14px;text-align:center;max-width:440px;">Ready for DFY ghostwriting — or 1:1 LinkedIn coaching?</p>`;

if (html.includes(vaultStart) && !html.includes('id="proofVaultMid"')) {
  html = html.replace(
    vaultStart,
    `        <details class="proof-vault" id="proofVaultMid">
          <summary>Full LinkedIn + X receipt wall <span>optional · open if you want every screenshot</span></summary>
          <div class="proof-vault-body">
        <div class="own-case-label" style="margin-top:12px;">LinkedIn receipts · biggest numbers</div>`
  );
  html = html.replace(
    vaultEndMarker,
    `          </div>
        </details>

<div class="mid-cta reveal" style="display:flex;flex-wrap:wrap;gap:12px;justify-content:center;align-items:center;margin:40px 0 8px;padding:22px 18px;border:1px solid rgba(94,234,212,0.22);border-radius:16px;background:rgba(255,255,255,0.03);">
          <p style="margin:0;color:#e8eeef;font-size:14px;text-align:center;max-width:440px;">Ready for DFY ghostwriting on LinkedIn + X?</p>`
  );
}

const notesHead = `        <div class="section-head center reveal">
          <span class="eyebrow">Proof · close</span>
          <h2 class="display">Inbox screenshots. Then the wall.</h2>
          <p>Messages, reviews, before → after, then the full receipt rail. Drag or arrows · click to enlarge.</p>
        </div>
        <div class="proof-block proof-block--wall">`;

if (html.includes(notesHead) && !html.includes('id="proofVaultClose"')) {
  html = html.replace(
    notesHead,
    `        <div class="section-head center reveal">
          <span class="eyebrow">Proof · close</span>
          <h2 class="display">Messages + full wall.</h2>
          <p>Keep going for FAQ — or open the vault for every LinkedIn + X screenshot.</p>
        </div>
        <details class="proof-vault" id="proofVaultClose">
          <summary>Open inbox + receipt vault <span>LinkedIn + X · click to expand</span></summary>
          <div class="proof-vault-body">
        <div class="proof-block proof-block--wall">`
  );

  if (!html.includes('id="proofVaultClose"') || !html.includes("</details>\n\n    <section id=\"guarantee\">")) {
    html = html.replace(
      /(\s*)<section id="guarantee">/,
      "          </div>\n        </details>\n\n$1<section id=\"guarantee\">"
    );
  }
}

html = html.replace(
  `<div class="sa-copy"><strong>433K · 28d</strong> · ready for your LinkedIn?</div>`,
  `<div class="sa-copy"><strong>DM GHOST</strong> · from $1K/mo · LinkedIn + X</div>`
);

html = html.replace(
  `          <p class="final-lead">
            Want pricing? Ask in the same message. Fit first — if it’s not a match, I’ll say so.
          </p>`,
  `          <p class="final-lead">
            Ghostwriting from <strong>$1K/mo</strong> after fit. LinkedIn + X. Ask for pricing in the same DM.
          </p>`
);

html = html.replace(
  `            <p>“Hey Andrei — GHOST. Founder. Want LinkedIn done-for-you. What’s fit + pricing?”</p>`,
  `            <p>“Hey Andrei — GHOST. Founder. Want LinkedIn + X done-for-you. What’s fit + pricing?”</p>`
);

fs.writeFileSync(path, html);
console.log({
  vaultMid: html.includes('id="proofVaultMid"'),
  vaultClose: html.includes('id="proofVaultClose"'),
  price: html.includes("From $1K/mo"),
  platforms: html.includes("X + LinkedIn · for founders"),
});
