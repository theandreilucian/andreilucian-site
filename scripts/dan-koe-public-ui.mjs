/** Dan Koe–style public chrome (subscribe band, author bio) */
import { escHtml } from "./substack-dan-koe-format.mjs";

export function renderKoeSubscribeTop(opts = {}) {
  const p = opts.assetPrefix || "";
  const href = opts.signupHref || `${p}index.html#newsletter-signup`;

  return `<aside class="koe-subscribe-top koe-subscribe-top--public" aria-label="Newsletter signup">
    <p class="koe-subscribe-top-label">Not A Subscriber Yet?</p>
    <p class="koe-subscribe-top-lead">Join <strong>1,100+ creators</strong> getting weekly letters on writing, audience growth, and building online — blunt proof, no guru noise.</p>
    <a class="koe-subscribe-top-btn" href="${escHtml(href)}">Receive 2 free letters a week</a>
  </aside>`;
}

export function renderKoeAuthorBio(opts = {}) {
  const p = opts.assetPrefix || "";
  const signupHref = opts.signupHref || `${p}index.html#newsletter-signup`;

  return `<section class="koe-author-bio" aria-label="About Andrei Lucian">
    <div class="koe-author-bio-card">
      <div class="koe-author-bio-avatar-wrap">
        <img src="${p}assets/andrei-lucian-headshot.png.jpg" alt="Andrei Lucian" class="koe-author-bio-avatar" loading="lazy" onerror="this.src='${p}assets/images/logo.png'; this.onerror=null;">
      </div>
      <p class="koe-author-bio-eyebrow">A N D R E I&nbsp;&nbsp;L U C I A N</p>
      <h2 class="koe-author-bio-title">Who Is Andrei Lucian?</h2>
      <p class="koe-author-bio-lead">Writer and creator documenting how to grow on 𝕏 and LinkedIn with proof — not theory.</p>
      <ul class="koe-author-bio-stats" aria-label="Audience stats">
        <li><span class="koe-author-bio-stat-num">5.3K</span><span class="koe-author-bio-stat-label">on 𝕏</span></li>
        <li><span class="koe-author-bio-stat-num">16.2K</span><span class="koe-author-bio-stat-label">LinkedIn</span></li>
        <li><span class="koe-author-bio-stat-num">1,100+</span><span class="koe-author-bio-stat-label">subscribers</span></li>
      </ul>
      <p class="koe-author-bio-text">I teach the daily systems I used to go from $0 to consistent income online.</p>
      <div class="koe-author-bio-actions">
        <a class="koe-author-bio-btn koe-author-bio-btn--primary" href="${escHtml(signupHref)}">Receive 2 free letters a week</a>
        <div class="koe-author-bio-links">
          <a href="https://x.com/theandreilucian" target="_blank" rel="noopener noreferrer" aria-label="Follow on X">𝕏</a>
          <a href="https://www.linkedin.com/in/andreilucian" target="_blank" rel="noopener noreferrer" aria-label="Connect on LinkedIn">LinkedIn</a>
          <a href="${p}index.html#newsletters">All letters</a>
        </div>
      </div>
    </div>
  </section>`;
}
