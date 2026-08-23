(() => {
  // Keep the original Day 2 storage key so V20 progress survives the V21 update.
  const STORAGE_KEY = "mrsLecomteFgsm3Day2PassportV20";
  const SOUND_KEY = "mrsLecomteFgsm3Day2Sound";

  const departureItems = [
    {
      tag: "SYSTEM QUESTION 1",
      prompt: "Before comparing healthcare systems, what should you identify about funding?",
      options: [
        { text: "Who pays for healthcare?", correct: true },
        { text: "Which medical speciality is most popular?", correct: false },
        { text: "How many hospitals have car parks?", correct: false }
      ],
      explanation: "Start with funding: taxation, insurance, direct patient payments or a mixture of these."
    },
    {
      tag: "SYSTEM QUESTION 2",
      prompt: "What is the next structural question?",
      options: [
        { text: "Who provides and organises the care?", correct: true },
        { text: "Which country has the newest hospitals?", correct: false },
        { text: "How long medical school lasts?", correct: false }
      ],
      explanation: "Funding and provision are not the same thing. A system can be publicly funded but use different providers."
    },
    {
      tag: "SYSTEM QUESTION 3",
      prompt: "Which question tells you whether access is universal?",
      options: [
        { text: "Who is covered?", correct: true },
        { text: "Who chooses the health minister?", correct: false },
        { text: "Who owns the ambulances?", correct: false }
      ],
      explanation: "Coverage tells you whether everyone is included or whether access depends on eligibility or insurance."
    },
    {
      tag: "SYSTEM QUESTION 4",
      prompt: "What should you ask to understand the patient's experience of access?",
      options: [
        { text: "What does the patient pay when they use care?", correct: true },
        { text: "What colour is the patient's health card?", correct: false },
        { text: "How many doctors work abroad?", correct: false }
      ],
      explanation: "A system may be universal without every service being completely free at the point of use."
    }
  ];

  const londonItems = [
    {
      phase: "BUILD THE NHS",
      tag: "FUNDING",
      prompt: "How is NHS care mainly funded?",
      options: [
        { text: "Mainly through general taxation and National Insurance", correct: true },
        { text: "Mainly through monthly private insurance premiums", correct: false },
        { text: "Mainly through hospital entrance fees", correct: false }
      ],
      model: "The NHS is funded mainly through general taxation and National Insurance.",
      explanation: "The UK card describes the NHS as tax-funded and publicly run."
    },
    {
      phase: "BUILD THE NHS",
      tag: "COVERAGE",
      prompt: "Which statement best describes access?",
      options: [
        { text: "Universal and free at the point of use for most care", correct: true },
        { text: "Only people with employer insurance are covered", correct: false },
        { text: "Hospital care is universal but GP care is private only", correct: false }
      ],
      model: "NHS care is universal and free at the point of use for most services.",
      explanation: "Some services can carry charges, but the core principle is universal access based on need."
    },
    {
      phase: "BUILD THE NHS",
      tag: "PRIVATE INSURANCE",
      prompt: "What role does private insurance play in the UK system?",
      options: [
        { text: "A small supplementary role, often used to skip waits or pay for extras", correct: true },
        { text: "It is the main way most people access healthcare", correct: false },
        { text: "It replaces the NHS for everyone over 65", correct: false }
      ],
      model: "Private insurance is supplementary rather than central to the NHS.",
      explanation: "The country card says private cover is held by a minority and is mainly supplementary."
    },
    {
      phase: "PATIENT JOURNEY",
      tag: "FIRST CONTACT",
      prompt: "A patient has a non-emergency problem and needs medical advice. Where would they usually start?",
      options: [
        { text: "With a GP at a local surgery", correct: true },
        { text: "Directly with NICE", correct: false },
        { text: "By buying private insurance first", correct: false }
      ],
      model: "For many non-emergency problems, the GP is the first point of contact.",
      explanation: "GP means general practitioner; a surgery is the GP practice or its premises."
    },
    {
      phase: "PATIENT JOURNEY",
      tag: "URGENT CARE",
      prompt: "Which term refers to the emergency department in UK English?",
      options: [
        { text: "A&E", correct: true },
        { text: "NICE", correct: false },
        { text: "National Insurance", correct: false }
      ],
      model: "A&E means Accident and Emergency, the emergency department.",
      explanation: "This is a key UK healthcare term from the Day 2 country card."
    },
    {
      phase: "REALITY CHECK",
      tag: "CHALLENGE",
      prompt: "Which is identified as a current NHS challenge?",
      options: [
        { text: "Long waiting lists for planned care", correct: true },
        { text: "No universal hospital coverage", correct: false },
        { text: "Private insurance is compulsory", correct: false }
      ],
      model: "Long waiting lists for planned care remain a major NHS challenge.",
      explanation: "The UK card also highlights staff shortages, funding pressure and regional variation."
    },
    {
      phase: "REALITY CHECK",
      tag: "STRENGTH",
      prompt: "Which principle is presented as a strength of the NHS?",
      options: [
        { text: "Care based on need rather than ability to pay", correct: true },
        { text: "Access depends on your employer", correct: false },
        { text: "Patients pay the full cost before reimbursement", correct: false }
      ],
      model: "A major strength is access based on need rather than ability to pay.",
      explanation: "The country card presents fairness and free-at-point-of-use care as key strengths."
    },
    {
      phase: "REALITY CHECK",
      tag: "TRUE OR FALSE",
      prompt: "Private insurance is the main way most people in the UK access healthcare.",
      options: [
        { text: "False", correct: true },
        { text: "True", correct: false }
      ],
      model: "False. The NHS is the central system; private insurance is supplementary.",
      explanation: "This distinction becomes important when you compare the UK with the United States."
    },
    {
      phase: "BOARDING CHECK",
      tag: "SYSTEM SUMMARY",
      prompt: "Choose the best one-sentence summary of the UK system.",
      options: [
        { text: "A tax-funded, publicly run, universal system with most care free at the point of use", correct: true },
        { text: "A private-led, non-universal system centred on employer insurance", correct: false },
        { text: "A universal system funded mainly through patient co-payments", correct: false }
      ],
      model: "The NHS is a tax-funded, publicly run, universal system with most care free at the point of use.",
      explanation: "That is the core system profile you need before moving on to the next destination."
    }
  ];

  const newYorkItems = [
    {
      phase: "INSURANCE DESK",
      tag: "PREMIUM",
      prompt: "An insurance document mentions a premium. What is it?",
      options: [
        { text: "What you pay each month for insurance", correct: true },
        { text: "A fixed fee paid for every hospital bed", correct: false },
        { text: "The amount the government pays your employer", correct: false }
      ],
      model: "A premium is what you pay each month for insurance.",
      explanation: "Premium is one of the key cost terms on the US country card."
    },
    {
      phase: "INSURANCE DESK",
      tag: "DEDUCTIBLE",
      prompt: "What does deductible mean in this system?",
      options: [
        { text: "What you pay yourself before insurance starts paying", correct: true },
        { text: "The monthly price of an insurance plan", correct: false },
        { text: "A government subsidy for prescriptions", correct: false }
      ],
      model: "A deductible is what you pay yourself before insurance starts paying.",
      explanation: "Do not confuse a deductible with a premium or a co-pay."
    },
    {
      phase: "INSURANCE DESK",
      tag: "CO-PAY",
      prompt: "A patient is asked for a co-pay. Which definition fits?",
      options: [
        { text: "A fixed fee per visit or per drug", correct: true },
        { text: "A yearly tax paid to Medicare", correct: false },
        { text: "The full price of any treatment received", correct: false }
      ],
      model: "A co-pay is a fixed fee per visit or per drug.",
      explanation: "The country card distinguishes co-pay from premium and deductible."
    },
    {
      phase: "INSURANCE DESK",
      tag: "OUT-OF-NETWORK",
      prompt: "A specialist is described as out-of-network. What does that mean?",
      options: [
        { text: "The provider has no deal with the insurer, so it costs more", correct: true },
        { text: "The provider works outside the United States", correct: false },
        { text: "The provider only treats uninsured patients", correct: false }
      ],
      model: "An out-of-network provider has no agreement with your insurer, so care costs more.",
      explanation: "In the US card, network status is directly linked to patient cost."
    },
    {
      phase: "WHO COVERS WHOM?",
      tag: "PATIENT PROFILE · 72",
      prompt: "A 72-year-old retiree asks which public programme is specifically associated with people aged 65 and over.",
      options: [
        { text: "Medicare", correct: true },
        { text: "Medicaid", correct: false },
        { text: "National Insurance", correct: false }
      ],
      model: "Medicare provides federal cover for people aged 65 and over.",
      explanation: "The US card identifies Medicare with the 65+ group."
    },
    {
      phase: "WHO COVERS WHOM?",
      tag: "PATIENT PROFILE · LOW INCOME",
      prompt: "Which public programme on the country card is associated with low incomes?",
      options: [
        { text: "Medicaid", correct: true },
        { text: "Medicare", correct: false },
        { text: "NICE", correct: false }
      ],
      model: "Medicaid provides cover for people on low incomes.",
      explanation: "Medicare and Medicaid sound similar, but the card links them to different groups."
    },
    {
      phase: "WHO COVERS WHOM?",
      tag: "PATIENT PROFILE · EMPLOYED",
      prompt: "According to the country card, how are most people in the United States covered?",
      options: [
        { text: "Through their employer's insurance", correct: true },
        { text: "Automatically through one universal public insurer", correct: false },
        { text: "Only through direct payment at the hospital", correct: false }
      ],
      model: "Most people are covered through their employer's insurance.",
      explanation: "Employer-linked insurance is central to the private-led US system described in your card."
    },
    {
      phase: "ACCESS CHECK",
      tag: "COVERAGE",
      prompt: "Is healthcare coverage universal in the US system described in the card?",
      options: [
        { text: "No — some people remain uninsured or under-insured", correct: true },
        { text: "Yes — everyone is automatically fully covered", correct: false },
        { text: "Yes — but only hospital care is universal", correct: false }
      ],
      model: "Coverage is not universal, and some people remain uninsured or under-insured.",
      explanation: "This is one of the clearest structural contrasts with the NHS."
    },
    {
      phase: "REALITY CHECK",
      tag: "COST & INEQUALITY",
      prompt: "Which challenge is explicitly highlighted on the US country card?",
      options: [
        { text: "Very high health costs, medical debt and inequality", correct: true },
        { text: "A ban on private insurance", correct: false },
        { text: "Universal cover but no choice of providers", correct: false }
      ],
      model: "The US combines very high healthcare costs with gaps in coverage and medical debt.",
      explanation: "The card lists high costs, millions uninsured or under-insured, medical debt and deep inequality as challenges."
    },
    {
      phase: "COMPARE WITH LONDON",
      tag: "SPENDING & PRIVATE INSURANCE",
      prompt: "Which comparison matches the two country cards?",
      options: [
        { text: "The US spends a larger share of GDP on health and relies much more on private insurance", correct: true },
        { text: "The UK spends more and private insurance is central to the NHS", correct: false },
        { text: "Both systems are universal and private insurance plays the same role", correct: false }
      ],
      model: "The United States spends a larger share of GDP on healthcare and relies far more heavily on private insurance than the UK.",
      explanation: "The cards give about 17% of GDP for the US versus about 10–11% for the UK, with private insurance central in the US but supplementary in the UK."
    },
    {
      phase: "BOARDING CHECK",
      tag: "SYSTEM SUMMARY",
      prompt: "Choose the best one-sentence summary of the US system in your country card.",
      options: [
        { text: "A mixed, private-led, non-universal system with employer insurance central and public programmes for specific groups", correct: true },
        { text: "A tax-funded, publicly run universal service free at the point of use", correct: false },
        { text: "A single-payer provincial system covering hospital and doctor care", correct: false }
      ],
      model: "The US has a mixed, private-led system in which employer insurance is central, public programmes cover specific groups, and coverage is not universal.",
      explanation: "You now have the core profile needed to compare the United States with the next destinations."
    }
  ];

  const torontoItems = [
    {
      phase: "ARRIVAL CHECK",
      tag: "MEDICARE ≠ MEDICARE",
      prompt: "You saw Medicare in the United States. Does 'Medicare' mean the same thing in Canada?",
      options: [
        { text: "No — in Canada it refers to the public system covering hospital and physician care", correct: true },
        { text: "Yes — it is only for people aged 65 and over in both countries", correct: false },
        { text: "Yes — it is a private insurance company in both countries", correct: false }
      ],
      model: "In Canada, Medicare refers to public health insurance for hospital and physician care, not the US programme for people aged sixty-five and over.",
      explanation: "The same word labels two very different systems. This is the key arrival trap for Toronto."
    },
    {
      phase: "COVERAGE DESK",
      tag: "HOSPITAL + DOCTOR",
      prompt: "Which care is described as universally covered and free at the point of use?",
      options: [
        { text: "Hospital and physician care", correct: true },
        { text: "All prescriptions, dental care and glasses", correct: false },
        { text: "Only emergency care", correct: false }
      ],
      model: "Hospital and physician care are universally covered under Canada's public system.",
      explanation: "The country card is specific: universality applies to covered hospital and doctor services."
    },
    {
      phase: "COVERAGE DESK",
      tag: "WHAT MAY BE MISSING?",
      prompt: "Which group of services is NOT necessarily covered by Canadian Medicare outside hospital?",
      options: [
        { text: "Prescription drugs, dental care and vision", correct: true },
        { text: "Medically necessary hospital and physician care", correct: false },
        { text: "Every GP consultation and hospital admission", correct: false }
      ],
      model: "Prescription drugs, dental care and vision are not necessarily covered by Canadian Medicare.",
      explanation: "This is why 'universal' does not mean that every health service is automatically free."
    },
    {
      phase: "PROVINCE DESK",
      tag: "WHO RUNS IT?",
      prompt: "Who administers public health insurance in Canada under national rules?",
      options: [
        { text: "The provinces", correct: true },
        { text: "One single federal NHS", correct: false },
        { text: "Private employers", correct: false }
      ],
      model: "Each province administers its own public health insurance plan under national rules.",
      explanation: "The Canada Health Act sets national rules, while provinces administer the system."
    },
    {
      phase: "SYSTEM MODEL",
      tag: "SINGLE-PAYER",
      prompt: "What does single-payer mean in the Canadian country card?",
      options: [
        { text: "There is one public insurer per province", correct: true },
        { text: "Every patient must pay the full bill alone", correct: false },
        { text: "Only one private insurer is allowed nationally", correct: false }
      ],
      model: "Single-payer means that each province has one public insurer for covered care.",
      explanation: "Single-payer describes the insurance structure, not the number of hospitals or doctors."
    },
    {
      phase: "PRIVATE COVER",
      tag: "SUPPLEMENTARY",
      prompt: "What role does private insurance mainly play in Canada?",
      options: [
        { text: "It supplements public Medicare for services such as drugs, dental and vision", correct: true },
        { text: "It is the main route to hospital and physician care for most Canadians", correct: false },
        { text: "It replaces provincial public insurance after age 65", correct: false }
      ],
      model: "Private insurance is mainly supplementary, covering services that public Medicare may not include.",
      explanation: "This is a major contrast with the private-led US system."
    },
    {
      phase: "VOCABULARY CONTROL",
      tag: "MEDICALLY NECESSARY",
      prompt: "In the Canadian system, what does medically necessary refer to?",
      options: [
        { text: "Care that must be publicly covered", correct: true },
        { text: "Any treatment a patient personally wants", correct: false },
        { text: "Only care delivered in an emergency department", correct: false }
      ],
      model: "Medically necessary care is care that must be publicly covered under the system.",
      explanation: "The term helps explain the boundary of the public coverage obligation."
    },
    {
      phase: "VOCABULARY CONTROL",
      tag: "PHARMACARE",
      prompt: "What does pharmacare refer to on the Canada card?",
      options: [
        { text: "Proposed national drug coverage", correct: true },
        { text: "A private hospital network", correct: false },
        { text: "A ban on prescription medicine outside hospitals", correct: false }
      ],
      model: "Pharmacare refers to proposed national coverage for prescription drugs.",
      explanation: "It connects directly to the current gap in universal coverage for medicines outside hospital."
    },
    {
      phase: "REALITY CHECK",
      tag: "CURRENT PRESSURES",
      prompt: "Which challenge is highlighted on the Canadian country card?",
      options: [
        { text: "Wait times for specialists and elective care, plus uneven rural access", correct: true },
        { text: "No universal coverage for hospital care", correct: false },
        { text: "Compulsory private insurance for all residents", correct: false }
      ],
      model: "Canada faces specialist and elective-care waits as well as uneven access in rural and remote areas.",
      explanation: "The card also notes the lack of universal drug and dental coverage."
    },
    {
      phase: "COMPARE WITH NEW YORK",
      tag: "UNIVERSALITY + INSURANCE",
      prompt: "Which comparison between Canada and the United States matches the two country cards?",
      options: [
        { text: "Canada has universal public cover for hospital and doctor care, while US coverage is not universal and private insurance is central", correct: true },
        { text: "Both countries rely mainly on employer insurance and have the same Medicare programme", correct: false },
        { text: "Canada spends a larger share of GDP and has no public insurance", correct: false }
      ],
      model: "Canada guarantees public coverage for hospital and physician care, whereas US coverage is not universal and relies much more heavily on private insurance.",
      explanation: "The spending figures also differ: roughly 11–12% of GDP in Canada versus about 17% in the US card."
    },
    {
      phase: "BOARDING CHECK",
      tag: "SYSTEM SUMMARY",
      prompt: "Choose the best one-sentence summary of the Canadian system.",
      options: [
        { text: "A tax-funded, provincial single-payer system with universal hospital and physician cover, plus supplementary private insurance for some services", correct: true },
        { text: "A private-led system where coverage mainly depends on employment", correct: false },
        { text: "A national NHS that directly provides every health service for free", correct: false }
      ],
      model: "Canada has a tax-funded, provincial single-payer system with universal hospital and physician coverage and supplementary private insurance for some services.",
      explanation: "You now have the core profile needed to compare Canada with the next destination."
    }
  ];

  const sydneyItems = [
    {
      phase: "SYSTEM ARRIVAL",
      tag: "MODEL",
      prompt: "Which description best matches Australia's healthcare system?",
      options: [
        { text: "Universal public insurance with a strong private tier", correct: true },
        { text: "A private-led, non-universal insurance system", correct: false },
        { text: "A purely local system with no national public insurance", correct: false }
      ],
      model: "Australia combines universal public Medicare with a strong private tier.",
      explanation: "The country card describes Australia as universal public insurance plus a substantial private tier."
    },
    {
      phase: "FUNDING DESK",
      tag: "MEDICARE LEVY",
      prompt: "What is the Medicare Levy?",
      options: [
        { text: "A tax on income that helps fund Medicare", correct: true },
        { text: "A fee paid only when entering a public hospital", correct: false },
        { text: "A monthly private insurance premium", correct: false }
      ],
      model: "The Medicare Levy is a tax on income that helps fund Australia's public system.",
      explanation: "Australian Medicare is funded through general taxation plus a dedicated Medicare Levy on income."
    },
    {
      phase: "ACCESS DESK",
      tag: "PUBLIC HOSPITAL",
      prompt: "What does the country card say about public hospital care?",
      options: [
        { text: "It is free under the universal public system", correct: true },
        { text: "It is available only to people with private insurance", correct: false },
        { text: "Patients must always pay a gap fee before admission", correct: false }
      ],
      model: "Public hospital care is free under Australia's universal system.",
      explanation: "The card distinguishes free public hospital care from subsidised GP visits and medicines."
    },
    {
      phase: "BULK BILLING DESK",
      tag: "WHO PAYS?",
      prompt: "A GP says, ‘We bulk bill.’ What does that mean for the patient?",
      options: [
        { text: "The doctor bills Medicare directly and the patient pays nothing for that visit", correct: true },
        { text: "The patient pays the full consultation fee and receives no rebate", correct: false },
        { text: "The consultation is paid only by private insurance", correct: false }
      ],
      model: "With bulk billing, the doctor bills Medicare directly and the patient pays nothing for that visit.",
      explanation: "This is the key Australian access term: bulk billing removes the patient's payment for that consultation."
    },
    {
      phase: "COST DESK",
      tag: "GAP FEE",
      prompt: "If a doctor's charge is higher than the Medicare rebate, what may the patient have to pay?",
      options: [
        { text: "A gap fee or out-of-pocket amount", correct: true },
        { text: "A deductible before Medicare starts", correct: false },
        { text: "A National Insurance contribution at reception", correct: false }
      ],
      model: "A gap fee is the extra amount the patient pays above the Medicare rebate.",
      explanation: "The country card lists out-of-pocket gap fees as a current challenge."
    },
    {
      phase: "MEDICINES DESK",
      tag: "PBS",
      prompt: "What is the role of the PBS?",
      options: [
        { text: "It subsidises medicines", correct: true },
        { text: "It runs public hospitals", correct: false },
        { text: "It provides no-fault injury cover", correct: false }
      ],
      model: "The Pharmaceutical Benefits Scheme, or PBS, subsidises medicines.",
      explanation: "The PBS is one of the strengths identified on the Australia card because it helps keep medicines affordable."
    },
    {
      phase: "PRIVATE TIER",
      tag: "PRIVATE COVER",
      prompt: "How important is private hospital insurance in Australia according to the card?",
      options: [
        { text: "It has a large role; around half the population holds private hospital cover", correct: true },
        { text: "It is almost absent because private cover is banned", correct: false },
        { text: "It is compulsory for every resident", correct: false }
      ],
      model: "Private hospital insurance has a substantial role alongside universal Medicare.",
      explanation: "The card describes a two-tier public/private system and says around half the population holds private hospital cover."
    },
    {
      phase: "PRIVATE TIER",
      tag: "PRIVATE HEALTH REBATE",
      prompt: "What is the private health rebate?",
      options: [
        { text: "A government subsidy designed to encourage private cover", correct: true },
        { text: "A refund paid after every public hospital visit", correct: false },
        { text: "A charge on patients who use bulk billing", correct: false }
      ],
      model: "The private health rebate is a government subsidy that encourages private cover.",
      explanation: "Australia actively encourages a private tier alongside universal Medicare."
    },
    {
      phase: "REALITY CHECK",
      tag: "CURRENT PRESSURES",
      prompt: "Which challenge is highlighted on the Australian country card?",
      options: [
        { text: "Gap fees, pressure on public hospitals and rural or remote access", correct: true },
        { text: "No universal public hospital coverage", correct: false },
        { text: "No subsidy for medicines", correct: false }
      ],
      model: "Australia faces out-of-pocket gap fees, pressure on public hospitals and access problems in rural and remote areas.",
      explanation: "These are the three challenges listed on the country card."
    },
    {
      phase: "COMPARE THE ROUTE",
      tag: "AUSTRALIA vs UK",
      prompt: "Which comparison best fits Australia and the UK?",
      options: [
        { text: "Both are universal, but Australia's private tier has a larger role and GP care may involve gap fees", correct: true },
        { text: "Neither system offers universal coverage", correct: false },
        { text: "Private insurance is the main route to care in both systems", correct: false }
      ],
      model: "Both systems are universal, but private insurance has a larger role in Australia and patients may face gap fees.",
      explanation: "This comparison connects the Australian public/private mix with the more predominantly public NHS model."
    },
    {
      phase: "BOARDING CHECK",
      tag: "SYSTEM SUMMARY",
      prompt: "Choose the best one-sentence summary of the Australian system.",
      options: [
        { text: "Universal Medicare funded through taxation and the Medicare Levy, with free public hospitals, subsidised primary care and medicines, and a strong private tier", correct: true },
        { text: "A non-universal system based mainly on employer insurance and deductibles", correct: false },
        { text: "A universal single-payer provincial system with no major private hospital tier", correct: false }
      ],
      model: "Australia combines universal Medicare, free public hospital care, subsidised GP visits and medicines, and a strong private tier.",
      explanation: "That is the core Australian profile you need before the pronunciation training stop."
    }
  ];

  const finalSItems = [
    {
      phase: "WORD CHECK",
      tag: "SHORTAGES",
      word: "shortages",
      sentence: "Staff shortages are getting worse.",
      correctSound: "/ɪz/",
      explanation: "Shortage ends in the /dʒ/ sound, so plural -s is pronounced /ɪz/ and adds an extra syllable."
    },
    {
      phase: "WORD CHECK",
      tag: "SPECIALISTS",
      word: "specialists",
      sentence: "Patients sometimes wait too long to see specialists.",
      correctSound: "/s/",
      explanation: "Specialist ends in the voiceless /t/ sound, so final -s is pronounced /s/."
    },
    {
      phase: "WORD CHECK",
      tag: "RESIGNATIONS",
      word: "resignations",
      sentence: "Several resignations have been reported.",
      correctSound: "/z/",
      explanation: "Resignation ends in the voiced /n/ sound, so plural -s is pronounced /z/."
    },
    {
      phase: "WORD CHECK",
      tag: "MISSES",
      word: "misses",
      sentence: "Near misses can reveal serious safety problems.",
      correctSound: "/ɪz/",
      explanation: "Miss ends in /s/, so final -s is pronounced /ɪz/ and adds a syllable."
    },
    {
      phase: "WORD CHECK",
      tag: "LAYOFFS",
      word: "layoffs",
      sentence: "Layoffs can put additional pressure on a workforce.",
      correctSound: "/s/",
      explanation: "Layoff ends in the voiceless /f/ sound, so final -s is pronounced /s/."
    },
    {
      phase: "WORD CHECK",
      tag: "FAILURES",
      word: "failures",
      sentence: "The report describes several system failures.",
      correctSound: "/z/",
      explanation: "Failure ends in a voiced sound, so plural -s is pronounced /z/."
    },
    {
      phase: "WORD CHECK",
      tag: "NURSES",
      word: "nurses",
      sentence: "Nurses are working under pressure.",
      correctSound: "/ɪz/",
      explanation: "Nurse ends in /s/, so plural -s is pronounced /ɪz/."
    },
    {
      phase: "WORD CHECK",
      tag: "PATIENTS",
      word: "patients",
      sentence: "Patients may face long waiting times.",
      correctSound: "/s/",
      explanation: "Patient ends in the voiceless /t/ sound, so final -s is pronounced /s/."
    },
    {
      phase: "WORD CHECK",
      tag: "STORIES",
      word: "stories",
      sentence: "Patient stories can show how access problems affect daily life.",
      correctSound: "/z/",
      explanation: "Story ends in a voiced vowel sound, so plural -s is pronounced /z/."
    },
    {
      phase: "RULE TRANSFER",
      tag: "DOSES · ANALYSES · CASES",
      word: "doses, analyses, cases",
      sentence: "The study compares doses, analyses and cases.",
      correctSound: "/ɪz/",
      explanation: "These words end in sibilant sounds, so the final -s creates the extra /ɪz/ syllable."
    },
    {
      phase: "RULE TRANSFER",
      tag: "RESULTS · PATIENTS · GROUPS",
      word: "results, patients, groups",
      sentence: "The results compare patients in two groups.",
      correctSound: "/s/",
      explanation: "After voiceless final sounds such as /t/ or /p/, final -s is pronounced /s/."
    },
    {
      phase: "RULE TRANSFER",
      tag: "FINDINGS · VALUES · METHODS",
      word: "findings, values, methods",
      sentence: "The findings, values and methods are clearly presented.",
      correctSound: "/z/",
      explanation: "After voiced sounds, final -s is normally pronounced /z/."
    }
  ];

  const wellingtonItems = [
    {
      phase: "SYSTEM CHECK",
      tag: "WHO RUNS IT?",
      prompt: "Since the 2022 reform, which national body runs New Zealand's health system?",
      options: [
        { text: "Health NZ / Te Whatu Ora", correct: true },
        { text: "The former District Health Boards", correct: false },
        { text: "ACC", correct: false }
      ],
      model: "Since the 2022 reform, Health NZ, or Te Whatu Ora, has run the national health system.",
      explanation: "The 20 District Health Boards were merged into a single national body in 2022."
    },
    {
      phase: "SYSTEM CHECK",
      tag: "FUNDING",
      prompt: "How is New Zealand's health system mainly funded?",
      options: [
        { text: "Mainly through general taxation", correct: true },
        { text: "Mainly through private insurance premiums", correct: false },
        { text: "Mainly through GP co-payments", correct: false }
      ],
      model: "New Zealand's public health system is funded mainly through general taxation.",
      explanation: "The system is tax-funded and publicly run."
    },
    {
      phase: "SYSTEM CHECK",
      tag: "ACCESS",
      prompt: "Which statement best describes care at the point of use?",
      options: [
        { text: "Public hospital care is free, but GP visits commonly involve a co-payment", correct: true },
        { text: "All healthcare is completely free", correct: false },
        { text: "Patients pay the full cost of public hospital care", correct: false }
      ],
      model: "Public hospital care is free, while GP visits are subsidised and commonly involve a co-payment.",
      explanation: "Universal coverage does not mean every service is completely free at the point of use."
    },
    {
      phase: "SYSTEM CHECK",
      tag: "ACC",
      prompt: "What is distinctive about ACC injury cover?",
      options: [
        { text: "It covers treatment for injuries on a no-fault basis", correct: true },
        { text: "It only covers injuries caused by employers", correct: false },
        { text: "Patients must prove who was legally at fault before treatment is covered", correct: false }
      ],
      model: "ACC provides no-fault injury cover, so patients do not have to prove who caused the injury.",
      explanation: "No-fault means injury cover does not depend on proving blame."
    },
    {
      phase: "SYSTEM CHECK",
      tag: "PRIVATE COVER",
      prompt: "What role does private insurance play in New Zealand?",
      options: [
        { text: "A supplementary role, often for faster elective or private treatment", correct: true },
        { text: "It is compulsory for all residents", correct: false },
        { text: "It replaces public hospital care", correct: false }
      ],
      model: "Private insurance is supplementary rather than the core route to coverage.",
      explanation: "The Day 2 card says around a third of people hold some private cover, mainly for faster elective or private treatment."
    },
    {
      phase: "RNZ NEWS FEED",
      tag: "TRUE · FALSE · NOT GIVEN",
      prompt: "Senior figures in New Zealand's health service are resigning one after another.",
      options: [
        { text: "True", correct: true },
        { text: "False", correct: false },
        { text: "Not Given", correct: false }
      ],
      model: "The RNZ clip reports a succession of senior resignations.",
      explanation: "This is stated in the clip."
    },
    {
      phase: "RNZ NEWS FEED",
      tag: "TRUE · FALSE · NOT GIVEN",
      prompt: "Patients are waiting too long in emergency departments, for a GP and for scans.",
      options: [
        { text: "True", correct: true },
        { text: "False", correct: false },
        { text: "Not Given", correct: false }
      ],
      model: "The report links the crisis to long waits in emergency departments, for GPs and for scans.",
      explanation: "These waiting problems are explicitly mentioned."
    },
    {
      phase: "RNZ NEWS FEED",
      tag: "TRUE · FALSE · NOT GIVEN",
      prompt: "The clip says the number of resignations is now falling.",
      options: [
        { text: "False", correct: true },
        { text: "True", correct: false },
        { text: "Not Given", correct: false }
      ],
      model: "The clip says the list of resignations is getting longer, not shorter.",
      explanation: "The statement reverses what the clip reports."
    },
    {
      phase: "RNZ NEWS FEED",
      tag: "TRUE · FALSE · NOT GIVEN",
      prompt: "The opposition believes these senior figures are simply choosing to move on at the right point in their careers.",
      options: [
        { text: "False", correct: true },
        { text: "True", correct: false },
        { text: "Not Given", correct: false }
      ],
      model: "The opposition claims senior figures are being pushed out rather than simply moving on.",
      explanation: "The statement contradicts the political claim reported in the clip."
    },
    {
      phase: "RNZ NEWS FEED",
      tag: "TRUE · FALSE · NOT GIVEN",
      prompt: "The clip states the exact number of staff who have resigned.",
      options: [
        { text: "Not Given", correct: true },
        { text: "True", correct: false },
        { text: "False", correct: false }
      ],
      model: "The clip describes multiple resignations but does not state an exact total.",
      explanation: "Not Given means the clip does not provide this information."
    },
    {
      phase: "RNZ NEWS FEED",
      tag: "SOURCE CHECK",
      prompt: "The clip is taken from a podcast called The Detail.",
      options: [
        { text: "True", correct: true },
        { text: "False", correct: false },
        { text: "Not Given", correct: false }
      ],
      model: "The source is The Detail from RNZ, Radio New Zealand.",
      explanation: "The programme name is explicitly identified."
    },
    {
      phase: "EVIDENCE DESK",
      tag: "FACT OR CLAIM?",
      prompt: "“Senior figures are being pushed out and blamed for the government's own failures.” How should you classify this statement in the context of the clip?",
      options: [
        { text: "A political claim attributed to the opposition", correct: true },
        { text: "An established fact stated without attribution", correct: false },
        { text: "Information not mentioned anywhere", correct: false }
      ],
      model: "The clip reports this as an opposition claim, so it should remain attributed rather than presented as an established fact.",
      explanation: "Good reporting language preserves who is making a contested claim."
    },
    {
      phase: "EVIDENCE DESK",
      tag: "CONTEXT CHECK",
      prompt: "Which summary best matches the context presented by the RNZ clip?",
      options: [
        { text: "Leadership departures are occurring against a background of shortages, long waits and hospital near misses", correct: true },
        { text: "The health service has solved its workforce shortages and waiting-time problems", correct: false },
        { text: "The clip focuses mainly on private health insurance premiums", correct: false }
      ],
      model: "The leadership crisis is reported against a background of workforce shortages, long waits and hospital near misses.",
      explanation: "This combines the reported system pressures without turning the opposition's interpretation into fact."
    }
  ];

  const defaults = {
    departureStarted: false,
    departureIndex: 0,
    departureScore: 0,
    departureMissed: [],
    departureComplete: false,
    londonStarted: false,
    londonIndex: 0,
    londonScore: 0,
    londonMissed: [],
    londonComplete: false,
    newYorkStarted: false,
    newYorkIndex: 0,
    newYorkScore: 0,
    newYorkMissed: [],
    newYorkComplete: false,
    torontoStarted: false,
    torontoIndex: 0,
    torontoScore: 0,
    torontoMissed: [],
    torontoComplete: false,
    sydneyStarted: false,
    sydneyIndex: 0,
    sydneyScore: 0,
    sydneyMissed: [],
    sydneyComplete: false,
    finalSStarted: false,
    finalSIndex: 0,
    finalSScore: 0,
    finalSMissed: [],
    finalSComplete: false,
    wellingtonStarted: false,
    wellingtonIndex: 0,
    wellingtonScore: 0,
    wellingtonMissed: [],
    wellingtonComplete: false
  };

  const $ = id => document.getElementById(id);
  const els = {
    startPassport: $("startPassport"),
    soundToggle: $("day2SoundToggle"),
    reset: $("resetDay2Progress"),
    audioStatus: $("day2AudioStatus"),
    passportClearance: $("passportClearance"),
    departureArea: $("departureArea"),
    departureScreen: $("departureScreen"),
    departureFeedback: $("departureFeedback"),
    departureCheckpoint: $("departureCheckpoint"),
    departureProgressBar: $("departureProgressBar"),
    departureBoardStatus: $("departureBoardStatus"),
    londonArea: $("londonArea"),
    startLondon: $("startLondon"),
    londonScreen: $("londonScreen"),
    londonFeedback: $("londonFeedback"),
    londonCheckpoint: $("londonCheckpoint"),
    londonProgressBar: $("londonProgressBar"),
    londonInstruction: $("londonInstruction"),
    newYorkArea: $("newYorkArea"),
    startNewYork: $("startNewYork"),
    newYorkScreen: $("newYorkScreen"),
    newYorkFeedback: $("newYorkFeedback"),
    newYorkCheckpoint: $("newYorkCheckpoint"),
    newYorkProgressBar: $("newYorkProgressBar"),
    newYorkInstruction: $("newYorkInstruction"),
    torontoArea: $("torontoArea"),
    startToronto: $("startToronto"),
    torontoScreen: $("torontoScreen"),
    torontoFeedback: $("torontoFeedback"),
    torontoCheckpoint: $("torontoCheckpoint"),
    torontoProgressBar: $("torontoProgressBar"),
    torontoInstruction: $("torontoInstruction"),
    sydneyArea: $("sydneyArea"),
    startSydney: $("startSydney"),
    sydneyScreen: $("sydneyScreen"),
    sydneyFeedback: $("sydneyFeedback"),
    sydneyCheckpoint: $("sydneyCheckpoint"),
    sydneyProgressBar: $("sydneyProgressBar"),
    sydneyInstruction: $("sydneyInstruction"),
    finalSArea: $("finalSArea"),
    startFinalS: $("startFinalS"),
    finalSScreen: $("finalSScreen"),
    finalSFeedback: $("finalSFeedback"),
    finalSCheckpoint: $("finalSCheckpoint"),
    finalSProgressBar: $("finalSProgressBar"),
    finalSInstruction: $("finalSInstruction"),
    wellingtonArea: $("wellingtonArea"),
    startWellington: $("startWellington"),
    wellingtonScreen: $("wellingtonScreen"),
    wellingtonFeedback: $("wellingtonFeedback"),
    wellingtonCheckpoint: $("wellingtonCheckpoint"),
    wellingtonProgressBar: $("wellingtonProgressBar"),
    wellingtonInstruction: $("wellingtonInstruction"),
    routeUk: $("routeUk"),
    routeUkStatus: $("routeUkStatus"),
    routeUs: $("routeUs"),
    routeUsStatus: $("routeUsStatus"),
    routeCa: $("routeCa"),
    routeCaStatus: $("routeCaStatus"),
    routeAu: $("routeAu"),
    routeAuStatus: $("routeAuStatus"),
    routeNz: $("routeNz"),
    routeNzStatus: $("routeNzStatus"),
    routeIe: $("routeIe"),
    routeIeStatus: $("routeIeStatus"),
    stampDeparture: $("stampDeparture"),
    stampUk: $("stampUk"),
    stampUs: $("stampUs"),
    stampCa: $("stampCa"),
    stampAu: $("stampAu"),
    stampFinalS: $("stampFinalS"),
    stampNz: $("stampNz")
  };

  let state = loadState();
  let soundOn = localStorage.getItem(SOUND_KEY) !== "off";

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return { ...defaults, ...saved };
    } catch {
      return { ...defaults };
    }
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function setStatus(message) {
    if (!els.audioStatus) return;
    els.audioStatus.textContent = message;
    window.clearTimeout(setStatus.timer);
    setStatus.timer = window.setTimeout(() => {
      if (els.audioStatus.textContent === message) els.audioStatus.textContent = "";
    }, 3200);
  }

  function chooseBritishVoice() {
    if (!("speechSynthesis" in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    return voices.find(v => /^en-GB/i.test(v.lang) && /natural|premium|enhanced/i.test(v.name)) ||
      voices.find(v => /^en-GB/i.test(v.lang)) ||
      voices.find(v => /^en/i.test(v.lang)) ||
      null;
  }

  function speak(text) {
    if (!soundOn) {
      setStatus("Sound is off. The transcript remains visible.");
      return;
    }
    if (!("speechSynthesis" in window)) {
      setStatus("Speech synthesis is not available on this device.");
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-GB";
    utterance.rate = 0.94;
    utterance.pitch = 1;
    const voice = chooseBritishVoice();
    if (voice) utterance.voice = voice;
    window.speechSynthesis.speak(utterance);
  }

  function playTone(kind = "good") {
    if (!soundOn) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = kind === "good" ? 660 : 260;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.15);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.17);
      osc.onended = () => ctx.close();
    } catch {}
  }

  function shuffle(array) {
    const a = [...array];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function optionButtons(options, handler) {
    return shuffle(options).map(option => {
      const button = document.createElement("button");
      button.className = "passport-option";
      button.type = "button";
      button.textContent = option.text;
      button.addEventListener("click", () => handler(option, button));
      return button;
    });
  }

  function lockOptions(container) {
    container.querySelectorAll("button.passport-option").forEach(button => button.disabled = true);
  }

  function updateProgress() {
    const depDone = state.departureComplete ? 4 : Math.min(state.departureIndex, 4);
    els.departureCheckpoint.textContent = `${depDone} / 4`;
    els.departureProgressBar.style.width = `${(depDone / 4) * 100}%`;

    const lonDone = state.londonComplete ? londonItems.length : Math.min(state.londonIndex, londonItems.length);
    els.londonCheckpoint.textContent = `${lonDone} / ${londonItems.length}`;
    els.londonProgressBar.style.width = `${(lonDone / londonItems.length) * 100}%`;

    const nyDone = state.newYorkComplete ? newYorkItems.length : Math.min(state.newYorkIndex, newYorkItems.length);
    els.newYorkCheckpoint.textContent = `${nyDone} / ${newYorkItems.length}`;
    els.newYorkProgressBar.style.width = `${(nyDone / newYorkItems.length) * 100}%`;

    const torDone = state.torontoComplete ? torontoItems.length : Math.min(state.torontoIndex, torontoItems.length);
    els.torontoCheckpoint.textContent = `${torDone} / ${torontoItems.length}`;
    els.torontoProgressBar.style.width = `${(torDone / torontoItems.length) * 100}%`;

    const sydDone = state.sydneyComplete ? sydneyItems.length : Math.min(state.sydneyIndex, sydneyItems.length);
    els.sydneyCheckpoint.textContent = `${sydDone} / ${sydneyItems.length}`;
    els.sydneyProgressBar.style.width = `${(sydDone / sydneyItems.length) * 100}%`;

    const sDone = state.finalSComplete ? finalSItems.length : Math.min(state.finalSIndex, finalSItems.length);
    els.finalSCheckpoint.textContent = `${sDone} / ${finalSItems.length}`;
    els.finalSProgressBar.style.width = `${(sDone / finalSItems.length) * 100}%`;

    const nzDone = state.wellingtonComplete ? wellingtonItems.length : Math.min(state.wellingtonIndex, wellingtonItems.length);
    els.wellingtonCheckpoint.textContent = `${nzDone} / ${wellingtonItems.length}`;
    els.wellingtonProgressBar.style.width = `${(nzDone / wellingtonItems.length) * 100}%`;

    if (state.departureComplete) {
      els.passportClearance.textContent = state.wellingtonComplete ? "Wellington cleared" : state.finalSComplete ? "Training Bay cleared" : state.sydneyComplete ? "Sydney cleared" : state.torontoComplete ? "Toronto cleared" : state.newYorkComplete ? "New York cleared" : state.londonComplete ? "London cleared" : "Issued";
      els.departureBoardStatus.textContent = "BOARDING";
      els.stampDeparture.classList.remove("stamp-empty");
      els.stampDeparture.classList.add("stamp-earned");
      els.londonArea.classList.remove("is-locked");
      els.startLondon.disabled = false;
      els.startLondon.textContent = state.londonStarted ? "Resume London →" : "Start London →";
      els.londonInstruction.textContent = state.londonComplete ? "London completed. Your NHS Navigator stamp has been issued." : "Passport issued. Your first international assignment is ready.";
    } else {
      els.passportClearance.textContent = "Not issued";
      els.departureBoardStatus.textContent = state.departureStarted ? "CHECKING" : "CHECK-IN";
      els.londonArea.classList.add("is-locked");
      els.startLondon.disabled = true;
      els.startLondon.textContent = "London locked";
    }

    if (state.londonComplete) {
      els.stampUk.classList.remove("stamp-empty");
      els.stampUk.classList.add("stamp-earned");
      els.routeUk.classList.remove("destination-next");
      els.routeUk.classList.add("destination-cleared");
      els.routeUkStatus.textContent = "CLEARED";
      els.newYorkArea.classList.remove("is-locked");
      els.startNewYork.disabled = false;
      els.startNewYork.textContent = state.newYorkStarted ? "Resume New York →" : "Enter Insurance Maze →";
      els.newYorkInstruction.textContent = state.newYorkComplete ? "New York completed. Your Insurance Decoder stamp has been issued." : "London cleared. Your US insurance assignment is ready.";
      if (!state.newYorkComplete) {
        els.routeUs.classList.remove("destination-locked", "destination-cleared");
        els.routeUs.classList.add("destination-next");
        els.routeUsStatus.textContent = state.newYorkStarted ? "IN PROGRESS" : "NEXT";
      }
    } else {
      els.stampUk.classList.remove("stamp-earned");
      els.stampUk.classList.add("stamp-empty");
      els.routeUk.classList.remove("destination-cleared");
      els.routeUk.classList.add("destination-next");
      els.routeUkStatus.textContent = state.departureComplete ? "BOARDING" : "NEXT";
      els.newYorkArea.classList.add("is-locked");
      els.startNewYork.disabled = true;
      els.startNewYork.textContent = "New York locked";
      els.routeUs.classList.remove("destination-next", "destination-cleared");
      els.routeUs.classList.add("destination-locked");
      els.routeUsStatus.textContent = "LOCKED";
    }

    if (state.newYorkComplete) {
      els.stampUs.classList.remove("stamp-empty");
      els.stampUs.classList.add("stamp-earned");
      els.routeUs.classList.remove("destination-next", "destination-locked");
      els.routeUs.classList.add("destination-cleared");
      els.routeUsStatus.textContent = "CLEARED";
      els.torontoArea.classList.remove("is-locked");
      els.startToronto.disabled = false;
      els.startToronto.textContent = state.torontoStarted ? "Resume Toronto →" : "Enter Canadian Medicare →";
      els.torontoInstruction.textContent = state.torontoComplete ? "Toronto completed. Your Medicare Specialist stamp has been issued." : "New York cleared. Your Canadian Medicare assignment is ready.";
      if (!state.torontoComplete) {
        els.routeCa.classList.remove("destination-locked", "destination-cleared");
        els.routeCa.classList.add("destination-next");
        els.routeCaStatus.textContent = state.torontoStarted ? "IN PROGRESS" : "NEXT";
      }
    } else {
      els.stampUs.classList.remove("stamp-earned");
      els.stampUs.classList.add("stamp-empty");
      els.torontoArea.classList.add("is-locked");
      els.startToronto.disabled = true;
      els.startToronto.textContent = "Toronto locked";
      els.routeCa.classList.remove("destination-next", "destination-cleared");
      els.routeCa.classList.add("destination-locked");
      els.routeCaStatus.textContent = "LOCKED";
    }

    if (state.torontoComplete) {
      els.stampCa.classList.remove("stamp-empty");
      els.stampCa.classList.add("stamp-earned");
      els.routeCa.classList.remove("destination-next", "destination-locked");
      els.routeCa.classList.add("destination-cleared");
      els.routeCaStatus.textContent = "CLEARED";
      els.sydneyArea.classList.remove("is-locked");
      els.startSydney.disabled = false;
      els.startSydney.textContent = state.sydneyStarted ? "Resume Sydney →" : "Enter Bulk Billing Challenge →";
      els.sydneyInstruction.textContent = state.sydneyComplete ? "Sydney completed. Your Bulk Billing Expert stamp has been issued." : "Toronto cleared. Your Australian Medicare assignment is ready.";
      if (!state.sydneyComplete) {
        els.routeAu.classList.remove("destination-locked", "destination-cleared");
        els.routeAu.classList.add("destination-next");
        els.routeAuStatus.textContent = state.sydneyStarted ? "IN PROGRESS" : "NEXT";
      }
    } else {
      els.stampCa.classList.remove("stamp-earned");
      els.stampCa.classList.add("stamp-empty");
      els.sydneyArea.classList.add("is-locked");
      els.startSydney.disabled = true;
      els.startSydney.textContent = "Sydney locked";
      els.routeAu.classList.remove("destination-next", "destination-cleared");
      els.routeAu.classList.add("destination-locked");
      els.routeAuStatus.textContent = "LOCKED";
    }

    if (state.sydneyComplete) {
      els.stampAu.classList.remove("stamp-empty");
      els.stampAu.classList.add("stamp-earned");
      els.routeAu.classList.remove("destination-next", "destination-locked");
      els.routeAu.classList.add("destination-cleared");
      els.routeAuStatus.textContent = "CLEARED";
      els.finalSArea.classList.remove("is-locked");
      els.startFinalS.disabled = false;
      els.startFinalS.textContent = state.finalSStarted ? "Resume Sound Check →" : "Enter Training Bay →";
      els.finalSInstruction.textContent = state.finalSComplete ? "Communication check completed. Your Clear Communicator stamp has been issued." : "Sydney cleared. Complete your pronunciation check before boarding for Wellington.";
    } else {
      els.stampAu.classList.remove("stamp-earned");
      els.stampAu.classList.add("stamp-empty");
      els.finalSArea.classList.add("is-locked");
      els.startFinalS.disabled = true;
      els.startFinalS.textContent = "Training Bay locked";
    }

    if (state.finalSComplete) {
      els.stampFinalS.classList.remove("stamp-empty");
      els.stampFinalS.classList.add("stamp-earned");
      els.wellingtonArea.classList.remove("is-locked");
      els.startWellington.disabled = false;
      els.startWellington.textContent = state.wellingtonStarted ? "Resume Wellington →" : "Open Health System Alert →";
      els.wellingtonInstruction.textContent = state.wellingtonComplete ? "Wellington completed. Your System Crisis Analyst stamp has been issued." : "Communication check cleared. Your New Zealand assignment is ready.";
      if (!state.wellingtonComplete) {
        els.routeNz.classList.remove("destination-locked", "destination-cleared");
        els.routeNz.classList.add("destination-next");
        els.routeNzStatus.textContent = state.wellingtonStarted ? "IN PROGRESS" : "NEXT";
      }
    } else {
      els.stampFinalS.classList.remove("stamp-earned");
      els.stampFinalS.classList.add("stamp-empty");
      els.wellingtonArea.classList.add("is-locked");
      els.startWellington.disabled = true;
      els.startWellington.textContent = "Wellington locked";
      els.routeNz.classList.remove("destination-next", "destination-cleared");
      els.routeNz.classList.add("destination-locked");
      els.routeNzStatus.textContent = "LOCKED";
    }

    if (state.wellingtonComplete) {
      els.stampNz.classList.remove("stamp-empty");
      els.stampNz.classList.add("stamp-earned");
      els.routeNz.classList.remove("destination-next", "destination-locked");
      els.routeNz.classList.add("destination-cleared");
      els.routeNzStatus.textContent = "CLEARED";
      els.routeIe.classList.remove("destination-locked", "destination-cleared");
      els.routeIe.classList.add("destination-next");
      els.routeIeStatus.textContent = "NEXT";
    } else {
      els.stampNz.classList.remove("stamp-earned");
      els.stampNz.classList.add("stamp-empty");
      els.routeIe.classList.remove("destination-next", "destination-cleared");
      els.routeIe.classList.add("destination-locked");
      els.routeIeStatus.textContent = "LOCKED";
    }
  }

  function renderDeparture() {
    updateProgress();
    els.departureFeedback.innerHTML = "";

    if (!state.departureStarted) {
      els.departureScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🛂</span><h3>Passport not issued yet</h3><p>Enter the Departure Lounge to begin your international rotation.</p></div>`;
      return;
    }

    if (state.departureComplete) {
      const pct = Math.round((state.departureScore / departureItems.length) * 100);
      els.departureScreen.innerHTML = `<div class="passport-complete-card"><div class="passport-complete-icon" aria-hidden="true">🛂</div><p class="passport-case-kicker">PASSPORT CONTROL CLEARED</p><h3>Your Global Health Passport has been issued.</h3><p>You identified the four questions that structure every destination: funding, provision, coverage and patient cost.</p><div class="passport-score-line"><strong>${state.departureScore} / ${departureItems.length}</strong><span>${pct}% first-attempt score</span></div><button id="goLondon" class="passport-primary" type="button">Board for London →</button></div>`;
      $("goLondon").addEventListener("click", () => {
        els.londonArea.scrollIntoView({ behavior: "smooth", block: "start" });
        els.startLondon.focus({ preventScroll: true });
      });
      return;
    }

    const item = departureItems[state.departureIndex];
    els.departureScreen.innerHTML = `<div class="passport-question-card"><div class="passport-question-meta"><span>${item.tag}</span><b>Passport Control</b></div><h3>${item.prompt}</h3><div id="departureOptions" class="passport-options"></div></div>`;
    const optionWrap = $("departureOptions");
    optionButtons(item.options, (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.departureMissed.includes(state.departureIndex)) state.departureScore += 1;
        state.departureIndex += 1;
        if (state.departureIndex >= departureItems.length) state.departureComplete = true;
        saveState();
        playTone("good");
        els.departureFeedback.innerHTML = `<div class="feedback-good"><strong>Clearance accepted.</strong><span>${item.explanation}</span></div><button id="departureNext" class="passport-next" type="button">${state.departureComplete ? "Issue passport →" : "Next check →"}</button>`;
        $("departureNext").addEventListener("click", renderDeparture);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.departureMissed.includes(state.departureIndex)) state.departureMissed.push(state.departureIndex);
        saveState();
        playTone("bad");
        els.departureFeedback.innerHTML = `<div class="feedback-bad"><strong>Not this one.</strong><span>Think about the structure of access to care, not clinical medicine itself.</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startDeparture() {
    state.departureStarted = true;
    saveState();
    renderDeparture();
    els.departureArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.departureScreen.focus({ preventScroll: true }), 450);
  }

  function renderLondon() {
    updateProgress();
    els.londonFeedback.innerHTML = "";
    if (!state.departureComplete) return;

    if (!state.londonStarted) {
      els.londonScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🇬🇧</span><h3>Welcome to London</h3><p>Your NHS assignment is ready. Start when you are ready.</p></div>`;
      return;
    }

    if (state.londonComplete) {
      const pct = Math.round((state.londonScore / londonItems.length) * 100);
      els.londonScreen.innerHTML = `<div class="passport-complete-card london-complete"><div class="passport-complete-icon" aria-hidden="true">🇬🇧</div><p class="passport-case-kicker">STOP 01 CLEARED</p><h3>NHS Navigator</h3><p>You can explain the basic funding, coverage, access pathway, private-insurance role and major pressures in the UK system.</p><div class="passport-score-line"><strong>${state.londonScore} / ${londonItems.length}</strong><span>${pct}% first-attempt score</span></div><div class="passport-model-box"><span>MODEL SUMMARY</span><p>“The NHS is a tax-funded, publicly run, universal system with most care free at the point of use.”</p><button id="hearNhsSummary" class="passport-hear" type="button">🔊 Hear summary</button></div><div class="passport-next-route"><strong>Next stop</strong><span>🇺🇸 New York · The Insurance Maze is ready.</span></div><button id="goNewYork" class="passport-primary" type="button">Fly to New York →</button></div>`;
      $("hearNhsSummary").addEventListener("click", () => speak("The NHS is a tax-funded, publicly run, universal system with most care free at the point of use."));
      $("goNewYork").addEventListener("click", () => {
        els.newYorkArea.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => els.startNewYork.focus({ preventScroll: true }), 450);
      });
      updateProgress();
      return;
    }

    const item = londonItems[state.londonIndex];
    els.londonScreen.innerHTML = `<div class="passport-question-card london-question"><div class="passport-question-meta"><span>${item.phase}</span><b>${item.tag}</b></div><h3>${item.prompt}</h3><div id="londonOptions" class="passport-options"></div></div>`;
    const optionWrap = $("londonOptions");
    optionButtons(item.options, (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.londonMissed.includes(state.londonIndex)) state.londonScore += 1;
        state.londonIndex += 1;
        if (state.londonIndex >= londonItems.length) state.londonComplete = true;
        saveState();
        playTone("good");
        els.londonFeedback.innerHTML = `<div class="feedback-good"><strong>Correct.</strong><span>${item.explanation}</span></div><div class="passport-transcript"><span>USEFUL ENGLISH</span><p>${item.model}</p><button id="hearLondonModel" class="passport-hear" type="button">🔊 Hear it</button></div><button id="londonNext" class="passport-next" type="button">${state.londonComplete ? "Stamp passport →" : "Continue assignment →"}</button>`;
        $("hearLondonModel").addEventListener("click", () => speak(item.model));
        $("londonNext").addEventListener("click", renderLondon);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.londonMissed.includes(state.londonIndex)) state.londonMissed.push(state.londonIndex);
        saveState();
        playTone("bad");
        els.londonFeedback.innerHTML = `<div class="feedback-bad"><strong>Check the NHS briefing.</strong><span>Use the funding, access, vocabulary and strengths/challenges shown in this stop.</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startLondon() {
    if (!state.departureComplete) return;
    state.londonStarted = true;
    saveState();
    renderLondon();
    els.londonArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.londonScreen.focus({ preventScroll: true }), 450);
  }

  function renderNewYork() {
    updateProgress();
    els.newYorkFeedback.innerHTML = "";
    if (!state.londonComplete) return;

    if (!state.newYorkStarted) {
      els.newYorkScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🇺🇸</span><h3>Welcome to New York</h3><p>Your insurance-decoding assignment is ready. You will need to understand cost vocabulary, coverage pathways and the contrast with the NHS.</p></div>`;
      return;
    }

    if (state.newYorkComplete) {
      const pct = Math.round((state.newYorkScore / newYorkItems.length) * 100);
      els.newYorkScreen.innerHTML = `<div class="passport-complete-card us-complete"><div class="passport-complete-icon" aria-hidden="true">🇺🇸</div><p class="passport-case-kicker">STOP 02 CLEARED</p><h3>Insurance Decoder</h3><p>You can distinguish premium, deductible, co-pay and out-of-network costs, identify the roles of employer insurance, Medicare and Medicaid, and explain why the US system is not universal.</p><div class="passport-score-line"><strong>${state.newYorkScore} / ${newYorkItems.length}</strong><span>${pct}% first-attempt score</span></div><div class="passport-model-box"><span>MODEL SUMMARY</span><p>“The US has a mixed, private-led system in which employer insurance is central, public programmes cover specific groups, and coverage is not universal.”</p><button id="hearUsSummary" class="passport-hear" type="button">🔊 Hear summary</button></div><div class="comparison-ticket"><span>🇬🇧 LONDON</span><b>Private insurance: supplementary</b><span>↔</span><b>Private insurance: central</b><span>🇺🇸 NEW YORK</span></div><div class="passport-next-route"><strong>Next stop</strong><span>🇨🇦 Toronto · Medicare — but not THAT Medicare.</span></div><button id="goToronto" class="passport-primary" type="button">Fly to Toronto →</button></div>`;
      $("hearUsSummary").addEventListener("click", () => speak("The US has a mixed, private-led system in which employer insurance is central, public programmes cover specific groups, and coverage is not universal."));
      $("goToronto").addEventListener("click", () => {
        els.torontoArea.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => els.startToronto.focus({ preventScroll: true }), 450);
      });
      updateProgress();
      return;
    }

    const item = newYorkItems[state.newYorkIndex];
    els.newYorkScreen.innerHTML = `<div class="passport-question-card us-question"><div class="passport-question-meta"><span>${item.phase}</span><b>${item.tag}</b></div><h3>${item.prompt}</h3><div id="newYorkOptions" class="passport-options"></div></div>`;
    const optionWrap = $("newYorkOptions");
    optionButtons(item.options, (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.newYorkMissed.includes(state.newYorkIndex)) state.newYorkScore += 1;
        state.newYorkIndex += 1;
        if (state.newYorkIndex >= newYorkItems.length) state.newYorkComplete = true;
        saveState();
        playTone("good");
        els.newYorkFeedback.innerHTML = `<div class="feedback-good"><strong>Decoded.</strong><span>${item.explanation}</span></div><div class="passport-transcript us-transcript"><span>USEFUL ENGLISH</span><p>${item.model}</p><button id="hearUsModel" class="passport-hear" type="button">🔊 Hear it</button></div><button id="newYorkNext" class="passport-next" type="button">${state.newYorkComplete ? "Stamp passport →" : "Continue through the maze →"}</button>`;
        $("hearUsModel").addEventListener("click", () => speak(item.model));
        $("newYorkNext").addEventListener("click", renderNewYork);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.newYorkMissed.includes(state.newYorkIndex)) state.newYorkMissed.push(state.newYorkIndex);
        saveState();
        playTone("bad");
        els.newYorkFeedback.innerHTML = `<div class="feedback-bad"><strong>Insurance maze: wrong turn.</strong><span>Use the US briefing and distinguish insurance costs, public programmes and coverage carefully.</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startNewYork() {
    if (!state.londonComplete) return;
    state.newYorkStarted = true;
    saveState();
    renderNewYork();
    els.newYorkArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.newYorkScreen.focus({ preventScroll: true }), 450);
  }

  function renderToronto() {
    updateProgress();
    els.torontoFeedback.innerHTML = "";
    if (!state.newYorkComplete) return;

    if (!state.torontoStarted) {
      els.torontoScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🇨🇦</span><h3>Welcome to Toronto</h3><p>Your Canadian Medicare assignment is ready. Watch for the trap: the word Medicare does not mean the same thing here as it did in New York.</p></div>`;
      return;
    }

    if (state.torontoComplete) {
      const pct = Math.round((state.torontoScore / torontoItems.length) * 100);
      els.torontoScreen.innerHTML = `<div class="passport-complete-card canada-complete"><div class="passport-complete-icon" aria-hidden="true">🇨🇦</div><p class="passport-case-kicker">STOP 03 CLEARED</p><h3>Medicare Specialist</h3><p>You can explain Canada's provincial single-payer structure, distinguish universal hospital and physician coverage from services that may fall outside Medicare, and compare Canadian Medicare with the US system.</p><div class="passport-score-line"><strong>${state.torontoScore} / ${torontoItems.length}</strong><span>${pct}% first-attempt score</span></div><div class="passport-model-box"><span>MODEL SUMMARY</span><p>“Canada has a tax-funded, provincial single-payer system with universal hospital and physician coverage and supplementary private insurance for some services.”</p><button id="hearCanadaSummary" class="passport-hear" type="button">🔊 Hear summary</button></div><div class="comparison-ticket canada-ticket"><span>🇺🇸 NEW YORK</span><b>Medicare: 65+ public programme</b><span>≠</span><b>Medicare: public hospital + physician cover</b><span>🇨🇦 TORONTO</span></div><div class="passport-next-route"><strong>Next stop</strong><span>🇦🇺 Sydney · The Bulk Billing Challenge.</span></div><button id="goSydney" class="passport-primary" type="button">Fly to Sydney →</button></div>`;
      $("hearCanadaSummary").addEventListener("click", () => speak("Canada has a tax-funded, provincial single-payer system with universal hospital and physician coverage and supplementary private insurance for some services."));
      $("goSydney").addEventListener("click", () => {
        els.sydneyArea.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => els.startSydney.focus({ preventScroll: true }), 450);
      });
      updateProgress();
      return;
    }

    const item = torontoItems[state.torontoIndex];
    els.torontoScreen.innerHTML = `<div class="passport-question-card canada-question"><div class="passport-question-meta"><span>${item.phase}</span><b>${item.tag}</b></div><h3>${item.prompt}</h3><div id="torontoOptions" class="passport-options"></div></div>`;
    const optionWrap = $("torontoOptions");
    optionButtons(item.options, (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.torontoMissed.includes(state.torontoIndex)) state.torontoScore += 1;
        state.torontoIndex += 1;
        if (state.torontoIndex >= torontoItems.length) state.torontoComplete = true;
        saveState();
        playTone("good");
        els.torontoFeedback.innerHTML = `<div class="feedback-good"><strong>Entry cleared.</strong><span>${item.explanation}</span></div><div class="passport-transcript canada-transcript"><span>USEFUL ENGLISH</span><p>${item.model}</p><button id="hearCanadaModel" class="passport-hear" type="button">🔊 Hear it</button></div><button id="torontoNext" class="passport-next" type="button">${state.torontoComplete ? "Stamp passport →" : "Continue Canadian assignment →"}</button>`;
        $("hearCanadaModel").addEventListener("click", () => speak(item.model));
        $("torontoNext").addEventListener("click", renderToronto);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.torontoMissed.includes(state.torontoIndex)) state.torontoMissed.push(state.torontoIndex);
        saveState();
        playTone("bad");
        els.torontoFeedback.innerHTML = `<div class="feedback-bad"><strong>Border check failed.</strong><span>Use the Canadian briefing carefully: universal does not mean every health service is covered, and Canadian Medicare is not US Medicare.</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startToronto() {
    if (!state.newYorkComplete) return;
    state.torontoStarted = true;
    saveState();
    renderToronto();
    els.torontoArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.torontoScreen.focus({ preventScroll: true }), 450);
  }

  function renderSydney() {
    updateProgress();
    els.sydneyFeedback.innerHTML = "";
    if (!state.torontoComplete) return;

    if (!state.sydneyStarted) {
      els.sydneyScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🇦🇺</span><h3>Welcome to Sydney</h3><p>Your Australian Medicare assignment is ready. Your key question: when does Medicare pay directly, and when can the patient face an out-of-pocket gap?</p></div>`;
      return;
    }

    if (state.sydneyComplete) {
      const pct = Math.round((state.sydneyScore / sydneyItems.length) * 100);
      els.sydneyScreen.innerHTML = `<div class="passport-complete-card australia-complete"><div class="passport-complete-icon" aria-hidden="true">🇦🇺</div><p class="passport-case-kicker">STOP 04 CLEARED</p><h3>Bulk Billing Expert</h3><p>You can explain Australian Medicare, the Medicare Levy, bulk billing, gap fees, the PBS and the role of the private tier alongside universal public coverage.</p><div class="passport-score-line"><strong>${state.sydneyScore} / ${sydneyItems.length}</strong><span>${pct}% first-attempt score</span></div><div class="passport-model-box"><span>MODEL SUMMARY</span><p>“Australia combines universal Medicare, free public hospital care, subsidised GP visits and medicines, and a strong private tier.”</p><button id="hearAustraliaSummary" class="passport-hear" type="button">🔊 Hear summary</button></div><div class="comparison-ticket australia-ticket"><span>🇬🇧 LONDON</span><b>Private insurance: supplementary</b><span>↔</span><b>Private tier: substantial</b><span>🇦🇺 SYDNEY</span></div><div class="passport-next-route"><strong>Next checkpoint</strong><span>🔊 Transit Training Bay · Final -s.</span></div><button id="goFinalS" class="passport-primary" type="button">Enter Training Bay →</button></div>`;
      $("hearAustraliaSummary").addEventListener("click", () => speak("Australia combines universal Medicare, free public hospital care, subsidised GP visits and medicines, and a strong private tier."));
      $("goFinalS").addEventListener("click", () => {
        els.finalSArea.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => els.startFinalS.focus({ preventScroll: true }), 450);
      });
      updateProgress();
      return;
    }

    const item = sydneyItems[state.sydneyIndex];
    els.sydneyScreen.innerHTML = `<div class="passport-question-card australia-question"><div class="passport-question-meta"><span>${item.phase}</span><b>${item.tag}</b></div><h3>${item.prompt}</h3><div id="sydneyOptions" class="passport-options"></div></div>`;
    const optionWrap = $("sydneyOptions");
    optionButtons(item.options, (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.sydneyMissed.includes(state.sydneyIndex)) state.sydneyScore += 1;
        state.sydneyIndex += 1;
        if (state.sydneyIndex >= sydneyItems.length) state.sydneyComplete = true;
        saveState();
        playTone("good");
        els.sydneyFeedback.innerHTML = `<div class="feedback-good"><strong>Access decoded.</strong><span>${item.explanation}</span></div><div class="passport-transcript australia-transcript"><span>USEFUL ENGLISH</span><p>${item.model}</p><button id="hearAustraliaModel" class="passport-hear" type="button">🔊 Hear it</button></div><button id="sydneyNext" class="passport-next" type="button">${state.sydneyComplete ? "Stamp passport →" : "Continue Sydney assignment →"}</button>`;
        $("hearAustraliaModel").addEventListener("click", () => speak(item.model));
        $("sydneyNext").addEventListener("click", renderSydney);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.sydneyMissed.includes(state.sydneyIndex)) state.sydneyMissed.push(state.sydneyIndex);
        saveState();
        playTone("bad");
        els.sydneyFeedback.innerHTML = `<div class="feedback-bad"><strong>Payment route incorrect.</strong><span>Use the Australian briefing carefully: distinguish public hospital care, subsidised care, bulk billing, gap fees and the private tier.</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startSydney() {
    if (!state.torontoComplete) return;
    state.sydneyStarted = true;
    saveState();
    renderSydney();
    els.sydneyArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.sydneyScreen.focus({ preventScroll: true }), 450);
  }

  function renderFinalS() {
    updateProgress();
    els.finalSFeedback.innerHTML = "";
    if (!state.sydneyComplete) return;

    if (!state.finalSStarted) {
      els.finalSScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🔊</span><h3>Communication check ready</h3><p>Listen to each word or sentence, then choose /ɪz/, /s/ or /z/. Written forms remain visible so sound is never required to complete the activity.</p></div>`;
      return;
    }

    if (state.finalSComplete) {
      const pct = Math.round((state.finalSScore / finalSItems.length) * 100);
      els.finalSScreen.innerHTML = `<div class="passport-complete-card final-s-complete"><div class="passport-complete-icon" aria-hidden="true">🔊</div><p class="passport-case-kicker">TRANSIT CHECK CLEARED</p><h3>Clear Communicator</h3><p>You can now sort final <em>-s</em> endings by sound and apply the rule to healthcare and research vocabulary.</p><div class="passport-score-line"><strong>${state.finalSScore} / ${finalSItems.length}</strong><span>${pct}% first-attempt score</span></div><div class="sound-summary"><div><b>/ɪz/</b><span>shortages · misses · nurses</span></div><div><b>/s/</b><span>specialists · layoffs · patients</span></div><div><b>/z/</b><span>resignations · failures · stories</span></div></div><div class="passport-model-box"><span>QUICK RULE</span><p>“Use /ɪz/ after sibilant sounds, /s/ after voiceless sounds such as /p t k f/, and /z/ after other voiced sounds.”</p><button id="hearFinalSRule" class="passport-hear" type="button">🔊 Hear rule</button></div><div class="comparison-ticket transit-ticket"><span>SYDNEY</span><b>Bulk Billing Expert</b><span>✈</span><b>Clear Communicator</b><span>WELLINGTON NEXT</span></div><div class="passport-next-route"><strong>Next stop</strong><span>🇳🇿 Wellington · Health System Alert.</span></div><button id="goWellingtonRoute" class="passport-primary" type="button">View Wellington gate →</button></div>`;
      $("hearFinalSRule").addEventListener("click", () => speak("Use iz after sibilant sounds, s after voiceless sounds such as p, t, k and f, and z after other voiced sounds."));
      $("goWellingtonRoute").addEventListener("click", () => {
        els.wellingtonArea.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => els.startWellington.focus({ preventScroll: true }), 450);
      });
      updateProgress();
      return;
    }

    const item = finalSItems[state.finalSIndex];
    const sounds = ["/ɪz/", "/s/", "/z/"];
    els.finalSScreen.innerHTML = `<div class="passport-question-card final-s-question"><div class="passport-question-meta"><span>${item.phase}</span><b>${item.tag}</b></div><div class="sound-chip">Checkpoint ${state.finalSIndex + 1} of ${finalSItems.length}</div><h3>How is the final <em>-s</em> pronounced in <strong>${item.word}</strong>?</h3><div class="final-s-audio-row"><button id="hearFinalSWord" class="passport-hear" type="button">🔊 Hear word</button><button id="hearFinalSSentence" class="passport-hear" type="button">🔊 Hear sentence</button></div><p class="passport-small-note">Sentence: “${item.sentence}”</p><div id="finalSOptions" class="passport-options"></div></div>`;
    const optionWrap = $("finalSOptions");
    $("hearFinalSWord").addEventListener("click", () => speak(item.word));
    $("hearFinalSSentence").addEventListener("click", () => speak(item.sentence));
    optionButtons(sounds.map(sound => ({ text: sound, correct: sound === item.correctSound })), (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.finalSMissed.includes(state.finalSIndex)) state.finalSScore += 1;
        state.finalSIndex += 1;
        if (state.finalSIndex >= finalSItems.length) state.finalSComplete = true;
        saveState();
        playTone("good");
        els.finalSFeedback.innerHTML = `<div class="feedback-good"><strong>${item.correctSound} — cleared.</strong><span>${item.explanation}</span></div><div class="passport-transcript final-s-transcript"><span>MODEL SENTENCE</span><p>${item.sentence}</p><button id="hearFinalSModel" class="passport-hear" type="button">🔊 Hear it again</button></div><button id="finalSNext" class="passport-next" type="button">${state.finalSComplete ? "Stamp passport →" : "Next sound check →"}</button>`;
        $("hearFinalSModel").addEventListener("click", () => speak(item.sentence));
        $("finalSNext").addEventListener("click", renderFinalS);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.finalSMissed.includes(state.finalSIndex)) state.finalSMissed.push(state.finalSIndex);
        saveState();
        playTone("bad");
        els.finalSFeedback.innerHTML = `<div class="feedback-bad"><strong>Listen to the sound before -s.</strong><span>Do not decide from spelling alone. Use the rule card above, then try another sound.</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startFinalS() {
    if (!state.sydneyComplete) return;
    state.finalSStarted = true;
    saveState();
    renderFinalS();
    els.finalSArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.finalSScreen.focus({ preventScroll: true }), 450);
  }

  function renderWellington() {
    updateProgress();
    els.wellingtonFeedback.innerHTML = "";
    if (!state.finalSComplete) return;

    if (!state.wellingtonStarted) {
      els.wellingtonScreen.innerHTML = `<div class="passport-waiting"><span aria-hidden="true">🇳🇿</span><h3>Health System Alert ready</h3><p>Start by decoding New Zealand's system. The RNZ clip is embedded above for the news-feed checkpoints, with a text alternative for accessibility.</p></div>`;
      return;
    }

    if (state.wellingtonComplete) {
      const pct = Math.round((state.wellingtonScore / wellingtonItems.length) * 100);
      els.wellingtonScreen.innerHTML = `<div class="passport-complete-card nz-complete"><div class="passport-complete-icon" aria-hidden="true">🇳🇿</div><p class="passport-case-kicker">STOP 05 CLEARED</p><h3>System Crisis Analyst</h3><p>You can explain New Zealand's public system and ACC, verify claims against a news source, use Not Given correctly, and keep political claims attributed.</p><div class="passport-score-line"><strong>${state.wellingtonScore} / ${wellingtonItems.length}</strong><span>${pct}% first-attempt score</span></div><div class="passport-model-box"><span>MODEL SUMMARY</span><p>“New Zealand has a tax-funded universal public system, with free public hospital care, subsidised GP visits and ACC no-fault injury cover. The RNZ clip reports a leadership crisis against a background of workforce shortages and long waits.”</p><button id="hearNzSummary" class="passport-hear" type="button">🔊 Hear summary</button></div><div class="comparison-ticket nz-ticket"><span>WELLINGTON</span><b>System Crisis Analyst</b><span>✈</span><b>Dublin</b><span>WORKFORCE NEXT</span></div><div class="passport-next-route nz-next-card"><strong>Next stop</strong><span>🇮🇪 Dublin · Workforce Emergency.</span></div><button id="goDublinRoute" class="passport-primary" type="button">View Dublin gate →</button></div>`;
      $("hearNzSummary").addEventListener("click", () => speak("New Zealand has a tax-funded universal public system, with free public hospital care, subsidised G P visits and A C C no-fault injury cover. The R N Z clip reports a leadership crisis against a background of workforce shortages and long waits."));
      $("goDublinRoute").addEventListener("click", () => {
        els.routeIe.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      updateProgress();
      return;
    }

    const item = wellingtonItems[state.wellingtonIndex];
    els.wellingtonScreen.innerHTML = `<div class="passport-question-card nz-question"><div class="passport-question-meta"><span>${item.phase}</span><b>${item.tag}</b></div><div class="sound-chip">Checkpoint ${state.wellingtonIndex + 1} of ${wellingtonItems.length}</div><h3>${item.prompt}</h3><div id="wellingtonOptions" class="passport-options"></div></div>`;
    const optionWrap = $("wellingtonOptions");
    optionButtons(item.options, (option, button) => {
      if (option.correct) {
        lockOptions(optionWrap);
        button.classList.add("is-correct");
        if (!state.wellingtonMissed.includes(state.wellingtonIndex)) state.wellingtonScore += 1;
        state.wellingtonIndex += 1;
        if (state.wellingtonIndex >= wellingtonItems.length) state.wellingtonComplete = true;
        saveState();
        playTone("good");
        els.wellingtonFeedback.innerHTML = `<div class="feedback-good"><strong>Alert verified.</strong><span>${item.explanation}</span></div><div class="passport-transcript nz-transcript"><span>USEFUL ENGLISH</span><p>${item.model}</p><button id="hearNzModel" class="passport-hear" type="button">🔊 Hear it</button></div><button id="wellingtonNext" class="passport-next" type="button">${state.wellingtonComplete ? "Stamp passport →" : "Next Wellington check →"}</button>`;
        $("hearNzModel").addEventListener("click", () => speak(item.model));
        $("wellingtonNext").addEventListener("click", renderWellington);
        updateProgress();
      } else {
        button.classList.add("is-wrong");
        button.disabled = true;
        if (!state.wellingtonMissed.includes(state.wellingtonIndex)) state.wellingtonMissed.push(state.wellingtonIndex);
        saveState();
        playTone("bad");
        const hint = item.phase === "RNZ NEWS FEED" ? "Check what the clip actually states. Not Given is not the same as False." : item.phase === "EVIDENCE DESK" ? "Keep reported facts, attributed political claims and unstated information separate." : "Use the New Zealand system briefing above.";
        els.wellingtonFeedback.innerHTML = `<div class="feedback-bad"><strong>Re-check the alert.</strong><span>${hint}</span></div>`;
      }
    }).forEach(button => optionWrap.appendChild(button));
  }

  function startWellington() {
    if (!state.finalSComplete) return;
    state.wellingtonStarted = true;
    saveState();
    renderWellington();
    els.wellingtonArea.scrollIntoView({ behavior: "smooth", block: "start" });
    window.setTimeout(() => els.wellingtonScreen.focus({ preventScroll: true }), 450);
  }

  function resetProgress() {
    const ok = window.confirm("Reset all Day 2 Global Health Passport progress on this device?");
    if (!ok) return;
    state = { ...defaults };
    saveState();
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    renderDeparture();
    renderLondon();
    renderNewYork();
    renderToronto();
    renderSydney();
    renderFinalS();
    renderWellington();
    updateProgress();
    setStatus("Day 2 progress reset.");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function syncSoundButton() {
    els.soundToggle.setAttribute("aria-pressed", String(soundOn));
    els.soundToggle.textContent = soundOn ? "🔊 Sound ON" : "🔇 Sound OFF";
  }

  els.startPassport.addEventListener("click", startDeparture);
  els.startLondon.addEventListener("click", startLondon);
  els.startNewYork.addEventListener("click", startNewYork);
  els.startToronto.addEventListener("click", startToronto);
  els.startSydney.addEventListener("click", startSydney);
  els.startFinalS.addEventListener("click", startFinalS);
  els.startWellington.addEventListener("click", startWellington);
  els.reset.addEventListener("click", resetProgress);
  els.soundToggle.addEventListener("click", () => {
    soundOn = !soundOn;
    localStorage.setItem(SOUND_KEY, soundOn ? "on" : "off");
    if (!soundOn && "speechSynthesis" in window) window.speechSynthesis.cancel();
    syncSoundButton();
    setStatus(soundOn ? "Sound on. British English speech will play when requested." : "Sound off. All spoken content remains available as text.");
  });

  if ("speechSynthesis" in window) window.speechSynthesis.addEventListener?.("voiceschanged", chooseBritishVoice);

  syncSoundButton();
  updateProgress();
  renderDeparture();
  renderLondon();
  renderNewYork();
  renderToronto();
  renderSydney();
  renderFinalS();
  renderWellington();
})();
