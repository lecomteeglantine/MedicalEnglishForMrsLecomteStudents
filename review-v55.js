(() => {
  "use strict";
  const page = document.body.dataset.reviewPage;
  if (!page) return;
  const STORAGE_KEY = "mrsLecomteReviewV55";
  const VIDEO_BASE = "https://www.youtube-nocookie.com/embed/";

  const lessons = {
    grammar: [
      {
        id:"g-present-perfect",
        title:"Present Perfect vs Past Simple",
        day:"Day 1 · placement & experience",
        icon:"🕒",
        video:{id:"jwmKjgwlMk8", title:"Present perfect and past simple — BBC Learning English", source:"BBC Learning English · 6 Minute Grammar"},
        recap:[
          ["Present Perfect","have / has + past participle","Use it for experience or a past event connected to now, especially when the exact finished time is not important."],
          ["Past Simple","past form","Use it for a completed event at a finished time: yesterday, last week, in 2025, during my last placement."],
          ["Quick test","Can you answer ‘When exactly?’","If the sentence gives a finished time, Past Simple is usually the safer choice."]
        ],
        examples:["I’ve worked with several stroke patients.","I observed a rehabilitation session yesterday.","This placement has taught me how to communicate with anxious patients."],
        quiz:[
          {q:"During this placement, I ___ several patients with chronic pain.", a:"have seen", options:["have seen","saw","see","am seeing"], why:"No finished time is given; the placement experience is connected to the present."},
          {q:"Yesterday, I ___ a patient with severe back pain.", a:"saw", options:["have seen","saw","have saw","see"], why:"‘Yesterday’ is a finished past time, so use Past Simple."},
          {q:"Which expression normally points to Past Simple?", a:"last Monday", options:["ever","so far","last Monday","since January"], why:"‘Last Monday’ is a finished point in the past."},
          {q:"Choose the best sentence for a placement reflection.", a:"I’ve learnt how important clear handovers are.", options:["I’ve learnt how important clear handovers are.","I learnt it since three weeks.","I have learnt it yesterday.","I learn it last placement."], why:"The learning is a past experience with a result that matters now."}
        ]
      },
      {
        id:"g-comparison",
        title:"Comparing healthcare data",
        day:"Day 2 · healthcare systems",
        icon:"📊",
        video:{id:"FAhpT7BH7GE", title:"Comparatives and superlatives — BBC Learning English", source:"BBC Learning English · 6 Minute Grammar"},
        recap:[
          ["Comparative","higher / lower / more / less + than","Use it to compare two systems, rates, groups or outcomes."],
          ["Equality","as + adjective + as","Use it when two things are similar: not as accessible as, as effective as."],
          ["Data language","a higher proportion / a lower rate","For figures, nouns such as rate, proportion, percentage and level often sound more precise than basic adjectives."]
        ],
        examples:["Waiting times are longer in system A than in system B.","A greater proportion of patients use private insurance.","This service is not as accessible in rural areas as it is in cities."],
        quiz:[
          {q:"Waiting times are ___ in Region A than in Region B.", a:"longer", options:["longer","more long","the longest","as long"], why:"For a short adjective such as ‘long’, use -er + than."},
          {q:"Which phrase is most useful for comparing figures?", a:"a higher proportion of patients", options:["a higher proportion of patients","more high patients","the high proportion than","patients are most"], why:"‘A higher proportion of…’ is standard data-comparison language."},
          {q:"System A is ___ expensive as System B.", a:"not as", options:["not as","less than as","more not","the least"], why:"Use ‘not as + adjective + as’ for inequality."},
          {q:"Choose the correct superlative.", a:"the most expensive system", options:["the most expensive system","the expensivest system","the more expensive system","most expensive than"], why:"Long adjectives generally form the superlative with ‘the most’."}
        ]
      },
      {
        id:"g-passive",
        title:"The passive in medical & scientific English",
        day:"Day 2 · healthcare news & research",
        icon:"📰",
        video:{id:"38QqDrckyxM", title:"Active and passive voice — BBC Learning English", source:"BBC Learning English · 6 Minute Grammar"},
        recap:[
          ["Form","be + past participle","The tense is carried by ‘be’: is monitored, was published, has been approved."],
          ["Why use it?","Focus on the process or result","Useful when the action matters more than the person who performs it."],
          ["Scientific habit","Do not force the passive everywhere","Use it when it makes the sentence clearer, not simply to sound academic."]
        ],
        examples:["Patients are monitored continuously.","The results were published in April.","The device has been approved for clinical use."],
        quiz:[
          {q:"Choose the correct passive form: ‘The patients ___ continuously.’", a:"are monitored", options:["are monitored","monitor","are monitoring","monitored are"], why:"Present passive = am/is/are + past participle."},
          {q:"‘The study was published in 2026’ is…", a:"Past Simple passive", options:["Past Simple passive","Present Perfect passive","Present passive","Past continuous active"], why:"‘Was’ + past participle gives the Past Simple passive."},
          {q:"Choose the Present Perfect passive.", a:"The treatment has been evaluated.", options:["The treatment has been evaluated.","The treatment is evaluated yesterday.","The treatment has evaluated.","The treatment was evaluate."], why:"Present Perfect passive = has/have been + past participle."},
          {q:"Which sentence best focuses on the result rather than the researchers?", a:"A significant difference was observed.", options:["A significant difference was observed.","The researchers observed and they did it.","Researchers are observe a difference.","A difference observed researchers."], why:"The passive foregrounds the finding rather than the agent."}
        ]
      },
      {
        id:"g-conditionals",
        title:"Zero & First Conditionals + even if",
        day:"Day 3 · contingency planning",
        icon:"🌧️",
        video:{id:"K-MKAjvvcsw", title:"Zero and first conditional — BBC Learning English", source:"BBC Learning English · 6 Minute Grammar"},
        recap:[
          ["Zero conditional","If + present, present","Use it for general facts, rules and predictable consequences."],
          ["First conditional","If + present, will / can / may + base verb","Use it for a real future possibility and its likely consequence."],
          ["Even if","concession","Use it to say that one fact will not change the main result or decision."]
        ],
        examples:["If Ebola is not treated, it can be fatal.","If more patients arrive, we will open another assessment area.","Even if supplies arrive, some remote areas may remain difficult to reach."],
        quiz:[
          {q:"If more patients arrive, we ___ another assessment area.", a:"will open", options:["will open","open always","will opened","would opening"], why:"This is a real future possibility: First Conditional."},
          {q:"If a sample is heated, the reaction ___.", a:"starts", options:["starts","will starts","would start always","starting"], why:"A general scientific rule uses the Zero Conditional."},
          {q:"Which sentence has the correct if-clause?", a:"If supplies are delayed, we may need to adapt the plan.", options:["If supplies are delayed, we may need to adapt the plan.","If supplies will be delayed, we may need to adapt the plan.","If supplies delayed, we will to adapt.","If supplies are delay, we adapt will."], why:"Do not normally use ‘will’ in the if-clause of a First Conditional."},
          {q:"‘Even if access improves, some patients may still need evacuation’ means…", a:"Improved access does not remove every problem.", options:["Improved access does not remove every problem.","Access will definitely get worse.","Evacuation is impossible.","The sentence describes a past event."], why:"‘Even if’ introduces a concession: the main point remains true despite another condition."}
        ]
      },
      {
        id:"g-modals",
        title:"Modals, probability & careful claims",
        day:"Day 4 · AI, evidence & overclaiming",
        icon:"🎚️",
        video:{id:"TWw8We_ElLo", title:"Modals of deduction and speculation — BBC Learning English", source:"BBC Learning English · 6 Minute Grammar"},
        recap:[
          ["Strong inference","must / can’t","Use when the available evidence strongly supports or contradicts an explanation."],
          ["Open possibility","may / might / could","Use when an explanation is possible but not established."],
          ["Prediction / cautious claim","will / is likely to / is unlikely to","Match the strength of the language to the strength of the evidence."]
        ],
        examples:["The model may have missed an important clinical signal.","This result could suggest a useful role for AI-assisted triage.","The findings are unlikely to generalise to every clinical setting."],
        quiz:[
          {q:"The evidence is incomplete. Choose the safest claim.", a:"The result may suggest a benefit.", options:["The result may suggest a benefit.","The result proves the treatment works for everyone.","The treatment must always work.","There can’t be any limitation."], why:"‘May suggest’ matches incomplete evidence and avoids overclaiming."},
          {q:"A strong present inference uses…", a:"must / can’t", options:["must / can’t","may only","will have always","used to"], why:"‘Must’ and ‘can’t’ can express strong deduction from evidence."},
          {q:"A possible past explanation is best expressed with…", a:"might have + past participle", options:["might have + past participle","must + infinitive yesterday","will have + present","can’t + -ing"], why:"‘Might have + past participle’ expresses a possible explanation about the past."},
          {q:"Which sentence is the most appropriately cautious research claim?", a:"These findings could inform future practice.", options:["These findings could inform future practice.","These findings will transform all medicine.","These findings prove the question forever.","There is no possible alternative explanation."], why:"‘Could’ keeps the strength of the claim proportionate to the evidence."}
        ]
      }
    ],
    pronunciation: [
      {
        id:"p-ed",
        title:"-ed endings: /t/, /d/, /ɪd/",
        day:"Day 1 · clinical past forms",
        icon:"🗣️",
        video:{id:"I-nMqycHubU", title:"Pronouncing -ed endings — BBC Learning English", source:"BBC Learning English · Learners’ Questions"},
        recap:[
          ["/t/","after a voiceless sound","worked, watched, stopped"],
          ["/d/","after a voiced sound or vowel","examined, observed, treated? No: treated = /ɪd/."],
          ["/ɪd/","after /t/ or /d/","treated, admitted, needed"]
        ],
        examples:["worked /t/ · examined /d/ · treated /ɪd/","The patient was examined and discharged.","The team monitored the patient overnight."],
        speak:"worked, examined, treated, monitored, discharged",
        quiz:[
          {q:"How does the -ed ending sound in ‘worked’?", a:"/t/", options:["/t/","/d/","/ɪd/","silent"], why:"The base verb ends in a voiceless /k/ sound, so -ed is /t/."},
          {q:"How does the -ed ending sound in ‘examined’?", a:"/d/", options:["/d/","/t/","/ɪd/","/z/"], why:"The base verb ends in a voiced sound, so -ed is /d/."},
          {q:"How does the -ed ending sound in ‘treated’?", a:"/ɪd/", options:["/ɪd/","/t/","/d/","silent"], why:"The base verb ends in /t/, so the ending creates an extra syllable /ɪd/."},
          {q:"Which word has an /ɪd/ ending?", a:"admitted", options:["admitted","worked","observed","checked"], why:"‘Admit’ ends in /t/, so ‘admitted’ ends /ɪd/."}
        ]
      },
      {
        id:"p-s",
        title:"Final -s: /s/, /z/, /ɪz/",
        day:"Day 2 · healthcare systems & figures",
        icon:"🔚",
        video:{id:"hChye-OT2mU", title:"Pronouncing -s and -ed endings — BBC Learning English", source:"BBC Learning English · Learners’ Questions"},
        recap:[
          ["/s/","after a voiceless sound","patients, rates, clinics"],
          ["/z/","after a voiced sound or vowel","doctors, systems, hospitals"],
          ["/ɪz/","after sibilant sounds","cases, services, changes"]
        ],
        examples:["patients /s/ · doctors /z/ · cases /ɪz/","Waiting times vary between systems.","The report compares rates and services."],
        speak:"patients, doctors, cases, systems, services, changes",
        quiz:[
          {q:"What is the final sound in ‘patients’?", a:"/s/", options:["/s/","/z/","/ɪz/","/t/"], why:"‘Patient’ ends in the voiceless /t/ sound, so final -s is /s/."},
          {q:"What is the final sound in ‘doctors’?", a:"/z/", options:["/z/","/s/","/ɪz/","silent"], why:"‘Doctor’ ends in a voiced sound, so final -s is /z/."},
          {q:"What is the final sound in ‘cases’?", a:"/ɪz/", options:["/ɪz/","/s/","/z/","/d/"], why:"After a sibilant sound, the ending forms an extra syllable /ɪz/."},
          {q:"Which word ends in /z/?", a:"systems", options:["systems","patients","rates","cases"], why:"‘System’ ends in voiced /m/, so the plural -s is /z/."}
        ]
      },
      {
        id:"p-stress",
        title:"Word stress in long medical words",
        day:"Day 3 · humanitarian & scientific vocabulary",
        icon:"🥁",
        video:{id:"Vu6UVwkUgzc", title:"Syllables and word stress — Oxford Online English", source:"Oxford Online English · watch the stress section", start:163, end:510},
        recap:[
          ["One strong syllable","Make it clearer, longer and more prominent","Do not give every syllable equal weight."],
          ["-tion / -sion / -cian","Stress usually falls on the syllable before the ending","evacu-A-tion · pop-u-LA-tion · communi-CA-tion"],
          ["Medical strategy","Learn the word with its stress","Say the full word aloud, not only the individual syllables."]
        ],
        examples:["hu-man-i-TAIR-i-an · e-vac-u-A-tion · cat-a-STROPH-ic","pop-u-LA-tion · com-MOD-i-ties · co-or-di-NA-tion","me-THOD-o-lo-gy · hy-PO-th-e-sis · sig-NIF-i-cant"],
        speak:"humanitarian, evacuation, catastrophic, population, commodities, coordination, methodology, hypothesis, significant",
        quiz:[
          {q:"Where is the main stress in ‘evacuation’?", a:"e-vac-u-A-tion", options:["e-vac-u-A-tion","E-vac-u-a-tion","e-VAC-u-a-tion","e-vac-U-a-tion"], why:"The main stress falls on the syllable containing /eɪ/: evacuation."},
          {q:"Where is the main stress in ‘catastrophic’?", a:"cat-a-STROPH-ic", options:["cat-a-STROPH-ic","CAT-a-stroph-ic","cat-A-stroph-ic","cat-a-stroph-IC"], why:"The strongest syllable is ‘stroph’."},
          {q:"Where is the main stress in ‘commodities’?", a:"com-MOD-i-ties", options:["com-MOD-i-ties","COM-mod-i-ties","com-mod-I-ties","com-mod-i-TIES"], why:"The primary stress falls on the second syllable."},
          {q:"Which pronunciation strategy is best?", a:"Learn the word together with its stressed syllable.", options:["Learn the word together with its stressed syllable.","Stress every syllable equally.","Ignore stress if the spelling is correct.","Always stress the first syllable."], why:"Correct word stress is part of the word, not an optional extra."}
        ]
      },
      {
        id:"p-silent",
        title:"Silent letters in medical English",
        day:"Day 4 · AI & medicine",
        icon:"🤫",
        video:{id:"ZmPme9_PC78", title:"7 words with silent letters — BBC Learning English", source:"BBC Learning English · short pronunciation practice"},
        recap:[
          ["Do not pronounce the spelling","Some written letters disappear in speech","subtle, muscle, receipt, knee"],
          ["Useful patterns","silent k before n; silent p in ps-/pn-","knee, psychology, pneumonia"],
          ["Best habit","Learn by sound + spelling together","If you only read the word, French spelling habits can take over."]
        ],
        examples:["su(b)tle · mus(c)le · recei(p)t","(p)neumonia · (p)sychiatry · (k)nee","diaphra(g)m · (h)our"],
        speak:"subtle, muscle, receipt, pneumonia, psychiatry, knee, diaphragm, hour",
        quiz:[
          {q:"Which letter is silent in ‘subtle’?", a:"b", options:["b","t","l","e"], why:"The b is written but not pronounced."},
          {q:"Which letter is silent in ‘muscle’?", a:"c", options:["c","m","s","l"], why:"The c is silent in ‘muscle’."},
          {q:"Which word begins with a silent p?", a:"pneumonia", options:["pneumonia","patient","pulse","pain"], why:"The p is silent in the initial pn- cluster."},
          {q:"Which word begins with a silent k?", a:"knee", options:["knee","kidney","kinase","ketone"], why:"In ‘knee’, the initial k is not pronounced."}
        ]
      },
      {
        id:"p-th",
        title:"The two TH sounds: /θ/ and /ð/",
        day:"Medical English clarity",
        icon:"👅",
        video:{id:"x6Pdp8GBwTM", title:"How do I pronounce TH sounds? — BBC Learning English", source:"BBC Learning English · Ask BBC Learning English"},
        recap:[
          ["/θ/","voiceless","health, therapy, healthy, three"],
          ["/ð/","voiced","the, this, these, those"],
          ["Mouth position","Tongue lightly between the teeth","Let the air pass; add voice for /ð/."]
        ],
        examples:["health /θ/ · therapy /θ/","the /ð/ · these /ð/ · those /ð/","These three therapies may improve health outcomes."],
        speak:"health, therapy, three, the, these, those, These three therapies may improve health outcomes.",
        quiz:[
          {q:"Which TH sound starts ‘health’?", a:"/θ/", options:["/θ/","/ð/","/t/","/s/"], why:"‘Health’ uses the voiceless TH sound /θ/."},
          {q:"Which TH sound starts ‘these’?", a:"/ð/", options:["/ð/","/θ/","/d/","/z/"], why:"‘These’ uses the voiced TH sound /ð/."},
          {q:"Which pair uses the same TH sound?", a:"therapy · health", options:["therapy · health","these · health","those · therapy","the · three"], why:"Both ‘therapy’ and ‘health’ use /θ/."},
          {q:"What should the tongue do for TH?", a:"Touch or sit lightly between the teeth while air passes.", options:["Touch or sit lightly between the teeth while air passes.","Stay completely behind the lower teeth.","Press hard against the roof of the mouth.","Do not let any air pass."], why:"The characteristic TH position uses the tongue at or just between the teeth."}
        ]
      }
    ]
  };

  function loadState(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") || {}; }
    catch { return {}; }
  }
  const state=loadState();
  function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
  function shuffle(arr){
    const a=[...arr];
    for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}
    return a;
  }
  function esc(s){ return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
  function videoUrl(v){
    let qs='rel=0&modestbranding=1';
    if(v.start) qs += `&start=${v.start}`;
    if(v.end) qs += `&end=${v.end}`;
    return `${VIDEO_BASE}${encodeURIComponent(v.id)}?${qs}`;
  }
  function youtubeWatch(v){
    let u=`https://www.youtube.com/watch?v=${encodeURIComponent(v.id)}`;
    if(v.start) u += `&t=${v.start}s`;
    return u;
  }
  function chooseVoice(){
    if(!("speechSynthesis" in window)) return null;
    const voices=speechSynthesis.getVoices();
    return voices.find(v=>/^en-GB$/i.test(v.lang)) || voices.find(v=>/en[-_]GB/i.test(v.lang)) || voices.find(v=>/^en/i.test(v.lang)) || null;
  }
  function speak(text){
    if(!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u=new SpeechSynthesisUtterance(text); u.lang="en-GB"; u.rate=.88; const v=chooseVoice(); if(v) u.voice=v; speechSynthesis.speak(u);
  }

  const root=document.getElementById('reviewLessons');
  const progress=document.getElementById('reviewProgress');
  const list=lessons[page] || [];
  if(!state[page]) state[page]={};

  function renderProgress(){
    const done=list.filter(l=>state[page][l.id]?.complete).length;
    if(progress) progress.innerHTML=`<strong>${done}/${list.length}</strong><span>mini quizzes completed</span><div class="review-progress-track"><i style="width:${(done/list.length)*100}%"></i></div>`;
  }

  function renderLesson(lesson, index){
    const article=document.createElement('article'); article.className='review-lesson'; article.id=lesson.id;
    const completed=!!state[page][lesson.id]?.complete;
    article.innerHTML=`
      <div class="review-lesson-head">
        <div class="review-lesson-number">${String(index+1).padStart(2,'0')}</div>
        <div class="review-lesson-title"><span class="review-icon">${lesson.icon}</span><div><p>${esc(lesson.day)}</p><h2>${esc(lesson.title)}</h2></div></div>
        <span class="review-complete ${completed?'is-complete':''}">${completed?'✓ Completed':'Quick review'}</span>
      </div>
      <div class="review-lesson-grid">
        <section class="review-recap" aria-labelledby="${lesson.id}-recap"><p class="review-label">60-SECOND LESSON</p><div class="rule-stack">${lesson.recap.map(r=>`<div class="rule-row"><strong>${esc(r[0])}</strong><code>${esc(r[1])}</code><span>${esc(r[2])}</span></div>`).join('')}</div><div class="medical-examples"><strong>Medical English examples</strong>${lesson.examples.map(e=>`<p>${esc(e)}</p>`).join('')}${lesson.speak?`<button class="review-listen" type="button" data-speak="${esc(lesson.speak)}">🔊 Hear the examples</button>`:''}</div></section>
        <section class="review-video" aria-label="Video lesson"><p class="review-label">VIDEO</p><div class="video-placeholder" data-video-id="${esc(lesson.video.id)}"><div class="video-placeholder-icon">▶</div><strong>${esc(lesson.video.title)}</strong><span>${esc(lesson.video.source)}</span><button class="load-video" type="button">Load video</button><a href="${youtubeWatch(lesson.video)}" target="_blank" rel="noopener noreferrer">Open on YouTube ↗</a><small>External content: YouTube is contacted only if you load or open the video.</small></div></section>
      </div>
      <section class="mini-quiz" aria-labelledby="${lesson.id}-quiz"><div class="mini-quiz-head"><div><p class="review-label">MINI QUIZ</p><h3 id="${lesson.id}-quiz">4 quick checks</h3></div><div class="mini-score" aria-live="polite"></div></div><div class="quiz-items"></div><button class="quiz-reset" type="button">↻ Try this quiz again</button></section>`;
    root.appendChild(article);

    // Video privacy click-to-load
    const vp=article.querySelector('.video-placeholder');
    vp.querySelector('.load-video').addEventListener('click',()=>{
      const iframe=document.createElement('iframe'); iframe.className='review-iframe'; iframe.src=videoUrl(lesson.video); iframe.title=lesson.video.title; iframe.loading='lazy'; iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; iframe.referrerPolicy='strict-origin-when-cross-origin'; iframe.allowFullscreen=true;
      vp.replaceWith(iframe);
    });
    article.querySelectorAll('[data-speak]').forEach(b=>b.addEventListener('click',()=>speak(b.dataset.speak)));

    const qbox=article.querySelector('.quiz-items');
    const scoreEl=article.querySelector('.mini-score');
    function buildQuiz(){
      qbox.innerHTML=''; scoreEl.textContent=''; let answered=0, correct=0;
      const order=shuffle(lesson.quiz);
      order.forEach((item,qi)=>{
        const wrap=document.createElement('div'); wrap.className='quiz-item';
        const opts=shuffle(item.options);
        wrap.innerHTML=`<p class="quiz-question"><span>${qi+1}</span>${esc(item.q)}</p><div class="quiz-options"></div><div class="quiz-feedback" aria-live="polite"></div>`;
        const optsEl=wrap.querySelector('.quiz-options'), fb=wrap.querySelector('.quiz-feedback');
        opts.forEach(opt=>{
          const btn=document.createElement('button'); btn.type='button'; btn.textContent=opt;
          btn.addEventListener('click',()=>{
            if(wrap.dataset.answered) return;
            wrap.dataset.answered='1'; answered++;
            const is=opt===item.a; if(is) correct++;
            [...optsEl.children].forEach(x=>{x.disabled=true;if(x.textContent===item.a)x.classList.add('correct-answer');});
            btn.classList.add(is?'picked-correct':'picked-wrong');
            fb.className='quiz-feedback '+(is?'good':'retry'); fb.innerHTML=`<strong>${is?'Correct.':'Not quite.'}</strong> ${esc(item.why)}`;
            if(answered===lesson.quiz.length){
              const pct=Math.round(correct/lesson.quiz.length*100); scoreEl.textContent=`${correct}/${lesson.quiz.length} · ${pct}%`;
              state[page][lesson.id]={complete:true,score:correct,total:lesson.quiz.length,updated:new Date().toISOString()}; saveState();
              article.querySelector('.review-complete').textContent='✓ Completed'; article.querySelector('.review-complete').classList.add('is-complete'); renderProgress();
            }
          }); optsEl.appendChild(btn);
        });
        qbox.appendChild(wrap);
      });
    }
    article.querySelector('.quiz-reset').addEventListener('click',buildQuiz);
    buildQuiz();
  }
  list.forEach(renderLesson); renderProgress();
  if("speechSynthesis" in window) speechSynthesis.addEventListener?.('voiceschanged', chooseVoice);
})();
