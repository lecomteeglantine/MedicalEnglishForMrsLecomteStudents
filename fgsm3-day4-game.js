(() => {
  "use strict";

  const STORAGE_KEY = "mrsLecomteFgsm3Day4AIControlV41";
  const MUSIC_KEY = "mrsLecomteFgsm3Day4Music";
  const ACTIVITY_ORDER = ["lexicon", "signals", "boundaries", "clearance"];
  const M2_ORDER = ["overview", "sepsis", "tools", "human"];

  const meta = {
    lexicon: ["Load the Vocabulary", "Decode the ten core terms from the Day 4 worksheet."],
    signals: ["Read the System", "Choose the term that fits each medical-AI context."],
    boundaries: ["Who Does What?", "Separate AI functions, regulation, patient risk and human responsibility."],
    clearance: ["Final Boot Check", "Confirm the central human-in-the-loop message before Mission 2."]
  };

  const m2Meta = {
    overview: ["Feed Orientation", "First viewing: identify the report's main ideas without over-interpreting them."],
    sepsis: ["Sepsis Feed", "Verify how the early-warning system monitors patients and why earlier alerts matter."],
    tools: ["Navigation + Neuro", "Check what the spine-navigation and seizure-detection systems actually do."],
    human: ["Keep the Human in the Loop", "Confirm the patient perspective, risks and the final-decision boundary."]
  };

  const vocab = [
    {term:"sepsis",ipa:"/ˈsepsɪs/",def:"a life-threatening reaction of the body to an infection"},
    {term:"life-threatening",ipa:"/ˈlaɪfˌθretənɪŋ/",def:"able to cause death"},
    {term:"vital signs",ipa:"/ˌvaɪtl ˈsaɪnz/",def:"key body measurements such as heart rate and temperature"},
    {term:"to monitor",ipa:"/ˈmɒnɪtə/",def:"to watch or check something continuously"},
    {term:"a seizure",ipa:"/ˈsiːʒə/",def:"a sudden burst of electrical activity in the brain"},
    {term:"brainwaves",ipa:"/ˈbreɪnweɪvz/",def:"the electrical patterns of activity in the brain"},
    {term:"subtle",ipa:"/ˈsʌtl/",def:"hard to notice; not obvious"},
    {term:"to complement",ipa:"/ˈkɒmplɪment/",def:"to add to and improve something; to work alongside it"},
    {term:"FDA-approved",ipa:"/ˌefdiːˈeɪ əˈpruːvd/",def:"officially authorised by the US medicines or devices regulator"},
    {term:"cyberchondria",ipa:"/ˌsaɪbəˈkɒndriə/",def:"anxiety caused by searching symptoms online"}
  ];

  const signals = [
    {q:"An AI system checks heart rate, temperature and oxygen continuously in the background. Which verb fits?",a:"to monitor",opts:["to monitor","to complement","a seizure","subtle"],ex:"The system monitors vital signs in real time."},
    {q:"The electrical patterns recorded from activity in the brain are called…",a:"brainwaves",opts:["brainwaves","vital signs","sepsis","cyberchondria"],ex:"The epilepsy model is trained on brainwaves."},
    {q:"A change is present but hard to notice. Which adjective fits?",a:"subtle",opts:["subtle","life-threatening","FDA-approved","seizure"],ex:"A subtle sign can be easy to miss."},
    {q:"A medical device has been officially authorised by the US regulator. Which term fits?",a:"FDA-approved",opts:["FDA-approved","life-threatening","to complement","brainwaves"],ex:"The report refers to FDA-approved medical technology."},
    {q:"A person becomes anxious after repeatedly searching symptoms online and using AI for self-diagnosis. Which word fits?",a:"cyberchondria",opts:["cyberchondria","sepsis","vital signs","a seizure"],ex:"The report raises cyberchondria as a concern."}
  ];

  const boundaries = [
    {q:"The system continuously watches a patient's measurements and can flag a pattern.",a:"AI / system function",opts:["AI / system function","Human final decision","Regulatory status","Patient-side risk"],ex:"Monitoring data is a system function described in the report."},
    {q:"The final diagnosis or treatment decision stays with the clinician.",a:"Human final decision",opts:["Human final decision","AI / system function","Regulatory status","Patient-side risk"],ex:"The report stresses that the final decision stays human."},
    {q:"A technology is officially authorised by the US medicines or devices regulator.",a:"Regulatory status",opts:["Regulatory status","AI / system function","Human final decision","Patient-side risk"],ex:"FDA-approved describes regulatory status, not proof that a tool is infallible."},
    {q:"A patient becomes more anxious after using online tools to investigate symptoms.",a:"Patient-side risk",opts:["Patient-side risk","Human final decision","AI / system function","Regulatory status"],ex:"Cyberchondria is a patient-side concern raised in the Day 4 material."},
    {q:"The report says AI should work alongside human intelligence rather than replace it.",a:"Human + AI collaboration",opts:["Human + AI collaboration","AI replaces clinicians","Regulatory status","Patient-side risk"],ex:"To complement means to work alongside and add to human work."}
  ];

  const clearance = [
    {q:"Which statement best matches the report's overall message?",a:"AI should complement doctors; humans make the final decision.",opts:["AI should complement doctors; humans make the final decision.","AI should replace doctors whenever it is faster.","AI is only useful for research, not clinical work.","AI should make the final decision if it is FDA-approved."],ex:"The report explicitly frames AI as a complement to doctors, not a replacement."},
    {q:"Which use of AI is described in the Day 4 video introduction?",a:"Monitoring vital signs to help spot sepsis earlier",opts:["Monitoring vital signs to help spot sepsis earlier","Automatically prescribing antibiotics without a clinician","Replacing a surgeon during an operation","Making a diagnosis from a patient's facial expression"],ex:"The video introduction describes real-time monitoring of vital signs for early sepsis detection."},
    {q:"What does the spine-surgery AI tool provide?",a:"A live 3-D “GPS” view of the patient's anatomy",opts:["A live 3-D “GPS” view of the patient's anatomy","A written prescription for painkillers","A mental-health diagnosis","A replacement for the operating surgeon"],ex:"The tool is compared to a GPS that helps the surgeon navigate the spine."},
    {q:"What is the neurological AI model trained on?",a:"Electrical brainwaves",opts:["Electrical brainwaves","Photographs of patients","Blood pressure only","Written discharge letters"],ex:"The epilepsy model analyses brainwaves and can spot seizure patterns quickly."},
    {q:"Which sentence keeps the human in the loop?",a:"The AI can flag a pattern, but a clinician remains responsible for the final decision.",opts:["The AI can flag a pattern, but a clinician remains responsible for the final decision.","If the AI is fast, the clinician no longer needs to review its output.","An FDA-approved system cannot make a clinical error.","Patients should use AI instead of seeking medical advice."],ex:"Day 4 begins with a clear boundary: AI can support care, but it does not remove human judgement."}
  ];

  /* Mission 2 uses only information supported by the supplied Day 4 video/worksheet and teacher key. */
  const m2Overview = [
    {q:"Which condition is the Cleveland Clinic AI designed to detect early?",a:"Sepsis",opts:["Sepsis","Cancer","Diabetes","A broken bone"],ex:"The first clinical example is an AI system designed to help detect sepsis earlier."},
    {q:"According to the report, sepsis is described as…",a:"the number-one leading cause of hospital death in the US",opts:["the number-one leading cause of hospital death in the US","a minor infection","a type of surgery","a brain disease"],ex:"That is how the report frames the seriousness of sepsis."},
    {q:"How does the sepsis AI work?",a:"It monitors vital signs in real time.",opts:["It monitors vital signs in real time.","It replaces the doctor.","It prescribes antibiotics automatically.","It calls the family."],ex:"The system continuously watches measurements such as heart rate, temperature and oxygen."},
    {q:"What does the spine surgeon compare the Proprio tool to?",a:"A GPS in your car",opts:["A GPS in your car","A security system","A microscope","A textbook"],ex:"The live 3-D navigation system is compared to a GPS."},
    {q:"The neurological AI model is trained on…",a:"Electrical brainwaves",opts:["Electrical brainwaves","Text","Photographs","Blood tests"],ex:"It analyses EEG brainwave patterns to identify seizures."},
    {q:"What is cyberchondria?",a:"Anxiety from turning to AI or the internet for diagnoses",opts:["Anxiety from turning to AI or the internet for diagnoses","A new medicine","A type of surgery","A hospital department"],ex:"The report raises anxiety from self-diagnosing online or with AI as a concern."},
    {q:"What is the report's overall message about AI's role?",a:"AI should complement human intelligence; humans make the final decision.",opts:["AI should complement human intelligence; humans make the final decision.","AI should replace doctors.","AI is useless in medicine.","AI is only for research."],ex:"The central message is collaboration, with the final decision remaining human."}
  ];

  const m2Sepsis = [
    {q:"A doctor is concentrating on another urgent possibility, such as a heart attack. What does the sepsis AI do in the background?",a:"It keeps monitoring vital signs and alerts the team if a sepsis pattern develops.",opts:["It keeps monitoring vital signs and alerts the team if a sepsis pattern develops.","It stops monitoring until the doctor finishes.","It automatically gives antibiotics.","It diagnoses from the patient's appearance."],ex:"The teacher key compares this background monitoring to a security system: it can alert the team while the doctor is focused elsewhere."},
    {q:"Which set of figures is given for the Cleveland Clinic?",a:"About 30,000 sepsis cases a year and roughly 2,000 deaths",opts:["About 30,000 sepsis cases a year and roughly 2,000 deaths","About 3,000 cases and 200 deaths","About 300,000 cases and 20,000 deaths","No figures are given"],ex:"The report gives about 30,000 sepsis cases annually and roughly 2,000 deaths at the Cleveland Clinic."},
    {q:"What benefit does the report associate with catching sepsis earlier using the AI?",a:"It helps prevent hundreds of deaths a year.",opts:["It helps prevent hundreds of deaths a year.","It removes the need for clinicians.","It guarantees that sepsis will never be missed.","It eliminates all hospital infections."],ex:"The report says earlier detection helps prevent hundreds of deaths a year; it does not claim perfect detection."},
    {q:"Which measurements are explicitly mentioned as examples of vital signs monitored in real time?",a:"Heart rate, temperature and oxygen",opts:["Heart rate, temperature and oxygen","Height, weight and eye colour","Blood type, age and postcode","Only blood pressure"],ex:"The first-viewing task identifies heart rate, temperature and oxygen as examples."},
    {q:"Which wording best matches the role of this AI system?",a:"Early-warning support for the clinical team",opts:["Early-warning support for the clinical team","Independent final decision-maker","Automatic prescribing service","Replacement for bedside assessment"],ex:"The report presents it as background monitoring and early warning, not as an autonomous clinician."}
  ];

  const m2Tools = [
    {q:"What does Proprio give the spine surgeon during the operation?",a:"A live 3-D view of the spine in real time",opts:["A live 3-D view of the spine in real time","A written diagnosis after the operation","An automatic anaesthetic plan","A remote replacement surgeon"],ex:"Proprio provides live 3-D navigation of the patient's spine."},
    {q:"Why is the Proprio system compared with a GPS?",a:"It helps the surgeon navigate the patient's anatomy in real time.",opts:["It helps the surgeon navigate the patient's anatomy in real time.","It gives driving directions to the hospital.","It predicts the patient's discharge date.","It monitors brainwaves."],ex:"The comparison is about navigation: a live 3-D map of the anatomy."},
    {q:"What patient benefits are linked to a shorter operation in the report?",a:"Less time under anaesthetic and less bleeding",opts:["Less time under anaesthetic and less bleeding","No need for post-operative care","Guaranteed pain-free recovery","No need for a surgeon"],ex:"The teacher key links the shorter operation to less time under anaesthetic and less bleeding."},
    {q:"What data is the epilepsy AI trained on?",a:"EEG brainwaves",opts:["EEG brainwaves","Chest X-rays","Written prescriptions","Heart-rate data only"],ex:"The neurological model learns the electrical patterns associated with seizures."},
    {q:"How quickly can the epilepsy AI identify the electrical pattern of a seizure?",a:"Within seconds",opts:["Within seconds","Only after several hours","Only after a doctor labels it first","The report gives no indication of speed"],ex:"The supplied answer key says it can spot the pattern very early, within seconds."},
    {q:"What additional detail is given about the EEG recordings analysed by the system?",a:"It reviews recordings sent from around the world.",opts:["It reviews recordings sent from around the world.","It only works on one patient's recordings.","It uses photographs instead of EEG data.","It can only be used during surgery."],ex:"The report describes recordings being sent from around the world for review."}
  ];

  const m2Human = [
    {q:"What does the patient Kristen hope AI can do?",a:"Help detect or manage her condition and improve care",opts:["Help detect or manage her condition and improve care","Replace all human doctors","Make every treatment decision alone","Remove the need for medical appointments"],ex:"She hopes AI can improve care and help with detection or management."},
    {q:"What does Kristen NOT want?",a:"AI to replace the human doctor",opts:["AI to replace the human doctor","Doctors to use technology at all","Better detection of her condition","Humans to remain involved"],ex:"Her position is explicitly human-centred: she still wants humans treating humans."},
    {q:"Which concern from the report refers to anxiety caused by self-diagnosing online or with AI?",a:"Cyberchondria",opts:["Cyberchondria","Sepsis","Brainwaves","Vital signs"],ex:"Cyberchondria is one of the concerns raised in the report."},
    {q:"Which issue is also raised alongside cyberchondria?",a:"Data privacy",opts:["Data privacy","A ban on all medical devices","The end of surgery","A shortage of EEG machines"],ex:"The report mentions data-privacy laws as another concern around AI in medicine."},
    {q:"Which principle best summarises the safety boundary in the report?",a:"AI should complement doctors, with a human making the final decision.",opts:["AI should complement doctors, with a human making the final decision.","AI should make the final decision whenever it is faster.","A doctor should accept every AI recommendation.","Patients should use AI as a substitute for medical advice."],ex:"The report's stated principle is complement, not replace: a human remains responsible for the final decision."}
  ];

  let state = loadState();
  let current = null, index = 0, attempts = 0, sessionScore = 0;
  let m2Current = null, m2Index = 0, m2Attempts = 0, m2SessionScore = 0;

  const $ = id => document.getElementById(id);
  const screen = $("ai4Screen"), feedback = $("ai4Feedback"), workspaceTitle = $("ai4WorkspaceTitle"), workspaceIntro = $("ai4WorkspaceIntro");
  const m2Screen = $("ai4M2Screen"), m2Feedback = $("ai4M2Feedback"), m2WorkspaceTitle = $("ai4M2WorkspaceTitle"), m2WorkspaceIntro = $("ai4M2WorkspaceIntro");
  const music = $("day4Music"), musicToggle = $("day4MusicToggle"), audioStatus = $("day4AudioStatus"), clinicalVideo = $("day4ClinicalVideo");
  let musicOn = localStorage.getItem(MUSIC_KEY) === "on";
  let videoPausedMusic = false;

  function freshState() {
    return {
      completed: {lexicon:false, signals:false, boundaries:false, clearance:false},
      mission2Completed: {overview:false, sepsis:false, tools:false, human:false},
      firstTryScore: 0,
      mission2FirstTryScore: 0,
      started: false,
      mission2Started: false,
      soundOff: false
    };
  }

  function loadState() {
    const base = freshState();
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {
        ...base,
        ...saved,
        completed: {...base.completed, ...(saved.completed || {})},
        mission2Completed: {...base.mission2Completed, ...(saved.mission2Completed || {})}
      };
    } catch (e) {
      return base;
    }
  }

  function save() { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }

  function startMusicPlayback() {
    if (!music) return;
    music.volume = .18;
    const p = music.play();
    if (p && typeof p.catch === "function") p.catch(() => { audioStatus.textContent = "Music is ready. Tap Music again if your browser blocked playback."; });
  }
  function stopMusicPlayback(reset=true) { if (!music) return; music.pause(); if (reset) music.currentTime = 0; }
  function syncMusicButton() { if (!musicToggle) return; musicToggle.setAttribute("aria-pressed", String(musicOn)); musicToggle.textContent = musicOn ? "🎵 Music ON" : "🎵 Music OFF"; }
  function applyMusicState(fromUser=false) { syncMusicButton(); if (!music) return; if (musicOn) { if (fromUser) startMusicPlayback(); } else stopMusicPlayback(); }
  function shuffle(arr) { const a = [...arr]; for (let i=a.length-1; i>0; i--) { const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
  function speak(text) { if (!state.soundOff && "speechSynthesis" in window) { speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang="en-GB"; u.rate=.88; speechSynthesis.speak(u); } }
  function cue(good=true) { if (state.soundOff) return; try { const C=window.AudioContext||window.webkitAudioContext; const c=new C(),o=c.createOscillator(),g=c.createGain(); o.frequency.value=good?660:210; g.gain.setValueAtTime(.055,c.currentTime); g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.16); o.connect(g).connect(c.destination); o.start(); o.stop(c.currentTime+.16); } catch(e){} }

  function itemsFor(name) {
    if (name === "lexicon") return vocab.map(v => ({q:v.term,a:v.def,opts:shuffle([v.def,...shuffle(vocab.filter(x=>x.term!==v.term).map(x=>x.def)).slice(0,3)]),ex:v.def,term:v.term,ipa:v.ipa,kind:"vocab"}));
    if (name === "signals") return signals.map(x=>({...x,opts:shuffle(x.opts)}));
    if (name === "boundaries") return boundaries.map(x=>({...x,opts:shuffle(x.opts)}));
    return clearance.map(x=>({...x,opts:shuffle(x.opts)}));
  }

  function m2ItemsFor(name) {
    const bank = name === "overview" ? m2Overview : name === "sepsis" ? m2Sepsis : name === "tools" ? m2Tools : m2Human;
    return bank.map(x => ({...x, opts: shuffle(x.opts)}));
  }

  function updateUI() {
    const done = ACTIVITY_ORDER.filter(a=>state.completed[a]).length;
    $("day4ProgressText").textContent = `${done} / 4`;
    $("day4ProgressBar").style.width = `${done*25}%`;
    $("day4Score").textContent = state.firstTryScore;
    const statusIds = {lexicon:"ai4StatusLexicon",signals:"ai4StatusSignals",boundaries:"ai4StatusBoundaries",clearance:"ai4StatusClearance"};
    ACTIVITY_ORDER.forEach((a,i) => {
      const btn=document.querySelector(`[data-ai4-activity="${a}"]`), unlocked=i===0||state.completed[ACTIVITY_ORDER[i-1]];
      btn.disabled=!unlocked;
      $(statusIds[a]).textContent=state.completed[a]?"CLEARED":unlocked?"READY":"LOCKED";
    });
    const all=done===4;
    $("day4Mission1Complete").classList.toggle("is-locked",!all);
    $("day4CompleteTitle").textContent=all?"🧠 System Boot cleared.":"System Boot is not cleared yet.";
    $("day4CompleteText").textContent=all?"Core AI vocabulary loaded. Human oversight confirmed. Mission 2 is ready for deployment.":"Complete all four control-room activities.";
    $("day4Mission2Button").disabled=!all;
    $("day4Mission2Button").textContent=all?"Mission 2 · Live Clinical Feed →":"🔒 Mission 2 · Live Clinical Feed";
    $("day4Clearance").textContent=all?"Mission 1 cleared":state.started?"System boot in progress":"Clearance pending";
    $("day4SoundToggle").textContent=state.soundOff?"🔇 Sound OFF":"🔊 Sound ON";
    $("day4SoundToggle").setAttribute("aria-pressed",String(!state.soundOff));
    updateMission2UI();
  }

  function updateMission2UI() {
    if (!$("day4Mission2")) return;
    const m1Cleared = ACTIVITY_ORDER.every(a=>state.completed[a]);
    const done = M2_ORDER.filter(a=>state.mission2Completed[a]).length;
    $("day4Mission2").classList.toggle("is-locked", !m1Cleared);
    $("day4Mission2ProgressText").textContent = `${done} / 4`;
    $("day4Mission2ProgressBar").style.width = `${done*25}%`;
    $("day4Mission2Score").textContent = state.mission2FirstTryScore;
    const ids={overview:"ai4M2StatusOverview",sepsis:"ai4M2StatusSepsis",tools:"ai4M2StatusTools",human:"ai4M2StatusHuman"};
    M2_ORDER.forEach((a,i)=>{
      const btn=document.querySelector(`[data-ai4-m2="${a}"]`);
      const unlocked=m1Cleared && (i===0 || state.mission2Completed[M2_ORDER[i-1]]);
      btn.disabled=!unlocked;
      $(ids[a]).textContent=state.mission2Completed[a]?"CLEARED":unlocked?"READY":"LOCKED";
    });
    const all = done===4;
    $("day4Mission2Complete").classList.toggle("is-locked", !all);
    $("day4M2CompleteTitle").textContent = all ? "📡 Live Clinical Feed cleared." : "Live Clinical Feed is not cleared yet.";
    $("day4M2CompleteText").textContent = all ? "You verified what the three AI systems do, what the report does not claim, and why the final decision remains human." : "Complete all four live-feed activities.";
    $("day4Mission3Button").disabled=!all;
    $("day4Mission3Button").textContent=all?"Mission 3 · Override the Algorithm →":"🔒 Mission 3 · Override the Algorithm";
    const r2=$("ai4RoadmapM2"), r2s=$("ai4RoadmapM2State"), r3=$("ai4RoadmapM3"), r3s=$("ai4RoadmapM3State");
    if(r2){r2.classList.toggle("ready",m1Cleared&&!all);r2.classList.toggle("cleared",all);r2s.textContent=all?"02 · CLEARED":m1Cleared?"02 · READY":"02 · LOCKED";}
    if(r3){r3.classList.toggle("ready",all);r3s.textContent=all?"03 · READY":"03 · LOCKED";}
    if(m1Cleared && !state.mission2Started && m2Screen){m2Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">📡</span><h3>Live Clinical Feed ready</h3><p>Watch the supplied report, then start Feed Orientation.</p></div>';m2WorkspaceIntro.textContent="Watch the supplied report, then start Feed Orientation.";}
  }

  function start(name) {
    if (musicOn) startMusicPlayback();
    current={name,items:shuffle(itemsFor(name))}; index=0; attempts=0; sessionScore=0; state.started=true; save();
    workspaceTitle.textContent=meta[name][0]; workspaceIntro.textContent=meta[name][1]; feedback.textContent=""; feedback.className="ai4-feedback"; render();
  }

  function render() {
    const it=current.items[index]; if(!it){completeActivity();return;}
    const head=`<div class="ai4-question-top"><span>${current.name.toUpperCase()} · CHECKPOINT ${index+1}</span><b>${index+1} / ${current.items.length}</b></div>`;
    const prompt=it.kind==="vocab"?`<h3 class="ai4-term">${it.term}</h3><p class="ai4-ipa">${it.ipa}</p><button class="ai4-audio-btn" type="button" data-speak="${it.term.replace(/"/g,'&quot;')}">🔊 Hear word</button><p class="ai4-definition">Choose the correct definition.</p>`:`<h3 class="ai4-question">${it.q}</h3>`;
    screen.innerHTML=head+prompt+`<div class="ai4-options">${it.opts.map((o,i)=>`<button class="ai4-option" type="button" data-answer="${encodeURIComponent(o)}"><b>${String.fromCharCode(65+i)}</b> · ${o}</button>`).join("")}</div>`;
    screen.querySelectorAll("[data-answer]").forEach(b=>b.addEventListener("click",answer));
    screen.querySelectorAll("[data-speak]").forEach(b=>b.addEventListener("click",()=>speak(b.dataset.speak)));
    screen.focus();
  }

  function answer(e) {
    const it=current.items[index], chosen=decodeURIComponent(e.currentTarget.dataset.answer), good=chosen===it.a; attempts++;
    screen.querySelectorAll(".ai4-option").forEach(btn=>{btn.disabled=true;const v=decodeURIComponent(btn.dataset.answer);if(v===it.a)btn.classList.add("correct");else if(btn===e.currentTarget)btn.classList.add("wrong");});
    if(good){const pts=attempts===1?10:6;sessionScore+=pts;state.firstTryScore+=pts;feedback.className="ai4-feedback good";feedback.innerHTML=`<strong>System check passed.</strong> ${it.ex}`;cue(true);}else{feedback.className="ai4-feedback bad";feedback.innerHTML=`<strong>Review the signal.</strong> ${it.ex}`;cue(false);}
    save(); const next=document.createElement("button"); next.type="button"; next.className="ai4-primary ai4-next"; next.textContent=index===current.items.length-1?"Clear activity →":"Next checkpoint →"; next.addEventListener("click",()=>{index++;attempts=0;feedback.textContent="";feedback.className="ai4-feedback";render();}); feedback.appendChild(document.createElement("br")); feedback.appendChild(next); updateUI();
  }

  function completeActivity() {
    state.completed[current.name]=true; save(); screen.innerHTML=`<div class="ai4-waiting"><span aria-hidden="true">✅</span><h3>${meta[current.name][0]} cleared</h3><p>Activity score: ${sessionScore}. ${nextText(current.name)}</p></div>`; feedback.textContent=""; updateUI();
  }
  function nextText(name){const i=ACTIVITY_ORDER.indexOf(name);return i<ACTIVITY_ORDER.length-1?`${meta[ACTIVITY_ORDER[i+1]][0]} is now unlocked.`:"Mission 1 is complete. Live Clinical Feed is now ready.";}

  function startM2(name) {
    if (!ACTIVITY_ORDER.every(a=>state.completed[a])) return;
    if (musicOn && (!clinicalVideo || clinicalVideo.paused)) startMusicPlayback();
    m2Current={name,items:shuffle(m2ItemsFor(name))}; m2Index=0; m2Attempts=0; m2SessionScore=0; state.mission2Started=true; save();
    m2WorkspaceTitle.textContent=m2Meta[name][0]; m2WorkspaceIntro.textContent=m2Meta[name][1]; m2Feedback.textContent=""; m2Feedback.className="ai4-feedback"; renderM2();
  }

  function renderM2() {
    const it=m2Current.items[m2Index]; if(!it){completeM2Activity();return;}
    const moduleLabel = m2Current.name === "overview" ? "FIRST VIEWING" : m2Current.name === "sepsis" ? "SEPSIS FEED" : m2Current.name === "tools" ? "SPINE + EEG" : "HUMAN CONTROL";
    const extras = m2Current.name === "sepsis" && m2Index === 0 ? `<div class="ai4-evidence-strip"><article><strong>30,000</strong><span>sepsis cases / year</span></article><article><strong>≈ 2,000</strong><span>deaths</span></article><article><strong>earlier alerts</strong><span>support faster recognition</span></article></div>` : "";
    m2Screen.innerHTML=`<span class="ai4-feed-label">${moduleLabel}</span><div class="ai4-question-top"><span>LIVE FEED · CHECKPOINT ${m2Index+1}</span><b>${m2Index+1} / ${m2Current.items.length}</b></div><h3 class="ai4-question">${it.q}</h3>${extras}<div class="ai4-options">${it.opts.map((o,i)=>`<button class="ai4-option" type="button" data-m2-answer="${encodeURIComponent(o)}"><b>${String.fromCharCode(65+i)}</b> · ${o}</button>`).join("")}</div>${m2Current.name==="human"?'<div class="ai4-source-guardrail"><strong>Source guardrail:</strong> score what the report supports, not what you think AI could theoretically do.</div>':''}`;
    m2Screen.querySelectorAll("[data-m2-answer]").forEach(b=>b.addEventListener("click",answerM2));
    m2Screen.focus();
  }

  function answerM2(e) {
    const it=m2Current.items[m2Index], chosen=decodeURIComponent(e.currentTarget.dataset.m2Answer), good=chosen===it.a; m2Attempts++;
    m2Screen.querySelectorAll(".ai4-option").forEach(btn=>{btn.disabled=true;const v=decodeURIComponent(btn.dataset.m2Answer);if(v===it.a)btn.classList.add("correct");else if(btn===e.currentTarget)btn.classList.add("wrong");});
    if(good){const pts=m2Attempts===1?10:6;m2SessionScore+=pts;state.mission2FirstTryScore+=pts;m2Feedback.className="ai4-feedback good";m2Feedback.innerHTML=`<strong>Feed verified.</strong> ${it.ex}`;cue(true);}else{m2Feedback.className="ai4-feedback bad";m2Feedback.innerHTML=`<strong>Check the source again.</strong> ${it.ex}`;cue(false);}
    save(); const next=document.createElement("button"); next.type="button"; next.className="ai4-primary ai4-next"; next.textContent=m2Index===m2Current.items.length-1?"Clear feed module →":"Next feed checkpoint →"; next.addEventListener("click",()=>{m2Index++;m2Attempts=0;m2Feedback.textContent="";m2Feedback.className="ai4-feedback";renderM2();}); m2Feedback.appendChild(document.createElement("br")); m2Feedback.appendChild(next); updateUI();
  }

  function completeM2Activity() {
    state.mission2Completed[m2Current.name]=true; save(); const i=M2_ORDER.indexOf(m2Current.name); const next=i<M2_ORDER.length-1?`${m2Meta[M2_ORDER[i+1]][0]} is now unlocked.`:"Mission 2 is complete. Override the Algorithm is ready.";
    m2Screen.innerHTML=`<div class="ai4-waiting"><span aria-hidden="true">✅</span><h3>${m2Meta[m2Current.name][0]} cleared</h3><p>Activity score: ${m2SessionScore}. ${next}</p></div>`; m2Feedback.textContent=""; updateUI();
  }

  $("startDay4Mission1").addEventListener("click",()=>start("lexicon"));
  document.querySelectorAll("[data-ai4-activity]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)start(b.dataset.ai4Activity);}));
  document.querySelectorAll("[data-ai4-m2]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)startM2(b.dataset.ai4M2);}));

  $("day4SoundToggle").addEventListener("click",()=>{state.soundOff=!state.soundOff;save();updateUI();audioStatus.textContent=state.soundOff?"Sound effects and UK speech are off. Music is controlled separately.":"Sound effects and UK speech are on. Music is controlled separately.";});
  musicToggle.addEventListener("click",()=>{musicOn=!musicOn;localStorage.setItem(MUSIC_KEY,musicOn?"on":"off");applyMusicState(true);audioStatus.textContent=musicOn?"Music on. AI Clinical Control — Human in the Loop is playing.":"Music off. Sound effects and UK speech remain available.";});

  $("resetDay4").addEventListener("click",()=>{if(confirm("Reset all Day 4 progress on this device?")){state=freshState();save();current=null;m2Current=null;if(clinicalVideo){clinicalVideo.pause();clinicalVideo.currentTime=0;}screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🧠</span><h3>AI clinical control offline</h3><p>Start Mission 1 to initialise the system.</p></div>';workspaceTitle.textContent="System waiting";workspaceIntro.textContent="Boot Mission 1 to start the vocabulary clearance.";feedback.textContent="";m2Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">📡</span><h3>Clinical feed locked</h3><p>Mission 1 clearance is required.</p></div>';m2WorkspaceTitle.textContent="Feed waiting";m2WorkspaceIntro.textContent="Clear Mission 1, then start Feed Orientation.";m2Feedback.textContent="";updateUI();}});

  $("day4Mission2Button").addEventListener("click",()=>{if(!$("day4Mission2Button").disabled){$("day4Mission2").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Mission 2 ready. Watch the supplied video, then open Feed Orientation.";}});
  $("day4Mission3Button").addEventListener("click",()=>{if(!$("day4Mission3Button").disabled){audioStatus.textContent="Mission 3 · Override the Algorithm is unlocked and will be added in the next update.";}});

  if (clinicalVideo) {
    clinicalVideo.addEventListener("play",()=>{
      if(music && !music.paused){videoPausedMusic=true;music.pause();}
      audioStatus.textContent="Video playing. Day 4 background music is paused automatically.";
    });
    const resumeAfterVideo=()=>{
      if(videoPausedMusic && musicOn){videoPausedMusic=false;startMusicPlayback();audioStatus.textContent="Video paused. Day 4 background music resumed.";}
    };
    clinicalVideo.addEventListener("pause",resumeAfterVideo);
    clinicalVideo.addEventListener("ended",resumeAfterVideo);
  }

  updateUI();
  applyMusicState(false);
})();
