(() => {
  const STORAGE_KEY = "mrsLecomteMedicalEnglishAccessibilityV1";

  const defaults = {
    textSize: "100",
    readableFont: false,
    spacing: false,
    highContrast: false,
    reduceMotion: false,
    underlineLinks: false,
    readingGuide: false
  };

  function loadSettings() {
    try {
      return {
        ...defaults,
        ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {})
      };
    } catch (_) {
      return {...defaults};
    }
  }

  function saveSettings(value) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    } catch (_) {}
  }

  let settings = loadSettings();

  const launcher = document.createElement("button");
  launcher.type = "button";
  launcher.className = "a11y-launcher";
  launcher.setAttribute("aria-label", "Open accessibility options");
  launcher.setAttribute("aria-haspopup", "dialog");
  launcher.innerHTML = '<span aria-hidden="true">♿</span><span>Accessibility</span>';

  const dialog = document.createElement("dialog");
  dialog.className = "a11y-dialog";
  dialog.setAttribute("aria-labelledby", "a11yTitle");
  dialog.innerHTML = `
    <div class="a11y-dialog-head">
      <div>
        <p class="a11y-kicker">DISPLAY & READING SUPPORT</p>
        <h2 id="a11yTitle">Accessibility options</h2>
      </div>
      <button type="button" class="a11y-close" aria-label="Close accessibility options">×</button>
    </div>

    <p class="a11y-intro">Choose the display that is most comfortable for you. These preferences are saved only in this browser on this device.</p>

    <div class="a11y-setting a11y-text-setting">
      <label for="a11yTextSize">
        <strong>Text size</strong>
        <span>Increase text without changing your browser settings.</span>
      </label>
      <select id="a11yTextSize">
        <option value="100">Standard · 100%</option>
        <option value="115">Large · 115%</option>
        <option value="130">Larger · 130%</option>
        <option value="150">Very large · 150%</option>
      </select>
    </div>

    <label class="a11y-toggle">
      <span><strong>Readable font</strong><small>Use a simple system font with clearly differentiated letter shapes.</small></span>
      <input type="checkbox" data-a11y="readableFont">
    </label>

    <label class="a11y-toggle">
      <span><strong>Extra spacing</strong><small>Increase line, word and letter spacing and keep text blocks easier to follow.</small></span>
      <input type="checkbox" data-a11y="spacing">
    </label>

    <label class="a11y-toggle">
      <span><strong>High contrast</strong><small>Strengthen contrast and borders throughout the site.</small></span>
      <input type="checkbox" data-a11y="highContrast">
    </label>

    <label class="a11y-toggle">
      <span><strong>Reduce motion</strong><small>Remove flips, smooth scrolling and decorative movement.</small></span>
      <input type="checkbox" data-a11y="reduceMotion">
    </label>

    <label class="a11y-toggle">
      <span><strong>Underline links</strong><small>Make links easier to identify without relying on colour.</small></span>
      <input type="checkbox" data-a11y="underlineLinks">
    </label>

    <label class="a11y-toggle">
      <span><strong>Reading guide</strong><small>Show a horizontal guide that follows your pointer, touch or keyboard focus.</small></span>
      <input type="checkbox" data-a11y="readingGuide">
    </label>

    <div class="a11y-actions">
      <button type="button" id="a11yReset" class="secondary-btn">Reset settings</button>
      <a href="accessibility.html">Accessibility information →</a>
    </div>
  `;

  const guide = document.createElement("div");
  guide.id = "a11yReadingGuide";
  guide.hidden = true;
  guide.setAttribute("aria-hidden", "true");

  document.body.append(launcher, dialog, guide);

  const closeButton = dialog.querySelector(".a11y-close");
  const textSize = dialog.querySelector("#a11yTextSize");
  const resetButton = dialog.querySelector("#a11yReset");

  function updateExistingCategoryButtons() {
    document.querySelectorAll(".category-btn").forEach(button => {
      button.setAttribute(
        "aria-pressed",
        String(button.classList.contains("active"))
      );
    });
  }

  function applySettings() {
    const root = document.documentElement;

    root.style.setProperty("--a11y-font-size", `${settings.textSize}%`);
    root.classList.toggle("a11y-readable-font", settings.readableFont);
    root.classList.toggle("a11y-spacing", settings.spacing);
    root.classList.toggle("a11y-high-contrast", settings.highContrast);
    root.classList.toggle("a11y-reduce-motion", settings.reduceMotion);
    root.classList.toggle("a11y-underline-links", settings.underlineLinks);
    root.classList.toggle("a11y-reading-guide-on", settings.readingGuide);

    textSize.value = settings.textSize;

    dialog.querySelectorAll("[data-a11y]").forEach(input => {
      input.checked = Boolean(settings[input.dataset.a11y]);
    });

    guide.hidden = !settings.readingGuide;
  }

  function persist() {
    saveSettings(settings);
    applySettings();
  }

  launcher.addEventListener("click", () => {
    dialog.showModal();
    closeButton.focus();
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => launcher.focus());

  textSize.addEventListener("change", () => {
    settings.textSize = textSize.value;
    persist();
  });

  dialog.querySelectorAll("[data-a11y]").forEach(input => {
    input.addEventListener("change", () => {
      settings[input.dataset.a11y] = input.checked;
      persist();
    });
  });

  resetButton.addEventListener("click", () => {
    settings = {...defaults};
    persist();
  });

  document.addEventListener("keydown", event => {
    if (event.altKey && event.key.toLowerCase() === "a") {
      event.preventDefault();

      if (dialog.open) {
        dialog.close();
      } else {
        dialog.showModal();
        closeButton.focus();
      }
    }
  });

  function moveGuide(y) {
    if (!settings.readingGuide) return;
    guide.style.transform = `translateY(${Math.max(0, y - 22)}px)`;
  }

  document.addEventListener(
    "pointermove",
    event => moveGuide(event.clientY),
    {passive: true}
  );

  document.addEventListener(
    "touchmove",
    event => {
      const touch = event.touches?.[0];
      if (touch) moveGuide(touch.clientY);
    },
    {passive: true}
  );

  document.addEventListener("focusin", event => {
    if (!settings.readingGuide) return;
    if (dialog.contains(event.target) || event.target === launcher) return;

    const rect = event.target.getBoundingClientRect?.();
    if (rect) {
      moveGuide(rect.top + Math.min(rect.height / 2, 28));
    }
  });

  function setActiveNavigation() {
    const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    let target = file;
    if (/^fgsm3-day[1-5]\.html$/.test(file) || file === "conference-rescue.html") target = "fgsm3.html";
    if (/^fgsm2-day[1-5]\.html$/.test(file)) target = "fgsm2.html";
    if (file === "notebook.html") target = "dictionary.html";
    if (file === "flashcards.html") target = "games.html";

    document.querySelectorAll(".main-nav a").forEach(link => {
      const href = (link.getAttribute("href") || "").split("#")[0].split("?")[0].toLowerCase();
      const active = href === target || (target === "index.html" && (href === "./" || href === "index.html"));
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
  }

  const lockStyle = document.createElement("style");
  lockStyle.textContent = `.a11y-lock-proxy{position:absolute!important;left:-9999px!important;width:1px!important;height:1px!important;overflow:hidden!important}.a11y-lock-proxy:focus{position:fixed!important;left:16px!important;top:16px!important;width:min(560px,calc(100vw - 32px))!important;height:auto!important;overflow:visible!important;z-index:10001!important;padding:12px 14px!important;border:3px solid #ffbf47!important;border-radius:10px!important;background:#fff!important;color:#111!important;font-weight:800!important;box-shadow:0 8px 30px rgba(0,0,0,.28)!important}`;
  document.head.appendChild(lockStyle);
  let lockProxyCounter = 0;

  function explainLockedControls() {
    document.querySelectorAll("button").forEach(button => {
      const text = (button.textContent || "").trim();
      const locked = button.disabled && (
        /LOCKED|🔒|Complete Mission|Complete Stage/i.test(text) ||
        /activity-card|mission/i.test(button.className || "")
      );

      const existingId = button.dataset.a11yLockProxy;
      const existing = existingId ? document.getElementById(existingId) : null;
      if (!locked) {
        existing?.remove();
        delete button.dataset.a11yLockProxy;
        return;
      }

      const reason = button.getAttribute("aria-label") || text || "Locked activity";
      const message = `${reason}. Complete the previous activity or mission to unlock it.`;
      button.setAttribute("title", message);
      if (existing) {
        existing.textContent = message;
        existing.setAttribute("aria-label", message);
        return;
      }

      const proxy = document.createElement("span");
      proxy.id = `a11yLockProxy${++lockProxyCounter}`;
      proxy.className = "a11y-lock-proxy";
      proxy.tabIndex = 0;
      proxy.setAttribute("role", "note");
      proxy.setAttribute("aria-label", message);
      proxy.textContent = message;
      button.dataset.a11yLockProxy = proxy.id;
      button.insertAdjacentElement("afterend", proxy);
    });
  }

  setActiveNavigation();
  explainLockedControls();
  const lockObserver = new MutationObserver(() => explainLockedControls());
  lockObserver.observe(document.body, {subtree:true, childList:true, attributes:true, attributeFilter:["disabled"]});

  updateExistingCategoryButtons();

  const filters = document.getElementById("categoryFilters");
  if (filters) {
    const observer = new MutationObserver(updateExistingCategoryButtons);
    observer.observe(filters, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["class"]
    });
  }

  applySettings();
})();
