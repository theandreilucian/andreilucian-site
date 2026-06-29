/** Checkout — Gumroad only (landing → Gumroad → email ZIP)
 *
 * AUTOMATION FLOW:
 *   LANDING.html (andreilucian.com) → Gumroad checkout → buyer email with ZIP
 *
 * Setup: paste your Gumroad product link below. All "Get Instant Access"
 * buttons on the landing page auto-redirect to this URL.
 */
window.X1K_CHECKOUT = {
  checkoutProvider: "gumroad",

  /** Gumroad → Products → The X System → Share → copy link */
  gumroadProductUrl: "https://andreilucian.gumroad.com/l/glctvz",

  /** true = all buy buttons open Gumroad directly (recommended) */
  directCheckout: true,

  productName: "The X System",
  tagline: "0 → 1K Followers in 90 Days",
  price: 47,
  priceStandard: 147,
  priceWas: 147,
  currency: "EUR",
  currencySymbol: "€",

  /** Optional hub link to paste in Gumroad confirmation email */
  hubUrl: "https://andreilucian.com/0-to-1K-X-System/INDEX.html",
  zipUrl:
    "https://andreilucian.com/0-to-1K-X-System/downloads/Andrei%20Lucian%20-%20The%20X%20System.zip",
};

/** @param {number} amount */
window.X1K_formatPrice = function (amount) {
  var cfg = window.X1K_CHECKOUT || {};
  return (cfg.currencySymbol || "€") + amount;
};

function X1K_gumroadLinkReady(link) {
  link = (link || "").trim();
  return (
    link.indexOf("gumroad.com/l/") !== -1 &&
    link.indexOf("YOUR_") === -1
  );
}

/**
 * @param {{ email?: string }} [options]
 */
window.X1K_getCheckoutUrl = function (options) {
  options = options || {};
  var cfg = window.X1K_CHECKOUT || {};
  var link = (cfg.gumroadProductUrl || "").trim();
  if (!X1K_gumroadLinkReady(link)) return "";

  try {
    var url = new URL(link);
    if (options.email) url.searchParams.set("email", options.email);
    return url.toString();
  } catch (e) {
    return link;
  }
};

window.X1K_getProcessorLabel = function () {
  return "Gumroad";
};

window.X1K_isCheckoutReady = function () {
  return !!window.X1K_getCheckoutUrl({});
};

window.X1K_goToCheckout = function (options) {
  var url = window.X1K_getCheckoutUrl(options || {});
  if (!url) {
    window.location.href = "CHECKOUT.html";
    return;
  }
  window.location.href = url;
};

/** @deprecated use X1K_goToCheckout */
window.X1K_goToStripe = window.X1K_goToCheckout;
