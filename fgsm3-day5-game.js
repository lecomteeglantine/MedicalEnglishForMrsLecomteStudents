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
    mission2:false,
    scriptDone:false,
    scriptScore:0,
    scriptFirstTry:0,
    scriptAudited:0,
    scriptIndex:0,
    scriptOrder:[],
    scriptAnsweredIds:[],
    scriptVerdicts:{},
    mission3:false,
    invisibleDone:false,
    invisibleScore:0,
    invisibleFirstTry:0,
    invisibleReviewed:0,
    invisibleIndex:0,
    invisibleOrder:[],
    invisibleAnsweredIds:[],
    mission4:false
  };
  let state = load();
  let currentQuestions = [];
  let qIndex = 0;
  let qFirstAttempt = true;
  let qLocked = false;
  let realityFirstAttempt = true;
  let realityLocked = false;
  let scriptFirstAttempt = true;
  let scriptLocked = false;
  let invisibleFirstAttempt = true;
  let invisibleLocked = false;
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


  const scriptQuestions = [
    {id:"tb1",show:"Trauma Bay",episode:"Pilot · 08:12",lens:["Teamwork realism","Clinical workflow"],scene:"One emergency physician receives the patient, orders every investigation, accompanies them to imaging, performs the operation and later gives the discharge instructions. Nurses and other professionals barely appear.",a:"UNREALISTIC",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"The evidence deck specifically flags the television habit of collapsing team care into one all-purpose doctor. This scene does more than compress time — it erases the multidisciplinary workflow.",cue:"Cleveland Clinic · professional roles and team care are often oversimplified."},
    {id:"tb2",show:"Trauma Bay",episode:"Episode 2 · 19:40",lens:["Timing","Storytelling"],scene:"A blood test is ordered, then a short montage moves directly to the result so the episode can continue. The script never claims that real laboratories always work this fast.",a:"DRAMATISED",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"Television can compress waiting time for storytelling. The key distinction is that the medical process is still recognisable; the timeline has been shortened for drama.",cue:"Reality Intelligence · medical drama frequently compresses ordinary workflow and waiting."},
    {id:"tb3",show:"Trauma Bay",episode:"Episode 3 · 05:05",lens:["Medical language","Production accuracy"],scene:"The resuscitation scene uses specialist emergency terminology and the production employs emergency physicians to review the language and procedures on set.",a:"PLAUSIBLE",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"The Pitt evidence shows that a medical drama can use expert advisers, credible medical language and carefully reviewed procedures. Accuracy is possible when productions build it in.",cue:"CBS · The Pitt is praised for medical experts on set, complex language and procedures."},
    {id:"tb4",show:"Trauma Bay",episode:"Episode 4 · whole shift",lens:["Workload representation","Selection bias"],scene:"Across a 45-minute episode, every patient becomes a major emergency. There is no charting, no routine review, no waiting and no phone work.",a:"DRAMATISED",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"The show is selecting the most dramatic moments and omitting routine work. That distorts the balance of a real shift, but it is best understood here as dramatic selection rather than proof that each individual emergency is impossible.",cue:"Cleveland Clinic + research signal · TV foregrounds dramatic events and leaves ordinary work off screen."},

    {id:"td1",show:"The Diagnosis",episode:"Pilot · 31:20",lens:["Diagnostic process","Certainty"],scene:"After hearing one unusual symptom, the lead doctor announces a rare diagnosis as certain and says no examination or further investigation is needed.",a:"UNREALISTIC",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"The problem is not simply that the diagnosis is fast. The script presents certainty while explicitly dismissing examination and further evidence. That badly distorts clinical reasoning.",cue:"Review criteria · timing and the plausibility of the diagnostic process matter; avoid certainty without evidence."},
    {id:"td2",show:"The Diagnosis",episode:"Episode 2 · 17:00",lens:["Uncertainty","Team reasoning"],scene:"The team lists several possible explanations, agrees that more information is needed, orders appropriate investigations within the story and revisits the working diagnosis when new evidence arrives.",a:"PLAUSIBLE",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"This represents uncertainty, team reasoning and revision rather than instant certainty. Nothing in the evidence deck suggests that a medical drama must avoid diagnostic reasoning — only that it should not turn it into magic.",cue:"Review Board principle · credible medicine can still be dramatic when reasoning and uncertainty remain visible."},
    {id:"td3",show:"The Diagnosis",episode:"Season trailer",lens:["Case selection","Entertainment"],scene:"The trailer promises that every episode will feature a baffling, extremely unusual condition and a last-minute reveal.",a:"DRAMATISED",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"A television mystery can deliberately select unusual cases for entertainment. The issue is representativeness: viewers should not mistake a curated stream of rare puzzles for ordinary medical work.",cue:"Reality Intelligence · television selects dramatic material; entertainment and realism are separate review dimensions."},
    {id:"td4",show:"The Diagnosis",episode:"Episode 5 · 09:10",lens:["Context","Evidence threshold"],scene:"A doctor reaches a working diagnosis quickly after a history and examination. The script does not tell us how distinctive the presentation is or what information was available before the scene began.",a:"DEPENDS",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"Speed alone is not enough to audit the scene. Without knowing the presentation, prior information or what happened off screen, the evidence does not justify a confident verdict.",cue:"Evidence discipline · do not turn missing context into a claim of accuracy or inaccuracy."},

    {id:"w1",show:"Ward 17",episode:"Pilot · morning handover",lens:["Teamwork realism","Handover"],scene:"Nurses, junior doctors and a senior clinician exchange information at handover. Later scenes show routine observations, calls, charting and follow-up alongside the more dramatic patient stories.",a:"PLAUSIBLE",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"This directly restores several parts of medical work that television often removes: teamwork, handovers, routine monitoring, phone work and documentation.",cue:"Cleveland Clinic · real work includes advocacy, charts and phone calls; team care matters."},
    {id:"w2",show:"Ward 17",episode:"Episode 2 · corridor",lens:["Ethics","Communication"],scene:"A clinician gives a patient's confidential test result loudly in a crowded public corridor because the writers want another character to overhear it.",a:"UNREALISTIC",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"The scene deliberately sacrifices credible confidentiality for a plot device. That is not simply compressed timing; it makes an ethically important professional behaviour implausible as good practice.",cue:"Review criteria · confidentiality and professional communication are part of the realism audit."},
    {id:"w3",show:"Ward 17",episode:"Episode 3 · 22:30",lens:["Routine work","Entertainment"],scene:"Several minutes are spent on discharge planning, calls and documentation, but the writers build tension through an unresolved family disagreement rather than adding a new medical catastrophe.",a:"PLAUSIBLE",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"Routine work can be represented without making television dull. The scene keeps ordinary clinical tasks visible while finding drama elsewhere.",cue:"Cleveland Clinic · advocacy, charting and phone calls are real parts of medical work often omitted on TV."},
    {id:"w4",show:"Ward 17",episode:"Episode 6 · night shift",lens:["Hierarchy","Team support"],scene:"A newly arrived junior doctor makes every major decision alone all night. The script explicitly says no senior clinician, nurse or other professional is available anywhere in the hospital.",a:"UNREALISTIC",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"This goes beyond simplifying a cast. The script removes the wider team and support structure altogether in order to isolate one hero.",cue:"Reality Intelligence · one-doctor-does-everything is a known distortion of hospital teamwork."},

    {id:"uk1",show:"Under the Knife",episode:"Pilot · operating theatre",lens:["Surgical teamwork","Professional roles"],scene:"The star surgeon performs a complex operation completely alone in an empty theatre because the writers want a visually iconic solo sequence.",a:"UNREALISTIC",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"The production is not merely shortening the operation; it is erasing the surgical team for a heroic image. That conflicts with the review lens on teamwork and roles.",cue:"Review criteria + Cleveland Clinic · television can oversimplify team care by making one doctor do everything."},
    {id:"uk2",show:"Under the Knife",episode:"Episode 2 · surgical montage",lens:["Timing","Visual storytelling"],scene:"A long operation is represented by a five-minute montage. Several team members remain visible and the episode does not claim that the procedure itself lasts five minutes.",a:"DRAMATISED",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"This is classic narrative compression. The production shortens screen time while preserving the idea of a team and a longer process.",cue:"Reality Intelligence · compression can be a storytelling device without making every underlying action false."},
    {id:"uk3",show:"Under the Knife",episode:"Episode 4 · pre-op",lens:["Communication","Consent"],scene:"Before the procedure, the surgeon explains the purpose of the operation, acknowledges uncertainty and gives the patient space to ask questions. The scene then cuts away before the operation begins.",a:"PLAUSIBLE",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"The communication is careful, uncertainty is visible and consent is treated as part of the process. The scene does not need to show every administrative detail to be credible.",cue:"Review criteria · consent, communication and acknowledgement of uncertainty strengthen credibility."},
    {id:"uk4",show:"Under the Knife",episode:"Episode 7 · emergency scene",lens:["Missing context","Ethics"],scene:"The episode moves rapidly into an emergency procedure without showing a consent discussion. We are not told whether consent was possible, discussed off screen or covered before the scene began.",a:"DEPENDS",opts:["PLAUSIBLE","DRAMATISED","UNREALISTIC","DEPENDS"],ex:"The missing scene is not enough evidence by itself. A responsible reviewer should ask what context is absent rather than automatically labelling the programme accurate or inaccurate.",cue:"Evidence discipline · absence on screen is not always proof that an event did not happen in the story world."}
  ];


  const invisibleQuestions = [
    {id:"ow1",module:"OFF-SCREEN WORK",scene:"The episode cuts from a consultation straight to the next patient. Which task is specifically identified by the Cleveland Clinic source as ordinary medical work that may disappear from television?",a:"Filling in charts",opts:["Filling in charts","Performing a dramatic emergency operation","Delivering a cliffhanger speech","Solving a rare diagnosis alone"],ex:"Cleveland Clinic explicitly mentions filling in charts as part of real doctors' ordinary work.",cue:"Cleveland Clinic · doctors spend substantial time filling out charts."},
    {id:"ow2",module:"OFF-SCREEN WORK",scene:"A doctor spends an entire episode moving from bedside to bedside. Which missing activity is directly supported by the evidence deck?",a:"Making phone calls",opts:["Making phone calls","Secretly hiding every error","Doing every operation personally","Avoiding all paperwork"],ex:"Phone work is one of the ordinary activities the Cleveland Clinic article says television rarely foregrounds.",cue:"Cleveland Clinic · doctors spend time making phone calls."},
    {id:"ow3",module:"OFF-SCREEN WORK",scene:"The writers want a realistic non-procedural task for a quiet scene. Which option is explicitly supported by the source?",a:"Advocating for a patient",opts:["Advocating for a patient","Inventing a new diagnosis for drama","Removing the rest of the care team","Skipping documentation because nothing happened"],ex:"Patient advocacy is specifically named as part of real medical work.",cue:"Cleveland Clinic · doctors spend a lot of time advocating for patients."},
    {id:"ow4",module:"OFF-SCREEN WORK",scene:"Which statement best captures the evidence about ordinary medical work?",a:"Some essential work is real but not very visible on television",opts:["Some essential work is real but not very visible on television","Anything not shown on television is unimportant","Real doctors mainly perform dramatic procedures","Documentation is invented for hospital administration dramas"],ex:"The source does not say ordinary work is unimportant — only that television tends not to foreground it.",cue:"Cleveland Clinic · entertainment selects what is most watchable."},
    {id:"ow5",module:"OFF-SCREEN WORK",scene:"A script adds a short scene in which a doctor phones another service, updates the chart and discusses a practical problem with the patient. What does that mainly improve?",a:"The visibility of routine medical work",opts:["The visibility of routine medical work","The number of medical errors","The speed of diagnosis","The amount of surgical spectacle"],ex:"These details restore work that the evidence says often stays off screen.",cue:"Cleveland Clinic · calls, charts and advocacy are ordinary parts of the job."},

    {id:"tm1",module:"THE MISSING TEAM",scene:"One star doctor receives the patient in the emergency department, performs the surgery and later gives all follow-up instructions. What is the clearest realism problem?",a:"The show collapses team care into one character",opts:["The show collapses team care into one character","The medical vocabulary is automatically fake","The patient should never see the same doctor twice","The scene proves the procedure is impossible"],ex:"The Cleveland Clinic source specifically criticises the television habit of showing the same doctor across roles that would involve a broader team.",cue:"Cleveland Clinic · medical teams and professional roles are often oversimplified."},
    {id:"tm2",module:"THE MISSING TEAM",scene:"Which rewrite best restores teamwork realism without making the episode much longer?",a:"Show a brief handover and name the next professional taking over",opts:["Show a brief handover and name the next professional taking over","Let the star doctor do every task faster","Remove nurses from the dialogue","Have one character claim responsibility for the whole hospital"],ex:"A concise handover can make the team visible without requiring a long documentary-style sequence.",cue:"Evidence deck · team care is often simplified for television."},
    {id:"tm3",module:"THE MISSING TEAM",scene:"A medical student repeatedly 'saves the day' while senior staff and the wider team stay passive. Which source-based concern does this resemble?",a:"Television oversimplifying who does what",opts:["Television oversimplifying who does what","Real hospitals never use medical students","Medical students always make final decisions","The terminology must therefore be inaccurate"],ex:"The issue is role simplification, not a claim that students never contribute to care.",cue:"Cleveland Clinic · a medical student is probably not going to save the day in the way TV repeatedly depicts."},
    {id:"tm4",module:"THE MISSING TEAM",scene:"A scene shows nurses, junior doctors and a senior clinician exchanging information before responsibility shifts. What does this add?",a:"A visible care team and transfer of information",opts:["A visible care team and transfer of information","Proof that all medical dramas are accurate","A reason to remove documentation","Evidence that waiting never happens"],ex:"Showing information transfer counters the single-hero simplification identified in the evidence.",cue:"Review Board lens · teamwork realism."},
    {id:"tm5",module:"THE MISSING TEAM",scene:"Why is 'one doctor does everything' more than a harmless casting shortcut?",a:"It can distort viewers' picture of how multidisciplinary care works",opts:["It can distort viewers' picture of how multidisciplinary care works","It makes every procedure medically impossible","It means the actors are not trained","It proves the hospital has no protocols"],ex:"The evidence criticises oversimplification of teams because it changes the representation of real work.",cue:"Cleveland Clinic · medical teams are broader than television often suggests."},

    {id:"tmn1",module:"THE MISSING MINUTES",scene:"A blood sample is taken and the result appears after a 10-second montage. What is the most careful review comment?",a:"The process may be recognisable, but the waiting time has probably been compressed",opts:["The process may be recognisable, but the waiting time has probably been compressed","Blood tests are fictional television devices","The result must be clinically wrong","Real hospitals always return results immediately"],ex:"Television commonly compresses the spaces between dramatic events. That is different from saying the underlying process is impossible.",cue:"Script Audit · distinguish dramatic compression from outright impossibility."},
    {id:"tmn2",module:"THE MISSING MINUTES",scene:"Which addition would make a shift feel more realistic without turning the episode into a documentary?",a:"A short beat showing waiting, routine observations or an update call",opts:["A short beat showing waiting, routine observations or an update call","A new emergency every two minutes","Instant results for every investigation","A doctor who never has to document anything"],ex:"A brief transitional beat can restore the existence of ordinary time and work without slowing the story excessively.",cue:"Cleveland Clinic · real work contains ordinary tasks television rarely foregrounds."},
    {id:"tmn3",module:"THE MISSING MINUTES",scene:"Every patient in a 45-minute episode becomes a major emergency. Which interpretation is most defensible?",a:"The programme is selecting dramatic moments rather than representing the balance of a whole shift",opts:["The programme is selecting dramatic moments rather than representing the balance of a whole shift","Every emergency shown is therefore medically impossible","Real emergency departments only treat minor problems","The episode proves medical errors are rare"],ex:"Television selects for drama. The evidence supports questioning the balance of the representation, not declaring every event impossible.",cue:"Cleveland Clinic + Witten/Herdecke · television foregrounds dramatic events."},
    {id:"tmn4",module:"THE MISSING MINUTES",scene:"A patient is treated, then disappears from the story immediately. Which missing element could make the care pathway feel more complete?",a:"Follow-up or a handover to the next stage of care",opts:["Follow-up or a handover to the next stage of care","A romantic subplot","Another instant diagnosis","A heroic monologue"],ex:"Showing even a brief continuation reminds viewers that care does not end when the dramatic scene does.",cue:"Review Board · the camera can cut before the real care pathway is finished."},
    {id:"tmn5",module:"THE MISSING MINUTES",scene:"Why is waiting useful evidence when reviewing medical drama?",a:"Because television can remove time between events and make care appear more instantaneous than it is",opts:["Because television can remove time between events and make care appear more instantaneous than it is","Because all hospital waiting is caused by medical error","Because waiting means no care is happening","Because realistic series must show every minute in real time"],ex:"The issue is temporal compression. Realism does not require real-time television, but the audience should not confuse montage speed with real workflow.",cue:"Script Audit principle · compressed timing can be dramatic rather than literally accurate."},

    {id:"qr1",module:"QUIET REALITY",scene:"The research summary contrasts dramatic emergency operations on television with a different reality around death. What does it say may happen in real life?",a:"Patients may die quietly and without much fuss",opts:["Patients may die quietly and without much fuss","Every death involves an emergency operation","Doctors always make a dramatic speech","Intensive care is almost never involved"],ex:"That quiet contrast is explicitly highlighted in the Witten/Herdecke university summary.",cue:"Witten/Herdecke · dramatic emergency operations often take centre stage on TV, while real death may be quiet."},
    {id:"qr2",module:"QUIET REALITY",scene:"After analysing more than 300 episodes, what broad conclusion did the Witten/Herdecke project report?",a:"Some portrayals of illness, death and intensive care differ sharply from reality",opts:["Some portrayals of illness, death and intensive care differ sharply from reality","Every medical series is medically false","Only surgical scenes are inaccurate","Medical television has no effect on viewers"],ex:"The research summary identifies substantial discrepancies in some areas; it does not condemn every scene or every series.",cue:"Witten/Herdecke University · more than 300 episodes analysed."},
    {id:"qr3",module:"QUIET REALITY",scene:"A writer says: 'If a death scene is quiet, viewers will think nothing medical is happening.' What is the best evidence-based response?",a:"Quiet does not mean unrealistic; real dying can be far less theatrical than television suggests",opts:["Quiet does not mean unrealistic; real dying can be far less theatrical than television suggests","Every death scene should remove clinicians entirely","Real medicine has no emergencies","Television should never dramatise anything"],ex:"The research explicitly challenges the assumption that medically important moments must look spectacular.",cue:"Witten/Herdecke · real deaths may be quiet and without much fuss."},
    {id:"qr4",module:"QUIET REALITY",scene:"Which editorial principle best fits the evidence from both sources?",a:"Keep drama, but do not let spectacle erase the ordinary systems and people that make care possible",opts:["Keep drama, but do not let spectacle erase the ordinary systems and people that make care possible","Remove all dramatic scenes from medical television","Assume genuine terminology makes every scene accurate","Make one doctor responsible for every stage of care"],ex:"Both sources support a nuanced position: entertainment can coexist with realism if compression and spectacle do not completely distort the work.",cue:"Cleveland Clinic + Witten/Herdecke · realism is about representation, not banning drama."},
    {id:"qr5",module:"QUIET REALITY",scene:"The board has to summarise Mission 4 in one sentence. Which is strongest?",a:"What television omits can shape viewers' understanding just as much as what it shows",opts:["What television omits can shape viewers' understanding just as much as what it shows","Only factual medical errors matter when judging realism","Routine work is irrelevant because it is not entertaining","A medically realistic series must show every task in full"],ex:"Mission 4 is about omissions as a form of representation: team care, routine work and quiet moments change the picture viewers receive.",cue:"Evidence synthesis · omission is part of storytelling and part of realism."}
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
    const m3=$("day5Mission3");
    const startAudit=$("startScriptAudit");
    if(state.mission2){
      m2Complete.classList.remove("is-locked");
      $("day5M2CompleteTitle").textContent="Reality Intelligence cleared.";
      $("day5M2CompleteText").textContent=`You collected all ${realityQuestions.length} evidence cards and scored ${state.realityScore}/${realityQuestions.length*10}.`;
      m3Button.disabled=false;
      m3Button.textContent=state.mission3?"✓ Mission 3 · Script Audit cleared":"Open Mission 3 · Script Audit →";
      m3.classList.remove("is-locked");
      startAudit.disabled=false;
      startAudit.textContent=state.mission3?"✓ Script Audit cleared":"Start Script Audit →";
    } else {
      m2Complete.classList.add("is-locked");
      $("day5M2CompleteTitle").textContent="Evidence feed not cleared yet.";
      $("day5M2CompleteText").textContent=`Collect all ${realityQuestions.length} evidence cards.`;
      m3Button.disabled=true;
      m3Button.textContent="🔒 Mission 3 · Script Audit";
      m3.classList.add("is-locked");
      startAudit.disabled=true;
      startAudit.textContent="🔒 Clear Reality Intelligence first";
    }

    const audited=Math.min(Number(state.scriptAudited)||0,scriptQuestions.length);
    $("day5AuditText").textContent=`${audited} / ${scriptQuestions.length}`;
    $("day5AuditBar").style.width=`${(audited/scriptQuestions.length)*100}%`;

    const m3Complete=$("day5Mission3Complete");
    const m4Button=$("day5Mission4Button");
    const m4=$("day5Mission4");
    const startInvisible=$("startInvisibleWork");
    if(state.mission3){
      m3Complete.classList.remove("is-locked");
      $("day5M3CompleteTitle").textContent="Script Audit cleared.";
      $("day5M3CompleteText").textContent=`You audited all ${scriptQuestions.length} scenes and scored ${state.scriptScore}/${scriptQuestions.length*10}.`;
      m4Button.disabled=false;
      m4Button.textContent=state.mission4?"✓ Mission 4 · What TV Leaves Out cleared":"Open Mission 4 · What TV Leaves Out →";
      m4.classList.remove("is-locked");
      startInvisible.disabled=false;
      startInvisible.textContent=state.mission4?"✓ What TV Leaves Out cleared":"Start the Invisible Shift Audit →";
    } else {
      m3Complete.classList.add("is-locked");
      $("day5M3CompleteTitle").textContent="Script room not cleared yet.";
      $("day5M3CompleteText").textContent=`Audit all ${scriptQuestions.length} scenes.`;
      m4Button.disabled=true;
      m4Button.textContent="🔒 Mission 4 · What TV Leaves Out";
      m4.classList.add("is-locked");
      startInvisible.disabled=true;
      startInvisible.textContent="🔒 Clear Script Audit first";
    }

    const invisible=Math.min(Number(state.invisibleReviewed)||0,invisibleQuestions.length);
    $("day5InvisibleText").textContent=`${invisible} / ${invisibleQuestions.length}`;
    $("day5InvisibleBar").style.width=`${(invisible/invisibleQuestions.length)*100}%`;

    const m4Complete=$("day5Mission4Complete");
    const m5Button=$("day5Mission5Button");
    if(state.mission4){
      m4Complete.classList.remove("is-locked");
      $("day5M4CompleteTitle").textContent="Invisible Shift audit cleared.";
      $("day5M4CompleteText").textContent=`You reviewed all ${invisibleQuestions.length} off-screen files and scored ${state.invisibleScore}/${invisibleQuestions.length*10}.`;
      m5Button.disabled=false;
      m5Button.textContent="✓ Mission 5 · Ratings Department · Next update";
      $("day5Mission5LockChip").textContent="✓ Ratings desk ready";
    } else {
      m4Complete.classList.add("is-locked");
      $("day5M4CompleteTitle").textContent="Production reality desk not cleared yet.";
      $("day5M4CompleteText").textContent=`Review all ${invisibleQuestions.length} off-screen files.`;
      m5Button.disabled=true;
      m5Button.textContent="🔒 Mission 5 · Ratings Department";
      $("day5Mission5LockChip").textContent="🔒 Ratings desk locked";
    }

    const r1=$("day5Route1"),r2=$("day5Route2"),r3=$("day5Route3"),r4=$("day5Route4"),r5=$("day5Route5");
    [r1,r2,r3,r4,r5].forEach(el=>{if(el){el.classList.remove("is-current","is-done");}});
    if(!state.mission1){r1?.classList.add("is-current");}
    else if(!state.mission2){r1?.classList.add("is-done");r2?.classList.add("is-current");}
    else if(!state.mission3){r1?.classList.add("is-done");r2?.classList.add("is-done");r3?.classList.add("is-current");}
    else if(!state.mission4){r1?.classList.add("is-done");r2?.classList.add("is-done");r3?.classList.add("is-done");r4?.classList.add("is-current");}
    else {r1?.classList.add("is-done");r2?.classList.add("is-done");r3?.classList.add("is-done");r4?.classList.add("is-done");r5?.classList.add("is-current");}
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


  function startScriptAudit(){
    if(!state.mission2)return;
    if(state.mission3){showScriptClearance();return;}
    if(!Array.isArray(state.scriptOrder)||state.scriptOrder.length!==scriptQuestions.length){
      state.scriptOrder=shuffle(scriptQuestions.map(q=>q.id));
      state.scriptIndex=0;
      state.scriptScore=0;
      state.scriptFirstTry=0;
      state.scriptAudited=0;
      state.scriptAnsweredIds=[];
      state.scriptVerdicts={};
      save();
    }
    renderScriptQuestion();
    document.querySelector(".stream5-workspace").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function scriptItem(){
    const id=state.scriptOrder?.[state.scriptIndex];
    return scriptQuestions.find(q=>q.id===id);
  }
  function renderScriptQuestion(){
    const item=scriptItem();
    if(!item){finishScriptAudit();return;}
    scriptLocked=false; scriptFirstAttempt=true;
    document.querySelector(".stream5-score-box span").textContent="SCRIPT SCORE";
    $("day5Score").textContent=state.scriptScore||0;
    $("stream5WorkspaceTitle").textContent=`Script Audit · ${item.show}`;
    $("stream5WorkspaceIntro").textContent=`Scene ${state.scriptIndex+1} of ${scriptQuestions.length} · Judge the representation, not the patient's diagnosis.`;
    $("stream5Feedback").innerHTML="";
    const opts=shuffle(item.opts);
    const lenses=(item.lens||[]).map(x=>`<span>${esc(x)}</span>`).join("");
    $("stream5Screen").innerHTML=`<div class="stream5-question stream5-audit-scene"><div class="stream5-audit-scene-head"><div><div class="stream5-audit-series">${esc(item.show)}</div><p class="stream5-audit-episode">${esc(item.episode)}</p></div><b class="stream5-audit-scene-no">${state.scriptIndex+1}/${scriptQuestions.length}</b></div><h3>How should the Review Board classify this scene?</h3><div class="stream5-scene-box"><span>SCENE UNDER REVIEW</span><p>${esc(item.scene)}</p></div><div class="stream5-audit-lens">${lenses}</div><div class="stream5-options stream5-audit-verdicts">${opts.map((o,i)=>`<button type="button" class="stream5-option" data-opt="${esc(o)}"><span>${String.fromCharCode(65+i)}</span>${esc(o)}</button>`).join("")}</div><div class="stream5-audit-sourcecue"><strong>Evidence cue:</strong> ${esc(item.cue)}</div></div>`;
    $("stream5Screen").querySelectorAll(".stream5-option").forEach(btn=>btn.addEventListener("click",()=>answerScript(btn,item)));
    $("stream5Screen").focus();
  }
  function answerScript(btn,item){
    if(scriptLocked)return;
    const choice=btn.dataset.opt;
    if(choice===item.a){
      scriptLocked=true;
      btn.classList.add("is-correct");
      const fresh=!(state.scriptAnsweredIds||[]).includes(item.id);
      const pts=scriptFirstAttempt?10:6;
      if(fresh){
        state.scriptScore=(state.scriptScore||0)+pts;
        if(scriptFirstAttempt)state.scriptFirstTry=(state.scriptFirstTry||0)+1;
        state.scriptAudited=(state.scriptAudited||0)+1;
        state.scriptAnsweredIds=[...(state.scriptAnsweredIds||[]),item.id];
        state.scriptVerdicts={...(state.scriptVerdicts||{}),[item.id]:item.a};
      }
      save(); ping(820,.08); updateUI();
      document.querySelector(".stream5-score-box span").textContent="SCRIPT SCORE";
      $("day5Score").textContent=state.scriptScore;
      $("stream5Feedback").innerHTML=`<div class="stream5-feedback-good"><strong>${esc(item.a)}${fresh?` · +${pts}`:""}</strong> ${esc(item.ex)} <button id="nextScriptScene" class="stream5-inline-next" type="button">${state.scriptIndex===scriptQuestions.length-1?"Complete script audit":"Next scene →"}</button></div>`;
      $("nextScriptScene").addEventListener("click",()=>{state.scriptIndex=(state.scriptIndex||0)+1;save();renderScriptQuestion();});
    } else {
      scriptFirstAttempt=false;
      btn.classList.add("is-wrong"); btn.disabled=true; ping(210,.10);
      const hint=choice==="UNREALISTIC"?"Is the scene actually incompatible with the evidence, or has television mainly compressed/intensified something recognisable?":choice==="DRAMATISED"?"Dramatised means the underlying process remains recognisable but timing, frequency or intensity has been altered for storytelling.":choice==="DEPENDS"?"Use DEPENDS only when missing context genuinely prevents a confident verdict.":"Check whether the evidence deck makes this representation credible as shown.";
      $("stream5Feedback").innerHTML=`<div class="stream5-feedback-bad"><strong>Review note rejected.</strong> ${hint} Try again.</div>`;
    }
  }
  function finishScriptAudit(){
    state.scriptDone=true; state.mission3=true; state.scriptAudited=scriptQuestions.length; save(); ping(940,.15); updateUI(); showScriptClearance();
  }
  function showScriptClearance(){
    const counts={PLAUSIBLE:0,DRAMATISED:0,UNREALISTIC:0,DEPENDS:0};
    scriptQuestions.forEach(q=>{counts[q.a]=(counts[q.a]||0)+1;});
    document.querySelector(".stream5-score-box span").textContent="SCRIPT SCORE";
    $("day5Score").textContent=state.scriptScore||0;
    $("stream5WorkspaceTitle").textContent="Script Audit cleared";
    $("stream5WorkspaceIntro").textContent="The four pilots have survived their first evidence-based script review.";
    $("stream5Feedback").innerHTML="";
    $("stream5Screen").innerHTML=`<div class="stream5-clearance stream5-audit-clearance"><span>🎬</span><h3>Script Reality Auditor</h3><p><strong>${state.scriptScore}/${scriptQuestions.length*10}</strong> · ${state.scriptFirstTry}/${scriptQuestions.length} scene judgements correct on the first attempt.</p><p>You did not treat “TV” as automatically false. You separated credible representation from dramatic compression, genuine distortion and cases where the evidence was insufficient.</p><div class="stream5-audit-summary"><div><b>PLAUSIBLE CASES</b><span>${counts.PLAUSIBLE}</span></div><div><b>DRAMATISED CASES</b><span>${counts.DRAMATISED}</span></div><div><b>UNREALISTIC CASES</b><span>${counts.UNREALISTIC}</span></div><div><b>DEPENDS CASES</b><span>${counts.DEPENDS}</span></div></div><button id="scrollM3Complete" class="stream5-primary" type="button">See mission clearance ↓</button></div>`;
    $("scrollM3Complete").addEventListener("click",()=>$("day5Mission3Complete").scrollIntoView({behavior:"smooth",block:"center"}));
  }


  function startInvisibleWork(){
    if(!state.mission3)return;
    if(state.mission4){showInvisibleClearance();return;}
    if(!Array.isArray(state.invisibleOrder)||state.invisibleOrder.length!==invisibleQuestions.length){
      state.invisibleOrder=shuffle(invisibleQuestions.map(q=>q.id));
      state.invisibleIndex=0;
      state.invisibleScore=0;
      state.invisibleFirstTry=0;
      state.invisibleReviewed=0;
      state.invisibleAnsweredIds=[];
      save();
    }
    renderInvisibleQuestion();
    document.querySelector(".stream5-workspace").scrollIntoView({behavior:"smooth",block:"start"});
  }
  function invisibleItem(){
    const id=state.invisibleOrder?.[state.invisibleIndex];
    return invisibleQuestions.find(q=>q.id===id);
  }
  function renderInvisibleQuestion(){
    const item=invisibleItem();
    if(!item){finishInvisibleWork();return;}
    invisibleLocked=false; invisibleFirstAttempt=true;
    document.querySelector(".stream5-score-box span").textContent="INVISIBLE SHIFT SCORE";
    $("day5Score").textContent=state.invisibleScore||0;
    $("stream5WorkspaceTitle").textContent=`What TV Leaves Out · ${item.module}`;
    $("stream5WorkspaceIntro").textContent=`Off-screen file ${state.invisibleIndex+1} of ${invisibleQuestions.length} · Decide what a medical drama may be hiding or distorting.`;
    $("stream5Feedback").innerHTML="";
    const opts=shuffle(item.opts);
    $("stream5Screen").innerHTML=`<div class="stream5-question stream5-behind-question"><div class="stream5-question-meta"><span>PRODUCTION REALITY DESK</span><b>${state.invisibleIndex+1}/${invisibleQuestions.length}</b></div><div class="stream5-offscreen-tag">🎞️ ${esc(item.module)}</div><div class="stream5-offscreen-scenario"><span>SCENE / EDITING NOTE</span>${esc(item.scene)}</div><h3>What is the strongest evidence-based review?</h3><div class="stream5-options">${opts.map((o,i)=>`<button type="button" class="stream5-option" data-opt="${esc(o)}"><span>${String.fromCharCode(65+i)}</span>${esc(o)}</button>`).join("")}</div><div class="stream5-offscreen-source"><strong>Evidence cue:</strong> ${esc(item.cue)}</div></div>`;
    $("stream5Screen").querySelectorAll(".stream5-option").forEach(btn=>btn.addEventListener("click",()=>answerInvisible(btn,item)));
    $("stream5Screen").focus();
  }
  function answerInvisible(btn,item){
    if(invisibleLocked)return;
    const choice=btn.dataset.opt;
    if(choice===item.a){
      invisibleLocked=true; btn.classList.add("is-correct");
      const fresh=!(state.invisibleAnsweredIds||[]).includes(item.id);
      const pts=invisibleFirstAttempt?10:6;
      if(fresh){
        state.invisibleScore=(state.invisibleScore||0)+pts;
        if(invisibleFirstAttempt)state.invisibleFirstTry=(state.invisibleFirstTry||0)+1;
        state.invisibleReviewed=(state.invisibleReviewed||0)+1;
        state.invisibleAnsweredIds=[...(state.invisibleAnsweredIds||[]),item.id];
      }
      save(); ping(850,.085); updateUI();
      document.querySelector(".stream5-score-box span").textContent="INVISIBLE SHIFT SCORE";
      $("day5Score").textContent=state.invisibleScore;
      $("stream5Feedback").innerHTML=`<div class="stream5-feedback-good"><strong>Evidence restored${fresh?` · +${pts}`:""}.</strong> ${esc(item.ex)} <button id="nextInvisible" class="stream5-inline-next" type="button">${state.invisibleIndex===invisibleQuestions.length-1?"Complete the Invisible Shift":"Next off-screen file →"}</button></div>`;
      $("nextInvisible").addEventListener("click",()=>{state.invisibleIndex=(state.invisibleIndex||0)+1;save();renderInvisibleQuestion();});
    }else{
      invisibleFirstAttempt=false; btn.classList.add("is-wrong");btn.disabled=true;ping(205,.10);
      $("stream5Feedback").innerHTML=`<div class="stream5-feedback-bad"><strong>That edit note goes too far.</strong> Use the named evidence cue: distinguish what the source actually supports from what would be an assumption. Try again.</div>`;
    }
  }
  function finishInvisibleWork(){
    state.invisibleDone=true;state.mission4=true;state.invisibleReviewed=invisibleQuestions.length;save();ping(960,.15);updateUI();showInvisibleClearance();
  }
  function showInvisibleClearance(){
    document.querySelector(".stream5-score-box span").textContent="INVISIBLE SHIFT SCORE";
    $("day5Score").textContent=state.invisibleScore||0;
    $("stream5WorkspaceTitle").textContent="What TV Leaves Out cleared";
    $("stream5WorkspaceIntro").textContent="You can now review not only what a medical drama shows, but also what its editing removes.";
    $("stream5Feedback").innerHTML="";
    $("stream5Screen").innerHTML=`<div class="stream5-clearance stream5-invisible-clearance"><span>🧾</span><h3>Production Reality Editor</h3><p><strong>${state.invisibleScore}/${invisibleQuestions.length*10}</strong> · ${state.invisibleFirstTry}/${invisibleQuestions.length} evidence judgements correct on the first attempt.</p><p>Realism is also about omission. A series can use genuine terminology and credible emergencies while still giving viewers a distorted picture if it erases teamwork, routine work, waiting and quieter forms of care.</p><div class="stream5-invisible-takeaways"><div><b>OFF-SCREEN WORK</b><p>Charts, calls and patient advocacy are part of real medical work.</p></div><div><b>TEAM CARE</b><p>One star doctor should not silently replace an entire multidisciplinary pathway.</p></div><div><b>TIME</b><p>Montage can compress care; viewers should not mistake television time for hospital time.</p></div><div><b>QUIET REALITY</b><p>Not every medically important moment looks dramatic on screen.</p></div></div><button id="scrollM4Complete" class="stream5-primary" type="button">See mission clearance ↓</button></div>`;
    $("scrollM4Complete").addEventListener("click",()=>$("day5Mission4Complete").scrollIntoView({behavior:"smooth",block:"center"}));
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
    $("day5Mission3Button").addEventListener("click",()=>{if(state.mission2)$("day5Mission3").scrollIntoView({behavior:"smooth",block:"start"});});
    $("startScriptAudit").addEventListener("click",()=>{if(!$("startScriptAudit").disabled)startScriptAudit();});
    $("day5Mission4Button").addEventListener("click",()=>{if(state.mission3)$("day5Mission4").scrollIntoView({behavior:"smooth",block:"start"});});
    $("startInvisibleWork").addEventListener("click",()=>{if(!$("startInvisibleWork").disabled)startInvisibleWork();});
    $("day5Mission5Button").addEventListener("click",()=>{$("day5AudioStatus").textContent="Mission 5 · Ratings Department is next. Your Invisible Shift audit is saved on this device.";});
    $("day5SoundToggle").textContent=state.sound?"🔊 Sound ON":"🔇 Sound OFF";
    $("day5SoundToggle").setAttribute("aria-pressed",String(state.sound));
    applyMusicState(false);
    if(state.mission4){showInvisibleClearance();}
    else if(state.mission3){showScriptClearance();}
    else if(state.mission2){showRealityClearance();}
  });
})();
