(function () {
  var LAUNCH_KEY = "x1k_launch_end";
  var LAUNCH_HOURS = 72;

  function initCountdown() {
    var end = localStorage.getItem(LAUNCH_KEY);
    if (!end) {
      end = String(Date.now() + LAUNCH_HOURS * 60 * 60 * 1000);
      localStorage.setItem(LAUNCH_KEY, end);
    }
    end = parseInt(end, 10);

    var els = {
      days: document.getElementById("cd-days"),
      hours: document.getElementById("cd-hours"),
      mins: document.getElementById("cd-mins"),
      secs: document.getElementById("cd-secs"),
      label: document.getElementById("countdown-label"),
    };
    var bar = document.getElementById("launch-countdown");
    if (!els.days) return;

    function tick() {
      var diff = end - Date.now();
      if (diff <= 0) {
        end = Date.now() + LAUNCH_HOURS * 60 * 60 * 1000;
        localStorage.setItem(LAUNCH_KEY, String(end));
        diff = end - Date.now();
        if (bar) bar.classList.add("is-ended");
      }
      var d = Math.floor(diff / 86400000);
      var h = Math.floor((diff % 86400000) / 3600000);
      var m = Math.floor((diff % 3600000) / 60000);
      var s = Math.floor((diff % 60000) / 1000);
      els.days.textContent = String(d).padStart(2, "0");
      els.hours.textContent = String(h).padStart(2, "0");
      els.mins.textContent = String(m).padStart(2, "0");
      els.secs.textContent = String(s).padStart(2, "0");
    }
    tick();
    setInterval(tick, 1000);
  }

  function initPricing() {
    var cfg = window.X1K_CHECKOUT || {};
    if (!cfg.price) return;
    var was = cfg.priceWas || 197;
    var price = cfg.price;
    var priceLabel = "$" + price;

    var heroWas = document.getElementById("lp-price-was");
    var heroNow = document.getElementById("lp-price-now");
    var tierWas = document.getElementById("lp-tier-was");
    var tierNow = document.getElementById("lp-tier-now");
    var heroCta = document.getElementById("lp-hero-cta-price");
    var stackTotal = document.getElementById("lp-stack-total");
    var stackNow = document.getElementById("lp-stack-now");
    var stickyWas = document.getElementById("lp-sticky-was");
    var stickyNow = document.getElementById("lp-sticky-now");

    if (heroWas) heroWas.textContent = "$" + was;
    if (heroNow) heroNow.textContent = priceLabel;
    if (tierWas) tierWas.textContent = "$" + was;
    if (tierNow) tierNow.textContent = priceLabel;
    if (heroCta) heroCta.textContent = priceLabel;
    if (stackTotal) stackTotal.textContent = "$" + was;
    if (stackNow) stackNow.textContent = priceLabel;
    if (stickyWas) stickyWas.textContent = "$" + was;
    if (stickyNow) stickyNow.textContent = priceLabel;

    document.querySelectorAll(".lp-tier-cta-price").forEach(function (el) {
      el.textContent = priceLabel;
    });
  }

  function initCheckoutLinks() {
    var cfg = window.X1K_CHECKOUT || {};
    var ready = window.X1K_isCheckoutReady && window.X1K_isCheckoutReady();
    if (!ready || cfg.directCheckout === false) return;

    var checkoutUrl = window.X1K_getCheckoutUrl({});
    if (!checkoutUrl) return;

    document.querySelectorAll('a[href="CHECKOUT.html"]').forEach(function (a) {
      a.href = checkoutUrl;
      a.setAttribute("rel", "noopener sponsored");
      a.setAttribute("target", "_self");
    });
  }

  function initStickyCta() {
    var bar = document.getElementById("lp-sticky-cta");
    if (!bar) return;

    bar.hidden = false;
    document.body.classList.add("has-sticky-cta");

    function onScroll() {
      var checkout = document.getElementById("checkout");
      var checkoutTop = checkout ? checkout.offsetTop : 99999;
      if (window.scrollY > 520 && window.scrollY < checkoutTop - 80) {
        bar.classList.add("is-visible");
      } else {
        bar.classList.remove("is-visible");
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();
  }

  function init() {
    initCountdown();
    initPricing();
    initCheckoutLinks();
    initStickyCta();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
