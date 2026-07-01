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

function renderAuthorSocialLinks() {
  return `<div class="koe-author-bio-social" aria-label="Social links">
    <a href="https://x.com/theandreilucian" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M15.5 2h2.5l-5.5 6.25L18 15h-4.5l-3.5-4.5L6 15H2l5-5.75L2 2h4.5l3 4L13 2h2.5z"/></svg>
    </a>
    <a href="https://www.linkedin.com/in/andreilucian" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M4.5 2C3.67 2 3 2.67 3 3.5v13c0 .83.67 1.5 1.5 1.5h13c.83 0 1.5-.67 1.5-1.5v-13c0-.83-.67-1.5-1.5-1.5h-13zM7 7h2v8H7V7zm1-2a1 1 0 1 1 0 2 1 1 0 0 1-2 0zm3 2h1.5v8H11V7zm2.5 0H15v5.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V7h1.5v8H17v-3.5c0-1.38-1.12-2.5-2.5-2.5S12 10.12 12 11.5V15h-1V7z"/></svg>
    </a>
    <a href="https://www.instagram.com/theandreilucian/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 2.5c2.76 0 3.08.01 4.17.06.98.04 1.51.18 1.86.3.47.15.8.33 1.15.68.35.35.53.68.68 1.15.12.35.26.88.3 1.86.05 1.09.06 1.41.06 4.17s-.01 3.08-.06 4.17c-.04.98-.18 1.51-.3 1.86-.15.47-.33.8-.68 1.15-.35.35-.68.53-1.15.68-.35.12-.88.26-1.86.3-1.09.05-1.41.06-4.17.06s-3.08-.01-4.17-.06c-.98-.04-1.51-.18-1.86-.3-.47-.15-.8-.33-1.15-.68-.35-.35-.53-.68-.68-1.15-.12-.35-.26-.88-.3-1.86-.05-1.09-.06-1.41-.06-4.17s.01-3.08.06-4.17c.04-.98.18-1.51.3-1.86.15-.47.33-.8.68-1.15.35-.35.68-.53 1.15-.68.35-.12.88-.26 1.86-.3 1.09-.05 1.41-.06 4.17-.06zm0-2.5C7.24 0 6.92.01 5.83.06 4.85.1 4.32.24 3.97.36 3.5.51 3.17.69 2.82 1.04 2.47 1.39 2.29 1.72 2.14 2.19 2.02 2.66 1.98 3.64 1.93 4.73 1.92 5.05 1.92 7.81 1.92 10.57s.01 5.52.06 6.61c.04.98.18 1.51.3 1.86.15.47.33.8.68 1.15.35.35.68.53 1.15.68.35.12.88.26 1.86.3 1.09.05 1.41.06 4.17.06s3.08-.01 4.17-.06c.98-.04 1.51-.18 1.86-.3.47-.15.8-.33 1.15-.68.35-.35.53-.68.68-1.15.12-.35.26-.88.3-1.86.05-1.09.06-1.41.06-4.17s-.01-3.08-.06-4.17c-.04-.98-.18-1.51-.3-1.86-.15-.47-.33-.8-.68-1.15-.35-.35-.68-.53-1.15-.68-.35-.12-.88-.26-1.86-.3-1.09-.05-1.41-.06-4.17-.06z"/><path d="M10 5.38c-2.55 0-4.62 2.07-4.62 4.62s2.07 4.62 4.62 4.62 4.62-2.07 4.62-4.62-2.07-4.62-4.62-4.62zm0 7.62c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm6.25-7.5c-.6 0-1.08.48-1.08 1.08s.48 1.08 1.08 1.08 1.08-.48 1.08-1.08-.48-1.08-1.08-1.08z"/></svg>
    </a>
  </div>`;
}

export function renderKoeAuthorBio(opts = {}) {
  const p = opts.assetPrefix || "";
  const signupHref = opts.signupHref || `${p}index.html#newsletter-signup`;

  return `<section class="koe-author-bio" aria-label="About Andrei Lucian">
    <div class="koe-author-bio-header">
      <p class="koe-author-bio-eyebrow">About Me</p>
      <h2 class="koe-author-bio-title">Who Is Andrei Lucian?</h2>
      <p class="koe-author-bio-tagline">I write online for a living — and share what I'm learning along the way.</p>
    </div>
    <div class="koe-author-bio-grid">
      <div class="koe-author-bio-visual">
        <img src="${p}assets/andrei-lucian-headshot.png.jpg" alt="Andrei Lucian" class="koe-author-bio-avatar" width="280" height="280" loading="lazy" onerror="this.src='${p}assets/images/logo.png'; this.onerror=null;">
        ${renderAuthorSocialLinks()}
      </div>
      <div class="koe-author-bio-copy">
        <p class="koe-author-bio-greeting"><strong>Hey, I'm Andrei.</strong></p>
        <p>I spent years posting into the void before I figured out what actually grows an audience on 𝕏 and LinkedIn. Now I write about that — the drafts, the reps, the small wins most people skip over.</p>
        <p>5.3K on 𝕏 · 16.2K on LinkedIn · 1,100+ newsletter readers. I went from $0 to consistent income online by treating writing like a skill you build, not a hack you find.</p>
        <p>Every week I send letters on writing, audience growth, and building a one-person business — practical stuff you can use this week.</p>
        <p class="koe-author-bio-cta"><a href="${escHtml(signupHref)}">Receive 2 free letters a week →</a> · <a href="${p}index.html#newsletters">All letters</a></p>
      </div>
    </div>
  </section>`;
}
