/* Shared unlock state — runs in <head> before product-gate */
(function () {
  var KEY = "x1k_product_unlock";
  var PASS = "160299";

  function persistUnlock() {
    window.__X1K_UNLOCKED__ = true;
    try {
      localStorage.setItem(KEY, "1");
    } catch (e) {}
    try {
      sessionStorage.setItem(KEY, "1");
    } catch (e) {}
  }

  function cleanUnlockUrl() {
    try {
      var url = new URL(location.href);
      if (url.searchParams.get("unlocked") === "1") {
        url.searchParams.delete("unlocked");
      }
      var hash = url.hash.replace(/^#/, "").toLowerCase();
      if (
        hash === "unlocked" ||
        hash.indexOf("unlocked=") === 0 ||
        hash === "access=" + PASS
      ) {
        url.hash = "";
      }
      var next = url.pathname.split("/").pop() + url.search + url.hash;
      history.replaceState({}, "", next);
    } catch (e) {
      try {
        history.replaceState({}, "", location.pathname.split("/").pop());
      } catch (e2) {}
    }
  }

  function isUnlocked() {
    if (window.__X1K_UNLOCKED__) return true;
    try {
      if (localStorage.getItem(KEY) === "1") {
        window.__X1K_UNLOCKED__ = true;
        return true;
      }
    } catch (e) {}
    try {
      if (sessionStorage.getItem(KEY) === "1") {
        window.__X1K_UNLOCKED__ = true;
        return true;
      }
    } catch (e) {}
    return false;
  }

  function unlockFromUrl() {
    var params = new URLSearchParams(location.search);
    var hash = (location.hash || "").replace(/^#/, "").toLowerCase();
    var fromUrl =
      params.get("unlocked") === "1" ||
      hash === "unlocked" ||
      hash.indexOf("unlocked=") === 0 ||
      hash === "access=" + PASS;
    if (!fromUrl) return false;
    persistUnlock();
    cleanUnlockUrl();
    return true;
  }

  function withUnlockHref(href) {
    if (!href || /^(https?:|mailto:|tel:|#|javascript:)/i.test(href)) return href;
    if (href.indexOf("unlocked=1") !== -1) return href;
    try {
      var url = new URL(href, location.href);
      var file = url.pathname.split("/").pop();
      if (!file || !/\.html$/i.test(file)) return href;
      if (
        file === "LANDING.html" ||
        file === "CHECKOUT.html" ||
        file === "GUMROAD-SALES-PAGE.html"
      ) {
        return href;
      }
      url.searchParams.set("unlocked", "1");
      return file + url.search + url.hash;
    } catch (e) {
      return href;
    }
  }

  function propagateUnlockLinks(root) {
    if (!isUnlocked()) return;
    (root || document).querySelectorAll("a[href]").forEach(function (a) {
      var href = a.getAttribute("href");
      if (!href) return;
      var next = withUnlockHref(href);
      if (next !== href) a.setAttribute("href", next);
    });
  }

  window.X1K_UNLOCK = {
    key: KEY,
    pass: PASS,
    persist: persistUnlock,
    isUnlocked: isUnlocked,
    cleanUrl: cleanUnlockUrl,
    withUnlockHref: withUnlockHref,
    propagateLinks: propagateUnlockLinks,
    hubUrl: function () {
      return withUnlockHref("INDEX.html");
    },
  };

  unlockFromUrl();
  if (document.body) propagateUnlockLinks();
  document.addEventListener("DOMContentLoaded", function () {
    propagateUnlockLinks();
  });
})();
