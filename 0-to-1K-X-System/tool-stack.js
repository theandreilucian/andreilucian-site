(function () {
  var cfg = window.X1K_TOOLS;
  if (!cfg) return;

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/"/g, "&quot;");
  }

  function renderFree() {
    var el = document.getElementById("tool-free-list");
    if (!el || !cfg.free) return;
    el.innerHTML = cfg.free
      .map(function (t) {
        return (
          "<div class=\"tool-free-card\">" +
          "<h3>" + esc(t.name) + "</h3>" +
          "<p class=\"tool-free-role\">" + esc(t.role) + "</p>" +
          "<p class=\"tool-free-note\">" + esc(t.note) + "</p>" +
          "</div>"
        );
      })
      .join("");
  }

  function renderPaid(list, containerId) {
    var el = document.getElementById(containerId);
    if (!el || !list) return;
    el.innerHTML = list
      .map(function (t) {
        var bullets = (t.bullets || [])
          .map(function (b) {
            return "<li>" + esc(b) + "</li>";
          })
          .join("");
        var linkClass = t.affiliate === false ? "stack-site" : "stack-affiliate";
        return (
          "<article class=\"paid-tool-card\">" +
          "<div class=\"paid-tool-head\">" +
          "<h3>" + esc(t.name) + "</h3>" +
          "<span class=\"cost-tag paid\">Paid</span>" +
          "</div>" +
          "<p class=\"paid-tool-when\"><strong>When:</strong> " + esc(t.when) + "</p>" +
          "<p class=\"paid-tool-for\">" + esc(t.forWhat) + "</p>" +
          "<ul class=\"paid-tool-bullets\">" + bullets + "</ul>" +
          "<a class=\"" + linkClass + "\" href=\"" + esc(t.url) + "\" target=\"_blank\" rel=\"noopener sponsored\">" +
          esc(t.cta) +
          "</a>" +
          "</article>"
        );
      })
      .join("");
  }

  function renderNote() {
    var el = document.getElementById("tool-affiliate-note");
    if (el && cfg.affiliateNote) el.textContent = cfg.affiliateNote;
  }

  function renderNewsletter() {
    var intro = document.getElementById("tool-newsletter-intro");
    if (intro && cfg.newsletterIntro) intro.textContent = cfg.newsletterIntro;

    var el = document.getElementById("tool-newsletter-list");
    if (!el || !cfg.newsletter) return;
    el.innerHTML = cfg.newsletter
      .map(function (t) {
        return (
          "<article class=\"paid-tool-card\">" +
          "<div class=\"paid-tool-head\">" +
          "<h3>" + esc(t.name) + "</h3>" +
          "<span class=\"cost-tag free\">Free</span>" +
          "</div>" +
          "<p class=\"tool-free-role\">" + esc(t.role) + "</p>" +
          "<p class=\"tool-free-note\">" + esc(t.note) + "</p>" +
          "<a class=\"stack-site\" href=\"" + esc(t.url) + "\" target=\"_blank\" rel=\"noopener\">" +
          esc(t.cta) +
          "</a>" +
          "</article>"
        );
      })
      .join("");
  }

  function init() {
    renderNote();
    renderFree();
    renderPaid(cfg.paid, "tool-paid-list");
    renderNewsletter();
    if (cfg.scale && cfg.scale.length) {
      renderPaid(cfg.scale, "tool-scale-list");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
