(function () {
  var cfg = window.X1K_CHECKOUT || {};
  var processor = window.X1K_getProcessorLabel ? window.X1K_getProcessorLabel() : "Stripe";

  var form = document.getElementById("checkout-form");
  var err = document.getElementById("ck-error");
  var submitBtn = document.getElementById("checkout-submit");

  function $(id) { return document.getElementById(id); }

  function showError(msg) {
    if (!err) return;
    err.textContent = msg;
    err.hidden = false;
  }

  function hideError() {
    if (err) err.hidden = true;
  }

  function fmt(amount) {
    return window.X1K_formatPrice ? window.X1K_formatPrice(amount) : "€" + amount;
  }

  function initSummary() {
    var price = cfg.price || 47;
    var was = cfg.priceWas || 147;
    var discount = was - price;

    if ($("ck-product-name") && cfg.productName) $("ck-product-name").textContent = cfg.productName;
    if ($("ck-tagline") && cfg.tagline) $("ck-tagline").textContent = cfg.tagline;
    if ($("ck-subtotal")) $("ck-subtotal").textContent = fmt(was);
    if ($("ck-discount")) $("ck-discount").textContent = "−" + fmt(discount);
    if ($("ck-price-was")) $("ck-price-was").textContent = fmt(was);
    if ($("ck-price-now")) $("ck-price-now").textContent = fmt(price);
    if ($("ck-btn-price")) $("ck-btn-price").textContent = fmt(price);
    if ($("ck-processor")) $("ck-processor").textContent = processor;

    var savedEmail = localStorage.getItem("x1k_checkout_email");
    if (savedEmail && $("ck-email")) $("ck-email").value = savedEmail;
  }

  function buildPaymentUrl(base, email) {
    if (!base) return "";
    var sep = base.indexOf("?") === -1 ? "?" : "&";
    if (email) {
      return base + sep + "prefilled_email=" + encodeURIComponent(email);
    }
    return base;
  }

  function getPaymentUrl(email) {
    return buildPaymentUrl(window.X1K_getCheckoutUrl ? window.X1K_getCheckoutUrl() : "", email);
  }

  initSummary();

  if (!getPaymentUrl("")) {
    showError(
      "Payment link not set up yet. Add your Stripe Payment Link in product-checkout.js → stripePaymentLink, then try again."
    );
    if (submitBtn) submitBtn.disabled = true;
  }

  if (!form) return;

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    hideError();

    var name = ($("ck-name") && $("ck-name").value.trim()) || "";
    var email = ($("ck-email") && $("ck-email").value.trim()) || "";

    if (!name) {
      showError("Please enter your name.");
      $("ck-name") && $("ck-name").focus();
      return;
    }
    if (!email || email.indexOf("@") === -1) {
      showError("Please enter a valid email address.");
      $("ck-email") && $("ck-email").focus();
      return;
    }

    var payUrl = getPaymentUrl(email);
    if (!payUrl) {
      showError("Payment is not configured. Contact support or try again later.");
      return;
    }

    try {
      localStorage.setItem("x1k_checkout_email", email);
      localStorage.setItem("x1k_checkout_name", name);
    } catch (ex) {}

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Redirecting to secure payment…";
    }

    window.location.href = payUrl;
  });
})();
