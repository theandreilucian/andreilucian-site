(function () {
  var cfg = window.X1K_CHECKOUT || {};
  var bumpSelected = false;
  var COVER =
    "../assets/images/x-growth-system-playbook-cover.png?v=20260629900000";
  var BUMP_COVER = "07-Bonuses/covers/x-writing-playbook.png";

  function $(sel, root) {
    return (root || document).querySelector(sel);
  }

  function money(amount) {
    var sym = cfg.currencySymbol || "€";
    return sym + amount.toFixed(2);
  }

  function priceShort(amount) {
    if (window.X1K_formatPrice) return window.X1K_formatPrice(amount);
    return (cfg.currencySymbol || "€") + amount;
  }

  function checkoutBodyMarkup() {
    var bumpBlock = cfg.orderBump
      ? (
          '<p class="co-bump-label">Add to your purchase</p>' +
          '<div class="co-bump" id="co-bump" role="button" tabindex="0">' +
          '<div class="co-bump-check" aria-hidden="true"></div>' +
          '<img class="co-product-thumb" src="' +
          BUMP_COVER +
          '" alt="" width="40" height="52" />' +
          '<div class="co-bump-text">' +
          '<h3 id="co-bump-title">The X Writing Playbook</h3>' +
          '<div class="co-bump-prices"><s id="co-bump-was">€19</s> <span class="sale" id="co-bump-now">+€10</span></div>' +
          '<p class="co-bump-desc" id="co-bump-desc"></p>' +
          "</div></div>"
        )
      : "";

    return (
      '<div class="co-modal-body">' +
      '<aside class="co-summary">' +
      '<div class="co-product-row">' +
      '<img class="co-product-thumb" src="' +
      COVER +
      '" alt="The X System" width="56" height="72" />' +
      '<div class="co-product-info">' +
      '<h2 id="co-product-title">The X System</h2>' +
      '<p class="co-product-price" id="co-product-price">€47.00</p>' +
      "</div></div>" +
      bumpBlock +
      '<div class="co-totals">' +
      '<div class="co-total-line"><span id="co-product-title-line">The X System</span><span id="co-subtotal-val">€47.00</span></div>' +
      '<div class="co-total-line" id="co-bump-line" hidden><span id="co-bump-line-label">Order bump</span><span id="co-bump-val"></span></div>' +
      '<div class="co-total-line"><span>Taxes</span><span>Calculated at payment</span></div>' +
      '<div class="co-total-line grand"><span>Total</span><span id="co-grand-total">€47.00</span></div>' +
      "</div></aside>" +
      '<div class="co-form-wrap">' +
      '<form id="co-form" novalidate>' +
      '<p class="co-section-title">Contact</p>' +
      '<label class="co-field"><span>Email</span><input type="email" id="co-email" name="email" autocomplete="email" required /></label>' +
      '<label class="co-field"><span>Full name</span><input type="text" id="co-name" name="name" placeholder="First and last name" autocomplete="name" required /></label>' +
      '<p class="co-section-title">Address</p>' +
      '<label class="co-field"><span>Country</span><select id="co-country" name="country" autocomplete="country-name">' +
      '<option value="US" selected>United States</option><option value="RO">Romania</option><option value="GB">United Kingdom</option>' +
      '<option value="DE">Germany</option><option value="FR">France</option><option value="CA">Canada</option><option value="AU">Australia</option>' +
      "</select></label>" +
      '<label class="co-field"><span>Address</span><input type="text" id="co-street" name="street" autocomplete="street-address" /></label>' +
      '<label class="co-field"><span>Apt, Suite</span><input type="text" id="co-apt" name="apt" autocomplete="address-line2" /></label>' +
      '<div class="co-row-2">' +
      '<label class="co-field"><span>City</span><input type="text" id="co-city" name="city" autocomplete="address-level2" /></label>' +
      '<label class="co-field"><span>Zip</span><input type="text" id="co-zip" name="zip" autocomplete="postal-code" /></label>' +
      "</div>" +
      '<label class="co-field"><span>State / Province / Region</span><select id="co-state" name="state"><option value="">Select state</option></select></label>' +
      '<p class="co-section-title">Payment</p>' +
      '<div class="co-pay-tabs">' +
      '<button type="button" class="co-pay-tab active" data-method="card">Card</button>' +
      '<button type="button" class="co-pay-tab" data-method="paypal">PayPal</button>' +
      "</div>" +
      '<div class="co-pay-panel" id="co-pay-panel">You\'ll enter your card details on the secure Stripe checkout page — encrypted and PCI compliant.</div>' +
      '<div class="co-pay-icons" aria-hidden="true"><span>VISA</span><span>MC</span><span>AMEX</span><span>Apple Pay</span></div>' +
      '<div class="co-error" id="co-error" role="alert" hidden></div>' +
      '<button type="submit" class="co-btn-pay" id="co-submit">Pay with Stripe — <span id="co-btn-price">€47</span></button>' +
      '<p class="co-foot-note">Secure payment on Stripe · instant course access after purchase</p>' +
      "</form></div></div>"
    );
  }

  function checkoutModalMarkup() {
    return (
      '<header class="co-modal-head">' +
      '<span class="co-modal-brand">Andrei Lucian</span>' +
      '<button type="button" id="checkout-close" class="co-close" aria-label="Close checkout">&times;</button>' +
      "</header>" +
      checkoutBodyMarkup()
    );
  }

  function checkoutPageMarkup() {
    return (
      '<header class="co-modal-head">' +
      '<span class="co-modal-brand">Andrei Lucian</span>' +
      "</header>" +
      checkoutBodyMarkup()
    );
  }

  function ensureModal() {
    if ($("#checkout-overlay")) return;
    var wrap = document.createElement("div");
    wrap.id = "checkout-overlay";
    wrap.className = "co-overlay";
    wrap.hidden = true;
    wrap.setAttribute("aria-hidden", "true");
    wrap.innerHTML = '<div class="co-modal" role="dialog" aria-modal="true">' + checkoutModalMarkup() + "</div>";
    document.body.appendChild(wrap);
  }

  function ensurePage() {
    var page = $("#checkout-page-root");
    if (!page || page.querySelector("#co-form")) return;
    page.innerHTML = checkoutPageMarkup();
  }

  function showError(root, msg) {
    var err = $("#co-error", root);
    if (!err) return;
    err.textContent = msg;
    err.hidden = false;
  }

  function hideError(root) {
    var err = $("#co-error", root);
    if (err) err.hidden = true;
  }

  function buildPaymentUrl(email) {
    if (!window.X1K_getCheckoutUrl) return "";
    return window.X1K_getCheckoutUrl({
      email: email || "",
      withBump: bumpSelected,
    });
  }

  function getTotal() {
    var price = cfg.price || 47;
    var bump = cfg.orderBump && bumpSelected ? cfg.orderBump.price || 10 : 0;
    return price + bump;
  }

  function updateTotals(root) {
    var price = cfg.price || 47;
    var bumpPrice = cfg.orderBump ? cfg.orderBump.price || 10 : 0;
    var total = getTotal();
    var name = cfg.productName || "The X System";

    var sub = $("#co-subtotal-val", root);
    var bumpLine = $("#co-bump-line", root);
    var bumpVal = $("#co-bump-val", root);
    var bumpLabel = $("#co-bump-line-label", root);
    var grand = $("#co-grand-total", root);
    var btnPrice = $("#co-btn-price", root);
    var titleLine = $("#co-product-title-line", root);

    if (titleLine) titleLine.textContent = name;
    if (sub) sub.textContent = money(price);
    if (bumpLine) bumpLine.hidden = !bumpSelected;
    if (bumpLabel && cfg.orderBump) bumpLabel.textContent = cfg.orderBump.title || "Order bump";
    if (bumpVal && bumpSelected) bumpVal.textContent = money(bumpPrice);
    if (grand) grand.textContent = money(total);
    if (btnPrice) btnPrice.textContent = priceShort(total);
  }

  function initCheckoutRoot(root) {
    if (!root) return;

    var name = cfg.productName || "The X System";
    var el;

    el = $("#co-product-title", root);
    if (el) el.textContent = name;
    el = $("#co-product-price", root);
    if (el) el.textContent = money(cfg.price || 47);

    if (cfg.orderBump) {
      el = $("#co-bump-title", root);
      if (el) el.textContent = cfg.orderBump.title || "Order bump";
      el = $("#co-bump-was", root);
      if (el) el.textContent = priceShort(cfg.orderBump.was || 19);
      el = $("#co-bump-now", root);
      if (el) el.textContent = "+" + priceShort(cfg.orderBump.price || 10);
      el = $("#co-bump-desc", root);
      if (el) el.textContent = cfg.orderBump.description || "";
    }

    var saved = localStorage.getItem("x1k_checkout_email");
    el = $("#co-email", root);
    if (saved && el) el.value = saved;
    var savedName = localStorage.getItem("x1k_checkout_name");
    el = $("#co-name", root);
    if (savedName && el) el.value = savedName;

    updateTotals(root);

    var bump = $("#co-bump", root);
    if (bump) {
      function toggleBump() {
        bumpSelected = !bumpSelected;
        bump.classList.toggle("selected", bumpSelected);
        var check = $(".co-bump-check", bump);
        if (check) check.textContent = bumpSelected ? "\u2713" : "";
        updateTotals(root);
      }
      bump.addEventListener("click", toggleBump);
      bump.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleBump();
        }
      });
    }

    var tabs = root.querySelectorAll(".co-pay-tab");
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (t) {
          t.classList.remove("active");
        });
        tab.classList.add("active");
        var panel = $("#co-pay-panel", root);
        if (panel) {
          panel.textContent =
            tab.dataset.method === "paypal"
              ? "You'll complete payment with PayPal on the secure checkout page."
              : "You'll complete payment on Gumroad — secure checkout with card or PayPal.";
        }
      });
    });

    var form = $("#co-form", root);
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      hideError(root);

      var nameVal = ($("#co-name", root) && $("#co-name", root).value.trim()) || "";
      var email = ($("#co-email", root) && $("#co-email", root).value.trim()) || "";

      if (!nameVal) {
        showError(root, "Please enter your full name.");
        return;
      }
      if (!email || email.indexOf("@") === -1) {
        showError(root, "Please enter a valid email.");
        return;
      }

      var payUrl = buildPaymentUrl(email);
      if (!payUrl) {
        showError(
          root,
          "Gumroad is not connected yet. Create the product on Gumroad and paste the URL into product-checkout.js (gumroadProductUrl)."
        );
        return;
      }

      try {
        localStorage.setItem("x1k_checkout_email", email);
        localStorage.setItem("x1k_checkout_name", nameVal);
      } catch (ex) {}

      var btn = $("#co-submit", root);
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Redirecting to Gumroad\u2026";
      }

      window.location.href = payUrl;
    });

    if (!window.X1K_isCheckoutReady || !window.X1K_isCheckoutReady()) {
      showError(
        root,
        "Gumroad checkout coming soon — add your product link in product-checkout.js to enable payments."
      );
      var submitBtn = $("#co-submit", root);
      if (submitBtn) submitBtn.disabled = true;
    }
  }

  function openModal() {
    var overlay = $("#checkout-overlay");
    if (!overlay) {
      window.location.href = "CHECKOUT.html";
      return;
    }
    overlay.hidden = false;
    overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var email = $("#co-email", overlay);
    if (email) setTimeout(function () { email.focus(); }, 100);
  }

  function closeModal() {
    var overlay = $("#checkout-overlay");
    if (!overlay) return;
    overlay.hidden = true;
    overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (window.location.hash === "#checkout") {
      history.replaceState(null, "", window.location.pathname + window.location.search);
    }
  }

  function bindTriggers() {
    document.querySelectorAll("[data-open-checkout]").forEach(function (el) {
      el.addEventListener("click", function (e) {
        e.preventDefault();
        openModal();
      });
    });

    var closeBtn = $("#checkout-close");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);

    var overlay = $("#checkout-overlay");
    if (overlay) {
      overlay.addEventListener("click", function (e) {
        if (e.target === overlay) closeModal();
      });
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeModal();
    });
  }

  function init() {
    ensureModal();
    ensurePage();
    var overlay = $("#checkout-overlay");
    if (overlay) initCheckoutRoot(overlay);
    var page = $("#checkout-page-root");
    if (page) initCheckoutRoot(page);
    bindTriggers();

    if (window.location.hash === "#checkout") openModal();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
