(function () {
  var cfg = window.X1K_CHECKOUT || {};
  var url = window.X1K_getCheckoutUrl ? window.X1K_getCheckoutUrl() : "";

  var nameEl = document.getElementById("ck-product-name");
  var tagEl = document.getElementById("ck-tagline");
  var wasEl = document.getElementById("ck-price-was");
  var nowEl = document.getElementById("ck-price-now");
  var btn = document.getElementById("checkout-go");
  var err = document.getElementById("ck-error");
  var status = document.getElementById("ck-status");

  if (nameEl && cfg.productName) nameEl.textContent = cfg.productName;
  if (tagEl && cfg.tagline) tagEl.textContent = cfg.tagline;
  if (wasEl && cfg.priceWas) wasEl.textContent = "$" + cfg.priceWas + "+";
  if (nowEl && cfg.price) nowEl.textContent = "$" + cfg.price;

  if (!url) {
    if (status) status.textContent = "Checkout link not configured yet.";
    if (err) {
      err.textContent =
        "Add your Gumroad product URL in product-checkout.js (url field), then reload this page.";
      err.classList.add("visible");
    }
    if (btn) {
      btn.textContent = "← Back to sales page";
      btn.href = "LANDING.html";
    }
    return;
  }

  if (btn) btn.href = url;

  if (status) {
    status.textContent = "Redirecting to secure card checkout…";
  }

  setTimeout(function () {
    window.location.replace(url);
  }, 700);
})();
