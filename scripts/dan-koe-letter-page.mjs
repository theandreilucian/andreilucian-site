/**
 * Dan Koe–style letter page — featured hero + cream reading sheet.
 */
import { RICH_PASTE_JS } from "./substack-dan-koe-rich-paste.mjs";
import { escHtml } from "./substack-dan-koe-format.mjs";
import { renderKoeSubscribeTop, renderKoeAuthorBio } from "./dan-koe-public-ui.mjs";
import { renderSiteNav } from "./site-nav.mjs";
import { renderSiteFooter } from "./site-footer.mjs";

export { escHtml, renderSiteNav, renderSiteFooter };

const COPY_JS = `
function flashBtn(btn, okText) {
  const orig = btn.dataset.label || btn.textContent;
  btn.textContent = okText || 'Copied!';
  btn.classList.add('ok');
  setTimeout(() => { btn.textContent = orig; btn.classList.remove('ok'); }, 1600);
}
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.copy);
    if (!el) return;
    navigator.clipboard.writeText(el.value).then(() => flashBtn(btn)).catch(() => alert('Copy failed'));
  });
});
${RICH_PASTE_JS}
`;

/**
 * @param {object} opts
 * @param {boolean} [opts.readerMode=true] - public page: article only, no paste chrome
 */
export function renderDanKoeLetterPage(opts) {
  const p = opts.assetPrefix || "";
  const home = opts.homeHref || `${p}index.html#newsletters`;
  const readerMode = opts.readerMode !== false;
  const signupHref = opts.signupHref || `${p}index.html#newsletter-signup`;

  const navPrev = opts.prev
    ? `<a class="koe-nav-link" href="${escHtml(opts.prev.href)}">← ${escHtml(opts.prev.label)}</a>`
    : `<span class="koe-nav-link koe-nav-link--empty"></span>`;
  const navNext = opts.next
    ? `<a class="koe-nav-link" href="${escHtml(opts.next.href)}">${escHtml(opts.next.label)} →</a>`
    : `<span class="koe-nav-link koe-nav-link--empty"></span>`;

  const copyBlock =
    !readerMode && opts.copy
      ? `<details class="koe-author-tools">
    <summary>Copy for Substack</summary>
    <div class="koe-author-tools-inner">
      <button type="button" class="koe-btn koe-btn-primary" data-copy-rich="${escHtml(opts.copy.richId)}" data-label="Copy full post">Copy full post</button>
      <button type="button" class="koe-btn" data-copy="subject${opts.copy.id}" data-label="Copy subject">Subject</button>
      <button type="button" class="koe-btn" data-copy="preheader${opts.copy.id}" data-label="Copy subtitle">Subtitle</button>
    </div>
  </details>
  <textarea id="subject${opts.copy.id}" class="sr-only" readonly>${escHtml(opts.copy.subject)}</textarea>
  <textarea id="preheader${opts.copy.id}" class="sr-only" readonly>${escHtml(opts.copy.preheader || "")}</textarea>`
      : "";

  const richRoot = !readerMode && opts.copy?.richId ? ` id="${escHtml(opts.copy.richId)}"` : "";

  const metaLine =
    opts.dateLabel
      ? `<ul class="koe-meta-list">
    <li>${escHtml(opts.dateLabel)}</li>
    <li>Andrei Lucian</li>
  </ul>`
      : "";

  const subscribeTop = readerMode
    ? renderKoeSubscribeTop({ assetPrefix: p, signupHref })
    : renderKoeSubscribeTop({ assetPrefix: p, signupHref });

  const subscribeBottom = readerMode
    ? ""
    : `<section class="koe-subscribe">
      <p class="koe-subscribe-label">The Andrei Lucian Letters</p>
      <p class="koe-subscribe-lead">Discover how you can use your ideas to bring clarity, readers, and income online.</p>
      <a class="koe-subscribe-btn" href="${escHtml(signupHref)}">Subscribe free</a>
    </section>`;

  const productCta = opts.productCtaHtml || "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escHtml(opts.title)} | Andrei Lucian Letters</title>
  <link rel="stylesheet" href="${p}styles.css" />
  <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600&family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
</head>
<body class="koe-letter-page${readerMode ? " koe-letter-page--reader" : ""}">
  ${renderSiteNav(p)}

  <article class="koe-article"${richRoot}>
    ${subscribeTop}

    <figure class="koe-featured">
      <img data-hero-img src="${escHtml(opts.heroSrc)}" alt="" />
    </figure>

    <div class="koe-stage">
      <div class="koe-sheet">
        ${metaLine}
        <h1 class="koe-title">${escHtml(opts.title)}</h1>
        ${opts.deck ? `<p class="koe-deck">${escHtml(opts.deck)}</p>` : ""}
        <div class="koe-body" data-letter-root>
          ${opts.bodyHtml}
        </div>
        <p class="koe-thanks">Thank you for reading.</p>
        <p class="koe-signoff">– Andrei</p>
      </div>
    </div>

    ${productCta}

    <nav class="koe-article-nav">
      ${navPrev}
      <a class="koe-nav-home" href="${escHtml(home)}">All letters</a>
      ${navNext}
    </nav>

    ${copyBlock}
    ${subscribeBottom}
  </article>

  ${renderKoeAuthorBio({ assetPrefix: p, signupHref })}

  ${renderSiteFooter(p)}

  ${!readerMode || opts.copy ? `<script>${COPY_JS}</script>` : ""}
</body>
</html>`;
}
