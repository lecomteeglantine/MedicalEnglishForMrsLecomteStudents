(() => {
  "use strict";

  const STORAGE_KEY = "mrsLecomteFgsm3Day4AIControlV41";
  const MUSIC_KEY = "mrsLecomteFgsm3Day4Music";
  const ACTIVITY_ORDER = ["lexicon", "signals", "boundaries", "clearance"];
  const M2_ORDER = ["overview", "sepsis", "tools", "human"];
  const M3_ORDER = ["conflict", "review", "silent", "brief"];
  const M4_ORDER = ["numbers", "headlines", "limits", "tfng"];
  const M5_ORDER = ["dial", "overclaim", "future", "claim"];
  const M6_ORDER = ["frame", "evidence", "steelman", "verdict"];

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

  const m5Meta = {
    dial: ["Set the Certainty Level", "Choose language that matches the strength of the evidence: strong deduction, possibility or prediction."],
    overclaim: ["Overclaiming Detector", "Judge whether a claim is too certain, appropriately calibrated or too weak for the evidence shown."],
    future: ["Prediction Language", "Use the five prediction forms from the worksheet accurately without turning a prediction into a fact."],
    claim: ["Calibrate the Conclusion", "Turn a result or limitation from the supplied Day 4 material into careful scientific English."]
  };



  const m6Meta = {
    frame: ["Frame the Issue", "Define the real question without building the conclusion into the opening."],
    evidence: ["Build the Case", "Choose evidence and limitations that the supplied Day 4 article actually supports."],
    steelman: ["Steelman It", "Represent the other side fairly, then test or challenge the claim."],
    verdict: ["Reach a Balanced Position", "Synthesize the evidence and finish with a qualified, source-disciplined conclusion."]
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


  /* Mission 5 follows the supplied Presentation Check-in: must/can't for strong deduction,
     may/might/could for possibility, will/won't and (un)likely to for predictions. */
  const m5Dial = [
    {evidence:"The Presentation Check-in uses one modal for a strong positive deduction and another for a strong negative deduction.",q:"Which modal expresses a strong positive deduction?",a:"must",opts:["must","may","could","is likely to"],level:"strong",ex:"The check-in gives 'must' for a strong deduction and 'can't' for a strong negative deduction."},
    {evidence:"The experiment used text-based patient data only; visual appearance was not tested.",q:"Complete the sentence: In this experiment, the AI ___ assess the patient's visual appearance.",a:"can't",opts:["can't","must","will","is likely to"],level:"strong",ex:"The article explicitly says visual appearance was not tested, so 'can't' expresses a strong negative deduction here."},
    {evidence:"The study found an advantage for AI in rapid triage, but it tested a specific experiment with limited information.",q:"Which wording keeps the implication appropriately cautious?",a:"The findings may suggest that AI can support rapid triage decisions.",opts:["The findings may suggest that AI can support rapid triage decisions.","The findings prove that AI will always diagnose better than doctors.","The findings can't tell us anything about triage.","AI must replace emergency doctors."],level:"calibrated",ex:"'May suggest' matches a possible implication without turning one experiment into a universal claim."},
    {evidence:"The reported diagnostic accuracy was 67%, not 100%.",q:"Complete the sentence: The system ___ be infallible on the basis of these results.",a:"can't",opts:["can't","must","will","may always"],level:"strong",ex:"A 67% result rules out the claim of infallibility."},
    {evidence:"The article says doctors may unconsciously defer to AI as it becomes more routinely used.",q:"Which modal best preserves the expert's level of caution?",a:"may",opts:["may","must","will definitely","can't"],level:"calibrated",ex:"The expert identifies a possible risk, so 'may' keeps the claim appropriately cautious."},
    {evidence:"The study did not report whether performance was worse for elderly or non-English-speaking patients.",q:"Which sentence is best calibrated?",a:"The AI could perform differently across patient groups, but the study did not provide enough information to know.",opts:["The AI could perform differently across patient groups, but the study did not provide enough information to know.","The AI must perform worse for elderly patients.","The AI will perform equally well for every patient group.","The missing data prove that the AI is biased."],level:"calibrated",ex:"'Could' signals possibility while the second clause states the actual limitation."}
  ];

  const m5Overclaim = [
    {claim:"AI will replace emergency doctors because it scored 67% in the study.",q:"How should the certainty scanner classify this claim?",a:"TOO CERTAIN",opts:["TOO CERTAIN","WELL CALIBRATED","TOO WEAK"],level:"strong",ex:"The authors explicitly reject the conclusion that AI replaces doctors; the claim generalises far beyond the study."},
    {claim:"The study may suggest that AI can be useful as a second-opinion tool in some triage situations.",q:"How should the certainty scanner classify this claim?",a:"WELL CALIBRATED",opts:["WELL CALIBRATED","TOO CERTAIN","TOO WEAK"],level:"calibrated",ex:"This matches the article's cautious framing and the study's limited scope."},
    {claim:"The study tells us nothing at all about AI performance in emergency triage.",q:"How should the certainty scanner classify this claim?",a:"TOO WEAK",opts:["TOO WEAK","WELL CALIBRATED","TOO CERTAIN"],level:"weak",ex:"The study does provide evidence about performance in the tested triage tasks; saying it tells us nothing understates the evidence."},
    {claim:"Because the 82% vs 70–79% difference was not statistically significant, the study proves the two approaches are identical.",q:"How should the certainty scanner classify this claim?",a:"TOO CERTAIN",opts:["TOO CERTAIN","WELL CALIBRATED","TOO WEAK"],level:"strong",ex:"Not statistically significant does not prove that two approaches are identical."},
    {claim:"The experiment did not test visual appearance or distress, so the results do not establish that AI can replace a full bedside assessment.",q:"How should the certainty scanner classify this claim?",a:"WELL CALIBRATED",opts:["WELL CALIBRATED","TOO CERTAIN","TOO WEAK"],level:"calibrated",ex:"This states the limitation directly without claiming more than the article supports."}
  ];

  const m5Future = [
    {q:"Choose the grammatically correct prediction using WILL.",a:"AI will change some parts of medical practice by 2035.",opts:["AI will change some parts of medical practice by 2035.","AI will to change some parts of medical practice by 2035.","AI wills change some parts of medical practice by 2035.","AI will changing some parts of medical practice by 2035."],level:"calibrated",ex:"Use will + base verb: 'will change'. The sentence is a prediction, not a statement of proven fact."},
    {q:"Choose the grammatically correct negative prediction using WON'T.",a:"AI won't remove the need for human judgement in every clinical situation.",opts:["AI won't remove the need for human judgement in every clinical situation.","AI won't to remove the need for human judgement.","AI doesn't will remove the need for human judgement.","AI won't removing the need for human judgement."],level:"calibrated",ex:"Use won't + base verb: 'won't remove'."},
    {q:"Choose the correct form with IS LIKELY TO.",a:"AI is likely to become more common in clinical decision support.",opts:["AI is likely to become more common in clinical decision support.","AI likely to become more common in clinical decision support.","AI is likely becoming to more common in clinical decision support.","AI is likely become more common in clinical decision support."],level:"calibrated",ex:"The pattern is be + likely to + base verb."},
    {q:"Choose the correct form with IS UNLIKELY TO.",a:"One study is unlikely to settle every question about AI safety.",opts:["One study is unlikely to settle every question about AI safety.","One study unlikely to settle every question about AI safety.","One study is unlikely settle every question about AI safety.","One study is unlikely to settled every question about AI safety."],level:"calibrated",ex:"The pattern is be + unlikely to + base verb."},
    {q:"Which prediction correctly uses a possibility modal?",a:"AI may play a larger role in consultations by 2035.",opts:["AI may play a larger role in consultations by 2035.","AI may to play a larger role in consultations by 2035.","AI may plays a larger role in consultations by 2035.","AI may playing a larger role in consultations by 2035."],level:"calibrated",ex:"Use may / might / could + base verb."}
  ];

  const m5Claim = [
    {evidence:"Fast-triage diagnosis: AI 67%; doctors 50–55%.",q:"Which conclusion reports this result without overgeneralising?",a:"In this experiment, the AI achieved higher diagnostic accuracy than the doctors in the rapid-triage task.",opts:["In this experiment, the AI achieved higher diagnostic accuracy than the doctors in the rapid-triage task.","AI is now more accurate than all doctors.","Doctors can no longer diagnose emergency patients reliably.","The figures prove AI is safe for routine clinical use."],level:"calibrated",ex:"The wording stays inside the tested experiment and task."},
    {evidence:"With more detail: AI 82%; experts 70–79%; the difference was not statistically significant.",q:"Which sentence reports the result most accurately?",a:"The AI had a higher numerical accuracy, but the difference was not statistically significant.",opts:["The AI had a higher numerical accuracy, but the difference was not statistically significant.","The AI was proven significantly better than the experts.","The experts were statistically superior to the AI.","The two groups achieved exactly the same accuracy."],level:"calibrated",ex:"The numerical difference and the statistical limitation both need to be reported."},
    {evidence:"Treatment-plan task: AI 89%; 46 doctors 34%; the computer made significantly better plans in this test.",q:"Which claim keeps the scope precise?",a:"In this treatment-planning task, the AI scored significantly higher than the doctors.",opts:["In this treatment-planning task, the AI scored significantly higher than the doctors.","AI will make better treatment decisions for every patient.","Doctors are unnecessary for long-term treatment planning.","The study proves autonomous AI treatment is safe."],level:"calibrated",ex:"The result can be stated strongly within the tested task, but it should not be universalised."},
    {evidence:"The AI only read text records; visual appearance and distress were not tested.",q:"Which limitation statement is best calibrated?",a:"These findings may not generalise to situations that depend on bedside visual assessment.",opts:["These findings may not generalise to situations that depend on bedside visual assessment.","The study proves that visual assessment is useless.","AI can definitely replace bedside examination.","The missing visual data cannot matter clinically."],level:"calibrated",ex:"'May not generalise' communicates a reasonable limitation without claiming certainty beyond the study."},
    {evidence:"The study did not report which patient groups the AI diagnosed worst.",q:"Which sentence would be safest in a scientific presentation?",a:"Performance could vary across patient groups; further evidence is needed before making a broader claim.",opts:["Performance could vary across patient groups; further evidence is needed before making a broader claim.","The AI must be biased against elderly patients.","The AI performs equally well for all groups.","The missing subgroup analysis proves the model is unsafe."],level:"calibrated",ex:"The source identifies missing subgroup information, so possibility plus a need for evidence is the appropriate level of certainty."}
  ];


  /* Mission 6 follows the three debate statements and the Useful Language section in the supplied Day 4 worksheet.
     The student's viewpoint is never scored: checkpoints assess rhetorical function and source discipline only. */
  const m6Frame = [
    {q:"Which worksheet phrase is designed to introduce the underlying issue rather than announce your conclusion?",a:"What's really at stake here is…",opts:["What's really at stake here is…","For me, there's little doubt that…","That simply doesn't hold, because…","On balance, the stronger case is…"],ex:"'What's really at stake here is…' frames the issue before you commit to a position."},
    {q:"Which phrase narrows a broad debate to its central question?",a:"The question comes down to…",opts:["The question comes down to…","The evidence actually cuts the other way:","And from there,…","Pulling the threads together,…"],ex:"This phrase is a framing tool: it identifies the core decision the debate is about."},
    {q:"You want to clarify exactly what the group is debating before anyone takes sides. Choose the best opening.",a:"Let's be clear about what we're debating:",opts:["Let's be clear about what we're debating:","I'd argue firmly that…","And yet the problem is…","On balance, the stronger case is…"],ex:"Clarifying the scope first prevents the debate from sliding into a different question."},
    {q:"Which opening frames the responsibility question without already blaming either the doctor or the AI company?",a:"What's really at stake here is how responsibility should be handled when AI contributes to a clinical decision.",opts:["What's really at stake here is how responsibility should be handled when AI contributes to a clinical decision.","Doctors are obviously responsible whenever AI makes an error.","AI companies are obviously responsible whenever AI makes an error.","There is no real accountability question if a human was present."],ex:"A good frame identifies the accountability problem without smuggling in the verdict."},
    {q:"Which sentence neutrally frames the transparency debate from the worksheet?",a:"The question comes down to whether patients should be told when AI is involved in diagnosis or treatment.",opts:["The question comes down to whether patients should be told when AI is involved in diagnosis or treatment.","Patients must always be told, so there is nothing to debate.","Patients never need to know how clinical decisions are supported.","AI involvement is only a technical detail and cannot matter to patients."],ex:"This wording restates the worksheet question without scoring either side as correct."}
  ];

  const m6Evidence = [
    {evidence:"Fast triage experiment",q:"Which statement accurately uses the reported 67% vs 50–55% result?",a:"In one text-based fast-triage experiment, the AI identified the exact or a very close diagnosis more often than the human doctors.",opts:["In one text-based fast-triage experiment, the AI identified the exact or a very close diagnosis more often than the human doctors.","AI has proved that it diagnoses every patient better than every doctor.","The study showed that doctors were correct only 34% of the time in fast triage.","The article says the AI replaced the emergency physicians during the experiment."],ex:"The result supports a comparison in that specific experiment, not a universal claim about all diagnosis."},
    {evidence:"With more detail: 82% vs 70–79%; difference not statistically significant",q:"Which use of this result is source-disciplined?",a:"The AI scored higher numerically, but the article says this difference was not statistically significant.",opts:["The AI scored higher numerically, but the article says this difference was not statistically significant.","The result proves a reliable AI advantage once more detail is available.","The doctors clearly outperformed the AI when more detail was available.","The study did not compare AI and doctors when more detail was available."],ex:"The article reports the higher number and the statistical limitation together."},
    {evidence:"The AI read text records; appearance and distress were not tested",q:"Which argument can this limitation legitimately support?",a:"The experiment did not test all the information a clinician can observe at the bedside.",opts:["The experiment did not test all the information a clinician can observe at the bedside.","Visual assessment has been proved clinically useless.","The AI can assess distress better than a human doctor.","The study proves text data are sufficient for every clinical decision."],ex:"The limitation narrows what the experiment can establish; it does not prove the missing information is irrelevant."},
    {evidence:"The article states that there is not a formal framework for accountability",q:"What does this evidence support in the responsibility debate?",a:"The article presents accountability for AI error as an unresolved issue.",opts:["The article presents accountability for AI error as an unresolved issue.","The article states that doctors are legally responsible in every AI-related error.","The article states that AI companies are legally responsible in every case.","The article says accountability no longer matters because AI is accurate."],ex:"The source identifies an unresolved framework; it does not settle the allocation of responsibility."},
    {evidence:"Dr Wei Xing warned that doctors may defer to AI; subgroup performance information was missing",q:"Which claim best stays within the evidence?",a:"The article raises a risk of over-reliance and notes missing information about which patient groups the AI may perform worse on.",opts:["The article raises a risk of over-reliance and notes missing information about which patient groups the AI may perform worse on.","The study proves the AI is biased against elderly patients.","Doctors never think independently when AI is available.","The article demonstrates equal AI performance across all patient groups."],ex:"The source raises concerns and missing evidence; it does not prove a specific subgroup bias."}
  ];

  const m6Steelman = [
    {q:"Which phrase from the worksheet explicitly asks you to present the strongest version of the opposing view?",a:"The strongest version of that view is…",opts:["The strongest version of that view is…","I'd argue firmly that…","It follows that…","On balance, the stronger case is…"],ex:"Steelman the other side before rebutting it; do not replace it with a weaker caricature."},
    {q:"Which opening acknowledges that an opposing position can sound reasonable?",a:"I can see why one might think…",opts:["I can see why one might think…","For me, there's little doubt that…","And from there,…","The data show that…"],ex:"This phrase recognises plausibility without forcing you to agree."},
    {q:"Which phrase signals a fair concession to the other side?",a:"To be fair to that argument,…",opts:["To be fair to that argument,…","That simply doesn't hold, because…","What's really at stake here is…","Pulling the threads together,…"],ex:"A concession demonstrates that you have understood the opposing argument before responding."},
    {q:"After presenting the other side fairly, which phrase makes a clear rebuttal pivot?",a:"And yet the problem is…",opts:["And yet the problem is…","Let's be clear about what we're debating:","Going back to the study/report,…","So where does that leave us?"],ex:"'And yet…' acknowledges what came before and then opens the counterargument."},
    {q:"Which question tests the strength of an opponent's evidence instead of attacking the person?",a:"How solid is that evidence, really?",opts:["How solid is that evidence, really?","Why would anyone believe that?","That view is ridiculous.","You clearly do not understand AI."],ex:"The worksheet's 'Test the claim' language challenges evidence rather than the speaker."}
  ];

  const m6Verdict = [
    {q:"Which worksheet phrase signals that you are now synthesising the different strands of the debate?",a:"Pulling the threads together,…",opts:["Pulling the threads together,…","My starting point is that…","Take the example of…","The strongest version of that view is…"],ex:"This phrase moves from individual arguments toward synthesis."},
    {q:"Which phrase is designed to transition from discussion to a final judgement?",a:"So where does that leave us?",opts:["So where does that leave us?","The data show that…","I can see why one might think…","And from there,…"],ex:"It explicitly signals that the argument is moving toward a verdict."},
    {q:"Which phrase gives a clear but qualified conclusion rather than pretending there is no complexity?",a:"On balance, the stronger case is…",opts:["On balance, the stronger case is…","There is absolutely no possible objection.","Everyone must agree that…","The debate is over because one number is higher."],ex:"'On balance' allows a conclusion while recognising competing considerations."},
    {evidence:"The article says the AI can look like a useful second-opinion tool, while the authors say the findings do not mean AI replaces doctors.",q:"Which verdict best matches the supplied source?",a:"On balance, the study supports AI as a potentially useful second-opinion tool, but it does not show that AI can replace doctors.",opts:["On balance, the study supports AI as a potentially useful second-opinion tool, but it does not show that AI can replace doctors.","The study proves emergency doctors will soon be unnecessary.","The article shows that AI has no clinical value at all.","Because AI scored highly in one experiment, human judgement is no longer relevant."],ex:"This conclusion preserves both parts of the article: promising performance and a continuing human role."},
    {evidence:"The article discusses human guidance and unresolved accountability, but does not establish a universal disclosure rule.",q:"Which verdict is safest for the statement 'Patients should always be told when AI is involved'?",a:"The article gives relevant reasons to discuss transparency, but it does not by itself settle an 'always tell' rule.",opts:["The article gives relevant reasons to discuss transparency, but it does not by itself settle an 'always tell' rule.","The article proves that every patient must always be told.","The article proves patients should never be told.","The study directly tested patient disclosure policies and found one rule superior."],ex:"The debate question invites argument; the supplied article does not provide a definitive universal disclosure policy."}
  ];

  const boardPrompts = [
    "In ten years, AI will diagnose patients better than doctors.",
    "If an AI makes a diagnostic error, the doctor — not the AI company — should be held responsible.",
    "Patients should always be told when AI is involved in their diagnosis or treatment."
  ];


  let state = loadState();
  let current = null, index = 0, attempts = 0, sessionScore = 0;
  let m2Current = null, m2Index = 0, m2Attempts = 0, m2SessionScore = 0;
  let m3Current = null, m3Index = 0, m3Attempts = 0, m3SessionScore = 0;
  let m4Current = null, m4Index = 0, m4Attempts = 0, m4SessionScore = 0;
  let m5Current = null, m5Index = 0, m5Attempts = 0, m5SessionScore = 0;
  let m6Current = null, m6Index = 0, m6Attempts = 0, m6SessionScore = 0;
  let finalAttempts = 0;

  const $ = id => document.getElementById(id);
  const screen = $("ai4Screen"), feedback = $("ai4Feedback"), workspaceTitle = $("ai4WorkspaceTitle"), workspaceIntro = $("ai4WorkspaceIntro");
  const m2Screen = $("ai4M2Screen"), m2Feedback = $("ai4M2Feedback"), m2WorkspaceTitle = $("ai4M2WorkspaceTitle"), m2WorkspaceIntro = $("ai4M2WorkspaceIntro");
  const m3Screen = $("ai4M3Screen"), m3Feedback = $("ai4M3Feedback"), m3WorkspaceTitle = $("ai4M3WorkspaceTitle"), m3WorkspaceIntro = $("ai4M3WorkspaceIntro");
  const m4Screen = $("ai4M4Screen"), m4Feedback = $("ai4M4Feedback"), m4WorkspaceTitle = $("ai4M4WorkspaceTitle"), m4WorkspaceIntro = $("ai4M4WorkspaceIntro");
  const m5Screen = $("ai4M5Screen"), m5Feedback = $("ai4M5Feedback"), m5WorkspaceTitle = $("ai4M5WorkspaceTitle"), m5WorkspaceIntro = $("ai4M5WorkspaceIntro");
  const m6Screen = $("ai4M6Screen"), m6Feedback = $("ai4M6Feedback"), m6WorkspaceTitle = $("ai4M6WorkspaceTitle"), m6WorkspaceIntro = $("ai4M6WorkspaceIntro");
  const finalScreen = $("day4FinalScreen"), finalFeedback = $("day4FinalFeedback"), finalWorkspaceTitle = $("day4FinalWorkspaceTitle"), finalWorkspaceIntro = $("day4FinalWorkspaceIntro");
  const music = $("day4Music"), musicToggle = $("day4MusicToggle"), audioStatus = $("day4AudioStatus"), clinicalVideo = $("day4ClinicalVideo");
  let musicOn = localStorage.getItem(MUSIC_KEY) === "on";
  let videoPausedMusic = false;


  const finalScenarios = [
    {
      icon:"❤️", title:"Sepsis Alert Review", code:"HIL-01",
      brief:"An AI background-monitoring system flags a possible sepsis pattern while the clinician is focused on another urgent problem. Your task is to audit the language, evidence and human-review boundary — not to diagnose the fictional patient.",
      speak:"Final case H I L zero one. Sepsis Alert Review. An AI background monitoring system flags a possible sepsis pattern while the clinician is focused on another urgent problem. Audit the evidence and keep the human in the loop.",
      items:[
        {skill:"Vocabulary",q:"The system continuously checks heart rate, temperature and oxygen. Which Day 4 verb fits?",a:"to monitor",opts:["to monitor","to complement","to diagnose","to replace"],ex:"To monitor means to watch or check continuously.",model:"The system monitors vital signs in the background."},
        {skill:"Video",q:"In the supplied report, what is the sepsis AI mainly presented as?",a:"An early-warning system that supports the clinical team",opts:["An early-warning system that supports the clinical team","An autonomous doctor that makes the final diagnosis","A device that automatically prescribes antibiotics","A replacement for bedside assessment"],ex:"The report presents background monitoring and early warning, not autonomous clinical decision-making.",model:"The AI can flag a pattern, but the clinical team remains responsible for interpretation and action."},
        {skill:"Human oversight",q:"The AI alert appears while the doctor is focused on another possible emergency. What best matches the report?",a:"The alert can draw attention to a developing pattern that might otherwise be missed.",opts:["The alert can draw attention to a developing pattern that might otherwise be missed.","The alert proves the diagnosis and ends the need for review.","The AI should take over the consultation immediately.","The doctor should ignore all other information once the alert appears."],ex:"The answer key describes the AI as a background safety system that can alert the team early.",model:"The alert may help the team notice a developing pattern earlier."},
        {skill:"Silent letters",q:"Which letter is silent in subtle?",a:"b",opts:["b","t","l","s"],ex:"The worksheet marks su(b)tle: the b is written but not pronounced.",model:"subtle /ˈsʌtl/"},
        {skill:"Evidence",q:"Which figures does the supplied report give for Cleveland Clinic sepsis?",a:"About 30,000 cases a year and roughly 2,000 deaths",opts:["About 30,000 cases a year and roughly 2,000 deaths","About 2,000 cases and 30,000 deaths","67 cases and 55 deaths","89 cases and 34 deaths"],ex:"Those are the figures given in the teacher answer key for the video.",model:"The report cites about 30,000 cases and roughly 2,000 deaths a year."},
        {skill:"Limitations",q:"Which statement keeps the AI alert in its proper role?",a:"It is a support signal that still needs human clinical judgement.",opts:["It is a support signal that still needs human clinical judgement.","An alert from AI is automatically a confirmed diagnosis.","Once an AI system is approved, human judgement becomes optional.","A faster alert means the system cannot be wrong."],ex:"Day 4 repeatedly frames AI as complementary to clinicians, not a replacement.",model:"The alert should complement human judgement, not replace it."},
        {skill:"Modals",q:"The alert raises a possible explanation but does not prove it. Which sentence is best calibrated?",a:"The pattern may indicate sepsis and should be reviewed by the clinical team.",opts:["The pattern may indicate sepsis and should be reviewed by the clinical team.","The pattern must prove sepsis in every case.","The pattern will always be correct.","The pattern cannot require human review."],ex:"May expresses possibility without overclaiming.",model:"The pattern may indicate sepsis and should be reviewed by the clinical team."},
        {skill:"Overclaiming",q:"Which headline goes too far beyond the supplied report?",a:"AI eliminates the need for doctors in sepsis care",opts:["AI eliminates the need for doctors in sepsis care","AI monitoring may help teams identify sepsis earlier","AI can support clinicians by monitoring vital signs","The report argues for AI to complement human intelligence"],ex:"The report explicitly rejects replacement of doctors.",model:"Earlier warning is not the same claim as replacing clinicians."},
        {skill:"Accountability",q:"Which statement is most source-disciplined about responsibility?",a:"The Day 4 material keeps the final decision human and also notes that AI accountability frameworks remain unresolved.",opts:["The Day 4 material keeps the final decision human and also notes that AI accountability frameworks remain unresolved.","The article proves that the AI company is always legally responsible.","The article proves that the doctor is always legally responsible.","The study shows that accountability no longer matters when AI is accurate."],ex:"The article says there is not a formal framework right now for accountability; it does not settle universal liability.",model:"Human oversight remains central, while the wider accountability framework is unresolved."},
        {skill:"Integrated judgement",q:"Which final control-room message best reflects Day 4?",a:"Use the alert as additional evidence, state uncertainty clearly, and keep the clinician responsible for the final decision.",opts:["Use the alert as additional evidence, state uncertainty clearly, and keep the clinician responsible for the final decision.","Treat the AI output as a diagnosis because it is faster.","Ignore AI completely because it can make errors.","Tell the patient the system is infallible if it has regulatory approval."],ex:"This combines the Day 4 themes: useful AI support, careful claims and human final judgement.",model:"AI can support the decision, but it should not replace human judgement."}
      ]
    },
    {
      icon:"📄", title:"Text-Only Triage Audit", code:"HIL-02",
      brief:"An AI reviews an electronic health record and produces a triage opinion. It has access to text data, but not the patient's appearance or level of distress. Audit what can and cannot be claimed from that evidence.",
      speak:"Final case H I L zero two. Text Only Triage Audit. The AI has text records but cannot assess appearance or distress. Audit what the evidence supports.",
      items:[
        {skill:"Vocabulary",q:"A sign that is difficult to notice is described as…",a:"subtle",opts:["subtle","life-threatening","FDA-approved","cyberchondria"],ex:"Subtle means hard to notice or not obvious.",model:"A subtle clinical sign may be easy to miss."},
        {skill:"Video",q:"What overall principle does the supplied video emphasise?",a:"AI should complement human intelligence; humans make the final decision.",opts:["AI should complement human intelligence; humans make the final decision.","AI should replace doctors in emergency departments.","AI should only be used for research.","Patients should diagnose themselves with AI."],ex:"That is the central message in the worksheet and answer key.",model:"AI should complement doctors rather than replace them."},
        {skill:"Human oversight",q:"Why is a human review especially important in this final case?",a:"The AI cannot assess visual appearance or level of distress from the text record alone.",opts:["The AI cannot assess visual appearance or level of distress from the text record alone.","Text records contain no medical information at all.","Human clinicians never use written records.","The study proved visual assessment is unnecessary."],ex:"The article explicitly identifies appearance and distress as untested inputs.",model:"The AI is closer to a second opinion based on paperwork than a complete clinical assessment."},
        {skill:"Silent letters",q:"Which letter is silent in receipt?",a:"p",opts:["p","c","t","r"],ex:"The Presentation Check-in lists recei(p)t.",model:"receipt"},
        {skill:"Evidence",q:"With minimal information, what diagnostic accuracy did the article report?",a:"AI 67% versus doctors 50–55%",opts:["AI 67% versus doctors 50–55%","AI 89% versus doctors 34%","AI 82% versus doctors 70–79%, statistically significant","Doctors 67% versus AI 50–55%"],ex:"The 67% versus 50–55% result comes from the fast triage experiment.",model:"In that text-record experiment, the AI reached 67% against 50–55% for the doctors."},
        {skill:"Limitations",q:"Which conclusion is NOT supported by the study design described in the article?",a:"The AI has proved it can perform every part of a real bedside assessment better than doctors.",opts:["The AI has proved it can perform every part of a real bedside assessment better than doctors.","The AI performed strongly on the text information it was given.","The study did not test the AI's reading of appearance or distress.","The researchers described the system as more like a second opinion based on paperwork."],ex:"The study did not test all parts of real clinical assessment.",model:"Strong performance on text records does not establish superiority across every part of bedside medicine."},
        {skill:"Modals",q:"Which sentence best reports a limitation?",a:"The results may not generalise to situations where visual assessment is essential.",opts:["The results may not generalise to situations where visual assessment is essential.","The results must apply to every emergency department.","The study will prove all future AI systems safe.","The limitation cannot matter because the score was high."],ex:"May not generalise is appropriately cautious.",model:"The results may not generalise to every clinical situation."},
        {skill:"Overclaiming",q:"The AI rose to 82% with more detail, versus 70–79% for humans, but the difference was not statistically significant. Which claim is calibrated?",a:"The AI scored higher in this comparison, but the reported difference was not statistically significant.",opts:["The AI scored higher in this comparison, but the reported difference was not statistically significant.","The study proved beyond doubt that AI is superior to doctors.","The doctors performed exactly the same as the AI.","Statistical significance is irrelevant when the percentage is larger."],ex:"The article explicitly includes the non-significance caveat.",model:"A higher observed percentage is not the same as a statistically significant difference."},
        {skill:"Accountability",q:"What concern does Dr Wei Xing raise in the article?",a:"Doctors may unconsciously defer to the AI instead of thinking independently.",opts:["Doctors may unconsciously defer to the AI instead of thinking independently.","Patients will refuse every AI-assisted consultation.","All AI errors are caused by non-English-speaking patients.","The article says doctors should never see the AI output."],ex:"The source warns about unconscious deference as AI becomes routine.",model:"Human oversight also means resisting automatic deference to the system."},
        {skill:"Integrated judgement",q:"What is the strongest final audit conclusion?",a:"The text-only result is promising, but the limits of the input and the need for independent human judgement must stay visible.",opts:["The text-only result is promising, but the limits of the input and the need for independent human judgement must stay visible.","The score proves bedside assessment is obsolete.","Because the study has limitations, none of its findings are useful.","The AI result should be accepted without review whenever it exceeds 50%."],ex:"This preserves both the positive result and the study limitation.",model:"Promising evidence should be reported with its limitations, not turned into a universal claim."}
      ]
    },
    {
      icon:"🧠", title:"Neuro Signal Review", code:"HIL-03",
      brief:"A neurological AI reviews EEG recordings and flags a possible seizure pattern within seconds. Your task is to explain what the system does, pronounce the key language accurately and keep the output within the limits described in the report.",
      speak:"Final case H I L zero three. Neuro Signal Review. An AI reviews E E G recordings and flags a possible seizure pattern. Explain the system carefully and keep the human in the loop.",
      items:[
        {skill:"Vocabulary",q:"What are brainwaves in the Day 4 vocabulary?",a:"The electrical patterns of activity in the brain",opts:["The electrical patterns of activity in the brain","Measurements such as temperature and oxygen","A sudden infection response","Anxiety caused by symptom searches"],ex:"That is the worksheet definition of brainwaves.",model:"The model is trained on brainwaves recorded by EEG."},
        {skill:"Video",q:"What does the report say the epilepsy AI can do?",a:"Spot the electrical pattern of a seizure very early, within seconds",opts:["Spot the electrical pattern of a seizure very early, within seconds","Replace the neurologist and prescribe treatment automatically","Diagnose every neurological condition from a photograph","Prevent every seizure before it begins"],ex:"The answer key says it detects the electrical pattern within seconds.",model:"The system can flag seizure patterns rapidly from EEG data."},
        {skill:"Human oversight",q:"Which statement keeps the system's role accurate?",a:"Rapid pattern detection can support clinicians, but it does not remove the need for human interpretation and care decisions.",opts:["Rapid pattern detection can support clinicians, but it does not remove the need for human interpretation and care decisions.","A faster algorithm makes clinical review unnecessary.","The system can infer everything about the patient from brainwaves alone.","An AI alert should automatically become a treatment order."],ex:"The overall Day 4 principle remains human-in-the-loop.",model:"Fast pattern detection is a support function, not the whole clinical encounter."},
        {skill:"Silent letters",q:"Which initial letter is silent in psychology?",a:"p",opts:["p","s","c","y"],ex:"The Presentation Check-in lists (p)sychology and (p)psychiatry patterns.",model:"psychology"},
        {skill:"Evidence",q:"Which description of the epilepsy system is supported by the supplied video material?",a:"It is trained on brainwaves and reviews recordings sent from around the world.",opts:["It is trained on brainwaves and reviews recordings sent from around the world.","It is trained only on patient photographs.","It measures blood sugar continuously.","It is described as replacing all EEG specialists."],ex:"Those details are in the teacher answer key.",model:"The model is trained on EEG brainwaves and can review recordings from many locations."},
        {skill:"Limitations",q:"What would be an overreach from the information supplied?",a:"Claiming that detecting an EEG seizure pattern means the AI understands every aspect of the patient's condition.",opts:["Claiming that detecting an EEG seizure pattern means the AI understands every aspect of the patient's condition.","Saying the system analyses electrical brain activity.","Saying it can flag a pattern quickly.","Saying human doctors still matter in the care process."],ex:"The source describes a specific detection task, not complete clinical understanding.",model:"A narrow successful task should not be described as complete clinical reasoning."},
        {skill:"Modals",q:"The EEG pattern is compatible with a seizure, but the final clinical interpretation remains human. Which sentence is best?",a:"The pattern may indicate a seizure and should be reviewed in clinical context.",opts:["The pattern may indicate a seizure and should be reviewed in clinical context.","The pattern must prove a seizure with no further review.","The AI will always identify every seizure correctly.","The pattern can't need clinical context."],ex:"May indicate keeps the claim appropriately cautious.",model:"The pattern may indicate a seizure; clinical context still matters."},
        {skill:"Overclaiming",q:"Which sentence best avoids the 'AI replaces doctors' narrative?",a:"The system can review large volumes of EEG data quickly and complement specialist judgement.",opts:["The system can review large volumes of EEG data quickly and complement specialist judgement.","The system makes neurologists unnecessary.","The system is more human than a human doctor.","The system proves that every AI is safe for routine use."],ex:"Complement is the source-aligned verb.",model:"AI can complement specialist judgement without replacing the clinician."},
        {skill:"Accountability",q:"Which broader Day 4 caution still applies even when an AI performs a narrow task well?",a:"Humans may over-rely on the output, so independent judgement and accountability remain important.",opts:["Humans may over-rely on the output, so independent judgement and accountability remain important.","Narrow-task accuracy removes every accountability question.","If the system is fast, patients do not need human guidance.","The article says regulatory approval makes errors impossible."],ex:"The article explicitly raises deference and accountability concerns.",model:"Good performance does not eliminate the need for independent human judgement."},
        {skill:"Integrated judgement",q:"Which final message best summarises this case?",a:"Use rapid EEG pattern detection as a clinical support tool, describe uncertainty carefully and keep treatment decisions human-led.",opts:["Use rapid EEG pattern detection as a clinical support tool, describe uncertainty carefully and keep treatment decisions human-led.","Turn every AI flag into an automatic treatment decision.","Reject the technology because it is not a human clinician.","Describe the algorithm as a complete neurological examination."],ex:"This combines the specific benefit with the Day 4 human-in-the-loop boundary.",model:"Fast detection can help; human clinical judgement remains essential."}
      ]
    },
    {
      icon:"🦴", title:"Spine Navigation Control", code:"HIL-04",
      brief:"A surgical team uses a live 3-D navigation system during a spine operation. Audit how the technology should be described, what benefits the report attributes to it, and what still belongs to the human surgical team.",
      speak:"Final case H I L zero four. Spine Navigation Control. A surgical team uses a live three D navigation system. Audit what the tool does and what still belongs to the human team.",
      items:[
        {skill:"Vocabulary",q:"Which verb means 'to work alongside something and add to it'?",a:"to complement",opts:["to complement","to monitor","to replace","to diagnose"],ex:"To complement is one of the core Day 4 terms.",model:"The navigation system is designed to complement the surgical team."},
        {skill:"Video",q:"What comparison does the spine surgeon make for the Proprio tool?",a:"A GPS in your car",opts:["A GPS in your car","A security system","A microscope","A textbook"],ex:"The first-viewing answer is 'a GPS in your car'.",model:"The tool gives the surgeon a live 3-D GPS-style view of the spine."},
        {skill:"Human oversight",q:"Which description avoids turning navigation support into autonomous surgery?",a:"The tool gives the surgeon real-time spatial information; the surgeon still performs and directs the operation.",opts:["The tool gives the surgeon real-time spatial information; the surgeon still performs and directs the operation.","The AI independently performs the operation without a surgeon.","The tool makes surgical training unnecessary.","The navigation display decides every treatment choice automatically."],ex:"The report describes navigation support, not an autonomous surgeon.",model:"The technology supports the surgeon with real-time information."},
        {skill:"Silent letters",q:"Which letter is silent in muscle?",a:"c",opts:["c","s","l","m"],ex:"The Presentation Check-in lists mus(c)le.",model:"muscle /ˈmʌsl/"},
        {skill:"Evidence",q:"What patient benefits does the answer key associate with the 3-D navigation tool?",a:"A shorter operation, less time under anaesthetic and less bleeding",opts:["A shorter operation, less time under anaesthetic and less bleeding","Guaranteed pain-free recovery and no complications","No need for anaesthetic","Automatic discharge immediately after surgery"],ex:"Those are the specific benefits stated in the teacher answer key.",model:"The report links faster navigation with less time under anaesthetic and less bleeding."},
        {skill:"Limitations",q:"Which statement would go beyond what the supplied report says?",a:"The navigation system has proved it can replace the surgeon in spine operations.",opts:["The navigation system has proved it can replace the surgeon in spine operations.","The tool provides a live 3-D view.","The surgeon compares it to GPS.","The report describes benefits linked to shorter operating time."],ex:"Replacement is not supported; the source presents a tool used by the surgeon.",model:"A support technology should not be described as an autonomous surgeon without evidence."},
        {skill:"Modals",q:"You want to describe a plausible benefit without claiming it is guaranteed in every operation. Which sentence is best?",a:"The navigation system may help shorten operating time.",opts:["The navigation system may help shorten operating time.","The navigation system will always eliminate surgical risk.","The navigation system must make every operation successful.","The navigation system can't require a surgeon."],ex:"May help keeps the claim appropriately limited.",model:"The navigation system may help shorten operating time."},
        {skill:"Overclaiming",q:"Which statement is WELL CALIBRATED?",a:"The report presents the system as a useful navigation aid, not as evidence that AI can replace surgeons.",opts:["The report presents the system as a useful navigation aid, not as evidence that AI can replace surgeons.","The report proves AI surgery is better in every hospital.","A live 3-D image means human expertise is obsolete.","Because the operation can be shorter, every patient outcome is guaranteed to improve."],ex:"This distinguishes the observed function from claims the source does not make.",model:"Specific task benefit does not equal proof of wholesale replacement."},
        {skill:"Accountability",q:"Which Day 4 principle is most relevant if the navigation output and the surgeon's judgement differ?",a:"The technology should complement human judgement; the final clinical decision remains human.",opts:["The technology should complement human judgement; the final clinical decision remains human.","The algorithm should automatically overrule the surgeon.","The surgeon should never look at algorithmic output.","The article establishes a universal legal rule for every disagreement."],ex:"The human-in-the-loop principle is the central boundary of the supplied material.",model:"Decision support can inform the surgeon without replacing responsibility for the final decision."},
        {skill:"Integrated judgement",q:"Which final briefing is strongest?",a:"Describe the tool's specific navigation benefit, avoid universal claims and keep the surgical team visibly responsible for the operation.",opts:["Describe the tool's specific navigation benefit, avoid universal claims and keep the surgical team visibly responsible for the operation.","Call the system an autonomous surgeon because it uses AI.","Ignore the reported benefits because AI has limitations.","Present the tool as proof that all AI systems are safe."],ex:"This is the Day 4 skill in one sentence: specific evidence, calibrated language, human responsibility.",model:"Be precise about what the tool does, what the source shows and what remains a human decision."}
      ]
    }
  ];

  function freshState() {
    return {
      completed: {lexicon:false, signals:false, boundaries:false, clearance:false},
      mission2Completed: {overview:false, sepsis:false, tools:false, human:false},
      mission3Completed: {conflict:false, review:false, silent:false, brief:false},
      mission4Completed: {numbers:false, headlines:false, limits:false, tfng:false},
      mission5Completed: {dial:false, overclaim:false, future:false, claim:false},
      mission6Completed: {frame:false, evidence:false, steelman:false, verdict:false},
      firstTryScore: 0,
      mission2FirstTryScore: 0,
      mission3FirstTryScore: 0,
      mission4FirstTryScore: 0,
      mission5FirstTryScore: 0,
      mission6FirstTryScore: 0,
      started: false,
      mission2Started: false,
      mission3Started: false,
      mission4Started: false,
      mission5Started: false,
      mission6Started: false,
      finalStarted: false,
      finalComplete: false,
      finalScenario: -1,
      finalIndex: 0,
      finalScore: 0,
      finalSkillScores: {},
      finalSkillMax: {},
      boardPrompt: 0,
      boardStance: "",
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
        mission4Completed: {...base.mission4Completed, ...(saved.mission4Completed || {})},
        mission5Completed: {...base.mission5Completed, ...(saved.mission5Completed || {})},
        mission6Completed: {...base.mission6Completed, ...(saved.mission6Completed || {})}
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

  function m5ItemsFor(name) {
    const bank = name === "dial" ? m5Dial : name === "overclaim" ? m5Overclaim : name === "future" ? m5Future : m5Claim;
    return bank.map(x => ({...x, opts: shuffle(x.opts)}));
  }

  function m6ItemsFor(name) {
    const bank = name === "frame" ? m6Frame : name === "evidence" ? m6Evidence : name === "steelman" ? m6Steelman : m6Verdict;
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
    updateMission5UI();
    updateMission6UI();
    updateFinalUI();
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



  function updateMission5UI() {
    if (!$('day4Mission5')) return;
    const m4Cleared = M4_ORDER.every(a=>state.mission4Completed[a]);
    const done = M5_ORDER.filter(a=>state.mission5Completed[a]).length;
    $('day4Mission5').classList.toggle('is-locked', !m4Cleared);
    $('day4Mission5ProgressText').textContent = `${done} / 4`;
    $('day4Mission5ProgressBar').style.width = `${done*25}%`;
    $('day4Mission5Score').textContent = state.mission5FirstTryScore;
    const ids={dial:'ai4M5StatusDial',overclaim:'ai4M5StatusOverclaim',future:'ai4M5StatusFuture',claim:'ai4M5StatusClaim'};
    M5_ORDER.forEach((a,i)=>{
      const btn=document.querySelector(`[data-ai4-m5="${a}"]`);
      const unlocked=m4Cleared && (i===0 || state.mission5Completed[M5_ORDER[i-1]]);
      btn.disabled=!unlocked;
      $(ids[a]).textContent=state.mission5Completed[a]?'CLEARED':unlocked?'READY':'LOCKED';
    });
    const all=done===4;
    $('day4Mission5Complete').classList.toggle('is-locked', !all);
    $('day4M5CompleteTitle').textContent=all?'🎚️ Certainty Calibrated.':'Certainty Calibration is not cleared yet.';
    $('day4M5CompleteText').textContent=all?'You matched the strength of your language to the evidence, controlled overclaiming and used prediction forms accurately.':'Complete all four calibration activities.';
    $('day4Mission6Button').disabled=!all;
    $('day4Mission6Button').textContent=all?'Mission 6 · Accountability Board →':'🔒 Mission 6 · Accountability Board';
    const r5=$('ai4RoadmapM5'),r5s=$('ai4RoadmapM5State'),r6=$('ai4RoadmapM6'),r6s=$('ai4RoadmapM6State');
    if(r5){r5.classList.toggle('ready',m4Cleared&&!all);r5.classList.toggle('cleared',all);r5s.textContent=all?'05 · CLEARED':m4Cleared?'05 · READY':'05 · LOCKED';}
    if(r6){r6.classList.toggle('ready',all);r6s.textContent=all?'06 · READY':'06 · LOCKED';}
    if(m4Cleared && !state.mission5Started && m5Screen){m5Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🎚️</span><h3>Certainty Calibration ready</h3><p>Open Set the Certainty Level to begin.</p></div>';m5WorkspaceIntro.textContent='Open Set the Certainty Level to begin.';}
  }


  function updateBoardBrief() {
    const brief=$("day4BoardBrief"), prompt=$("day4BoardPromptText"), status=$("day4StanceStatus");
    if(!brief) return;
    const all=M6_ORDER.every(a=>state.mission6Completed[a]);
    brief.classList.toggle("is-locked",!all);
    if(!all){prompt.textContent="Complete Mission 6 to draw a board case.";status.textContent="Choose any position. Your viewpoint is not scored.";return;}
    const idx=Math.max(0,Math.min(boardPrompts.length-1,Number(state.boardPrompt)||0));
    prompt.textContent=`“${boardPrompts[idx]}”`;
    document.querySelectorAll("[data-ai4-stance]").forEach(b=>b.classList.toggle("selected",b.dataset.ai4Stance===state.boardStance));
    status.textContent=state.boardStance?`Position selected: ${state.boardStance}. Now build a 60-second response with Frame → Evidence → Other side → Verdict.`:"Choose any position. The site does not grade your opinion.";
  }

  function updateMission6UI() {
    if(!$("day4Mission6")) return;
    const m5Cleared=M5_ORDER.every(a=>state.mission5Completed[a]);
    const done=M6_ORDER.filter(a=>state.mission6Completed[a]).length;
    $("day4Mission6").classList.toggle("is-locked",!m5Cleared);
    $("day4Mission6ProgressText").textContent=`${done} / 4`;
    $("day4Mission6ProgressBar").style.width=`${done*25}%`;
    $("day4Mission6Score").textContent=state.mission6FirstTryScore;
    const ids={frame:"ai4M6StatusFrame",evidence:"ai4M6StatusEvidence",steelman:"ai4M6StatusSteelman",verdict:"ai4M6StatusVerdict"};
    M6_ORDER.forEach((a,i)=>{
      const btn=document.querySelector(`[data-ai4-m6="${a}"]`);
      const unlocked=m5Cleared&&(i===0||state.mission6Completed[M6_ORDER[i-1]]);
      if(btn) btn.disabled=!unlocked;
      if($(ids[a])) $(ids[a]).textContent=state.mission6Completed[a]?"CLEARED":unlocked?"READY":"LOCKED";
    });
    const all=done===4;
    $("day4Mission6Complete").classList.toggle("is-locked",!all);
    $("day4M6CompleteTitle").textContent=all?"⚖️ AI Accountability Advisor.":"Accountability Board is not cleared yet.";
    $("day4M6CompleteText").textContent=all?"You framed contested questions, used the source carefully, represented counterarguments fairly and reached calibrated verdicts without turning an opinion into an answer key.":"Complete all four argument stages.";
    $("day4FinalButton").disabled=!all;
    $("day4FinalButton").textContent=all?"FINAL · Human-in-the-Loop Test →":"🔒 FINAL · Human-in-the-Loop Test";
    $("day4Final").classList.toggle("is-locked",!all);
    const r6=$("ai4RoadmapM6"),r6s=$("ai4RoadmapM6State"),rf=$("ai4RoadmapFinal"),rfs=$("ai4RoadmapFinalState");
    if(r6){r6.classList.toggle("ready",m5Cleared&&!all);r6.classList.toggle("cleared",all);r6s.textContent=all?"06 · CLEARED":m5Cleared?"06 · READY":"06 · LOCKED";}
    if(rf){rf.classList.toggle("ready",all);if(rfs)rfs.textContent=all?"FINAL · READY":"FINAL · LOCKED";}
    if(m5Cleared&&!state.mission6Started&&m6Screen){m6Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">⚖️</span><h3>Accountability Board ready</h3><p>Open Frame the Issue. Your viewpoint will never be scored.</p></div>';m6WorkspaceIntro.textContent="Open Frame the Issue. Your viewpoint will never be scored.";}
    updateBoardBrief();
  }



  function getFinalScenario() {
    const i=Number(state.finalScenario);
    return Number.isInteger(i)&&i>=0&&i<finalScenarios.length?finalScenarios[i]:null;
  }

  function chooseFinalScenario(previous=-1) {
    const pool=finalScenarios.map((_,i)=>i).filter(i=>i!==previous);
    return pool[Math.floor(Math.random()*pool.length)];
  }

  function initFinalSkills(scenario) {
    const max={},scores={};
    scenario.items.forEach(it=>{max[it.skill]=(max[it.skill]||0)+10;});
    Object.keys(max).forEach(k=>scores[k]=0);
    state.finalSkillMax=max;state.finalSkillScores=scores;
  }

  function finalRank(score) {
    if(score>=90) return {icon:"🧠",title:"Human-in-the-Loop Ready",text:"Excellent control of evidence, uncertainty and human oversight across the Day 4 material."};
    if(score>=75) return {icon:"✅",title:"Clinical AI Reviewer",text:"Strong performance. You kept most claims calibrated and the human-review boundary visible."};
    return {icon:"🔁",title:"AI Control Trainee",text:"Final completed. Draw another case to reinforce evidence reading, cautious language and accountability."};
  }

  function updateFinalUI() {
    if(!$("day4Final")) return;
    const unlocked=M6_ORDER.every(a=>state.mission6Completed[a]);
    $("day4Final").classList.toggle("is-locked",!unlocked);
    $("startDay4Final").disabled=!unlocked;
    const s=getFinalScenario();
    $("day4FinalScore").textContent=`${Number(state.finalScore)||0} / 100`;
    $("day4FinalProgressText").textContent=`${Math.min(Number(state.finalIndex)||0,10)} / 10`;
    $("day4FinalProgressBar").style.width=`${Math.min(Number(state.finalIndex)||0,10)*10}%`;
    if(!unlocked){
      $("startDay4Final").textContent="🔒 Complete Mission 6 first";$("hearDay4FinalBrief").disabled=true;$("day4FinalCaseIcon").textContent="🧠";$("day4FinalCaseTitle").textContent="Locked";$("day4FinalCaseBrief").textContent="Complete Mission 6 to receive your final case.";$("day4FinalResult").classList.add("is-locked");return;
    }
    $("startDay4Final").textContent=state.finalStarted?(state.finalComplete?"Draw another case →":"Resume final test →"):"Draw final case →";
    if(s){$("day4FinalCaseIcon").textContent=s.icon;$("day4FinalCaseTitle").textContent=`${s.title} · ${s.code}`;$("day4FinalCaseBrief").textContent=s.brief;$("hearDay4FinalBrief").disabled=false;}
    else{$("day4FinalCaseIcon").textContent="🎯";$("day4FinalCaseTitle").textContent="Final case ready to draw";$("day4FinalCaseBrief").textContent="Start the test to receive one of four fictional AI-control cases.";$("hearDay4FinalBrief").disabled=true;}
    $("day4FinalResult").classList.toggle("is-locked",!state.finalComplete);
    const rf=$("ai4RoadmapFinal"),rfs=$("ai4RoadmapFinalState");
    if(rf){rf.classList.toggle("ready",unlocked&&!state.finalComplete);rf.classList.toggle("final-cleared",!!state.finalComplete);}
    if(rfs) rfs.textContent=state.finalComplete?"FINAL · CLEARED":unlocked?"FINAL · READY":"FINAL · LOCKED";
  }

  function startFinal(forceNew=false) {
    if(!M6_ORDER.every(a=>state.mission6Completed[a])) return;
    if(musicOn && (!clinicalVideo || clinicalVideo.paused)) startMusicPlayback();
    if(forceNew || !state.finalStarted || state.finalComplete){
      const previous=Number(state.finalScenario);
      state.finalStarted=true;state.finalComplete=false;state.finalScenario=chooseFinalScenario(previous);state.finalIndex=0;state.finalScore=0;state.finalSkillScores={};state.finalSkillMax={};
      initFinalSkills(getFinalScenario());
    }
    finalAttempts=0;save();updateFinalUI();renderFinal();
    $("day4Final").scrollIntoView({behavior:"smooth",block:"start"});
  }

  function renderFinal() {
    const s=getFinalScenario();if(!s||state.finalComplete)return;
    const i=Number(state.finalIndex)||0,it=s.items[i];if(!it){completeFinal();return;}
    finalWorkspaceTitle.textContent=`${s.title} · Checkpoint ${i+1}`;
    finalWorkspaceIntro.textContent="Use only the supplied Day 4 evidence and the information in this fictional control-room case.";
    $("day4FinalCheckpoint").textContent=`${i+1} / 10`;
    const opts=shuffle(it.opts);
    finalScreen.innerHTML=`<span class="ai4-final-skill-chip">${it.skill.toUpperCase()}</span><div class="ai4-final-case-card"><span>${s.code} · CONTROL NOTE</span><strong>${s.brief}</strong></div><div class="ai4-question-top"><span>FINAL · CHECKPOINT ${i+1}</span><b>${i+1} / 10</b></div><h3 class="ai4-question">${it.q}</h3><div class="ai4-options">${opts.map((o,n)=>`<button class="ai4-option" type="button" data-final-answer="${encodeURIComponent(o)}"><b>${String.fromCharCode(65+n)}</b> · ${o}</button>`).join("")}</div><div class="ai4-source-guardrail"><strong>Human-in-the-loop rule:</strong> score the English and evidence discipline, not a diagnosis or personal opinion.</div>`;
    finalScreen.querySelectorAll("[data-final-answer]").forEach(b=>b.addEventListener("click",answerFinal));
    finalFeedback.textContent="";finalFeedback.className="ai4-feedback";finalScreen.focus();
  }

  function answerFinal(e) {
    const s=getFinalScenario(),it=s.items[Number(state.finalIndex)||0],chosen=decodeURIComponent(e.currentTarget.dataset.finalAnswer),good=chosen===it.a;finalAttempts++;
    if(!good){
      e.currentTarget.disabled=true;e.currentTarget.classList.add("wrong");
      finalFeedback.className="ai4-feedback bad";finalFeedback.innerHTML=`<strong>Re-check the evidence and try again.</strong> ${it.ex}`;cue(false);save();return;
    }
    finalScreen.querySelectorAll(".ai4-option").forEach(btn=>{btn.disabled=true;const v=decodeURIComponent(btn.dataset.finalAnswer);if(v===it.a)btn.classList.add("correct");});
    const pts=finalAttempts===1?10:6;
    state.finalScore=(Number(state.finalScore)||0)+pts;state.finalSkillScores[it.skill]=(Number(state.finalSkillScores[it.skill])||0)+pts;
    finalFeedback.className="ai4-feedback good";finalFeedback.innerHTML=`<strong>Control check passed · +${pts}</strong> ${it.ex}<div class="ai4-final-model"><strong>MODEL LINE</strong><br>${it.model}</div>`;cue(true);save();
    const next=document.createElement("button");next.type="button";next.className="ai4-primary ai4-next";next.textContent=(Number(state.finalIndex)||0)===9?"Finish Day 4 →":"Next final checkpoint →";next.addEventListener("click",()=>{state.finalIndex=(Number(state.finalIndex)||0)+1;finalAttempts=0;save();updateFinalUI();if(state.finalIndex>=10)completeFinal();else renderFinal();});finalFeedback.appendChild(document.createElement("br"));finalFeedback.appendChild(next);updateFinalUI();
  }

  function completeFinal() {
    state.finalComplete=true;state.finalIndex=10;save();updateFinalUI();
    const score=Number(state.finalScore)||0,rank=finalRank(score),s=getFinalScenario();
    $("day4FinalResultBadge").textContent=rank.icon;$("day4FinalResultTitle").textContent=rank.title;$("day4FinalResultText").textContent=`${s.title} complete · ${score}/100. ${rank.text}`;
    const skills=Object.keys(state.finalSkillMax||{});
    $("day4FinalSkillBreakdown").innerHTML=skills.map(k=>{const got=Number(state.finalSkillScores[k])||0,max=Number(state.finalSkillMax[k])||10,pct=Math.round((got/max)*100);return `<article><div><b>${k}</b><span>${got}/${max}</span></div><div class="ai4-final-mini-meter"><i style="width:${pct}%"></i></div></article>`;}).join("");
    finalScreen.innerHTML=`<div class="ai4-waiting"><span aria-hidden="true">${rank.icon}</span><h3>Day 4 final complete</h3><p>${score}/100 · ${rank.title}</p></div>`;finalFeedback.textContent="";$("day4FinalResult").classList.remove("is-locked");$("ai4RoadmapFinal").classList.add("final-cleared");$("ai4RoadmapFinalState").textContent="FINAL · CLEARED";audioStatus.textContent="Day 4 complete. Human-in-the-Loop Test cleared.";cue(true);save();
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


  function startM5(name) {
    if (!M4_ORDER.every(a=>state.mission4Completed[a])) return;
    if (musicOn && (!clinicalVideo || clinicalVideo.paused)) startMusicPlayback();
    m5Current={name,items:shuffle(m5ItemsFor(name))};m5Index=0;m5Attempts=0;m5SessionScore=0;state.mission5Started=true;save();
    m5WorkspaceTitle.textContent=m5Meta[name][0];m5WorkspaceIntro.textContent=m5Meta[name][1];m5Feedback.textContent='';m5Feedback.className='ai4-feedback';renderM5();
  }

  function meterFor(it) {
    const lvl=it.level||'calibrated';
    return `<div class="ai4-calibration-meter" data-level="${lvl}"><div class="meter-labels"><span>TOO WEAK</span><span>CALIBRATED</span><span>STRONG / CERTAIN</span></div><div class="meter-track"><i class="meter-pin"></i></div></div>`;
  }

  function renderM5() {
    const it=m5Current.items[m5Index];if(!it){completeM5Activity();return;}
    const label=m5Current.name==='dial'?'CONFIDENCE DIAL':m5Current.name==='overclaim'?'OVERCLAIMING DETECTOR':m5Current.name==='future'?'MEDICINE 2035':'EVIDENCE → CLAIM';
    const evidence=it.evidence?`<div class="ai4-evidence-chip"><span>EVIDENCE</span><strong>${it.evidence}</strong></div>`:'';
    const claim=it.claim?`<div class="ai4-claim-card"><span>CLAIM</span><strong>${it.claim}</strong></div>`:'';
    const guide=m5Current.name==='future'?'<div class="ai4-source-guardrail"><strong>Prediction forms:</strong> will · won’t · is likely to · is unlikely to · may / might / could. Score the English form, not whether the future prediction comes true.</div>':'<div class="ai4-source-guardrail"><strong>Calibration rule:</strong> strong evidence can support strong language; incomplete or indirect evidence needs cautious language.</div>';
    m5Screen.innerHTML=`<span class="ai4-feed-label">${label}</span><div class="ai4-question-top"><span>CERTAINTY · CHECKPOINT ${m5Index+1}</span><b>${m5Index+1} / ${m5Current.items.length}</b></div>${evidence}${claim}${meterFor(it)}<h3 class="ai4-question">${it.q}</h3><div class="ai4-options">${it.opts.map((o,i)=>`<button class="ai4-option" type="button" data-m5-answer="${encodeURIComponent(o)}"><b>${String.fromCharCode(65+i)}</b> · ${o}</button>`).join('')}</div>${guide}`;
    m5Screen.querySelectorAll('[data-m5-answer]').forEach(b=>b.addEventListener('click',answerM5));m5Screen.focus();
  }

  function answerM5(e) {
    const it=m5Current.items[m5Index],chosen=decodeURIComponent(e.currentTarget.dataset.m5Answer),good=chosen===it.a;m5Attempts++;
    m5Screen.querySelectorAll('.ai4-option').forEach(btn=>{btn.disabled=true;const v=decodeURIComponent(btn.dataset.m5Answer);if(v===it.a)btn.classList.add('correct');else if(btn===e.currentTarget)btn.classList.add('wrong');});
    let calibration=good?'WELL CALIBRATED':'RECALIBRATE', cls=good?'good':'warn';
    if(!good && (chosen==='TOO CERTAIN'||/prove|always|definitely|must replace|infallible|every patient/i.test(chosen))){calibration='TOO CERTAIN';cls='warn';}
    else if(!good && chosen==='TOO WEAK'){calibration='TOO WEAK';cls='low';}
    if(good){const pts=m5Attempts===1?10:6;m5SessionScore+=pts;state.mission5FirstTryScore+=pts;m5Feedback.className='ai4-feedback good';m5Feedback.innerHTML=`<span class="ai4-calibration-result ${cls}">✓ ${calibration}</span><br><strong>Certainty matched to evidence.</strong> ${it.ex}`;cue(true);}else{m5Feedback.className='ai4-feedback bad';m5Feedback.innerHTML=`<span class="ai4-calibration-result ${cls}">⚠ ${calibration}</span><br><strong>Recalibrate the claim.</strong> ${it.ex}`;cue(false);}
    save();const next=document.createElement('button');next.type='button';next.className='ai4-primary ai4-next';next.textContent=m5Index===m5Current.items.length-1?'Clear calibration module →':'Next calibration checkpoint →';next.addEventListener('click',()=>{m5Index++;m5Attempts=0;m5Feedback.textContent='';m5Feedback.className='ai4-feedback';renderM5();});m5Feedback.appendChild(document.createElement('br'));m5Feedback.appendChild(next);updateUI();
  }

  function completeM5Activity() {
    state.mission5Completed[m5Current.name]=true;save();const i=M5_ORDER.indexOf(m5Current.name);const next=i<M5_ORDER.length-1?`${m5Meta[M5_ORDER[i+1]][0]} is now unlocked.`:'Mission 5 is complete. Accountability Board is ready.';
    m5Screen.innerHTML=`<div class="ai4-waiting"><span aria-hidden="true">✅</span><h3>${m5Meta[m5Current.name][0]} cleared</h3><p>Activity score: ${m5SessionScore}. ${next}</p></div>`;m5Feedback.textContent='';updateUI();
  }


  function startM6(name) {
    if(!M5_ORDER.every(a=>state.mission5Completed[a])) return;
    if(musicOn && (!clinicalVideo || clinicalVideo.paused)) startMusicPlayback();
    m6Current={name,items:shuffle(m6ItemsFor(name))};m6Index=0;m6Attempts=0;m6SessionScore=0;state.mission6Started=true;save();
    m6WorkspaceTitle.textContent=m6Meta[name][0];m6WorkspaceIntro.textContent=m6Meta[name][1];m6Feedback.textContent="";m6Feedback.className="ai4-feedback";renderM6();
  }

  function renderM6() {
    const it=m6Current.items[m6Index];if(!it){completeM6Activity();return;}
    const label=m6Current.name==="frame"?"FRAME THE CASE":m6Current.name==="evidence"?"EVIDENCE ON RECORD":m6Current.name==="steelman"?"STEELMAN THE OTHER SIDE":"DELIVER THE VERDICT";
    const evidence=it.evidence?`<div class="ai4-evidence-chip"><span>EVIDENCE ON RECORD</span><strong>${it.evidence}</strong></div>`:"";
    const toolkit=m6Current.name==="frame"?"What's really at stake here is… · The question comes down to… · Let's be clear about what we're debating:":m6Current.name==="evidence"?"Going back to the study/report,… · The data show that… · As we saw in the video,…":m6Current.name==="steelman"?"The strongest version of that view is… · To be fair to that argument,… · And yet the problem is…":"Pulling the threads together,… · So where does that leave us? · On balance, the stronger case is…";
    m6Screen.innerHTML=`<span class="ai4-feed-label">${label}</span><div class="ai4-question-top"><span>BOARD · CHECKPOINT ${m6Index+1}</span><b>${m6Index+1} / ${m6Current.items.length}</b></div>${evidence}<div class="ai4-board-toolkit"><span>LANGUAGE TOOLKIT</span><p>${toolkit}</p></div><h3 class="ai4-question">${it.q}</h3><div class="ai4-options">${it.opts.map((o,i)=>`<button class="ai4-option" type="button" data-m6-answer="${encodeURIComponent(o)}"><b>${String.fromCharCode(65+i)}</b> · ${o}</button>`).join("")}</div><div class="ai4-source-guardrail"><strong>Board rule:</strong> your political or ethical position is not being graded. Choose the option that best performs the requested argumentative function or stays closest to the supplied evidence.</div>`;
    m6Screen.querySelectorAll("[data-m6-answer]").forEach(b=>b.addEventListener("click",answerM6));m6Screen.focus();
  }

  function answerM6(e) {
    const it=m6Current.items[m6Index],chosen=decodeURIComponent(e.currentTarget.dataset.m6Answer),good=chosen===it.a;m6Attempts++;
    m6Screen.querySelectorAll(".ai4-option").forEach(btn=>{btn.disabled=true;const v=decodeURIComponent(btn.dataset.m6Answer);if(v===it.a)btn.classList.add("correct");else if(btn===e.currentTarget)btn.classList.add("wrong");});
    if(good){const pts=m6Attempts===1?10:6;m6SessionScore+=pts;state.mission6FirstTryScore+=pts;m6Feedback.className="ai4-feedback good";m6Feedback.innerHTML=`<strong>Argument function verified.</strong> ${it.ex}`;cue(true);}else{m6Feedback.className="ai4-feedback bad";m6Feedback.innerHTML=`<strong>Re-check the function or the source.</strong> ${it.ex}`;cue(false);}
    save();const next=document.createElement("button");next.type="button";next.className="ai4-primary ai4-next";next.textContent=m6Index===m6Current.items.length-1?"Clear board stage →":"Next board checkpoint →";next.addEventListener("click",()=>{m6Index++;m6Attempts=0;m6Feedback.textContent="";m6Feedback.className="ai4-feedback";renderM6();});m6Feedback.appendChild(document.createElement("br"));m6Feedback.appendChild(next);updateUI();
  }

  function completeM6Activity() {
    state.mission6Completed[m6Current.name]=true;save();const i=M6_ORDER.indexOf(m6Current.name);const next=i<M6_ORDER.length-1?`${m6Meta[M6_ORDER[i+1]][0]} is now unlocked.`:"Mission 6 is complete. Your Accountability Brief and the final Day 4 clearance are ready.";
    m6Screen.innerHTML=`<div class="ai4-waiting"><span aria-hidden="true">✅</span><h3>${m6Meta[m6Current.name][0]} cleared</h3><p>Activity score: ${m6SessionScore}. ${next}</p></div>`;m6Feedback.textContent="";updateUI();
  }


  $("startDay4Mission1").addEventListener("click",()=>start("lexicon"));
  document.querySelectorAll("[data-ai4-activity]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)start(b.dataset.ai4Activity);}));
  document.querySelectorAll("[data-ai4-m2]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)startM2(b.dataset.ai4M2);}));
  document.querySelectorAll("[data-ai4-m3]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)startM3(b.dataset.ai4M3);}));
  document.querySelectorAll("[data-ai4-m4]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)startM4(b.dataset.ai4M4);}));
  document.querySelectorAll("[data-ai4-m5]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)startM5(b.dataset.ai4M5);}));
  document.querySelectorAll("[data-ai4-m6]").forEach(b=>b.addEventListener("click",()=>{if(!b.disabled)startM6(b.dataset.ai4M6);}));

  $("day4SoundToggle").addEventListener("click",()=>{state.soundOff=!state.soundOff;save();updateUI();audioStatus.textContent=state.soundOff?"Sound effects and UK speech are off. Music is controlled separately.":"Sound effects and UK speech are on. Music is controlled separately.";});
  musicToggle.addEventListener("click",()=>{musicOn=!musicOn;localStorage.setItem(MUSIC_KEY,musicOn?"on":"off");applyMusicState(true);audioStatus.textContent=musicOn?"Music on. AI Clinical Control — Human in the Loop is playing.":"Music off. Sound effects and UK speech remain available.";});

  $("resetDay4").addEventListener("click",()=>{if(confirm("Reset all Day 4 progress on this device?")){state=freshState();save();current=null;m2Current=null;m3Current=null;m4Current=null;m5Current=null;m6Current=null;if(clinicalVideo){clinicalVideo.pause();clinicalVideo.currentTime=0;}screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🧠</span><h3>AI clinical control offline</h3><p>Start Mission 1 to initialise the system.</p></div>';workspaceTitle.textContent="System waiting";workspaceIntro.textContent="Boot Mission 1 to start the vocabulary clearance.";feedback.textContent="";m2Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">📡</span><h3>Clinical feed locked</h3><p>Mission 1 clearance is required.</p></div>';m2WorkspaceTitle.textContent="Feed waiting";m2WorkspaceIntro.textContent="Clear Mission 1, then start Feed Orientation.";m2Feedback.textContent="";m3Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🛑</span><h3>Human review locked</h3><p>Mission 2 clearance is required.</p></div>';m3WorkspaceTitle.textContent="Override waiting";m3WorkspaceIntro.textContent="Clear Mission 2, then open Spot the Conflict.";m3Feedback.textContent="";m4Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🔎</span><h3>Evidence scanner locked</h3><p>Mission 3 clearance is required.</p></div>';m4WorkspaceTitle.textContent="Scanner waiting";m4WorkspaceIntro.textContent="Clear Mission 3, then open Read the Numbers.";m4Feedback.textContent="";m5Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">🎚️</span><h3>Certainty calibrator locked</h3><p>Mission 4 clearance is required.</p></div>';m5WorkspaceTitle.textContent="Calibration waiting";m5WorkspaceIntro.textContent="Clear Mission 4, then open Set the Certainty Level.";m5Feedback.textContent="";m6Screen.innerHTML='<div class="ai4-waiting"><span aria-hidden="true">⚖️</span><h3>Accountability Board locked</h3><p>Mission 5 clearance is required.</p></div>';m6WorkspaceTitle.textContent="Board locked";m6WorkspaceIntro.textContent="Clear Mission 5, then open Frame the Issue.";m6Feedback.textContent="";updateUI();}});

  $("day4Mission2Button").addEventListener("click",()=>{if(!$("day4Mission2Button").disabled){$("day4Mission2").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Mission 2 ready. Watch the supplied video, then open Feed Orientation.";}});
  $("day4Mission3Button").addEventListener("click",()=>{if(!$("day4Mission3Button").disabled){$("day4Mission3").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Mission 3 ready. Open Spot the Conflict to start the human-review audit.";}});
  $("day4Mission4Button").addEventListener("click",()=>{if(!$("day4Mission4Button").disabled){$("day4Mission4").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Mission 4 ready. Open Read the Numbers to begin the evidence audit.";}});
  $("day4Mission5Button").addEventListener("click",()=>{if(!$("day4Mission5Button").disabled){$("day4Mission5").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Mission 5 ready. Open Set the Certainty Level to begin calibration.";}});
  $("day4Mission6Button").addEventListener("click",()=>{if(!$("day4Mission6Button").disabled){$("day4Mission6").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Mission 6 ready. Open Frame the Issue to enter the Accountability Board.";}});
  $("day4FinalButton").addEventListener("click",()=>{if(!$("day4FinalButton").disabled){$("day4Final").scrollIntoView({behavior:"smooth",block:"start"});audioStatus.textContent="Final Day 4 clearance granted. Draw your Human-in-the-Loop case.";}});
  $("startDay4Final").addEventListener("click",()=>startFinal(false));
  $("replayDay4Final").addEventListener("click",()=>startFinal(true));
  $("hearDay4FinalBrief").addEventListener("click",()=>{const s=getFinalScenario();if(s)speak(s.speak);});
  $("newDay4BoardPrompt").addEventListener("click",()=>{if(!M6_ORDER.every(a=>state.mission6Completed[a]))return;state.boardPrompt=(Number(state.boardPrompt||0)+1)%boardPrompts.length;state.boardStance="";save();updateBoardBrief();cue(true);});
  document.querySelectorAll("[data-ai4-stance]").forEach(b=>b.addEventListener("click",()=>{if(!M6_ORDER.every(a=>state.mission6Completed[a]))return;state.boardStance=b.dataset.ai4Stance;save();updateBoardBrief();cue(true);}));

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
