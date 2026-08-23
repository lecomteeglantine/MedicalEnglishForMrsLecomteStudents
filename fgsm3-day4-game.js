(() => {
  "use strict";

  const STORAGE_KEY = "mrsLecomteFgsm3Day4AIControlV41";
  const MUSIC_KEY = "mrsLecomteFgsm3Day4Music";
  const ACTIVITY_ORDER = ["lexicon", "signals", "boundaries", "clearance"];
  const M2_ORDER = ["overview", "sepsis", "tools", "human"];
  const M3_ORDER = ["conflict", "review", "silent", "brief"];
  const M4_ORDER = ["numbers", "headlines", "limits", "tfng"];

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



  const m3Meta = {
    conflict: ["Spot the Conflict", "Read all the information in each worksheet case and identify the detail the AI's first answer does not explain."],
    review: ["Re-check the AI", "Choose the most source-consistent reason the case needs human review rather than automatic acceptance."],
    silent: ["Silent Letter Check", "Hear each word and identify the letter that is written but not pronounced."],
    brief: ["Override Brief", "Choose cautious English that reports the mismatch without pretending the evidence proves more than it does."]
  };



  const m4Meta = {
    numbers: ["Read the Numbers", "Match each figure to exactly what the Harvard study reported in the supplied article."],
    headlines: ["Headline Scanner", "Classify each claim as supported, overclaimed or not supported by the article."],
    limits: ["Find the Limitation", "Identify what the experiment did not test and which cautions the article explicitly raises."],
    tfng: ["True · False · Not Given", "Use only the supplied article. 'Not Given' means the article does not tell you."]
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



  /* Mission 3 follows the eight "AI made a mistake" cases and silent-letter work in the supplied Day 4 worksheet. */
  const m3Conflict = [
    {caseId:"CASE 01 · MUSCLE PAIN?",ai:"AI output: muscle strain",summary:"A 68-year-old man has shoulder and upper-back pain, tiredness and slight shortness of breath.",q:"Which extra information most clearly conflicts with accepting 'muscle strain' on its own?",a:"The pain is spreading to his jaw and the ECG shows a subtle abnormality.",opts:["The pain is spreading to his jaw and the ECG shows a subtle abnormality.","He is 68 years old.","The pain is in the shoulder and upper back.","He feels tired."],ex:"The worksheet deliberately adds pain spreading to the jaw and a subtle ECG abnormality, then asks whether something more serious could be happening."},
    {caseId:"CASE 02 · PNEUMONIA?",ai:"AI output: pneumonia",summary:"A 29-year-old woman develops sudden chest pain and difficulty breathing.",q:"Which detail makes the pneumonia answer need another look?",a:"She has no fever or cough, and the symptoms started very suddenly.",opts:["She has no fever or cough, and the symptoms started very suddenly.","She is 29 years old.","She has chest pain.","An X-ray was analysed."],ex:"The worksheet contrasts the AI's pneumonia answer with sudden onset and no fever or cough; the doctor considers pneumothorax."},
    {caseId:"CASE 03 · ANXIETY?",ai:"AI output: psychiatric assessment",summary:"A 42-year-old woman is tired, anxious and has difficulty sleeping.",q:"Which physical information should stop the team from focusing only on a psychological explanation?",a:"She has lost weight, sweats a lot and has a very fast heartbeat.",opts:["She has lost weight, sweats a lot and has a very fast heartbeat.","She has difficulty sleeping.","She feels anxious.","She is 42 years old."],ex:"The worksheet says the doctor thinks there may be a physical cause and asks whether the AI focused too much on psychological symptoms."},
    {caseId:"CASE 04 · KNEE INJURY?",ai:"AI output: minor ligament injury",summary:"A 35-year-old patient has knee pain after running.",q:"Which detail makes the word 'minor' questionable?",a:"The knee is very swollen and the patient cannot put weight on it.",opts:["The knee is very swollen and the patient cannot put weight on it.","The pain started after running.","The patient is 35.","The pain is in the knee."],ex:"The worksheet highlights severe swelling and inability to bear weight, then asks whether the injury could be more serious."},
    {caseId:"CASE 05 · WRIST SPRAIN?",ai:"AI output: simple sprain",summary:"A patient falls on their hand and has severe wrist pain.",q:"Which information suggests the simple-sprain label may be insufficient?",a:"The wrist is very swollen and the patient cannot move it normally.",opts:["The wrist is very swollen and the patient cannot move it normally.","The patient fell on their hand.","The pain is in the wrist.","The AI used the word 'sprain'."],ex:"The worksheet asks whether there could be a fracture because of the severe pain, swelling and reduced movement."},
    {caseId:"CASE 06 · PSYCHOLOGICAL PROBLEM?",ai:"AI output: psychological stress",summary:"A student reports headaches, tiredness and difficulty concentrating.",q:"Which physical symptoms may have been ignored?",a:"A high temperature and neck pain.",opts:["A high temperature and neck pain.","Tiredness and difficulty concentrating.","Being a student.","Having headaches."],ex:"The worksheet explicitly asks whether the AI has ignored an important physical symptom after adding high temperature and neck pain."},
    {caseId:"CASE 07 · MUSCLE WEAKNESS?",ai:"AI output: muscle fatigue",summary:"A 60-year-old patient develops sudden weakness in one arm.",q:"Which additional signs make this a possible neurological emergency in the worksheet?",a:"Difficulty speaking and one side of the face looking different.",opts:["Difficulty speaking and one side of the face looking different.","The patient is 60 years old.","Only one arm feels weak.","The AI used the word 'fatigue'."],ex:"The worksheet adds difficulty speaking and facial asymmetry and asks whether this could be a neurological emergency."},
    {caseId:"CASE 08 · PNEUMONIA AGAIN?",ai:"AI output: dehydration",summary:"An elderly patient feels weak and confused.",q:"Which symptoms may have been underestimated?",a:"Rapid breathing and a cough.",opts:["Rapid breathing and a cough.","Weakness and confusion.","The patient's age alone.","The fact that dehydration was suggested."],ex:"The worksheet says the doctor suspects pneumonia and asks which symptoms may have been underestimated: rapid breathing and cough are the added respiratory clues."}
  ];

  const m3Review = [
    {caseId:"CASE 01",ai:"Muscle strain",summary:"Jaw-spreading pain + subtle ECG abnormality",q:"Which response best matches the worksheet's human-review logic?",a:"Do not treat the AI label as sufficient; the additional signs need clinician review.",opts:["Do not treat the AI label as sufficient; the additional signs need clinician review.","Accept muscle strain because the AI has already classified the pain.","Ignore the ECG because the abnormality is subtle.","The AI output proves a different diagnosis."],ex:"The source asks whether something more serious could be happening. It supports reassessment, not a new definitive diagnosis."},
    {caseId:"CASE 02",ai:"Pneumonia",summary:"Sudden chest pain + breathlessness, but no fever or cough",q:"What is the best reason to re-check the AI output?",a:"The symptom pattern conflicts with the pneumonia explanation given by the AI.",opts:["The symptom pattern conflicts with the pneumonia explanation given by the AI.","Pneumonia can never cause chest pain.","Any AI interpretation of an X-ray must be rejected.","The patient's age proves the AI is wrong."],ex:"The worksheet itself contrasts sudden onset and absence of fever/cough with the AI answer and notes the doctor's alternative concern."},
    {caseId:"CASE 03",ai:"Psychiatric assessment",summary:"Weight loss + sweating + very fast heartbeat",q:"What should human review protect against here?",a:"Focusing so much on psychological symptoms that important physical signs are missed.",opts:["Focusing so much on psychological symptoms that important physical signs are missed.","Assuming anxiety is never a real symptom.","Refusing all psychiatric assessment.","Treating weight loss as proof of one specific disease."],ex:"That is the exact tension posed by the worksheet: did the AI focus too much on the psychological symptoms?"},
    {caseId:"CASE 04",ai:"Minor ligament injury",summary:"Very swollen knee + cannot bear weight",q:"Why is human review justified?",a:"The severity and loss of function do not sit comfortably with the word 'minor'.",opts:["The severity and loss of function do not sit comfortably with the word 'minor'.","Running always causes a fracture.","All knee pain requires the same response.","The AI must be wrong because swelling is present."],ex:"The worksheet uses swelling and inability to bear weight to question whether the injury could be more serious."},
    {caseId:"CASE 05",ai:"Simple sprain",summary:"Severe wrist pain + swelling + abnormal movement",q:"Which statement stays closest to the worksheet?",a:"A fracture is possible, so the simple-sprain output should be reviewed.",opts:["A fracture is possible, so the simple-sprain output should be reviewed.","A fracture is certain.","A sprain is impossible after a fall.","No further information is relevant."],ex:"The worksheet asks, 'Could there be a fracture?' — possibility, not certainty."},
    {caseId:"CASE 06",ai:"Psychological stress",summary:"High temperature + neck pain",q:"What is the key human-review point?",a:"The AI may have ignored physical symptoms that do not fit a purely psychological explanation.",opts:["The AI may have ignored physical symptoms that do not fit a purely psychological explanation.","Psychological stress can never cause headaches.","A high temperature proves one specific diagnosis.","Students cannot have physical illness."],ex:"The worksheet directly asks whether an important physical symptom has been ignored."},
    {caseId:"CASE 07",ai:"Muscle fatigue",summary:"Sudden one-arm weakness + speech difficulty + facial change",q:"What is the safest source-consistent conclusion?",a:"The added signs make a possible neurological emergency important to consider urgently.",opts:["The added signs make a possible neurological emergency important to consider urgently.","The AI has proved that this is only fatigue.","The exact neurological diagnosis is certain from the worksheet alone.","Speech difficulty is unrelated to the case."],ex:"The worksheet asks whether this could be a neurological emergency; it does not name a definitive diagnosis."},
    {caseId:"CASE 08",ai:"Dehydration",summary:"Weak/confused + rapid breathing + cough",q:"What did the doctor notice that the AI may have underweighted?",a:"Respiratory symptoms that support considering pneumonia.",opts:["Respiratory symptoms that support considering pneumonia.","Confusion proves dehydration is impossible.","The AI should ignore the cough because the patient is elderly.","Pneumonia is proven without further assessment."],ex:"The worksheet says the doctor suspects pneumonia and asks which symptoms may have been underestimated."}
  ];

  const m3Silent = [
    {word:"subtle",display:"su(b)tle",ipa:"/ˈsʌtl/",q:"Which written letter is silent?",a:"b",opts:["b","t","l","s"],ex:"Silent b: subtle. The b is written but not pronounced."},
    {word:"hours",display:"(h)ours",ipa:"/ˈaʊəz/",q:"Which written letter is silent?",a:"h",opts:["h","o","u","r"],ex:"Silent h: hours. The word begins with a vowel sound."},
    {word:"muscle",display:"mus(c)le",ipa:"/ˈmʌsl/",q:"Which written letter is silent?",a:"c",opts:["c","s","l","m"],ex:"Silent c: muscle. Do not pronounce every written letter."},
    {word:"receipt",display:"recei(p)t",ipa:"/rɪˈsiːt/",q:"Which written letter is silent?",a:"p",opts:["p","c","t","r"],ex:"Silent p: receipt."},
    {word:"pneumonia",display:"(p)neumonia",ipa:"/njuːˈməʊniə/",q:"Which written letter is silent?",a:"p",opts:["p","n","m","a"],ex:"Silent p in pn-: pneumonia."},
    {word:"psychiatry",display:"(p)sychiatry",ipa:"/saɪˈkaɪətri/",q:"Which written letter is silent?",a:"p",opts:["p","s","y","t"],ex:"Silent p in ps-: psychiatry."},
    {word:"psychology",display:"(p)sychology",ipa:"/saɪˈkɒlədʒi/",q:"Which written letter is silent?",a:"p",opts:["p","s","c","g"],ex:"Silent p in ps-: psychology."},
    {word:"diaphragm",display:"diaphra(g)m",ipa:"/ˈdaɪəfræm/",q:"Which written letter is silent?",a:"g",opts:["g","h","m","p"],ex:"Silent g: diaphragm."},
    {word:"knee",display:"(k)nee",ipa:"/niː/",q:"Which written letter is silent?",a:"k",opts:["k","n","e","none"],ex:"Silent k before n: knee."}
  ];

  const m3Brief = [
    {caseId:"CASE 01 · OVERRIDE BRIEF",ai:"AI output: muscle strain",summary:"Jaw-spreading pain + subtle ECG abnormality",q:"Which briefing sentence is appropriately cautious?",a:"The AI may have missed important additional signs, so the muscle-strain explanation needs human review.",opts:["The AI may have missed important additional signs, so the muscle-strain explanation needs human review.","The AI is definitely wrong and the patient has a heart attack.","The subtle ECG change is irrelevant because the AI chose muscle strain.","AI systems cannot assess pain."],ex:"The worksheet gives reasons to question the first answer, but does not establish a definitive alternative diagnosis."},
    {caseId:"CASE 02 · OVERRIDE BRIEF",ai:"AI output: pneumonia",summary:"Sudden onset + no fever or cough",q:"Which sentence best reports the mismatch?",a:"The sudden onset and absence of fever or cough could make the pneumonia explanation less convincing.",opts:["The sudden onset and absence of fever or cough could make the pneumonia explanation less convincing.","Pneumonia is impossible in this patient.","The X-ray proves the AI is correct.","The patient must have pneumothorax because the doctor mentioned it."],ex:"The worksheet presents pneumothorax as the doctor's concern, not as a proven diagnosis."},
    {caseId:"CASE 03 · OVERRIDE BRIEF",ai:"AI output: psychiatric assessment",summary:"Weight loss + sweating + fast heartbeat",q:"Which sentence avoids overclaiming?",a:"The physical signs suggest that a non-psychological cause may also need to be considered.",opts:["The physical signs suggest that a non-psychological cause may also need to be considered.","The patient definitely has a physical disease.","Anxiety cannot occur with physical illness.","The psychiatric interpretation is automatically unsafe."],ex:"The worksheet says the doctor thinks there may be a physical cause."},
    {caseId:"CASE 05 · OVERRIDE BRIEF",ai:"AI output: simple sprain",summary:"Severe pain + swelling + reduced movement",q:"Which sentence matches the worksheet's level of certainty?",a:"The severity of the symptoms means a fracture could be possible and should be considered.",opts:["The severity of the symptoms means a fracture could be possible and should be considered.","The wrist is certainly fractured.","A sprain cannot cause swelling.","The AI output is enough to exclude fracture."],ex:"The worksheet asks, 'Could there be a fracture?' — use possibility rather than certainty."},
    {caseId:"CASE 07 · OVERRIDE BRIEF",ai:"AI output: muscle fatigue",summary:"Sudden weakness + speech difficulty + facial change",q:"Which sentence is both clear and cautious?",a:"These additional signs could indicate a neurological emergency, so urgent human assessment is important.",opts:["These additional signs could indicate a neurological emergency, so urgent human assessment is important.","These signs prove one exact neurological diagnosis.","The AI must be correct because muscle weakness is present.","Speech difficulty should be ignored until the AI changes its answer."],ex:"The worksheet itself asks whether this could be a neurological emergency."},
    {caseId:"CASE 08 · OVERRIDE BRIEF",ai:"AI output: dehydration",summary:"Rapid breathing + cough",q:"Which sentence best reflects the source?",a:"The respiratory symptoms may have been underestimated, so pneumonia should remain under consideration.",opts:["The respiratory symptoms may have been underestimated, so pneumonia should remain under consideration.","The patient definitely has pneumonia.","Dehydration and pneumonia can never occur together.","The cough is not relevant because the patient is confused."],ex:"The doctor suspects pneumonia; the worksheet asks which respiratory symptoms may have been underestimated."}
  ];



  const m4Numbers = [
    {q:"In the fast-triage experiment, what proportion of cases did the AI identify with the exact or a very close diagnosis?",a:"67%",opts:["67%","50–55%","82%","89%"],ex:"The article reports 67% for the AI in the initial fast-triage experiment."},
    {q:"What accuracy did the human doctors achieve in that same fast-triage experiment?",a:"50–55%",opts:["50–55%","67%","70–79%","34%"],ex:"The doctors were right 50–55% of the time in the same experiment."},
    {q:"When more detail was available, what diagnostic accuracy did the AI reach?",a:"82%",opts:["82%","67%","89%","70–79%"],ex:"With more detail, the AI's diagnostic accuracy rose to 82%."},
    {q:"With more detail, what accuracy range did the expert humans achieve?",a:"70–79%",opts:["70–79%","50–55%","82–89%","34–46%"],ex:"The expert humans achieved 70–79% with the additional information."},
    {q:"Was the 82% versus 70–79% difference statistically significant?",a:"No — the article says it was not statistically significant.",opts:["No — the article says it was not statistically significant.","Yes — the article says it proved superiority.","The article gives no information about significance.","Only the doctors' result was statistically significant."],ex:"The article explicitly says that this difference was not statistically significant."},
    {q:"On the five long-term treatment-plan cases, which score pairing is correct?",a:"AI 89% · doctors 34%",opts:["AI 89% · doctors 34%","AI 67% · doctors 50–55%","AI 82% · doctors 70–79%","AI 34% · doctors 89%"],ex:"For long-term treatment plans, the AI scored 89% compared with 34% for the 46 doctors."}
  ];

  const m4Headlines = [
    {claim:"AI diagnosed more accurately than the doctors in the fast-triage experiment.",q:"How should the Evidence Scanner classify this claim?",a:"Supported",opts:["Supported","Overclaim","Not supported / contradicted"],ex:"The reported result was 67% for AI versus 50–55% for the doctors in that experiment."},
    {claim:"The study proves that AI can replace emergency doctors.",q:"How should the Evidence Scanner classify this headline?",a:"Overclaim",opts:["Supported","Overclaim","Not supported / contradicted"],ex:"The authors explicitly say the findings do not mean AI replaces doctors."},
    {claim:"The AI was tested on the patient's appearance and level of distress.",q:"How should this claim be classified?",a:"Not supported / contradicted",opts:["Supported","Overclaim","Not supported / contradicted"],ex:"Those visual and distress signals were specifically not tested."},
    {claim:"The 82% versus 70–79% result proves a statistically significant diagnostic advantage.",q:"How should this claim be classified?",a:"Overclaim",opts:["Supported","Overclaim","Not supported / contradicted"],ex:"The article says that difference was not statistically significant, so 'proves' is too strong."},
    {claim:"The systems may be useful as second-opinion tools for clinicians.",q:"How should this claim be classified?",a:"Supported",opts:["Supported","Overclaim","Not supported / contradicted"],ex:"An independent expert describes them as useful second-opinion tools, especially for considering a wider range of diagnoses."},
    {claim:"The article says exactly how many hospitals will adopt this AI next year.",q:"How should this claim be classified?",a:"Not supported / contradicted",opts:["Supported","Overclaim","Not supported / contradicted"],ex:"The article gives no exact number of hospitals that will adopt the AI next year."}
  ];

  const m4Limits = [
    {q:"What important type of patient information was NOT tested in the study?",a:"Visual appearance and level of distress",opts:["Visual appearance and level of distress","Electronic health records","Vital-sign data","Demographic information"],ex:"The AI only received information that could be communicated via text; appearance and distress were not tested."},
    {q:"Because of that limitation, how do the researchers describe the AI's role in the experiment?",a:"More like a clinician giving a second opinion based on paperwork",opts:["More like a clinician giving a second opinion based on paperwork","A full replacement for bedside examination","An autonomous emergency department","A tool that only interprets medical images"],ex:"The article says the AI was performing more like a clinician producing a second opinion based on paperwork."},
    {q:"What accountability concern does Dr Rodman raise?",a:"There is not yet a formal framework for accountability.",opts:["There is not yet a formal framework for accountability.","AI companies already accept all legal responsibility.","Doctors have no liability when AI is used.","The study resolved the liability question."],ex:"The article quotes Rodman saying there is not a formal framework right now for accountability."},
    {q:"What risk does Dr Wei Xing identify for doctors using AI?",a:"They may unconsciously defer to the AI instead of thinking independently.",opts:["They may unconsciously defer to the AI instead of thinking independently.","They may stop using electronic records.","They may refuse all second opinions.","They may lose the ability to read vital signs immediately."],ex:"Xing warns that clinicians may unconsciously defer to the AI's answer, a tendency that could grow with routine use."},
    {q:"What subgroup information was missing from the study?",a:"Whether the AI performed worse for groups such as elderly or non-English-speaking patients",opts:["Whether the AI performed worse for groups such as elderly or non-English-speaking patients","Whether every patient owned a smartphone","Whether surgeons preferred robots","Whether all hospitals used the same software"],ex:"The article highlights the lack of information about which patients the AI was worse at diagnosing, including elderly or non-English-speaking patients."},
    {q:"What does the article say the study does NOT demonstrate?",a:"That AI is safe for routine clinical use or a substitute for medical advice",opts:["That AI is safe for routine clinical use or a substitute for medical advice","That the AI could read text records","That doctors took part in the trials","That AI can generate treatment plans"],ex:"The expert warning is explicit: the study does not demonstrate routine clinical safety or justify using freely available AI as a substitute for medical advice."}
  ];

  const m4Tfng = [
    {statement:"A Harvard study found that AI systems diagnosed emergency patients more accurately than human doctors.",q:"True, False or Not Given?",a:"True",opts:["True","False","Not Given"],ex:"True. This is the central result reported in the article."},
    {statement:"The AI identified the exact or a very close diagnosis in 67% of cases, more often than the human doctors.",q:"True, False or Not Given?",a:"True",opts:["True","False","Not Given"],ex:"True. The AI reached 67%; the doctors reached 50–55%."},
    {statement:"The study tested the AI on the patient's visual appearance and level of distress.",q:"True, False or Not Given?",a:"False",opts:["True","False","Not Given"],ex:"False. The article says those signals were not tested."},
    {statement:"The lead authors said their findings mean AI will soon replace doctors.",q:"True, False or Not Given?",a:"False",opts:["True","False","Not Given"],ex:"False. The lead authors explicitly say AI will not replace physicians and describe a doctor–patient–AI model."},
    {statement:"In one case, the AI noticed the patient's history of lupus, which the human doctors had missed.",q:"True, False or Not Given?",a:"True",opts:["True","False","Not Given"],ex:"True. The article describes a pulmonary-clot case in which the AI noticed the lupus history."},
    {statement:"The article gives the exact number of hospitals that will adopt the AI next year.",q:"True, False or Not Given?",a:"Not Given",opts:["True","False","Not Given"],ex:"Not Given. The article reports current use figures, but no exact number of hospitals adopting the AI next year."}
  ];


  let state = loadState();
  let current = null, index = 0, attempts = 0, sessionScore = 0;
  let m2Current = null, m2Index = 0, m2Attempts = 0, m2SessionScore = 0;
  let m3Current = null, m3Index = 0, m3Attempts = 0, m3SessionScore = 0;
  let m4Current = null, m4Index = 0, m4Attempts = 0, m4SessionScore = 0;

  const $ = id => document.getElementById(id);
  const screen = $("ai4Screen"), feedback = $("ai4Feedback"), workspaceTitle = $("ai4WorkspaceTitle"), workspaceIntro = $("ai4WorkspaceIntro");
  const m2Screen = $("ai4M2Screen"), m2Feedback = $("ai4M2Feedback"), m2WorkspaceTitle = $("ai4M2WorkspaceTitle"), m2WorkspaceIntro = $("ai4M2WorkspaceIntro");
  const m3Screen = $("ai4M3Screen"), m3Feedback = $("ai4M3Feedback"), m3WorkspaceTitle = $("ai4M3WorkspaceTitle"), m3WorkspaceIntro = $("ai4M3WorkspaceIntro");
  const m4Screen = $("ai4M4Screen"), m4Feedback = $("ai4M4Feedback"), m4WorkspaceTitle = $("ai4M4WorkspaceTitle"), m4WorkspaceIntro = $("ai4M4WorkspaceIntro");
  const music = $("day4Music"), musicToggle = $("day4MusicToggle"), audioStatus = $("day4AudioStatus"), clinicalVideo = $("day4ClinicalVideo");
  let musicOn = localStorage.getItem(MUSIC_KEY) === "on";
  let videoPausedMusic = false;

  function freshState() {
    return {
      completed: {lexicon:false, signals:false, boundaries:false, clearance:false},
      mission2Completed: {overview:false, sepsis:false, tools:false, human:false},
      mission3Completed: {conflict:false, review:false, silent:false, brief:false},
      mission4Completed: {numbers:false, headlines:false, limits:false, tfng:false},
      firstTryScore: 0,
      mission2FirstTryScore: 0,
      mission3FirstTryScore: 0,
      mission4FirstTryScore: 0,
      started: false,
      mission2Started: false,
      mission3Started: false,
      mission4Started: false,
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
        mission2Completed: {...base.mission2Completed, ...(saved.mission2Completed || {})},
        mission3Completed: {...base.mission3Completed, ...(saved.mission3Completed || {})},
        mission4Completed: {...base.mission4Completed, ...(saved.mission4Completed || {})}
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



  function m3ItemsFor(name) {
    const bank = name === "conflict" ? m3Conflict : name === "review" ? m3Review : name === "silent" ? m3Silent : m3Brief;
    return bank.map(x => ({...x, opts: shuffle(x.opts)}));
  }



  function m4ItemsFor(name) {
    const bank = name === "numbers" ? m4Numbers : name === "headlines" ? m4Headlines : name === "limits" ? m4Limits : m4Tfng;
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
    updateMission3UI();
    updateMission4UI();
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



  function updateMission3UI() {
    if (!$("day4Mission3")) return;
    const m2Cleared = M2_ORDER.every(a=>state.mission2Completed[a]);
    const done = M3_ORDER.filter(a=>state.mission3Completed[a]).length;
    $("day4Mission3").classList.toggle("is-locked", !m2Cleared);
    $("day4Mission3ProgressText").textContent = `${done} / 4`;
    $("day4Mission3ProgressBar").style.width = `${done*25}%`;
    $("day4Mission3Score").textContent = state.mission3FirstTryScore;
    const ids={conflict:"ai4M3StatusConflict",review:"ai4M3StatusReview",silent:"ai4M3StatusSilent",brief:"ai4M3StatusBrief"};
    M3_ORDER.forEach((a,i)=>{
      const btn=document.querySelector(`[data-ai4-m3="${a}"]`);
      const unlocked=m2Cleared && (i===0 || state.mission3Completed[M3_ORDER[i-1]]);
      btn.disabled=!unlocked;
      $(ids[a]).textContent=state.mission3Completed[a]?"CLEARED":unlocked?"READY":"LOCKED";
    });
    const all = done===4;
    $("day4Mission3Complete").classList.toggle("is-locked", !all);
    $("day4M3CompleteTitle").textContent = all ? "🛑 Human Override Cleared." : "Override the Algorithm is not cleared yet.";
    $("day4M3CompleteText").textContent = all ? "You spotted conflicting signals, kept the wording cautious and checked the silent-letter patterns from the Day 4 material." : "Complete all four human-review activities.";
    $("day4Mission4Button").disabled=!all;
    $("day4Mission4Button").textContent=all?"Mission 4 · Evidence Scanner →":"🔒 Mission 4 · Evidence Scanner";
    const r3=$("ai4RoadmapM3"), r3s=$("ai4RoadmapM3State"), r4=$("ai4RoadmapM4"), r4s=$("ai4RoadmapM4State");
    if(r3){r3.classList.toggle("ready",m2Cleared&&!all);r3.classList.toggle("cleared",all);r3s.textContent=all?"03 · CLEARED":m2Cleared?"03 · READY":"03 · LOCKED";}
    if(r4){r4.classList.toggle("ready",all);r4s.textContent=all?"04 · READY":"04 · LOCKED";}
    if(m2Cleared && !state.mission3Started && m3Screen){m3Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🛑</span><h3>Human review ready</h3><p>Open Spot the Conflict to begin the eight-case audit.</p></div>';m3WorkspaceIntro.textContent="Open Spot the Conflict to begin the eight-case audit.";}
  }



  function updateMission4UI() {
    if (!$("day4Mission4")) return;
    const m3Cleared = M3_ORDER.every(a=>state.mission3Completed[a]);
    const done = M4_ORDER.filter(a=>state.mission4Completed[a]).length;
    $("day4Mission4").classList.toggle("is-locked", !m3Cleared);
    $("day4Mission4ProgressText").textContent = `${done} / 4`;
    $("day4Mission4ProgressBar").style.width = `${done*25}%`;
    $("day4Mission4Score").textContent = state.mission4FirstTryScore;
    const ids={numbers:"ai4M4StatusNumbers",headlines:"ai4M4StatusHeadlines",limits:"ai4M4StatusLimits",tfng:"ai4M4StatusTfng"};
    M4_ORDER.forEach((a,i)=>{
      const btn=document.querySelector(`[data-ai4-m4="${a}"]`);
      const unlocked=m3Cleared && (i===0 || state.mission4Completed[M4_ORDER[i-1]]);
      btn.disabled=!unlocked;
      $(ids[a]).textContent=state.mission4Completed[a]?"CLEARED":unlocked?"READY":"LOCKED";
    });
    const all=done===4;
    $("day4Mission4Complete").classList.toggle("is-locked", !all);
    $("day4M4CompleteTitle").textContent=all?"🔎 Evidence Auditor cleared.":"Evidence Scanner is not cleared yet.";
    $("day4M4CompleteText").textContent=all?"You separated reported results from hype, checked the study's limitations and verified claims against the supplied article.":"Complete all four evidence-audit activities.";
    $("day4Mission5Button").disabled=!all;
    $("day4Mission5Button").textContent=all?"Mission 5 · Certainty Calibration →":"🔒 Mission 5 · Certainty Calibration";
    const r4=$("ai4RoadmapM4"),r4s=$("ai4RoadmapM4State"),r5=$("ai4RoadmapM5"),r5s=$("ai4RoadmapM5State");
    if(r4){r4.classList.toggle("ready",m3Cleared&&!all);r4.classList.toggle("cleared",all);r4s.textContent=all?"04 · CLEARED":m3Cleared?"04 · READY":"04 · LOCKED";}
    if(r5){r5.classList.toggle("ready",all);r5s.textContent=all?"05 · READY":"05 · LOCKED";}
    if(m3Cleared && !state.mission4Started && m4Screen){m4Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🔎</span><h3>Evidence Scanner ready</h3><p>Open Read the Numbers to begin the evidence audit.</p></div>';m4WorkspaceIntro.textContent="Open Read the Numbers to begin the evidence audit.";}
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



  function startM3(name) {
    if (!M2_ORDER.every(a=>state.mission2Completed[a])) return;
    if (musicOn && (!clinicalVideo || clinicalVideo.paused)) startMusicPlayback();
    m3Current={name,items:shuffle(m3ItemsFor(name))}; m3Index=0; m3Attempts=0; m3SessionScore=0; state.mission3Started=true; save();
    m3WorkspaceTitle.textContent=m3Meta[name][0]; m3WorkspaceIntro.textContent=m3Meta[name][1]; m3Feedback.textContent=""; m3Feedback.className="ai4-feedback"; renderM3();
  }

  function renderM3() {
    const it=m3Current.items[m3Index]; if(!it){completeM3Activity();return;}
    const label=m3Current.name==="conflict"?"CASE SCANNER":m3Current.name==="review"?"HUMAN OVERRIDE":m3Current.name==="silent"?"PRONUNCIATION SCANNER":"OVERRIDE BRIEF";
    const casePanel=it.caseId?`<div class="ai4-case-panel"><span class="ai4-case-id">${it.caseId}</span><h4>${it.summary||""}</h4>${it.ai?`<span class="ai4-ai-output">🤖 ${it.ai}</span>`:""}</div>`:"";
    const silentPanel=m3Current.name==="silent"?`<div class="ai4-silent-display"><strong>${it.display}</strong><code>${it.ipa}</code><button class="ai4-audio-btn" type="button" data-m3-speak="${it.word}">🔊 Hear word</button></div><div class="ai4-pronunciation-rule"><strong>Rule:</strong> say the word from the sound, not from every letter you can see.</div>`:"";
    const guard=m3Current.name==="brief"?'<div class="ai4-brief-preview"><strong>Calibration rule:</strong> question the AI output without turning a possibility into a diagnosis.</div>':m3Current.name!=="silent"?'<div class="ai4-red-flag"><strong>Human-in-the-loop check:</strong> use only the information supplied in the worksheet case.</div>':'';
    m3Screen.innerHTML=`<span class="ai4-feed-label">${label}</span><div class="ai4-question-top"><span>OVERRIDE · CHECKPOINT ${m3Index+1}</span><b>${m3Index+1} / ${m3Current.items.length}</b></div>${casePanel}${silentPanel}<h3 class="ai4-question">${it.q}</h3><div class="ai4-options">${it.opts.map((o,i)=>`<button class="ai4-option" type="button" data-m3-answer="${encodeURIComponent(o)}"><b>${String.fromCharCode(65+i)}</b> · ${o}</button>`).join("")}</div>${guard}`;
    m3Screen.querySelectorAll("[data-m3-answer]").forEach(b=>b.addEventListener("click",answerM3));
    m3Screen.querySelectorAll("[data-m3-speak]").forEach(b=>b.addEventListener("click",()=>speak(b.dataset.m3Speak)));
    m3Screen.focus();
  }

  function answerM3(e) {
    const it=m3Current.items[m3Index], chosen=decodeURIComponent(e.currentTarget.dataset.m3Answer), good=chosen===it.a; m3Attempts++;
    m3Screen.querySelectorAll(".ai4-option").forEach(btn=>{btn.disabled=true;const v=decodeURIComponent(btn.dataset.m3Answer);if(v===it.a)btn.classList.add("correct");else if(btn===e.currentTarget)btn.classList.add("wrong");});
    if(good){const pts=m3Attempts===1?10:6;m3SessionScore+=pts;state.mission3FirstTryScore+=pts;m3Feedback.className="ai4-feedback good";m3Feedback.innerHTML=`<strong>Human review check passed.</strong> ${it.ex}`;cue(true);}else{m3Feedback.className="ai4-feedback bad";m3Feedback.innerHTML=`<strong>Re-check the case details.</strong> ${it.ex}`;cue(false);}
    save(); const next=document.createElement("button"); next.type="button"; next.className="ai4-primary ai4-next"; next.textContent=m3Index===m3Current.items.length-1?"Clear override module →":"Next override checkpoint →"; next.addEventListener("click",()=>{m3Index++;m3Attempts=0;m3Feedback.textContent="";m3Feedback.className="ai4-feedback";renderM3();}); m3Feedback.appendChild(document.createElement("br")); m3Feedback.appendChild(next); updateUI();
  }

  function completeM3Activity() {
    state.mission3Completed[m3Current.name]=true; save(); const i=M3_ORDER.indexOf(m3Current.name); const next=i<M3_ORDER.length-1?`${m3Meta[M3_ORDER[i+1]][0]} is now unlocked.`:"Mission 3 is complete. Evidence Scanner is ready.";
    m3Screen.innerHTML=`<div class="ai4-waiting"><span aria-hidden="true">✅</span><h3>${m3Meta[m3Current.name][0]} cleared</h3><p>Activity score: ${m3SessionScore}. ${next}</p></div>`; m3Feedback.textContent=""; updateUI();
  }



  function startM4(name) {
    if (!M3_ORDER.every(a=>state.mission3Completed[a])) return;
    if (musicOn && (!clinicalVideo || clinicalVideo.paused)) startMusicPlayback();
    m4Current={name,items:shuffle(m4ItemsFor(name))};m4Index=0;m4Attempts=0;m4SessionScore=0;state.mission4Started=true;save();
    m4WorkspaceTitle.textContent=m4Meta[name][0];m4WorkspaceIntro.textContent=m4Meta[name][1];m4Feedback.textContent="";m4Feedback.className="ai4-feedback";renderM4();
  }

  function renderM4() {
    const it=m4Current.items[m4Index];if(!it){completeM4Activity();return;}
    const label=m4Current.name==="numbers"?"DATA CHECK":m4Current.name==="headlines"?"CLAIM CHECK":m4Current.name==="limits"?"LIMITATION CHECK":"SOURCE VERIFICATION";
    const claim=it.claim?`<div class="ai4-claim-card"><span>CLAIM</span><strong>${it.claim}</strong></div>`:"";
    const statement=it.statement?`<div class="ai4-claim-card tfng"><span>STATEMENT</span><strong>${it.statement}</strong></div>`:"";
    const guard=m4Current.name==="tfng"?'<div class="ai4-source-guardrail"><strong>Not Given rule:</strong> choose Not Given only when the supplied article does not tell you — even if the statement might be true in real life.</div>':m4Current.name==="headlines"?'<div class="ai4-source-guardrail"><strong>Evidence rule:</strong> a dramatic headline is not stronger evidence. Match the wording to what the study actually tested.</div>':'<div class="ai4-evidence-rule"><strong>Evidence Scanner:</strong> use the figures and limitations reported in the supplied article only.</div>';
    m4Screen.innerHTML=`<span class="ai4-feed-label">${label}</span><div class="ai4-question-top"><span>EVIDENCE · CHECKPOINT ${m4Index+1}</span><b>${m4Index+1} / ${m4Current.items.length}</b></div>${claim}${statement}<h3 class="ai4-question">${it.q}</h3><div class="ai4-options">${it.opts.map((o,i)=>`<button class="ai4-option" type="button" data-m4-answer="${encodeURIComponent(o)}"><b>${String.fromCharCode(65+i)}</b> · ${o}</button>`).join("")}</div>${guard}`;
    m4Screen.querySelectorAll("[data-m4-answer]").forEach(b=>b.addEventListener("click",answerM4));m4Screen.focus();
  }

  function answerM4(e) {
    const it=m4Current.items[m4Index],chosen=decodeURIComponent(e.currentTarget.dataset.m4Answer),good=chosen===it.a;m4Attempts++;
    m4Screen.querySelectorAll(".ai4-option").forEach(btn=>{btn.disabled=true;const v=decodeURIComponent(btn.dataset.m4Answer);if(v===it.a)btn.classList.add("correct");else if(btn===e.currentTarget)btn.classList.add("wrong");});
    if(good){const pts=m4Attempts===1?10:6;m4SessionScore+=pts;state.mission4FirstTryScore+=pts;m4Feedback.className="ai4-feedback good";m4Feedback.innerHTML=`<strong>Evidence verified.</strong> ${it.ex}`;cue(true);}else{m4Feedback.className="ai4-feedback bad";m4Feedback.innerHTML=`<strong>Re-scan the evidence.</strong> ${it.ex}`;cue(false);}
    save();const next=document.createElement("button");next.type="button";next.className="ai4-primary ai4-next";next.textContent=m4Index===m4Current.items.length-1?"Clear evidence module →":"Next evidence checkpoint →";next.addEventListener("click",()=>{m4Index++;m4Attempts=0;m4Feedback.textContent="";m4Feedback.className="ai4-feedback";renderM4();});m4Feedback.appendChild(document.createElement("br"));m4Feedback.appendChild(next);updateUI();
  }

  function completeM4Activity() {
    state.mission4Completed[m4Current.name]=true;save();const i=M4_ORDER.indexOf(m4Current.name);const next=i<M4_ORDER.length-1?`${m4Meta[M4_ORDER[i+1]][0]} is now unlocked.`:"Mission 4 is complete. Certainty Calibration is ready.";
    m4Screen.innerHTML=`<div class="ai4-waiting"><span aria-hidden="true">✅</span><h3>${m4Meta[m4Current.name][0]} cleared</h3><p>Activity score: ${m4SessionScore}. ${next}</p></div>`;m4Feedback.textContent="";updateUI();
  }


  $("startDay4Mission1").addEventListener("click",()=>start("lexicon"));
  document.querySelectorAll("[data-ai4-activity]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)start(b.dataset.ai4Activity);}));
  document.querySelectorAll("[data-ai4-m2]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)startM2(b.dataset.ai4M2);}));
  document.querySelectorAll("[data-ai4-m3]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)startM3(b.dataset.ai4M3);}));
  document.querySelectorAll("[data-ai4-m4]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)startM4(b.dataset.ai4M4);}));

  $("day4SoundToggle").addEventListener("click",()=>{state.soundOff=!state.soundOff;save();updateUI();audioStatus.textContent=state.soundOff?"Sound effects and UK speech are off. Music is controlled separately.":"Sound effects and UK speech are on. Music is controlled separately.";});
  musicToggle.addEventListener("click",()=>{musicOn=!musicOn;localStorage.setItem(MUSIC_KEY,musicOn?"on":"off");applyMusicState(true);audioStatus.textContent=musicOn?"Music on. AI Clinical Control — Human in the Loop is playing.":"Music off. Sound effects and UK speech remain available.";});

  $("resetDay4").addEventListener("click",()=>{if(confirm("Reset all Day 4 progress on this device?")){state=freshState();save();current=null;m2Current=null;m3Current=null;m4Current=null;if(clinicalVideo){clinicalVideo.pause();clinicalVideo.currentTime=0;}screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🧠</span><h3>AI clinical control offline</h3><p>Start Mission 1 to initialise the system.</p></div>';workspaceTitle.textContent="System waiting";workspaceIntro.textContent="Boot Mission 1 to start the vocabulary clearance.";feedback.textContent="";m2Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">📡</span><h3>Clinical feed locked</h3><p>Mission 1 clearance is required.</p></div>';m2WorkspaceTitle.textContent="Feed waiting";m2WorkspaceIntro.textContent="Clear Mission 1, then start Feed Orientation.";m2Feedback.textContent="";m3Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🛑</span><h3>Human review locked</h3><p>Mission 2 clearance is required.</p></div>';m3WorkspaceTitle.textContent="Override waiting";m3WorkspaceIntro.textContent="Clear Mission 2, then open Spot the Conflict.";m3Feedback.textContent="";m4Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🔎</span><h3>Evidence scanner locked</h3><p>Mission 3 clearance is required.</p></div>';m4WorkspaceTitle.textContent="Scanner waiting";m4WorkspaceIntro.textContent="Clear Mission 3, then open Read the Numbers.";m4Feedback.textContent="";updateUI();}});

  $("day4Mission2Button").addEventListener("click",()=>{if(!$("day4Mission2Button").disabled){$("day4Mission2").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Mission 2 ready. Watch the supplied video, then open Feed Orientation.";}});
  $("day4Mission3Button").addEventListener("click",()=>{if(!$("day4Mission3Button").disabled){$("day4Mission3").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Mission 3 ready. Open Spot the Conflict to start the human-review audit.";}});
  $("day4Mission4Button").addEventListener("click",()=>{if(!$("day4Mission4Button").disabled){$("day4Mission4").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Mission 4 ready. Open Read the Numbers to begin the evidence audit.";}});
  $("day4Mission5Button").addEventListener("click",()=>{if(!$("day4Mission5Button").disabled){audioStatus.textContent="Mission 5 · Certainty Calibration is unlocked and will be added in the next update.";}});

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
