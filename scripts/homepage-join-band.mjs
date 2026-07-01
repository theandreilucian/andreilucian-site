/** Dan Koe–style “Join The 1%” bands */

export function renderJoinBand(opts = {}) {
  const eyebrow = opts.eyebrow ?? "Newsletter";
  const title = opts.title ?? "Join The 1,100+";
  const sub =
    opts.sub ??
    "Become a sharper writer with weekly letters on growth, audience, and building income online.";
  const suffix = opts.idSuffix ? `-${opts.idSuffix}` : "";
  const sectionId = opts.sectionId ?? `join-band${suffix}`;

  return `<section class="koe-join-band" id="${sectionId}">
    <div class="koe-join-band-inner">
      <p class="koe-join-eyebrow">${eyebrow}</p>
      <h2 class="koe-join-title">${title}</h2>
      <p class="koe-join-sub">${sub}</p>
      <form id="newsletterFormBottom${suffix}" class="newsletter-form-bottom koe-join-form">
        <input type="email" id="emailInputBottom${suffix}" class="email-input-bottom" placeholder="Your Email" required>
        <button type="submit" class="submit-btn-bottom koe-join-btn">Receive 2 free letters a week</button>
      </form>
      <div id="formMessageBottom${suffix}" class="form-message"></div>
    </div>
  </section>`;
}

export function renderHomepageJoinBand() {
  return renderJoinBand();
}

export function renderLetterPageJoinBand() {
  return renderJoinBand({
    eyebrow: "The Letters",
    sub: "Read my best letters on writing, audience growth, and building a one-person business online.",
  });
}

export const ARCHIVE_HEADER_HTML = `        <div class="koe-archive-header">
            <p class="koe-join-eyebrow">The Letters</p>
            <h2 class="koe-join-title">Join The 1,100+</h2>
            <p class="koe-archive-sub">
                Read my best letters on writing, audience growth, and building a one-person business online.
            </p>
        </div>`;

export const RESOURCES_HEADER_HTML = `            <div class="koe-archive-header koe-resources-header">
                <p class="koe-join-eyebrow">Resources</p>
                <h2 class="koe-join-title">Join The 1,100+</h2>
                <p class="koe-archive-sub">
                    Build your personal brand and create income streams through strategic content and proven systems.
                </p>
            </div>`;
