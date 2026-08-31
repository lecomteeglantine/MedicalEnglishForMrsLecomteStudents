FGSM3 DAY 3 — R5.1 POST-DEPLOY TARGETED PATCH
31 August 2026

UPLOAD / REPLACE ONLY THESE FOUR FILES AT THE ROOT OF THE GITHUB REPOSITORY:
1. fgsm3-day3-individual.html
2. fgsm3-day3-go-bag.html
3. service-worker.js
4. pwa.js

DO NOT REPLACE fgsm3-day3.html: the Day 3 hub is already correct and is intentionally not included in this targeted patch.

POST-DEPLOY AUDIT — CORRECTIONS INCLUDED

CONTENT / SOURCE ACCURACY
- Corrected Emmanuel Massad -> Emmanuel Massart.
- Corrected his role to: Deputy Coordinator of Operations for the Middle East for Doctors Without Borders (MSF).
- Corrected the interview location to Saida, Lebanon, south of Beirut.
- Reworded the source summary so reported attacks/strikes remain explicitly attributed to Massart/MSF instead of being presented as independently verified facts.
- Added children to the source-based vulnerable-groups answer alongside older people, pregnant women, disabled people and people whose health limits movement.
- Preserved the worksheet vocabulary, contingency-plan framing and debate focus.
- Reconfirmed the MSF distinction already present in R5: neutrality = not taking sides; impartiality = assistance according to need/urgency, without discrimination.

LANGUAGE / PEDAGOGY
- Removed contradictory word-stress feedback saying the stressed syllable is simply “louder and longer”.
- Replaced it with the more accurate instruction to identify a clearly more prominent main-stress syllable.
- Fixed “review access after aftershocks” -> “review access after any further aftershocks”.

GO-BAG LOGIC
- Solar lamps are no longer treated as a general power supply for an oxygen concentrator or cold-chain refrigerator.
- Cold-chain and oxygen dependency prompts now ask students to discuss a compatible/reliable power plan.
- Fixed Readiness coverage: “Shelter / logistics” now counts either shelter OR logistics items.
- Fixed “Communication / autonomy” to count either communication OR autonomy items.
- Added a high-contrast keyboard focus ring to item cards and custom controls.

PWA / CACHE
- Bumped cache version to v59 / R5.1.
- Critical Day 3 files still install atomically.
- Optional offline assets can no longer make the entire service-worker update fail if one optional file is unavailable.
- HTML/JS/CSS network requests use a fresh-fetch path so a newly deployed correction is less likely to be hidden by the browser HTTP cache.
- PWA text no longer claims that large audio/video files are automatically available offline after opening; it now states honestly that large media may require a connection.
- Large video/music files remain excluded from proactive pre-caching to avoid a very heavy initial offline download.

VALIDATION COMPLETED
- Inline JavaScript syntax: PASS
- service-worker.js syntax: PASS
- pwa.js syntax: PASS
- Duplicate HTML IDs: NONE
- Broken aria-labelledby references: NONE
- Images without alt text: NONE
- Buttons missing type=button: NONE
- Broken in-page hash links: NONE
- Local HTML/CSS/JS/media references checked against repository assets: NONE MISSING
- Service-worker shell paths checked: PASS
- Regression strings checked: no “Massad”, no “after aftershocks”, no old “louder and longer” feedback
- Go-Bag dependency and coverage correction checks: PASS

SOURCE NOTE
The supplied Day 3 worksheet spells the interviewee's surname “Massad”. The CNN transcript identifies him as Emmanuel Massart, Deputy Coordinator of Operations for the Middle East for Doctors Without Borders, speaking from Saida, Lebanon, south of Beirut. The website is corrected to the source-verified spelling and title; the uploaded worksheet itself is not modified by this ZIP.

This patch contains no new student-data collection, analytics or server-side storage.
