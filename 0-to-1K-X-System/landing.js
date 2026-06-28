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
        if (els.label) els.label.textContent = "Launch price has ended — full price applies";
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

  function initFaq() {
    document.querySelectorAll(".lp-faq-q").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var item = btn.closest(".lp-faq-item");
        var wasOpen = item.classList.contains("open");
        document.querySelectorAll(".lp-faq-item.open").forEach(function (el) {
          el.classList.remove("open");
          el.querySelector(".lp-faq-q").setAttribute("aria-expanded", "false");
        });
        if (!wasOpen) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      });
    });
  }

  function initStickyCta() {
    var sticky = document.getElementById("sticky-cta");
    var hero = document.querySelector(".lp-hero");
    if (!sticky || !hero) return;

    document.body.classList.add("has-sticky-cta");

    function onScroll() {
      var past = hero.getBoundingClientRect().bottom < 0;
      sticky.classList.toggle("visible", past);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      initCountdown();
      initFaq();
      initStickyCta();
    });
  } else {
    initCountdown();
    initFaq();
    initStickyCta();
  }
})();
