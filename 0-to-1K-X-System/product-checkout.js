/** Checkout — Gumroad (ZIP delivery + buyer email handled by Gumroad) */
window.X1K_CHECKOUT = {
  checkoutProvider: "gumroad",

  /**
   * Paste your Gumroad product link after you create the product.
   * Gumroad → Products → The X System → Share → copy link
   */
  gumroadProductUrl: "https://andreilucian.gumroad.com/l/YOUR_X_SYSTEM_LINK",

  /** true = buy buttons go straight to Gumroad (skip CHECKOUT.html) */
  directCheckout: true,

  productName: "The X System",
  tagline: "0 → 1K Followers in 90 Days",
  price: 47,
  priceStandard: 79,
  priceWas: 197,

  /** Optional hub link to paste in Gumroad confirmation email */
  hubUrl: "https://andreilucian.com/0-to-1K-X-System/INDEX.html",
  zipUrl:
    "https://andreilucian.com/0-to-1K-X-System/downloads/The-X-System.zip",
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
