/** Checkout config — paste your Gumroad product URL after you create the listing */
window.X1K_CHECKOUT = {
  /** Gumroad product link — e.g. https://andreilucian.gumroad.com/l/abc123 */
  url: "https://andreilucian.gumroad.com/l/0to1kx",
  /** true = skip product page, open Gumroad card checkout directly */
  directCheckout: true,
  productName: "The 0 to 1K X System",
  tagline: "0 → 1,000 followers on X in 90 days",
  price: 97,
  priceWas: 367,
};

window.X1K_getCheckoutUrl = function () {
  var cfg = window.X1K_CHECKOUT || {};
  var url = (cfg.url || "").trim();
  if (!url || url.indexOf("YOUR_GUMROAD") !== -1) return "";
  if (cfg.directCheckout !== false && url.indexOf("wanted=") === -1) {
    url += (url.indexOf("?") === -1 ? "?" : "&") + "wanted=true";
  }
  return url;
};
