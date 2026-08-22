
(() => {
  const all = Array.isArray(window.MEDICAL_VOCABULARY) ? window.MEDICAL_VOCABULARY : [];

  const grid = document.getElementById("vocabulary");
  const searchInput = document.getElementById("searchInput");
  const clearSearch = document.getElementById("clearSearch");
  const suggestions = document.getElementById("suggestions");
  const categoryFilters = document.getElementById("categoryFilters");
  const sortSelect = document.getElementById("sortSelect");
  const resultCount = document.getElementById("resultCount");
  const termCount = document.getElementById("termCount");
  const categoryCount = document.getElementById("categoryCount");
  const emptyState = document.getElementById("emptyState");
  const randomBtn = document.getElementById("randomBtn");
  const toggleFrench = document.getElementById("toggleFrench");
  const toggleDefinitions = document.getElementById("toggleDefinitions");
  const notebookCountBadge = document.getElementById("notebookCountBadge");
  const StudentData = window.MedicalStudentData;

  let activeCategory = "All";
  let hideFrench = false;
  let hideDefinitions = false;

  const categories = ["All", ...new Set(all.map(item => item.category))];

  termCount.textContent = all.length;
  categoryCount.textContent = categories.length - 1;

  function normalise(value) {
    return String(value ?? "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function buildFilters() {
    categoryFilters.innerHTML = "";
    categories.forEach(category => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "category-btn" + (category === activeCategory ? " active" : "");
      btn.textContent = category;
      btn.addEventListener("click", () => {
        activeCategory = category;
        [...categoryFilters.children].forEach(b =>
          b.classList.toggle("active", b.textContent === category)
        );
        render();
      });
      categoryFilters.appendChild(btn);
    });
  }

  function getFiltered() {
    const q = normalise(searchInput.value.trim());
    let items = all.filter(item => {
      const categoryOK = activeCategory === "All" || item.category === activeCategory;
      if (!categoryOK) return false;
      if (!q) return true;

      const haystack = normalise([
        item.word,
        item.ipa,
        item.definition,
        item.fr,
        item.category
      ].join(" "));

      return haystack.includes(q);
    });

    const mode = sortSelect.value;
    items = [...items].sort((a, b) => {
      if (mode === "za") return b.word.localeCompare(a.word, "en");
      if (mode === "category") {
        return a.category.localeCompare(b.category, "en")
          || a.word.localeCompare(b.word, "en");
      }
      return a.word.localeCompare(b.word, "en");
    });

    return items;
  }

  function cardTemplate(item) {
    return `
      <article class="vocab-card" data-word="${escapeHTML(item.word)}">
        <div class="card-top">
          <div class="illustration"
               role="img"
               aria-label="Visual cue for ${escapeHTML(item.word)}">
            ${escapeHTML(item.illustration)}
          </div>
          <div>
            <span class="category-tag">${escapeHTML(item.category)}</span>
            <h2 class="word">${escapeHTML(item.word)}</h2>
            <p class="ipa">${escapeHTML(item.ipa)}</p>
          </div>
        </div>

        <div class="card-body">
          <div class="info-block definition-block ${hideDefinitions ? "hidden-learning" : ""}">
            <span class="info-label">Definition</span>
            <p>${escapeHTML(item.definition)}</p>
          </div>

          <div class="info-block french-block ${hideFrench ? "hidden-learning" : ""}">
            <span class="info-label">Français</span>
            <p class="fr-value">${escapeHTML(item.fr)}</p>
          </div>

          <div class="card-actions">
            <button
              class="listen-btn"
              type="button"
              data-speak="${escapeHTML(item.word)}"
              aria-label="Listen to ${escapeHTML(item.word)} in British English">
              🔊 Listen
            </button>
            <button
              class="notebook-btn ${StudentData && StudentData.hasWord(item.word) ? "saved" : ""}"
              type="button"
              data-notebook="${escapeHTML(item.word)}"
              aria-pressed="${StudentData && StudentData.hasWord(item.word) ? "true" : "false"}"
              aria-label="${StudentData && StudentData.hasWord(item.word) ? "Remove" : "Add"} ${escapeHTML(item.word)} ${StudentData && StudentData.hasWord(item.word) ? "from" : "to"} my notebook"
              title="${StudentData && StudentData.hasWord(item.word) ? "Saved in my notebook" : "Add to my notebook"}">
              ${StudentData && StudentData.hasWord(item.word) ? "★" : "☆"}
            </button>
            <button
              class="copy-btn"
              type="button"
              data-copy="${escapeHTML(item.word)}"
              aria-label="Copy ${escapeHTML(item.word)}"
              title="Copy word">⧉</button>
          </div>
        </div>
      </article>
    `;
  }

  function render() {
    const items = getFiltered();
    resultCount.textContent = items.length;
    emptyState.hidden = items.length !== 0;
    grid.innerHTML = items.map(cardTemplate).join("");

    grid.querySelectorAll("[data-speak]").forEach(btn => {
      btn.addEventListener("click", () => speak(btn.dataset.speak, btn));
    });

    grid.querySelectorAll("[data-copy]").forEach(btn => {
      btn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(btn.dataset.copy);
          const old = btn.textContent;
          btn.textContent = "✓";
          setTimeout(() => btn.textContent = old, 900);
        } catch (_) {}
      });
    });

    grid.querySelectorAll("[data-notebook]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!StudentData) return;
        const word = btn.dataset.notebook;
        if (StudentData.hasWord(word)) StudentData.removeWord(word);
        else StudentData.addWord(word);
        updateNotebookCount();
        render();
      });
    });
  }

  function getUKVoice() {
    const voices = speechSynthesis.getVoices();
    return (
      voices.find(v => /^en-GB$/i.test(v.lang)) ||
      voices.find(v => /en[-_]GB/i.test(v.lang)) ||
      voices.find(v => /^en/i.test(v.lang)) ||
      null
    );
  }

  function speak(text, button) {
    if (!("speechSynthesis" in window)) {
      alert("Audio pronunciation is not supported by this browser.");
      return;
    }

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    const voice = getUKVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.86;
    utterance.pitch = 1;

    if (button) button.classList.add("speaking");
    utterance.onend = () => button && button.classList.remove("speaking");
    utterance.onerror = () => button && button.classList.remove("speaking");
    speechSynthesis.speak(utterance);
  }

  function updateSuggestions() {
    const q = normalise(searchInput.value.trim());

    if (!q) {
      suggestions.style.display = "none";
      suggestions.innerHTML = "";
      return;
    }

    const matches = all
      .filter(item =>
        normalise(item.word).includes(q) ||
        normalise(item.fr).includes(q)
      )
      .slice(0, 8);

    if (!matches.length) {
      suggestions.style.display = "none";
      suggestions.innerHTML = "";
      return;
    }

    suggestions.innerHTML = matches.map(item => `
      <button type="button"
              class="suggestion"
              data-suggestion="${escapeHTML(item.word)}">
        <span><strong>${escapeHTML(item.word)}</strong></span>
        <small>${escapeHTML(item.fr)}</small>
      </button>
    `).join("");

    suggestions.style.display = "block";

    suggestions.querySelectorAll("[data-suggestion]").forEach(btn => {
      btn.addEventListener("click", () => {
        searchInput.value = btn.dataset.suggestion;
        suggestions.style.display = "none";
        activeCategory = "All";
        buildFilters();
        render();

        const card = [...grid.querySelectorAll(".vocab-card")]
          .find(c => normalise(c.dataset.word) === normalise(btn.dataset.suggestion));

        card?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  searchInput.addEventListener("input", () => {
    updateSuggestions();
    render();
  });

  searchInput.addEventListener("keydown", event => {
    if (event.key === "Escape") suggestions.style.display = "none";
  });

  document.addEventListener("click", event => {
    if (!event.target.closest(".search-wrap")) suggestions.style.display = "none";
  });

  clearSearch.addEventListener("click", () => {
    searchInput.value = "";
    suggestions.style.display = "none";
    searchInput.focus();
    render();
  });

  sortSelect.addEventListener("change", render);

  toggleFrench.addEventListener("click", () => {
    hideFrench = !hideFrench;
    toggleFrench.setAttribute("aria-pressed", String(hideFrench));
    toggleFrench.textContent = hideFrench ? "🇫🇷 Show French" : "🇫🇷 Hide French";
    render();
  });

  toggleDefinitions.addEventListener("click", () => {
    hideDefinitions = !hideDefinitions;
    toggleDefinitions.setAttribute("aria-pressed", String(hideDefinitions));
    toggleDefinitions.textContent = hideDefinitions ? "💡 Show definitions" : "💡 Hide definitions";
    render();
  });

  randomBtn.addEventListener("click", () => {
    if (!all.length) return;

    const item = all[Math.floor(Math.random() * all.length)];
    searchInput.value = item.word;
    activeCategory = "All";
    buildFilters();
    render();

    setTimeout(() => {
      const card = grid.querySelector(".vocab-card");
      card?.scrollIntoView({ behavior: "smooth", block: "center" });

      if (card && typeof card.animate === "function") {
        card.animate(
          [
            { transform: "scale(1)" },
            { transform: "scale(1.025)" },
            { transform: "scale(1)" }
          ],
          { duration: 600 }
        );
      }
    }, 30);
  });

  function updateNotebookCount() {
    if (notebookCountBadge && StudentData) {
      notebookCountBadge.textContent = StudentData.getNotebook().length;
    }
  }

  window.addEventListener("medicalNotebookChanged", updateNotebookCount);
  buildFilters();
  updateNotebookCount();
  render();

  if ("speechSynthesis" in window) {
    speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
  }
})();
