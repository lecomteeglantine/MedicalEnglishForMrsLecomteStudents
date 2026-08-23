
(() => {
  const all = Array.isArray(window.MEDICAL_VOCABULARY) ? window.MEDICAL_VOCABULARY : [];
  const data = window.MedicalStudentData;

  const els = {
    deck: document.getElementById("deckSelect"),
    category: document.getElementById("flashCategory"),
    shuffle: document.getElementById("shuffleFlashcards"),
    position: document.getElementById("flashPosition"),
    known: document.getElementById("knownCount"),
    review: document.getElementById("reviewCount"),
    empty: document.getElementById("flashEmpty"),
    study: document.getElementById("flashStudy"),
    card: document.getElementById("flashcard"),
    categoryTag: document.getElementById("flashCategoryTag"),
    icon: document.getElementById("flashIcon"),
    word: document.getElementById("flashWord"),
    ipa: document.getElementById("flashIPA"),
    definition: document.getElementById("flashDefinition"),
    french: document.getElementById("flashFrench"),
    listen: document.getElementById("flashListen"),
    addNotebook: document.getElementById("addFlashNotebook"),
    knew: document.getElementById("knewIt"),
    reviewAgain: document.getElementById("reviewAgain"),
    prev: document.getElementById("prevFlash"),
    next: document.getElementById("nextFlash")
  };

  let deck = [];
  let index = 0;
  let flipped = false;

  const queryParams = new URLSearchParams(location.search);
  const source = queryParams.get("source");
  const requestedCategory = queryParams.get("category");
  if (source === "notebook") els.deck.value = "notebook";

  function baseDeck() {
    if (els.deck.value === "notebook") {
      const saved = new Set(data.getNotebook());
      return all.filter(item => saved.has(item.word));
    }
    return [...all];
  }

  function buildCategories() {
    const current = els.category.value || "All";
    const categories = ["All", ...new Set(baseDeck().map(item => item.category))];
    els.category.innerHTML = categories.map(cat => `<option value="${cat}">${cat}</option>`).join("");
    els.category.value = categories.includes(current) ? current : "All";
  }

  function buildDeck(resetIndex = true) {
    const category = els.category.value || "All";
    deck = baseDeck().filter(item => category === "All" || item.category === category);
    if (resetIndex) index = 0;
    if (index >= deck.length) index = 0;
    render();
  }

  function current() {
    return deck[index] || null;
  }

  function renderStats() {
    const progress = data.getFlashProgress();
    const relevant = new Set(deck.map(item => item.word));
    const known = Object.keys(progress.known).filter(word => relevant.has(word)).length;
    const review = Object.keys(progress.review).filter(word => relevant.has(word)).length;
    els.known.textContent = known;
    els.review.textContent = review;
    els.position.textContent = deck.length ? `${index + 1} / ${deck.length}` : "0 / 0";
  }

  function render() {
    const item = current();
    const empty = !item;
    els.empty.hidden = !empty;
    els.study.hidden = empty;
    renderStats();
    if (!item) return;

    flipped = false;
    els.card.classList.remove("is-flipped");
    els.categoryTag.textContent = item.category;
    els.icon.textContent = item.illustration || "🩺";
    els.word.textContent = item.word;
    els.ipa.textContent = item.ipa;
    els.definition.textContent = item.definition;
    els.french.textContent = item.fr;
    updateNotebookButton();
  }

  function updateNotebookButton() {
    const item = current();
    if (!item) return;
    const saved = data.hasWord(item.word);
    els.addNotebook.textContent = saved ? "★ Saved in notebook" : "☆ Add to notebook";
    els.addNotebook.setAttribute("aria-pressed", String(saved));
  }

  function flip() {
    flipped = !flipped;
    els.card.classList.toggle("is-flipped", flipped);
  }

  function go(delta) {
    if (!deck.length) return;
    index = (index + delta + deck.length) % deck.length;
    render();
  }

  function shuffle() {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    index = 0;
    render();
  }

  function getUKVoice() {
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /^en-GB$/i.test(v.lang)) ||
           voices.find(v => /en[-_]GB/i.test(v.lang)) ||
           voices.find(v => /^en/i.test(v.lang)) || null;
  }

  function speak() {
    const item = current();
    if (!item || !("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(item.word);
    u.lang = "en-GB";
    const voice = getUKVoice();
    if (voice) u.voice = voice;
    u.rate = .86;
    els.listen.classList.add("speaking");
    u.onend = () => els.listen.classList.remove("speaking");
    u.onerror = () => els.listen.classList.remove("speaking");
    speechSynthesis.speak(u);
  }

  els.card.addEventListener("click", flip);
  els.next.addEventListener("click", () => go(1));
  els.prev.addEventListener("click", () => go(-1));
  els.shuffle.addEventListener("click", shuffle);
  els.listen.addEventListener("click", speak);

  els.deck.addEventListener("change", () => {
    buildCategories();
    buildDeck();
  });
  els.category.addEventListener("change", () => buildDeck());

  els.knew.addEventListener("click", () => {
    const item = current();
    if (!item) return;
    data.markFlash(item.word, "known");
    renderStats();
    go(1);
  });

  els.reviewAgain.addEventListener("click", () => {
    const item = current();
    if (!item) return;
    data.markFlash(item.word, "review");
    renderStats();
    go(1);
  });

  els.addNotebook.addEventListener("click", () => {
    const item = current();
    if (!item) return;
    if (data.hasWord(item.word)) data.removeWord(item.word);
    else data.addWord(item.word);
    updateNotebookButton();
    if (els.deck.value === "notebook") {
      buildCategories();
      buildDeck(false);
    }
  });

  window.addEventListener("medicalNotebookChanged", () => {
    if (els.deck.value === "notebook") {
      buildCategories();
      buildDeck(false);
    }
  });

  buildCategories();
  if (requestedCategory && [...els.category.options].some(option => option.value === requestedCategory)) {
    els.category.value = requestedCategory;
  }
  buildDeck();
})();
