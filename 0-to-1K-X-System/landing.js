(function () {
  var LAUNCH_KEY = "x1k_launch_end";
  var LAUNCH_HOURS = 48;

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
    if (!els.days) return;

    function tick() {
      var diff = end - Date.now();
      if (diff <= 0) {
        els.days.textContent = "00";
        els.hours.textContent = "00";
        els.mins.textContent = "00";
        els.secs.textContent = "00";
        if (els.label) els.label.textContent = "Launch price has ended";
        return;
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

    var ids = {
      heroWas: "lp-price-was",
      heroNow: "lp-price-now",
      tierWas: "lp-tier-was",
      tierNow: "lp-tier-now",
      heroCta: "lp-hero-cta-price",
      stackTotal: "lp-stack-total",
      stackNow: "lp-stack-now",
      stickyWas: "lp-sticky-was",
      stickyNow: "lp-sticky-now",
    };

    var heroWas = document.getElementById(ids.heroWas);
    var heroNow = document.getElementById(ids.heroNow);
    var tierWas = document.getElementById(ids.tierWas);
    var tierNow = document.getElementById(ids.tierNow);
    var heroCta = document.getElementById(ids.heroCta);
    var stackTotal = document.getElementById(ids.stackTotal);
    var stackNow = document.getElementById(ids.stackNow);
    var stickyWas = document.getElementById(ids.stickyWas);
    var stickyNow = document.getElementById(ids.stickyNow);

    if (heroWas) heroWas.textContent = "$" + was;
    if (heroNow) heroNow.textContent = priceLabel;
    if (tierWas) tierWas.textContent = "$" + was + " value";
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

  function initStripeCheckout() {
    var cfg = window.X1K_CHECKOUT || {};
    var ready = window.X1K_isCheckoutReady && window.X1K_isCheckoutReady();
    if (!ready || cfg.directStripe === false) return;

    var stripeUrl = window.X1K_getCheckoutUrl({});
    if (!stripeUrl) return;

    document.querySelectorAll('a[href="CHECKOUT.html"]').forEach(function (a) {
      a.href = stripeUrl;
      a.setAttribute("rel", "noopener");
    });
  }

  function initStickyCta() {
    var bar = document.getElementById("lp-sticky-cta");
    if (!bar) return;

    bar.hidden = false;
    document.body.classList.add("has-sticky-cta");

    function onScroll() {
      if (window.innerWidth >= 768) {
        bar.classList.remove("is-visible");
        return;
      }
      if (window.scrollY > 480) {
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
    initStripeCheckout();
    initStickyCta();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
