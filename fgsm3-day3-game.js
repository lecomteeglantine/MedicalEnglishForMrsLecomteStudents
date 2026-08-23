(() => {
  const STORAGE_KEY = "mrsLecomteFgsm3Day3FieldMissionV31";
  const SOUND_KEY = "mrsLecomteFgsm3Day3Sound";
  const MUSIC_KEY = "mrsLecomteFgsm3Day3Music";
  const $ = id => document.getElementById(id);

  const activities = {
    vocab: {
      title: "Vocabulary Clearance",
      intro: "Match each field term to the meaning used in your Day 3 worksheet.",
      items: [
        ["a humanitarian crisis", "A situation where many people's basic needs are not met"],
        ["displaced people", "People forced to leave their homes"],
        ["an evacuation order", "An official instruction to leave an area for safety"],
        ["a shelter", "A place giving temporary protection or housing"],
        ["a refugee camp", "A temporary settlement for people who have fled danger"],
        ["a strike", "A military attack, for example by bombing"],
        ["to cope with", "To deal successfully with a difficult situation"],
        ["commodities", "Basic goods people need, such as food and hygiene items"],
        ["to be targeted", "To be deliberately chosen as the object of an attack"],
        ["to be trapped", "To be unable to escape from a place"]
      ]
    },
    situation: {
      title: "Build the Field Picture",
      intro: "Use only what the Day 3 briefing states. Choose the description that matches each reported detail.",
      items: [
        {q:"Hundreds of thousands of people have been displaced. What is the central population problem?", a:"A massive number of people have been forced from their homes", wrong:["A shortage of doctors only","A routine seasonal migration"]},
        {q:"One shelter has more than 800 people and only eight bathrooms. What does that detail show?", a:"Severe overcrowding and very poor shelter conditions", wrong:["A well-resourced reception centre","A short administrative delay"]},
        {q:"Why can some people in the south not be reached?", a:"Continuous strikes make access too dangerous", wrong:["They have refused all medical care","There are no healthcare workers in the country"]},
        {q:"Which set of needs does Massad identify as a major concern?", a:"Safety, water, food and medical care", wrong:["Tourism, fuel prices and elections","Only long-term specialist training"]}
      ]
    },
    video: {
      title: "CNN / MSF Briefing",
      intro: "Watch the supplied interview. These checkpoints test general understanding from the first viewing section of your worksheet.",
      items: [
        {q:"Who is Emmanuel Massad?", a:"A deputy coordinator of operations for Doctors Without Borders", wrong:["A journalist","A government minister"]},
        {q:"Where is he speaking from?", a:"Southern Lebanon, south of Beirut", wrong:["Gaza","Kinshasa"]},
        {q:"What main problem does he describe?", a:"A massive number of people being displaced", wrong:["A shortage of doctors only","An election"]},
        {q:"Which example illustrates how bad conditions in shelters can be?", a:"Eight bathrooms for more than 800 people", wrong:["No electricity for one hour","Too much food"]},
        {q:"Why can MSF not reach some people in the south?", a:"It is too dangerous because of continuous strikes", wrong:["The people refuse help","There are no roads at all"]}
      ]
    },
    signals: {
      title: "Read the Signals",
      intro: "Turn reported details into a careful field interpretation. Do not add information the source does not give.",
      items: [
        {q:"Which groups are specifically described as especially vulnerable when people have to flee?", a:"Older people, pregnant women, disabled people and people whose health prevents them moving easily", wrong:["Only tourists and international staff","Only children under five"]},
        {q:"What does the report imply when people arrive with barely the clothes on their back and medical conditions are already appearing?", a:"Basic shelter and health needs are already under severe pressure", wrong:["The crisis has been fully stabilised","Everyone has enough supplies"]},
        {q:"What is the safest interpretation of “no system can cope with such a big amount of displaced people”?", a:"The scale of displacement overwhelms the available shelter, food, water and care capacity", wrong:["No humanitarian organisation is useful","The health system has stopped functioning everywhere"]},
        {q:"How should a careful briefing describe the claim that medical teams and facilities have been hit?", a:"Report it as part of MSF's stated experience and concern, not as a conclusion beyond the source", wrong:["Turn it into a claim about every medical facility","Remove the attribution and present every detail as independently verified"]}
      ]
    }
  };

  const mission2Activities = {
    incoming: {
      title: "Incoming Patients",
      intro: "These are fictional language-training handovers. Choose the detail that matters most for a clear first report.",
      items: [
        {q:"Arrival report: an adult is extremely short of breath and cannot speak in full sentences. Which handover is clearest?", a:"Severe breathing difficulty; unable to speak in full sentences", wrong:["Adult patient; arrived this morning","Patient would like to be seen quickly"], model:"The patient has severe breathing difficulty and cannot speak in full sentences."},
        {q:"Arrival report: an older person could not leave the evacuation area without help because they cannot walk independently. What should the handover highlight?", a:"Reduced mobility made evacuation difficult and assistance is needed", wrong:["The patient's age is the only relevant fact","The evacuation route was probably badly organised"], model:"Reduced mobility made evacuation difficult, and the patient needs assistance."},
        {q:"Arrival report: a pregnant woman reaches the clinic after displacement and says she has not had access to her usual antenatal care. What is the useful summary?", a:"Pregnancy plus interrupted access to usual care", wrong:["Pregnancy automatically means a diagnosis is known","The team should assume there are no other needs"], model:"She is pregnant and has had interrupted access to her usual antenatal care."},
        {q:"Arrival report: a child from an overcrowded shelter has repeated diarrhoea and the family reports limited clean water. Which information belongs in the first handover?", a:"Repeated diarrhoea together with limited access to clean water", wrong:["Only the child's shelter address","The family should be told the cause immediately"], model:"The child has repeated diarrhoea, and the family has limited access to clean water."},
        {q:"Arrival report: a walking patient is alert and has a small superficial cut. Which summary avoids overclaiming?", a:"Alert, walking, with a small superficial cut", wrong:["The injury is definitely harmless","No assessment is needed"], model:"The patient is alert, walking and has a small superficial cut."}
      ]
    },
    priority: {
      title: "What Comes First?",
      intro: "Choose the strongest immediate priority from the information given. The exercise practises clear reasoning, not a real-world triage protocol.",
      items: [
        {q:"Three people arrive together. Which report most clearly needs immediate clinician review?", a:"A patient with severe breathing difficulty who cannot speak in full sentences", wrong:["An alert walking patient with a small superficial cut","A stable patient asking how to replace a routine appointment"], model:"The patient with severe breathing difficulty needs immediate clinician review."},
        {q:"Which group does the Day 3 source specifically identify as needing extra planning because fleeing may be especially difficult?", a:"Older people, pregnant women, disabled people and people whose health limits movement", wrong:["Only international staff","Only people who own a car"], model:"Evacuation planning must consider people who cannot move quickly or independently."},
        {q:"A shelter is severely overcrowded and basic needs are under pressure. Which priority is best supported by the Day 3 briefing?", a:"Assess urgent health needs alongside water, food, shelter and sanitation pressures", wrong:["Focus only on paperwork before seeing anyone","Assume the shelter can cope because it is open"], model:"The team should assess urgent health needs alongside basic water, food and shelter pressures."},
        {q:"Some people remain in an area that field teams cannot safely reach. What is the most responsible priority?", a:"Report the access limitation clearly and coordinate a safer way to reach people", wrong:["Promise that the team will reach everyone immediately","Send staff into an unsafe area without coordination"], model:"We must report the access limitation and coordinate a safer response."},
        {q:"When the scale of displacement exceeds the capacity of one organisation, what should a careful priority statement say?", a:"Priorities must be explicit because available shelter, food, water and care cannot meet every need at once", wrong:["One organisation should promise to solve every need","Prioritisation is unnecessary when demand is high"], model:"Priorities must be explicit when available capacity cannot meet every need at once."}
      ]
    },
    resources: {
      title: "Resources Running Low",
      intro: "Use the contingency-plan logic from the worksheet: more patients, harder access and delayed supplies.",
      items: [
        {q:"More patients are arriving than the clinic can assess at once. What is the best operational response?", a:"Organise rapid intake and prioritisation, record key needs and expand assessment capacity if possible", wrong:["See everyone strictly in arrival order regardless of need","Stop documenting patients until the queue disappears"], model:"If more patients arrive, we will organise rapid intake and prioritise the most urgent needs."},
        {q:"Medical supplies may be delayed. Which response is safest and most realistic?", a:"Check current stock, protect essential supplies, alert logistics and plan approved alternatives", wrong:["Promise that no treatment will be affected","Use any improvised substitute without clinical approval"], model:"If supplies are delayed, we will review stock and coordinate approved alternatives."},
        {q:"Several roads are becoming difficult to use. What should the team do before sending staff or supplies?", a:"Update access information and coordinate the safest feasible route", wrong:["Ignore the change because the original plan is already written","Send the team without checking the route"], model:"If access becomes more difficult, we may need to change the route."},
        {q:"Conditions deteriorate but some safe care is still possible. Which plan is most appropriate?", a:"Continue the care that remains safe and feasible while communicating new limits", wrong:["Continue every activity exactly as before regardless of risk","Stop all communication until conditions improve"], model:"Even if conditions deteriorate, we will continue the care that remains safe and feasible."}
      ]
    },
    conditionals: {
      title: "Conditional Comms",
      intro: "Choose the sentence that matches the Day 3 grammar focus: zero conditional, first conditional or even if.",
      items: [
        {q:"Choose the correct first conditional for increased patient numbers.", a:"If more patients arrive, we will open an additional assessment point.", wrong:["If more patients will arrive, we open an additional assessment point.","If more patients arrived, we will opened an additional assessment point."], model:"If more patients arrive, we will open an additional assessment point."},
        {q:"Choose the correct sentence for a possible access problem.", a:"If access becomes more difficult, the team may need to change route.", wrong:["If access will become more difficult, the team may need to change route.","If access becomes more difficult, the team may needed change route."], model:"If access becomes more difficult, the team may need to change route."},
        {q:"Which sentence expresses a general relationship rather than one specific future plan?", a:"If clean water is unavailable, health risks increase.", wrong:["If clean water will be unavailable, health risks increase.","If clean water is unavailable, health risks will increasing."], model:"If clean water is unavailable, health risks increase."},
        {q:"Choose the correct 'even if' sentence.", a:"Even if aid arrives, some people may still be unreachable.", wrong:["Even if aid will arrive, some people may still be unreachable.","Even if aid arrives, some people still may unreachable."], model:"Even if aid arrives, some people may still be unreachable."},
        {q:"Choose the sentence that matches the worksheet model about shelter capacity.", a:"If a shelter is full, people will have to find another one.", wrong:["If a shelter will be full, people have to find another one.","If a shelter is full, people will had to find another one."], model:"If a shelter is full, people will have to find another one."},
        {q:"Choose the correct statement about team safety.", a:"If medical teams are targeted, they cannot work safely.", wrong:["If medical teams will be targeted, they cannot work safely.","If medical teams are targeted, they cannot works safely."], model:"If medical teams are targeted, they cannot work safely."}
      ]
    }
  };

  const defaults = {
    started:false,current:"vocab",
    indices:{vocab:0,situation:0,video:0,signals:0},
    scores:{vocab:0,situation:0,video:0,signals:0},
    missed:{vocab:[],situation:[],video:[],signals:[]},
    complete:{vocab:false,situation:false,video:false,signals:false},
    missionComplete:false,
    mission2:{
      started:false,current:"incoming",
      indices:{incoming:0,priority:0,resources:0,conditionals:0},
      scores:{incoming:0,priority:0,resources:0,conditionals:0},
      missed:{incoming:[],priority:[],resources:[],conditionals:[]},
      complete:{incoming:false,priority:false,resources:false,conditionals:false},
      completeAll:false
    }
  };
  let state = load();
  let soundOn = localStorage.getItem(SOUND_KEY) !== "off";
  let musicOn = localStorage.getItem(MUSIC_KEY) === "on";

  const els = {
    start:$("startFieldMission"),sound:$("day3SoundToggle"),musicToggle:$("day3MusicToggle"),music:$("day3Music"),reset:$("resetDay3"),status:$("day3AudioStatus"),
    screen:$("fieldScreen"),feedback:$("fieldFeedback"),workspaceTitle:$("workspaceTitle"),workspaceIntro:$("workspaceIntro"),score:$("fieldScore"),progressText:$("missionProgressText"),progressBar:$("missionProgressBar"),clearance:$("fieldClearance"),complete:$("missionComplete"),completeTitle:$("missionCompleteTitle"),completeText:$("missionCompleteText"),mission2Button:$("mission2Button"),
    mission2Area:$("mission2Area"),startMission2:$("startMission2"),mission2Score:$("mission2Score"),mission2ProgressText:$("mission2ProgressText"),mission2ProgressBar:$("mission2ProgressBar"),mission2Workspace:$("mission2Workspace"),mission2WorkspaceTitle:$("mission2WorkspaceTitle"),mission2WorkspaceIntro:$("mission2WorkspaceIntro"),mission2ActivityScore:$("mission2ActivityScore"),mission2Screen:$("mission2Screen"),mission2Feedback:$("mission2Feedback"),mission2Complete:$("mission2Complete"),mission2CompleteTitle:$("mission2CompleteTitle"),mission2CompleteText:$("mission2CompleteText"),mission3Button:$("mission3Button"),mission3Teaser:$("mission3Teaser")
  };

  function load(){
    try{
      const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}");
      const base=structuredClone(defaults);
      const merged={...base,...saved};
      merged.indices={...base.indices,...(saved.indices||{})};
      merged.scores={...base.scores,...(saved.scores||{})};
      merged.missed={...base.missed,...(saved.missed||{})};
      merged.complete={...base.complete,...(saved.complete||{})};
      const s2=saved.mission2||{};
      merged.mission2={...base.mission2,...s2};
      merged.mission2.indices={...base.mission2.indices,...(s2.indices||{})};
      merged.mission2.scores={...base.mission2.scores,...(s2.scores||{})};
      merged.mission2.missed={...base.mission2.missed,...(s2.missed||{})};
      merged.mission2.complete={...base.mission2.complete,...(s2.complete||{})};
      return merged;
    }catch{return structuredClone(defaults);}
  }
  function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
  function status(msg){els.status.textContent=msg;clearTimeout(status.timer);status.timer=setTimeout(()=>{if(els.status.textContent===msg)els.status.textContent="";},3200);}
  function voices(){if(!("speechSynthesis" in window))return null;const v=speechSynthesis.getVoices();return v.find(x=>/^en-GB/i.test(x.lang))||v.find(x=>/^en/i.test(x.lang))||null;}
  function speak(text){if(!soundOn){status("Sound is off. The text remains visible.");return;}if(!("speechSynthesis" in window)){status("Speech synthesis is not available on this device.");return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="en-GB";u.rate=.93;const v=voices();if(v)u.voice=v;speechSynthesis.speak(u);}
  function cue(kind="good"){if(!soundOn)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;const c=new AC();const g=c.createGain();g.connect(c.destination);g.gain.value=.05;const sets={good:[523,659],bad:[247,196],start:[392,523,659],unlock:[523,659,784]};(sets[kind]||sets.good).forEach((f,i)=>{const o=c.createOscillator(),ng=c.createGain();o.type="sine";o.frequency.value=f;const s=c.currentTime+i*.11;ng.gain.setValueAtTime(.0001,s);ng.gain.exponentialRampToValueAtTime(.07,s+.01);ng.gain.exponentialRampToValueAtTime(.0001,s+.16);o.connect(ng).connect(g);o.start(s);o.stop(s+.18);});setTimeout(()=>c.close(),700);}catch{}}
  function startMusic(){if(!els.music)return;els.music.volume=.18;els.music.play().catch(()=>status("Music is ready. Tap Music ON again if your browser blocked playback."));}
  function stopMusic(){if(!els.music)return;els.music.pause();}
  function syncControls(){els.sound.textContent=soundOn?"🔊 Sound ON":"🔇 Sound OFF";els.sound.setAttribute("aria-pressed",String(soundOn));els.musicToggle.textContent=musicOn?"🎵 Music ON":"🎵 Music OFF";els.musicToggle.setAttribute("aria-pressed",String(musicOn));}
  function shuffled(a){const x=[...a];for(let i=x.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[x[i],x[j]]=[x[j],x[i]];}return x;}
  function currentOrder(){return ["vocab","situation","video","signals"];}
  function unlocked(key){const order=currentOrder(),i=order.indexOf(key);return i===0||state.complete[order[i-1]];}
  function totalScore(){return Object.values(state.scores).reduce((a,b)=>a+b,0);}
  function completedCount(){return Object.values(state.complete).filter(Boolean).length;}
  function maxScore(){return activities.vocab.items.length+activities.situation.items.length+activities.video.items.length+activities.signals.items.length;}

  function updateUI(){
    const count=completedCount();els.progressText.textContent=`${count} / 4`;els.progressBar.style.width=`${count*25}%`;els.score.textContent=`${totalScore()} / ${maxScore()}`;
    const labels={vocab:"statusVocab",situation:"statusSituation",video:"statusVideo",signals:"statusSignals"};
    currentOrder().forEach(k=>{const e=$(labels[k]);const card=document.querySelector(`[data-activity="${k}"]`);if(state.complete[k]){e.textContent="CLEARED";card.classList.add("is-cleared");card.disabled=false;}else if(unlocked(k)){e.textContent=state.started&&state.current===k?"IN PROGRESS":"READY";card.disabled=false;card.classList.remove("is-locked");}else{e.textContent="LOCKED";card.disabled=true;card.classList.add("is-locked");}});
    state.missionComplete = count===4;save();
    if(state.missionComplete){
      els.clearance.textContent=state.mission2.completeAll?"Mission 2 cleared":"Mission 1 cleared";
      els.complete.classList.remove("is-locked");els.completeTitle.textContent="Field Briefing cleared.";els.completeText.textContent="You have decoded the humanitarian vocabulary, built the situation picture, checked the source interview and interpreted key field signals.";els.mission2Button.disabled=false;els.mission2Button.textContent="Mission 2 · Triage Under Pressure →";
      els.mission2Area.classList.remove("is-locked");els.startMission2.disabled=false;els.startMission2.textContent=state.mission2.started?"Resume Mission 2 →":"Start Mission 2 →";
    }
    else{
      els.clearance.textContent=state.started?`Mission 1 · ${count}/4 cleared`:"Clearance pending";els.complete.classList.add("is-locked");els.mission2Button.disabled=true;els.mission2Area.classList.add("is-locked");els.startMission2.disabled=true;els.startMission2.textContent="🔒 Complete Mission 1 first";
    }
    updateMission2UI();
  }

  function render(){
    updateUI();
    if(!state.started){els.workspaceTitle.textContent="Mission not started";els.workspaceIntro.textContent="Choose Start Mission 1 to open your first briefing.";return;}
    const key=state.current;if(!unlocked(key)){state.current=currentOrder().find(k=>unlocked(k)&&!state.complete[k])||"vocab";save();return render();}
    const act=activities[key];els.workspaceTitle.textContent=act.title;els.workspaceIntro.textContent=act.intro;els.feedback.innerHTML="";
    if(state.complete[key]) return renderCompleteActivity(key);
    const idx=state.indices[key]||0;
    if(key==="vocab") renderVocab(idx); else renderQuestionActivity(key,idx);
  }

  function renderVocab(idx){
    const [term,correct]=activities.vocab.items[idx];
    const pool=activities.vocab.items.map(x=>x[1]).filter(x=>x!==correct);const wrong=shuffled(pool).slice(0,2);const opts=shuffled([correct,...wrong]);
    els.screen.innerHTML=`<div class="field-question"><div class="field-question-meta"><span>VOCABULARY CLEARANCE</span><b>${idx+1} / ${activities.vocab.items.length}</b></div><h3>${term}</h3><p>Choose the meaning used in the worksheet.</p><div id="fieldOptions" class="field-options"></div><button id="hearTerm" class="field-hear" type="button">🔊 Hear term</button></div>`;
    $("hearTerm").onclick=()=>speak(term);mountOptions("vocab",idx,opts,correct,`<strong>${term}</strong> means: ${correct}.`);
  }

  function renderQuestionActivity(key,idx){
    const item=activities[key].items[idx];const opts=shuffled([item.a,...item.wrong]);
    const videoNote=key==="video"?`<div class="field-video-prompt"><span>▶ SOURCE VIDEO</span><p>Use the interview above or in the Source Intel panel. You can pause and replay it.</p></div>`:"";
    els.screen.innerHTML=`<div class="field-question"><div class="field-question-meta"><span>${activities[key].title.toUpperCase()}</span><b>${idx+1} / ${activities[key].items.length}</b></div>${videoNote}<h3>${item.q}</h3><div id="fieldOptions" class="field-options"></div></div>`;
    mountOptions(key,idx,opts,item.a,item.a);
  }

  function mountOptions(key,idx,opts,correct,explanation){
    const wrap=$("fieldOptions");opts.forEach(text=>{const b=document.createElement("button");b.className="field-option";b.type="button";b.textContent=text;b.onclick=()=>answer(key,idx,text===correct,b,wrap,explanation);wrap.appendChild(b);});
  }
  function answer(key,idx,isCorrect,button,wrap,explanation){
    if(isCorrect){wrap.querySelectorAll("button").forEach(b=>b.disabled=true);button.classList.add("is-correct");if(!state.missed[key].includes(idx))state.scores[key]+=1;state.indices[key]+=1;cue("good");save();els.feedback.innerHTML=`<div class="field-good"><strong>Cleared.</strong><span>${explanation}</span></div><button id="fieldNext" class="field-next" type="button">${state.indices[key]>=activities[key].items.length?"Complete activity →":"Next checkpoint →"}</button>`;$("fieldNext").onclick=()=>{if(state.indices[key]>=activities[key].items.length){state.complete[key]=true;const order=currentOrder(),i=order.indexOf(key);if(i<order.length-1)state.current=order[i+1];cue("unlock");save();render();}else render();};updateUI();}
    else{button.disabled=true;button.classList.add("is-wrong");if(!state.missed[key].includes(idx))state.missed[key].push(idx);cue("bad");save();els.feedback.innerHTML=`<div class="field-bad"><strong>Not this one.</strong><span>Use the wording and evidence from the Day 3 materials, then try again.</span></div>`;}
  }

  function renderCompleteActivity(key){
    const order=currentOrder(),i=order.indexOf(key),next=order[i+1];const act=activities[key];
    els.screen.innerHTML=`<div class="field-cleared-card"><span aria-hidden="true">✓</span><p class="field-kicker dark">ACTIVITY CLEARED</p><h3>${act.title}</h3><p>Your first-try score for this activity is <strong>${state.scores[key]} / ${act.items.length}</strong>.</p>${next?`<button id="continueField" class="field-primary" type="button">Open ${activities[next].title} →</button>`:`<button id="continueField" class="field-primary" type="button">Complete Field Briefing →</button>`}</div>`;
    $("continueField").onclick=()=>{if(next){state.current=next;save();render();}else{state.missionComplete=true;save();updateUI();els.complete.scrollIntoView({behavior:"smooth",block:"center"});}};
  }


  function mission2Order(){return ["incoming","priority","resources","conditionals"];}
  function mission2Unlocked(key){const order=mission2Order(),i=order.indexOf(key);return state.missionComplete&&(i===0||state.mission2.complete[order[i-1]]);}
  function mission2CompletedCount(){return Object.values(state.mission2.complete).filter(Boolean).length;}
  function mission2TotalScore(){return Object.values(state.mission2.scores).reduce((a,b)=>a+b,0);}
  function mission2MaxScore(){return mission2Order().reduce((n,k)=>n+mission2Activities[k].items.length,0);}

  function updateMission2UI(){
    if(!els.mission2Area)return;
    const count=mission2CompletedCount();
    state.mission2.completeAll=count===4;
    els.mission2ProgressText.textContent=`${count} / 4`;
    els.mission2ProgressBar.style.width=`${count*25}%`;
    els.mission2Score.textContent=`${mission2TotalScore()} / ${mission2MaxScore()}`;
    const labels={incoming:"m2StatusIncoming",priority:"m2StatusPriority",resources:"m2StatusResources",conditionals:"m2StatusConditionals"};
    mission2Order().forEach(k=>{
      const label=$(labels[k]);const card=document.querySelector(`[data-m2-activity="${k}"]`);
      if(!label||!card)return;
      if(state.mission2.complete[k]){label.textContent="CLEARED";card.disabled=false;card.classList.add("is-cleared");card.classList.remove("is-locked");}
      else if(mission2Unlocked(k)){label.textContent=state.mission2.started&&state.mission2.current===k?"IN PROGRESS":"READY";card.disabled=false;card.classList.remove("is-locked");}
      else{label.textContent="LOCKED";card.disabled=true;card.classList.add("is-locked");}
    });
    if(state.mission2.completeAll){
      els.clearance.textContent="Mission 2 cleared";
      els.mission2Complete.classList.remove("is-locked");
      els.mission2CompleteTitle.textContent="Field Triage Ready";
      els.mission2CompleteText.textContent="You extracted key handover information, prioritised carefully, planned around limited resources and used conditional language for field decisions.";
      els.mission3Button.disabled=false;els.mission3Button.textContent="Mission 3 · Access Restricted →";
      els.mission3Teaser.classList.remove("is-locked");
      els.startMission2.textContent="Replay Mission 2 →";
    }else{
      els.mission2Complete.classList.add("is-locked");els.mission3Button.disabled=true;els.mission3Teaser.classList.add("is-locked");
    }
    save();
  }

  function renderMission2(){
    updateMission2UI();
    els.mission2Feedback.innerHTML="";
    if(!state.missionComplete){els.mission2WorkspaceTitle.textContent="Triage desk locked";els.mission2WorkspaceIntro.textContent="Complete Mission 1 to open this assignment.";return;}
    if(!state.mission2.started){els.mission2WorkspaceTitle.textContent="Mission 2 ready";els.mission2WorkspaceIntro.textContent="Start with Incoming Patients, then work through the four activities in order.";els.mission2Screen.innerHTML=`<div class="field-waiting"><span aria-hidden="true">🩺</span><h3>Triage desk ready</h3><p>These are fictional training scenarios for English and prioritisation. Local clinical protocols always take precedence in real practice.</p></div>`;return;}
    let key=state.mission2.current;
    if(!mission2Unlocked(key)){key=mission2Order().find(k=>mission2Unlocked(k)&&!state.mission2.complete[k])||"incoming";state.mission2.current=key;save();}
    const act=mission2Activities[key];const idx=state.mission2.indices[key]||0;
    els.mission2WorkspaceTitle.textContent=act.title;els.mission2WorkspaceIntro.textContent=act.intro;els.mission2ActivityScore.textContent=`${state.mission2.scores[key]} / ${act.items.length}`;
    if(state.mission2.complete[key]) return renderMission2CompleteActivity(key);
    const item=act.items[idx];
    els.mission2Screen.innerHTML=`<div class="field-question triage-question"><div class="field-question-meta"><span>${act.title.toUpperCase()}</span><b>${idx+1} / ${act.items.length}</b></div><h3>${item.q}</h3><div id="mission2Options" class="field-options"></div><p class="triage-training-note">Training scenario: choose only what the information supports; do not invent a diagnosis.</p></div>`;
    const wrap=$("mission2Options");
    shuffled([item.a,...item.wrong]).forEach(text=>{const b=document.createElement("button");b.className="field-option";b.type="button";b.textContent=text;b.onclick=()=>answerMission2(key,idx,text===item.a,b,wrap,item);wrap.appendChild(b);});
  }

  function answerMission2(key,idx,isCorrect,button,wrap,item){
    if(isCorrect){
      wrap.querySelectorAll("button").forEach(b=>b.disabled=true);button.classList.add("is-correct");
      if(!state.mission2.missed[key].includes(idx))state.mission2.scores[key]+=1;
      state.mission2.indices[key]+=1;cue("good");save();
      els.mission2Feedback.innerHTML=`<div class="field-good"><strong>Cleared.</strong><span>${item.a}</span></div><div class="triage-model-line"><span>MODEL LINE</span><p>${item.model}</p><button id="hearM2Model" class="field-hear" type="button">🔊 Hear it</button></div><button id="mission2Next" class="field-next" type="button">${state.mission2.indices[key]>=mission2Activities[key].items.length?"Complete activity →":"Next checkpoint →"}</button>`;
      $("hearM2Model").onclick=()=>speak(item.model);
      $("mission2Next").onclick=()=>{if(state.mission2.indices[key]>=mission2Activities[key].items.length){state.mission2.complete[key]=true;const order=mission2Order(),i=order.indexOf(key);if(i<order.length-1)state.mission2.current=order[i+1];cue("unlock");save();}renderMission2();};
      updateMission2UI();
    }else{
      button.disabled=true;button.classList.add("is-wrong");if(!state.mission2.missed[key].includes(idx))state.mission2.missed[key].push(idx);cue("bad");save();
      els.mission2Feedback.innerHTML=`<div class="field-bad"><strong>Not this one.</strong><span>Choose the option that is clearest, safest and supported by the information given. Do not add a diagnosis or a promise the scenario cannot support.</span></div>`;
    }
  }

  function renderMission2CompleteActivity(key){
    const order=mission2Order(),i=order.indexOf(key),next=order[i+1],act=mission2Activities[key];
    els.mission2Screen.innerHTML=`<div class="field-cleared-card triage-cleared-card"><span aria-hidden="true">✓</span><p class="field-kicker dark">MISSION 2 ACTIVITY CLEARED</p><h3>${act.title}</h3><p>First-try score: <strong>${state.mission2.scores[key]} / ${act.items.length}</strong>.</p>${next?`<button id="continueMission2" class="field-primary" type="button">Open ${mission2Activities[next].title} →</button>`:`<button id="continueMission2" class="field-primary" type="button">Complete Mission 2 →</button>`}</div>`;
    $("continueMission2").onclick=()=>{if(next){state.mission2.current=next;save();renderMission2();}else{state.mission2.completeAll=true;cue("unlock");save();updateMission2UI();els.mission2Complete.scrollIntoView({behavior:"smooth",block:"center"});}};
  }

  function startMission2(){
    if(!state.missionComplete)return;
    if(state.mission2.completeAll){
      state.mission2={...structuredClone(defaults.mission2),started:true};
    }else state.mission2.started=true;
    state.mission2.current=mission2Order().find(k=>mission2Unlocked(k)&&!state.mission2.complete[k])||"incoming";
    save();cue("start");if(musicOn)startMusic();renderMission2();els.mission2Workspace.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>els.mission2Screen.focus({preventScroll:true}),450);
  }

  function start(){state.started=true;state.current=currentOrder().find(k=>unlocked(k)&&!state.complete[k])||"signals";save();cue("start");if(musicOn)startMusic();render();els.activityArea?.scrollIntoView?.({behavior:"smooth"});setTimeout(()=>els.screen.focus({preventScroll:true}),450);}
  document.querySelectorAll(".field-activity-card").forEach(card=>card.addEventListener("click",()=>{const key=card.dataset.activity;if(!unlocked(key))return;state.started=true;state.current=key;save();render();$("activityArea").scrollIntoView({behavior:"smooth",block:"start"});}));
  els.start.onclick=start;
  els.sound.onclick=()=>{soundOn=!soundOn;localStorage.setItem(SOUND_KEY,soundOn?"on":"off");if(!soundOn&&"speechSynthesis" in window)speechSynthesis.cancel();syncControls();status(soundOn?"Sound on.":"Sound off. All audio-dependent content also appears as text.");};
  els.musicToggle.onclick=()=>{musicOn=!musicOn;localStorage.setItem(MUSIC_KEY,musicOn?"on":"off");syncControls();if(musicOn)startMusic();else stopMusic();status(musicOn?"Music on. Field briefing ambience is playing.":"Music off.");};
  els.reset.onclick=()=>{if(!confirm("Reset all Day 3 progress on this device?"))return;state=structuredClone(defaults);save();stopMusic();render();renderMission2();updateUI();window.scrollTo({top:0,behavior:"smooth"});status("Day 3 progress reset.");};
  els.mission2Button.onclick=()=>{els.mission2Area.scrollIntoView({behavior:"smooth",block:"start"});};
  els.startMission2.onclick=startMission2;
  document.querySelectorAll(".triage-activity-card").forEach(card=>card.addEventListener("click",()=>{const key=card.dataset.m2Activity;if(!mission2Unlocked(key))return;state.mission2.started=true;state.mission2.current=key;save();renderMission2();els.mission2Workspace.scrollIntoView({behavior:"smooth",block:"start"});}));
  els.mission3Button.onclick=()=>els.mission3Teaser.scrollIntoView({behavior:"smooth",block:"center"});
  if("speechSynthesis" in window)speechSynthesis.addEventListener?.("voiceschanged",voices);
  syncControls();updateUI();render();renderMission2();
})();