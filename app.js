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
  const searchStatus = document.getElementById("searchStatus");
  const resetSearchFromEmpty = document.getElementById("resetSearchFromEmpty");
  const randomBtn = document.getElementById("randomBtn");
  const toggleFrench = document.getElementById("toggleFrench");
  const toggleDefinitions = document.getElementById("toggleDefinitions");
  const notebookCountBadge = document.getElementById("notebookCountBadge");
  const showAllCategories = document.getElementById("showAllCategories");
  const categoryStudyPanel = document.getElementById("categoryStudyPanel");
  const selectedCategoryIcon = document.getElementById("selectedCategoryIcon");
  const selectedCategoryName = document.getElementById("selectedCategoryName");
  const selectedCategoryCount = document.getElementById("selectedCategoryCount");
  const categoryFlashcardsLink = document.getElementById("categoryFlashcardsLink");
  const categoryGamesLink = document.getElementById("categoryGamesLink");
  const clearCategoryFilter = document.getElementById("clearCategoryFilter");
  const researchFocusPanel = document.getElementById("researchFocusPanel");
  const researchFocusFilters = document.getElementById("researchFocusFilters");
  const researchFocusStatus = document.getElementById("researchFocusStatus");
  const StudentData = window.MedicalStudentData;

  const CATEGORY_META = {
    "All": { icon: "🧭", description: "Explore the complete Medical English dictionary." },
    "Scientific publications": { icon: "🔬", description: "Read, discuss and present scientific papers with confidence.", featured: true },
    "Anatomy": { icon: "🫀", description: "Body structures, organs and anatomical language." },
    "Symptoms & signs": { icon: "🤒", description: "Describe what patients feel and what clinicians observe." },
    "Diseases & conditions": { icon: "🧬", description: "Common diseases, disorders and medical conditions." },
    "Consultation & examination": { icon: "🩺", description: "History-taking, examination and consultation language." },
    "Tests & imaging": { icon: "🧪", description: "Investigations, laboratory tests and medical imaging." },
    "Treatment & procedures": { icon: "💊", description: "Medication, procedures, treatment and rehabilitation." },
    "Hospital & healthcare": { icon: "🏥", description: "People, places and systems across healthcare." },
    "Emergency medicine": { icon: "🚑", description: "Urgent care, emergency situations and first response." },
    "Medical verbs": { icon: "⚕️", description: "High-frequency verbs for clinical and scientific English." },
    "Medical communication": { icon: "💬", description: "Communicate clearly with patients and colleagues." },
    "AI & digital medicine": { icon: "🤖", description: "Digital health, AI, telemedicine and data-driven care." }
  };

  const RESEARCH_FOCUS = [
    { key: "All research", icon: "🔬", label: "All 79", description: "The complete research vocabulary set" },
    { key: "Essential 20", icon: "⭐", label: "Essential 20", description: "Start here for article presentations" },
    { key: "Anatomy of a paper", icon: "📄", label: "Anatomy of a paper", description: "Abstract, methods, results, discussion…" },
    { key: "Publishing & peer review", icon: "📝", label: "Publishing & peer review", description: "Journal, reviewer, submission, DOI…" },
    { key: "Research questions & design", icon: "🧭", label: "Research design", description: "Hypothesis, cohort, RCT, review…" },
    { key: "Participants & methods", icon: "👥", label: "Participants & methods", description: "Sample, criteria, randomisation, outcomes…" },
    { key: "Statistics", icon: "📊", label: "Statistics", description: "p-value, CI, effect size, relative risk…" },
    { key: "Interpreting evidence", icon: "🔎", label: "Interpreting evidence", description: "Bias, validity, causation, reproducibility…" }
  ];

  const rawCategories = [...new Set(all.map(item => item.category))];
  const preferredOrder = ["Scientific publications", ...rawCategories.filter(c => c !== "Scientific publications")];
  const categories = ["All", ...preferredOrder];
  const params = new URLSearchParams(location.search);
  const requestedCategory = params.get("category");
  const requestedFocus = params.get("focus");

  let activeCategory = categories.includes(requestedCategory) ? requestedCategory : "All";
  let activeResearchFocus = "All research";
  if (activeCategory === "Scientific publications" && RESEARCH_FOCUS.some(f => f.key === requestedFocus)) {
    activeResearchFocus = requestedFocus;
  }
  let hideFrench = false;
  let hideDefinitions = false;

  termCount.textContent = all.length;
  categoryCount.textContent = categories.length - 1;

  function normalise(value) {
    return String(value ?? "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  }

  function tokens(value) {
    return normalise(value)
      .replace(/[^\p{L}\p{N}]+/gu, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean);
  }

  function looseWord(value) {
    const v = normalise(value).trim();
    if (v.length > 4 && v.endsWith("ies")) return v.slice(0, -3) + "y";
    if (v.length > 4 && v.endsWith("es")) return v.slice(0, -2);
    if (v.length > 3 && v.endsWith("s")) return v.slice(0, -1);
    return v;
  }

  function searchScore(item, rawQuery) {
    const q = normalise(rawQuery).trim();
    if (!q) return 1;

    const word = normalise(item.word);
    const french = normalise(item.fr);
    const category = normalise(item.category);
    const definition = normalise(item.definition);
    const ipa = normalise(item.ipa);
    const example = normalise(item.example || "");
    const researchArea = normalise(item.researchArea || "");

    if (word === q) return 1000;
    if (french === q) return 950;
    if (word.startsWith(q)) return 850;
    if (french.startsWith(q)) return 800;
    if (word.split(/\s+/).some(part => part.startsWith(q))) return 760;
    if (french.split(/\s+/).some(part => part.startsWith(q))) return 720;
    if (word.includes(q)) return 650;
    if (french.includes(q)) return 620;
    if (category.includes(q)) return 420;
    if (researchArea.includes(q)) return 390;
    if (definition.includes(q)) return 350;
    if (example.includes(q)) return 310;
    if (ipa.includes(q)) return 200;

    const queryTokens = tokens(q);
    const combined = `${word} ${french} ${category} ${researchArea} ${definition} ${example}`;
    if (queryTokens.length > 1 && queryTokens.every(t => combined.includes(t))) return 300;

    const looseQ = looseWord(q);
    if (looseQ !== q) {
      if (looseWord(word).includes(looseQ)) return 560;
      if (looseWord(french).includes(looseQ)) return 530;
    }

    return 0;
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function categoryCountValue(category) {
    return category === "All" ? all.length : all.filter(item => item.category === category).length;
  }

  function categoryMeta(category) {
    return CATEGORY_META[category] || {icon: "📚", description: "Explore this Medical English vocabulary set."};
  }

  function selectCategory(category, {scroll = true} = {}) {
    activeCategory = category;
    activeResearchFocus = "All research";
    buildFilters();
    updateCategoryStudyPanel();
    updateResearchPanel();
    render();
    if (scroll) {
      const target = category === "Scientific publications" ? researchFocusPanel : categoryStudyPanel;
      target?.scrollIntoView({behavior: "smooth", block: "nearest"});
    }
  }

  function buildFilters() {
    categoryFilters.innerHTML = categories.map(category => {
      const meta = categoryMeta(category);
      const active = category === activeCategory;
      const featured = meta.featured ? " category-card-featured" : "";
      const badge = meta.featured ? '<span class="category-featured-badge">Essential for article presentations</span>' : "";
      const label = category === "All" ? "All vocabulary" : category;
      return `
        <button type="button" class="category-card${featured}${active ? " active" : ""}"
                data-category="${escapeHTML(category)}" aria-pressed="${active}">
          <span class="category-card-icon" aria-hidden="true">${escapeHTML(meta.icon)}</span>
          <span class="category-card-copy">
            ${badge}
            <strong>${escapeHTML(label)}</strong>
            <small>${escapeHTML(meta.description)}</small>
          </span>
          <span class="category-card-count">${categoryCountValue(category)}<small>terms</small></span>
        </button>`;
    }).join("");

    categoryFilters.querySelectorAll("[data-category]").forEach(button => {
      button.addEventListener("click", () => selectCategory(button.dataset.category));
    });
  }

  function updateCategoryStudyPanel() {
    const show = activeCategory !== "All";
    categoryStudyPanel.hidden = !show;
    if (!show) return;
    const meta = categoryMeta(activeCategory);
    selectedCategoryIcon.textContent = meta.icon;
    selectedCategoryName.textContent = activeCategory;
    selectedCategoryCount.textContent = categoryCountValue(activeCategory);
    const encoded = encodeURIComponent(activeCategory);
    categoryFlashcardsLink.href = `flashcards.html?category=${encoded}`;
    categoryGamesLink.href = `games.html?category=${encoded}`;
  }

  function researchFocusCount(key) {
    const research = all.filter(item => item.category === "Scientific publications");
    if (key === "All research") return research.length;
    if (key === "Essential 20") return research.filter(item => item.researchEssential).length;
    return research.filter(item => item.researchArea === key).length;
  }

  function updateResearchPanel() {
    researchFocusPanel.hidden = activeCategory !== "Scientific publications";
    if (researchFocusPanel.hidden) return;

    researchFocusFilters.innerHTML = RESEARCH_FOCUS.map(focus => `
      <button type="button" class="research-focus-btn${activeResearchFocus === focus.key ? " active" : ""}"
              data-research-focus="${escapeHTML(focus.key)}" aria-pressed="${activeResearchFocus === focus.key}">
        <span class="research-focus-icon" aria-hidden="true">${focus.icon}</span>
        <span><strong>${escapeHTML(focus.label)}</strong><small>${escapeHTML(focus.description)}</small></span>
        <em>${researchFocusCount(focus.key)}</em>
      </button>`).join("");

    researchFocusFilters.querySelectorAll("[data-research-focus]").forEach(button => {
      button.addEventListener("click", () => {
        activeResearchFocus = button.dataset.researchFocus;
        updateResearchPanel();
        render();
        document.getElementById("vocabulary")?.scrollIntoView({behavior: "smooth", block: "start"});
      });
    });

    const count = researchFocusCount(activeResearchFocus);
    const label = activeResearchFocus === "All research" ? "all scientific-publication vocabulary" : activeResearchFocus;
    researchFocusStatus.innerHTML = `<strong>${count}</strong> terms selected · ${escapeHTML(label)}`;
  }

  function matchesResearchFocus(item) {
    if (activeCategory !== "Scientific publications" || item.category !== "Scientific publications") return true;
    if (activeResearchFocus === "All research") return true;
    if (activeResearchFocus === "Essential 20") return Boolean(item.researchEssential);
    return item.researchArea === activeResearchFocus;
  }

  function getFiltered() {
    const query = searchInput.value.trim();

    let items = all
      .map(item => ({ item, score: searchScore(item, query) }))
      .filter(({ item, score }) => {
        const categoryOK = activeCategory === "All" || item.category === activeCategory;
        return categoryOK && matchesResearchFocus(item) && (!query || score > 0);
      });

    const mode = sortSelect.value;

    items.sort((a, b) => {
      if (query && b.score !== a.score) return b.score - a.score;
      if (mode === "za") return b.item.word.localeCompare(a.item.word, "en");
      if (mode === "category") {
        return a.item.category.localeCompare(b.item.category, "en") ||
               a.item.word.localeCompare(b.item.word, "en");
      }
      return a.item.word.localeCompare(b.item.word, "en");
    });

    return items.map(({ item }) => item);
  }

  function cardTemplate(item) {
    const example = item.example ? `
      <div class="info-block example-block">
        <span class="info-label">In a paper</span>
        <p>${escapeHTML(item.example)}</p>
        <button class="example-listen-btn" type="button" data-speak-example="${escapeHTML(item.example)}" aria-label="Listen to example sentence">🔊 Hear the sentence</button>
      </div>` : "";
    const researchArea = item.researchArea ? `<span class="research-area-tag">${escapeHTML(item.researchArea)}</span>` : "";
    const essential = item.researchEssential ? '<span class="essential-tag">★ Essential</span>' : "";

    return `
      <article class="vocab-card${item.category === "Scientific publications" ? " research-vocab-card" : ""}" data-word="${escapeHTML(item.word)}">
        <div class="card-top">
          <div class="illustration" role="img" aria-label="Visual cue for ${escapeHTML(item.word)}">${escapeHTML(item.illustration)}</div>
          <div>
            <div class="card-tags"><span class="category-tag">${escapeHTML(item.category)}</span>${essential}</div>
            <h2 class="word">${escapeHTML(item.word)}</h2>
            <p class="ipa">${escapeHTML(item.ipa)}</p>
            ${researchArea}
          </div>
        </div>

        <div class="card-body">
          <div class="info-block definition-block ${hideDefinitions ? "hidden-learning" : ""}">
            <span class="info-label">Definition</span>
            <p>${escapeHTML(item.definition)}</p>
          </div>
          ${example}
          <div class="info-block french-block ${hideFrench ? "hidden-learning" : ""}">
            <span class="info-label">Français</span>
            <p class="fr-value">${escapeHTML(item.fr)}</p>
          </div>

          <div class="card-actions">
            <button class="listen-btn" type="button" data-speak="${escapeHTML(item.word)}" aria-label="Listen to ${escapeHTML(item.word)} in British English">🔊 Listen</button>
            <button class="notebook-btn ${StudentData && StudentData.hasWord(item.word) ? "saved" : ""}" type="button"
                    data-notebook="${escapeHTML(item.word)}" aria-pressed="${StudentData && StudentData.hasWord(item.word) ? "true" : "false"}"
                    aria-label="${StudentData && StudentData.hasWord(item.word) ? "Remove" : "Add"} ${escapeHTML(item.word)} ${StudentData && StudentData.hasWord(item.word) ? "from" : "to"} my notebook"
                    title="${StudentData && StudentData.hasWord(item.word) ? "Saved in my notebook" : "Add to my notebook"}">${StudentData && StudentData.hasWord(item.word) ? "★" : "☆"}</button>
            <button class="copy-btn" type="button" data-copy="${escapeHTML(item.word)}" aria-label="Copy ${escapeHTML(item.word)}" title="Copy word">⧉</button>
          </div>
        </div>
      </article>`;
  }

  function render() {
    const items = getFiltered();
    resultCount.textContent = items.length;
    const query = searchInput.value.trim();
    let scope = "";
    if (activeCategory !== "All") scope += ` in <strong>${escapeHTML(activeCategory)}</strong>`;
    if (activeCategory === "Scientific publications" && activeResearchFocus !== "All research") scope += ` · <strong>${escapeHTML(activeResearchFocus)}</strong>`;
    if (searchStatus) {
      searchStatus.innerHTML = query
        ? `<strong>${items.length}</strong> ${items.length === 1 ? "result" : "results"} for <strong>“${escapeHTML(query)}”</strong>${scope}`
        : `<strong>${items.length}</strong> terms shown${scope}`;
    }
    emptyState.hidden = items.length !== 0;
    grid.innerHTML = items.map(cardTemplate).join("");

    grid.querySelectorAll("[data-speak]").forEach(btn => btn.addEventListener("click", () => speak(btn.dataset.speak, btn)));
    grid.querySelectorAll("[data-speak-example]").forEach(btn => btn.addEventListener("click", () => speak(btn.dataset.speakExample, btn)));

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
    return voices.find(v => /^en-GB$/i.test(v.lang)) || voices.find(v => /en[-_]GB/i.test(v.lang)) || voices.find(v => /^en/i.test(v.lang)) || null;
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
    utterance.rate = text.split(/\s+/).length > 4 ? 0.92 : 0.86;
    utterance.pitch = 1;
    if (button) button.classList.add("speaking");
    utterance.onend = () => button && button.classList.remove("speaking");
    utterance.onerror = () => button && button.classList.remove("speaking");
    speechSynthesis.speak(utterance);
  }

  function updateSuggestions() {
    const query = searchInput.value.trim();
    if (!query) {
      suggestions.style.display = "none";
      suggestions.innerHTML = "";
      return;
    }

    const matches = all
      .map(item => ({item, score: searchScore(item, query)}))
      .filter(result => result.score > 0)
      .sort((a,b) => b.score - a.score || a.item.word.localeCompare(b.item.word, "en"))
      .slice(0,10)
      .map(result => result.item);

    if (!matches.length) {
      suggestions.innerHTML = `<div class="suggestion-no-result"><strong>No exact term found yet.</strong><span>Press Enter to see all possible matches.</span></div>`;
      suggestions.style.display = "block";
      return;
    }

    suggestions.innerHTML = matches.map(item => `
      <button type="button" class="suggestion smart-suggestion" role="option" data-suggestion="${escapeHTML(item.word)}">
        <span class="suggestion-icon" aria-hidden="true">${escapeHTML(item.illustration || "🩺")}</span>
        <span class="suggestion-main"><strong>${escapeHTML(item.word)}</strong><small>${escapeHTML(item.fr)}</small></span>
        <span class="suggestion-category">${escapeHTML(item.category)}</span>
      </button>`).join("");
    suggestions.style.display = "block";
    suggestions.querySelectorAll("[data-suggestion]").forEach(btn => btn.addEventListener("click", () => selectSuggestion(btn.dataset.suggestion)));
  }

  function selectSuggestion(word) {
    searchInput.value = word;
    suggestions.style.display = "none";
    activeCategory = "All";
    activeResearchFocus = "All research";
    buildFilters();
    updateCategoryStudyPanel();
    updateResearchPanel();
    render();
    const card = [...grid.querySelectorAll(".vocab-card")].find(c => normalise(c.dataset.word) === normalise(word));
    card?.scrollIntoView({behavior:"smooth",block:"center"});
    card?.classList.add("search-hit");
    setTimeout(() => card?.classList.remove("search-hit"),1100);
  }

  searchInput.addEventListener("input", () => { updateSuggestions(); render(); });
  searchInput.addEventListener("keydown", event => {
    if (event.key === "Escape") { suggestions.style.display = "none"; return; }
    if (event.key === "Enter") {
      event.preventDefault();
      const firstSuggestion = suggestions.querySelector("[data-suggestion]");
      if (firstSuggestion) selectSuggestion(firstSuggestion.dataset.suggestion);
      else { suggestions.style.display = "none"; render(); grid.scrollIntoView({behavior:"smooth",block:"start"}); }
    }
  });

  document.querySelectorAll("[data-example]").forEach(btn => {
    btn.addEventListener("click", () => {
      searchInput.value = btn.dataset.example || "";
      activeCategory = "All";
      activeResearchFocus = "All research";
      buildFilters(); updateCategoryStudyPanel(); updateResearchPanel(); updateSuggestions(); render(); searchInput.focus();
    });
  });

  resetSearchFromEmpty?.addEventListener("click", () => {
    searchInput.value = ""; activeCategory = "All"; activeResearchFocus = "All research";
    buildFilters(); updateCategoryStudyPanel(); updateResearchPanel(); suggestions.style.display = "none"; render(); searchInput.focus();
    document.getElementById("searchHeading")?.scrollIntoView({behavior:"smooth",block:"center"});
  });

  document.addEventListener("click", event => { if (!event.target.closest(".search-wrap")) suggestions.style.display = "none"; });
  clearSearch.addEventListener("click", () => { searchInput.value = ""; suggestions.style.display = "none"; searchInput.focus(); render(); });
  sortSelect.addEventListener("change", render);
  showAllCategories?.addEventListener("click", () => selectCategory("All", {scroll:false}));
  clearCategoryFilter?.addEventListener("click", () => selectCategory("All"));

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
    const pool = getFiltered();
    if (!pool.length) return;
    const item = pool[Math.floor(Math.random() * pool.length)];
    searchInput.value = item.word;
    render();
    setTimeout(() => {
      const card = grid.querySelector(".vocab-card");
      card?.scrollIntoView({behavior:"smooth",block:"center"});
      if (card && typeof card.animate === "function") {
        card.animate([{transform:"scale(1)"},{transform:"scale(1.025)"},{transform:"scale(1)"}],{duration:600});
      }
    },30);
  });

  function updateNotebookCount() {
    if (notebookCountBadge && StudentData) notebookCountBadge.textContent = StudentData.getNotebook().length;
  }

  window.addEventListener("medicalNotebookChanged", updateNotebookCount);
  buildFilters();
  updateCategoryStudyPanel();
  updateResearchPanel();
  updateNotebookCount();
  render();

  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();
})();
