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

  function init() {
    initCountdown();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
