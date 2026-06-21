/* Password gate — buyers enter code from purchase email */
(function () {
  const UNLOCK_KEY = "x1k_product_unlock";
  const PASS = "160299";
  const page = location.pathname.split("/").pop() || "INDEX.html";
  if (page === "GUMROAD-SALES-PAGE.html") return;
  if (localStorage.getItem(UNLOCK_KEY) === "1") return;

  const style = document.createElement("style");
  style.textContent = `
    #x1k-gate-overlay {
      position: fixed;
      inset: 0;
      z-index: 99999;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      background: rgba(5, 5, 5, 0.92);
      backdrop-filter: blur(8px);
      font-family: Inter, system-ui, sans-serif;
    }
    #x1k-gate-card {
      width: 100%;
      max-width: 400px;
      background: #121212;
      border: 1px solid #262626;
      border-radius: 16px;
      padding: 28px 24px;
      box-shadow: 0 24px 64px rgba(0, 0, 0, 0.5);
    }
    #x1k-gate-card h2 {
      margin: 0 0 8px;
      font-size: 1.25rem;
      font-weight: 800;
      color: #f5f5f5;
      letter-spacing: -0.02em;
    }
    #x1k-gate-card p {
      margin: 0 0 20px;
      font-size: 0.9rem;
      color: #8b8b8b;
      line-height: 1.5;
    }
    #x1k-gate-card input {
      width: 100%;
      box-sizing: border-box;
      padding: 14px 16px;
      border-radius: 10px;
      border: 1px solid #333;
      background: #050505;
      color: #f5f5f5;
      font-size: 1rem;
      font-family: inherit;
      margin-bottom: 12px;
    }
    #x1k-gate-card input:focus {
      outline: none;
      border-color: #1d9bf0;
      box-shadow: 0 0 0 3px #1d9bf022;
    }
    #x1k-gate-card button {
      width: 100%;
      padding: 14px;
      border: none;
      border-radius: 999px;
      background: linear-gradient(135deg, #1d9bf0, #0d7abf);
      color: #fff;
      font-weight: 700;
      font-size: 0.95rem;
      cursor: pointer;
      font-family: inherit;
    }
    #x1k-gate-card button:hover { opacity: 0.95; }
    #x1k-gate-error {
      min-height: 1.2em;
      margin-top: 10px;
      font-size: 0.85rem;
      color: #ff6b6b;
      text-align: center;
    }
    #x1k-gate-back {
      display: block;
      margin-top: 16px;
      text-align: center;
      font-size: 0.82rem;
      color: #8b8b8b;
      text-decoration: none;
    }
    #x1k-gate-back:hover { color: #1d9bf0; }
  `;
  document.head.appendChild(style);

  function unlock() {
    localStorage.setItem(UNLOCK_KEY, "1");
    document.getElementById("x1k-gate-overlay")?.remove();
  }

  function mount() {
    const overlay = document.createElement("div");
    overlay.id = "x1k-gate-overlay";
    overlay.innerHTML =
      '<div id="x1k-gate-card">' +
      "<h2>X Growth Accelerator</h2>" +
      "<p>Enter the password from your purchase email to access the course.</p>" +
      '<form id="x1k-gate-form">' +
      '<input type="password" id="x1k-gate-input" placeholder="Access password" autocomplete="off" required />' +
      "<button type=\"submit\">Unlock →</button>" +
      "</form>" +
      '<div id="x1k-gate-error" role="alert"></div>' +
      '<a href="../index.html" id="x1k-gate-back">← Back to homepage</a>' +
      "</div>";
    document.body.appendChild(overlay);

    const form = document.getElementById("x1k-gate-form");
    const input = document.getElementById("x1k-gate-input");
    const err = document.getElementById("x1k-gate-error");

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value === PASS) {
        unlock();
      } else {
        err.textContent = "Wrong password. Check your purchase email and try again.";
        input.value = "";
        input.focus();
      }
    });

    input.focus();
  }

  if (document.body) mount();
  else document.addEventListener("DOMContentLoaded", mount);
})();
