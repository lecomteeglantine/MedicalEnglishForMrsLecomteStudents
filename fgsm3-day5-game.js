(() => {
  "use strict";
  const KEY = "mrsLecomteFgsm3Day5StreamingV48";
  const MUSIC_KEY = "mrsLecomteFgsm3Day5Music";
  const defaultState = {
    sound:true,
    pilots:{},
    criteriaDone:false,
    criteriaScore:0,
    criteriaFirstTry:0,
    mission1:false,
    realityDone:false,
    realityScore:0,
    realityFirstTry:0,
    realityCards:0,
    realityIndex:0,
    realityOrder:[],
    realityAnsweredIds:[],
    mission2:false
  };
  let state = load();
  let currentQuestions = [];
  let qIndex = 0;
  let qFirstAttempt = true;
  let qLocked = false;
  let realityFirstAttempt = true;
  let realityLocked = false;
  let musicOn = localStorage.getItem(MUSIC_KEY) === "on";

  const pilots = {
    trauma:{title:"Trauma Bay", genre:"Emergency drama"},
    diagnosis:{title:"The Diagnosis", genre:"Medical mystery"},
    ward:{title:"Ward 17", genre:"Hospital ensemble"},
    knife:{title:"Under the Knife", genre:"Surgical drama"}
  };
  const dimensions = [
    ["medical","🩺 Medical realism","Are the clinical actions, investigations, timing and procedures plausible?"],
    ["teamwork","👥 Teamwork realism","Do professional roles and collaboration feel believable?"],
    ["communication","💬 Communication","Do clinicians communicate clearly and appropriately?"],
    ["ethics","⚖️ Ethics","Does the show handle consent, confidentiality, boundaries and responsibility credibly?"],
    ["entertainment","🎭 Entertainment","How engaging does this pilot sound as television?"]
  ];

  const criteriaQuestions = [
    {q:"A reviewer checks whether tests, investigations and procedures happen in a medically plausible way. What are they rating?",a:"Medical realism",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"Medical realism covers clinical actions, timing, investigations and procedures."},
    {q:"A scene gives one junior doctor every task while nurses and other professionals disappear. Which rating is most directly affected?",a:"Teamwork realism",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"Teamwork realism asks whether professional roles, collaboration and handovers are represented credibly."},
    {q:"A doctor explains uncertainty to a patient in clear language and checks understanding. Which category are you mainly rating?",a:"Communication",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"This is primarily about how clinicians communicate with patients."},
    {q:"A patient's confidential result is discussed loudly in a public corridor. Which category is most directly involved?",a:"Ethics",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"Confidentiality is an ethical issue, even though communication also matters."},
    {q:"A cliffhanger makes you desperate to watch the next episode. Which score should capture that?",a:"Entertainment",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"Entertainment measures storytelling value, pace and emotional engagement — not clinical accuracy."},
    {q:"A surgeon is shown performing a complex operation with no visible team at all. Which review lens best checks whether roles are being simplified?",a:"Teamwork realism",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"The key issue here is the representation of professional roles and collaboration."},
    {q:"A diagnosis appears almost instantly although the scene itself suggests several investigations would normally be needed. Which rating is most directly tested?",a:"Medical realism",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"Timing and the plausibility of the diagnostic process belong under medical realism."},
    {q:"A doctor gives bad news using unexplained jargon and never checks what the patient understood. What are you mainly rating?",a:"Communication",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"The central problem is how information is communicated to the patient."},
    {q:"A patient undergoes a major procedure without any sign that consent has been discussed. Which category should trigger the strongest warning?",a:"Ethics",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"Consent is a core ethical issue."},
    {q:"A scene is medically plausible but slow and emotionally flat. Which score could still be low?",a:"Entertainment",opts:["Medical realism","Teamwork realism","Communication","Ethics","Entertainment"],ex:"A scene can be realistic and still be weak television. The two dimensions are deliberately separate."}
  ];

  const realityQuestions = [
    {id:"cbs1",source:"CBS · The Pitt",tag:"VIDEO EVIDENCE",q:"The Pitt keeps emergency medicine physicians on set at all times.",a:"SUPPORTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"CBS quotes a UPMC emergency physician saying emergency medicine physicians are on set at all times."},
    {id:"cbs2",source:"CBS · The Pitt",tag:"VIDEO EVIDENCE",q:"The source says The Pitt is realistic because its actors are licensed doctors.",a:"NOT STATED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"The source credits medical experts, writers and producers; it does not say the actors are licensed doctors."},
    {id:"cbs3",source:"CBS · The Pitt",tag:"VIDEO EVIDENCE",q:"The show has been praised for accurate complex medical language and procedures, as well as the topics it tackles.",a:"SUPPORTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"That is explicitly part of the praise described in the CBS report."},
    {id:"cbs4",source:"CBS · The Pitt",tag:"VIDEO EVIDENCE",q:"Because The Pitt uses medical experts, the CBS report proves that modern medical dramas are generally realistic.",a:"OVERCLAIM",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"The report is about one series. Generalising from The Pitt to medical drama as a whole goes beyond the evidence."},
    {id:"cbs5",source:"CBS · The Pitt",tag:"VIDEO EVIDENCE",q:"The producers asked physicians which medical-drama storylines had not yet been told and deserved attention.",a:"SUPPORTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"CBS describes the team asking clinicians what untold stories should be represented."},

    {id:"cc1",source:"Cleveland Clinic",tag:"ARTICLE EVIDENCE",q:"Medical TV shows are reliable sources of medical advice because they use real terminology.",a:"CONTRADICTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"The article explicitly warns viewers not to use medical dramas as sources of medical advice."},
    {id:"cc2",source:"Cleveland Clinic",tag:"ARTICLE EVIDENCE",q:"A review cited in the article found 242 medical errors across eight TV series — about six errors per hour of viewing.",a:"SUPPORTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"Those figures are reported in the Cleveland Clinic article when discussing the exaggeration of medical errors."},
    {id:"cc3",source:"Cleveland Clinic",tag:"ARTICLE EVIDENCE",q:"The article says most disease names, medicines and procedures used in medical dramas are invented for television.",a:"CONTRADICTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"It says the opposite: medical dramas often use genuine medical terms even when the surrounding story is dramatised."},
    {id:"cc4",source:"Cleveland Clinic",tag:"ARTICLE EVIDENCE",q:"The article presents one doctor following a patient from the emergency department through surgery as a realistic feature of hospital work.",a:"CONTRADICTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"That is given as an example of how television oversimplifies professional roles and team care."},
    {id:"cc5",source:"Cleveland Clinic",tag:"ARTICLE EVIDENCE",q:"Real doctors may spend substantial time advocating for patients, filling in charts and making phone calls — work television often leaves out.",a:"SUPPORTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"The article specifically points to advocacy, charting and phone calls as ordinary parts of real medical work."},

    {id:"wh1",source:"Witten/Herdecke research",tag:"RESEARCH SIGNAL",q:"The doctoral project described by Witten/Herdecke University analysed more than 300 episodes.",a:"SUPPORTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"The university summary states that more than 300 episodes were intensively analysed."},
    {id:"wh2",source:"Witten/Herdecke research",tag:"RESEARCH SIGNAL",q:"The study summary reports that depictions of illness, death and intensive-care scenarios can differ sharply from reality.",a:"SUPPORTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"That is the central conclusion presented in the university summary."},
    {id:"wh3",source:"Witten/Herdecke research",tag:"RESEARCH SIGNAL",q:"According to the research summary, real deaths are usually shown as dramatic emergency operations, just as they are on television.",a:"CONTRADICTED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"The contrast runs the other way: television foregrounds dramatic emergency operations, while real deaths may be quiet and uneventful."},
    {id:"wh4",source:"Witten/Herdecke research",tag:"RESEARCH SIGNAL",q:"The research proves that no medical television series can ever be realistic.",a:"OVERCLAIM",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"The project identifies discrepancies in some depictions. It does not establish that every medical series is unrealistic in every respect."},
    {id:"wh5",source:"Witten/Herdecke research",tag:"RESEARCH SIGNAL",q:"The university summary says that Grey's Anatomy was the only series included in the research.",a:"NOT STATED",opts:["SUPPORTED","CONTRADICTED","NOT STATED","OVERCLAIM"],ex:"Grey's Anatomy is mentioned as an example of medical television, but the summary does not give a complete list of the analysed series."}
  ];

  const coreEvidence = [
    ["CBS","The Pitt uses emergency-medicine physicians on set and has been praised for credible language, procedures and medically informed storylines."],
    ["CBS","A highly accurate series can result from producers actively listening to medical expertise — but one series cannot represent all medical television."],
    ["Cleveland Clinic","Medical dramas may exaggerate errors, simplify professional roles and compress real hospital work for entertainment."],
    ["Cleveland Clinic","Medical terminology on television is often genuine even when the surrounding situation is dramatised."],
    ["Cleveland Clinic","Advocacy, charting and phone calls are ordinary parts of medical work that television rarely foregrounds."],
    ["Witten/Herdecke","A research project analysing 300+ episodes found substantial gaps between screen depictions and reality in illness, death and intensive care."]
  ];

  function $(id){return document.getElementById(id);}
  function load(){try{return {...defaultState,...JSON.parse(localStorage.getItem(KEY)||"{}")} }catch(e){return {...defaultState};}}
  function save(){localStorage.setItem(KEY,JSON.stringify(state)); updateUI();}
  function shuffle(arr){const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a;}
  function ping(freq=520,dur=.055){if(!state.sound)return; try{const C=window.AudioContext||window.webkitAudioContext; const c=new C(),o=c.createOscillator(),g=c.createGain(); o.frequency.value=freq; o.type="sine"; g.gain.setValueAtTime(.035,c.currentTime); g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur); o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+dur); setTimeout(()=>c.close(),200);}catch(e){}}
  function startMusicPlayback(){const music=$("day5Music"); if(!music)return; music.volume=.18; const p=music.play(); if(p&&typeof p.catch==="function")p.catch(()=>{$("day5AudioStatus").textContent="Music is ready. Tap Music again if your browser blocked playback.";});}
  function stopMusicPlayback(reset=true){const music=$("day5Music"); if(!music)return; music.pause(); if(reset)music.currentTime=0;}
  function syncMusicButton(){const b=$("day5MusicToggle"); if(!b)return; b.setAttribute("aria-pressed",String(musicOn)); b.textContent=musicOn?"🎵 Music ON":"🎵 Music OFF";}
  function applyMusicState(fromUser=false){syncMusicButton(); if(musicOn){if(fromUser)startMusicPlayback();}else stopMusicPlayback();}
  function esc(s){return String(s).replace(/[&<>\"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}

  function updateUI(){
    const reviewed=Object.keys(state.pilots||{}).filter(k=>state.pilots[k]&&state.pilots[k].submitted).length;
    const done=reviewed + (state.criteriaDone?1:0);
    $("day5ProgressText").textContent=`${done} / 5`;
    $("day5ProgressBar").style.width=`${done*20}%`;
    Object.keys(pilots).forEach(k=>{const el=$("pilotState"+k[0].toUpperCase()+k.slice(1)); if(el){const ok=state.pilots?.[k]?.submitted; el.textContent=ok?"REVIEWED":"NOT REVIEWED"; el.classList.toggle("is-done",!!ok);}});
    const start=$("startCriteriaCheck");
    if(reviewed===4){start.disabled=false; start.textContent=state.criteriaDone?"✓ Review Criteria Check cleared":"Start Review Criteria Check →";} else {start.disabled=true; start.textContent=`🔒 Review ${4-reviewed} more pilot${4-reviewed===1?"":"s"}`;}

    const complete=$("day5Mission1Complete");
    const m2Button=$("day5Mission2Button");
    if(state.mission1){
      complete.classList.remove("is-locked");
      $("day5CompleteTitle").textContent="Board seat confirmed.";
      $("day5CompleteText").textContent=`You rated all four pilots and cleared the review criteria with ${state.criteriaScore}/100. Your first impressions are saved for comparison with the evidence.`;
      m2Button.disabled=false;
      m2Button.textContent=state.mission2?"✓ Mission 2 · Reality Intelligence cleared":"Open Mission 2 · Reality Intelligence →";
    } else {
      complete.classList.add("is-locked");
      $("day5CompleteTitle").textContent="Your board seat is not confirmed yet.";
      $("day5CompleteText").textContent="Rate the four pilots and clear the Review Criteria Check.";
      m2Button.disabled=true;
      m2Button.textContent="🔒 Mission 2 · Reality Intelligence";
    }

    const m2=$("day5Mission2");
    const startReality=$("startRealityCheck");
    if(state.mission1){m2.classList.remove("is-locked"); startReality.disabled=false; startReality.textContent=state.mission2?"✓ Reality Intelligence cleared":"Start Reality Intelligence Check →";}
    else {m2.classList.add("is-locked"); startReality.disabled=true; startReality.textContent="🔒 Complete Mission 1 first";}

    const cards=Math.min(Number(state.realityCards)||0,realityQuestions.length);
    $("day5EvidenceText").textContent=`${cards} / ${realityQuestions.length}`;
    $("day5EvidenceBar").style.width=`${(cards/realityQuestions.length)*100}%`;

    const m2Complete=$("day5Mission2Complete");
    const m3Button=$("day5Mission3Button");
    if(state.mission2){
      m2Complete.classList.remove("is-locked");
      $("day5M2CompleteTitle").textContent="Reality Intelligence cleared.";
      $("day5M2CompleteText").textContent=`You collected all ${realityQuestions.length} evidence cards and scored ${state.realityScore}/${realityQuestions.length*10}.`;
      m3Button.disabled=false;
      m3Button.textContent="✓ Mission 3 · Script Audit · Next update";
      $("day5Mission3LockChip").textContent="✓ Evidence deck ready";
    } else {
      m2Complete.classList.add("is-locked");
      $("day5M2CompleteTitle").textContent="Evidence feed not cleared yet.";
      $("day5M2CompleteText").textContent=`Collect all ${realityQuestions.length} evidence cards.`;
      m3Button.disabled=true;
      m3Button.textContent="🔒 Mission 3 · Script Audit";
      $("day5Mission3LockChip").textContent="🔒 Script room locked";
    }

    const r1=$("day5Route1"),r2=$("day5Route2"),r3=$("day5Route3");
    [r1,r2,r3].forEach(el=>{if(el){el.classList.remove("is-current","is-done");}});
    if(!state.mission1){r1?.classList.add("is-current");}
    else {r1?.classList.add("is-done"); if(!state.mission2)r2?.classList.add("is-current"); else {r2?.classList.add("is-done"); r3?.classList.add("is-current");}}
  }

  function showPilot(key){
    const p=pilots[key], saved=state.pilots?.[key]||{};
    $("stream5WorkspaceTitle").textContent=`First impression · ${p.title}`;
    $("stream5WorkspaceIntro").textContent="Rate the concept before seeing the evidence. There is no correct opinion here.";
    document.querySelector(".stream5-score-box span").textContent="CRITERIA SCORE";
    $("day5Score").textContent=state.criteriaScore||0;
    const sliders=dimensions.map(([id,label,help])=>{const val=saved[id]||3; return `<label class="stream5-slider-row"><span><strong>${label}</strong><small>${help}</small></span><input type="range" min="1" max="5" step="1" value="${val}" data-rating="${id}"><output data-out="${id}">${val}/5</output></label>`;}).join("");
    $("stream5Screen").innerHTML=`<div class="stream5-review-panel"><div class="stream5-review-title"><span>FIRST IMPRESSION</span><h3>${esc(p.title)}</h3><p>${esc(p.genre)} · Rate the pitch, not the real-world medical accuracy. Evidence comes later.</p></div><div class="stream5-sliders">${sliders}</div><label class="stream5-comment"><span>Optional board note</span><textarea id="pilotNote" maxlength="240" placeholder="What makes you trust or distrust this pilot at first glance?">${esc(saved.note||"")}</textarea></label><button id="savePilotReview" class="stream5-primary" type="button">Save first impression</button></div>`;
    $("stream5Screen").querySelectorAll("input[type=range]").forEach(inp=>inp.addEventListener("input",()=>{$("stream5Screen").querySelector(`[data-out="${inp.dataset.rating}"]`).textContent=`${inp.value}/5`;}));
    $("savePilotReview").addEventListener("click",()=>{const values={submitted:true,note:$("pilotNote").value.trim()}; $("stream5Screen").querySelectorAll("[data-rating]").forEach(i=>values[i.dataset.rating]=Number(i.value)); state.pilots={...(state.pilots||{}),[key]:values}; save(); ping(680,.08); $("stream5Feedback").innerHTML=`<div class="stream5-feedback-good"><strong>Saved.</strong> Your first impression of ${esc(p.title)} is on the board. You will be able to compare it with source evidence later.</div>`;});
    $("stream5Screen").focus();
  }

  function startCriteria(){
    currentQuestions=shuffle(criteriaQuestions).map(q=>({...q,opts:shuffle(q.opts)})); qIndex=0; state.criteriaScore=0; state.criteriaFirstTry=0; state.criteriaDone=false; qFirstAttempt=true; renderQuestion();
  }
  function renderQuestion(){
    const item=currentQuestions[qIndex]; if(!item){finishCriteria();return;}
    qLocked=false; qFirstAttempt=true;
    document.querySelector(".stream5-score-box span").textContent="CRITERIA SCORE";
    $("day5Score").textContent=state.criteriaScore||0;
    $("stream5WorkspaceTitle").textContent="Review Criteria Check";
    $("stream5WorkspaceIntro").textContent=`Checkpoint ${qIndex+1} of ${currentQuestions.length} · Identify the review lens.`;
    $("stream5Feedback").innerHTML="";
    $("stream5Screen").innerHTML=`<div class="stream5-question"><div class="stream5-question-meta"><span>BOARD TRAINING</span><b>${qIndex+1}/${currentQuestions.length}</b></div><h3>${esc(item.q)}</h3><div class="stream5-options">${item.opts.map((o,i)=>`<button type="button" class="stream5-option" data-opt="${esc(o)}"><span>${String.fromCharCode(65+i)}</span>${esc(o)}</button>`).join("")}</div></div>`;
    $("stream5Screen").querySelectorAll(".stream5-option").forEach(btn=>btn.addEventListener("click",()=>answer(btn,item)));
    $("stream5Screen").focus();
  }
  function answer(btn,item){
    if(qLocked)return;
    const choice=btn.dataset.opt;
    if(choice===item.a){
      qLocked=true; btn.classList.add("is-correct"); const pts=qFirstAttempt?10:6; state.criteriaScore += pts; if(qFirstAttempt) state.criteriaFirstTry += 1; save(); ping(760,.08);
      document.querySelector(".stream5-score-box span").textContent="CRITERIA SCORE";
      $("day5Score").textContent=state.criteriaScore;
      $("stream5Feedback").innerHTML=`<div class="stream5-feedback-good"><strong>Correct · +${pts}</strong> ${esc(item.ex)} <button id="nextCriterion" class="stream5-inline-next" type="button">${qIndex===currentQuestions.length-1?"Finish check":"Next checkpoint →"}</button></div>`;
      $("nextCriterion").addEventListener("click",()=>{qIndex++;renderQuestion();});
    } else {
      qFirstAttempt=false; btn.classList.add("is-wrong"); btn.disabled=true; ping(220,.10); $("stream5Feedback").innerHTML=`<div class="stream5-feedback-bad"><strong>Not that lens.</strong> Try again — the distinction matters when you audit a scene later.</div>`;
    }
  }
  function finishCriteria(){
    state.criteriaDone=true; state.mission1=true; save(); ping(880,.14);
    $("stream5WorkspaceTitle").textContent="Review Board training cleared";
    $("stream5WorkspaceIntro").textContent="You now have a common rating language for the four pilots.";
    document.querySelector(".stream5-score-box span").textContent="CRITERIA SCORE";
    $("day5Score").textContent=state.criteriaScore;
    $("stream5Screen").innerHTML=`<div class="stream5-clearance"><span>🎟️</span><h3>Review Board Admitted</h3><p><strong>${state.criteriaScore}/100</strong> · ${state.criteriaFirstTry}/10 criteria identified on the first attempt.</p><p>Your four first-impression ratings are saved. Mission 2 will make you revise your instincts using source evidence.</p><button id="scrollComplete" class="stream5-primary" type="button">Open the evidence desk ↓</button></div>`;
    $("scrollComplete").addEventListener("click",()=>$("day5Mission2").scrollIntoView({behavior:"smooth",block:"start"}));
  }

  function startReality(){
    if(!state.mission1)return;
    if(state.mission2){showRealityClearance();return;}
    if(!Array.isArray(state.realityOrder)||state.realityOrder.length!==realityQuestions.length){
      state.realityOrder=shuffle(realityQuestions.map(q=>q.id));
      state.realityIndex=0;
      state.realityScore=0;
      state.realityFirstTry=0;
      state.realityCards=0;
      state.realityAnsweredIds=[];
      save();
    }
    renderRealityQuestion();
    document.querySelector(".stream5-workspace").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function realityItem(){
    const id=state.realityOrder?.[state.realityIndex];
    return realityQuestions.find(q=>q.id===id);
  }
  function renderRealityQuestion(){
    const item=realityItem();
    if(!item){finishReality();return;}
    realityLocked=false; realityFirstAttempt=true;
    document.querySelector(".stream5-score-box span").textContent="REALITY SCORE";
    $("day5Score").textContent=state.realityScore||0;
    $("stream5WorkspaceTitle").textContent="Reality Intelligence";
    $("stream5WorkspaceIntro").textContent=`Evidence card ${state.realityIndex+1} of ${realityQuestions.length} · Read the claim against the named source.`;
    $("stream5Feedback").innerHTML="";
    const opts=shuffle(item.opts);
    $("stream5Screen").innerHTML=`<div class="stream5-question stream5-reality-question"><div class="stream5-question-meta"><span>${esc(item.tag)}</span><b>${state.realityIndex+1}/${realityQuestions.length}</b></div><div class="stream5-source-pill">${esc(item.source)}</div><p class="stream5-claim-label">CLAIM UNDER REVIEW</p><h3>${esc(item.q)}</h3><div class="stream5-options stream5-verdict-options">${opts.map((o,i)=>`<button type="button" class="stream5-option" data-opt="${esc(o)}"><span>${String.fromCharCode(65+i)}</span>${esc(o)}</button>`).join("")}</div></div>`;
    $("stream5Screen").querySelectorAll(".stream5-option").forEach(btn=>btn.addEventListener("click",()=>answerReality(btn,item)));
    $("stream5Screen").focus();
  }
  function answerReality(btn,item){
    if(realityLocked)return;
    const choice=btn.dataset.opt;
    if(choice===item.a){
      realityLocked=true;
      btn.classList.add("is-correct");
      const newCard=!(state.realityAnsweredIds||[]).includes(item.id);
      const pts=realityFirstAttempt?10:6;
      if(newCard){
        state.realityScore=(state.realityScore||0)+pts;
        if(realityFirstAttempt)state.realityFirstTry=(state.realityFirstTry||0)+1;
        state.realityCards=(state.realityCards||0)+1;
        state.realityAnsweredIds=[...(state.realityAnsweredIds||[]),item.id];
      }
      save(); ping(790,.08);
      document.querySelector(".stream5-score-box span").textContent="REALITY SCORE";
      $("day5Score").textContent=state.realityScore;
      $("stream5Feedback").innerHTML=`<div class="stream5-feedback-good"><strong>${esc(item.a)} · Evidence card collected${newCard?` · +${pts}`:""}</strong> ${esc(item.ex)} <button id="nextReality" class="stream5-inline-next" type="button">${state.realityIndex===realityQuestions.length-1?"Complete evidence deck":"Next evidence card →"}</button></div>`;
      $("nextReality").addEventListener("click",()=>{state.realityIndex=(state.realityIndex||0)+1; save(); renderRealityQuestion();});
    } else {
      realityFirstAttempt=false;
      btn.classList.add("is-wrong"); btn.disabled=true; ping(210,.10);
      const hint=choice==="OVERCLAIM"?"Overclaim means the statement goes further than the source allows.":choice==="NOT STATED"?"Not stated means the source gives no basis for deciding this claim.":"Check whether the source supports this claim, contradicts it, or simply does not address it.";
      $("stream5Feedback").innerHTML=`<div class="stream5-feedback-bad"><strong>Evidence mismatch.</strong> ${hint} Try again.</div>`;
    }
  }
  function finishReality(){
    state.realityDone=true; state.mission2=true; state.realityCards=realityQuestions.length; save(); ping(920,.15); showRealityClearance();
  }
  function showRealityClearance(){
    document.querySelector(".stream5-score-box span").textContent="REALITY SCORE";
    $("day5Score").textContent=state.realityScore||0;
    $("stream5WorkspaceTitle").textContent="Reality Intelligence cleared";
    $("stream5WorkspaceIntro").textContent="Your evidence deck is ready for the script room.";
    $("stream5Feedback").innerHTML="";
    const cards=coreEvidence.map(([src,text])=>`<article class="stream5-evidence-summary-card"><span>${esc(src)}</span><p>${esc(text)}</p></article>`).join("");
    $("stream5Screen").innerHTML=`<div class="stream5-clearance stream5-reality-clearance"><span>📡</span><h3>Reality Intelligence Analyst</h3><p><strong>${state.realityScore}/${realityQuestions.length*10}</strong> · ${state.realityFirstTry}/${realityQuestions.length} evidence judgements correct on the first attempt.</p><p>The key lesson is not “TV medicine is fake”. Some productions can be remarkably careful; others compress, simplify or dramatise reality. Your job is to know what the evidence actually supports.</p><div class="stream5-evidence-summary">${cards}</div><button id="scrollM2Complete" class="stream5-primary" type="button">See mission clearance ↓</button></div>`;
    $("scrollM2Complete").addEventListener("click",()=>$("day5Mission2Complete").scrollIntoView({behavior:"smooth",block:"center"}));
  }

  document.addEventListener("DOMContentLoaded",()=>{
    updateUI();
    $("startDay5Mission1").addEventListener("click",()=>{document.querySelector(".stream5-board").scrollIntoView({behavior:"smooth"}); ping();});
    document.querySelectorAll(".pilot-review-btn").forEach(b=>b.addEventListener("click",()=>showPilot(b.dataset.review)));
    $("startCriteriaCheck").addEventListener("click",()=>{if(!$("startCriteriaCheck").disabled) startCriteria();});
    $("day5SoundToggle").addEventListener("click",()=>{state.sound=!state.sound; $("day5SoundToggle").textContent=state.sound?"🔊 Sound ON":"🔇 Sound OFF"; $("day5SoundToggle").setAttribute("aria-pressed",String(state.sound)); save(); $("day5AudioStatus").textContent=state.sound?"Sound effects are on. Music is controlled separately.":"Sound effects are off. Music is controlled separately."; if(state.sound)ping();});
    $("day5MusicToggle").addEventListener("click",()=>{musicOn=!musicOn; localStorage.setItem(MUSIC_KEY,musicOn?"on":"off"); applyMusicState(true); $("day5AudioStatus").textContent=musicOn?"Music on. Streaming Platform Review Board — Greenlight Room is playing.":"Music off. Sound effects remain available.";});
    $("resetDay5").addEventListener("click",()=>{if(confirm("Reset all Day 5 ratings and progress on this device?")){localStorage.removeItem(KEY); state={...defaultState,pilots:{}}; location.reload();}});
    $("day5Mission2Button").addEventListener("click",()=>{if(state.mission1)$("day5Mission2").scrollIntoView({behavior:"smooth",block:"start"});});
    $("startRealityCheck").addEventListener("click",()=>{if(!$("startRealityCheck").disabled)startReality();});
    $("day5Mission3Button").addEventListener("click",()=>{$("day5AudioStatus").textContent="Mission 3 · Script Audit is next. Your evidence deck is saved on this device.";});
    $("day5SoundToggle").textContent=state.sound?"🔊 Sound ON":"🔇 Sound OFF";
    $("day5SoundToggle").setAttribute("aria-pressed",String(state.sound));
    applyMusicState(false);
    if(state.mission2){showRealityClearance();}
  });
})();
