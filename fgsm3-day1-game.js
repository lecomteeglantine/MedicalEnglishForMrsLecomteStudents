(() => {
  const STORAGE_KEY = "mrsLecomteFGSM3Day1ControlRoomV1";
  const STORAGE_M2_KEY = "mrsLecomteFGSM3Day1Mission2V1";
  const AUDIO_KEY = "mrsLecomteFGSM3Day1AudioV1";
  const STORAGE_AUDIO_LAB_KEY = "mrsLecomteFGSM3Day1EdAudioLabV1";
  const STORAGE_TIMELINE_KEY = "mrsLecomteFGSM3Day1TimelineCheckV1";
  const STORAGE_PATIENT2_KEY = "mrsLecomteFGSM3Day1Patient2V1";
  const STORAGE_ONLINE_DECISION_KEY = "mrsLecomteFGSM3Day1OnlineDecisionV1";
  const STORAGE_PATIENT3_KEY = "mrsLecomteFGSM3Day1Patient3V1";
  const STORAGE_PATIENT4_KEY = "mrsLecomteFGSM3Day1Patient4V1";

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

  const edAudioItems = [
    {word:"stimulated", sound:"/ɪd/", source:"Being a Doctor", sentence:"Emergency medicine kept the doctor stimulated.", reason:"The base word ends in a /t/ sound, so -ed adds an extra syllable: /ɪd/."},
    {word:"pushed", sound:"/t/", source:"Being a Doctor", sentence:"Junior doctors were pushed forward in the regional hospital.", reason:"The base word ends in the voiceless /ʃ/ sound, so -ed is pronounced /t/."},
    {word:"trained", sound:"/d/", source:"Being a Doctor", sentence:"She trained as a kidney specialist.", reason:"The base word ends in the voiced /n/ sound, so -ed is pronounced /d/."},
    {word:"provided", sound:"/ɪd/", source:"Being a Doctor", sentence:"The patient was provided with clear follow-up advice.", reason:"The base word ends in a /d/ sound, so -ed adds an extra syllable: /ɪd/."},
    {word:"worked", sound:"/t/", source:"Being a Doctor", sentence:"He worked in a regional hospital.", reason:"The base word ends in the voiceless /k/ sound, so -ed is pronounced /t/."},
    {word:"surprised", sound:"/d/", source:"Being a Doctor", sentence:"She was surprised by the variety of medicine.", reason:"The base word ends in a voiced sound, so -ed is pronounced /d/."},
    {word:"appreciated", sound:"/ɪd/", source:"Being a Doctor", sentence:"The patients appreciated the doctor's support.", reason:"The base word ends in a /t/ sound, so -ed adds an extra syllable: /ɪd/."},
    {word:"finished", sound:"/t/", source:"Being a Doctor", sentence:"She finished medical school before starting work.", reason:"The base word ends in the voiceless /ʃ/ sound, so -ed is pronounced /t/."},
    {word:"loved", sound:"/d/", source:"Being a Doctor", sentence:"The doctor loved the breadth of general medicine.", reason:"The base word ends in the voiced /v/ sound, so -ed is pronounced /d/."},
    {word:"recruited", sound:"/ɪd/", source:"Research talk", sentence:"Two hundred and forty patients were recruited.", reason:"The base word ends in a /t/ sound, so -ed adds an extra syllable: /ɪd/."},
    {word:"assessed", sound:"/t/", source:"Research talk", sentence:"The patients were assessed at follow-up.", reason:"The base word ends in the voiceless /s/ sound, so -ed is pronounced /t/."},
    {word:"measured", sound:"/d/", source:"Research talk", sentence:"Blood pressure was measured weekly.", reason:"The base word ends in a voiced sound, so -ed is pronounced /d/."}
  ];

  const edBonusWords = [
    {word:"stimulated", extra:true},
    {word:"worked", extra:false},
    {word:"trained", extra:false},
    {word:"recruited", extra:true},
    {word:"assessed", extra:false},
    {word:"measured", extra:false}
  ];

  const timelineItems = [
    {
      cue:"FOUR DAYS AGO",
      prompt:"The headaches ___ four days ago.",
      voiceText:"The headaches started four days ago.",
      options:["started", "have started"], correct:0,
      tense:"Past Simple",
      explanation:"‘Four days ago’ locates a finished event at a specific point in the past."
    },
    {
      cue:"SINCE THEN",
      prompt:"I ___ one every day since then.",
      voiceText:"I've had one every day since then.",
      options:["had", "have had"], correct:1,
      tense:"Present Perfect",
      explanation:"‘Since then’ connects the past to the present: the repeated experience continues up to now."
    },
    {
      cue:"EXACT START",
      prompt:"Which question asks for the specific moment the problem began?",
      voiceText:"When did the headaches start?",
      options:["When did the headaches start?", "When have the headaches started?"], correct:0,
      tense:"Past Simple",
      explanation:"When you ask about a specific past starting point, use the Past Simple: ‘When did it start?’"
    },
    {
      cue:"DURATION TO NOW",
      prompt:"The headaches are still happening. Which question fits?",
      voiceText:"How long have you had the headaches?",
      options:["How long did you have the headaches?", "How long have you had the headaches?"], correct:1,
      tense:"Present Perfect",
      explanation:"‘How long have you had…?’ asks about a situation that began in the past and is still relevant now."
    },
    {
      cue:"YESTERDAY",
      prompt:"Yesterday, I ___ dizzy when I stood up.",
      voiceText:"Yesterday, I felt dizzy when I stood up.",
      options:["felt", "have felt"], correct:0,
      tense:"Past Simple",
      explanation:"‘Yesterday’ is a finished past time, so use the Past Simple."
    },
    {
      cue:"THIS WEEK",
      prompt:"I ___ dizzy several times this week.",
      voiceText:"I've felt dizzy several times this week.",
      options:["felt", "have felt"], correct:1,
      tense:"Present Perfect",
      explanation:"‘This week’ is an unfinished time period here, so the experience is connected to now."
    },
    {
      cue:"SINCE MONDAY",
      prompt:"The headaches ___ more frequent since Monday.",
      voiceText:"The headaches have become more frequent since Monday.",
      options:["became", "have become"], correct:1,
      tense:"Present Perfect",
      explanation:"‘Since Monday’ gives the starting point of a change that continues up to the present."
    },
    {
      cue:"BUILD THE TIMELINE",
      prompt:"Choose the clearest clinical timeline.",
      voiceText:"I first noticed the headaches on Thursday, and they've happened every day since then.",
      options:[
        "I first noticed the headaches on Thursday, and they've happened every day since then.",
        "I've first noticed the headaches on Thursday, and they happened every day since then."
      ], correct:0,
      tense:"Past Simple + Present Perfect",
      explanation:"Use Past Simple for the dated starting event, then Present Perfect for what has continued from that point to now."
    }
  ];


  const patient2Items = [
    {
      id:"open-injury",
      title:"Checkpoint 1 · Let the patient tell the story",
      instruction:"Choose an open question before narrowing down the injury.",
      patientReply:"I twisted my right ankle while exercising two days ago. It swelled up afterwards and it's still painful.",
      options:[
        {text:"Can you tell me what happened to your ankle?", correct:true},
        {text:"You probably sprained it, didn't you?", correct:false},
        {text:"Is the ankle broken?", correct:false}
      ],
      feedback:"Start broad. The patient can describe the mechanism, timing and main problem without being pushed towards a diagnosis."
    },
    {
      id:"mechanism-weight",
      title:"Checkpoint 2 · Mechanism and weight-bearing",
      instruction:"The ankle is swollen. Which follow-up gives you the most useful information next?",
      patientReply:"I landed awkwardly after a jump. I can walk on it, but it hurts when I put my full weight through that foot.",
      options:[
        {text:"How exactly did it happen, and have you been able to put weight on it?", correct:true},
        {text:"Did you hear a crack? If not, it can't be serious.", correct:false},
        {text:"Can you walk? Good — then we don't need any more questions.", correct:false}
      ],
      feedback:"Mechanism and ability to bear weight help structure the history, but neither replaces a physical examination."
    },
    {
      id:"pain-swelling",
      title:"Checkpoint 3 · Make the symptom precise",
      instruction:"Clarify location, severity and how the swelling has changed.",
      patientReply:"The pain is mostly around the outside of the ankle. It's about six out of ten when I walk. It was more swollen yesterday, and now there's some bruising.",
      options:[
        {text:"Where exactly is the pain? How bad is it from zero to ten? Has the swelling changed?", correct:true},
        {text:"Does it hurt a lot?", correct:false},
        {text:"Is it better now?", correct:false}
      ],
      feedback:"Specific questions about where, severity and change over time turn a vague complaint into a useful clinical description."
    },
    {
      id:"camera",
      title:"Checkpoint 4 · Use the camera appropriately",
      instruction:"You now want to inspect the ankle. Choose the clearest and most respectful instruction.",
      patientReply:"Yes, of course. I'll move the camera down so you can see the swollen area.",
      options:[
        {text:"If you're comfortable, could you show me the swollen area and move the camera a little closer?", correct:true},
        {text:"Point the camera at your ankle now.", correct:false},
        {text:"Take your sock off and show me everything.", correct:false}
      ],
      feedback:"Ask permission, explain what you need to see and give one simple camera instruction at a time."
    },
    {
      id:"limits",
      title:"Checkpoint 5 · Know what video cannot do",
      instruction:"The swelling and bruising are visible on camera. What is the safest interpretation?",
      patientReply:"Okay. I was wondering whether you could tell if it's broken just from the video.",
      options:[
        {text:"I can look at swelling and bruising and ask about movement and weight-bearing, but I can't palpate or fully examine the joint over video.", correct:true},
        {text:"The camera view is enough to rule out a fracture.", correct:false},
        {text:"If you can move the ankle on camera, no further assessment is needed.", correct:false}
      ],
      feedback:"Video can support observation and history-taking, but it does not replace hands-on examination when that examination matters."
    },
    {
      id:"plan",
      title:"Checkpoint 6 · Make a safe plan",
      instruction:"The patient asks whether an X-ray is needed. Choose the safest next step for this exercise.",
      patientReply:"All right. In the meantime, what should I do if the pain or swelling gets worse?",
      options:[
        {text:"I can't examine the ankle fully over video, so I'd like to arrange a face-to-face assessment. That assessment can help decide whether further tests such as an X-ray are needed.", correct:true},
        {text:"You definitely need an X-ray, so go straight to hospital.", correct:false},
        {text:"You can still walk, so an X-ray is definitely unnecessary.", correct:false}
      ],
      feedback:"State the limitation honestly and explain the next step without overclaiming what can be decided from the video call alone."
    }
  ];


  const patient3Items = [
    {
      id:"open-fatigue",
      title:"Checkpoint 1 · Start broad",
      instruction:"Patient 03 says she has not felt like herself recently. Choose the best opening question.",
      patientReply:"I've been unusually tired for about six weeks. I keep expecting it to improve, but it hasn't.",
      options:[
        {text:"Can you tell me a little more about how you've been feeling?", correct:true},
        {text:"You're probably just run down, aren't you?", correct:false},
        {text:"Is the tiredness because you aren't sleeping enough?", correct:false}
      ],
      feedback:"Start broad and let the patient describe the problem before you suggest an explanation."
    },
    {
      id:"weight-appetite",
      title:"Checkpoint 2 · Look for important changes",
      instruction:"The fatigue has lasted several weeks. What should you explore next?",
      patientReply:"Yes. I've lost about five kilos without trying. My appetite has been a bit lower too.",
      options:[
        {text:"Have you noticed any change in your weight or appetite?", correct:true},
        {text:"Have you been dieting recently?", correct:false},
        {text:"If you're eating less, that probably explains the tiredness.", correct:false}
      ],
      feedback:"Unintentional weight loss and appetite change are relevant details. Ask rather than assume why they have happened."
    },
    {
      id:"associated-dizziness",
      title:"Checkpoint 3 · Ask about associated symptoms",
      instruction:"The patient has described fatigue and unintentional weight loss. Continue the history without turning it into a diagnosis quiz.",
      patientReply:"Sometimes I feel dizzy as well, especially when I stand up quickly. I haven't actually fainted.",
      options:[
        {text:"Have you noticed any other symptoms?", correct:true},
        {text:"You aren't getting dizzy as well, are you?", correct:false},
        {text:"Does this mean you have low blood pressure?", correct:false}
      ],
      feedback:"An open follow-up allows the patient to add associated symptoms without being led towards a particular diagnosis."
    },
    {
      id:"background",
      title:"Checkpoint 4 · Check the background",
      instruction:"Before drawing conclusions, gather relevant background information.",
      patientReply:"I haven't started any new medication and I haven't been ill recently. I've actually been sleeping more than usual, but I still feel exhausted.",
      options:[
        {text:"Do you have any medical conditions? Are you taking any medication? Have you been ill recently, and how has your sleep been?", correct:true},
        {text:"You sleep enough, so the fatigue must have a medical cause.", correct:false},
        {text:"Let's skip your medication and recent history for now.", correct:false}
      ],
      feedback:"Medication, medical history, recent illness and sleep are useful parts of the history. They give context without proving a cause."
    },
    {
      id:"impact-concern",
      title:"Checkpoint 5 · Understand the patient",
      instruction:"Now explore impact, concern and expectation — not just symptoms.",
      patientReply:"I'm struggling to concentrate at work, and I'm worried there might be something seriously wrong. Do you think I need blood tests?",
      options:[
        {text:"How is this affecting your day-to-day life, and is there anything in particular you're worried about?", correct:true},
        {text:"Try not to worry. I'm sure it's nothing serious.", correct:false},
        {text:"We only need the physical symptoms, not what you're worried about.", correct:false}
      ],
      feedback:"Exploring impact and concern helps the patient feel heard and shows what needs to be addressed in the plan."
    },
    {
      id:"empathy-uncertainty",
      title:"Checkpoint 6 · Respond without overpromising",
      instruction:"The patient is anxious about the weight loss and asks whether something serious is wrong.",
      patientReply:"Okay. I'd rather have it checked properly than just assume it's nothing.",
      options:[
        {text:"I can see why you're worried. I can't tell you the cause from this video call alone, but I do think these symptoms need further assessment.", correct:true},
        {text:"Don't worry — there is definitely nothing serious going on.", correct:false},
        {text:"Yes, unexplained weight loss usually means something serious.", correct:false}
      ],
      feedback:"Acknowledge the concern, explain uncertainty honestly and avoid both false reassurance and alarmist conclusions."
    },
    {
      id:"plan-safety-net",
      title:"Checkpoint 7 · Explain the next step",
      instruction:"Close this stage of the consultation with a clear plan and safety-netting.",
      patientReply:"All right. That makes sense. Thank you for explaining what happens next.",
      options:[
        {text:"Based on what you've told me, I'd like to arrange further assessment and some blood tests. If your symptoms get significantly worse, seek urgent medical advice.", correct:true},
        {text:"I'll order some tests, but there is no need for any further assessment.", correct:false},
        {text:"Wait another month and see if the symptoms disappear on their own.", correct:false}
      ],
      feedback:"Give a concrete next step, make clear that the video call is not the end of the assessment, and include safety-netting."
    }
  ];


  const patient4Items = [
    {
      id:"open-medication",
      title:"Checkpoint 1 · Start with the story",
      instruction:"Patient 04 says she has felt nauseous since starting a new medicine. Choose the best opening question.",
      patientReply:"I started a new tablet five days ago, and since the next day I've felt nauseous and had an upset stomach.",
      options:[
        {text:"Can you tell me what has been happening since you started the new medication?", correct:true},
        {text:"So the new medication is definitely causing this?", correct:false},
        {text:"If it makes you feel sick, why are you still taking it?", correct:false}
      ],
      feedback:"Start with the sequence of events. A symptom appearing after a new medicine is relevant, but timing alone does not prove causation."
    },
    {
      id:"medicine-dose-timing",
      title:"Checkpoint 2 · Clarify the medication",
      instruction:"Before discussing side effects, what information do you need?",
      patientReply:"It was prescribed for my blood pressure. I take one tablet every morning. I haven't changed the dose, and the nausea usually starts not long after I take it.",
      options:[
        {text:"What is the medication for, what dose are you taking, when did you start it, and when do the symptoms occur in relation to each dose?", correct:true},
        {text:"The exact medication and dose do not matter if the stomach symptoms are mild.", correct:false},
        {text:"Just tell me whether you take it in the morning or evening.", correct:false}
      ],
      feedback:"Medication name or purpose, dose, start date and symptom timing are basic safety information before you advise about treatment."
    },
    {
      id:"symptoms-warning-signs",
      title:"Checkpoint 3 · Characterise the symptoms",
      instruction:"The patient reports nausea and an upset stomach. Screen sensibly for severity and warning signs.",
      patientReply:"I feel queasy and get some mild stomach cramps, but I haven't been vomiting. I can eat and drink, and I haven't had a rash, swelling or any trouble breathing.",
      options:[
        {text:"Have you been vomiting or had severe pain? Can you keep food and fluids down? Any rash, swelling or trouble breathing?", correct:true},
        {text:"Nausea is common, so we can assume there are no warning signs.", correct:false},
        {text:"Only ask how many times a day you feel nauseous.", correct:false}
      ],
      feedback:"Do not treat every stomach symptom as an emergency, but do check severity, hydration and features that could require more urgent assessment."
    },
    {
      id:"stopping-medication",
      title:"Checkpoint 4 · Respond to the wish to stop",
      instruction:"The patient says she is thinking about skipping tomorrow's dose. Choose the safest response for this fictional scenario.",
      patientReply:"I was thinking of just stopping it because I don't want to feel sick every morning. I wasn't sure whether I should.",
      options:[
        {text:"Before you change or stop it, let's review the medication properly and make sure you get advice that is appropriate for that specific medicine.", correct:true},
        {text:"Yes, stop it immediately. Any nausea means the medication is unsuitable.", correct:false},
        {text:"Keep taking it no matter what happens; side effects are never a reason to review treatment.", correct:false}
      ],
      feedback:"Avoid blanket instructions about an unspecified medicine. The safe communication move is to arrange a medication-specific review rather than guess."
    },
    {
      id:"concern-side-effect",
      title:"Checkpoint 5 · Answer the patient's concern",
      instruction:"The patient asks: “Do you think this is a side effect?”",
      patientReply:"That makes sense. I mainly wanted to know whether the medicine could be causing it and whether there is anything we can do about it.",
      options:[
        {text:"It could be related, especially because of the timing, but I can't confirm that from timing alone. We need to review the medicine and the symptoms together.", correct:true},
        {text:"Yes. Because it started afterwards, the medicine must be the cause.", correct:false},
        {text:"No. Medicines do not usually cause stomach symptoms.", correct:false}
      ],
      feedback:"Use cautious language: possible association is not the same as a confirmed cause. Explain what information is still needed."
    },
    {
      id:"review-plan",
      title:"Checkpoint 6 · Agree a practical plan",
      instruction:"No immediate warning signs have emerged in this training case. What is the clearest next step?",
      patientReply:"Okay. I'd be happy to have the medication reviewed rather than change it on my own.",
      options:[
        {text:"I'd like to arrange a medication review so we can check the specific drug, dose and your symptoms, and decide safely whether anything needs to change.", correct:true},
        {text:"There are no warning signs, so there is no need to review the medication.", correct:false},
        {text:"Try a different dose yourself for a few days and see what happens.", correct:false}
      ],
      feedback:"A clear review plan addresses the patient's concern without asking them to alter an unspecified treatment on their own."
    },
    {
      id:"safety-net",
      title:"Checkpoint 7 · Safety-net clearly",
      instruction:"Close the medication discussion with clear advice about when the situation would need more urgent help.",
      patientReply:"All right. I'll get help sooner if anything becomes severe or I develop any of those warning signs.",
      options:[
        {text:"If the symptoms become severe, you cannot keep fluids down, you faint, or you develop breathing difficulty or swelling, seek urgent medical advice rather than waiting for the routine review.", correct:true},
        {text:"Wait for the review even if you develop severe symptoms.", correct:false},
        {text:"If you still feel nauseous tomorrow, go straight to hospital regardless of severity.", correct:false}
      ],
      feedback:"Safety-netting should be specific enough to act on, without making every mild symptom sound like an emergency."
    }
  ];


  const onlineDecisionCases = [
    {
      id:"medication-followup",
      label:"CASE 01 · MEDICATION FOLLOW-UP",
      icon:"💊",
      title:"New medication, mild nausea",
      caseText:"The patient started a new medication recently. They report mild nausea and an upset stomach, but no new alarming symptoms in this fictional case. They want to know whether they should stop the medication.",
      correct:"online",
      explanation:"For this training scenario, the discussion can continue by video: clarify the medicine, dose, timing and symptoms, then agree a clear review plan. Do not tell the patient to change prescribed treatment without appropriate clinical review.",
      phrase:"For now, we can continue this consultation by video and agree what to monitor and when to review you."
    },
    {
      id:"ankle",
      label:"CASE 02 · INJURY",
      icon:"🦶",
      title:"Twisted ankle with swelling",
      caseText:"The patient twisted an ankle two days ago. It is swollen and bruised. They can still walk, but putting full weight through the foot is painful.",
      correct:"face",
      explanation:"The camera can show swelling and bruising, but it cannot provide the hands-on examination needed in this scenario. Arrange an in-person assessment rather than overclaiming what video can establish.",
      phrase:"I can't examine the ankle fully over video, so I'd like to arrange a face-to-face assessment."
    },
    {
      id:"fatigue",
      label:"CASE 03 · GENERAL SYMPTOMS",
      icon:"🧪",
      title:"Fatigue, weight loss and dizziness",
      caseText:"The patient has felt unusually tired for several weeks, has lost weight without trying and sometimes feels dizzy. They ask whether blood tests or other investigations may be needed.",
      correct:"tests",
      explanation:"In this training scenario, history-taking can begin remotely, but the next step needs further assessment and investigations rather than a video-only conclusion.",
      phrase:"I'd like to arrange further assessment and some tests so we can investigate these symptoms properly."
    },
    {
      id:"chest",
      label:"CASE 04 · SAFETY ALERT",
      icon:"⚠️",
      title:"Chest discomfort and breathlessness",
      caseText:"The patient reports chest discomfort and shortness of breath. Their partner says the symptoms have become more frequent over the last few days and is much more worried than the patient.",
      correct:"urgent",
      explanation:"For this fictional training case, this should not be managed as a routine video-only consultation. The safe communication move is to escalate for urgent in-person assessment rather than minimise the symptoms remotely.",
      phrase:"Because of the symptoms you've described, I don't think it would be safe to assess this fully by video. You need urgent in-person assessment."
    },
    {
      id:"headache",
      label:"CASE 05 · HEADACHE REVIEW",
      icon:"🧠",
      title:"More frequent headaches with dizziness",
      caseText:"The patient has had recurrent headaches for four days and sometimes feels dizzy. During the video history in this fictional case, they report no fainting, weakness or trouble speaking, but they are worried because the pattern is different from usual.",
      correct:"tests",
      explanation:"The video history is useful, but a changed pattern with ongoing concern should not end with reassurance alone in this exercise. Plan further assessment and explain what would make the situation more urgent.",
      phrase:"I'd like to arrange further assessment, and I'll also explain what changes would mean you should seek help sooner."
    },
    {
      id:"stable-review",
      label:"CASE 06 · ROUTINE REVIEW",
      icon:"📋",
      title:"Stable follow-up, no new symptoms",
      caseText:"This is a planned follow-up. The patient feels well, has no new symptoms and mainly wants to review progress and discuss recent results that are already available to the clinician.",
      correct:"online",
      explanation:"A stable follow-up can be suitable for video in this training scenario when no hands-on examination is required and the clinician remains ready to change the plan if new information emerges.",
      phrase:"This follow-up is suitable to continue by video today. If anything new comes up, we can change the plan."
    }
  ];

  const onlineDecisionOptions = [
    {id:"online", label:"Continue online", icon:"💻", sub:"Video remains suitable for this stage."},
    {id:"face", label:"Arrange face-to-face", icon:"🏥", sub:"A hands-on assessment is needed."},
    {id:"tests", label:"Further tests / follow-up", icon:"🧪", sub:"Remote history is not the end of the pathway."},
    {id:"urgent", label:"Urgent assessment", icon:"🚨", sub:"Do not manage this as a routine video-only case."}
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
    missionMap2: document.getElementById("missionMap2"),
    audioLabArea: document.getElementById("audioLabArea"),
    audioLabScreen: document.getElementById("audioLabScreen"),
    audioLabFeedback: document.getElementById("audioLabFeedback"),
    audioLabInstruction: document.getElementById("audioLabInstruction"),
    audioLabCheckpoint: document.getElementById("audioLabCheckpointNumber"),
    audioLabProgress: document.getElementById("audioLabProgressBar"),
    audioLabStart: document.getElementById("startAudioLab"),
    audioLabMap: document.getElementById("audioLabMap"),
    timelineMap: document.getElementById("timelineMap"),
    timelineArea: document.getElementById("timelineArea"),
    timelineScreen: document.getElementById("timelineScreen"),
    timelineFeedback: document.getElementById("timelineFeedback"),
    timelineInstruction: document.getElementById("timelineInstruction"),
    timelineCheckpoint: document.getElementById("timelineCheckpointNumber"),
    timelineProgress: document.getElementById("timelineProgressBar"),
    timelineStart: document.getElementById("startTimeline"),
    patient2Map: document.getElementById("patient2Map"),
    patient2Area: document.getElementById("patient2Area"),
    patient2Screen: document.getElementById("patient2Screen"),
    patient2Feedback: document.getElementById("patient2Feedback"),
    patient2Instruction: document.getElementById("patient2Instruction"),
    patient2Checkpoint: document.getElementById("patient2CheckpointNumber"),
    patient2Progress: document.getElementById("patient2ProgressBar"),
    patient2Start: document.getElementById("startPatient2"),
    onlineDecisionArea: document.getElementById("onlineDecisionArea"),
    onlineDecisionScreen: document.getElementById("onlineDecisionScreen"),
    onlineDecisionFeedback: document.getElementById("onlineDecisionFeedback"),
    onlineDecisionInstruction: document.getElementById("onlineDecisionInstruction"),
    onlineDecisionCheckpoint: document.getElementById("onlineDecisionCheckpointNumber"),
    onlineDecisionProgress: document.getElementById("onlineDecisionProgressBar"),
    onlineDecisionStart: document.getElementById("startOnlineDecision"),
    patientMini1: document.getElementById("patientMini1"),
    patientMini2: document.getElementById("patientMini2"),
    patientMini3: document.getElementById("patientMini3"),
    patientMini4: document.getElementById("patientMini4"),
    onlineMap: document.getElementById("onlineMap"),
    patient3Map: document.getElementById("patient3Map"),
    patient4Map: document.getElementById("patient4Map"),
    patient3Area: document.getElementById("patient3Area"),
    patient3Screen: document.getElementById("patient3Screen"),
    patient3Feedback: document.getElementById("patient3Feedback"),
    patient3Instruction: document.getElementById("patient3Instruction"),
    patient3Checkpoint: document.getElementById("patient3CheckpointNumber"),
    patient3Progress: document.getElementById("patient3ProgressBar"),
    patient3Start: document.getElementById("startPatient3"),
    patient4Area: document.getElementById("patient4Area"),
    patient4Screen: document.getElementById("patient4Screen"),
    patient4Feedback: document.getElementById("patient4Feedback"),
    patient4Instruction: document.getElementById("patient4Instruction"),
    patient4Checkpoint: document.getElementById("patient4CheckpointNumber"),
    patient4Progress: document.getElementById("patient4ProgressBar"),
    patient4Start: document.getElementById("startPatient4"),
    researchMap: document.getElementById("researchMap")
  };

  let state = readState();
  let clinicalState = readClinicalState();
  let audioLabState = readAudioLabState();
  let timelineState = readTimelineState();
  let patient2State = readPatient2State();
  let onlineDecisionState = readOnlineDecisionState();
  let patient3State = readPatient3State();
  let patient4State = readPatient4State();
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

  function readAudioLabState() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_AUDIO_LAB_KEY));
      if (value && Number.isInteger(value.index)) return value;
    } catch (_) {}
    return {index: 0, completed: false, mistakes: 0, bonusDone: false};
  }

  function saveAudioLabState() {
    try { localStorage.setItem(STORAGE_AUDIO_LAB_KEY, JSON.stringify(audioLabState)); } catch (_) {}
  }

  function readTimelineState() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_TIMELINE_KEY));
      if (value && Number.isInteger(value.index)) return value;
    } catch (_) {}
    return {index: 0, completed: false, mistakes: 0};
  }

  function saveTimelineState() {
    try { localStorage.setItem(STORAGE_TIMELINE_KEY, JSON.stringify(timelineState)); } catch (_) {}
  }


  function readPatient2State() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_PATIENT2_KEY));
      if (value && Number.isInteger(value.index)) return value;
    } catch (_) {}
    return {index: 0, completed: false, mistakes: 0, lastReply: ""};
  }

  function savePatient2State() {
    try { localStorage.setItem(STORAGE_PATIENT2_KEY, JSON.stringify(patient2State)); } catch (_) {}
  }


  function readOnlineDecisionState() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_ONLINE_DECISION_KEY));
      if (value && Number.isInteger(value.index)) return value;
    } catch (_) {}
    return {index: 0, completed: false, mistakes: 0};
  }

  function saveOnlineDecisionState() {
    try { localStorage.setItem(STORAGE_ONLINE_DECISION_KEY, JSON.stringify(onlineDecisionState)); } catch (_) {}
  }

  function readPatient3State() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_PATIENT3_KEY));
      if (value && Number.isInteger(value.index)) return value;
    } catch (_) {}
    return {index: 0, completed: false, mistakes: 0, lastReply: ""};
  }

  function savePatient3State() {
    try { localStorage.setItem(STORAGE_PATIENT3_KEY, JSON.stringify(patient3State)); } catch (_) {}
  }

  function readPatient4State() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_PATIENT4_KEY));
      if (value && Number.isInteger(value.index)) return value;
    } catch (_) {}
    return {index: 0, completed: false, mistakes: 0, lastReply: ""};
  }

  function savePatient4State() {
    try { localStorage.setItem(STORAGE_PATIENT4_KEY, JSON.stringify(patient4State)); } catch (_) {}
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

  function speak(text, button, rate = 0.9) {
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
    utterance.rate = rate;
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
    els.shiftStatus.textContent = audioLabState.completed ? "Missions 1–2 + Audio Lab complete" : "Missions 1–2 complete · Audio Lab unlocked";
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
          <button id="startAudioLabFromM2" class="tcr-primary" type="button">Enter -ed Audio Lab →</button>
          <button id="replayMission2" class="tcr-secondary-button" type="button">Replay Mission 2</button>
        </div>
      </div>`;
    setClinicalFeedback("<strong>Next:</strong> the -ed Audio Lab will move from consultation skills to pronunciation before the Timeline Check.", "info");
    document.getElementById("replayMission2").addEventListener("click", resetClinicalMission);
    document.getElementById("startAudioLabFromM2").addEventListener("click", startAudioLab);
    renderClinicalProgress();
    unlockAudioLab();
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
    renderAudioLabProgress();
  }

  function setAudioLabFeedback(html = "", type = "") {
    els.audioLabFeedback.className = "mission-feedback" + (type ? ` ${type}` : "");
    els.audioLabFeedback.innerHTML = html;
  }

  function renderAudioLabProgress() {
    const total = edAudioItems.length + 1;
    if (!clinicalState.completed) {
      els.audioLabArea.classList.add("is-locked");
      els.audioLabStart.disabled = true;
      els.audioLabStart.textContent = "Audio Lab locked";
      els.audioLabCheckpoint.textContent = `0 / ${total}`;
      els.audioLabProgress.style.width = "0%";
      if (els.audioLabMap) {
        els.audioLabMap.classList.remove("live", "done", "next-ready");
        els.audioLabMap.querySelector("b").textContent = "LOCKED";
      }
      return;
    }

    els.audioLabArea.classList.remove("is-locked");
    els.audioLabStart.disabled = false;
    els.audioLabStart.textContent = audioLabState.completed ? "View completed Audio Lab →" : audioLabState.index > 0 ? "Continue Audio Lab →" : "Enter Training Bay →";

    const completedChecks = audioLabState.completed ? total : Math.min(audioLabState.index, edAudioItems.length) + (audioLabState.bonusDone ? 1 : 0);
    els.audioLabCheckpoint.textContent = audioLabState.completed ? `${total} / ${total}` : `${completedChecks} / ${total}`;
    els.audioLabProgress.style.width = `${(completedChecks / total) * 100}%`;

    if (els.audioLabMap) {
      els.audioLabMap.classList.remove("live", "done", "next-ready");
      els.audioLabMap.classList.add(audioLabState.completed ? "done" : "live");
      els.audioLabMap.querySelector("b").textContent = audioLabState.completed ? "DONE" : "LIVE";
    }
    renderTimelineProgress();
  }

  function unlockAudioLab() {
    renderAudioLabProgress();
    if (!audioLabState.completed && audioLabState.index === 0) {
      els.audioLabInstruction.textContent = "Training Bay unlocked. Listen, classify the -ed ending and notice when an extra syllable appears.";
      els.audioLabScreen.innerHTML = `
        <div class="mission-waiting">
          <div class="mission-waiting-icon" aria-hidden="true">🎧</div>
          <h3>Pronunciation training ready</h3>
          <p>Start with verbs from <em>Being a Doctor</em>, then switch to the language of your scientific article presentation.</p>
        </div>`;
    }
  }

  function suffixMarkup(word) {
    const safe = escapeHTML(word);
    if (!/ed$/i.test(word)) return safe;
    return safe.slice(0, -2) + '<span class="ed-word-suffix">ed</span>';
  }

  function renderAudioLabItem() {
    renderAudioLabProgress();
    if (!clinicalState.completed) return;
    if (audioLabState.completed) return renderAudioLabComplete();
    if (audioLabState.index >= edAudioItems.length) return renderExtraSyllableBonus();

    const item = edAudioItems[audioLabState.index];
    const number = audioLabState.index + 1;
    const round = audioLabState.index < 9 ? "ROUND 1 · CLINICAL CAREERS" : "ROUND 2 · RESEARCH COMMS";
    els.audioLabInstruction.textContent = `Training check ${number}: listen or read, then choose the final -ed sound.`;
    setAudioLabFeedback();

    els.audioLabScreen.innerHTML = `
      <div class="audio-lab-shell">
        <article class="ed-word-card">
          <span class="training-bay-label">${round}</span>
          <span class="ed-source-chip">${escapeHTML(item.source)}</span>
          <div class="ed-word" aria-label="${escapeHTML(item.word)}">${suffixMarkup(item.word)}</div>
          <div class="ed-transcript">
            <span>Sentence transcript</span>
            <p>${escapeHTML(item.sentence)}</p>
          </div>
          <div class="ed-audio-actions">
            <button id="listenEdWord" class="ed-listen" type="button">🔊 Hear the word</button>
            <button id="listenEdSentence" class="ed-listen" type="button">🔊 Hear the sentence</button>
          </div>
        </article>
        <article class="ed-answer-card">
          <span class="ed-round-kicker">TRAINING CHECK ${number} OF ${edAudioItems.length}</span>
          <h3>How does <em>-ed</em> sound?</h3>
          <p>Choose the sound you hear — or work it out from the final sound of the base verb.</p>
          <div class="ed-sound-options" role="group" aria-label="Choose the -ed ending sound">
            <button class="ed-sound-choice" type="button" data-ed-sound="/ɪd/"><span>/ɪd/</span><small>extra syllable</small></button>
            <button class="ed-sound-choice" type="button" data-ed-sound="/t/"><span>/t/</span><small>voiceless ending</small></button>
            <button class="ed-sound-choice" type="button" data-ed-sound="/d/"><span>/d/</span><small>voiced ending</small></button>
          </div>
          <div class="ed-rule-strip"><strong>Rule:</strong> after <code>/t/</code> or <code>/d/</code> → <code>/ɪd/</code>; after a voiceless sound → <code>/t/</code>; after a voiced sound → <code>/d/</code>.</div>
        </article>
      </div>`;

    const wordBtn = document.getElementById("listenEdWord");
    const sentenceBtn = document.getElementById("listenEdSentence");
    wordBtn.addEventListener("click", () => speak(item.word, wordBtn, 0.76));
    sentenceBtn.addEventListener("click", () => speak(item.sentence, sentenceBtn, 0.88));

    els.audioLabScreen.querySelectorAll("[data-ed-sound]").forEach(button => {
      button.addEventListener("click", () => {
        const chosen = button.dataset.edSound;
        els.audioLabScreen.querySelectorAll("[data-ed-sound]").forEach(btn => { btn.disabled = true; });
        if (chosen === item.sound) {
          button.classList.add("correct-choice");
          beep("ok");
          setAudioLabFeedback(`<strong>✓ ${escapeHTML(item.word)} → ${escapeHTML(item.sound)}</strong> ${escapeHTML(item.reason)}`, "correct");
          advanceAudioLabButton(audioLabState.index === edAudioItems.length - 1 ? "Extra-syllable check →" : "Next word →");
        } else {
          button.classList.add("wrong-choice");
          audioLabState.mistakes += 1;
          saveAudioLabState();
          beep("error");
          setAudioLabFeedback(`<strong>Try again.</strong> Listen to the final sound of the base verb, not the spelling. The letters <em>-ed</em> do not automatically create an extra syllable.`, "wrong");
          window.setTimeout(() => {
            els.audioLabScreen.querySelectorAll("[data-ed-sound]").forEach(btn => {
              btn.disabled = false;
              btn.classList.remove("wrong-choice");
            });
          }, 650);
        }
      });
    });
  }

  function advanceAudioLabButton(label) {
    const holder = document.createElement("div");
    holder.className = "mission-next-holder";
    holder.innerHTML = `<button class="tcr-primary" type="button">${escapeHTML(label)}</button>`;
    els.audioLabFeedback.appendChild(holder);
    holder.querySelector("button").addEventListener("click", () => {
      audioLabState.index += 1;
      saveAudioLabState();
      renderAudioLabItem();
      els.audioLabScreen.focus({preventScroll:true});
    });
  }

  function renderExtraSyllableBonus() {
    const total = edAudioItems.length + 1;
    els.audioLabInstruction.textContent = "Final training check: select every word where -ed creates an extra syllable /ɪd/.";
    els.audioLabCheckpoint.textContent = `${edAudioItems.length} / ${total}`;
    els.audioLabProgress.style.width = `${(edAudioItems.length / total) * 100}%`;
    setAudioLabFeedback();
    els.audioLabScreen.innerHTML = `
      <div class="ed-bonus">
        <span class="ed-round-kicker">FINAL CHECK · EXTRA SYLLABLE</span>
        <h3>Which words gain an extra syllable?</h3>
        <p>Select <strong>all</strong> the words whose <em>-ed</em> ending is pronounced <strong>/ɪd/</strong>.</p>
        <form id="edBonusForm">
          <div class="ed-bonus-grid">
            ${edBonusWords.map(item => `<label class="ed-bonus-option"><input type="checkbox" value="${escapeHTML(item.word)}"><span>${escapeHTML(item.word)}</span></label>`).join("")}
          </div>
          <div class="ed-bonus-note"><strong>Think sound, not spelling:</strong> the extra syllable appears only after a final /t/ or /d/ sound.</div>
          <button class="tcr-primary mission-submit" type="submit">Check my selection</button>
        </form>
      </div>`;

    document.getElementById("edBonusForm").addEventListener("submit", event => {
      event.preventDefault();
      const selected = new Set([...event.currentTarget.querySelectorAll('input:checked')].map(i => i.value));
      const correct = new Set(edBonusWords.filter(w => w.extra).map(w => w.word));
      const exact = selected.size === correct.size && [...correct].every(word => selected.has(word));
      if (exact) {
        audioLabState.bonusDone = true;
        audioLabState.completed = true;
        saveAudioLabState();
        beep("ok");
        renderAudioLabComplete();
      } else {
        audioLabState.mistakes += 1;
        saveAudioLabState();
        beep("error");
        setAudioLabFeedback("<strong>Not quite.</strong> Find the words whose base verbs end in a /t/ or /d/ sound. Those are the ones that need the extra /ɪd/ syllable.", "wrong");
      }
    });
  }

  function renderAudioLabComplete() {
    const total = edAudioItems.length + 1;
    els.audioLabInstruction.textContent = "Audio Lab complete: you can distinguish /ɪd/, /t/ and /d/ in clinical and research English.";
    els.audioLabCheckpoint.textContent = `${total} / ${total}`;
    els.audioLabProgress.style.width = "100%";
    els.shiftStatus.textContent = "Missions 1–2 + Audio Lab complete";
    const score = Math.max(0, 100 - audioLabState.mistakes * 4);
    const quality = audioLabState.mistakes === 0 ? "Clean sweep" : audioLabState.mistakes <= 3 ? "Strong sound awareness" : "Sound patterns secured after review";
    els.audioLabScreen.innerHTML = `
      <div class="mission-complete-card">
        <div class="mission-badge pronunciation-badge" aria-hidden="true">🎧</div>
        <p class="mission-step-label">TRAINING BAY COMPLETE</p>
        <h3>Pronunciation Specialist badge unlocked</h3>
        <p>${escapeHTML(quality)}. You classified <em>-ed</em> endings from clinical-career vocabulary and research presentation language, then identified when /ɪd/ adds an extra syllable.</p>
        <div class="mission-complete-score"><strong>${score}%</strong><span>audio lab score</span></div>
        <div class="timeline-preview">
          <span>NEXT · TIMELINE CHECK</span>
          <p>“The headaches <strong>started</strong> four days ago. I'<strong>ve had</strong> one every day since then.”</p>
          <small>Next stop: choose between Past Simple and Present Perfect while the consultation timeline develops.</small>
        </div>
        <div class="mission-complete-actions">
          <button id="startTimelineFromAudio" class="tcr-primary" type="button">Enter Timeline Check →</button>
          <button id="replayAudioLab" class="tcr-secondary-button" type="button">Replay Audio Lab</button>
        </div>
      </div>`;
    setAudioLabFeedback("<strong>Next:</strong> Timeline Check — Past Simple vs Present Perfect in Patient 01's history.", "info");
    document.getElementById("replayAudioLab").addEventListener("click", resetAudioLab);
    document.getElementById("startTimelineFromAudio").addEventListener("click", startTimeline);
    renderAudioLabProgress();
    unlockTimeline();
  }

  function startAudioLab() {
    if (!clinicalState.completed) return;
    if (audioLabState.completed) renderAudioLabComplete();
    else renderAudioLabItem();
    els.audioLabArea.scrollIntoView({behavior:"smooth", block:"start"});
    els.audioLabScreen.focus({preventScroll:true});
    if (audioPrefs.music) syncMusic();
  }

  function resetAudioLab() {
    audioLabState = {index: 0, completed: false, mistakes: 0, bonusDone: false};
    saveAudioLabState();
    renderAudioLabProgress();
    els.audioLabInstruction.textContent = clinicalState.completed
      ? "Training Bay unlocked. Listen, classify the -ed ending and notice when an extra syllable appears."
      : "Complete Mission 2 to unlock pronunciation training.";
    els.audioLabScreen.innerHTML = clinicalState.completed
      ? `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🎧</div><h3>Pronunciation training ready</h3><p>Start with verbs from <em>Being a Doctor</em>, then switch to the language of your scientific article presentation.</p></div>`
      : `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🔒</div><h3>Training Bay locked</h3><p>Finish the clinical history with Patient 01 first. The pronunciation lab will unlock automatically.</p></div>`;
    setAudioLabFeedback();
  }

  function setTimelineFeedback(html = "", type = "") {
    els.timelineFeedback.className = "mission-feedback" + (type ? ` ${type}` : "");
    els.timelineFeedback.innerHTML = html;
  }

  function timelineIsUnlocked() {
    return audioLabState.completed || timelineState.completed;
  }

  function renderTimelineProgress() {
    const unlocked = timelineIsUnlocked();
    if (!unlocked) {
      els.timelineArea.classList.add("is-locked");
      els.timelineStart.disabled = true;
      els.timelineStart.textContent = "Timeline Check locked";
      els.timelineCheckpoint.textContent = `0 / ${timelineItems.length}`;
      els.timelineProgress.style.width = "0%";
      if (els.timelineMap) {
        els.timelineMap.classList.remove("live", "done", "next-ready");
        els.timelineMap.querySelector("b").textContent = "LOCKED";
      }
      if (els.patient2Map) {
        els.patient2Map.classList.remove("live", "done", "next-ready");
        els.patient2Map.querySelector("b").textContent = "LOCKED";
      }
      if (els.researchMap) {
        els.researchMap.classList.remove("live", "done", "next-ready");
        els.researchMap.querySelector("b").textContent = "LOCKED";
      }
      return;
    }

    els.timelineArea.classList.remove("is-locked");
    els.timelineStart.disabled = false;
    els.timelineStart.textContent = timelineState.completed ? "View completed Timeline Check →" : timelineState.index > 0 ? "Continue Timeline Check →" : "Open Timeline Monitor →";
    const done = timelineState.completed ? timelineItems.length : Math.min(timelineState.index, timelineItems.length);
    els.timelineCheckpoint.textContent = timelineState.completed ? `${timelineItems.length} / ${timelineItems.length}` : `${done} / ${timelineItems.length}`;
    els.timelineProgress.style.width = `${(done / timelineItems.length) * 100}%`;

    if (els.timelineMap) {
      els.timelineMap.classList.remove("live", "done", "next-ready");
      els.timelineMap.classList.add(timelineState.completed ? "done" : "live");
      els.timelineMap.querySelector("b").textContent = timelineState.completed ? "DONE" : "LIVE";
    }
    if (els.patient2Map) {
      els.patient2Map.classList.remove("live", "done", "next-ready");
      if (timelineState.completed) els.patient2Map.classList.add("next-ready");
      els.patient2Map.querySelector("b").textContent = timelineState.completed ? "NEXT" : "LOCKED";
    }
    if (els.researchMap) {
      els.researchMap.classList.remove("live", "done", "next-ready");
      els.researchMap.querySelector("b").textContent = "LOCKED";
    }
  }

  function unlockTimeline() {
    renderTimelineProgress();
    if (!timelineIsUnlocked()) return;
    if (!timelineState.completed && timelineState.index === 0) {
      els.timelineInstruction.textContent = "Timeline monitor unlocked. Decide whether each line describes a finished past event or a situation connected to now.";
      els.timelineScreen.innerHTML = `
        <div class="mission-waiting">
          <div class="mission-waiting-icon" aria-hidden="true">🕒</div>
          <h3>Patient 01's timeline is ready</h3>
          <p>Specific finished time → Past Simple. Past experience or duration connected to now → Present Perfect.</p>
        </div>`;
    }
  }

  function timelineVisual(item) {
    const presentPerfect = /Present Perfect/.test(item.tense);
    return `
      <div class="timeline-axis" aria-hidden="true">
        <span class="timeline-past-label">PAST</span>
        <div class="timeline-line"><i class="timeline-event-dot"></i><i class="timeline-now-dot"></i></div>
        <span class="timeline-now-label">NOW</span>
      </div>
      <div class="timeline-cue-chip ${presentPerfect ? "linked-now" : "finished-past"}">${escapeHTML(item.cue)}</div>`;
  }

  function renderTimelineItem() {
    renderTimelineProgress();
    if (!timelineIsUnlocked()) return;
    if (timelineState.completed || timelineState.index >= timelineItems.length) return renderTimelineComplete();

    const item = timelineItems[timelineState.index];
    const number = timelineState.index + 1;
    els.timelineInstruction.textContent = `Timeline check ${number}: choose the tense that matches the clinical time reference.`;
    setTimelineFeedback();

    els.timelineScreen.innerHTML = `
      <div class="timeline-shell">
        <article class="timeline-patient-card">
          <div class="timeline-patient-head">
            <img src="assets/fgsm3/day1/images/fgsm3-day1-patient01-headache.webp" alt="Patient 01 during her home video consultation.">
            <div><span>PATIENT 01 · ELEANOR REED</span><strong>Headache timeline</strong><small>Grammar monitor · no timer</small></div>
          </div>
          ${timelineVisual(item)}
          <div class="timeline-transcript">
            <span>Clinical line</span>
            <p>${escapeHTML(item.prompt)}</p>
          </div>
          <button id="listenTimelineLine" class="timeline-listen" type="button">🔊 Hear the completed line</button>
        </article>
        <article class="timeline-choice-card">
          <span class="timeline-round-kicker">CHECK ${number} OF ${timelineItems.length}</span>
          <h3>${escapeHTML(item.prompt)}</h3>
          <p>Choose the form or question that keeps the patient's timeline accurate.</p>
          <div class="timeline-options" role="group" aria-label="Choose the correct tense or question">
            ${item.options.map((option, idx) => `<button class="timeline-choice" type="button" data-timeline-choice="${idx}"><span>${String.fromCharCode(65 + idx)}</span><b>${escapeHTML(option)}</b></button>`).join("")}
          </div>
          <div class="timeline-rule-box"><strong>Quick rule</strong><span><em>yesterday / ago / last… / exact past time</em> → Past Simple</span><span><em>since / for / recently / up to now</em> → Present Perfect</span></div>
        </article>
      </div>`;

    const listen = document.getElementById("listenTimelineLine");
    listen.addEventListener("click", () => speak(item.voiceText, listen, 0.88));

    els.timelineScreen.querySelectorAll("[data-timeline-choice]").forEach(button => {
      button.addEventListener("click", () => {
        const chosen = Number(button.dataset.timelineChoice);
        els.timelineScreen.querySelectorAll("[data-timeline-choice]").forEach(btn => { btn.disabled = true; });
        if (chosen === item.correct) {
          button.classList.add("correct-choice");
          beep("ok");
          setTimelineFeedback(`<strong>✓ ${escapeHTML(item.tense)}.</strong> ${escapeHTML(item.explanation)} <button class="inline-listen-correct" type="button">🔊 Hear it</button>`, "correct");
          const inlineListen = els.timelineFeedback.querySelector(".inline-listen-correct");
          inlineListen?.addEventListener("click", () => speak(item.voiceText, inlineListen, 0.88));
          advanceTimelineButton(number === timelineItems.length ? "Complete Timeline Check →" : "Next timeline clue →");
        } else {
          button.classList.add("wrong-choice");
          timelineState.mistakes += 1;
          saveTimelineState();
          beep("error");
          setTimelineFeedback(`<strong>Try again.</strong> Look at the time clue: <em>${escapeHTML(item.cue)}</em>. Decide whether the time is finished, or whether it reaches the present.`, "wrong");
          window.setTimeout(() => {
            els.timelineScreen.querySelectorAll("[data-timeline-choice]").forEach(btn => {
              btn.disabled = false;
              btn.classList.remove("wrong-choice");
            });
          }, 650);
        }
      });
    });
  }

  function advanceTimelineButton(label) {
    const holder = document.createElement("div");
    holder.className = "mission-next-holder";
    holder.innerHTML = `<button class="tcr-primary" type="button">${escapeHTML(label)}</button>`;
    els.timelineFeedback.appendChild(holder);
    holder.querySelector("button").addEventListener("click", () => {
      timelineState.index += 1;
      if (timelineState.index >= timelineItems.length) timelineState.completed = true;
      saveTimelineState();
      renderTimelineItem();
      els.timelineScreen.focus({preventScroll:true});
    });
  }

  function renderTimelineComplete() {
    timelineState.completed = true;
    timelineState.index = timelineItems.length;
    saveTimelineState();
    els.timelineInstruction.textContent = "Timeline Check complete: you can separate finished past events from experiences and situations connected to now.";
    els.timelineCheckpoint.textContent = `${timelineItems.length} / ${timelineItems.length}`;
    els.timelineProgress.style.width = "100%";
    els.shiftStatus.textContent = "Timeline Check complete · Patient 02 next";
    const score = Math.max(0, 100 - timelineState.mistakes * 7);
    const quality = timelineState.mistakes === 0 ? "Timeline perfectly controlled" : timelineState.mistakes <= 2 ? "Clinical timeline secure" : "Timeline secured after review";
    els.timelineScreen.innerHTML = `
      <div class="mission-complete-card">
        <div class="mission-badge timeline-badge" aria-hidden="true">🕒</div>
        <p class="mission-step-label">LANGUAGE BAY COMPLETE</p>
        <h3>Timeline Navigator badge unlocked</h3>
        <p>${escapeHTML(quality)}. You used the Past Simple for finished events and specific past times, and the Present Perfect for experiences, duration and change connected to now.</p>
        <div class="mission-complete-score"><strong>${score}%</strong><span>timeline score</span></div>
        <div class="timeline-summary-grid">
          <div><span>PAST SIMPLE</span><strong>When did it start?</strong><small>The headaches started four days ago.</small></div>
          <div><span>PRESENT PERFECT</span><strong>How long have you had it?</strong><small>I've had one every day since then.</small></div>
        </div>
        <div class="timeline-preview research-preview">
          <span>NEXT CALL · PATIENT 02</span>
          <p><strong>Twisted ankle · swelling · pain</strong></p>
          <small>Return to the Control Room: use the camera appropriately, explore the injury and decide what can — and cannot — be assessed safely by video.</small>
        </div>
        <div class="mission-complete-actions">
          <button id="replayTimeline" class="tcr-secondary-button" type="button">Replay Timeline Check</button>
          <a class="tcr-secondary-link dark" href="#mission-map">Mission map ↓</a>
        </div>
      </div>`;
    setTimelineFeedback("<strong>Next:</strong> Patient 02 — ankle injury, camera skills and safe online assessment.", "info");
    document.getElementById("replayTimeline").addEventListener("click", resetTimeline);
    renderTimelineProgress();
    unlockPatient2();
  }

  function startTimeline() {
    if (!timelineIsUnlocked()) return;
    if (timelineState.completed) renderTimelineComplete();
    else renderTimelineItem();
    els.timelineArea.scrollIntoView({behavior:"smooth", block:"start"});
    els.timelineScreen.focus({preventScroll:true});
    if (audioPrefs.music) syncMusic();
  }

  function resetTimeline() {
    timelineState = {index: 0, completed: false, mistakes: 0};
    saveTimelineState();
    renderTimelineProgress();
    els.timelineInstruction.textContent = timelineIsUnlocked()
      ? "Timeline monitor unlocked. Decide whether each line describes a finished past event or a situation connected to now."
      : "Complete the -ed Audio Lab to unlock the timeline monitor.";
    els.timelineScreen.innerHTML = timelineIsUnlocked()
      ? `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🕒</div><h3>Patient 01's timeline is ready</h3><p>Specific finished time → Past Simple. Past experience or duration connected to now → Present Perfect.</p></div>`
      : `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🔒</div><h3>Timeline monitor locked</h3><p>Complete the pronunciation Training Bay first.</p></div>`;
    setTimelineFeedback();
  }


  function setPatient2Feedback(html = "", type = "") {
    els.patient2Feedback.className = "mission-feedback" + (type ? ` ${type}` : "");
    els.patient2Feedback.innerHTML = html;
  }

  function patient2IsUnlocked() {
    return timelineState.completed || patient2State.completed;
  }

  function updatePatientStripForPatient2() {
    if (!els.patientMini1 || !els.patientMini2) return;
    if (patient2IsUnlocked()) {
      els.patientMini1.classList.remove("active-patient");
      els.patientMini2.classList.add("p2-current");
      const one = els.patientMini1.querySelector("small");
      const two = els.patientMini2.querySelector("small");
      if (one) one.textContent = "Consultation complete";
      if (two) two.textContent = patient2State.completed ? "Consultation complete" : "Calling now";
    }
  }

  function renderPatient2Progress() {
    const unlocked = patient2IsUnlocked();
    const done = patient2State.completed ? patient2Items.length : Math.min(patient2State.index, patient2Items.length);
    if (!unlocked) {
      els.patient2Area.classList.add("is-locked");
      els.patient2Start.disabled = true;
      els.patient2Start.textContent = "Patient 02 locked";
      els.patient2Checkpoint.textContent = `0 / ${patient2Items.length}`;
      els.patient2Progress.style.width = "0%";
      if (els.patient2Map) {
        els.patient2Map.classList.remove("live", "done", "next-ready", "patient2-ready");
        els.patient2Map.querySelector("b").textContent = "LOCKED";
      }
      if (els.onlineMap) {
        els.onlineMap.classList.remove("live", "done", "next-ready");
        els.onlineMap.querySelector("b").textContent = "LOCKED";
      }
      return;
    }

    els.patient2Area.classList.remove("is-locked");
    els.patient2Start.disabled = false;
    els.patient2Start.textContent = patient2State.completed ? "View completed Patient 02 →" : patient2State.index > 0 ? "Continue Patient 02 →" : "Answer Patient 02 →";
    els.patient2Checkpoint.textContent = `${done} / ${patient2Items.length}`;
    els.patient2Progress.style.width = `${(done / patient2Items.length) * 100}%`;

    if (els.patient2Map) {
      els.patient2Map.classList.remove("live", "done", "next-ready", "patient2-ready");
      els.patient2Map.classList.add(patient2State.completed ? "done" : "patient2-ready");
      els.patient2Map.querySelector("b").textContent = patient2State.completed ? "DONE" : "LIVE";
    }
    if (els.onlineMap && !onlineDecisionState.completed) {
      els.onlineMap.classList.remove("live", "done", "next-ready");
      if (patient2State.completed) els.onlineMap.classList.add("next-ready");
      els.onlineMap.querySelector("b").textContent = patient2State.completed ? "NEXT" : "LOCKED";
    }
    updatePatientStripForPatient2();
  }

  function unlockPatient2() {
    renderPatient2Progress();
    if (!patient2IsUnlocked()) return;
    if (!patient2State.completed && patient2State.index === 0) {
      els.patient2Instruction.textContent = "Patient 02 is connected. Explore the injury, use the camera appropriately and stay clear about the limits of video assessment.";
      els.patient2Screen.innerHTML = `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">📹</div><h3>Incoming call · Patient 02</h3><p>Twisted ankle two days ago · swelling · pain · still able to walk.</p></div>`;
    }
  }

  function patient2VideoPanel(reply = "") {
    return `<article class="p2-video-card">
      <div class="p2-image-wrap">
        <span class="p2-live">● LIVE · PATIENT 02</span>
        <img src="assets/fgsm3/day1/images/fgsm3-day1-patient02-ankle.webp" alt="Patient 02 at home during a video consultation with an injured ankle visible.">
      </div>
      <div class="p2-video-meta">
        <span>FICTIONAL CASE · VIDEO CONSULTATION</span>
        <h3>Patient 02 · ankle injury</h3>
        <small>Twisted ankle · two days ago · swelling + pain</small>
        ${reply ? `<div class="p2-reply"><div class="p2-reply-head"><strong>Patient reply</strong><button class="p2-listen" type="button">🔊 Listen</button></div><p>“${escapeHTML(reply)}”</p></div>` : `<p class="patient-awaiting">The patient is waiting for your first clinical question.</p>`}
      </div>
    </article>`;
  }

  function renderPatient2Item() {
    renderPatient2Progress();
    if (!patient2IsUnlocked()) return;
    if (patient2State.completed || patient2State.index >= patient2Items.length) return renderPatient2Complete();

    const item = patient2Items[patient2State.index];
    const number = patient2State.index + 1;
    els.patient2Instruction.textContent = item.instruction;
    setPatient2Feedback();
    els.patient2Checkpoint.textContent = `${patient2State.index} / ${patient2Items.length}`;
    els.patient2Progress.style.width = `${(patient2State.index / patient2Items.length) * 100}%`;

    els.patient2Screen.innerHTML = `<div class="p2-shell">
      ${patient2VideoPanel(patient2State.lastReply || "")}
      <article class="p2-decision-card">
        <span class="p2-round-kicker">CALL CHECK ${number} OF ${patient2Items.length}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.instruction)}</p>
        <div class="p2-options" role="group" aria-label="Choose the safest consultation response">
          ${item.options.map((option, idx) => `<button class="p2-choice" type="button" data-p2-choice="${idx}"><span>${String.fromCharCode(65 + idx)}</span><b>${escapeHTML(option.text)}</b></button>`).join("")}
        </div>
        <div class="p2-safety-note"><strong>Video-consultation principle:</strong> use what the camera can show, but never pretend it replaces an examination you cannot perform remotely.</div>
      </article>
    </div>`;

    const replyButton = els.patient2Screen.querySelector(".p2-listen");
    if (replyButton && patient2State.lastReply) replyButton.addEventListener("click", () => speak(patient2State.lastReply, replyButton, 0.9));

    els.patient2Screen.querySelectorAll("[data-p2-choice]").forEach(button => {
      button.addEventListener("click", () => {
        const chosen = Number(button.dataset.p2Choice);
        const option = item.options[chosen];
        els.patient2Screen.querySelectorAll("[data-p2-choice]").forEach(btn => { btn.disabled = true; });
        if (option.correct) {
          button.classList.add("correct-choice");
          patient2State.lastReply = item.patientReply;
          savePatient2State();
          beep("ok");
          setPatient2Feedback(`<strong>✓ Good call.</strong> ${escapeHTML(item.feedback)}`, "correct");
          const videoMeta = els.patient2Screen.querySelector(".p2-video-meta");
          if (videoMeta) {
            const oldAwaiting = videoMeta.querySelector(".patient-awaiting");
            oldAwaiting?.remove();
            const existingReply = videoMeta.querySelector(".p2-reply");
            existingReply?.remove();
            videoMeta.insertAdjacentHTML("beforeend", `<div class="p2-reply"><div class="p2-reply-head"><strong>Patient reply</strong><button class="p2-listen" type="button">🔊 Listen</button></div><p>“${escapeHTML(item.patientReply)}”</p></div>`);
            const listen = videoMeta.querySelector(".p2-listen");
            listen?.addEventListener("click", () => speak(item.patientReply, listen, 0.9));
            if (audioPrefs.sound) window.setTimeout(() => speak(item.patientReply, listen, 0.9), 180);
          }
          advancePatient2Button(number === patient2Items.length ? "Complete Patient 02 →" : "Continue consultation →");
        } else {
          button.classList.add("wrong-choice");
          patient2State.mistakes += 1;
          savePatient2State();
          beep("error");
          setPatient2Feedback("<strong>Try again.</strong> Choose the option that is open, respectful and clinically safe without claiming more than video can establish.", "wrong");
          window.setTimeout(() => {
            els.patient2Screen.querySelectorAll("[data-p2-choice]").forEach(btn => { btn.disabled = false; btn.classList.remove("wrong-choice"); });
          }, 650);
        }
      });
    });
  }

  function advancePatient2Button(label) {
    const holder = document.createElement("div");
    holder.className = "mission-next-holder";
    holder.innerHTML = `<button class="tcr-primary" type="button">${escapeHTML(label)}</button>`;
    els.patient2Feedback.appendChild(holder);
    holder.querySelector("button").addEventListener("click", () => {
      patient2State.index += 1;
      patient2State.lastReply = "";
      if (patient2State.index >= patient2Items.length) patient2State.completed = true;
      savePatient2State();
      renderPatient2Item();
      els.patient2Screen.focus({preventScroll:true});
    });
  }

  function renderPatient2Complete() {
    patient2State.completed = true;
    patient2State.index = patient2Items.length;
    patient2State.lastReply = "";
    savePatient2State();
    els.patient2Instruction.textContent = "Patient 02 complete: you used the camera appropriately and recognised where remote assessment stops.";
    els.patient2Checkpoint.textContent = `${patient2Items.length} / ${patient2Items.length}`;
    els.patient2Progress.style.width = "100%";
    els.shiftStatus.textContent = "Patient 02 complete · Online vs face-to-face next";
    const score = Math.max(0, 100 - patient2State.mistakes * 7);
    const quality = patient2State.mistakes === 0 ? "Remote assessment beautifully controlled" : patient2State.mistakes <= 2 ? "Safe video assessment achieved" : "Safe video assessment achieved after review";
    els.patient2Screen.innerHTML = `<div class="mission-complete-card">
      <div class="mission-badge p2-badge" aria-hidden="true">📹</div>
      <p class="mission-step-label">PATIENT 02 COMPLETE</p>
      <h3>Camera Confidence badge unlocked</h3>
      <p>${escapeHTML(quality)}. You explored the mechanism, weight-bearing, pain and swelling; asked permission before using the camera; and stated clearly what could not be examined over video.</p>
      <div class="mission-complete-score"><strong>${score}%</strong><span>call score</span></div>
      <div class="p2-summary-grid">
        <div><span>HISTORY</span><strong>What happened?</strong><small>Mechanism · timing · weight-bearing · pain · swelling.</small></div>
        <div><span>CAMERA</span><strong>Could you show me…?</strong><small>Ask permission and give simple, respectful instructions.</small></div>
        <div><span>LIMIT</span><strong>I can't examine you fully…</strong><small>Observation by video is not the same as a hands-on examination.</small></div>
      </div>
      <div class="timeline-preview research-preview">
        <span>NEXT CONTROL-ROOM DECISION</span>
        <p><strong>Online or Face-to-Face?</strong></p>
        <small>Different patients will need different next steps. Decide what can continue remotely, what needs an in-person assessment and when the plan must change.</small>
      </div>
      <div class="mission-complete-actions"><button id="replayPatient2" class="tcr-secondary-button" type="button">Replay Patient 02</button><a class="tcr-secondary-link dark" href="#mission-map">Mission map ↓</a></div>
    </div>`;
    setPatient2Feedback("<strong>Next:</strong> Online or Face-to-Face? — decide when video is enough and when it is not.", "info");
    document.getElementById("replayPatient2")?.addEventListener("click", resetPatient2);
    renderPatient2Progress();
    unlockOnlineDecision();
  }

  function startPatient2() {
    if (!patient2IsUnlocked()) return;
    if (patient2State.completed) renderPatient2Complete();
    else renderPatient2Item();
    els.patient2Area.scrollIntoView({behavior:"smooth", block:"start"});
    els.patient2Screen.focus({preventScroll:true});
    if (audioPrefs.music) syncMusic();
  }

  function resetPatient2() {
    patient2State = {index:0, completed:false, mistakes:0, lastReply:""};
    savePatient2State();
    renderPatient2Progress();
    els.patient2Instruction.textContent = patient2IsUnlocked() ? "Patient 02 is connected. Explore the injury, use the camera appropriately and stay clear about the limits of video assessment." : "Complete the Timeline Check to take the next call.";
    els.patient2Screen.innerHTML = patient2IsUnlocked() ? `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">📹</div><h3>Incoming call · Patient 02</h3><p>Twisted ankle two days ago · swelling · pain · still able to walk.</p></div>` : `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🔒</div><h3>Patient 02 is waiting</h3><p>Finish the Timeline Check with Patient 01 first.</p></div>`;
    setPatient2Feedback();
  }


  function setOnlineDecisionFeedback(html = "", type = "") {
    if (!els.onlineDecisionFeedback) return;
    els.onlineDecisionFeedback.className = "mission-feedback" + (type ? ` ${type}` : "");
    els.onlineDecisionFeedback.innerHTML = html;
  }

  function onlineDecisionIsUnlocked() {
    return patient2State.completed || onlineDecisionState.completed;
  }

  function renderOnlineDecisionProgress() {
    if (!els.onlineDecisionArea) return;
    const unlocked = onlineDecisionIsUnlocked();
    const total = onlineDecisionCases.length;
    const done = onlineDecisionState.completed ? total : Math.min(onlineDecisionState.index, total);

    if (!unlocked) {
      els.onlineDecisionArea.classList.add("is-locked");
      els.onlineDecisionStart.disabled = true;
      els.onlineDecisionStart.textContent = "Decision desk locked";
      els.onlineDecisionCheckpoint.textContent = `0 / ${total}`;
      els.onlineDecisionProgress.style.width = "0%";
      if (els.onlineMap) {
        els.onlineMap.classList.remove("live", "done", "next-ready");
        els.onlineMap.querySelector("b").textContent = "LOCKED";
      }
      if (els.patient3Map) {
        els.patient3Map.classList.remove("live", "done", "next-ready");
        els.patient3Map.querySelector("b").textContent = "LOCKED";
      }
      return;
    }

    els.onlineDecisionArea.classList.remove("is-locked");
    els.onlineDecisionStart.disabled = false;
    els.onlineDecisionStart.textContent = onlineDecisionState.completed ? "View completed decision desk →" : onlineDecisionState.index > 0 ? "Continue decision desk →" : "Open decision desk →";
    els.onlineDecisionCheckpoint.textContent = `${done} / ${total}`;
    els.onlineDecisionProgress.style.width = `${(done / total) * 100}%`;

    if (els.onlineMap) {
      els.onlineMap.classList.remove("live", "done", "next-ready");
      els.onlineMap.classList.add(onlineDecisionState.completed ? "done" : "live");
      els.onlineMap.querySelector("b").textContent = onlineDecisionState.completed ? "DONE" : "LIVE";
    }
    if (els.patient3Map && !patient3State.completed && patient3State.index === 0) {
      els.patient3Map.classList.remove("live", "done", "next-ready");
      if (onlineDecisionState.completed) els.patient3Map.classList.add("next-ready");
      els.patient3Map.querySelector("b").textContent = onlineDecisionState.completed ? "NEXT" : "LOCKED";
    }

    if (onlineDecisionState.completed && els.patientMini3 && !patient3State.completed && patient3State.index === 0) {
      els.patientMini2?.classList.remove("p2-current");
      els.patientMini3.classList.add("next-patient");
      const two = els.patientMini2?.querySelector("small");
      const three = els.patientMini3.querySelector("small");
      if (two) two.textContent = "Consultation complete";
      if (three) three.textContent = "Next call";
    }
  }

  function unlockOnlineDecision() {
    renderOnlineDecisionProgress();
    if (!onlineDecisionIsUnlocked()) return;
    if (!onlineDecisionState.completed && onlineDecisionState.index === 0) {
      els.onlineDecisionInstruction.textContent = "Decision desk unlocked. Choose the safest next step for each fictional video-consultation case.";
      els.onlineDecisionScreen.innerHTML = `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🖥️</div><h3>Six cases are waiting</h3><p>Continue online, arrange face-to-face assessment, plan further tests / follow-up, or escalate for urgent assessment.</p></div>`;
    }
  }

  function renderOnlineDecisionCase() {
    renderOnlineDecisionProgress();
    if (!onlineDecisionIsUnlocked()) return;
    if (onlineDecisionState.completed || onlineDecisionState.index >= onlineDecisionCases.length) return renderOnlineDecisionComplete();

    const item = onlineDecisionCases[onlineDecisionState.index];
    const number = onlineDecisionState.index + 1;
    els.onlineDecisionInstruction.textContent = `Case ${number}: decide the safest next step for this training scenario.`;
    els.onlineDecisionCheckpoint.textContent = `${onlineDecisionState.index} / ${onlineDecisionCases.length}`;
    els.onlineDecisionProgress.style.width = `${(onlineDecisionState.index / onlineDecisionCases.length) * 100}%`;
    setOnlineDecisionFeedback();

    els.onlineDecisionScreen.innerHTML = `<div class="online-decision-shell">
      <article class="online-case-card">
        <div class="online-case-top"><span class="online-case-icon" aria-hidden="true">${item.icon}</span><div><span>${escapeHTML(item.label)}</span><h3>${escapeHTML(item.title)}</h3></div></div>
        <p>${escapeHTML(item.caseText)}</p>
        <div class="online-training-note"><strong>Training focus</strong><span>Suitability for video is a clinical decision. Do not confuse a useful video history with a complete physical assessment.</span></div>
      </article>
      <article class="online-choice-card">
        <span class="online-round-kicker">DECISION ${number} OF ${onlineDecisionCases.length}</span>
        <h3>What should happen next?</h3>
        <div class="online-choice-grid" role="group" aria-label="Choose the next step">
          ${onlineDecisionOptions.map(option => `<button class="online-choice" type="button" data-online-choice="${option.id}"><span aria-hidden="true">${option.icon}</span><b>${escapeHTML(option.label)}</b><small>${escapeHTML(option.sub)}</small></button>`).join("")}
        </div>
      </article>
    </div>`;

    els.onlineDecisionScreen.querySelectorAll("[data-online-choice]").forEach(button => {
      button.addEventListener("click", () => {
        const choice = button.dataset.onlineChoice;
        els.onlineDecisionScreen.querySelectorAll("[data-online-choice]").forEach(btn => { btn.disabled = true; });
        if (choice === item.correct) {
          button.classList.add("correct-choice");
          beep("ok");
          setOnlineDecisionFeedback(`<div class="online-feedback-inner"><div><strong>✓ Safe decision.</strong> ${escapeHTML(item.explanation)}</div><div class="useful-phrase"><span>USEFUL LANGUAGE</span><p>“${escapeHTML(item.phrase)}”</p><button class="online-phrase-listen" type="button">🔊 Listen</button></div></div>`, "correct");
          const listen = els.onlineDecisionFeedback.querySelector(".online-phrase-listen");
          listen?.addEventListener("click", () => speak(item.phrase, listen, 0.92));
          advanceOnlineDecisionButton(number === onlineDecisionCases.length ? "Complete decision desk →" : "Next case →");
        } else {
          button.classList.add("wrong-choice");
          onlineDecisionState.mistakes += 1;
          saveOnlineDecisionState();
          beep("error");
          setOnlineDecisionFeedback(`<strong>Review the modality decision.</strong> In this exercise, ask what video can establish, what requires hands-on assessment or tests, and whether the symptoms make routine remote management inappropriate.`, "wrong");
          window.setTimeout(() => {
            els.onlineDecisionScreen.querySelectorAll("[data-online-choice]").forEach(btn => { btn.disabled = false; btn.classList.remove("wrong-choice"); });
          }, 650);
        }
      });
    });
  }

  function advanceOnlineDecisionButton(label) {
    const holder = document.createElement("div");
    holder.className = "mission-next-holder";
    holder.innerHTML = `<button class="tcr-primary" type="button">${escapeHTML(label)}</button>`;
    els.onlineDecisionFeedback.appendChild(holder);
    holder.querySelector("button").addEventListener("click", () => {
      onlineDecisionState.index += 1;
      if (onlineDecisionState.index >= onlineDecisionCases.length) onlineDecisionState.completed = true;
      saveOnlineDecisionState();
      renderOnlineDecisionCase();
      els.onlineDecisionScreen.focus({preventScroll:true});
    });
  }

  function renderOnlineDecisionComplete() {
    onlineDecisionState.completed = true;
    onlineDecisionState.index = onlineDecisionCases.length;
    saveOnlineDecisionState();
    els.onlineDecisionInstruction.textContent = "Decision desk complete: you matched the consultation format to what could safely be assessed in each fictional case.";
    els.onlineDecisionCheckpoint.textContent = `${onlineDecisionCases.length} / ${onlineDecisionCases.length}`;
    els.onlineDecisionProgress.style.width = "100%";
    els.shiftStatus.textContent = "Decision desk complete · Patient 03 next";
    const score = Math.max(0, 100 - onlineDecisionState.mistakes * 7);
    const quality = onlineDecisionState.mistakes === 0 ? "Modality decisions perfectly controlled" : onlineDecisionState.mistakes <= 2 ? "Safe modality decisions achieved" : "Safe decisions achieved after review";

    els.onlineDecisionScreen.innerHTML = `<div class="mission-complete-card">
      <div class="mission-badge online-badge" aria-hidden="true">🛡️</div>
      <p class="mission-step-label">MISSION 5 COMPLETE</p>
      <h3>Safe Decision Maker badge unlocked</h3>
      <p>${escapeHTML(quality)}. You distinguished between a consultation that can continue remotely, one that needs hands-on assessment, one that needs further investigations and a situation that should not remain a routine video-only consultation.</p>
      <div class="mission-complete-score"><strong>${score}%</strong><span>decision score</span></div>
      <div class="online-summary-grid">
        <div><span>ONLINE</span><strong>Useful when suitable</strong><small>Video can support history, communication and appropriate follow-up.</small></div>
        <div><span>FACE-TO-FACE</span><strong>Know the limit</strong><small>If a physical examination matters, say so clearly.</small></div>
        <div><span>ESCALATE</span><strong>Change the pathway</strong><small>Further tests or urgent assessment may be the safer next step.</small></div>
      </div>
      <div class="timeline-preview patient3-preview">
        <span>NEXT CALL · PATIENT 03</span>
        <p><strong>Fatigue + unintentional weight loss + dizziness</strong></p>
        <small>Take a fuller history, explore the patient's concerns and decide how to explain the need for further assessment without overclaiming.</small>
      </div>
      <div class="mission-complete-actions"><button id="startPatient3FromDecision" class="tcr-primary" type="button">Take Patient 03 call →</button><button id="replayOnlineDecision" class="tcr-secondary-button" type="button">Replay decision desk</button><a class="tcr-secondary-link dark" href="#mission-map">Mission map ↓</a></div>
    </div>`;
    setOnlineDecisionFeedback("<strong>Next:</strong> Patient 03 — fatigue, weight loss and dizziness.", "info");
    document.getElementById("replayOnlineDecision")?.addEventListener("click", resetOnlineDecision);
    document.getElementById("startPatient3FromDecision")?.addEventListener("click", startPatient3);
    renderOnlineDecisionProgress();
    renderPatient3Progress();
  }

  function startOnlineDecision() {
    if (!onlineDecisionIsUnlocked()) return;
    if (onlineDecisionState.completed) renderOnlineDecisionComplete();
    else renderOnlineDecisionCase();
    els.onlineDecisionArea.scrollIntoView({behavior:"smooth", block:"start"});
    els.onlineDecisionScreen.focus({preventScroll:true});
    if (audioPrefs.music) syncMusic();
  }

  function resetOnlineDecision() {
    onlineDecisionState = {index:0, completed:false, mistakes:0};
    saveOnlineDecisionState();
    renderOnlineDecisionProgress();
    els.onlineDecisionInstruction.textContent = onlineDecisionIsUnlocked() ? "Decision desk unlocked. Choose the safest next step for each fictional video-consultation case." : "Complete Patient 02 to unlock the decision desk.";
    els.onlineDecisionScreen.innerHTML = onlineDecisionIsUnlocked() ? `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🖥️</div><h3>Six cases are waiting</h3><p>Continue online, arrange face-to-face assessment, plan further tests / follow-up, or escalate for urgent assessment.</p></div>` : `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🔒</div><h3>Decision desk locked</h3><p>Finish Patient 02 first.</p></div>`;
    setOnlineDecisionFeedback();
  }


  function setPatient3Feedback(html = "", type = "") {
    if (!els.patient3Feedback) return;
    els.patient3Feedback.className = "mission-feedback" + (type ? ` ${type}` : "");
    els.patient3Feedback.innerHTML = html;
  }

  function patient3IsUnlocked() {
    return onlineDecisionState.completed || patient3State.completed;
  }

  function renderPatient3Progress() {
    if (!els.patient3Area) return;
    const unlocked = patient3IsUnlocked();
    const total = patient3Items.length;
    const done = patient3State.completed ? total : Math.min(patient3State.index, total);

    if (!unlocked) {
      els.patient3Area.classList.add("is-locked");
      els.patient3Start.disabled = true;
      els.patient3Start.textContent = "Patient 03 locked";
      els.patient3Checkpoint.textContent = `0 / ${total}`;
      els.patient3Progress.style.width = "0%";
      if (els.patient3Map) {
        els.patient3Map.classList.remove("live", "done", "next-ready", "patient3-ready");
        els.patient3Map.querySelector("b").textContent = "LOCKED";
      }
      if (els.patient4Map) {
        els.patient4Map.classList.remove("live", "done", "next-ready");
        els.patient4Map.querySelector("b").textContent = "LOCKED";
      }
      return;
    }

    els.patient3Area.classList.remove("is-locked");
    els.patient3Start.disabled = false;
    els.patient3Start.textContent = patient3State.completed ? "View completed Patient 03 →" : patient3State.index > 0 ? "Continue Patient 03 →" : "Answer Patient 03 →";
    els.patient3Checkpoint.textContent = `${done} / ${total}`;
    els.patient3Progress.style.width = `${(done / total) * 100}%`;

    if (els.patient3Map) {
      els.patient3Map.classList.remove("live", "done", "next-ready", "patient3-ready");
      els.patient3Map.classList.add(patient3State.completed ? "done" : "patient3-ready");
      els.patient3Map.querySelector("b").textContent = patient3State.completed ? "DONE" : "LIVE";
    }
    if (els.patient4Map) {
      els.patient4Map.classList.remove("live", "done", "next-ready");
      if (patient3State.completed) els.patient4Map.classList.add("next-ready");
      els.patient4Map.querySelector("b").textContent = patient3State.completed ? "NEXT" : "LOCKED";
    }

    if (els.patientMini3) {
      els.patientMini3.classList.remove("next-patient");
      els.patientMini3.classList.add(patient3State.completed ? "consult-complete" : "p3-current");
      const three = els.patientMini3.querySelector("small");
      if (three) three.textContent = patient3State.completed ? "Consultation complete" : "Calling now";
    }
    if (els.patientMini4) {
      els.patientMini4.classList.toggle("next-patient", patient3State.completed);
      const four = els.patientMini4.querySelector("small");
      if (four) four.textContent = patient3State.completed ? "Next call" : "Waiting";
    }
  }

  function unlockPatient3() {
    renderPatient3Progress();
    if (!patient3IsUnlocked()) return;
    if (!patient3State.completed && patient3State.index === 0) {
      els.patient3Instruction.textContent = "Patient 03 is connected. Take a fuller history, explore concern and explain the need for further assessment without jumping to a diagnosis.";
      els.patient3Screen.innerHTML = `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🧪</div><h3>Incoming call · Patient 03</h3><p>Unusual fatigue for several weeks · unintentional weight loss · occasional dizziness.</p></div>`;
    }
  }

  function patient3VideoPanel(reply = "") {
    return `<article class="p3-video-card">
      <div class="p3-image-wrap">
        <span class="p3-live">● LIVE · PATIENT 03</span>
        <img src="assets/fgsm3/day1/images/fgsm3-day1-patient03-fatigue.webp" alt="Patient 03 at home during a video consultation, appearing tired and concerned.">
      </div>
      <div class="p3-video-meta">
        <span>FICTIONAL CASE · VIDEO CONSULTATION</span>
        <h3>Patient 03 · fatigue</h3>
        <small>Several weeks · unintentional weight loss · occasional dizziness</small>
        ${reply ? `<div class="p3-reply"><div class="p3-reply-head"><strong>Patient reply</strong><button class="p3-listen" type="button">🔊 Listen</button></div><p>“${escapeHTML(reply)}”</p></div>` : `<p class="patient-awaiting">The patient is waiting for your first question.</p>`}
      </div>
    </article>`;
  }

  function renderPatient3Item() {
    renderPatient3Progress();
    if (!patient3IsUnlocked()) return;
    if (patient3State.completed || patient3State.index >= patient3Items.length) return renderPatient3Complete();

    const item = patient3Items[patient3State.index];
    const number = patient3State.index + 1;
    els.patient3Instruction.textContent = item.instruction;
    setPatient3Feedback();
    els.patient3Checkpoint.textContent = `${patient3State.index} / ${patient3Items.length}`;
    els.patient3Progress.style.width = `${(patient3State.index / patient3Items.length) * 100}%`;

    els.patient3Screen.innerHTML = `<div class="p3-shell">
      ${patient3VideoPanel(patient3State.lastReply || "")}
      <article class="p3-decision-card">
        <span class="p3-round-kicker">HISTORY CHECK ${number} OF ${patient3Items.length}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.instruction)}</p>
        <div class="p3-options" role="group" aria-label="Choose the best consultation response">
          ${item.options.map((option, idx) => `<button class="p3-choice" type="button" data-p3-choice="${idx}"><span>${String.fromCharCode(65 + idx)}</span><b>${escapeHTML(option.text)}</b></button>`).join("")}
        </div>
        <div class="p3-clinical-note"><strong>History-taking principle:</strong> ask, listen and summarise before you interpret. Concern deserves an answer, but uncertainty should be explained honestly.</div>
      </article>
    </div>`;

    const replyButton = els.patient3Screen.querySelector(".p3-listen");
    if (replyButton && patient3State.lastReply) replyButton.addEventListener("click", () => speak(patient3State.lastReply, replyButton, 0.9));

    els.patient3Screen.querySelectorAll("[data-p3-choice]").forEach(button => {
      button.addEventListener("click", () => {
        const chosen = Number(button.dataset.p3Choice);
        const option = item.options[chosen];
        els.patient3Screen.querySelectorAll("[data-p3-choice]").forEach(btn => { btn.disabled = true; });
        if (option.correct) {
          button.classList.add("correct-choice");
          patient3State.lastReply = item.patientReply;
          savePatient3State();
          beep("ok");
          setPatient3Feedback(`<strong>✓ Good history-taking.</strong> ${escapeHTML(item.feedback)}`, "correct");
          const videoMeta = els.patient3Screen.querySelector(".p3-video-meta");
          if (videoMeta) {
            videoMeta.querySelector(".patient-awaiting")?.remove();
            videoMeta.querySelector(".p3-reply")?.remove();
            videoMeta.insertAdjacentHTML("beforeend", `<div class="p3-reply"><div class="p3-reply-head"><strong>Patient reply</strong><button class="p3-listen" type="button">🔊 Listen</button></div><p>“${escapeHTML(item.patientReply)}”</p></div>`);
            const listen = videoMeta.querySelector(".p3-listen");
            listen?.addEventListener("click", () => speak(item.patientReply, listen, 0.9));
            if (audioPrefs.sound) window.setTimeout(() => speak(item.patientReply, listen, 0.9), 180);
          }
          advancePatient3Button(number === patient3Items.length ? "Complete Patient 03 →" : "Continue consultation →");
        } else {
          button.classList.add("wrong-choice");
          patient3State.mistakes += 1;
          savePatient3State();
          beep("error");
          setPatient3Feedback("<strong>Try again.</strong> Choose the option that gathers information, acknowledges concern and avoids premature reassurance or diagnosis.", "wrong");
          window.setTimeout(() => {
            els.patient3Screen.querySelectorAll("[data-p3-choice]").forEach(btn => { btn.disabled = false; btn.classList.remove("wrong-choice"); });
          }, 650);
        }
      });
    });
  }

  function advancePatient3Button(label) {
    const holder = document.createElement("div");
    holder.className = "mission-next-holder";
    holder.innerHTML = `<button class="tcr-primary" type="button">${escapeHTML(label)}</button>`;
    els.patient3Feedback.appendChild(holder);
    holder.querySelector("button").addEventListener("click", () => {
      patient3State.index += 1;
      patient3State.lastReply = "";
      if (patient3State.index >= patient3Items.length) patient3State.completed = true;
      savePatient3State();
      renderPatient3Item();
      els.patient3Screen.focus({preventScroll:true});
    });
  }

  function renderPatient3Complete() {
    patient3State.completed = true;
    patient3State.index = patient3Items.length;
    savePatient3State();
    els.patient3Instruction.textContent = "Patient 03 complete: you took a fuller history, explored the patient's concern and explained the need for further assessment without overclaiming.";
    els.patient3Checkpoint.textContent = `${patient3Items.length} / ${patient3Items.length}`;
    els.patient3Progress.style.width = "100%";
    els.shiftStatus.textContent = "Patient 03 complete · Patient 04 next";
    const score = Math.max(0, 100 - patient3State.mistakes * 7);
    const quality = patient3State.mistakes === 0 ? "Excellent listening and uncertainty management" : patient3State.mistakes <= 2 ? "Clear, safe history-taking achieved" : "Safe history-taking achieved after review";

    els.patient3Screen.innerHTML = `<div class="mission-complete-card">
      <div class="mission-badge p3-badge" aria-hidden="true">👂</div>
      <p class="mission-step-label">PATIENT 03 COMPLETE</p>
      <h3>Clinical Listener badge unlocked</h3>
      <p>${escapeHTML(quality)}. You explored duration, weight and appetite changes, associated symptoms, relevant background, day-to-day impact and the patient's concern before explaining the next step.</p>
      <div class="mission-complete-score"><strong>${score}%</strong><span>call score</span></div>
      <div class="p3-summary-grid">
        <div><span>LISTEN</span><strong>Start broad</strong><small>Let the patient describe the problem before narrowing the history.</small></div>
        <div><span>UNDERSTAND</span><strong>Explore concern</strong><small>Impact and worries are part of the clinical conversation.</small></div>
        <div><span>PLAN</span><strong>Explain uncertainty</strong><small>Further assessment and tests can be planned without pretending the video call gives a diagnosis.</small></div>
      </div>
      <div class="timeline-preview patient4-preview"><span>NEXT CALL · PATIENT 04</span><p><strong>New medication + nausea / upset stomach</strong></p><small>Clarify the medicine, dose and timing; explore side effects and warning signs; then discuss a safe review plan.</small></div>
      <div class="mission-complete-actions"><button id="startPatient4FromP3" class="tcr-primary" type="button">Answer Patient 04 →</button><button id="replayPatient3" class="tcr-secondary-button" type="button">Replay Patient 03</button><a class="tcr-secondary-link dark" href="#mission-map">Mission map ↓</a></div>
    </div>`;
    setPatient3Feedback("<strong>Next:</strong> Patient 04 — new medication with nausea and an upset stomach.", "info");
    document.getElementById("replayPatient3")?.addEventListener("click", resetPatient3);
    document.getElementById("startPatient4FromP3")?.addEventListener("click", startPatient4);
    renderPatient3Progress();
    unlockPatient4();
  }

  function startPatient3() {
    if (!patient3IsUnlocked()) return;
    if (patient3State.completed) renderPatient3Complete();
    else renderPatient3Item();
    els.patient3Area.scrollIntoView({behavior:"smooth", block:"start"});
    els.patient3Screen.focus({preventScroll:true});
    if (audioPrefs.music) syncMusic();
  }

  function resetPatient3() {
    patient3State = {index:0, completed:false, mistakes:0, lastReply:""};
    savePatient3State();
    renderPatient3Progress();
    els.patient3Instruction.textContent = patient3IsUnlocked() ? "Patient 03 is connected. Take a fuller history, explore concern and explain the need for further assessment without jumping to a diagnosis." : "Complete the Online or Face-to-Face decision desk to take Patient 03's call.";
    els.patient3Screen.innerHTML = patient3IsUnlocked() ? `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🧪</div><h3>Incoming call · Patient 03</h3><p>Unusual fatigue for several weeks · unintentional weight loss · occasional dizziness.</p></div>` : `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🔒</div><h3>Patient 03 is waiting</h3><p>Finish the decision desk first.</p></div>`;
    setPatient3Feedback();
  }


  function setPatient4Feedback(html = "", type = "") {
    if (!els.patient4Feedback) return;
    els.patient4Feedback.className = "mission-feedback" + (type ? ` ${type}` : "");
    els.patient4Feedback.innerHTML = html;
  }

  function patient4IsUnlocked() {
    return patient3State.completed || patient4State.completed;
  }

  function renderPatient4Progress() {
    if (!els.patient4Area) return;
    const unlocked = patient4IsUnlocked();
    const total = patient4Items.length;
    const done = patient4State.completed ? total : Math.min(patient4State.index, total);

    if (!unlocked) {
      els.patient4Area.classList.add("is-locked");
      els.patient4Start.disabled = true;
      els.patient4Start.textContent = "Patient 04 locked";
      els.patient4Checkpoint.textContent = `0 / ${total}`;
      els.patient4Progress.style.width = "0%";
      if (els.patient4Map) {
        els.patient4Map.classList.remove("live", "done", "next-ready", "patient4-ready");
        els.patient4Map.querySelector("b").textContent = "LOCKED";
      }
      if (els.researchMap) {
        els.researchMap.classList.remove("live", "done", "next-ready", "research-ready");
        els.researchMap.querySelector("b").textContent = "LOCKED";
      }
      return;
    }

    els.patient4Area.classList.remove("is-locked");
    els.patient4Start.disabled = false;
    els.patient4Start.textContent = patient4State.completed ? "View completed Patient 04 →" : patient4State.index > 0 ? "Continue Patient 04 →" : "Answer Patient 04 →";
    els.patient4Checkpoint.textContent = `${done} / ${total}`;
    els.patient4Progress.style.width = `${(done / total) * 100}%`;

    if (els.patient4Map) {
      els.patient4Map.classList.remove("live", "done", "next-ready", "patient4-ready");
      els.patient4Map.classList.add(patient4State.completed ? "done" : "patient4-ready");
      els.patient4Map.querySelector("b").textContent = patient4State.completed ? "DONE" : "LIVE";
    }
    if (els.researchMap) {
      els.researchMap.classList.remove("live", "done", "next-ready", "research-ready");
      if (patient4State.completed) els.researchMap.classList.add("research-ready");
      els.researchMap.querySelector("b").textContent = patient4State.completed ? "NEXT" : "LOCKED";
    }

    if (els.patientMini3 && patient3State.completed) {
      els.patientMini3.classList.remove("p3-current", "next-patient");
      els.patientMini3.classList.add("consult-complete");
      const three = els.patientMini3.querySelector("small");
      if (three) three.textContent = "Consultation complete";
    }
    if (els.patientMini4) {
      els.patientMini4.classList.remove("next-patient", "p4-current", "consult-complete");
      els.patientMini4.classList.add(patient4State.completed ? "consult-complete" : "p4-current");
      const four = els.patientMini4.querySelector("small");
      if (four) four.textContent = patient4State.completed ? "Consultation complete" : "Calling now";
    }
  }

  function unlockPatient4() {
    renderPatient4Progress();
    if (!patient4IsUnlocked()) return;
    if (!patient4State.completed && patient4State.index === 0) {
      els.patient4Instruction.textContent = "Patient 04 is connected. Clarify the medication and symptoms, screen for warning signs, address the wish to stop treatment and agree a safe review plan.";
      els.patient4Screen.innerHTML = `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">💊</div><h3>Incoming call · Patient 04</h3><p>New medication five days ago · nausea · upset stomach · considering stopping it.</p></div>`;
    }
  }

  function patient4VideoPanel(reply = "") {
    return `<article class="p4-video-card">
      <div class="p4-image-wrap">
        <span class="p4-live">● LIVE · PATIENT 04</span>
        <img src="assets/fgsm3/day1/images/fgsm3-day1-patient04-medication.webp" alt="Patient 04 at home during a video consultation, resting a hand on her abdomen and looking concerned.">
      </div>
      <div class="p4-video-meta">
        <span>FICTIONAL CASE · VIDEO CONSULTATION</span>
        <h3>Patient 04 · medication review</h3>
        <small>New medication · nausea · upset stomach · no diagnosis assumed</small>
        ${reply ? `<div class="p4-reply"><div class="p4-reply-head"><strong>Patient reply</strong><button class="p4-listen" type="button">🔊 Listen</button></div><p>“${escapeHTML(reply)}”</p></div>` : `<p class="patient-awaiting">The patient is waiting for your first question.</p>`}
      </div>
    </article>`;
  }

  function renderPatient4Item() {
    renderPatient4Progress();
    if (!patient4IsUnlocked()) return;
    if (patient4State.completed || patient4State.index >= patient4Items.length) return renderPatient4Complete();

    const item = patient4Items[patient4State.index];
    const number = patient4State.index + 1;
    els.patient4Instruction.textContent = item.instruction;
    setPatient4Feedback();
    els.patient4Checkpoint.textContent = `${patient4State.index} / ${patient4Items.length}`;
    els.patient4Progress.style.width = `${(patient4State.index / patient4Items.length) * 100}%`;

    els.patient4Screen.innerHTML = `<div class="p4-shell">
      ${patient4VideoPanel(patient4State.lastReply || "")}
      <article class="p4-decision-card">
        <span class="p4-round-kicker">MEDICATION CHECK ${number} OF ${patient4Items.length}</span>
        <h3>${escapeHTML(item.title)}</h3>
        <p>${escapeHTML(item.instruction)}</p>
        <div class="p4-options" role="group" aria-label="Choose the best medication-review response">
          ${item.options.map((option, idx) => `<button class="p4-choice" type="button" data-p4-choice="${idx}"><span>${String.fromCharCode(65 + idx)}</span><b>${escapeHTML(option.text)}</b></button>`).join("")}
        </div>
        <div class="p4-clinical-note"><strong>Medication-safety principle:</strong> establish what was taken, when and what happened before advising. Do not turn a temporal association into a certain diagnosis.</div>
      </article>
    </div>`;

    const replyButton = els.patient4Screen.querySelector(".p4-listen");
    if (replyButton && patient4State.lastReply) replyButton.addEventListener("click", () => speak(patient4State.lastReply, replyButton, 0.9));

    els.patient4Screen.querySelectorAll("[data-p4-choice]").forEach(button => {
      button.addEventListener("click", () => {
        const chosen = Number(button.dataset.p4Choice);
        const option = item.options[chosen];
        els.patient4Screen.querySelectorAll("[data-p4-choice]").forEach(btn => { btn.disabled = true; });
        if (option.correct) {
          button.classList.add("correct-choice");
          patient4State.lastReply = item.patientReply;
          savePatient4State();
          beep("ok");
          setPatient4Feedback(`<strong>✓ Safe medication communication.</strong> ${escapeHTML(item.feedback)}`, "correct");
          const videoMeta = els.patient4Screen.querySelector(".p4-video-meta");
          if (videoMeta) {
            videoMeta.querySelector(".patient-awaiting")?.remove();
            videoMeta.querySelector(".p4-reply")?.remove();
            videoMeta.insertAdjacentHTML("beforeend", `<div class="p4-reply"><div class="p4-reply-head"><strong>Patient reply</strong><button class="p4-listen" type="button">🔊 Listen</button></div><p>“${escapeHTML(item.patientReply)}”</p></div>`);
            const listen = videoMeta.querySelector(".p4-listen");
            listen?.addEventListener("click", () => speak(item.patientReply, listen, 0.9));
            if (audioPrefs.sound) window.setTimeout(() => speak(item.patientReply, listen, 0.9), 180);
          }
          advancePatient4Button(number === patient4Items.length ? "Complete Patient 04 →" : "Continue medication review →");
        } else {
          button.classList.add("wrong-choice");
          patient4State.mistakes += 1;
          savePatient4State();
          beep("error");
          setPatient4Feedback("<strong>Try again.</strong> Clarify the medicine and symptom pattern, avoid certainty from timing alone, and do not give blanket stop/continue advice about an unspecified treatment.", "wrong");
          window.setTimeout(() => {
            els.patient4Screen.querySelectorAll("[data-p4-choice]").forEach(btn => { btn.disabled = false; btn.classList.remove("wrong-choice"); });
          }, 650);
        }
      });
    });
  }

  function advancePatient4Button(label) {
    const holder = document.createElement("div");
    holder.className = "mission-next-holder";
    holder.innerHTML = `<button class="tcr-primary" type="button">${escapeHTML(label)}</button>`;
    els.patient4Feedback.appendChild(holder);
    holder.querySelector("button").addEventListener("click", () => {
      patient4State.index += 1;
      patient4State.lastReply = "";
      if (patient4State.index >= patient4Items.length) patient4State.completed = true;
      savePatient4State();
      renderPatient4Item();
      els.patient4Screen.focus({preventScroll:true});
    });
  }

  function renderPatient4Complete() {
    patient4State.completed = true;
    patient4State.index = patient4Items.length;
    savePatient4State();
    els.patient4Instruction.textContent = "Patient 04 complete: you clarified the medicine and timing, screened for warning signs, handled uncertainty and agreed a safe medication-review plan.";
    els.patient4Checkpoint.textContent = `${patient4Items.length} / ${patient4Items.length}`;
    els.patient4Progress.style.width = "100%";
    els.shiftStatus.textContent = "Patient 04 complete · Research Comms Terminal next";
    const score = Math.max(0, 100 - patient4State.mistakes * 7);
    const quality = patient4State.mistakes === 0 ? "Excellent medication-safety communication" : patient4State.mistakes <= 2 ? "Safe medication review achieved" : "Safe medication review achieved after revision";

    els.patient4Screen.innerHTML = `<div class="mission-complete-card">
      <div class="mission-badge p4-badge" aria-hidden="true">💊</div>
      <p class="mission-step-label">PATIENT 04 COMPLETE</p>
      <h3>Medication Safety badge unlocked</h3>
      <p>${escapeHTML(quality)}. You clarified what changed, checked dose and timing, screened for concerning symptoms, avoided guessing about causation and gave the patient a clear review and safety-netting plan.</p>
      <div class="mission-complete-score"><strong>${score}%</strong><span>call score</span></div>
      <div class="p4-summary-grid">
        <div><span>CLARIFY</span><strong>Medicine + timing</strong><small>Know what changed before interpreting what followed.</small></div>
        <div><span>CAUTION</span><strong>Possible ≠ certain</strong><small>Temporal association can support a question, not prove a side effect.</small></div>
        <div><span>PLAN</span><strong>Review + safety-net</strong><small>Give a specific next step and clear triggers for more urgent help.</small></div>
      </div>
      <div class="timeline-preview research-preview"><span>NEXT MODULE · RESEARCH COMMS TERMINAL</span><p><strong>Past passive · research verbs · comparisons</strong></p><small>Move from patient communication to the language needed for the scientific article presentation.</small></div>
      <div class="mission-complete-actions"><button id="replayPatient4" class="tcr-secondary-button" type="button">Replay Patient 04</button><a class="tcr-secondary-link dark" href="#mission-map">Mission map ↓</a></div>
    </div>`;
    setPatient4Feedback("<strong>Next:</strong> Research Comms Terminal — past passive, research verbs and comparison language from the scientific article presentation.", "info");
    document.getElementById("replayPatient4")?.addEventListener("click", resetPatient4);
    renderPatient4Progress();
  }

  function startPatient4() {
    if (!patient4IsUnlocked()) return;
    if (patient4State.completed) renderPatient4Complete();
    else renderPatient4Item();
    els.patient4Area.scrollIntoView({behavior:"smooth", block:"start"});
    els.patient4Screen.focus({preventScroll:true});
    if (audioPrefs.music) syncMusic();
  }

  function resetPatient4() {
    patient4State = {index:0, completed:false, mistakes:0, lastReply:""};
    savePatient4State();
    renderPatient4Progress();
    els.patient4Instruction.textContent = patient4IsUnlocked() ? "Patient 04 is connected. Clarify the medication and symptoms, screen for warning signs, address the wish to stop treatment and agree a safe review plan." : "Complete Patient 03 to take Patient 04's call.";
    els.patient4Screen.innerHTML = patient4IsUnlocked() ? `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">💊</div><h3>Incoming call · Patient 04</h3><p>New medication five days ago · nausea · upset stomach · considering stopping it.</p></div>` : `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🔒</div><h3>Patient 04 is waiting</h3><p>Finish Patient 03 first.</p></div>`;
    setPatient4Feedback();
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
    audioLabState = {index: 0, completed: false, mistakes: 0, bonusDone: false};
    timelineState = {index: 0, completed: false, mistakes: 0};
    patient2State = {index: 0, completed: false, mistakes: 0, lastReply: ""};
    onlineDecisionState = {index: 0, completed: false, mistakes: 0};
    patient3State = {index: 0, completed: false, mistakes: 0, lastReply: ""};
    patient4State = {index: 0, completed: false, mistakes: 0, lastReply: ""};
    saveState();
    saveClinicalState();
    saveAudioLabState();
    saveTimelineState();
    savePatient2State();
    saveOnlineDecisionState();
    savePatient3State();
    savePatient4State();
    renderProgress();
    renderClinicalProgress();
    els.instruction.innerHTML = "Press <strong>Start Mission 1</strong> when you are ready.";
    els.screen.innerHTML = `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">📞</div><h3>Incoming video consultation</h3><p>Patient 01 is waiting. Prepare your station before connecting.</p></div>`;
    els.m2Instruction.textContent = "Complete Mission 1 to unlock the clinical history.";
    els.m2Screen.innerHTML = `<div class="mission-waiting"><div class="mission-waiting-icon" aria-hidden="true">🔒</div><h3>Clinical history locked</h3><p>Open the consultation safely first. Mission 2 will unlock automatically when Mission 1 is complete.</p></div>`;
    resetAudioLab();
    resetTimeline();
    resetPatient2();
    resetOnlineDecision();
    resetPatient3();
    resetPatient4();
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
  els.audioLabStart.addEventListener("click", startAudioLab);
  els.timelineStart.addEventListener("click", startTimeline);
  els.patient2Start.addEventListener("click", startPatient2);
  els.onlineDecisionStart?.addEventListener("click", startOnlineDecision);
  els.patient3Start?.addEventListener("click", startPatient3);
  els.patient4Start?.addEventListener("click", startPatient4);

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
  renderAudioLabProgress();
  renderTimelineProgress();
  renderPatient2Progress();
  renderOnlineDecisionProgress();
  renderPatient3Progress();
  renderPatient4Progress();
  if (state.completed) {
    els.shiftStatus.textContent = patient4State.completed ? "Patient 04 complete · Research Comms Terminal next" : patient3State.completed ? "Patient 03 complete · Patient 04 unlocked" : onlineDecisionState.completed ? "Decision desk complete · Patient 03 unlocked" : patient2State.completed ? "Patient 02 complete · Online vs face-to-face unlocked" : timelineState.completed ? "Timeline Check complete · Patient 02 unlocked" : audioLabState.completed ? "Missions 1–2 + Audio Lab complete · Timeline unlocked" : clinicalState.completed ? "Missions 1–2 complete · Audio Lab unlocked" : "Mission 1 complete · Mission 2 unlocked";
    els.start.textContent = "View completed Mission 1 →";
    unlockClinicalMission();
    if (clinicalState.completed) unlockAudioLab();
    if (audioLabState.completed || timelineState.completed) unlockTimeline();
    if (timelineState.completed || patient2State.completed) unlockPatient2();
    if (patient2State.completed || onlineDecisionState.completed) unlockOnlineDecision();
    if (onlineDecisionState.completed || patient3State.completed) unlockPatient3();
    if (patient3State.completed || patient4State.completed) unlockPatient4();
  }
})();
