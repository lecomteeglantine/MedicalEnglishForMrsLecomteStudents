(() => {
  "use strict";
  const KEY = "mrsLecomteFgsm3Day5StreamingV48";
  const MUSIC_KEY = "mrsLecomteFgsm3Day5Music";
  const defaultState = { sound:true, pilots:{}, criteriaDone:false, criteriaScore:0, criteriaFirstTry:0, mission1:false };
  let state = load();
  let currentQuestions = [];
  let qIndex = 0;
  let qFirstAttempt = true;
  let qLocked = false;
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

  function $(id){return document.getElementById(id);}
  function load(){try{return {...defaultState,...JSON.parse(localStorage.getItem(KEY)||"{}")};}catch(e){return {...defaultState};}}
  function save(){localStorage.setItem(KEY,JSON.stringify(state)); updateUI();}
  function shuffle(arr){const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a;}
  function ping(freq=520,dur=.055){if(!state.sound)return; try{const C=window.AudioContext||window.webkitAudioContext; const c=new C(),o=c.createOscillator(),g=c.createGain(); o.frequency.value=freq; o.type="sine"; g.gain.setValueAtTime(.035,c.currentTime); g.gain.exponentialRampToValueAtTime(.001,c.currentTime+dur); o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+dur); setTimeout(()=>c.close(),200);}catch(e){}}
  function startMusicPlayback(){const music=$("day5Music"); if(!music)return; music.volume=.18; const p=music.play(); if(p&&typeof p.catch==="function")p.catch(()=>{$("day5AudioStatus").textContent="Music is ready. Tap Music again if your browser blocked playback.";});}
  function stopMusicPlayback(reset=true){const music=$("day5Music"); if(!music)return; music.pause(); if(reset)music.currentTime=0;}
  function syncMusicButton(){const b=$("day5MusicToggle"); if(!b)return; b.setAttribute("aria-pressed",String(musicOn)); b.textContent=musicOn?"🎵 Music ON":"🎵 Music OFF";}
  function applyMusicState(fromUser=false){syncMusicButton(); if(musicOn){if(fromUser)startMusicPlayback();}else stopMusicPlayback();}
  function esc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}

  function updateUI(){
    const reviewed=Object.keys(state.pilots||{}).filter(k=>state.pilots[k]&&state.pilots[k].submitted).length;
    const done=reviewed + (state.criteriaDone?1:0);
    $("day5ProgressText").textContent=`${done} / 5`;
    $("day5ProgressBar").style.width=`${done*20}%`;
    $("day5Score").textContent=state.criteriaScore||0;
    Object.keys(pilots).forEach(k=>{const el=$("pilotState"+k[0].toUpperCase()+k.slice(1)); if(el){const ok=state.pilots?.[k]?.submitted; el.textContent=ok?"REVIEWED":"NOT REVIEWED"; el.classList.toggle("is-done",!!ok);}});
    const start=$("startCriteriaCheck");
    if(reviewed===4){start.disabled=false; start.textContent=state.criteriaDone?"✓ Review Criteria Check cleared":"Start Review Criteria Check →";} else {start.disabled=true; start.textContent=`🔒 Review ${4-reviewed} more pilot${4-reviewed===1?"":"s"}`;}
    const complete=$("day5Mission1Complete");
    if(state.mission1){complete.classList.remove("is-locked"); $("day5CompleteTitle").textContent="Board seat confirmed."; $("day5CompleteText").textContent=`You rated all four pilots and cleared the review criteria with ${state.criteriaScore}/100. Your first impressions are saved for comparison with the evidence later.`; $("day5Mission2Button").textContent="✓ Mission 2 · Reality Intelligence · Next update";}
    else {complete.classList.add("is-locked"); $("day5CompleteTitle").textContent="Your board seat is not confirmed yet."; $("day5CompleteText").textContent="Rate the four pilots and clear the Review Criteria Check.";}
  }

  function showPilot(key){
    const p=pilots[key], saved=state.pilots?.[key]||{};
    $("stream5WorkspaceTitle").textContent=`First impression · ${p.title}`;
    $("stream5WorkspaceIntro").textContent="Rate the concept before seeing the evidence. There is no correct opinion here.";
    const sliders=dimensions.map(([id,label,help])=>{const val=saved[id]||3; return `<label class="stream5-slider-row"><span><strong>${label}</strong><small>${help}</small></span><input type="range" min="1" max="5" step="1" value="${val}" data-rating="${id}"><output data-out="${id}">${val}/5</output></label>`;}).join("");
    $("stream5Screen").innerHTML=`<div class="stream5-review-panel"><div class="stream5-review-title"><span>FIRST IMPRESSION</span><h3>${esc(p.title)}</h3><p>${esc(p.genre)} · Rate the pitch, not the real-world medical accuracy. Evidence comes later.</p></div><div class="stream5-sliders">${sliders}</div><label class="stream5-comment"><span>Optional board note</span><textarea id="pilotNote" maxlength="240" placeholder="What makes you trust or distrust this pilot at first glance?">${esc(saved.note||"")}</textarea></label><button id="savePilotReview" class="stream5-primary" type="button">Save first impression</button></div>`;
    $("stream5Screen").querySelectorAll("input[type=range]").forEach(inp=>inp.addEventListener("input",()=>{$(`stream5Screen`).querySelector(`[data-out="${inp.dataset.rating}"]`).textContent=`${inp.value}/5`;}));
    $("savePilotReview").addEventListener("click",()=>{const values={submitted:true,note:$("pilotNote").value.trim()}; $("stream5Screen").querySelectorAll("[data-rating]").forEach(i=>values[i.dataset.rating]=Number(i.value)); state.pilots={...(state.pilots||{}),[key]:values}; save(); ping(680,.08); $("stream5Feedback").innerHTML=`<div class="stream5-feedback-good"><strong>Saved.</strong> Your first impression of ${esc(p.title)} is on the board. You will be able to compare it with source evidence later.</div>`;});
    $("stream5Screen").focus();
  }

  function startCriteria(){
    currentQuestions=shuffle(criteriaQuestions).map(q=>({...q,opts:shuffle(q.opts)})); qIndex=0; state.criteriaScore=0; state.criteriaFirstTry=0; state.criteriaDone=false; qFirstAttempt=true; renderQuestion();
  }
  function renderQuestion(){
    const item=currentQuestions[qIndex]; if(!item){finishCriteria();return;}
    qLocked=false; qFirstAttempt=true;
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
    $("stream5Screen").innerHTML=`<div class="stream5-clearance"><span>🎟️</span><h3>Review Board Admitted</h3><p><strong>${state.criteriaScore}/100</strong> · ${state.criteriaFirstTry}/10 criteria identified on the first attempt.</p><p>Your four first-impression ratings are saved. Later missions will make you revise them using evidence rather than instinct.</p><button id="scrollComplete" class="stream5-primary" type="button">See mission clearance ↓</button></div>`;
    $("scrollComplete").addEventListener("click",()=>$("day5Mission1Complete").scrollIntoView({behavior:"smooth",block:"center"}));
  }

  document.addEventListener("DOMContentLoaded",()=>{
    updateUI();
    $("startDay5Mission1").addEventListener("click",()=>{document.querySelector(".stream5-board").scrollIntoView({behavior:"smooth"}); ping();});
    document.querySelectorAll(".pilot-review-btn").forEach(b=>b.addEventListener("click",()=>showPilot(b.dataset.review)));
    $("startCriteriaCheck").addEventListener("click",()=>{if(!$("startCriteriaCheck").disabled) startCriteria();});
    $("day5SoundToggle").addEventListener("click",()=>{state.sound=!state.sound; $("day5SoundToggle").textContent=state.sound?"🔊 Sound ON":"🔇 Sound OFF"; $("day5SoundToggle").setAttribute("aria-pressed",String(state.sound)); save(); $("day5AudioStatus").textContent=state.sound?"Sound effects are on. Music is controlled separately.":"Sound effects are off. Music is controlled separately."; if(state.sound)ping();});
    $("day5MusicToggle").addEventListener("click",()=>{musicOn=!musicOn; localStorage.setItem(MUSIC_KEY,musicOn?"on":"off"); applyMusicState(true); $("day5AudioStatus").textContent=musicOn?"Music on. Streaming Platform Review Board — Greenlight Room is playing.":"Music off. Sound effects remain available.";});
    $("resetDay5").addEventListener("click",()=>{if(confirm("Reset all Day 5 ratings and progress on this device?")){localStorage.removeItem(KEY); state={...defaultState,pilots:{}}; location.reload();}});
    $("day5Mission2Button").addEventListener("click",()=>{$("day5AudioStatus").textContent="Mission 2 will be added once the class video evidence is integrated.";});
    $("day5SoundToggle").textContent=state.sound?"🔊 Sound ON":"🔇 Sound OFF";
    $("day5SoundToggle").setAttribute("aria-pressed",String(state.sound));
    applyMusicState(false);
  });
})();
