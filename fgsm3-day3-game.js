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

  const defaults = {started:false,current:"vocab",indices:{vocab:0,situation:0,video:0,signals:0},scores:{vocab:0,situation:0,video:0,signals:0},missed:{vocab:[],situation:[],video:[],signals:[]},complete:{vocab:false,situation:false,video:false,signals:false},missionComplete:false};
  let state = load();
  let soundOn = localStorage.getItem(SOUND_KEY) !== "off";
  let musicOn = localStorage.getItem(MUSIC_KEY) === "on";

  const els = {start:$("startFieldMission"),sound:$("day3SoundToggle"),musicToggle:$("day3MusicToggle"),music:$("day3Music"),reset:$("resetDay3"),status:$("day3AudioStatus"),screen:$("fieldScreen"),feedback:$("fieldFeedback"),workspaceTitle:$("workspaceTitle"),workspaceIntro:$("workspaceIntro"),score:$("fieldScore"),progressText:$("missionProgressText"),progressBar:$("missionProgressBar"),clearance:$("fieldClearance"),complete:$("missionComplete"),completeTitle:$("missionCompleteTitle"),completeText:$("missionCompleteText"),mission2Button:$("mission2Button"),mission2Teaser:$("mission2Teaser")};

  function load(){try{return {...defaults,...JSON.parse(localStorage.getItem(STORAGE_KEY)||"{}")};}catch{return structuredClone(defaults);}}
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
    if(state.missionComplete){els.clearance.textContent="Mission 1 cleared";els.complete.classList.remove("is-locked");els.completeTitle.textContent="Field Briefing cleared.";els.completeText.textContent="You have decoded the humanitarian vocabulary, built the situation picture, checked the source interview and interpreted key field signals.";els.mission2Button.disabled=false;els.mission2Button.textContent="Mission 2 · Triage Under Pressure →";els.mission2Teaser.classList.remove("is-locked");}
    else{els.clearance.textContent=state.started?`Mission 1 · ${count}/4 cleared`:"Clearance pending";els.complete.classList.add("is-locked");els.mission2Button.disabled=true;}
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

  function start(){state.started=true;state.current=currentOrder().find(k=>unlocked(k)&&!state.complete[k])||"signals";save();cue("start");if(musicOn)startMusic();render();els.activityArea?.scrollIntoView?.({behavior:"smooth"});setTimeout(()=>els.screen.focus({preventScroll:true}),450);}
  document.querySelectorAll(".field-activity-card").forEach(card=>card.addEventListener("click",()=>{const key=card.dataset.activity;if(!unlocked(key))return;state.started=true;state.current=key;save();render();$("activityArea").scrollIntoView({behavior:"smooth",block:"start"});}));
  els.start.onclick=start;
  els.sound.onclick=()=>{soundOn=!soundOn;localStorage.setItem(SOUND_KEY,soundOn?"on":"off");if(!soundOn&&"speechSynthesis" in window)speechSynthesis.cancel();syncControls();status(soundOn?"Sound on.":"Sound off. All audio-dependent content also appears as text.");};
  els.musicToggle.onclick=()=>{musicOn=!musicOn;localStorage.setItem(MUSIC_KEY,musicOn?"on":"off");syncControls();if(musicOn)startMusic();else stopMusic();status(musicOn?"Music on. Field briefing ambience is playing.":"Music off.");};
  els.reset.onclick=()=>{if(!confirm("Reset Day 3 Mission 1 progress on this device?"))return;state=structuredClone(defaults);save();stopMusic();render();updateUI();window.scrollTo({top:0,behavior:"smooth"});status("Day 3 progress reset.");};
  els.mission2Button.onclick=()=>els.mission2Teaser.scrollIntoView({behavior:"smooth",block:"center"});
  if("speechSynthesis" in window)speechSynthesis.addEventListener?.("voiceschanged",voices);
  syncControls();updateUI();render();
})();