/** Dan Koe–style site nav: AL monogram · centered name · ghostwriter link */
export function renderSiteNav(assetPrefix = "") {
  const p = assetPrefix;
  return `<nav class="navbar koe-nav">
    <div class="nav-container koe-nav-container">
      <a href="${p}index.html" class="nav-monogram" aria-label="Andrei Lucian home">AL</a>
      <a href="${p}index.html" class="nav-center-name">A N D R E I&nbsp;&nbsp;L U C I A N</a>
      <a href="${p}ghostwriting.html" class="nav-link nav-link-right">Need a Ghostwriter?</a>
    </div>
  </nav>`;
}
