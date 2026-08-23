(() => {
  const STORAGE_KEY = "mrsLecomteFGSM3Day1ControlRoomV1";
  const STORAGE_M2_KEY = "mrsLecomteFGSM3Day1Mission2V1";
  const AUDIO_KEY = "mrsLecomteFGSM3Day1AudioV1";

  const checkpoints = [
    {
      id: "station",
      title: "Checkpoint 1 · Prepare your station",
      instruction: "Select every action that belongs in a safe video-consultation setup.",
      type: "multi",
      options: [
        {id:"light", text:"Choose a suitable, well-lit environment.", correct:true},
        {id:"internet", text:"Check the internet connection before the call.", correct:true},
        {id:"equipment", text:"Make sure the camera, microphone and speakers work.", correct:true},
        {id:"camera", text:"Position the webcam so you can look towards it when speaking.", correct:true},
        {id:"window", text:"Sit with a bright window directly behind you.", correct:false},
        {id:"untested", text:"Leave the audio untested — the patient can tell you if it fails.", correct:false}
      ]
    },
    {
      id: "connection",
      title: "Checkpoint 2 · Connect professionally",
      instruction: "The call connects. Choose the best first line.",
      type: "single",
      patientReply: "Hello, doctor. Yes, I can hear and see you clearly.",
      options: [
        {text:"Hello, I'm Dr Taylor. Can you hear and see me clearly?", correct:true},
        {text:"Right, let's get this done quickly. What's wrong?", correct:false},
        {text:"Can you move closer? I can't really see you.", correct:false}
      ]
    },
    {
      id: "identity",
      title: "Checkpoint 3 · Confirm identity",
      instruction: "Before discussing symptoms or results, what should you say?",
      type: "single",
      patientReply: "Of course. I'm Eleanor Reed, and my date of birth is the fourteenth of May, nineteen eighty-four.",
      options: [
        {text:"Before we start, can I confirm your full name and date of birth?", correct:true},
        {text:"You are Mrs Reed, aren't you?", correct:false},
        {text:"I have your file here, so we can skip the identity check.", correct:false}
      ]
    },
    {
      id: "privacy",
      title: "Checkpoint 4 · Protect privacy",
      instruction: "You now need to check that the consultation is private.",
      type: "single",
      patientReply: "Yes. I'm at home and I'm alone in the room.",
      options: [
        {text:"Are you somewhere private? Is anyone else with you?", correct:true},
        {text:"Nobody else can hear us, right?", correct:false},
        {text:"It doesn't matter if someone else is in the room.", correct:false}
      ]
    },
    {
      id: "consent",
      title: "Checkpoint 5 · Obtain verbal consent",
      instruction: "The patient is identified and private. Choose the safest way to continue.",
      type: "single",
      patientReply: "Yes, that's fine. I'm happy to continue by video.",
      options: [
        {text:"Are you happy to continue by video?", correct:true},
        {text:"I'll assume video is fine unless you stop me.", correct:false},
        {text:"We have already connected, so consent isn't necessary now.", correct:false}
      ]
    }
  ];

  const clinicalCheckpoints = [
    {
      id: "open",
      title: "Checkpoint 1 · Start broad",
      instruction: "The safe start is complete. What is the best way to invite the patient to explain the main problem?",
      patientReply: "I've been having headaches for the past few days.",
      options: [
        {text:"What brings you in today?", correct:true},
        {text:"So, you have a migraine. How bad is it?", correct:false},
        {text:"You look tired. Is that the main problem?", correct:false}
      ]
    },
    {
      id: "onset",
      title: "Checkpoint 2 · Clarify the timeline",
      instruction: "You know the main symptom. Which follow-up best explores onset and frequency?",
      patientReply: "They started four days ago. I've had one every day since then.",
      options: [
        {text:"When did the headaches start, and how often have you had them?", correct:true},
        {text:"Have you always had headaches?", correct:false},
        {text:"Did they start a long time ago?", correct:false}
      ]
    },
    {
      id: "associated",
      title: "Checkpoint 3 · Look for associated symptoms",
      instruction: "The headaches are becoming more frequent. What should you ask next?",
      patientReply: "Sometimes I feel dizzy as well, especially when I stand up quickly.",
      options: [
        {text:"Have you noticed any other symptoms?", correct:true},
        {text:"You haven't been dizzy, have you?", correct:false},
        {text:"Is the headache your only symptom? Yes or no.", correct:false}
      ]
    },
    {
      id: "severity",
      title: "Checkpoint 4 · Check severity and warning signs",
      instruction: "Choose the safest sequence of questions.",
      patientReply: "Usually about six out of ten. I haven't fainted, and I haven't noticed any weakness or trouble speaking.",
      options: [
        {text:"First ask how severe the pain is from 0 to 10, then ask about fainting, weakness or trouble speaking.", correct:true},
        {text:"Ask whether the pain is annoying and move straight to treatment.", correct:false},
        {text:"Tell the patient it sounds harmless because she is still able to talk.", correct:false}
      ]
    },
    {
      id: "history-concern",
      title: "Checkpoint 5 · Understand the patient",
      instruction: "Finish this part of the history by exploring previous episodes and the patient's concern.",
      patientReply: "I've had headaches before, but not like this. I'm worried it might be something serious.",
      options: [
        {text:"Have you had headaches like this before? Is there anything in particular you're worried about?", correct:true},
        {text:"You've had headaches before, so this is probably the same thing, isn't it?", correct:false},
        {text:"Let's not focus on what you're worried about. I just need the symptoms.", correct:false}
      ]
    }
  ];

  const els = {
    start: document.getElementById("startMission"),
    missionArea: document.getElementById("missionArea"),
    screen: document.getElementById("missionScreen"),
    feedback: document.getElementById("missionFeedback"),
    instruction: document.getElementById("missionInstruction"),
    checkpoint: document.getElementById("checkpointNumber"),
    progress: document.getElementById("missionProgressBar"),
    shiftStatus: document.getElementById("shiftStatus"),
    sound: document.getElementById("soundToggle"),
    music: document.getElementById("musicToggle"),
    audioStatus: document.getElementById("audioStatus"),
    reset: document.getElementById("resetDay1Progress"),
    musicAudio: document.getElementById("controlRoomMusic"),
    m2Area: document.getElementById("mission2Area"),
    m2Screen: document.getElementById("mission2Screen"),
    m2Feedback: document.getElementById("mission2Feedback"),
    m2Instruction: document.getElementById("mission2Instruction"),
    m2Checkpoint: document.getElementById("mission2CheckpointNumber"),
    m2Progress: document.getElementById("mission2ProgressBar"),
    m2Start: document.getElementById("startMission2"),
    missionMap2: document.getElementById("missionMap2")
  };

  let state = readState();
  let clinicalState = readClinicalState();
  let audioPrefs = readAudioPrefs();
  let audioContext = null;

  function readState() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (value && Number.isInteger(value.index)) return value;
    } catch (_) {}
    return {index: 0, completed: false, mistakes: 0};
  }

  function saveState() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (_) {}
  }

  function readClinicalState() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_M2_KEY));
      if (value && Number.isInteger(value.index)) return value;
    } catch (_) {}
    return {index: 0, completed: false, mistakes: 0, lastReply: ""};
  }

  function saveClinicalState() {
    try { localStorage.setItem(STORAGE_M2_KEY, JSON.stringify(clinicalState)); } catch (_) {}
  }

  function readAudioPrefs() {
    try {
      return {sound: true, music: false, ...(JSON.parse(localStorage.getItem(AUDIO_KEY)) || {})};
    } catch (_) {
      return {sound: true, music: false};
    }
  }

  function saveAudioPrefs() {
    try { localStorage.setItem(AUDIO_KEY, JSON.stringify(audioPrefs)); } catch (_) {}
  }

  function escapeHTML(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function beep(kind = "ok") {
    if (!audioPrefs.sound || !(window.AudioContext || window.webkitAudioContext)) return;
    try {
      audioContext ||= new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = kind === "error" ? "sawtooth" : "sine";
      osc.frequency.value = kind === "error" ? 190 : 620;
      gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.045, audioContext.currentTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.16);
      osc.connect(gain).connect(audioContext.destination);
      osc.start();
      osc.stop(audioContext.currentTime + 0.18);
    } catch (_) {}
  }

  function getUKVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = speechSynthesis.getVoices();
    return voices.find(v => /^en-GB$/i.test(v.lang)) ||
      voices.find(v => /en[-_]GB/i.test(v.lang)) ||
      voices.find(v => /^en/i.test(v.lang)) || null;
  }

  function speak(text, button) {
    if (!audioPrefs.sound) {
      showAudioStatus("Sound is OFF. The transcript remains available below.");
      return;
    }
    if (!("speechSynthesis" in window)) {
      showAudioStatus("Speech playback is not supported by this browser. Use the transcript instead.");
      return;
    }
    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    const voice = getUKVoice();
    if (voice) utterance.voice = voice;
    utterance.rate = 0.9;
    utterance.pitch = 1.02;
    button?.classList.add("speaking");
    utterance.onend = () => button?.classList.remove("speaking");
    utterance.onerror = () => button?.classList.remove("speaking");
    speechSynthesis.speak(utterance);
  }

  function showAudioStatus(message) {
    els.audioStatus.textContent = message;
    window.clearTimeout(showAudioStatus.timer);
    showAudioStatus.timer = window.setTimeout(() => {
      if (els.audioStatus.textContent === message) els.audioStatus.textContent = "";
    }, 5000);
  }

  function updateAudioButtons() {
    els.sound.setAttribute("aria-pressed", String(audioPrefs.sound));
    els.sound.textContent = audioPrefs.sound ? "🔊 Sound ON" : "🔇 Sound OFF";
    els.music.setAttribute("aria-pressed", String(audioPrefs.music));
    els.music.textContent = audioPrefs.music ? "🎵 Music ON" : "🎵 Music OFF";
  }

  async function syncMusic() {
    if (!audioPrefs.music) {
      els.musicAudio.pause();
      updateAudioButtons();
      return;
    }
    els.musicAudio.volume = 0.22;
    try {
      await els.musicAudio.play();
      showAudioStatus("Background music ON.");
    } catch (_) {
      audioPrefs.music = false;
      saveAudioPrefs();
      updateAudioButtons();
      showAudioStatus("Your browser blocked music playback. Press Music again to retry.");
    }
  }

  function renderProgress() {
    const done = state.completed ? checkpoints.length : Math.min(state.index, checkpoints.length);
    els.checkpoint.textContent = state.completed ? "5 / 5" : `${Math.min(state.index + 1, 5)} / 5`;
    els.progress.style.width = `${state.completed ? 100 : (done / checkpoints.length) * 100}%`;
    els.shiftStatus.textContent = state.completed ? "Mission 1 complete" : state.index > 0 ? "Mission in progress" : "Ready to start";
  }

  function setFeedback(html = "", type = "") {
    els.feedback.className = "mission-feedback" + (type ? ` ${type}` : "");
    els.feedback.innerHTML = html;
  }

  function patientPanel(reply) {
    return `
      <div class="patient-call-panel">
        <div class="patient-call-image-wrap">
          <span class="live-call-badge">● LIVE</span>
          <img src="assets/fgsm3/day1/images/fgsm3-day1-patient01-headache.webp" alt="Patient 01 during a home video consultation.">
        </div>
        <div class="patient-call-info">
          <p class="patient-call-label">PATIENT 01 · FICTIONAL CASE</p>
          <h3>Eleanor Reed</h3>
          <p class="patient-id-line">DOB: 14 May 1984</p>
          ${reply ? `
            <div class="patient-reply">
              <div class="patient-reply-head"><strong>Patient reply</strong><button class="play-patient-reply" type="button">🔊 Listen</button></div>
              <p>“${escapeHTML(reply)}”</p>
              <small>Transcript</small>
            </div>` : `<p class="patient-awaiting">The patient is waiting for you to begin.</p>`}
        </div>
      </div>`;
  }

  function renderCheckpoint() {
    renderProgress();
    if (state.completed) return renderComplete();

    const cp = checkpoints[state.index];
    els.instruction.textContent = cp.instruction;
    setFeedback();

    if (cp.type === "multi") {
      els.screen.innerHTML = `
        <div class="mission-grid-layout">
          <div class="station-check-card">
            <p class="mission-step-label">${escapeHTML(cp.title)}</p>
            <h3>Pre-call technical check</h3>
            <p>Select all the actions that make the consultation safer and clearer.</p>
            <form id="stationForm" class="station-options">
              ${cp.options.map(opt => `
                <label class="station-option">
                  <input type="checkbox" name="station" value="${opt.id}">
                  <span>${escapeHTML(opt.text)}</span>
                </label>`).join("")}
              <button class="tcr-primary mission-submit" type="submit">Check my setup</button>
            </form>
          </div>
          <div class="station-visual-card">
            <img src="assets/fgsm3/day1/images/fgsm3-day1-control-room.webp" alt="Teleconsultation workstation prepared for a video call.">
            <div class="station-mini-checks"><span>CAMERA</span><span>MIC</span><span>CONNECTION</span><span>LIGHTING</span></div>
          </div>
        </div>`;

      document.getElementById("stationForm").addEventListener("submit", event => {
        event.preventDefault();
        const selected = new Set([...event.currentTarget.querySelectorAll('input:checked')].map(i => i.value));
        const correct = new Set(cp.options.filter(o => o.correct).map(o => o.id));
        const exact = selected.size === correct.size && [...correct].every(id => selected.has(id));
        if (exact) {
          beep("ok");
          setFeedback("<strong>✓ Station ready.</strong> Good lighting, a reliable connection and tested equipment reduce avoidable communication problems.", "correct");
          advanceButton("Connect to Patient 01 →");
        } else {
          state.mistakes += 1;
          saveState();
          beep("error");
          setFeedback("<strong>Not quite.</strong> A safe setup includes good lighting, a checked connection, working camera/microphone/speakers and appropriate webcam positioning. Avoid strong backlighting.", "wrong");
        }
      });
      return;
    }

    els.screen.innerHTML = `
      <div class="consultation-checkpoint">
        ${patientPanel(state.lastReply || "")}
        <div class="doctor-choice-panel">
          <p class="mission-step-label">${escapeHTML(cp.title)}</p>
          <h3>${escapeHTML(cp.instruction)}</h3>
          <div class="doctor-choice-list">
            ${cp.options.map((opt, idx) => `
              <button class="doctor-choice" type="button" data-choice="${idx}">
                <span>${String.fromCharCode(65 + idx)}</span>${escapeHTML(opt.text)}
              </button>`).join("")}
          </div>
        </div>
      </div>`;

    els.screen.querySelectorAll("[data-choice]").forEach(button => {
      button.addEventListener("click", () => {
        const opt = cp.options[Number(button.dataset.choice)];
        els.screen.querySelectorAll("[data-choice]").forEach(btn => { btn.disabled = true; });
        if (opt.correct) {
          button.classList.add("correct-choice");
          state.lastReply = cp.patientReply;
          saveState();
          beep("ok");
          setFeedback(`<strong>✓ Good choice.</strong> ${feedbackFor(cp.id)}`, "correct");
          const panel = els.screen.querySelector(".patient-call-info");
          panel.insertAdjacentHTML("beforeend", `
            <div class="patient-reply newly-added">
              <div class="patient-reply-head"><strong>Patient reply</strong><button class="play-patient-reply" type="button">🔊 Listen</button></div>
              <p>“${escapeHTML(cp.patientReply)}”</p>
              <small>Transcript</small>
            </div>`);
          wireReplyButtons(cp.patientReply);
          advanceButton(state.index === checkpoints.length - 1 ? "Complete Mission 1 →" : "Next checkpoint →");
        } else {
          button.classList.add("wrong-choice");
          state.mistakes += 1;
          saveState();
          beep("error");
          setFeedback(`<strong>Try again.</strong> ${wrongFeedbackFor(cp.id)}`, "wrong");
          window.setTimeout(() => {
            els.screen.querySelectorAll("[data-choice]").forEach(btn => {
              btn.disabled = false;
              btn.classList.remove("wrong-choice");
            });
          }, 650);
        }
      });
    });
  }


  function setClinicalFeedback(html = "", type = "") {
    els.m2Feedback.className = "mission-feedback" + (type ? ` ${type}` : "");
    els.m2Feedback.innerHTML = html;
  }

  function renderClinicalProgress() {
    if (!state.completed) {
      els.m2Checkpoint.textContent = "0 / 5";
      els.m2Progress.style.width = "0%";
      els.m2Area.classList.add("is-locked");
      els.m2Start.disabled = true;
      els.m2Start.textContent = "Mission 2 locked";
      if (els.missionMap2) {
        els.missionMap2.classList.remove("live", "done");
        els.missionMap2.querySelector("b").textContent = "LOCKED";
      }
      return;
    }

    els.m2Area.classList.remove("is-locked");
    els.m2Start.disabled = false;
    els.m2Start.textContent = clinicalState.completed ? "View completed Mission 2 →" : clinicalState.index > 0 ? "Continue Mission 2 →" : "Start Mission 2 →";

    const done = clinicalState.completed ? clinicalCheckpoints.length : Math.min(clinicalState.index, clinicalCheckpoints.length);
    els.m2Checkpoint.textContent = clinicalState.completed ? "5 / 5" : clinicalState.index > 0 ? `${Math.min(clinicalState.index + 1, 5)} / 5` : "0 / 5";
    els.m2Progress.style.width = `${clinicalState.completed ? 100 : (done / clinicalCheckpoints.length) * 100}%`;

    if (els.missionMap2) {
      els.missionMap2.classList.add(clinicalState.completed ? "done" : "live");
      els.missionMap2.classList.remove(clinicalState.completed ? "live" : "done");
      els.missionMap2.querySelector("b").textContent = clinicalState.completed ? "DONE" : "LIVE";
    }
  }

  function unlockClinicalMission() {
    renderClinicalProgress();
    if (!clinicalState.completed && clinicalState.index === 0) {
      els.m2Instruction.textContent = "Patient 01 is ready. Start broad, then narrow your questions as the history develops.";
      els.m2Screen.innerHTML = `
        <div class="mission-waiting">
          <div class="mission-waiting-icon" aria-hidden="true">🩺</div>
          <h3>Patient 01 is still connected</h3>
          <p>The safe start is complete. Now find out what is happening without jumping to a diagnosis.</p>
        </div>`;
    }
  }

  function clinicalFeedbackFor(id) {
    const map = {
      open: "An open question lets the patient describe the main problem in their own words.",
      onset: "Clarifying onset and frequency gives the symptom a clear timeline.",
      associated: "Associated symptoms may change how you understand the complaint and what you need to ask next.",
      severity: "Severity and warning signs should be checked before you decide what can safely happen next.",
      "history-concern": "Previous episodes and the patient's concern help you understand both the clinical context and the patient's perspective."
    };
    return map[id] || "Good clinical communication.";
  }

  function clinicalWrongFeedbackFor(id) {
    const map = {
      open: "Do not begin by naming the diagnosis for the patient. Start with a broad, neutral question.",
      onset: "Ask for a precise starting point and how often the symptom has occurred. Avoid vague or leading wording.",
      associated: "Use a neutral question first. A negative tag question can push the patient towards the answer you expect.",
      severity: "Do not minimise symptoms or move straight to treatment. Check severity and relevant warning signs first.",
      "history-concern": "Do not assume this episode is the same as previous headaches, and do not ignore what the patient is worried about."
    };
    return map[id] || "Choose the clearest, safest and least leading question.";
  }

  function renderClinicalCheckpoint() {
    renderClinicalProgress();
    if (!state.completed) return;
    if (clinicalState.completed) return renderClinicalComplete();

    const cp = clinicalCheckpoints[clinicalState.index];
    els.m2Instruction.textContent = cp.instruction;
    setClinicalFeedback();

    els.m2Screen.innerHTML = `
      <div class="consultation-checkpoint">
        ${patientPanel(clinicalState.lastReply || "")}
        <div class="doctor-choice-panel">
          <p class="mission-step-label">${escapeHTML(cp.title)}</p>
          <h3>${escapeHTML(cp.instruction)}</h3>
          <div class="clinical-focus-chip">${clinicalFocusFor(cp.id)}</div>
          <div class="doctor-choice-list">
            ${cp.options.map((opt, idx) => `
              <button class="doctor-choice" type="button" data-m2-choice="${idx}">
                <span>${String.fromCharCode(65 + idx)}</span>${escapeHTML(opt.text)}
              </button>`).join("")}
          </div>
        </div>
      </div>`;

    if (clinicalState.lastReply) wireReplyButtons(clinicalState.lastReply, els.m2Screen);

    els.m2Screen.querySelectorAll("[data-m2-choice]").forEach(button => {
      button.addEventListener("click", () => {
        const opt = cp.options[Number(button.dataset.m2Choice)];
        els.m2Screen.querySelectorAll("[data-m2-choice]").forEach(btn => { btn.disabled = true; });

        if (opt.correct) {
          button.classList.add("correct-choice");
          clinicalState.lastReply = cp.patientReply;
          saveClinicalState();
          beep("ok");
          setClinicalFeedback(`<strong>✓ Good question.</strong> ${clinicalFeedbackFor(cp.id)}`, "correct");

          const panel = els.m2Screen.querySelector(".patient-call-info");
          panel.insertAdjacentHTML("beforeend", `
            <div class="patient-reply newly-added">
              <div class="patient-reply-head"><strong>Patient reply</strong><button class="play-patient-reply" type="button">🔊 Listen</button></div>
              <p>“${escapeHTML(cp.patientReply)}”</p>
              <small>Transcript</small>
            </div>`);
          wireReplyButtons(cp.patientReply, els.m2Screen);
          advanceClinicalButton(clinicalState.index === clinicalCheckpoints.length - 1 ? "Complete Mission 2 →" : "Ask the next question →");
        } else {
          button.classList.add("wrong-choice");
          clinicalState.mistakes += 1;
          saveClinicalState();
          beep("error");
          setClinicalFeedback(`<strong>Try again.</strong> ${clinicalWrongFeedbackFor(cp.id)}`, "wrong");
          window.setTimeout(() => {
            els.m2Screen.querySelectorAll("[data-m2-choice]").forEach(btn => {
              btn.disabled = false;
              btn.classList.remove("wrong-choice");
            });
          }, 650);
        }
      });
    });
  }

  function clinicalFocusFor(id) {
    const map = {
      open: "FOCUS · OPEN QUESTION",
      onset: "FOCUS · ONSET + FREQUENCY",
      associated: "FOCUS · ASSOCIATED SYMPTOMS",
      severity: "FOCUS · SEVERITY + WARNING SIGNS",
      "history-concern": "FOCUS · HISTORY + CONCERN"
    };
    return map[id] || "CLINICAL HISTORY";
  }

  function advanceClinicalButton(label) {
    const holder = document.createElement("div");
    holder.className = "mission-next-holder";
    holder.innerHTML = `<button class="tcr-primary" type="button">${escapeHTML(label)}</button>`;
    els.m2Feedback.appendChild(holder);
    holder.querySelector("button").addEventListener("click", () => {
      clinicalState.index += 1;
      clinicalState.lastReply = "";
      if (clinicalState.index >= clinicalCheckpoints.length) clinicalState.completed = true;
      saveClinicalState();
      renderClinicalCheckpoint();
      els.m2Screen.focus({preventScroll:true});
    });
  }

  function renderClinicalComplete() {
    els.shiftStatus.textContent = "Missions 1–2 complete";
    els.m2Instruction.textContent = "Mission 2 complete: you moved from an open question to a focused, patient-centred clinical history.";
    els.m2Checkpoint.textContent = "5 / 5";
    els.m2Progress.style.width = "100%";
    const quality = clinicalState.mistakes === 0 ? "Excellent questioning sequence" : clinicalState.mistakes <= 2 ? "Strong clinical history" : "Clinical history completed after review";
    els.m2Screen.innerHTML = `
      <div class="mission-complete-card">
        <div class="mission-badge" aria-hidden="true">?</div>
        <p class="mission-step-label">MISSION 2 COMPLETE</p>
        <h3>Questioning Specialist badge unlocked</h3>
        <p>${escapeHTML(quality)}. You started broad, clarified the timeline, explored associated symptoms, checked severity and warning signs, then asked about previous episodes and the patient's concern.</p>
        <div class="mission-complete-score"><strong>${Math.max(0, 100 - clinicalState.mistakes * 8)}%</strong><span>mission score</span></div>
        <div class="timeline-preview">
          <span>NEXT LANGUAGE CLUE</span>
          <p>“The headaches <strong>started</strong> four days ago. I'<strong>ve had</strong> one every day since then.”</p>
          <small>Keep this sentence in mind: it will return in the Past Simple vs Present Perfect Timeline Check.</small>
        </div>
        <div class="mission-complete-actions">
          <button id="replayMission2" class="tcr-primary" type="button">Replay Mission 2</button>
          <a class="tcr-secondary-link dark" href="#mission-map">See the next lab ↓</a>
        </div>
      </div>`;
    setClinicalFeedback("<strong>Next:</strong> the -ed Audio Lab will move from consultation skills to pronunciation before the Timeline Check.", "info");
    document.getElementById("replayMission2").addEventListener("click", resetClinicalMission);
    renderClinicalProgress();
  }

  function startClinicalMission() {
    if (!state.completed) return;
    if (clinicalState.completed) renderClinicalComplete();
    else renderClinicalCheckpoint();
    els.m2Area.scrollIntoView({behavior:"smooth", block:"start"});
    els.m2Screen.focus({preventScroll:true});
    if (audioPrefs.music) syncMusic();
  }

  function resetClinicalMission() {
    clinicalState = {index: 0, completed: false, mistakes: 0, lastReply: ""};
    saveClinicalState();
    renderClinicalProgress();
    els.m2Instruction.textContent = state.completed
      ? "Patient 01 is ready. Start broad, then narrow your questions as the history develops."
      : "Complete Mission 1 to unlock the clinical history.";
    els.m2Screen.innerHTML = state.completed
      ? `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🩺</div><h3>Patient 01 is still connected</h3><p>The safe start is complete. Now find out what is happening without jumping to a diagnosis.</p></div>`
      : `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🔒</div><h3>Clinical history locked</h3><p>Open the consultation safely first. Mission 2 will unlock automatically when Mission 1 is complete.</p></div>`;
    setClinicalFeedback();
  }

  function feedbackFor(id) {
    const map = {
      connection: "Start by introducing yourself and checking that the patient can hear and see you clearly.",
      identity: "Identity must be confirmed before you discuss clinical information.",
      privacy: "Knowing who is present protects trust and confidentiality.",
      consent: "Verbal consent confirms that the patient is happy to continue by video."
    };
    return map[id] || "Safe professional communication.";
  }

  function wrongFeedbackFor(id) {
    const map = {
      connection: "Use a calm professional introduction and check the technical connection before moving to the clinical problem.",
      identity: "Do not assume identity from the file or from a leading question. Ask the patient to confirm their full name and date of birth.",
      privacy: "Privacy must be checked explicitly, including whether anyone else is present.",
      consent: "Connection does not equal consent. Ask explicitly whether the patient is happy to continue by video."
    };
    return map[id] || "Choose the option that is clearest and safest for the patient.";
  }

  function wireReplyButtons(reply, root = els.screen) {
    root.querySelectorAll(".play-patient-reply").forEach(button => {
      button.onclick = () => speak(reply, button);
    });
  }

  function advanceButton(label) {
    const holder = document.createElement("div");
    holder.className = "mission-next-holder";
    holder.innerHTML = `<button class="tcr-primary" type="button">${escapeHTML(label)}</button>`;
    els.feedback.appendChild(holder);
    holder.querySelector("button").addEventListener("click", () => {
      state.index += 1;
      state.lastReply = "";
      if (state.index >= checkpoints.length) state.completed = true;
      saveState();
      renderCheckpoint();
      els.screen.focus({preventScroll:true});
    });
  }

  function renderComplete() {
    els.instruction.textContent = "Mission 1 complete: you opened the video consultation safely and professionally.";
    els.checkpoint.textContent = "5 / 5";
    els.progress.style.width = "100%";
    els.shiftStatus.textContent = "Mission 1 complete";
    const quality = state.mistakes === 0 ? "Flawless safe start" : state.mistakes <= 2 ? "Safe start achieved" : "Safe start achieved after review";
    els.screen.innerHTML = `
      <div class="mission-complete-card">
        <div class="mission-badge" aria-hidden="true">✓</div>
        <p class="mission-step-label">MISSION 1 COMPLETE</p>
        <h3>Safe Start badge unlocked</h3>
        <p>${escapeHTML(quality)}. You checked the setup, connection, identity, privacy and verbal consent before moving into the clinical history.</p>
        <div class="mission-complete-score"><strong>${Math.max(0, 100 - state.mistakes * 8)}%</strong><span>mission score</span></div>
        <div class="mission-complete-actions">
          <button id="startMission2FromM1" class="tcr-primary" type="button">Start Mission 2 →</button>
          <button id="replayMission" class="tcr-secondary-button" type="button">Replay Mission 1</button>
          <a class="tcr-secondary-link dark" href="#mission-map">Mission map ↓</a>
        </div>
      </div>`;
    setFeedback("<strong>Next:</strong> stay with Patient 01 and move into the clinical history: open questions, timeline, associated symptoms, warning signs and concerns.", "info");
    document.getElementById("replayMission").addEventListener("click", resetMission);
    document.getElementById("startMission2FromM1").addEventListener("click", startClinicalMission);
    unlockClinicalMission();
  }

  function startMission() {
    if (state.completed) {
      renderComplete();
    } else {
      renderCheckpoint();
    }
    els.missionArea.scrollIntoView({behavior:"smooth", block:"start"});
    els.screen.focus({preventScroll:true});
    if (audioPrefs.music) syncMusic();
  }

  function resetMission() {
    state = {index: 0, completed: false, mistakes: 0, lastReply: ""};
    clinicalState = {index: 0, completed: false, mistakes: 0, lastReply: ""};
    saveState();
    saveClinicalState();
    renderProgress();
    renderClinicalProgress();
    els.instruction.innerHTML = "Press <strong>Start Mission 1</strong> when you are ready.";
    els.screen.innerHTML = `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">📞</div><h3>Incoming video consultation</h3><p>Patient 01 is waiting. Prepare your station before connecting.</p></div>`;
    els.m2Instruction.textContent = "Complete Mission 1 to unlock the clinical history.";
    els.m2Screen.innerHTML = `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🔒</div><h3>Clinical history locked</h3><p>Open the consultation safely first. Mission 2 will unlock automatically when Mission 1 is complete.</p></div>`;
    setFeedback();
    setClinicalFeedback();
    els.shiftStatus.textContent = "Ready to start";
    els.start.textContent = "Start Mission 1 →";
    els.start.focus();
  }

  els.start.addEventListener("click", startMission);
  els.reset.addEventListener("click", () => {
    if (confirm("Reset all FGSM3 Day 1 game progress on this device?")) resetMission();
  });

  els.m2Start.addEventListener("click", startClinicalMission);

  els.sound.addEventListener("click", () => {
    audioPrefs.sound = !audioPrefs.sound;
    if (!audioPrefs.sound && "speechSynthesis" in window) speechSynthesis.cancel();
    saveAudioPrefs();
    updateAudioButtons();
    showAudioStatus(audioPrefs.sound ? "Sound ON." : "Sound OFF. Transcripts remain available.");
  });

  els.music.addEventListener("click", () => {
    audioPrefs.music = !audioPrefs.music;
    saveAudioPrefs();
    updateAudioButtons();
    syncMusic();
  });

  els.musicAudio.addEventListener("error", () => {
    if (audioPrefs.music) {
      audioPrefs.music = false;
      saveAudioPrefs();
      updateAudioButtons();
      showAudioStatus("The background track could not be loaded. Sound and transcripts still work.");
    }
  });

  if ("speechSynthesis" in window) speechSynthesis.onvoiceschanged = () => speechSynthesis.getVoices();

  updateAudioButtons();
  renderProgress();
  renderClinicalProgress();
  if (state.completed) {
    els.shiftStatus.textContent = clinicalState.completed ? "Missions 1–2 complete" : "Mission 1 complete · Mission 2 unlocked";
    els.start.textContent = "View completed Mission 1 →";
    unlockClinicalMission();
  }
})();
