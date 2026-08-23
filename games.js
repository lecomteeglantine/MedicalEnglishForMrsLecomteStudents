(() => {
  const all = Array.isArray(window.MEDICAL_VOCABULARY)
    ? window.MEDICAL_VOCABULARY
    : [];

  const studentData = window.MedicalStudentData;
  const SCORE_KEY = "mrsLecomteMedicalEnglishGamesV1";

  const GAME_INFO = {
    matching: {
      title: "Match It!",
      kicker: "ENGLISH ↔ FRENCH",
      instructions: "Select one English term and one French translation. Match all the pairs with as few mistakes as possible."
    },
    definition: {
      title: "Definition Detective",
      kicker: "DEFINITION → TERM",
      instructions: "Read the definition, then choose the Medical English term that matches it."
    },
    translation: {
      title: "French ↔ English",
      kicker: "BILINGUAL CHALLENGE",
      instructions: "Choose the correct translation. The direction changes from question to question."
    },
    listening: {
      title: "Listen & Choose",
      kicker: "PRONUNCIATION",
      instructions: "Listen to the word, then choose the written term you heard. Use the text alternative if audio is not suitable for you."
    },
    spelling: {
      title: "Spell It!",
      kicker: "RETRIEVAL & SPELLING",
      instructions: "Use the definition and French translation to type the English Medical term."
    },
    odd: {
      title: "Odd One Out",
      kicker: "VOCABULARY CATEGORIES",
      instructions: "Three words belong to the same medical category. Choose the term that does not belong."
    }
  };

  const el = {
    source: document.getElementById("gameSource"),
    category: document.getElementById("gameCategory"),
    count: document.getElementById("gameQuestionCount"),
    poolStatus: document.getElementById("gamePoolStatus"),
    stage: document.getElementById("gameStage"),
    title: document.getElementById("activeGameTitle"),
    kicker: document.getElementById("activeGameKicker"),
    instructions: document.getElementById("activeGameInstructions"),
    close: document.getElementById("closeGame"),
    progress: document.getElementById("gameProgress"),
    score: document.getElementById("gameScore"),
    best: document.getElementById("gameBest"),
    feedback: document.getElementById("gameFeedback"),
    board: document.getElementById("gameBoard"),
    end: document.getElementById("gameEnd"),
    endTitle: document.getElementById("gameEndTitle"),
    endScore: document.getElementById("gameEndScore"),
    playAgain: document.getElementById("playAgain"),
    chooseAnother: document.getElementById("chooseAnother")
  };

  let currentGame = null;
  let state = null;
  const queryParams = new URLSearchParams(location.search);
  const requestedCategory = queryParams.get("category");

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function normalise(value) {
    return String(value ?? "")
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’']/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .replace(/\s+/g, " ");
  }

  function shuffled(values) {
    const arr = [...values];
    for (let i = arr.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function uniqueBy(values, keyFn) {
    const seen = new Set();
    return values.filter(item => {
      const key = keyFn(item);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  function basePool() {
    if (el.source.value === "notebook") {
      const saved = new Set(studentData?.getNotebook?.() || []);
      return all.filter(item => saved.has(item.word));
    }
    return [...all];
  }

  function selectedPool() {
    const category = el.category.value;
    const pool = basePool();
    return category && category !== "All"
      ? pool.filter(item => item.category === category)
      : pool;
  }

  function updateCategories() {
    const previous = el.category.value || "All";
    const categories = ["All", ...new Set(basePool().map(item => item.category))];

    el.category.innerHTML = categories
      .map(category => `<option value="${escapeHTML(category)}">${escapeHTML(category)}</option>`)
      .join("");

    el.category.value = categories.includes(previous) ? previous : "All";
    updatePoolStatus();
  }

  function updatePoolStatus() {
    const pool = selectedPool();
    const sourceText = el.source.value === "notebook"
      ? "your notebook"
      : "the dictionary";

    if (!pool.length) {
      el.poolStatus.innerHTML = `No terms are available in <strong>${sourceText}</strong> for this selection.`;
      return;
    }

    el.poolStatus.innerHTML = `<strong>${pool.length}</strong> terms available from ${sourceText}.`;
  }

  function readScores() {
    try {
      const parsed = JSON.parse(localStorage.getItem(SCORE_KEY));
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (_) {
      return {};
    }
  }

  function bestScore(game) {
    const value = Number(readScores()[game]);
    return Number.isFinite(value) ? value : null;
  }

  function saveBest(game, percent) {
    const scores = readScores();
    const old = Number(scores[game]);

    if (!Number.isFinite(old) || percent > old) {
      scores[game] = percent;
      try {
        localStorage.setItem(SCORE_KEY, JSON.stringify(scores));
      } catch (_) {}
    }

    renderBestScores();
  }

  function renderBestScores() {
    document.querySelectorAll("[data-best]").forEach(node => {
      const score = bestScore(node.dataset.best);
      node.textContent = score === null ? "Best: —" : `Best: ${score}%`;
    });

    if (currentGame) {
      const score = bestScore(currentGame);
      el.best.textContent = score === null ? "—" : `${score}%`;
    }
  }

  function setFeedback(message = "", type = "") {
    el.feedback.className = "game-feedback";
    if (type) el.feedback.classList.add(`is-${type}`);
    el.feedback.innerHTML = message;
  }

  function showStage(game) {
    const info = GAME_INFO[game];
    currentGame = game;
    el.title.textContent = info.title;
    el.kicker.textContent = info.kicker;
    el.instructions.textContent = info.instructions;
    el.stage.hidden = false;
    el.end.hidden = true;
    el.board.hidden = false;
    setFeedback();
    renderBestScores();

    el.stage.scrollIntoView({behavior: "smooth", block: "start"});
  }

  function hideStage() {
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    currentGame = null;
    state = null;
    el.stage.hidden = true;
    setFeedback();
    document.querySelector(".games-section-heading")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }

  function gameRequirements(game, pool) {
    if (game === "matching") {
      const usable = uniqueBy(pool, item => normalise(item.fr));
      return usable.length >= 4
        ? {ok: true}
        : {ok: false, message: "This game needs at least 4 different terms and translations in the selected set."};
    }

    if (["definition", "translation", "listening", "spelling"].includes(game)) {
      return pool.length >= 4
        ? {ok: true}
        : {ok: false, message: "This game needs at least 4 terms in the selected set."};
    }

    if (game === "odd") {
      const categories = [...new Set(basePool().map(item => item.category))];
      const targetCategories = categories.filter(category =>
        basePool().filter(item => item.category === category).length >= 3
      );

      return targetCategories.length >= 1 && categories.length >= 2
        ? {ok: true}
        : {ok: false, message: "Odd One Out needs at least two categories and three terms in one category."};
    }

    return {ok: true};
  }

  function startGame(game) {
    const pool = selectedPool();
    const requirement = gameRequirements(game, pool);

    showStage(game);

    if (!requirement.ok) {
      state = null;
      el.board.innerHTML = `
        <div class="game-message-card">
          <div aria-hidden="true">📓</div>
          <h3>Not enough vocabulary yet</h3>
          <p>${escapeHTML(requirement.message)}</p>
          <p>Choose another category, switch to <strong>All vocabulary</strong>, or add more terms to your notebook.</p>
        </div>`;
      el.progress.textContent = "0 / 0";
      el.score.textContent = "0";
      return;
    }

    if (game === "matching") {
      startMatching(pool);
      return;
    }

    state = {
      game,
      pool,
      index: 0,
      score: 0,
      total: Math.min(Number(el.count.value) || 10, Math.max(1, pool.length)),
      currentItem: null,
      answered: false
    };

    nextQuestion();
  }

  function updateStats() {
    if (!state) {
      el.progress.textContent = "0 / 0";
      el.score.textContent = "0";
      return;
    }

    if (state.game === "matching") {
      el.progress.textContent = `${state.matches} / ${state.total}`;
      el.score.textContent = String(state.matches);
      return;
    }

    el.progress.textContent = `${Math.min(state.index + 1, state.total)} / ${state.total}`;
    el.score.textContent = String(state.score);
  }

  function nextQuestion() {
    if (!state) return;

    if (state.index >= state.total) {
      finishRound(state.score, state.total);
      return;
    }

    state.answered = false;
    state.currentItem = shuffled(state.pool)[0];
    updateStats();
    setFeedback();

    if (state.game === "definition") renderDefinitionQuestion();
    if (state.game === "translation") renderTranslationQuestion();
    if (state.game === "listening") renderListeningQuestion();
    if (state.game === "spelling") renderSpellingQuestion();
    if (state.game === "odd") renderOddQuestion();
  }

  function distractors(item, count = 3, key = "word") {
    const selected = selectedPool();
    const sameCategory = selected.filter(other =>
      other.word !== item.word &&
      other.category === item.category
    );

    const wider = basePool().filter(other => other.word !== item.word);
    const candidates = uniqueBy(
      [...shuffled(sameCategory), ...shuffled(wider)],
      candidate => normalise(candidate[key])
    );

    return candidates.slice(0, count);
  }

  function renderChoices(choices, correctValue, onCorrect, labelFn = value => value) {
    el.board.innerHTML = `
      <div class="choice-grid">
        ${choices.map(value => `
          <button class="choice-btn" type="button" data-choice="${escapeHTML(value)}">
            ${escapeHTML(labelFn(value))}
          </button>
        `).join("")}
      </div>
      <div class="question-next-wrap">
        <button id="nextQuestionBtn" class="primary-game-btn" type="button" hidden>Next question →</button>
      </div>
    `;

    const buttons = [...el.board.querySelectorAll("[data-choice]")];
    const next = document.getElementById("nextQuestionBtn");

    buttons.forEach(button => {
      button.addEventListener("click", () => {
        if (state.answered) return;
        state.answered = true;

        const selected = button.dataset.choice;
        const correct = normalise(selected) === normalise(correctValue);

        buttons.forEach(candidate => {
          candidate.disabled = true;
          if (normalise(candidate.dataset.choice) === normalise(correctValue)) {
            candidate.classList.add("is-correct");
          }
        });

        if (correct) {
          button.classList.add("is-correct");
          state.score += 1;
          setFeedback("✓ Correct!", "correct");
          onCorrect?.(true);
        } else {
          button.classList.add("is-wrong");
          setFeedback(
            `Not quite. The correct answer is <strong>${escapeHTML(correctValue)}</strong>.`,
            "wrong"
          );
          onCorrect?.(false);
        }

        updateStats();
        next.hidden = false;
        next.focus();
      });
    });

    next.addEventListener("click", () => {
      state.index += 1;
      nextQuestion();
    });
  }

  function renderDefinitionQuestion() {
    const item = state.currentItem;
    const choices = shuffled([
      item.word,
      ...distractors(item, 3, "word").map(candidate => candidate.word)
    ]);

    el.board.innerHTML = `
      <div class="question-card definition-question-card">
        <span class="question-label">Which term matches this definition?</span>
        <p class="definition-clue">${escapeHTML(item.definition)}</p>
        <span class="question-category">${escapeHTML(item.category)}</span>
      </div>
      <div id="choiceMount"></div>
    `;

    const mount = document.getElementById("choiceMount");
    const previousBoard = el.board;
    const temp = document.createElement("div");
    previousBoard.appendChild(temp);

    // renderChoices writes to board, so preserve question HTML and append choices manually.
    const questionHTML = previousBoard.firstElementChild.outerHTML;
    renderChoices(choices, item.word);
    el.board.insertAdjacentHTML("afterbegin", questionHTML);
  }

  function renderTranslationQuestion() {
    const item = state.currentItem;
    const enToFr = Math.random() < 0.5;

    if (enToFr) {
      const alternatives = distractors(item, 3, "fr");
      const choices = uniqueBy(
        [item, ...alternatives],
        candidate => normalise(candidate.fr)
      ).map(candidate => candidate.fr);

      const filled = [...choices];
      if (filled.length < 4) {
        basePool().forEach(candidate => {
          if (
            filled.length < 4 &&
            candidate.word !== item.word &&
            !filled.some(value => normalise(value) === normalise(candidate.fr))
          ) {
            filled.push(candidate.fr);
          }
        });
      }

      const prompt = `
        <div class="question-card translation-question-card">
          <span class="question-label">English → French</span>
          <h3>${escapeHTML(item.word)}</h3>
          <p class="ipa">${escapeHTML(item.ipa)}</p>
        </div>`;

      renderChoices(shuffled(filled.slice(0, 4)), item.fr);
      el.board.insertAdjacentHTML("afterbegin", prompt);
    } else {
      const choices = shuffled([
        item.word,
        ...distractors(item, 3, "word").map(candidate => candidate.word)
      ]);

      const prompt = `
        <div class="question-card translation-question-card">
          <span class="question-label">French → English</span>
          <h3>${escapeHTML(item.fr)}</h3>
        </div>`;

      renderChoices(choices, item.word);
      el.board.insertAdjacentHTML("afterbegin", prompt);
    }
  }

  function getUKVoice() {
    if (!("speechSynthesis" in window)) return null;

    const voices = speechSynthesis.getVoices();
    return (
      voices.find(voice => /^en-GB$/i.test(voice.lang)) ||
      voices.find(voice => /en[-_]GB/i.test(voice.lang)) ||
      voices.find(voice => /^en/i.test(voice.lang)) ||
      null
    );
  }

  function speakWord(word, button) {
    if (!("speechSynthesis" in window)) return false;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-GB";
    const voice = getUKVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.84;

    button?.classList.add("speaking");
    utterance.onend = () => button?.classList.remove("speaking");
    utterance.onerror = () => button?.classList.remove("speaking");

    speechSynthesis.speak(utterance);
    return true;
  }

  function renderListeningQuestion() {
    const item = state.currentItem;
    const choices = shuffled([
      item.word,
      ...distractors(item, 3, "word").map(candidate => candidate.word)
    ]);

    const prompt = `
      <div class="question-card listening-question-card">
        <span class="question-label">Which word do you hear?</span>
        <div class="listen-game-actions">
          <button id="playWordAudio" class="listen-big-btn" type="button">🔊 Play word</button>
          <button id="showListeningAlternative" class="secondary-btn" type="button" aria-expanded="false">Use text clue instead</button>
        </div>
        <div id="listeningAlternative" class="listening-alternative" hidden>
          <span class="info-label">Text alternative</span>
          <p>${escapeHTML(item.definition)}</p>
        </div>
      </div>`;

    renderChoices(choices, item.word);
    el.board.insertAdjacentHTML("afterbegin", prompt);

    const play = document.getElementById("playWordAudio");
    const altButton = document.getElementById("showListeningAlternative");
    const alt = document.getElementById("listeningAlternative");

    play.addEventListener("click", () => {
      const worked = speakWord(item.word, play);
      if (!worked) {
        alt.hidden = false;
        altButton.setAttribute("aria-expanded", "true");
        setFeedback("Audio is not available in this browser. The text clue is shown instead.", "info");
      }
    });

    altButton.addEventListener("click", () => {
      alt.hidden = !alt.hidden;
      altButton.setAttribute("aria-expanded", String(!alt.hidden));
      altButton.textContent = alt.hidden ? "Use text clue instead" : "Hide text clue";
    });

    // Play automatically only when the browser can do so; no penalty if it cannot.
    setTimeout(() => speakWord(item.word, play), 120);
  }

  function spellingHint(word) {
    return word
      .split(/\s+/)
      .map(part => {
        if (!part) return "";
        const first = part[0];
        const rest = "•".repeat(Math.max(1, part.length - 1));
        return `${first}${rest}`;
      })
      .join(" ");
  }

  function renderSpellingQuestion() {
    const item = state.currentItem;

    el.board.innerHTML = `
      <div class="question-card spelling-question-card">
        <span class="question-label">Type the English medical term</span>
        <p class="definition-clue">${escapeHTML(item.definition)}</p>
        <div class="spelling-french"><strong>Français:</strong> ${escapeHTML(item.fr)}</div>
        <div id="spellingHint" class="spelling-hint" hidden>
          <strong>Hint:</strong> ${escapeHTML(spellingHint(item.word))}
        </div>
      </div>

      <form id="spellingForm" class="spelling-form">
        <label for="spellingInput">Your answer</label>
        <div class="spelling-input-row">
          <input id="spellingInput" type="text" autocomplete="off" autocapitalize="none" spellcheck="false">
          <button class="primary-game-btn" type="submit">Check</button>
        </div>
        <div class="spelling-help-actions">
          <button id="showSpellingHint" class="secondary-btn" type="button">Show hint</button>
          <button id="revealSpellingAnswer" class="secondary-btn" type="button">Reveal answer</button>
        </div>
      </form>

      <div class="question-next-wrap">
        <button id="nextQuestionBtn" class="primary-game-btn" type="button" hidden>Next question →</button>
      </div>
    `;

    const form = document.getElementById("spellingForm");
    const input = document.getElementById("spellingInput");
    const hint = document.getElementById("spellingHint");
    const hintButton = document.getElementById("showSpellingHint");
    const reveal = document.getElementById("revealSpellingAnswer");
    const next = document.getElementById("nextQuestionBtn");

    input.focus();

    hintButton.addEventListener("click", () => {
      hint.hidden = false;
      hintButton.disabled = true;
    });

    reveal.addEventListener("click", () => {
      if (state.answered) return;
      state.answered = true;
      input.value = item.word;
      input.disabled = true;
      form.querySelector('[type="submit"]').disabled = true;
      hintButton.disabled = true;
      reveal.disabled = true;
      setFeedback(`Answer: <strong>${escapeHTML(item.word)}</strong>`, "info");
      next.hidden = false;
      next.focus();
    });

    form.addEventListener("submit", event => {
      event.preventDefault();
      if (state.answered) return;

      const answer = input.value.trim();
      if (!answer) {
        setFeedback("Type an answer first.", "info");
        input.focus();
        return;
      }

      state.answered = true;
      const correct = normalise(answer) === normalise(item.word);

      input.disabled = true;
      form.querySelector('[type="submit"]').disabled = true;
      hintButton.disabled = true;
      reveal.disabled = true;

      if (correct) {
        state.score += 1;
        input.classList.add("is-correct-input");
        setFeedback("✓ Correct!", "correct");
      } else {
        input.classList.add("is-wrong-input");
        setFeedback(
          `The correct answer is <strong>${escapeHTML(item.word)}</strong>.`,
          "wrong"
        );
      }

      updateStats();
      next.hidden = false;
      next.focus();
    });

    next.addEventListener("click", () => {
      state.index += 1;
      nextQuestion();
    });
  }

  function buildOddQuestion() {
    const source = basePool();
    const selectedCategory = el.category.value;

    let possibleTargets = [...new Set(source.map(item => item.category))]
      .filter(category => source.filter(item => item.category === category).length >= 3);

    if (selectedCategory && selectedCategory !== "All") {
      possibleTargets = possibleTargets.filter(category => category === selectedCategory);
    }

    if (!possibleTargets.length) return null;

    const targetCategory = shuffled(possibleTargets)[0];
    const targetItems = shuffled(
      source.filter(item => item.category === targetCategory)
    ).slice(0, 3);

    const outsiders = source.filter(item => item.category !== targetCategory);
    if (!outsiders.length) return null;

    const odd = shuffled(outsiders)[0];

    return {
      targetCategory,
      odd,
      choices: shuffled([...targetItems, odd])
    };
  }

  function renderOddQuestion() {
    const question = buildOddQuestion();

    if (!question) {
      finishRound(state.score, Math.max(1, state.index));
      return;
    }

    const prompt = `
      <div class="question-card odd-question-card">
        <span class="question-label">Which term does NOT belong?</span>
        <h3>${escapeHTML(question.targetCategory)}</h3>
        <p>Three terms belong to this category. One does not.</p>
      </div>`;

    renderChoices(
      question.choices.map(item => item.word),
      question.odd.word,
      correct => {
        if (!correct) {
          setFeedback(
            `The odd one out is <strong>${escapeHTML(question.odd.word)}</strong> — it belongs to <strong>${escapeHTML(question.odd.category)}</strong>.`,
            "wrong"
          );
        } else {
          setFeedback(
            `✓ Correct! <strong>${escapeHTML(question.odd.word)}</strong> belongs to ${escapeHTML(question.odd.category)}.`,
            "correct"
          );
        }
      }
    );

    el.board.insertAdjacentHTML("afterbegin", prompt);
  }

  function startMatching(pool) {
    const usable = uniqueBy(shuffled(pool), item => normalise(item.fr));
    const pairCount = Math.min(6, usable.length);
    const pairs = usable.slice(0, pairCount);

    state = {
      game: "matching",
      pairs,
      total: pairs.length,
      matches: 0,
      mistakes: 0,
      selectedWord: null,
      selectedFrench: null
    };

    renderMatching();
  }

  function renderMatching() {
    const words = shuffled(state.pairs);
    const translations = shuffled(state.pairs);

    el.board.innerHTML = `
      <div class="matching-board">
        <section class="matching-column" aria-labelledby="matchingEnglishHeading">
          <h3 id="matchingEnglishHeading">English</h3>
          <div class="matching-buttons">
            ${words.map(item => `
              <button type="button" class="match-btn" data-match-word="${escapeHTML(item.word)}" aria-pressed="false">
                ${escapeHTML(item.word)}
              </button>
            `).join("")}
          </div>
        </section>

        <section class="matching-column" aria-labelledby="matchingFrenchHeading">
          <h3 id="matchingFrenchHeading">Français</h3>
          <div class="matching-buttons">
            ${translations.map(item => `
              <button type="button" class="match-btn" data-match-french="${escapeHTML(item.word)}" aria-pressed="false">
                ${escapeHTML(item.fr)}
              </button>
            `).join("")}
          </div>
        </section>
      </div>
    `;

    updateStats();
    setFeedback("Choose one item from each column.", "info");

    const wordButtons = [...el.board.querySelectorAll("[data-match-word]")];
    const frenchButtons = [...el.board.querySelectorAll("[data-match-french]")];

    function clearSelected(group) {
      group.forEach(button => {
        if (!button.classList.contains("is-matched")) {
          button.classList.remove("is-selected");
          button.setAttribute("aria-pressed", "false");
        }
      });
    }

    function checkPair() {
      if (!state.selectedWord || !state.selectedFrench) return;

      const wordButton = wordButtons.find(button =>
        button.dataset.matchWord === state.selectedWord
      );
      const frenchButton = frenchButtons.find(button =>
        button.dataset.matchFrench === state.selectedFrench
      );

      if (state.selectedWord === state.selectedFrench) {
        wordButton.classList.remove("is-selected");
        frenchButton.classList.remove("is-selected");
        wordButton.classList.add("is-matched");
        frenchButton.classList.add("is-matched");
        wordButton.disabled = true;
        frenchButton.disabled = true;
        wordButton.setAttribute("aria-pressed", "true");
        frenchButton.setAttribute("aria-pressed", "true");
        state.matches += 1;
        setFeedback("✓ Match!", "correct");
      } else {
        state.mistakes += 1;
        wordButton.classList.add("is-wrong");
        frenchButton.classList.add("is-wrong");
        setFeedback("Not a match. Try again.", "wrong");

        setTimeout(() => {
          wordButton.classList.remove("is-wrong");
          frenchButton.classList.remove("is-wrong");
        }, 500);
      }

      state.selectedWord = null;
      state.selectedFrench = null;
      clearSelected(wordButtons);
      clearSelected(frenchButtons);
      updateStats();

      if (state.matches >= state.total) {
        const attempts = state.matches + state.mistakes;
        const percent = Math.max(
          0,
          Math.round((state.matches / Math.max(1, attempts)) * 100)
        );
        setTimeout(() => finishRound(percent, 100, true), 350);
      }
    }

    wordButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (button.disabled) return;
        clearSelected(wordButtons);
        button.classList.add("is-selected");
        button.setAttribute("aria-pressed", "true");
        state.selectedWord = button.dataset.matchWord;
        checkPair();
      });
    });

    frenchButtons.forEach(button => {
      button.addEventListener("click", () => {
        if (button.disabled) return;
        clearSelected(frenchButtons);
        button.classList.add("is-selected");
        button.setAttribute("aria-pressed", "true");
        state.selectedFrench = button.dataset.matchFrench;
        checkPair();
      });
    });
  }

  function finishRound(value, total, alreadyPercent = false) {
    if (!currentGame) return;

    if ("speechSynthesis" in window) speechSynthesis.cancel();

    const percent = alreadyPercent
      ? Math.round(value)
      : Math.round((value / Math.max(1, total)) * 100);

    saveBest(currentGame, percent);

    el.board.hidden = true;
    el.end.hidden = false;
    setFeedback();

    let message = "Good work — keep revising.";
    if (percent === 100) message = "Perfect score!";
    else if (percent >= 80) message = "Excellent work!";
    else if (percent >= 60) message = "Good progress!";
    else if (percent >= 40) message = "Getting there — another round will help.";
    else message = "Keep going — retrieval gets stronger with practice.";

    el.endTitle.textContent = message;
    el.endScore.innerHTML = `You scored <strong>${percent}%</strong>. Your best score for this game is <strong>${bestScore(currentGame)}%</strong>.`;
    el.progress.textContent = "Complete";
    el.best.textContent = `${bestScore(currentGame)}%`;
    el.end.querySelector("#playAgain")?.focus();
  }

  document.querySelectorAll("[data-game]").forEach(button => {
    button.addEventListener("click", () => startGame(button.dataset.game));
  });

  el.source.addEventListener("change", () => {
    updateCategories();
    if (currentGame) hideStage();
  });

  el.category.addEventListener("change", () => {
    updatePoolStatus();
    if (currentGame) hideStage();
  });

  el.count.addEventListener("change", () => {
    if (currentGame) hideStage();
  });

  el.close.addEventListener("click", hideStage);
  el.chooseAnother.addEventListener("click", hideStage);
  el.playAgain.addEventListener("click", () => {
    if (currentGame) startGame(currentGame);
  });

  window.addEventListener("medicalNotebookChanged", () => {
    if (el.source.value === "notebook") updateCategories();
  });

  updateCategories();
  if (requestedCategory && [...el.category.options].some(option => option.value === requestedCategory)) {
    el.category.value = requestedCategory;
    updatePoolStatus();
  }
  renderBestScores();
})();
