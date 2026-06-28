/* The 0 to 1K X System — shared interactions */
(function () {
  const PREFIX = "x1k_";
  const LESSON_PREFIX = PREFIX + "lesson_";
  const LESSON_TOTAL = 43;

  function pageFile() {
    const p = location.pathname.split("/").pop();
    return p || "INDEX.html";
  }

  function showToast(msg) {
    let t = document.getElementById("x1k-toast");
    if (!t) {
      t = document.createElement("div");
      t.id = "x1k-toast";
      t.className = "toast";
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add("show");
    setTimeout(() => t.classList.remove("show"), 3200);
  }

  // Copy buttons
  document.querySelectorAll(".copy-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      let ta = btn.previousElementSibling;
      if (!ta || ta.tagName !== "TEXTAREA") {
        ta = btn.closest(".copy-block, .template-card, section")?.querySelector("textarea.tpl, textarea.sales-copy");
      }
      if (!ta || ta.tagName !== "TEXTAREA") return;
      navigator.clipboard.writeText(ta.value).then(() => {
        btn.textContent = "Copied!";
        btn.classList.add("copied");
        setTimeout(() => {
          btn.textContent = "Copy";
          btn.classList.remove("copied");
        }, 2000);
      });
    });
  });

  function todayISO() {
    const d = new Date();
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }

  function getChallengeDay() {
    const val = localStorage.getItem(PREFIX + "start_date");
    if (!val) return null;
    const start = new Date(val + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diff = Math.floor((today - start) / 86400000) + 1;
    return Math.max(1, Math.min(90, diff));
  }

  function getPhase(day) {
    if (day <= 14) return { name: "Foundation", tip: "Fix profile, learn the routine, build your 100-person list." };
    if (day <= 60) return { name: "Momentum", tip: "Post daily, comment daily, ship 1 thread/week from day 15." };
    return { name: "Push", tip: "Double down on winners, send DMs, add a lead magnet to bio." };
  }

  function getCompletedDates() {
    try {
      return JSON.parse(localStorage.getItem(PREFIX + "completed_dates") || "[]");
    } catch {
      return [];
    }
  }

  function saveCompletedDate(iso) {
    const dates = getCompletedDates();
    if (dates.includes(iso)) return;
    dates.push(iso);
    dates.sort();
    localStorage.setItem(PREFIX + "completed_dates", JSON.stringify(dates));
  }

  function computeStreak() {
    const dates = new Set(getCompletedDates());
    if (!dates.size) return { count: 0, status: "none" };

    const today = todayISO();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayISO =
      yesterday.getFullYear() +
      "-" +
      String(yesterday.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(yesterday.getDate()).padStart(2, "0");

    let anchor = dates.has(today) ? today : dates.has(yesterdayISO) ? yesterdayISO : null;
    if (!anchor) return { count: 0, status: "broken" };

    let count = 0;
    let cursor = new Date(anchor + "T00:00:00");
    while (true) {
      const iso =
        cursor.getFullYear() +
        "-" +
        String(cursor.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(cursor.getDate()).padStart(2, "0");
      if (!dates.has(iso)) break;
      count++;
      cursor.setDate(cursor.getDate() - 1);
    }

    const status = dates.has(today) ? "active" : "at-risk";
    return { count, status };
  }

  function updateDailyCompletion() {
    const panel = document.getElementById("daily-checklist-panel");
    if (!panel) return;
    const boxes = panel.querySelectorAll('input[type="checkbox"]');
    if (!boxes.length) return;

    const allDone = [...boxes].every((cb) => cb.checked);
    panel.classList.toggle("daily-complete", allDone);

    const progressEl = document.getElementById("daily-progress");
    if (progressEl) {
      const done = [...boxes].filter((cb) => cb.checked).length;
      progressEl.textContent = done + " / " + boxes.length + " done";
    }

    const iso = todayISO();
    if (allDone) {
      const wasNew = !getCompletedDates().includes(iso);
      saveCompletedDate(iso);
      if (wasNew) {
        const streak = computeStreak();
        showToast("✅ Day complete · " + streak.count + "-day streak!");
      }
    }

    updateChallengeStatus();
  }

  function updateChallengeStatus() {
    const day = getChallengeDay();
    const phase = day ? getPhase(day) : null;
    const streak = computeStreak();

    document.querySelectorAll("[data-challenge-day]").forEach((el) => {
      el.textContent = day ? String(day) : "—";
    });
    document.querySelectorAll("[data-challenge-phase]").forEach((el) => {
      el.textContent = phase ? phase.name : "—";
    });
    document.querySelectorAll("[data-challenge-tip]").forEach((el) => {
      el.textContent = phase ? phase.tip : "Set your 90-day start date to unlock phase guidance.";
    });
    document.querySelectorAll("[data-streak-count]").forEach((el) => {
      el.textContent = String(streak.count);
    });

    document.querySelectorAll(".challenge-status").forEach((card) => {
      card.hidden = !day;
      card.classList.toggle("streak-active", streak.status === "active");
      card.classList.toggle("streak-at-risk", streak.status === "at-risk");
      card.classList.toggle("streak-broken", streak.status === "broken");
    });

    document.querySelectorAll(".cs-streak-note").forEach((streakNote) => {
      if (streak.status === "active") streakNote.textContent = streak.count + "-day streak — keep it going.";
      else if (streak.status === "at-risk") streakNote.textContent = streak.count + "-day streak — finish today to keep it.";
      else if (streak.count === 0 && getCompletedDates().length)
        streakNote.textContent = "Streak reset — check off today's list to start again.";
      else streakNote.textContent = "Complete today's checklist to start your streak.";
    });
  }

  // Checklist persistence (daily panel resets each calendar day)
  document.querySelectorAll(".checklist input[type=checkbox]").forEach((cb, i) => {
    const dailyPanel = cb.closest("#daily-checklist-panel");
    const isDaily = dailyPanel !== null;
    const dailyIndex = isDaily
      ? [...dailyPanel.querySelectorAll('input[type="checkbox"]')].indexOf(cb)
      : i;
    const key = isDaily
      ? PREFIX + "daily_" + todayISO() + "_" + dailyIndex
      : PREFIX + "cb_" + pageFile() + "_" + i;
    cb.checked = localStorage.getItem(key) === "1";
    cb.addEventListener("change", () => {
      localStorage.setItem(key, cb.checked ? "1" : "0");
      updateProgress();
      if (isDaily) updateDailyCompletion();
    });
  });

  updateDailyCompletion();
  updateChallengeStatus();

  const dailyDateLabel = document.getElementById("daily-date-label");
  if (dailyDateLabel) {
    dailyDateLabel.textContent = new Date().toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  }

  // Template drafts (editable)
  document.querySelectorAll("textarea.tpl").forEach((ta, i) => {
    if (ta.id === "bio-preview" || ta.classList.contains("ws-field")) return;
    const key = PREFIX + "tpl_" + pageFile() + "_" + i;
    const saved = localStorage.getItem(key);
    if (saved !== null) ta.value = saved;
    ta.removeAttribute("readonly");
    ta.placeholder = "Fill in your version here…";
    ta.addEventListener("input", () => localStorage.setItem(key, ta.value));
  });

  // Resume last page
  const pf = pageFile();
  if (pf !== "INDEX.html" && pf !== "GUMROAD-SALES-PAGE.html" && pf !== "CHEATSHEET.html") {
    localStorage.setItem(PREFIX + "last_page", pf + location.hash);
    const title = document.querySelector("header.hero h1")?.textContent?.trim();
    if (title) localStorage.setItem(PREFIX + "last_label", title);
  }

  const resumeCard = document.getElementById("resume-card");
  const resumeLink = document.getElementById("resume-link");
  const resumeLabel = document.getElementById("resume-label");
  const lastPage = localStorage.getItem(PREFIX + "last_page");
  if (resumeCard && lastPage && !lastPage.startsWith("INDEX")) {
    resumeCard.hidden = false;
    if (resumeLink) resumeLink.href = lastPage;
    if (resumeLabel) resumeLabel.textContent = localStorage.getItem(PREFIX + "last_label") || "your last lesson";
  }

  // 90-day start date
  const startInput = document.getElementById("challenge-start");
  const dayDisplay = document.getElementById("challenge-day");
  if (startInput && dayDisplay) {
    const saved = localStorage.getItem(PREFIX + "start_date");
    if (saved) startInput.value = saved;
    const updateDay = () => {
      const val = startInput.value;
      if (!val) {
        dayDisplay.textContent = "—";
        return;
      }
      localStorage.setItem(PREFIX + "start_date", val);
      const start = new Date(val + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const diff = Math.floor((today - start) / 86400000) + 1;
      const day = Math.max(1, Math.min(90, diff));
      dayDisplay.textContent = String(day);
      dayDisplay.classList.toggle("done", day >= 90);
    };
    startInput.addEventListener("change", () => {
      updateDay();
      updateChallengeStatus();
    });
    updateDay();
  }

  function countLessons() {
    let done = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k?.startsWith(LESSON_PREFIX) && localStorage.getItem(k) === "1") done++;
    }
    return { done, total: LESSON_TOTAL };
  }

  function pageProgress(path) {
    let total = 0;
    let done = 0;
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (!k?.startsWith(PREFIX + "cb_" + path + "_")) continue;
      total++;
      if (localStorage.getItem(k) === "1") done++;
    }
    return { done, total };
  }

  let celebrated = localStorage.getItem(PREFIX + "celebrated") === "1";

  function updateProgress() {
    const bar = document.getElementById("overall-progress");
    const label = document.getElementById("overall-progress-label");
    const lessonBar = document.getElementById("lesson-progress");
    const lessonLabel = document.getElementById("lesson-progress-label");

    const lessons = countLessons();
    if (lessonBar) lessonBar.style.width = Math.round((lessons.done / lessons.total) * 100) + "%";
    if (lessonLabel) lessonLabel.textContent = lessons.done + " / " + lessons.total + " lessons";

    const pages = [
      "01-Start-Here.html",
      "02-Level-1-Profile-Weapons.html",
      "03-Level-2-Content-Arsenal.html",
      "04-Level-3-Content-Production.html",
      "05-Level-4-Philosophy.html",
      "06-Level-5-Breakthrough-90-Day.html",
      "07-Bonuses.html",
    ];
    let cbDone = 0;
    let cbTotal = 0;
    pages.forEach((p) => {
      const r = pageProgress(p);
      cbDone += r.done;
      cbTotal += r.total;
    });

    const lessonPct = lessons.done / lessons.total;
    const cbPct = cbTotal ? cbDone / cbTotal : 0;
    const combined = Math.round((lessonPct * 0.55 + cbPct * 0.45) * 100);

    if (bar) bar.style.width = combined + "%";
    if (label) {
      label.textContent = combined + "% overall · " + lessons.done + " lessons · " + cbDone + " checklist items";
    }

    if (combined >= 100 && !celebrated && document.body.dataset.page === "hub") {
      celebrated = true;
      localStorage.setItem(PREFIX + "celebrated", "1");
      showToast("🎉 System complete — now execute for 90 days!");
    }

    document.querySelectorAll("[data-progress-page]").forEach((el) => {
      const r = pageProgress(el.dataset.progressPage);
      const fill = el.querySelector(".module-progress-fill");
      const txt = el.querySelector(".module-progress-text");
      if (!fill) return;
      const p = r.total ? Math.round((r.done / r.total) * 100) : 0;
      fill.style.width = p + "%";
      if (txt) txt.textContent = r.total ? p + "%" : "—";
      el.classList.toggle("module-done", r.total > 0 && r.done === r.total);
    });

    updateCurriculumCounts();
  }

  function markLesson(key) {
    if (localStorage.getItem(LESSON_PREFIX + key) === "1") return;
    localStorage.setItem(LESSON_PREFIX + key, "1");
    document.querySelectorAll(`[data-lesson="${key}"]`).forEach((a) => a.classList.add("done"));
    updateProgress();
  }

  function updateCurriculumCounts() {
    document.querySelectorAll(".cur-count").forEach((el) => {
      const modId = el.dataset.mod;
      const mod = document.querySelector(`.cur-module[data-module="${modId}"]`);
      if (!mod) return;
      const links = mod.querySelectorAll("[data-lesson]");
      let done = 0;
      links.forEach((a) => {
        if (localStorage.getItem(LESSON_PREFIX + a.dataset.lesson) === "1") {
          a.classList.add("done");
          done++;
        }
      });
      el.textContent = done + "/" + links.length;
      mod.classList.toggle("module-complete", links.length > 0 && done === links.length);
    });
  }

  // Curriculum accordion
  document.querySelectorAll(".cur-module-head").forEach((btn) => {
    btn.addEventListener("click", () => {
      const mod = btn.closest(".cur-module");
      const isOpen = mod.classList.toggle("open");
      btn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  });
  document.querySelectorAll(".cur-module").forEach((mod, i) => {
    if (i === 0) {
      mod.classList.add("open");
      mod.querySelector(".cur-module-head")?.setAttribute("aria-expanded", "true");
    }
  });

  document.querySelectorAll("[data-lesson]").forEach((a) => {
    if (localStorage.getItem(LESSON_PREFIX + a.dataset.lesson) === "1") a.classList.add("done");
    a.addEventListener("click", () => markLesson(a.dataset.lesson));
  });

  if (location.hash) {
    const id = location.hash.slice(1);
    document.querySelectorAll("[data-lesson]").forEach((a) => {
      if (a.getAttribute("href")?.includes("#" + id)) markLesson(a.dataset.lesson);
    });
  }

  // Auto-mark lessons on scroll
  const idToLesson = {};
  document.querySelectorAll("[data-lesson]").forEach((a) => {
    const hash = a.getAttribute("href")?.split("#")[1];
    if (hash) idToLesson[hash] = a.dataset.lesson;
  });
  if (Object.keys(idToLesson).length) {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && idToLesson[e.target.id]) markLesson(idToLesson[e.target.id]);
        });
      },
      { threshold: 0.35, rootMargin: "-60px 0px -40% 0px" }
    );
    document.querySelectorAll("section.block[id]").forEach((s) => obs.observe(s));
  }

  updateProgress();

  // Lesson outline — highlight on scroll
  const lessonOutline = document.querySelector(".lesson-outline");
  if (lessonOutline) {
    const loLinks = lessonOutline.querySelectorAll("a");
    const loSections = [...loLinks].map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const onLoScroll = () => {
      let current = loSections[0];
      loSections.forEach((sec) => {
        if (sec.getBoundingClientRect().top <= 100) current = sec;
      });
      loLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current?.id));
    };
    window.addEventListener("scroll", onLoScroll, { passive: true });
    onLoScroll();
  }

  // Pillar jump
  const pillarNav = document.querySelector(".pillar-jump");
  if (pillarNav) {
    const links = pillarNav.querySelectorAll("a");
    const sections = [...links].map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const onScroll = () => {
      let current = sections[0];
      sections.forEach((sec) => {
        if (sec.getBoundingClientRect().top <= 120) current = sec;
      });
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current.id));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Follower growth tracker (synced across Hub, 90-day, Worksheets)
  const followerInputs = [
    ["followers-start", "followers-current"],
    ["followers-start-page", "followers-current-page"],
    ["followers-start-ws", "followers-current-ws"],
  ];
  const hasFollower = followerInputs.some(([s]) => document.getElementById(s));
  const MS_KEY = PREFIX + "milestones_hit";

  function getMilestonesHit() {
    try {
      return JSON.parse(localStorage.getItem(MS_KEY) || "[]");
    } catch {
      return [];
    }
  }

  function saveMilestone(ms) {
    const hit = getMilestonesHit();
    if (hit.includes(ms)) return;
    hit.push(ms);
    localStorage.setItem(MS_KEY, JSON.stringify(hit));
    showToast("🎯 Milestone: " + ms + " followers!");
  }

  function updateFollowerTracker() {
    const start = parseInt(localStorage.getItem(PREFIX + "followers_start") || "0", 10) || 0;
    const current = parseInt(localStorage.getItem(PREFIX + "followers_current") || "0", 10) || 0;
    const goal = 1000;
    const range = Math.max(goal - start, 1);
    const pct = Math.max(0, Math.min(100, Math.round(((current - start) / range) * 100)));
    const remaining = Math.max(0, goal - current);

    document.querySelectorAll("#followers-progress, #followers-progress-page").forEach((bar) => {
      bar.style.width = pct + "%";
    });
    document.querySelectorAll("#followers-label, #followers-label-page").forEach((el) => {
      el.textContent = pct + "% to 1,000";
    });
    document.querySelectorAll("#followers-remaining, #followers-remaining-page").forEach((el) => {
      el.textContent = remaining === 0 ? "Goal reached!" : remaining + " to go";
    });

    const row = document.getElementById("milestone-row");
    if (row) {
      row.querySelectorAll("[data-ms]").forEach((el) => {
        const ms = parseInt(el.dataset.ms, 10);
        el.classList.toggle("hit", current >= ms);
      });
    }

    [100, 250, 500, 1000].forEach((ms) => {
      if (current >= ms) saveMilestone(ms);
    });
  }

  function bindFollowerPair(startId, currentId) {
    const startEl = document.getElementById(startId);
    const currentEl = document.getElementById(currentId);
    if (!startEl || !currentEl) return;

    const savedStart = localStorage.getItem(PREFIX + "followers_start");
    const savedCurrent = localStorage.getItem(PREFIX + "followers_current");
    if (savedStart !== null) startEl.value = savedStart;
    if (savedCurrent !== null) currentEl.value = savedCurrent;

    const sync = () => {
      if (startEl.value !== "") localStorage.setItem(PREFIX + "followers_start", startEl.value);
      if (currentEl.value !== "") localStorage.setItem(PREFIX + "followers_current", currentEl.value);
      followerInputs.forEach(([s, c]) => {
        const se = document.getElementById(s);
        const ce = document.getElementById(c);
        if (se && se !== startEl) se.value = startEl.value;
        if (ce && ce !== currentEl) ce.value = currentEl.value;
      });
      updateFollowerTracker();
    };

    startEl.addEventListener("input", sync);
    currentEl.addEventListener("input", sync);
    sync();
  }

  if (hasFollower) {
    followerInputs.forEach(([s, c]) => bindFollowerPair(s, c));
    updateFollowerTracker();
  }

  // Bio builder
  const bioFields = ["bio-audience", "bio-problem", "bio-result", "bio-method", "bio-cta"];
  const bioPreview = document.getElementById("bio-preview");
  if (bioPreview) {
    bioFields.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const key = PREFIX + id;
      const saved = localStorage.getItem(key);
      if (saved !== null) el.value = saved;
      el.addEventListener("input", () => {
        localStorage.setItem(key, el.value);
        const audience = document.getElementById("bio-audience")?.value || "[audience]";
        const problem = document.getElementById("bio-problem")?.value || "[problem]";
        const result = document.getElementById("bio-result")?.value || "[result]";
        const method = document.getElementById("bio-method")?.value || "[method]";
        const cta = document.getElementById("bio-cta")?.value || "[CTA]";
        bioPreview.value =
          "I help " + audience + " go from " + problem + " to " + result + " with " + method + ".\n\n" + cta;
      });
      el.dispatchEvent(new Event("input"));
    });
  }

  // Weekly follower log
  const logBtn = document.getElementById("log-week-btn");
  const logTable = document.getElementById("week-log-table");
  if (logBtn && logTable) {
    const LOG_KEY = PREFIX + "week_log";
    let logs = [];
    try {
      logs = JSON.parse(localStorage.getItem(LOG_KEY) || "[]");
    } catch {
      logs = [];
    }

    logs.forEach((row, i) => {
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>Week " + (i + 1) + "</td><td>" + row.date + "</td><td>" + row.count + "</td><td>" + (row.delta >= 0 ? "+" : "") + row.delta + "</td>";
      logTable.appendChild(tr);
    });

    logBtn.addEventListener("click", () => {
      const current = parseInt(localStorage.getItem(PREFIX + "followers_current") || "0", 10) || 0;
      const prev = logs.length ? logs[logs.length - 1].count : parseInt(localStorage.getItem(PREFIX + "followers_start") || "0", 10) || 0;
      const entry = {
        date: new Date().toLocaleDateString(),
        count: current,
        delta: current - prev,
      };
      logs.push(entry);
      localStorage.setItem(LOG_KEY, JSON.stringify(logs));
      const tr = document.createElement("tr");
      tr.innerHTML =
        "<td>Week " + logs.length + "</td><td>" + entry.date + "</td><td>" + entry.count + "</td><td>" + (entry.delta >= 0 ? "+" : "") + entry.delta + "</td>";
      logTable.appendChild(tr);
      showToast("Week " + logs.length + " logged · " + (entry.delta >= 0 ? "+" : "") + entry.delta);
    });
  }

  // Worksheet text fields by id
  ["niche-who", "niche-problem", "niche-topics"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const key = PREFIX + id;
    const saved = localStorage.getItem(key);
    if (saved !== null) el.value = saved;
    el.addEventListener("input", () => localStorage.setItem(key, el.value));
  });

  // Bonus section jump nav
  const bonusJump = document.querySelector(".bonus-jump");
  if (bonusJump) {
    const links = bonusJump.querySelectorAll("a");
    const sections = [...links].map((a) => document.querySelector(a.getAttribute("href"))).filter(Boolean);
    const onBonusScroll = () => {
      let current = sections[0];
      sections.forEach((sec) => {
        if (sec.getBoundingClientRect().top <= 110) current = sec;
      });
      links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + current?.id));
    };
    window.addEventListener("scroll", onBonusScroll, { passive: true });
    onBonusScroll();
  }

  // Sticky quick nav (all pages)
  const QUICK_LINKS = [
    { href: "INDEX.html", label: "Hub", icon: "⌂", match: ["INDEX.html", ""] },
    { href: "QUICK-WINS.html", label: "Day 1", icon: "1", match: ["QUICK-WINS.html"] },
    { href: "06-Level-5-Breakthrough-90-Day.html", label: "Daily", icon: "✓", match: ["06-Level-5-Breakthrough-90-Day.html"] },
    { href: "CHEATSHEET.html", label: "Cheat", icon: "▤", match: ["CHEATSHEET.html"] },
  ];
  const current = pageFile();
  const qnav = document.createElement("nav");
  qnav.className = "quick-nav no-print";
  qnav.setAttribute("aria-label", "Quick navigation");
  const inner = document.createElement("div");
  inner.className = "quick-nav-inner";
  QUICK_LINKS.forEach((item) => {
    const a = document.createElement("a");
    a.href = item.href;
    a.innerHTML = `<span class="qn-icon" aria-hidden="true">${item.icon}</span>${item.label}`;
    if (item.match.includes(current)) a.classList.add("active");
    inner.appendChild(a);
  });
  qnav.appendChild(inner);
  document.body.appendChild(qnav);
})();
