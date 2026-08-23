(() => {
  const STORAGE_KEY = "mrsLecomteFgsm3Day2PassportV20";
  const SOUND_KEY = "mrsLecomteFgsm3Day2Sound";

  const departureItems = [
    {
      tag: "SYSTEM QUESTION 1",
      prompt: "Before comparing healthcare systems, what should you identify about funding?",
      options: [
        { text: "Who pays for healthcare?", correct: true },
        { text: "Which medical speciality is most popular?", correct: false },
        { text: "How many hospitals have car parks?", correct: false }
      ],
      explanation: "Start with funding: taxation, insurance, direct patient payments or a mixture of these."
    },
    {
      tag: "SYSTEM QUESTION 2",
      prompt: "What is the next structural question?",
      options: [
        { text: "Who provides and organises the care?", correct: true },
        { text: "Which country has the newest hospitals?", correct: false },
        { text: "How long medical school lasts?", correct: false }
      ],
      explanation: "Funding and provision are not the same thing. A system can be publicly funded but use different providers."
    },
    {
      tag: "SYSTEM QUESTION 3",
      prompt: "Which question tells you whether access is universal?",
      options: [
        { text: "Who is covered?", correct: true },
        { text: "Who chooses the health minister?", correct: false },
        { text: "Who owns the ambulances?", correct: false }
      ],
      explanation: "Coverage tells you whether everyone is included or whether access depends on eligibility or insurance."
    },
    {
      tag: "SYSTEM QUESTION 4",
      prompt: "What should you ask to understand the patient's experience of access?",
      options: [
        { text: "What does the patient pay when they use care?", correct: true },
        { text: "What colour is the patient's health card?", correct: false },
        { text: "How many doctors work abroad?", correct: false }
      ],
      explanation: "A system may be universal without every service being completely free at the point of use."
    }
  ];

  const londonItems = [
    {
      phase: "BUILD THE NHS",
      tag: "FUNDING",
      prompt: "How is NHS care mainly funded?",
      options: [
        { text: "Mainly through general taxation and National Insurance", correct: true },
        { text: "Mainly through monthly private insurance premiums", correct: false },
        { text: "Mainly through hospital entrance fees", correct: false }
      ],
      model: "The NHS is funded mainly through general taxation and National Insurance.",
      explanation: "The UK card describes the NHS as tax-funded and publicly run."
    },
    {
      phase: "BUILD THE NHS",
      tag: "COVERAGE",
      prompt: "Which statement best describes access?",
      options: [
        { text: "Universal and free at the point of use for most care", correct: true },
        { text: "Only people with employer insurance are covered", correct: false },
        { text: "Hospital care is universal but GP care is private only", correct: false }
      ],
      model: "NHS care is universal and free at the point of use for most services.",
      explanation: "Some services can carry charges, but the core principle is universal access based on need."
    },
    {
      phase: "BUILD THE NHS",
      tag: "PRIVATE INSURANCE",
      prompt: "What role does private insurance play in the UK system?",
      options: [
        { text: "A small supplementary role, often used to skip waits or pay for extras", correct: true },
        { text: "It is the main way most people access healthcare", correct: false },
        { text: "It replaces the NHS for everyone over 65", correct: false }
      ],
      model: "Private insurance is supplementary rather than central to the NHS.",
      explanation: "The country card says private cover is held by a minority and is mainly supplementary."
    },
    {
      phase: "PATIENT JOURNEY",
      tag: "FIRST CONTACT",
      prompt: "A patient has a non-emergency problem and needs medical advice. Where would they usually start?",
      options: [
        { text: "With a GP at a local surgery", correct: true },
        { text: "Directly with NICE", correct: false },
        { text: "By buying private insurance first", correct: false }
      ],
      model: "For many non-emergency problems, the GP is the first point of contact.",
      explanation: "GP means general practitioner; a surgery is the GP practice or its premises."
    },
    {
      phase: "PATIENT JOURNEY",
      tag: "URGENT CARE",
      prompt: "Which term refers to the emergency department in UK English?",
      options: [
        { text: "A&E", correct: true },
        { text: "NICE", correct: false },
        { text: "National Insurance", correct: false }
      ],
      model: "A&E means Accident and Emergency, the emergency department.",
      explanation: "This is a key UK healthcare term from the Day 2 country card."
    },
    {
      phase: "REALITY CHECK",
      tag: "CHALLENGE",
      prompt: "Which is identified as a current NHS challenge?",
      options: [
        { text: "Long waiting lists for planned care", correct: true },
        { text: "No universal hospital coverage", correct: false },
        { text: "Private insurance is compulsory", correct: false }
      ],
      model: "Long waiting lists for planned care remain a major NHS challenge.",
      explanation: "The UK card also highlights staff shortages, funding pressure and regional variation."
    },
    {
      phase: "REALITY CHECK",
      tag: "STRENGTH",
      prompt: "Which principle is presented as a strength of the NHS?",
      options: [
        { text: "Care based on need rather than ability to pay", correct: true },
        { text: "Access depends on your employer", correct: false },
        { text: "Patients pay the full cost before reimbursement", correct: false }
      ],
      model: "A major strength is access based on need rather than ability to pay.",
      explanation: "The country card presents fairness and free-at-point-of-use care as key strengths."
    },
    {
      phase: "REALITY CHECK",
      tag: "TRUE OR FALSE",
      prompt: "Private insurance is the main way most people in the UK access healthcare.",
      options: [
        { text: "False", correct: true },
        { text: "True", correct: false }
      ],
      model: "False. The NHS is the central system; private insurance is supplementary.",
      explanation: "This distinction will become important when you compare the UK with the United States."
    },
    {
      phase: "BOARDING CHECK",
      tag: "SYSTEM SUMMARY",
      prompt: "Choose the best one-sentence summary of the UK system.",
      options: [
        { text: "A tax-funded, publicly run, universal system with most care free at the point of use", correct: true },
        { text: "A private-led, non-universal system centred on employer insurance", correct: false },
        { text: "A universal system funded mainly through patient co-payments", correct: false }
      ],
      model: "The NHS is a tax-funded, publicly run, universal system with most care free at the point of use.",
      explanation: "That is the core system profile you need before moving on to the next destination."
    }
  ];

  const defaults = {
    departureStarted: false,
    departureIndex: 0,
    departureScore: 0,
    departureMissed: [],
    departureComplete: false,
    londonStarted: false,
    londonIndex: 0,
    londonScore: 0,
    londonMissed: [],
    londonComplete: false
  };

  const $ = id => document.getElementById(id);
  const els = {
    startPassport: $("startPassport"),
    soundToggle: $("day2SoundToggle"),
    reset: $("resetDay2Progress"),
    audioStatus: $("day2AudioStatus"),
    passportClearance: $("passportClearance"),
    departureArea: $("departureArea"),
    departureScreen: $("departureScreen"),
    departureFeedback: $("departureFeedback"),
    departureCheckpoint: $("departureCheckpoint"),
    departureProgressBar: $("departureProgressBar"),
    departureBoardStatus: $("departureBoardStatus"),
    londonArea: $("londonArea"),
    startLondon: $("startLondon"),
    londonScreen: $("londonScreen"),
    londonFeedback: $("londonFeedback"),
    londonCheckpoint: $("londonCheckpoint"),
    londonProgressBar: $("londonProgressBar"),
    londonInstruction: $("londonInstruction"),
    routeUk: $("routeUk"),
    routeUkStatus: $("routeUkStatus"),
    stampDeparture: $("stampDeparture"),
    stampUk: $("stampUk")
  };

  let state = loadState();
  let soundOn = localStorage.getItem(SOUND_KEY) !== "off";

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return { ...defaults, ...saved };
    } catch {
      return { ...defaults };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setStatus(message) {
    if (!els.audioStatus) return;
    els.audioStatus.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => {
      if (els.audioStatus.textContent === message) els.audioStatus.textContent = "";
    }, 3200);
  }

  function chooseBritishVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => /^en-GB/i.test(v.lang) && /natural|premium|enhanced/i.test(v.name)) ||
      voices.find(v => /^en-GB/i.test(v.lang)) ||
      voices.find(v => /^en/i.test(v.lang)) ||
      null;
  }

  function speak(text) {
    if (!soundOn) {
      setStatus("Sound is off. The transcript remains visible.");
      return;
    }
    if (!("speechSynthesis" in window)) {
      setStatus("Speech synthesis is not available on this device.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.94;
    utterance.pitch = 1;
    const voice = chooseBritishVoice();
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  function playTone(kind = "good") {
    if (!soundOn) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = kind === "good" ? 660 : 260;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.17);
      osc.onended = () => ctx.close();
    } catch {}
  }

  function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function optionButtons(options, handler) {
    return shuffle(options).map(option => {
      const button = document.createElement("button");
      button.className = "passport-option";
      button.type = "button";
      button.textContent = option.text;
      button.addEventListener("click", () => handler(option, button));
      return button;
    });
  }

  function lockOptions(container) {
    container.querySelectorAll("button.passport-option").forEach(button => button.disabled = true);
  }

  function updateProgress() {
    const depDone = state.departureComplete ? 4 : Math.min(state.departureIndex, 4);
    els.departureCheckpoint.textContent = `${depDone} / 4`;
    els.departureProgressBar.style.width = `${(depDone / 4) * 100}%`;

    const lonDone = state.londonComplete ? 9 : Math.min(state.londonIndex, 9);
    els.londonCheckpoint.textContent = `${lonDone} / 9`;
    els.londonProgressBar.style.width = `${(lonDone / 9) * 100}%`;

    if (state.departureComplete) {
      els.passportClearance.textContent = state.londonComplete ? "London cleared" : "Issued";
      els.departureBoardStatus.textContent = "BOARDING";
      els.stampDeparture.classList.remove("stamp-empty");
      els.stampDeparture.classList.add("stamp-earned");
      els.londonArea.classList.remove("is-locked");
      els.startLondon.disabled = false;
      els.startLondon.textContent = state.londonStarted ? "Resume London →" : "Start London →";
      els.londonInstruction.textContent = state.londonComplete ? "London completed. Your NHS Navigator stamp has been issued." : "Passport issued. Your first international assignment is ready.";
    } else {
      els.passportClearance.textContent = "Not issued";
      els.departureBoardStatus.textContent = state.departureStarted ? "CHECKING" : "CHECK-IN";
      els.londonArea.classList.add("is-locked");
      els.startLondon.disabled = true;
      els.startLondon.textContent = "London locked";
    }

    if (state.londonComplete) {
      els.stampUk.classList.remove("stamp-empty");
      els.stampUk.classList.add("stamp-earned");
      els.routeUk.classList.remove("destination-next");
      els.routeUk.classList.add("destination-cleared");
      els.routeUkStatus.textContent = "CLEARED";
    } else {
      els.stampUk.classList.remove("stamp-earned");
      els.stampUk.classList.add("stamp-empty");
      els.routeUk.classList.remove("destination-cleared");
      els.routeUk.classList.add("destination-next");
      els.routeUkStatus.textContent = state.departureComplete ? "BOARDING" : "NEXT";
    }
  }

  function renderDeparture() {
    updateProgress();
    els.departureFeedback.innerHTML = "";

    if (!state.departureStarted) {
      els.departureScreen.innerHTML = `
        <div class="passport-waiting">
          <span aria-hidden="true">🛂</span>
          <h3>Passport not issued yet</h3>
          <p>Enter the Departure Lounge to begin your international rotation.</p>
        </div>`;
      return;
    }

    if (state.departureComplete) {
      const pct = Math.round((state.departureScore / 4) * 100);
      els.departureScreen.innerHTML = `
        <div class="passport-complete-card">
          <div class="passport-complete-icon" aria-hidden="true">🛂</div>
          <p class="passport-case-kicker">PASSPORT CONTROL CLEARED</p>
          <h3>Your Global Health Passport has been issued.</h3>
          <p>You identified the four questions that structure every destination: funding, provision, coverage and patient cost.</p>
          <div class="passport-score-line"><strong>${state.departureScore} / 4</strong><span>${pct}% first-attempt score</span></div>
          <button id="goLondon" class="passport-primary" type="button">Board for London →</button>
        </div>`;
      $("goLondon").addEventListener("click", () => {
        els.londonArea.scrollIntoView({ behavior: "smooth", block: "start" });
        els.startLondon.focus({ preventScroll: true });
      });
      return;
    }

    const item = departureItems[state.departureIndex];
    els.departureScreen.innerHTML = `
      <div class="passport-question-card">
        <div class="passport-question-meta"><span>${item.tag}</span><b>Passport Control</b></div>
        <h3>${item.prompt}</h3>
        <div id="departureOptions" class="passport-options"></div>
      </div>`;

    const optionWrap = $("departureOptions");
    optionButtons(item.options, (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.departureMissed.includes(state.departureIndex)) state.departureScore += 1;
        state.departureIndex += 1;
        if (state.departureIndex >= departureItems.length) state.departureComplete = true;
        saveState();
        playTone("good");
        els.departureFeedback.innerHTML = `<div class="feedback-good"><strong>Clearance accepted.</strong><span>${item.explanation}</span></div><button id="departureNext" class="passport-next" type="button">${state.departureComplete ? "Issue passport →" : "Next check →"}</button>`;
        $("departureNext").addEventListener("click", renderDeparture);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.departureMissed.includes(state.departureIndex)) state.departureMissed.push(state.departureIndex);
        saveState();
        playTone("bad");
        els.departureFeedback.innerHTML = `<div class="feedback-bad"><strong>Not this one.</strong><span>Think about the structure of access to care, not clinical medicine itself.</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startDeparture() {
    state.departureStarted = true;
    saveState();
    renderDeparture();
    els.departureArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.departureScreen.focus({ preventScroll: true }), 450);
  }

  function renderLondon() {
    updateProgress();
    els.londonFeedback.innerHTML = "";

    if (!state.departureComplete) return;

    if (!state.londonStarted) {
      els.londonScreen.innerHTML = `
        <div class="passport-waiting">
          <span aria-hidden="true">🇬🇧</span>
          <h3>Welcome to London</h3>
          <p>Your NHS assignment is ready. Start when you are ready.</p>
        </div>`;
      return;
    }

    if (state.londonComplete) {
      const pct = Math.round((state.londonScore / londonItems.length) * 100);
      els.londonScreen.innerHTML = `
        <div class="passport-complete-card london-complete">
          <div class="passport-complete-icon" aria-hidden="true">🇬🇧</div>
          <p class="passport-case-kicker">STOP 01 CLEARED</p>
          <h3>NHS Navigator</h3>
          <p>You can now explain the basic funding, coverage, access pathway, private-insurance role and major pressures in the UK system.</p>
          <div class="passport-score-line"><strong>${state.londonScore} / ${londonItems.length}</strong><span>${pct}% first-attempt score</span></div>
          <div class="passport-model-box">
            <span>MODEL SUMMARY</span>
            <p>“The NHS is a tax-funded, publicly run, universal system with most care free at the point of use.”</p>
            <button id="hearNhsSummary" class="passport-hear" type="button">🔊 Hear summary</button>
          </div>
          <div class="passport-next-route"><strong>Next stop</strong><span>🇺🇸 New York · Insurance Maze — coming in the next mission.</span></div>
        </div>`;
      $("hearNhsSummary").addEventListener("click", () => speak("The NHS is a tax-funded, publicly run, universal system with most care free at the point of use."));
      updateProgress();
      return;
    }

    const item = londonItems[state.londonIndex];
    els.londonScreen.innerHTML = `
      <div class="passport-question-card london-question">
        <div class="passport-question-meta"><span>${item.phase}</span><b>${item.tag}</b></div>
        <h3>${item.prompt}</h3>
        <div id="londonOptions" class="passport-options"></div>
      </div>`;

    const optionWrap = $("londonOptions");
    optionButtons(item.options, (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.londonMissed.includes(state.londonIndex)) state.londonScore += 1;
        state.londonIndex += 1;
        if (state.londonIndex >= londonItems.length) state.londonComplete = true;
        saveState();
        playTone("good");
        els.londonFeedback.innerHTML = `
          <div class="feedback-good"><strong>Correct.</strong><span>${item.explanation}</span></div>
          <div class="passport-transcript"><span>USEFUL ENGLISH</span><p>${item.model}</p><button id="hearLondonModel" class="passport-hear" type="button">🔊 Hear it</button></div>
          <button id="londonNext" class="passport-next" type="button">${state.londonComplete ? "Stamp passport →" : "Continue assignment →"}</button>`;
        $("hearLondonModel").addEventListener("click", () => speak(item.model));
        $("londonNext").addEventListener("click", renderLondon);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.londonMissed.includes(state.londonIndex)) state.londonMissed.push(state.londonIndex);
        saveState();
        playTone("bad");
        els.londonFeedback.innerHTML = `<div class="feedback-bad"><strong>Check the NHS briefing.</strong><span>Use the funding, access, vocabulary and strengths/challenges shown in this stop.</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startLondon() {
    if (!state.departureComplete) return;
    state.londonStarted = true;
    saveState();
    renderLondon();
    els.londonArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.londonScreen.focus({ preventScroll: true }), 450);
  }

  function resetProgress() {
    const ok = window.confirm("Reset all Day 2 Global Health Passport progress on this device?");
    if (!ok) return;
    state = { ...defaults };
    saveState();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    renderDeparture();
    renderLondon();
    updateProgress();
    setStatus("Day 2 progress reset.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncSoundButton() {
    els.soundToggle.setAttribute("aria-pressed", String(soundOn));
    els.soundToggle.textContent = soundOn ? "🔊 Sound ON" : "🔇 Sound OFF";
  }

  els.startPassport.addEventListener("click", startDeparture);
  els.startLondon.addEventListener("click", startLondon);
  els.reset.addEventListener("click", resetProgress);
  els.soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off");
    if (!soundOn && "speechSynthesis" in window) window.speechSynthesis.cancel();
    syncSoundButton();
    setStatus(soundOn ? "Sound on. British English speech will play when requested." : "Sound off. All spoken content remains available as text.");
  });

  if ("speechSynthesis" in window) {
    window.speechSynthesis.addEventListener?.("voiceschanged", chooseBritishVoice);
  }

  syncSoundButton();
  updateProgress();
  renderDeparture();
  renderLondon();
})();
