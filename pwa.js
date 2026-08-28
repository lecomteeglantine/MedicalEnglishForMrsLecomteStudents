(() => {
  let deferredPrompt = null;

  const installButton = document.getElementById("installAppButton");
  const helpButton = document.getElementById("installHelpButton");
  const helpBox = document.getElementById("installHelp");
  const status = document.getElementById("connectionStatus");
  const appState = document.getElementById("appInstallState");

  function updateConnectionStatus() {
    const online = navigator.onLine;

    if (status) {
      status.textContent = online ? "● Online" : "● Offline";
      status.classList.toggle("is-offline", !online);
    }

    if (appState && !online) {
      appState.textContent = "Offline mode: previously opened learning resources remain available.";
    }
  }

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", async () => {
      try {
        const registration = await navigator.serviceWorker.register(
          "./service-worker.js",
          {scope: "./", updateViaCache: "none"}
        );

        registration.update().catch(() => {});

        if (appState) {
          appState.textContent = navigator.onLine
            ? "Core offline access is ready. Course media is saved only after you open it, to avoid a large automatic download."
            : "Offline mode is active.";
        }
      } catch (_) {
        if (appState) {
          appState.textContent = "Offline installation is not available in this browser.";
        }
      }
    });
  }

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    deferredPrompt = event;

    if (installButton) {
      installButton.hidden = false;
      installButton.disabled = false;
    }
  });

  installButton?.addEventListener("click", async () => {
    if (!deferredPrompt) {
      helpBox?.removeAttribute("hidden");
      helpBox?.scrollIntoView({behavior: "smooth", block: "nearest"});
      return;
    }

    deferredPrompt.prompt();

    try {
      await deferredPrompt.userChoice;
    } finally {
      deferredPrompt = null;
      installButton.hidden = true;
    }
  });

  helpButton?.addEventListener("click", () => {
    if (!helpBox) return;

    const opening = helpBox.hasAttribute("hidden");

    if (opening) {
      helpBox.removeAttribute("hidden");
      helpBox.focus();
    } else {
      helpBox.setAttribute("hidden", "");
    }

    helpButton.setAttribute("aria-expanded", String(opening));
  });

  window.addEventListener("appinstalled", () => {
    deferredPrompt = null;
    if (installButton) installButton.hidden = true;
    if (appState) {
      appState.textContent = "App installed. You can now open it from your home screen.";
    }
  });

  window.addEventListener("online", updateConnectionStatus);
  window.addEventListener("offline", updateConnectionStatus);

  updateConnectionStatus();
})();
