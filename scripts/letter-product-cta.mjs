/**
 * End-of-letter product CTA — Dan Koe "When You're Ready" style
 */
const DEFAULT_HREF = "0-to-1K-X-System/LANDING.html";
const COVER_SRC = "assets/images/x-growth-system-playbook-cover.png";

export function renderLetterProductCta(opts = {}) {
  const href = opts.href || DEFAULT_HREF;
  const prefix = opts.assetPrefix || "";
  const coverSrc = opts.coverSrc || `${prefix}${COVER_SRC}`;

  return `<section class="koe-ready-cta" aria-label="The X System">
  <div class="koe-ready-cta-inner">
    <h2 class="koe-ready-cta-heading">When You're Ready, Here's How I Can Help You:</h2>
    <article class="koe-ready-card">
      <a class="koe-ready-card-cover" href="${prefix}${href}">
        <img src="${coverSrc}" alt="The X System — 0 to 1K Followers in 90 Days" loading="lazy" width="160" height="240" />
      </a>
      <div class="koe-ready-card-body">
        <h3 class="koe-ready-card-title">The 0→1K Daily System</h3>
        <p class="koe-ready-card-desc">Hit <strong>1,000 followers on 𝕏 in 90 days</strong> — daily checklist, copy-paste templates, and engagement scripts in folders you open every morning.</p>
        <p class="koe-ready-card-price"><span class="koe-ready-card-was">€147</span> <span class="koe-ready-card-now">€47</span></p>
        <a class="koe-ready-card-btn" href="${prefix}${href}">Get Instant Access →</a>
      </div>
    </article>
  </div>
</section>`;
}

/** Plain-text closing for Substack paste / email exports */
export const SOFT_CTA_PLAIN = `When you're ready:

The 0→1K Daily System — hit 1,000 followers on 𝕏 in 90 days
https://andreilucian.com/0-to-1K-X-System/LANDING.html`;
