/** Dan Koe–style site footer: AL · copyright · ghostwriter link */
export function renderSiteFooter(assetPrefix = "") {
  const p = assetPrefix;
  const year = new Date().getFullYear();
  return `<footer class="koe-footer">
    <div class="koe-footer-container">
      <a href="${p}index.html" class="nav-monogram koe-footer-monogram" aria-label="Andrei Lucian home">AL</a>
      <p class="koe-footer-center">ALL RIGHTS RESERVED ${year} ANDREI LUCIAN</p>
      <a href="${p}ghostwriting.html" class="nav-link nav-link-right koe-footer-link">Need a Ghostwriter?</a>
    </div>
  </footer>`;
}
