(() => {
  // Keep the original Day 2 storage key so V20 progress survives the V21 update.
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
      explanation: "This distinction becomes important when you compare the UK with the United States."
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

  const newYorkItems = [
    {
      phase: "INSURANCE DESK",
      tag: "PREMIUM",
      prompt: "An insurance document mentions a premium. What is it?",
      options: [
        { text: "What you pay each month for insurance", correct: true },
        { text: "A fixed fee paid for every hospital bed", correct: false },
        { text: "The amount the government pays your employer", correct: false }
      ],
      model: "A premium is what you pay each month for insurance.",
      explanation: "Premium is one of the key cost terms on the US country card."
    },
    {
      phase: "INSURANCE DESK",
      tag: "DEDUCTIBLE",
      prompt: "What does deductible mean in this system?",
      options: [
        { text: "What you pay yourself before insurance starts paying", correct: true },
        { text: "The monthly price of an insurance plan", correct: false },
        { text: "A government subsidy for prescriptions", correct: false }
      ],
      model: "A deductible is what you pay yourself before insurance starts paying.",
      explanation: "Do not confuse a deductible with a premium or a co-pay."
    },
    {
      phase: "INSURANCE DESK",
      tag: "CO-PAY",
      prompt: "A patient is asked for a co-pay. Which definition fits?",
      options: [
        { text: "A fixed fee per visit or per drug", correct: true },
        { text: "A yearly tax paid to Medicare", correct: false },
        { text: "The full price of any treatment received", correct: false }
      ],
      model: "A co-pay is a fixed fee per visit or per drug.",
      explanation: "The country card distinguishes co-pay from premium and deductible."
    },
    {
      phase: "INSURANCE DESK",
      tag: "OUT-OF-NETWORK",
      prompt: "A specialist is described as out-of-network. What does that mean?",
      options: [
        { text: "The provider has no deal with the insurer, so it costs more", correct: true },
        { text: "The provider works outside the United States", correct: false },
        { text: "The provider only treats uninsured patients", correct: false }
      ],
      model: "An out-of-network provider has no agreement with your insurer, so care costs more.",
      explanation: "In the US card, network status is directly linked to patient cost."
    },
    {
      phase: "WHO COVERS WHOM?",
      tag: "PATIENT PROFILE · 72",
      prompt: "A 72-year-old retiree asks which public programme is specifically associated with people aged 65 and over.",
      options: [
        { text: "Medicare", correct: true },
        { text: "Medicaid", correct: false },
        { text: "National Insurance", correct: false }
      ],
      model: "Medicare provides federal cover for people aged 65 and over.",
      explanation: "The US card identifies Medicare with the 65+ group."
    },
    {
      phase: "WHO COVERS WHOM?",
      tag: "PATIENT PROFILE · LOW INCOME",
      prompt: "Which public programme on the country card is associated with low incomes?",
      options: [
        { text: "Medicaid", correct: true },
        { text: "Medicare", correct: false },
        { text: "NICE", correct: false }
      ],
      model: "Medicaid provides cover for people on low incomes.",
      explanation: "Medicare and Medicaid sound similar, but the card links them to different groups."
    },
    {
      phase: "WHO COVERS WHOM?",
      tag: "PATIENT PROFILE · EMPLOYED",
      prompt: "According to the country card, how are most people in the United States covered?",
      options: [
        { text: "Through their employer's insurance", correct: true },
        { text: "Automatically through one universal public insurer", correct: false },
        { text: "Only through direct payment at the hospital", correct: false }
      ],
      model: "Most people are covered through their employer's insurance.",
      explanation: "Employer-linked insurance is central to the private-led US system described in your card."
    },
    {
      phase: "ACCESS CHECK",
      tag: "COVERAGE",
      prompt: "Is healthcare coverage universal in the US system described in the card?",
      options: [
        { text: "No — some people remain uninsured or under-insured", correct: true },
        { text: "Yes — everyone is automatically fully covered", correct: false },
        { text: "Yes — but only hospital care is universal", correct: false }
      ],
      model: "Coverage is not universal, and some people remain uninsured or under-insured.",
      explanation: "This is one of the clearest structural contrasts with the NHS."
    },
    {
      phase: "REALITY CHECK",
      tag: "COST & INEQUALITY",
      prompt: "Which challenge is explicitly highlighted on the US country card?",
      options: [
        { text: "Very high health costs, medical debt and inequality", correct: true },
        { text: "A ban on private insurance", correct: false },
        { text: "Universal cover but no choice of providers", correct: false }
      ],
      model: "The US combines very high healthcare costs with gaps in coverage and medical debt.",
      explanation: "The card lists high costs, millions uninsured or under-insured, medical debt and deep inequality as challenges."
    },
    {
      phase: "COMPARE WITH LONDON",
      tag: "SPENDING & PRIVATE INSURANCE",
      prompt: "Which comparison matches the two country cards?",
      options: [
        { text: "The US spends a larger share of GDP on health and relies much more on private insurance", correct: true },
        { text: "The UK spends more and private insurance is central to the NHS", correct: false },
        { text: "Both systems are universal and private insurance plays the same role", correct: false }
      ],
      model: "The United States spends a larger share of GDP on healthcare and relies far more heavily on private insurance than the UK.",
      explanation: "The cards give about 17% of GDP for the US versus about 10–11% for the UK, with private insurance central in the US but supplementary in the UK."
    },
    {
      phase: "BOARDING CHECK",
      tag: "SYSTEM SUMMARY",
      prompt: "Choose the best one-sentence summary of the US system in your country card.",
      options: [
        { text: "A mixed, private-led, non-universal system with employer insurance central and public programmes for specific groups", correct: true },
        { text: "A tax-funded, publicly run universal service free at the point of use", correct: false },
        { text: "A single-payer provincial system covering hospital and doctor care", correct: false }
      ],
      model: "The US has a mixed, private-led system in which employer insurance is central, public programmes cover specific groups, and coverage is not universal.",
      explanation: "You now have the core profile needed to compare the United States with the next destinations."
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
    londonComplete: false,
    newYorkStarted: false,
    newYorkIndex: 0,
    newYorkScore: 0,
    newYorkMissed: [],
    newYorkComplete: false
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
    newYorkArea: $("newYorkArea"),
    startNewYork: $("startNewYork"),
    newYorkScreen: $("newYorkScreen"),
    newYorkFeedback: $("newYorkFeedback"),
    newYorkCheckpoint: $("newYorkCheckpoint"),
    newYorkProgressBar: $("newYorkProgressBar"),
    newYorkInstruction: $("newYorkInstruction"),
    routeUk: $("routeUk"),
    routeUkStatus: $("routeUkStatus"),
    routeUs: $("routeUs"),
    routeUsStatus: $("routeUsStatus"),
    routeCa: $("routeCa"),
    routeCaStatus: $("routeCaStatus"),
    stampDeparture: $("stampDeparture"),
    stampUk: $("stampUk"),
    stampUs: $("stampUs"),
    stampCa: $("stampCa")
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

    const lonDone = state.londonComplete ? londonItems.length : Math.min(state.londonIndex, londonItems.length);
    els.londonCheckpoint.textContent = `${lonDone} / ${londonItems.length}`;
    els.londonProgressBar.style.width = `${(lonDone / londonItems.length) * 100}%`;

    const nyDone = state.newYorkComplete ? newYorkItems.length : Math.min(state.newYorkIndex, newYorkItems.length);
    els.newYorkCheckpoint.textContent = `${nyDone} / ${newYorkItems.length}`;
    els.newYorkProgressBar.style.width = `${(nyDone / newYorkItems.length) * 100}%`;

    if (state.departureComplete) {
      els.passportClearance.textContent = state.newYorkComplete ? "New York cleared" : state.londonComplete ? "London cleared" : "Issued";
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
      els.newYorkArea.classList.remove("is-locked");
      els.startNewYork.disabled = false;
      els.startNewYork.textContent = state.newYorkStarted ? "Resume New York →" : "Enter Insurance Maze →";
      els.newYorkInstruction.textContent = state.newYorkComplete ? "New York completed. Your Insurance Decoder stamp has been issued." : "London cleared. Your US insurance assignment is ready.";
      if (!state.newYorkComplete) {
        els.routeUs.classList.remove("destination-locked", "destination-cleared");
        els.routeUs.classList.add("destination-next");
        els.routeUsStatus.textContent = state.newYorkStarted ? "IN PROGRESS" : "NEXT";
      }
    } else {
      els.stampUk.classList.remove("stamp-earned");
      els.stampUk.classList.add("stamp-empty");
      els.routeUk.classList.remove("destination-cleared");
      els.routeUk.classList.add("destination-next");
      els.routeUkStatus.textContent = state.departureComplete ? "BOARDING" : "NEXT";
      els.newYorkArea.classList.add("is-locked");
      els.startNewYork.disabled = true;
      els.startNewYork.textContent = "New York locked";
      els.routeUs.classList.remove("destination-next", "destination-cleared");
      els.routeUs.classList.add("destination-locked");
      els.routeUsStatus.textContent = "LOCKED";
    }

    if (state.newYorkComplete) {
      els.stampUs.classList.remove("stamp-empty");
      els.stampUs.classList.add("stamp-earned");
      els.routeUs.classList.remove("destination-next", "destination-locked");
      els.routeUs.classList.add("destination-cleared");
      els.routeUsStatus.textContent = "CLEARED";
      els.routeCa.classList.remove("destination-locked");
      els.routeCa.classList.add("destination-next");
      els.routeCaStatus.textContent = "NEXT";
    } else {
      els.stampUs.classList.remove("stamp-earned");
      els.stampUs.classList.add("stamp-empty");
      els.routeCa.classList.remove("destination-next", "destination-cleared");
      els.routeCa.classList.add("destination-locked");
      els.routeCaStatus.textContent = "LOCKED";
    }
  }

  function renderDeparture() {
    updateProgress();
    els.departureFeedback.innerHTML = "";

    if (!state.departureStarted) {
      els.departureScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🛂</span><h3>Passport not issued yet</h3><p>Enter the Departure Lounge to begin your international rotation.</p></div>`;
      return;
    }

    if (state.departureComplete) {
      const pct = Math.round((state.departureScore / departureItems.length) * 100);
      els.departureScreen.innerHTML = `<div class="passport-complete-card"><div class="passport-complete-icon" aria-hidden="true">🛂</div><p class="passport-case-kicker">PASSPORT CONTROL CLEARED</p><h3>Your Global Health Passport has been issued.</h3><p>You identified the four questions that structure every destination: funding, provision, coverage and patient cost.</p><div class="passport-score-line"><strong>${state.departureScore} / ${departureItems.length}</strong><span>${pct}% first-attempt score</span></div><button id="goLondon" class="passport-primary" type="button">Board for London →</button></div>`;
      $("goLondon").addEventListener("click", () => {
        els.londonArea.scrollIntoView({ behavior: "smooth", block: "start" });
        els.startLondon.focus({ preventScroll: true });
      });
      return;
    }

    const item = departureItems[state.departureIndex];
    els.departureScreen.innerHTML = `<div class="passport-question-card"><div class="passport-question-meta"><span>${item.tag}</span><b>Passport Control</b></div><h3>${item.prompt}</h3><div id="departureOptions" class="passport-options"></div></div>`;
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
      els.londonScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🇬🇧</span><h3>Welcome to London</h3><p>Your NHS assignment is ready. Start when you are ready.</p></div>`;
      return;
    }

    if (state.londonComplete) {
      const pct = Math.round((state.londonScore / londonItems.length) * 100);
      els.londonScreen.innerHTML = `<div class="passport-complete-card london-complete"><div class="passport-complete-icon" aria-hidden="true">🇬🇧</div><p class="passport-case-kicker">STOP 01 CLEARED</p><h3>NHS Navigator</h3><p>You can explain the basic funding, coverage, access pathway, private-insurance role and major pressures in the UK system.</p><div class="passport-score-line"><strong>${state.londonScore} / ${londonItems.length}</strong><span>${pct}% first-attempt score</span></div><div class="passport-model-box"><span>MODEL SUMMARY</span><p>“The NHS is a tax-funded, publicly run, universal system with most care free at the point of use.”</p><button id="hearNhsSummary" class="passport-hear" type="button">🔊 Hear summary</button></div><div class="passport-next-route"><strong>Next stop</strong><span>🇺🇸 New York · The Insurance Maze is ready.</span></div><button id="goNewYork" class="passport-primary" type="button">Fly to New York →</button></div>`;
      $("hearNhsSummary").addEventListener("click", () => speak("The NHS is a tax-funded, publicly run, universal system with most care free at the point of use."));
      $("goNewYork").addEventListener("click", () => {
        els.newYorkArea.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => els.startNewYork.focus({ preventScroll: true }), 450);
      });
      updateProgress();
      return;
    }

    const item = londonItems[state.londonIndex];
    els.londonScreen.innerHTML = `<div class="passport-question-card london-question"><div class="passport-question-meta"><span>${item.phase}</span><b>${item.tag}</b></div><h3>${item.prompt}</h3><div id="londonOptions" class="passport-options"></div></div>`;
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
        els.londonFeedback.innerHTML = `<div class="feedback-good"><strong>Correct.</strong><span>${item.explanation}</span></div><div class="passport-transcript"><span>USEFUL ENGLISH</span><p>${item.model}</p><button id="hearLondonModel" class="passport-hear" type="button">🔊 Hear it</button></div><button id="londonNext" class="passport-next" type="button">${state.londonComplete ? "Stamp passport →" : "Continue assignment →"}</button>`;
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

  function renderNewYork() {
    updateProgress();
    els.newYorkFeedback.innerHTML = "";
    if (!state.londonComplete) return;

    if (!state.newYorkStarted) {
      els.newYorkScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🇺🇸</span><h3>Welcome to New York</h3><p>Your insurance-decoding assignment is ready. You will need to understand cost vocabulary, coverage pathways and the contrast with the NHS.</p></div>`;
      return;
    }

    if (state.newYorkComplete) {
      const pct = Math.round((state.newYorkScore / newYorkItems.length) * 100);
      els.newYorkScreen.innerHTML = `<div class="passport-complete-card us-complete"><div class="passport-complete-icon" aria-hidden="true">🇺🇸</div><p class="passport-case-kicker">STOP 02 CLEARED</p><h3>Insurance Decoder</h3><p>You can distinguish premium, deductible, co-pay and out-of-network costs, identify the roles of employer insurance, Medicare and Medicaid, and explain why the US system is not universal.</p><div class="passport-score-line"><strong>${state.newYorkScore} / ${newYorkItems.length}</strong><span>${pct}% first-attempt score</span></div><div class="passport-model-box"><span>MODEL SUMMARY</span><p>“The US has a mixed, private-led system in which employer insurance is central, public programmes cover specific groups, and coverage is not universal.”</p><button id="hearUsSummary" class="passport-hear" type="button">🔊 Hear summary</button></div><div class="comparison-ticket"><span>🇬🇧 LONDON</span><b>Private insurance: supplementary</b><span>↔</span><b>Private insurance: central</b><span>🇺🇸 NEW YORK</span></div><div class="passport-next-route"><strong>Next stop</strong><span>🇨🇦 Toronto · Medicare — ready for the next build.</span></div></div>`;
      $("hearUsSummary").addEventListener("click", () => speak("The US has a mixed, private-led system in which employer insurance is central, public programmes cover specific groups, and coverage is not universal."));
      updateProgress();
      return;
    }

    const item = newYorkItems[state.newYorkIndex];
    els.newYorkScreen.innerHTML = `<div class="passport-question-card us-question"><div class="passport-question-meta"><span>${item.phase}</span><b>${item.tag}</b></div><h3>${item.prompt}</h3><div id="newYorkOptions" class="passport-options"></div></div>`;
    const optionWrap = $("newYorkOptions");
    optionButtons(item.options, (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.newYorkMissed.includes(state.newYorkIndex)) state.newYorkScore += 1;
        state.newYorkIndex += 1;
        if (state.newYorkIndex >= newYorkItems.length) state.newYorkComplete = true;
        saveState();
        playTone("good");
        els.newYorkFeedback.innerHTML = `<div class="feedback-good"><strong>Decoded.</strong><span>${item.explanation}</span></div><div class="passport-transcript us-transcript"><span>USEFUL ENGLISH</span><p>${item.model}</p><button id="hearUsModel" class="passport-hear" type="button">🔊 Hear it</button></div><button id="newYorkNext" class="passport-next" type="button">${state.newYorkComplete ? "Stamp passport →" : "Continue through the maze →"}</button>`;
        $("hearUsModel").addEventListener("click", () => speak(item.model));
        $("newYorkNext").addEventListener("click", renderNewYork);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.newYorkMissed.includes(state.newYorkIndex)) state.newYorkMissed.push(state.newYorkIndex);
        saveState();
        playTone("bad");
        els.newYorkFeedback.innerHTML = `<div class="feedback-bad"><strong>Insurance maze: wrong turn.</strong><span>Use the US briefing and distinguish insurance costs, public programmes and coverage carefully.</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startNewYork() {
    if (!state.londonComplete) return;
    state.newYorkStarted = true;
    saveState();
    renderNewYork();
    els.newYorkArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.newYorkScreen.focus({ preventScroll: true }), 450);
  }

  function resetProgress() {
    const ok = window.confirm("Reset all Day 2 Global Health Passport progress on this device?");
    if (!ok) return;
    state = { ...defaults };
    saveState();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    renderDeparture();
    renderLondon();
    renderNewYork();
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
  els.startNewYork.addEventListener("click", startNewYork);
  els.reset.addEventListener("click", resetProgress);
  els.soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off");
    if (!soundOn && "speechSynthesis" in window) window.speechSynthesis.cancel();
    syncSoundButton();
    setStatus(soundOn ? "Sound on. British English speech will play when requested." : "Sound off. All spoken content remains available as text.");
  });

  if ("speechSynthesis" in window) window.speechSynthesis.addEventListener?.("voiceschanged", chooseBritishVoice);

  syncSoundButton();
  updateProgress();
  renderDeparture();
  renderLondon();
  renderNewYork();
})();
