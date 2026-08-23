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

  const mission3Activities = {
    roads: {
      title: "Road Access Alert",
      intro: "Use the source carefully. Identify what is actually reported about access, and reject explanations that are not given.",
      items: [
        {q:"Why are some people in the south described as impossible to reach?", a:"Continuous strikes make the area too dangerous to access", wrong:["The people have refused all assistance","There are no roads anywhere in the south"], model:"Some people cannot be reached because continuous strikes make access too dangerous."},
        {q:"Which statement stays closest to the source?", a:"Access is unsafe in some areas, so teams cannot simply reach everyone", wrong:["All humanitarian access in Lebanon has stopped","Every road to the south is physically destroyed"], model:"Access is unsafe in some areas, so teams cannot simply reach everyone."},
        {q:"A field briefing says, ‘We will reach every displaced person today.’ What is the problem?", a:"It promises something the source shows may be impossible because some areas are too dangerous to reach", wrong:["It is too cautious","It gives too much detail about water and food"], model:"We should not promise access where the security situation may prevent it."},
        {q:"What does the report about a refugee camp add to the access picture?", a:"A place meant to offer safety may still be affected by violence, so location alone does not guarantee safe access", wrong:["Every refugee camp has received an evacuation order","Refugee camps are always outside conflict areas"], model:"A place intended as shelter is not automatically safe from the effects of conflict."},
        {q:"Which sentence reports an access limitation without inventing a solution?", a:"Some people remain unreachable because the route is currently too dangerous", wrong:["The team can definitely reopen the route within an hour","No one in the south can ever be reached again"], model:"Some people remain unreachable because the route is currently too dangerous."}
      ]
    },
    vulnerable: {
      title: "Who Gets Left Behind?",
      intro: "The source names groups for whom evacuation may be especially difficult. Keep the wording inclusive and source-based.",
      items: [
        {q:"Which group list matches the interview summary?", a:"Older people, pregnant women, disabled people and people whose health condition limits movement", wrong:["Only children and international staff","Only people with visible injuries"], model:"Evacuation may be especially difficult for older people, pregnant women, disabled people and people whose health limits movement."},
        {q:"Why can fleeing be especially difficult for these groups?", a:"They may not be able to move quickly or independently and may need assistance", wrong:["They are not allowed to use shelters","They always refuse evacuation orders"], model:"Some people cannot move quickly or independently and may need help to evacuate."},
        {q:"Which briefing sentence avoids stereotyping?", a:"Some people may need additional assistance because mobility, pregnancy, disability or illness can make evacuation harder", wrong:["Older and disabled people are always unable to evacuate","Pregnant women cannot travel in emergencies"], model:"Some people may need additional assistance because evacuation is harder for them."},
        {q:"What is the practical communication lesson?", a:"Do not describe evacuation as equally easy for everyone", wrong:["Assume anyone left behind chose to stay","Focus only on people who can reach the clinic independently"], model:"Evacuation planning must recognise that people do not all have the same ability to move."}
      ]
    },
    supplies: {
      title: "Supply Route",
      intro: "The Day 3 materials describe pressure on shelter, food, water and medical care. Choose responses that acknowledge limited capacity and uncertain access.",
      items: [
        {q:"A shelter is already overcrowded. Which statement fits the source best?", a:"Additional arrivals may increase pressure on shelter, sanitation and medical needs", wrong:["The shelter can absorb unlimited arrivals","Only hospital capacity matters in this situation"], model:"If more people arrive, pressure on shelter, sanitation and medical care may increase."},
        {q:"Food, water and medical care are described as scarce. What should a field update say?", a:"Basic commodities and healthcare capacity are under pressure", wrong:["Every supply has completely run out","Only medicines matter now"], model:"Basic commodities and healthcare capacity are under pressure."},
        {q:"Supplies are delayed and access is becoming harder. Which contingency statement is appropriately cautious?", a:"If supplies are delayed, the team will need to adapt the plan and prioritise available resources", wrong:["If supplies are delayed, the team will definitely have everything it needs","Delayed supplies mean the mission must automatically end"], model:"If supplies are delayed, the team will need to adapt the plan and prioritise available resources."},
        {q:"What does ‘no system can cope with such a big amount of displaced people’ mean in the worksheet context?", a:"The scale of displacement can exceed available shelter, food, water and care capacity", wrong:["Humanitarian organisations should stop responding","The entire national health system has permanently collapsed"], model:"The scale of displacement can exceed the available capacity for shelter, food, water and care."}
      ]
    },
    evenif: {
      title: "Even If…",
      intro: "Use zero conditional for general relationships, first conditional for realistic future consequences, and even if to express a limit that may remain despite action.",
      items: [
        {q:"Choose the sentence that matches the worksheet model about access.", a:"Even if aid arrives, some people in the south may not be reached.", wrong:["Even if aid will arrive, some people may not be reached.","Even if aid arrives, everyone will definitely be reached."], model:"Even if aid arrives, some people in the south may not be reached."},
        {q:"Choose the correct first conditional for a full shelter.", a:"If a shelter is full, people will have to find another one.", wrong:["If a shelter will be full, people have to find another one.","If a shelter is full, people will had to find another one."], model:"If a shelter is full, people will have to find another one."},
        {q:"Which sentence expresses a general safety relationship?", a:"If medical teams are targeted, they cannot work safely.", wrong:["If medical teams will be targeted, they cannot work safely.","If medical teams are targeted, they cannot works safely."], model:"If medical teams are targeted, they cannot work safely."},
        {q:"Choose the sentence that communicates a limit without giving up on the response.", a:"Even if conditions deteriorate, the team will continue to reassess what can be done safely.", wrong:["Even if conditions deteriorate, the team will definitely reach everyone.","Even if conditions will deteriorate, the team continues all activities unchanged."], model:"Even if conditions deteriorate, the team will continue to reassess what can be done safely."},
        {q:"Which sentence uses the first conditional correctly for access?", a:"If access becomes more difficult, the team will need to adapt the response.", wrong:["If access will become more difficult, the team will need to adapt the response.","If access becomes more difficult, the team need adapted the response."], model:"If access becomes more difficult, the team will need to adapt the response."}
      ]
    }
  };


  const mission4Activities = {
    scanner: {
      title: "Hear & Mark",
      intro: "These six stress patterns come directly from the Day 3 answer key. Listen to the word, then choose the version with the main stressed syllable marked correctly.",
      items: [
        {word:"coordinator", q:"Which version marks the main stress in coordinator correctly?", a:"co-OR-di-na-tor", wrong:["CO-or-di-na-tor","co-or-di-NA-tor"], model:"co-OR-di-na-tor", phrase:"The coordinator is updating the field team."},
        {word:"community", q:"Which version marks the main stress in community correctly?", a:"com-MU-ni-ty", wrong:["COM-mu-ni-ty","com-mu-NI-ty"], model:"com-MU-ni-ty", phrase:"The community needs reliable access to care."},
        {word:"situation", q:"Which version marks the main stress in situation correctly?", a:"sit-u-A-tion", wrong:["SIT-u-a-tion","sit-U-a-tion"], model:"sit-u-A-tion", phrase:"The situation is changing quickly."},
        {word:"continuous", q:"Which version marks the main stress in continuous correctly?", a:"con-TIN-u-ous", wrong:["CON-tin-u-ous","con-tin-U-ous"], model:"con-TIN-u-ous", phrase:"Continuous strikes can make access too dangerous."},
        {word:"condition", q:"Which version marks the main stress in condition correctly?", a:"con-DI-tion", wrong:["CON-di-tion","con-di-TION"], model:"con-DI-tion", phrase:"A health condition may make evacuation harder."},
        {word:"protected", q:"Which version marks the main stress in protected correctly?", a:"pro-TEC-ted", wrong:["PRO-tec-ted","pro-tec-TED"], model:"pro-TEC-ted", phrase:"Medical teams need to be protected."}
      ]
    },
    rule: {
      title: "-tion / -sion Rule",
      intro: "Use the exact reminder from Presentation Check-in ③: in -tion, -sion and -cian words, the stress falls on the syllable just before the ending.",
      items: [
        {word:"rule", q:"What is the Day 3 rule for words ending in -tion / -sion / -cian?", a:"Stress the syllable immediately before the ending", wrong:["Always stress the first syllable","Always stress the final syllable"], model:"In -tion, -sion and -cian words, stress the syllable just before the ending.", phrase:"In evaluation, the stress comes just before -tion."},
        {word:"evaluation", q:"Using that rule, where does the stress fall in evaluation?", a:"On the syllable A, immediately before -tion", wrong:["On the first syllable e","On the final -tion syllable"], model:"evalu-A-tion", phrase:"The evaluation was completed before the presentation."},
        {word:"precision", q:"Using the rule, what should you do in a word such as precision?", a:"Stress the syllable immediately before -sion", wrong:["Stress -sion itself","Ignore word stress because spelling is enough"], model:"The stress falls immediately before -sion.", phrase:"Precision matters when you present scientific results."},
        {word:"situation", q:"Why does sit-u-A-tion fit the rule?", a:"The stressed A syllable comes immediately before -tion", wrong:["Because -tion itself carries the main stress","Because all four-syllable words stress the first syllable"], model:"sit-u-A-tion: the stress is on the syllable just before -tion.", phrase:"The situation is changing quickly."}
      ]
    },
    research: {
      title: "Research Words",
      intro: "Transfer the same listening skill to the six long words marked in your scientific article Presentation Check-in.",
      items: [
        {word:"methodology", q:"Which version matches the stress pattern supplied for methodology?", a:"me-THO-do-lo-gy", wrong:["ME-tho-do-lo-gy","me-tho-do-LO-gy"], model:"me-THO-do-lo-gy", phrase:"The methodology is explained on the next slide."},
        {word:"hypothesis", q:"Which version matches the supplied pattern for hypothesis?", a:"hy-PO-the-sis", wrong:["HY-po-the-sis","hy-po-THE-sis"], model:"hy-PO-the-sis", phrase:"The hypothesis was tested in the study."},
        {word:"significant", q:"Which version matches the supplied pattern for significant?", a:"sig-NI-fi-cant", wrong:["SIG-ni-fi-cant","sig-ni-FI-cant"], model:"sig-NI-fi-cant", phrase:"The difference was statistically significant."},
        {word:"parameters", q:"Which version matches the supplied pattern for parameters?", a:"pa-RA-me-ters", wrong:["PA-ra-me-ters","pa-ra-ME-ters"], model:"pa-RA-me-ters", phrase:"The parameters were defined before analysis."},
        {word:"randomised", q:"Which version matches the supplied pattern for randomised?", a:"ran-do-MI-sed", wrong:["RAN-do-mi-sed","ran-DO-mi-sed"], model:"ran-do-MI-sed", phrase:"Participants were randomised into two groups."},
        {word:"analysis", q:"Which version matches the supplied pattern for analysis?", a:"a-NA-ly-sis", wrong:["A-na-ly-sis","a-na-LY-sis"], model:"a-NA-ly-sis", phrase:"The analysis showed a clear difference."}
      ]
    },
    transmission: {
      title: "Radio Transmission",
      intro: "Keep the source-backed stress patterns while the words are embedded in complete field or research messages.",
      items: [
        {word:"coordinator + situation", q:"Which readback preserves both supplied stress patterns in: ‘The coordinator described the situation’?", a:"co-OR-di-na-tor · sit-u-A-tion", wrong:["CO-or-di-na-tor · SIT-u-a-tion","co-or-di-NA-tor · sit-U-a-tion"], model:"co-OR-di-na-tor · sit-u-A-tion", phrase:"The coordinator described the situation."},
        {word:"community + protected", q:"Which readback preserves both supplied stress patterns in: ‘The community must be protected’?", a:"com-MU-ni-ty · pro-TEC-ted", wrong:["COM-mu-ni-ty · PRO-tec-ted","com-mu-NI-ty · pro-tec-TED"], model:"com-MU-ni-ty · pro-TEC-ted", phrase:"The community must be protected."},
        {word:"condition + continuous", q:"Which readback preserves both supplied stress patterns in: ‘The condition requires continuous monitoring’?", a:"con-DI-tion · con-TIN-u-ous", wrong:["CON-di-tion · CON-tin-u-ous","con-di-TION · con-tin-U-ous"], model:"con-DI-tion · con-TIN-u-ous", phrase:"The condition requires continuous monitoring."},
        {word:"methodology + analysis", q:"Which readback preserves both Presentation Check-in patterns in: ‘The methodology and analysis were explained’?", a:"me-THO-do-lo-gy · a-NA-ly-sis", wrong:["ME-tho-do-lo-gy · A-na-ly-sis","me-tho-do-LO-gy · a-na-LY-sis"], model:"me-THO-do-lo-gy · a-NA-ly-sis", phrase:"The methodology and analysis were explained."}
      ]
    }
  };

  const mission5Activities = {
    surge: {
      title: "More Patients Arrive",
      intro: "The worksheet says patient arrivals have increased sharply and more people are expected. Use first-conditional language to prepare rather than wait for the surge to happen.",
      items: [
        {q:"What has changed during the last 24 hours in the worksheet scenario?", a:"The number of patients arriving at the clinic has increased sharply", wrong:["The clinic has stopped receiving patients","The number of patients has fallen sharply"], model:"Patient arrivals have increased sharply over the last 24 hours."},
        {q:"Which sentence correctly plans for a further rise in arrivals?", a:"If more patients arrive, the team will need to review capacity and prioritise available care.", wrong:["If more patients will arrive, the team will need to review capacity.","If more patients arrive, the team definitely has unlimited capacity."], model:"If more patients arrive, the team will need to review capacity and prioritise available care."},
        {q:"Why is the first conditional appropriate here?", a:"It describes a realistic future possibility and its likely response", wrong:["It describes an impossible past event","It proves that the increase will definitely happen"], model:"The first conditional is useful for a realistic future possibility and its consequence."},
        {q:"Which if-clause is formed correctly?", a:"If more patients arrive, ...", wrong:["If more patients will arrive, ...","If more patients arriving, ..."], model:"Use the present tense in the if-clause: If more patients arrive..."},
        {q:"Which planning statement avoids overclaiming?", a:"More people are expected, so the team should prepare for a possible further increase in demand.", wrong:["The clinic will certainly be overwhelmed within hours.","The source proves that every patient will require emergency treatment."], model:"More people are expected, so the team should prepare for a possible further increase in demand."}
      ]
    },
    access: {
      title: "Roads Become Difficult",
      intro: "Several roads are becoming difficult to use. Plan for reduced access while keeping the wording realistic and safety-conscious.",
      items: [
        {q:"What access problem is explicitly included in the flooding scenario?", a:"Several roads are becoming difficult to use", wrong:["Every road has been completely destroyed","The clinic has been permanently cut off"], model:"Several roads are becoming difficult to use."},
        {q:"Choose the correct first conditional for worsening access.", a:"If access to the clinic becomes more difficult, the team will need to adapt the response.", wrong:["If access to the clinic will become more difficult, the team will adapt the response.","If access becomes difficult, the team will definitely reach everyone."], model:"If access to the clinic becomes more difficult, the team will need to adapt the response."},
        {q:"Which response is appropriately cautious?", a:"The team should reassess what can be reached safely and adapt the plan as conditions change.", wrong:["The team should promise that every route will remain open.","The team should ignore access problems until supplies run out."], model:"The team should reassess what can be reached safely and adapt the plan as conditions change."},
        {q:"What does the contingency-plan task ask you to explain about access?", a:"What will happen if access to the clinic becomes more difficult", wrong:["Why the flooding definitely happened","Which road will reopen first"], model:"The plan should explain what will happen if access to the clinic becomes more difficult."},
        {q:"Which sentence correctly keeps uncertainty in the plan?", a:"If roads become harder to use, some activities may need to be reorganised.", wrong:["If roads become harder to use, all care will stop.","If roads will become harder to use, all activities stay unchanged."], model:"If roads become harder to use, some activities may need to be reorganised."}
      ]
    },
    supplies: {
      title: "Resources Run Low",
      intro: "The worksheet says medical supplies may be delayed. Build a response that prioritises available resources without inventing specific stock levels.",
      items: [
        {q:"What does the worksheet say about medical supplies?", a:"They may be delayed", wrong:["They have already run out completely","A new delivery is guaranteed this evening"], model:"Medical supplies may be delayed."},
        {q:"Which sentence plans appropriately for a delay?", a:"If medical supplies are delayed, the team will need to prioritise available resources and adjust the plan.", wrong:["If medical supplies will be delayed, the team will need prioritise resources.","If supplies are delayed, nothing in the plan needs to change."], model:"If medical supplies are delayed, the team will need to prioritise available resources and adjust the plan."},
        {q:"The worksheet also asks you to plan for supplies that run out. Which response fits that open-production task?", a:"If a supply runs out, the team will need to reassess priorities using what remains available.", wrong:["If a supply runs out, the team can guarantee an immediate replacement.","If a supply will run out, the team should ignore the shortage."], model:"If a supply runs out, the team will need to reassess priorities using what remains available."},
        {q:"Which statement avoids inventing information that the worksheet does not give?", a:"The exact stock level is not stated, so the plan should prepare for possible delays or shortages.", wrong:["The clinic has exactly 24 hours of medication left.","All essential medicines are already unavailable."], model:"The exact stock level is not stated, so the plan should prepare for possible delays or shortages."},
        {q:"Which modal best keeps the source's uncertainty?", a:"may", wrong:["must definitely","cannot possibly"], model:"Use may when the scenario presents a possible delay rather than a certainty."}
      ]
    },
    continuity: {
      title: "Even If…",
      intro: "The worksheet asks what the team will continue to do even if conditions deteriorate. Use concession language to keep a core response going without pretending conditions are easy.",
      items: [
        {q:"Which sentence uses even if correctly?", a:"Even if conditions deteriorate, the team will continue to reassess needs and what can be done safely.", wrong:["Even if conditions will deteriorate, the team will continue unchanged.","Even if conditions deteriorate, the team can guarantee normal operations."], model:"Even if conditions deteriorate, the team will continue to reassess needs and what can be done safely."},
        {q:"What does even if express in this plan?", a:"A limit or difficult condition that does not automatically cancel the main action", wrong:["A guaranteed result","A completed event in the past"], model:"Even if introduces a difficult condition while keeping the main action in place."},
        {q:"Which sentence follows the grammar reminder from Presentation Check-in ③?", a:"Even if the situation worsens, the team will continue to review the response.", wrong:["Even if the situation will worsen, the team will continue to review the response.","Even if the situation worsens, the team will continued to review the response."], model:"Even if the situation worsens, the team will continue to review the response."},
        {q:"Which four-part plan best matches the worksheet prompts?", a:"Prepare for more arrivals; adapt if access worsens; prioritise resources if supplies are delayed; continue reassessing even if conditions deteriorate.", wrong:["Predict exactly how many patients will arrive; promise all roads stay open; assume supplies arrive; stop planning if conditions worsen.","Focus only on grammar and ignore patient numbers, access and supplies."], model:"A coherent contingency plan covers patient arrivals, access, supplies and what continues even if conditions deteriorate."},
        {q:"Final clearance: which statement best describes a contingency plan?", a:"A plan for realistic possibilities that states how the team will adapt if conditions change", wrong:["A prediction that claims exactly what will happen","A list of guaranteed outcomes"], model:"A contingency plan prepares for realistic possibilities and explains how the response may adapt."}
      ]
    }
  };


  const mission6Activities = {
    frame: {
      title: "Frame the Issue",
      intro: "Use Stage 1 of the worksheet's debating box. Your job is to define the question and, where useful, appeal to principle before arguing a side.",
      items: [
        {q:"You want to identify what the debate is fundamentally about. Which supplied starter does that job?", a:"At its heart, this is about…", wrong:["Admittedly…","On balance,…"], model:"At its heart, this is about…"},
        {q:"You want to turn a broad statement into the precise issue the group must decide. Which starter fits?", a:"The real question is whether…", wrong:["The usual counter is…","In the long run…"], model:"The real question is whether…"},
        {q:"Which supplied phrase signals an appeal to principle?", a:"On principle,…", wrong:["Take the example of…","Even so,…"], model:"On principle,…"},
        {q:"Which supplied phrase explicitly introduces an ethical obligation?", a:"There's an ethical duty to…", wrong:["The evidence points to…","Some would object that…"], model:"There's an ethical duty to…"},
        {q:"Which Stage 1 phrase frames an argument in terms of rights and fairness?", a:"It's a matter of rights and fairness.", wrong:["The strongest case for this is…","All things considered, I'd argue…"], model:"It's a matter of rights and fairness."}
      ]
    },
    case: {
      title: "Build Your Case",
      intro: "Use Stage 2: give a reason, support it and explain consequences. These checkpoints assess rhetorical function, not which side of the debate you choose.",
      items: [
        {q:"You are about to state your central reason. Which starter is designed for that?", a:"My main argument is that…", wrong:["Some would object that…","There's a real tension between…"], model:"My main argument is that…"},
        {q:"You want to introduce what you consider the strongest justification. Which phrase fits?", a:"The strongest case for this is…", wrong:["On principle,…","Admittedly…"], model:"The strongest case for this is…"},
        {q:"You want to connect your point to material studied in class. Which supplied support phrase does that?", a:"As the video and article showed…", wrong:["It's not simply either/or.","The usual counter is…"], model:"As the video and article showed…"},
        {q:"Which phrase most directly introduces evidence?", a:"The evidence points to…", wrong:["The priority has to be…","There's some truth in that, but…"], model:"The evidence points to…"},
        {q:"You want to make a likely consequence explicit. Which supplied structure fits?", a:"If we do this, the likely result is…", wrong:["Where's the evidence for…?","The real question is whether…"], model:"If we do this, the likely result is…"}
      ]
    },
    challenge: {
      title: "Handle the Other Side",
      intro: "Use Stage 3 to anticipate, concede and rebut. A strong debate response shows that you have understood the objection before answering it.",
      items: [
        {q:"Which supplied phrase anticipates an objection before your opponent raises it?", a:"Some would object that…", wrong:["My main argument is that…","On balance,…"], model:"Some would object that…"},
        {q:"Which phrase introduces a familiar opposing argument?", a:"The usual counter is…", wrong:["At its heart, this is about…","Take the example of…"], model:"The usual counter is…"},
        {q:"You want to concede part of the other side's point in one word. Which supplied option fits?", a:"Admittedly…", wrong:["Even so,…","In the long run…"], model:"Admittedly…"},
        {q:"Which phrase concedes some merit but immediately creates space for your response?", a:"There's some truth in that, but…", wrong:["The strongest case for this is…","The priority has to be…"], model:"There's some truth in that, but…"},
        {q:"You have conceded a point and now want to rebut it. Which supplied phrase works as the pivot?", a:"Even so,…", wrong:["On principle,…","The real question is whether…"], model:"Even so,…"}
      ]
    },
    land: {
      title: "Land It",
      intro: "Use Stage 4 to acknowledge complexity and finish with a clear position. Nuance is part of the argument, not a sign that you have no opinion.",
      items: [
        {q:"Which supplied phrase explicitly acknowledges competing considerations?", a:"There's a real tension between…", wrong:["My main argument is that…","Where's the evidence for…?"], model:"There's a real tension between…"},
        {q:"Which phrase rejects an over-simple binary choice?", a:"It's not simply either/or.", wrong:["On principle,…","The evidence points to…"], model:"It's not simply either/or."},
        {q:"Which supplied phrase introduces a final weighed judgement?", a:"On balance,…", wrong:["Some would object that…","Take the example of…"], model:"On balance,…"},
        {q:"Which phrase lets you state what matters most after weighing the arguments?", a:"The priority has to be…", wrong:["Admittedly…","The usual counter is…"], model:"The priority has to be…"},
        {q:"Which supplied starter gives a clear final position while signalling that several considerations were weighed?", a:"All things considered, I'd argue…", wrong:["At its heart, this is about…","As the video and article showed…"], model:"All things considered, I'd argue…"}
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
    },
    mission3:{
      started:false,current:"roads",
      indices:{roads:0,vulnerable:0,supplies:0,evenif:0},
      scores:{roads:0,vulnerable:0,supplies:0,evenif:0},
      missed:{roads:[],vulnerable:[],supplies:[],evenif:[]},
      complete:{roads:false,vulnerable:false,supplies:false,evenif:false},
      completeAll:false
    },
    mission4:{
      started:false,current:"scanner",
      indices:{scanner:0,rule:0,research:0,transmission:0},
      scores:{scanner:0,rule:0,research:0,transmission:0},
      missed:{scanner:[],rule:[],research:[],transmission:[]},
      complete:{scanner:false,rule:false,research:false,transmission:false},
      completeAll:false
    },
    mission5:{
      started:false,current:"surge",
      indices:{surge:0,access:0,supplies:0,continuity:0},
      scores:{surge:0,access:0,supplies:0,continuity:0},
      missed:{surge:[],access:[],supplies:[],continuity:[]},
      complete:{surge:false,access:false,supplies:false,continuity:false},
      completeAll:false
    },
    mission6:{
      started:false,current:"frame",
      indices:{frame:0,case:0,challenge:0,land:0},
      scores:{frame:0,case:0,challenge:0,land:0},
      missed:{frame:[],case:[],challenge:[],land:[]},
      complete:{frame:false,case:false,challenge:false,land:false},
      completeAll:false,
      boardPrompt:0,stance:""
    }
  };
  let state = load();
  let soundOn = localStorage.getItem(SOUND_KEY) !== "off";
  let musicOn = localStorage.getItem(MUSIC_KEY) === "on";

  const els = {
    start:$("startFieldMission"),sound:$("day3SoundToggle"),musicToggle:$("day3MusicToggle"),music:$("day3Music"),reset:$("resetDay3"),status:$("day3AudioStatus"),
    screen:$("fieldScreen"),feedback:$("fieldFeedback"),workspaceTitle:$("workspaceTitle"),workspaceIntro:$("workspaceIntro"),score:$("fieldScore"),progressText:$("missionProgressText"),progressBar:$("missionProgressBar"),clearance:$("fieldClearance"),complete:$("missionComplete"),completeTitle:$("missionCompleteTitle"),completeText:$("missionCompleteText"),mission2Button:$("mission2Button"),
    mission2Area:$("mission2Area"),startMission2:$("startMission2"),mission2Score:$("mission2Score"),mission2ProgressText:$("mission2ProgressText"),mission2ProgressBar:$("mission2ProgressBar"),mission2Workspace:$("mission2Workspace"),mission2WorkspaceTitle:$("mission2WorkspaceTitle"),mission2WorkspaceIntro:$("mission2WorkspaceIntro"),mission2ActivityScore:$("mission2ActivityScore"),mission2Screen:$("mission2Screen"),mission2Feedback:$("mission2Feedback"),mission2Complete:$("mission2Complete"),mission2CompleteTitle:$("mission2CompleteTitle"),mission2CompleteText:$("mission2CompleteText"),mission3Button:$("mission3Button"),
    mission3Area:$("mission3Area"),startMission3:$("startMission3"),mission3Score:$("mission3Score"),mission3ProgressText:$("mission3ProgressText"),mission3ProgressBar:$("mission3ProgressBar"),mission3Workspace:$("mission3Workspace"),mission3WorkspaceTitle:$("mission3WorkspaceTitle"),mission3WorkspaceIntro:$("mission3WorkspaceIntro"),mission3ActivityScore:$("mission3ActivityScore"),mission3Screen:$("mission3Screen"),mission3Feedback:$("mission3Feedback"),mission3Complete:$("mission3Complete"),mission3CompleteTitle:$("mission3CompleteTitle"),mission3CompleteText:$("mission3CompleteText"),mission4Button:$("mission4Button"),
    mission4Area:$("mission4Area"),startMission4:$("startMission4"),mission4Score:$("mission4Score"),mission4ProgressText:$("mission4ProgressText"),mission4ProgressBar:$("mission4ProgressBar"),mission4Workspace:$("mission4Workspace"),mission4WorkspaceTitle:$("mission4WorkspaceTitle"),mission4WorkspaceIntro:$("mission4WorkspaceIntro"),mission4ActivityScore:$("mission4ActivityScore"),mission4Screen:$("mission4Screen"),mission4Feedback:$("mission4Feedback"),mission4Complete:$("mission4Complete"),mission4CompleteTitle:$("mission4CompleteTitle"),mission4CompleteText:$("mission4CompleteText"),mission5Button:$("mission5Button"),hearStressRule:$("hearStressRule"),
    mission5Area:$("mission5Area"),startMission5:$("startMission5"),mission5Score:$("mission5Score"),mission5ProgressText:$("mission5ProgressText"),mission5ProgressBar:$("mission5ProgressBar"),mission5Workspace:$("mission5Workspace"),mission5WorkspaceTitle:$("mission5WorkspaceTitle"),mission5WorkspaceIntro:$("mission5WorkspaceIntro"),mission5ActivityScore:$("mission5ActivityScore"),mission5Screen:$("mission5Screen"),mission5Feedback:$("mission5Feedback"),mission5Complete:$("mission5Complete"),mission5CompleteTitle:$("mission5CompleteTitle"),mission5CompleteText:$("mission5CompleteText"),mission6Button:$("mission6Button"),
    mission6Area:$("mission6Area"),startMission6:$("startMission6"),mission6Score:$("mission6Score"),mission6ProgressText:$("mission6ProgressText"),mission6ProgressBar:$("mission6ProgressBar"),mission6Workspace:$("mission6Workspace"),mission6WorkspaceTitle:$("mission6WorkspaceTitle"),mission6WorkspaceIntro:$("mission6WorkspaceIntro"),mission6ActivityScore:$("mission6ActivityScore"),mission6Screen:$("mission6Screen"),mission6Feedback:$("mission6Feedback"),mission6Complete:$("mission6Complete"),mission6CompleteTitle:$("mission6CompleteTitle"),mission6CompleteText:$("mission6CompleteText"),mission7Button:$("mission7Button"),mission7Teaser:$("mission7Teaser"),ethicsBoardBrief:$("ethicsBoardBrief"),ethicsPromptText:$("ethicsPromptText"),newEthicsPrompt:$("newEthicsPrompt"),ethicsStanceStatus:$("ethicsStanceStatus")
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
      const s3=saved.mission3||{};
      merged.mission3={...base.mission3,...s3};
      merged.mission3.indices={...base.mission3.indices,...(s3.indices||{})};
      merged.mission3.scores={...base.mission3.scores,...(s3.scores||{})};
      merged.mission3.missed={...base.mission3.missed,...(s3.missed||{})};
      merged.mission3.complete={...base.mission3.complete,...(s3.complete||{})};
      const s4=saved.mission4||{};
      merged.mission4={...base.mission4,...s4};
      merged.mission4.indices={...base.mission4.indices,...(s4.indices||{})};
      merged.mission4.scores={...base.mission4.scores,...(s4.scores||{})};
      merged.mission4.missed={...base.mission4.missed,...(s4.missed||{})};
      merged.mission4.complete={...base.mission4.complete,...(s4.complete||{})};
      const s5=saved.mission5||{};
      merged.mission5={...base.mission5,...s5};
      merged.mission5.indices={...base.mission5.indices,...(s5.indices||{})};
      merged.mission5.scores={...base.mission5.scores,...(s5.scores||{})};
      merged.mission5.missed={...base.mission5.missed,...(s5.missed||{})};
      merged.mission5.complete={...base.mission5.complete,...(s5.complete||{})};
      const s6=saved.mission6||{};
      merged.mission6={...base.mission6,...s6};
      merged.mission6.indices={...base.mission6.indices,...(s6.indices||{})};
      merged.mission6.scores={...base.mission6.scores,...(s6.scores||{})};
      merged.mission6.missed={...base.mission6.missed,...(s6.missed||{})};
      merged.mission6.complete={...base.mission6.complete,...(s6.complete||{})};
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
      els.mission3Area.classList.remove("is-locked");
      els.startMission3.disabled=false;els.startMission3.textContent=state.mission3.started?"Resume Mission 3 →":"Start Mission 3 →";
      els.startMission2.textContent="Replay Mission 2 →";
    }else{
      els.mission2Complete.classList.add("is-locked");els.mission3Button.disabled=true;els.mission3Area.classList.add("is-locked");els.startMission3.disabled=true;els.startMission3.textContent="🔒 Complete Mission 2 first";
    }
    updateMission3UI();
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

  function mission3Order(){return ["roads","vulnerable","supplies","evenif"];}
  function mission3Unlocked(key){const order=mission3Order(),i=order.indexOf(key);return state.mission2.completeAll&&(i===0||state.mission3.complete[order[i-1]]);}
  function mission3CompletedCount(){return Object.values(state.mission3.complete).filter(Boolean).length;}
  function mission3TotalScore(){return Object.values(state.mission3.scores).reduce((a,b)=>a+b,0);}
  function mission3MaxScore(){return mission3Order().reduce((n,k)=>n+mission3Activities[k].items.length,0);}

  function updateMission3UI(){
    if(!els.mission3Area)return;
    const count=mission3CompletedCount();
    state.mission3.completeAll=count===4;
    els.mission3ProgressText.textContent=`${count} / 4`;
    els.mission3ProgressBar.style.width=`${count*25}%`;
    els.mission3Score.textContent=`${mission3TotalScore()} / ${mission3MaxScore()}`;
    const labels={roads:"m3StatusRoads",vulnerable:"m3StatusVulnerable",supplies:"m3StatusSupplies",evenif:"m3StatusEvenIf"};
    mission3Order().forEach(k=>{
      const label=$(labels[k]),card=document.querySelector(`[data-m3-activity="${k}"]`);
      if(!label||!card)return;
      if(state.mission3.complete[k]){label.textContent="CLEARED";card.disabled=false;card.classList.add("is-cleared");card.classList.remove("is-locked");}
      else if(mission3Unlocked(k)){label.textContent=state.mission3.started&&state.mission3.current===k?"IN PROGRESS":"READY";card.disabled=false;card.classList.remove("is-locked");}
      else{label.textContent="LOCKED";card.disabled=true;card.classList.add("is-locked");}
    });
    if(state.mission3.completeAll){
      els.clearance.textContent="Mission 3 cleared";
      els.mission3Complete.classList.remove("is-locked");
      els.mission3CompleteTitle.textContent="Access Coordinator";
      els.mission3CompleteText.textContent="You reported access limitations without overclaiming, recognised who may need extra evacuation support, adapted supply planning and used conditional language to communicate remaining limits.";
      els.mission4Button.disabled=false;els.mission4Button.textContent="Mission 4 · Radio Stress Check →";
      els.mission4Area.classList.remove("is-locked");
      els.startMission4.disabled=false;els.startMission4.textContent=state.mission4.started?"Resume Mission 4 →":"Start Mission 4 →";
      els.startMission3.textContent="Replay Mission 3 →";
    }else{
      els.mission3Complete.classList.add("is-locked");els.mission4Button.disabled=true;els.mission4Area.classList.add("is-locked");els.startMission4.disabled=true;els.startMission4.textContent="🔒 Complete Mission 3 first";
    }
    updateMission4UI();
    save();
  }

  function renderMission3(){
    updateMission3UI();
    els.mission3Feedback.innerHTML="";
    if(!state.mission2.completeAll){els.mission3WorkspaceTitle.textContent="Access desk locked";els.mission3WorkspaceIntro.textContent="Complete Mission 2 to open this assignment.";return;}
    if(!state.mission3.started){els.mission3WorkspaceTitle.textContent="Mission 3 ready";els.mission3WorkspaceIntro.textContent="Start with Road Access Alert, then work through the four access and logistics activities in order.";els.mission3Screen.innerHTML=`<div class="field-waiting"><span aria-hidden="true">🚧</span><h3>Access desk ready</h3><p>Use only what the Day 3 materials support. The aim is to communicate limits and consequences clearly, not to invent operational facts.</p></div>`;return;}
    let key=state.mission3.current;
    if(!mission3Unlocked(key)){key=mission3Order().find(k=>mission3Unlocked(k)&&!state.mission3.complete[k])||"roads";state.mission3.current=key;save();}
    const act=mission3Activities[key],idx=state.mission3.indices[key]||0;
    els.mission3WorkspaceTitle.textContent=act.title;els.mission3WorkspaceIntro.textContent=act.intro;els.mission3ActivityScore.textContent=`${state.mission3.scores[key]} / ${act.items.length}`;
    if(state.mission3.complete[key])return renderMission3CompleteActivity(key);
    const item=act.items[idx];
    els.mission3Screen.innerHTML=`<div class="field-question access-question"><div class="field-question-meta"><span>${act.title.toUpperCase()}</span><b>${idx+1} / ${act.items.length}</b></div><h3>${item.q}</h3><div id="mission3Options" class="field-options"></div><p class="access-source-note">Source rule: choose the wording supported by the Day 3 documents; avoid absolute claims that are not stated.</p></div>`;
    const wrap=$("mission3Options");
    shuffled([item.a,...item.wrong]).forEach(text=>{const b=document.createElement("button");b.className="field-option";b.type="button";b.textContent=text;b.onclick=()=>answerMission3(key,idx,text===item.a,b,wrap,item);wrap.appendChild(b);});
  }

  function answerMission3(key,idx,isCorrect,button,wrap,item){
    if(isCorrect){
      wrap.querySelectorAll("button").forEach(b=>b.disabled=true);button.classList.add("is-correct");
      if(!state.mission3.missed[key].includes(idx))state.mission3.scores[key]+=1;
      state.mission3.indices[key]+=1;cue("good");save();
      els.mission3Feedback.innerHTML=`<div class="field-good"><strong>Cleared.</strong><span>${item.a}</span></div><div class="access-model-line"><span>MODEL LINE</span><p>${item.model}</p><button id="hearM3Model" class="field-hear" type="button">🔊 Hear it</button></div><button id="mission3Next" class="field-next" type="button">${state.mission3.indices[key]>=mission3Activities[key].items.length?"Complete activity →":"Next checkpoint →"}</button>`;
      $("hearM3Model").onclick=()=>speak(item.model);
      $("mission3Next").onclick=()=>{if(state.mission3.indices[key]>=mission3Activities[key].items.length){state.mission3.complete[key]=true;const order=mission3Order(),i=order.indexOf(key);if(i<order.length-1)state.mission3.current=order[i+1];cue("unlock");save();}renderMission3();};
      updateMission3UI();
    }else{
      button.disabled=true;button.classList.add("is-wrong");if(!state.mission3.missed[key].includes(idx))state.mission3.missed[key].push(idx);cue("bad");save();
      els.mission3Feedback.innerHTML=`<div class="field-bad"><strong>Not this one.</strong><span>Return to the source wording. Distinguish a reported access problem from an assumption, and avoid promising outcomes the source cannot guarantee.</span></div>`;
    }
  }

  function renderMission3CompleteActivity(key){
    const order=mission3Order(),i=order.indexOf(key),next=order[i+1],act=mission3Activities[key];
    els.mission3Screen.innerHTML=`<div class="field-cleared-card access-cleared-card"><span aria-hidden="true">✓</span><p class="field-kicker dark">MISSION 3 ACTIVITY CLEARED</p><h3>${act.title}</h3><p>First-try score: <strong>${state.mission3.scores[key]} / ${act.items.length}</strong>.</p>${next?`<button id="continueMission3" class="field-primary" type="button">Open ${mission3Activities[next].title} →</button>`:`<button id="continueMission3" class="field-primary" type="button">Complete Mission 3 →</button>`}</div>`;
    $("continueMission3").onclick=()=>{if(next){state.mission3.current=next;save();renderMission3();}else{state.mission3.completeAll=true;cue("unlock");save();updateMission3UI();els.mission3Complete.scrollIntoView({behavior:"smooth",block:"center"});}};
  }


  function mission4Order(){return ["scanner","rule","research","transmission"];}
  function mission4Unlocked(key){const order=mission4Order(),i=order.indexOf(key);return state.mission3.completeAll&&(i===0||state.mission4.complete[order[i-1]]);}
  function mission4CompletedCount(){return Object.values(state.mission4.complete).filter(Boolean).length;}
  function mission4TotalScore(){return Object.values(state.mission4.scores).reduce((a,b)=>a+b,0);}
  function mission4MaxScore(){return mission4Order().reduce((n,k)=>n+mission4Activities[k].items.length,0);}

  function updateMission4UI(){
    if(!els.mission4Area)return;
    const count=mission4CompletedCount();
    state.mission4.completeAll=count===4;
    els.mission4ProgressText.textContent=`${count} / 4`;
    els.mission4ProgressBar.style.width=`${count*25}%`;
    els.mission4Score.textContent=`${mission4TotalScore()} / ${mission4MaxScore()}`;
    const labels={scanner:"m4StatusScanner",rule:"m4StatusRule",research:"m4StatusResearch",transmission:"m4StatusTransmission"};
    mission4Order().forEach(k=>{
      const label=$(labels[k]),card=document.querySelector(`[data-m4-activity="${k}"]`);
      if(!label||!card)return;
      if(state.mission4.complete[k]){label.textContent="CLEARED";card.disabled=false;card.classList.add("is-cleared");card.classList.remove("is-locked");}
      else if(mission4Unlocked(k)){label.textContent=state.mission4.started&&state.mission4.current===k?"IN PROGRESS":"READY";card.disabled=false;card.classList.remove("is-locked");}
      else{label.textContent="LOCKED";card.disabled=true;card.classList.add("is-locked");}
    });
    if(state.mission4.completeAll){
      els.clearance.textContent="Mission 4 cleared";
      els.mission4Complete.classList.remove("is-locked");
      els.mission4CompleteTitle.textContent="Clear Field Communicator";
      els.mission4CompleteText.textContent="You identified the supplied word-stress patterns, applied the -tion / -sion rule and transferred long-word stress into humanitarian and scientific messages.";
      els.mission5Button.disabled=false;els.mission5Button.textContent="Mission 5 · Emergency Contingency Plan →";
      els.mission5Area.classList.remove("is-locked");els.startMission5.disabled=false;els.startMission5.textContent=state.mission5.started?"Resume Mission 5 →":"Start Mission 5 →";
      els.startMission4.textContent="Replay Mission 4 →";
    }else{
      els.mission4Complete.classList.add("is-locked");els.mission5Button.disabled=true;els.mission5Area.classList.add("is-locked");els.startMission5.disabled=true;els.startMission5.textContent="🔒 Complete Mission 4 first";
    }
    updateMission5UI();
    save();
  }

  function renderMission4(){
    updateMission4UI();
    els.mission4Feedback.innerHTML="";
    if(!state.mission3.completeAll){els.mission4WorkspaceTitle.textContent="Communication desk locked";els.mission4WorkspaceIntro.textContent="Complete Mission 3 to open this assignment.";return;}
    if(!state.mission4.started){els.mission4WorkspaceTitle.textContent="Mission 4 ready";els.mission4WorkspaceIntro.textContent="Start with Hear & Mark, then work through the four communication activities in order.";els.mission4Screen.innerHTML=`<div class="field-waiting radio-waiting"><span aria-hidden="true">📻</span><h3>Radio desk ready</h3><p>The scored stress patterns come from your Day 3 answer key and Presentation Check-in. Use the Listen buttons as often as you need.</p></div>`;return;}
    let key=state.mission4.current;
    if(!mission4Unlocked(key)){key=mission4Order().find(k=>mission4Unlocked(k)&&!state.mission4.complete[k])||"scanner";state.mission4.current=key;save();}
    const act=mission4Activities[key],idx=state.mission4.indices[key]||0;
    els.mission4WorkspaceTitle.textContent=act.title;els.mission4WorkspaceIntro.textContent=act.intro;els.mission4ActivityScore.textContent=`${state.mission4.scores[key]} / ${act.items.length}`;
    if(state.mission4.complete[key])return renderMission4CompleteActivity(key);
    const item=act.items[idx];
    els.mission4Screen.innerHTML=`<div class="field-question radio-question"><div class="field-question-meta"><span>${act.title.toUpperCase()}</span><b>${idx+1} / ${act.items.length}</b></div><div class="radio-listen-row"><button id="hearM4Word" class="field-hear" type="button">🔊 Hear ${item.word==="rule"?"rule":"word"}</button><button id="hearM4Phrase" class="field-hear" type="button">🎧 Hear in context</button></div><h3>${item.q}</h3><div id="mission4Options" class="field-options stress-options"></div><p class="radio-source-note">Capital letters mark the stressed syllable in the course notation.</p></div>`;
    $("hearM4Word").onclick=()=>speak(item.word==="rule"?item.model:item.word);
    $("hearM4Phrase").onclick=()=>speak(item.phrase);
    const wrap=$("mission4Options");
    shuffled([item.a,...item.wrong]).forEach(text=>{const b=document.createElement("button");b.className="field-option stress-option";b.type="button";b.textContent=text;b.onclick=()=>answerMission4(key,idx,text===item.a,b,wrap,item);wrap.appendChild(b);});
  }

  function answerMission4(key,idx,isCorrect,button,wrap,item){
    if(isCorrect){
      wrap.querySelectorAll("button").forEach(b=>b.disabled=true);button.classList.add("is-correct");
      if(!state.mission4.missed[key].includes(idx))state.mission4.scores[key]+=1;
      state.mission4.indices[key]+=1;cue("good");save();
      els.mission4Feedback.innerHTML=`<div class="field-good"><strong>Stress cleared.</strong><span>${item.model}</span></div><div class="radio-model-line"><span>HEAR THE COMPLETE MESSAGE</span><p>${item.phrase}</p><button id="hearM4Model" class="field-hear" type="button">🔊 Listen again</button></div><button id="mission4Next" class="field-next" type="button">${state.mission4.indices[key]>=mission4Activities[key].items.length?"Complete activity →":"Next stress check →"}</button>`;
      $("hearM4Model").onclick=()=>speak(item.phrase);
      $("mission4Next").onclick=()=>{if(state.mission4.indices[key]>=mission4Activities[key].items.length){state.mission4.complete[key]=true;const order=mission4Order(),i=order.indexOf(key);if(i<order.length-1)state.mission4.current=order[i+1];cue("unlock");save();}renderMission4();};
      updateMission4UI();
    }else{
      button.disabled=true;button.classList.add("is-wrong");if(!state.mission4.missed[key].includes(idx))state.mission4.missed[key].push(idx);cue("bad");save();
      els.mission4Feedback.innerHTML=`<div class="field-bad"><strong>Stress not cleared yet.</strong><span>Listen again and look for the single syllable that is marked as louder and longer in the Day 3 course notation.</span></div>`;
    }
  }

  function renderMission4CompleteActivity(key){
    const order=mission4Order(),i=order.indexOf(key),next=order[i+1],act=mission4Activities[key];
    els.mission4Screen.innerHTML=`<div class="field-cleared-card radio-cleared-card"><span aria-hidden="true">📻</span><p class="field-kicker dark">MISSION 4 ACTIVITY CLEARED</p><h3>${act.title}</h3><p>First-try score: <strong>${state.mission4.scores[key]} / ${act.items.length}</strong>.</p>${next?`<button id="continueMission4" class="field-primary" type="button">Open ${mission4Activities[next].title} →</button>`:`<button id="continueMission4" class="field-primary" type="button">Complete Mission 4 →</button>`}</div>`;
    $("continueMission4").onclick=()=>{if(next){state.mission4.current=next;save();renderMission4();}else{state.mission4.completeAll=true;cue("unlock");save();updateMission4UI();els.mission4Complete.scrollIntoView({behavior:"smooth",block:"center"});}};
  }


  function mission5Order(){return ["surge","access","supplies","continuity"];}
  function mission5Unlocked(key){const order=mission5Order(),i=order.indexOf(key);return state.mission4.completeAll&&(i===0||state.mission5.complete[order[i-1]]);}
  function mission5CompletedCount(){return Object.values(state.mission5.complete).filter(Boolean).length;}
  function mission5TotalScore(){return Object.values(state.mission5.scores).reduce((a,b)=>a+b,0);}
  function mission5MaxScore(){return mission5Order().reduce((n,k)=>n+mission5Activities[k].items.length,0);}

  function updateMission5UI(){
    if(!els.mission5Area)return;
    const count=mission5CompletedCount();
    state.mission5.completeAll=count===4;
    els.mission5ProgressText.textContent=`${count} / 4`;
    els.mission5ProgressBar.style.width=`${count*25}%`;
    els.mission5Score.textContent=`${mission5TotalScore()} / ${mission5MaxScore()}`;
    const labels={surge:"m5StatusSurge",access:"m5StatusAccess",supplies:"m5StatusSupplies",continuity:"m5StatusContinuity"};
    mission5Order().forEach(k=>{
      const label=$(labels[k]),card=document.querySelector(`[data-m5-activity="${k}"]`);
      if(!label||!card)return;
      if(state.mission5.complete[k]){label.textContent="CLEARED";card.disabled=false;card.classList.add("is-cleared");card.classList.remove("is-locked");}
      else if(mission5Unlocked(k)){label.textContent=state.mission5.started&&state.mission5.current===k?"IN PROGRESS":"READY";card.disabled=false;card.classList.remove("is-locked");}
      else{label.textContent="LOCKED";card.disabled=true;card.classList.add("is-locked");}
    });
    if(state.mission5.completeAll){
      els.clearance.textContent="Mission 5 cleared";
      els.mission5Complete.classList.remove("is-locked");
      els.mission5CompleteTitle.textContent="Contingency Planner";
      els.mission5CompleteText.textContent="You built a four-part 24-hour plan for patient arrivals, access, supplies and continuity using source-grounded conditional language.";
      els.mission6Button.disabled=false;els.mission6Button.textContent="Mission 6 · Humanitarian Ethics Board →";
      els.mission6Area.classList.remove("is-locked");els.startMission6.disabled=false;els.startMission6.textContent=state.mission6.started?"Resume Mission 6 →":"Enter the Ethics Board →";
      els.startMission5.textContent="Replay Mission 5 →";
    }else{
      els.mission5Complete.classList.add("is-locked");els.mission6Button.disabled=true;els.mission6Area.classList.add("is-locked");els.startMission6.disabled=true;els.startMission6.textContent="🔒 Complete Mission 5 first";
    }
    updateMission6UI();
    save();
  }

  function renderMission5(){
    updateMission5UI();
    els.mission5Feedback.innerHTML="";
    if(!state.mission4.completeAll){els.mission5WorkspaceTitle.textContent="Contingency desk locked";els.mission5WorkspaceIntro.textContent="Complete Mission 4 to open this assignment.";return;}
    if(!state.mission5.started){els.mission5WorkspaceTitle.textContent="Mission 5 ready";els.mission5WorkspaceIntro.textContent="Work through the four planning pressures in order. The model lines are training examples for the worksheet's open contingency-plan task.";els.mission5Screen.innerHTML=`<div class="field-waiting contingency-waiting"><span aria-hidden="true">🗂️</span><h3>24-hour planning desk ready</h3><p>The scenario gives four pressures: more patients, difficult roads, delayed supplies and deteriorating conditions. Build one clear response for each.</p></div>`;return;}
    let key=state.mission5.current;
    if(!mission5Unlocked(key)){key=mission5Order().find(k=>mission5Unlocked(k)&&!state.mission5.complete[k])||"surge";state.mission5.current=key;save();}
    const act=mission5Activities[key],idx=state.mission5.indices[key]||0;
    els.mission5WorkspaceTitle.textContent=act.title;els.mission5WorkspaceIntro.textContent=act.intro;els.mission5ActivityScore.textContent=`${state.mission5.scores[key]} / ${act.items.length}`;
    if(state.mission5.complete[key])return renderMission5CompleteActivity(key);
    const item=act.items[idx];
    els.mission5Screen.innerHTML=`<div class="field-question contingency-question"><div class="field-question-meta"><span>${act.title.toUpperCase()}</span><b>${idx+1} / ${act.items.length}</b></div><h3>${item.q}</h3><div id="mission5Options" class="field-options"></div><p class="contingency-source-note">The flooding scenario is an open-production task. Model operational lines are examples built from its four stated planning prompts, not additional factual claims about a real emergency.</p></div>`;
    const wrap=$("mission5Options");
    shuffled([item.a,...item.wrong]).forEach(text=>{const b=document.createElement("button");b.className="field-option";b.type="button";b.textContent=text;b.onclick=()=>answerMission5(key,idx,text===item.a,b,wrap,item);wrap.appendChild(b);});
  }

  function answerMission5(key,idx,isCorrect,button,wrap,item){
    if(isCorrect){
      wrap.querySelectorAll("button").forEach(b=>b.disabled=true);button.classList.add("is-correct");
      if(!state.mission5.missed[key].includes(idx))state.mission5.scores[key]+=1;
      state.mission5.indices[key]+=1;cue("good");save();
      els.mission5Feedback.innerHTML=`<div class="field-good"><strong>Plan checkpoint cleared.</strong><span>${item.a}</span></div><div class="contingency-model-line"><span>MODEL PLANNING LINE</span><p>${item.model}</p><button id="hearM5Model" class="field-hear" type="button">🔊 Hear it</button></div><button id="mission5Next" class="field-next" type="button">${state.mission5.indices[key]>=mission5Activities[key].items.length?"Complete activity →":"Next planning checkpoint →"}</button>`;
      $("hearM5Model").onclick=()=>speak(item.model);
      $("mission5Next").onclick=()=>{if(state.mission5.indices[key]>=mission5Activities[key].items.length){state.mission5.complete[key]=true;const order=mission5Order(),i=order.indexOf(key);if(i<order.length-1)state.mission5.current=order[i+1];cue("unlock");save();}renderMission5();};
      updateMission5UI();
    }else{
      button.disabled=true;button.classList.add("is-wrong");if(!state.mission5.missed[key].includes(idx))state.mission5.missed[key].push(idx);cue("bad");save();
      els.mission5Feedback.innerHTML=`<div class="field-bad"><strong>Not cleared yet.</strong><span>Use the four facts given by the worksheet scenario and keep the conditional form accurate: no <em>will</em> in the if-clause, and no invented guarantees.</span></div>`;
    }
  }

  function renderMission5CompleteActivity(key){
    const order=mission5Order(),i=order.indexOf(key),next=order[i+1],act=mission5Activities[key];
    const plan=key==="continuity"?`<div class="contingency-plan"><div><b>PATIENT SURGE</b><span>If more patients arrive, the team will need to review capacity and prioritise available care.</span></div><div><b>ACCESS</b><span>If access becomes more difficult, the team will need to adapt the response.</span></div><div><b>SUPPLIES</b><span>If supplies are delayed, the team will need to prioritise available resources and adjust the plan.</span></div><div><b>CONTINUITY</b><span>Even if conditions deteriorate, the team will continue to reassess needs and what can be done safely.</span></div></div>`:"";
    els.mission5Screen.innerHTML=`<div class="field-cleared-card contingency-cleared-card"><span aria-hidden="true">✓</span><p class="field-kicker dark">MISSION 5 ACTIVITY CLEARED</p><h3>${act.title}</h3><p>First-try score: <strong>${state.mission5.scores[key]} / ${act.items.length}</strong>.</p>${plan}${next?`<button id="continueMission5" class="field-primary" type="button">Open ${mission5Activities[next].title} →</button>`:`<button id="continueMission5" class="field-primary" type="button">Complete Mission 5 →</button>`}</div>`;
    $("continueMission5").onclick=()=>{if(next){state.mission5.current=next;save();renderMission5();}else{state.mission5.completeAll=true;cue("unlock");save();updateMission5UI();els.mission5Complete.scrollIntoView({behavior:"smooth",block:"center"});}};
  }


  function mission6Order(){return ["frame","case","challenge","land"];}
  function mission6Unlocked(key){const order=mission6Order(),i=order.indexOf(key);return state.mission5.completeAll&&(i===0||state.mission6.complete[order[i-1]]);}
  function mission6CompletedCount(){return Object.values(state.mission6.complete).filter(Boolean).length;}
  function mission6TotalScore(){return Object.values(state.mission6.scores).reduce((a,b)=>a+b,0);}
  function mission6MaxScore(){return mission6Order().reduce((n,k)=>n+mission6Activities[k].items.length,0);}
  const ethicsPrompts=[
    "Humanitarian organisations like MSF should stay completely neutral and treat everyone the same — including fighters.",
    "Rich countries have a duty to fund and staff humanitarian responses in conflict zones.",
    "It is more effective to train and employ local health workers than to send international teams."
  ];

  function updateEthicsBrief(){
    if(!els.ethicsBoardBrief)return;
    if(!state.mission6.completeAll){els.ethicsBoardBrief.classList.add("is-locked");return;}
    els.ethicsBoardBrief.classList.remove("is-locked");
    const i=Math.max(0,Math.min(ethicsPrompts.length-1,state.mission6.boardPrompt||0));
    els.ethicsPromptText.textContent=`“${ethicsPrompts[i]}”`;
    document.querySelectorAll("[data-ethics-stance]").forEach(b=>b.classList.toggle("is-selected",b.dataset.ethicsStance===state.mission6.stance));
    els.ethicsStanceStatus.textContent=state.mission6.stance?`Your chosen position: ${state.mission6.stance}. Now build the four-stage response aloud.`:"Choose any position. The site does not grade your opinion.";
  }

  function updateMission6UI(){
    if(!els.mission6Area)return;
    const count=mission6CompletedCount();
    state.mission6.completeAll=count===4;
    els.mission6ProgressText.textContent=`${count} / 4`;
    els.mission6ProgressBar.style.width=`${count*25}%`;
    els.mission6Score.textContent=`${mission6TotalScore()} / ${mission6MaxScore()}`;
    const labels={frame:"m6StatusFrame",case:"m6StatusCase",challenge:"m6StatusChallenge",land:"m6StatusLand"};
    mission6Order().forEach(k=>{
      const label=$(labels[k]),card=document.querySelector(`[data-m6-activity="${k}"]`);
      if(!label||!card)return;
      if(state.mission6.complete[k]){label.textContent="CLEARED";card.disabled=false;card.classList.add("is-cleared");card.classList.remove("is-locked");}
      else if(mission6Unlocked(k)){label.textContent=state.mission6.started&&state.mission6.current===k?"IN PROGRESS":"READY";card.disabled=false;card.classList.remove("is-locked");}
      else{label.textContent="LOCKED";card.disabled=true;card.classList.add("is-locked");}
    });
    if(state.mission6.completeAll){
      els.clearance.textContent="Mission 6 cleared";
      els.mission6Complete.classList.remove("is-locked");
      els.mission6CompleteTitle.textContent="Humanitarian Ethics Advisor";
      els.mission6CompleteText.textContent="You can frame a difficult question, build a supported case, handle an objection and reach a nuanced conclusion without having your viewpoint graded.";
      els.mission7Button.disabled=false;els.mission7Button.textContent="FINAL · 24 Hours to Respond →";
      els.mission7Teaser.classList.remove("is-locked");
      els.startMission6.textContent="Replay Mission 6 →";
    }else{
      els.mission6Complete.classList.add("is-locked");els.mission7Button.disabled=true;els.mission7Teaser.classList.add("is-locked");
    }
    updateEthicsBrief();save();
  }

  function renderMission6(){
    updateMission6UI();
    els.mission6Feedback.innerHTML="";
    if(!state.mission5.completeAll){els.mission6WorkspaceTitle.textContent="Ethics Board locked";els.mission6WorkspaceIntro.textContent="Complete Mission 5 to open this assignment.";return;}
    if(!state.mission6.started){els.mission6WorkspaceTitle.textContent="Mission 6 ready";els.mission6WorkspaceIntro.textContent="Four stages, five language checkpoints each. Your stance is never scored — only how well you structure the argument.";els.mission6Screen.innerHTML=`<div class="field-waiting ethics-waiting"><span aria-hidden="true">⚖️</span><h3>The Board is ready</h3><p>Frame it. Build it. Challenge it. Land it. Then use the unscored Board Brief to prepare your own spoken position.</p></div>`;return;}
    let key=state.mission6.current;
    if(!mission6Unlocked(key)){key=mission6Order().find(k=>mission6Unlocked(k)&&!state.mission6.complete[k])||"frame";state.mission6.current=key;save();}
    const act=mission6Activities[key],idx=state.mission6.indices[key]||0;
    els.mission6WorkspaceTitle.textContent=act.title;els.mission6WorkspaceIntro.textContent=act.intro;els.mission6ActivityScore.textContent=`${state.mission6.scores[key]} / ${act.items.length}`;
    if(state.mission6.complete[key])return renderMission6CompleteActivity(key);
    const item=act.items[idx];
    els.mission6Screen.innerHTML=`<div class="field-question ethics-question"><div class="field-question-meta"><span>${act.title.toUpperCase()}</span><b>${idx+1} / ${act.items.length}</b></div><h3>${item.q}</h3><div id="mission6Options" class="field-options"></div><p class="ethics-source-note">Every scored phrase in this mission comes from the worksheet's “Useful language — debating” box. The site scores language function, not political or ethical opinion.</p></div>`;
    const wrap=$("mission6Options");
    shuffled([item.a,...item.wrong]).forEach(text=>{const b=document.createElement("button");b.className="field-option";b.type="button";b.textContent=text;b.onclick=()=>answerMission6(key,idx,text===item.a,b,wrap,item);wrap.appendChild(b);});
  }

  function answerMission6(key,idx,isCorrect,button,wrap,item){
    if(isCorrect){
      wrap.querySelectorAll("button").forEach(b=>b.disabled=true);button.classList.add("is-correct");
      if(!state.mission6.missed[key].includes(idx))state.mission6.scores[key]+=1;
      state.mission6.indices[key]+=1;cue("good");save();
      els.mission6Feedback.innerHTML=`<div class="field-good"><strong>Argument move cleared.</strong><span>${item.a}</span></div><div class="ethics-model-line"><span>USEFUL LANGUAGE</span><p>${item.model}</p><button id="hearM6Model" class="field-hear" type="button">🔊 Hear it</button></div><button id="mission6Next" class="field-next" type="button">${state.mission6.indices[key]>=mission6Activities[key].items.length?"Complete stage →":"Next board checkpoint →"}</button>`;
      $("hearM6Model").onclick=()=>speak(item.model.replace("…",""));
      $("mission6Next").onclick=()=>{if(state.mission6.indices[key]>=mission6Activities[key].items.length){state.mission6.complete[key]=true;const order=mission6Order(),i=order.indexOf(key);if(i<order.length-1)state.mission6.current=order[i+1];cue("unlock");save();}renderMission6();};
      updateMission6UI();
    }else{
      button.disabled=true;button.classList.add("is-wrong");if(!state.mission6.missed[key].includes(idx))state.mission6.missed[key].push(idx);cue("bad");save();
      els.mission6Feedback.innerHTML=`<div class="field-bad"><strong>Different rhetorical job.</strong><span>Look at the function named in the question: framing, supporting, conceding, rebutting or concluding. Your opinion is not being assessed.</span></div>`;
    }
  }

  function renderMission6CompleteActivity(key){
    const order=mission6Order(),i=order.indexOf(key),next=order[i+1],act=mission6Activities[key];
    const stageRecap={frame:"At its heart… · The real question is whether… · On principle…",case:"My main argument… · The evidence points to… · If we do this…",challenge:"Some would object… · Admittedly… · Even so…",land:"There's a real tension… · On balance… · All things considered…"}[key];
    els.mission6Screen.innerHTML=`<div class="field-cleared-card ethics-cleared-card"><span aria-hidden="true">✓</span><p class="field-kicker dark">MISSION 6 STAGE CLEARED</p><h3>${act.title}</h3><p>First-try score: <strong>${state.mission6.scores[key]} / ${act.items.length}</strong>.</p><div class="ethics-model-line"><span>STAGE TOOLKIT</span><p>${stageRecap}</p></div>${next?`<button id="continueMission6" class="field-primary" type="button">Open ${mission6Activities[next].title} →</button>`:`<button id="continueMission6" class="field-primary" type="button">Clear the Ethics Board →</button>`}</div>`;
    $("continueMission6").onclick=()=>{if(next){state.mission6.current=next;save();renderMission6();}else{state.mission6.completeAll=true;state.mission6.boardPrompt=Math.floor(Math.random()*ethicsPrompts.length);cue("unlock");save();updateMission6UI();els.mission6Complete.scrollIntoView({behavior:"smooth",block:"center"});}};
  }

  function startMission6(){
    if(!state.mission5.completeAll)return;
    if(state.mission6.completeAll){state.mission6={...structuredClone(defaults.mission6),started:true};}
    else state.mission6.started=true;
    state.mission6.current=mission6Order().find(k=>mission6Unlocked(k)&&!state.mission6.complete[k])||"frame";
    save();cue("start");if(musicOn)startMusic();renderMission6();els.mission6Workspace.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>els.mission6Screen.focus({preventScroll:true}),450);
  }

  function startMission5(){
    if(!state.mission4.completeAll)return;
    if(state.mission5.completeAll){state.mission5={...structuredClone(defaults.mission5),started:true};}
    else state.mission5.started=true;
    state.mission5.current=mission5Order().find(k=>mission5Unlocked(k)&&!state.mission5.complete[k])||"surge";
    save();cue("start");if(musicOn)startMusic();renderMission5();els.mission5Workspace.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>els.mission5Screen.focus({preventScroll:true}),450);
  }

  function startMission4(){
    if(!state.mission3.completeAll)return;
    if(state.mission4.completeAll){state.mission4={...structuredClone(defaults.mission4),started:true};}
    else state.mission4.started=true;
    state.mission4.current=mission4Order().find(k=>mission4Unlocked(k)&&!state.mission4.complete[k])||"scanner";
    save();cue("start");if(musicOn)startMusic();renderMission4();els.mission4Workspace.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>els.mission4Screen.focus({preventScroll:true}),450);
  }

  function startMission3(){
    if(!state.mission2.completeAll)return;
    if(state.mission3.completeAll){state.mission3={...structuredClone(defaults.mission3),started:true};}
    else state.mission3.started=true;
    state.mission3.current=mission3Order().find(k=>mission3Unlocked(k)&&!state.mission3.complete[k])||"roads";
    save();cue("start");if(musicOn)startMusic();renderMission3();els.mission3Workspace.scrollIntoView({behavior:"smooth",block:"start"});setTimeout(()=>els.mission3Screen.focus({preventScroll:true}),450);
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
  els.reset.onclick=()=>{if(!confirm("Reset all Day 3 progress on this device?"))return;state=structuredClone(defaults);save();stopMusic();render();renderMission2();renderMission3();renderMission4();renderMission5();renderMission6();updateUI();window.scrollTo({top:0,behavior:"smooth"});status("Day 3 progress reset.");};
  els.mission2Button.onclick=()=>{els.mission2Area.scrollIntoView({behavior:"smooth",block:"start"});};
  els.startMission2.onclick=startMission2;
  document.querySelectorAll(".triage-activity-card").forEach(card=>card.addEventListener("click",()=>{const key=card.dataset.m2Activity;if(!mission2Unlocked(key))return;state.mission2.started=true;state.mission2.current=key;save();renderMission2();els.mission2Workspace.scrollIntoView({behavior:"smooth",block:"start"});}));
  els.mission3Button.onclick=()=>els.mission3Area.scrollIntoView({behavior:"smooth",block:"start"});
  els.startMission3.onclick=startMission3;
  document.querySelectorAll(".access-activity-card").forEach(card=>card.addEventListener("click",()=>{const key=card.dataset.m3Activity;if(!mission3Unlocked(key))return;state.mission3.started=true;state.mission3.current=key;save();renderMission3();els.mission3Workspace.scrollIntoView({behavior:"smooth",block:"start"});}));
  els.mission4Button.onclick=()=>els.mission4Area.scrollIntoView({behavior:"smooth",block:"start"});
  els.startMission4.onclick=startMission4;
  document.querySelectorAll(".radio-activity-card").forEach(card=>card.addEventListener("click",()=>{const key=card.dataset.m4Activity;if(!mission4Unlocked(key))return;state.mission4.started=true;state.mission4.current=key;save();renderMission4();els.mission4Workspace.scrollIntoView({behavior:"smooth",block:"start"});}));
  els.hearStressRule.onclick=()=>speak("In long words, one syllable is stressed. In words ending in tion, sion or cian, the stress falls on the syllable just before the ending.");
  els.mission5Button.onclick=()=>els.mission5Area.scrollIntoView({behavior:"smooth",block:"start"});
  els.startMission5.onclick=startMission5;
  document.querySelectorAll(".contingency-activity-card").forEach(card=>card.addEventListener("click",()=>{const key=card.dataset.m5Activity;if(!mission5Unlocked(key))return;state.mission5.started=true;state.mission5.current=key;save();renderMission5();els.mission5Workspace.scrollIntoView({behavior:"smooth",block:"start"});}));
  els.mission6Button.onclick=()=>els.mission6Area.scrollIntoView({behavior:"smooth",block:"start"});
  els.startMission6.onclick=startMission6;
  document.querySelectorAll(".ethics-activity-card").forEach(card=>card.addEventListener("click",()=>{const key=card.dataset.m6Activity;if(!mission6Unlocked(key))return;state.mission6.started=true;state.mission6.current=key;save();renderMission6();els.mission6Workspace.scrollIntoView({behavior:"smooth",block:"start"});}));
  els.newEthicsPrompt.onclick=()=>{if(!state.mission6.completeAll)return;let next=(state.mission6.boardPrompt+1)%ethicsPrompts.length;state.mission6.boardPrompt=next;state.mission6.stance="";save();updateEthicsBrief();cue("good");};
  document.querySelectorAll("[data-ethics-stance]").forEach(button=>button.addEventListener("click",()=>{if(!state.mission6.completeAll)return;state.mission6.stance=button.dataset.ethicsStance;save();updateEthicsBrief();cue("good");}));
  els.mission7Button.onclick=()=>els.mission7Teaser.scrollIntoView({behavior:"smooth",block:"center"});
  if("speechSynthesis" in window)speechSynthesis.addEventListener?.("voiceschanged",voices);
  syncControls();updateUI();render();renderMission2();renderMission3();renderMission4();renderMission5();renderMission6();
})();