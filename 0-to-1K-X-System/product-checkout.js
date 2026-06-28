/** Checkout — Stripe Payment Link (primary) or Gumroad (fallback) */
window.X1K_CHECKOUT = {
  /** "stripe" = direct to your Stripe account (~2.9% + 30¢). "gumroad" = ~10% + 50¢ */
  provider: "stripe",

  /** Create at: Stripe Dashboard → Payment Links → paste URL here */
  stripePaymentLink: "https://buy.stripe.com/YOUR_LINK_HERE",

  /** Fallback / legacy — playbooks stay on Gumroad */
  gumroadUrl: "https://andreilucian.gumroad.com/l/0to1kx",
  directCheckout: true,

  productName: "The 0 to 1K X System",
  tagline: "0 → 1,000 followers on X in 90 days",
  price: 47,
  priceStandard: 79,
  priceWas: 197,
};

window.X1K_getCheckoutUrl = function () {
  var cfg = window.X1K_CHECKOUT || {};
  var provider = (cfg.provider || "stripe").toLowerCase();

  if (provider === "stripe") {
    var stripe = (cfg.stripePaymentLink || "").trim();
    if (!stripe || stripe.indexOf("YOUR_LINK") !== -1) return "";
    return stripe;
  }

  var url = (cfg.gumroadUrl || cfg.url || "").trim();
  if (!url || url.indexOf("YOUR_") !== -1) return "";
  if (cfg.directCheckout !== false && url.indexOf("wanted=") === -1) {
    url += (url.indexOf("?") === -1 ? "?" : "&") + "wanted=true";
  }
  return url;
};

window.X1K_getProcessorLabel = function () {
  var cfg = window.X1K_CHECKOUT || {};
  return (cfg.provider || "stripe").toLowerCase() === "stripe" ? "Stripe" : "Gumroad";
};
