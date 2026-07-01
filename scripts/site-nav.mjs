/** Dan Koe–style site nav: AL monogram · centered name · letters + ghostwriter */
export function renderSiteNav(assetPrefix = "") {
  const p = assetPrefix;
  return `<nav class="navbar koe-nav">
    <div class="nav-container koe-nav-container">
      <a href="${p}index.html" class="nav-monogram" aria-label="Andrei Lucian home">AL</a>
      <a href="${p}index.html" class="nav-center-name">A N D R E I&nbsp;&nbsp;L U C I A N</a>
      <div class="nav-links nav-links-right koe-nav-actions">
        <a href="${p}index.html#newsletters" class="nav-link">Read The Letters</a>
        <span class="koe-nav-sep" aria-hidden="true">·</span>
        <a href="${p}ghostwriting.html" class="nav-link">Need a Ghostwriter?</a>
      </div>
    </div>
  </nav>`;
}
