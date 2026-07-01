/** Black bar with letters + ghostwriter links (above footer) */
export function renderArticleNav(assetPrefix = "") {
  const p = assetPrefix;
  return `<nav class="article-nav koe-article-nav-bar" aria-label="Site links">
    <div class="article-nav-container">
      <a href="${p}index.html#newsletters" class="article-nav-link">Read The Letters</a>
      <a href="${p}ghostwriting.html" class="article-nav-link">Need a Ghostwriter?</a>
    </div>
  </nav>`;
}
