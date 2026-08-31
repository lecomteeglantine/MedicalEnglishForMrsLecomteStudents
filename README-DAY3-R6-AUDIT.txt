FGSM3 DAY 3 — R6 FINAL HARDENING
Post-deployment targeted audit — 31 August 2026

UPLOAD / REPLACE THESE 4 FILES AT THE ROOT OF THE GITHUB REPOSITORY:
- fgsm3-day3-individual.html
- fgsm3-day3-go-bag.html
- service-worker.js
- pwa.js

DO NOT REPLACE fgsm3-day3.html FOR THIS PATCH.
The Day 3 hub was re-audited and no code change was required.

R6 FIXES
========

1) INDIVIDUAL ACTIVITY — SAVE / SCORE INTEGRITY
- Completion is now derived from actually cleared checkpoints, not trusted from stored flags.
- First-try scores are rebuilt from checkpoint progress + recorded missed attempts.
- Impossible/corrupt localStorage states such as “23/23 but 0/4 completed” repair to the real state.
- Final Mission score is rebuilt from the 10 completed checkpoints (10 first try / 6 after correction), so refreshes or malformed saves cannot duplicate or inflate points.
- Final skill scores are rebuilt from completed checkpoints instead of trusting saved totals.
- Future-question missed flags are discarded while a wrong attempt on the current question is preserved.

The previous R5.1 content corrections are retained:
- Emmanuel Massart (correct surname and role/location wording in the site).
- Vulnerable-groups answer includes children.
- Word-stress explanation uses prominence rather than the false “simply louder and longer” rule.
- “after aftershocks” typo corrected.

2) HUMANITARIAN GO-BAG — REPORT LOGIC
- Solar lamps are NOT treated as a power source for an oxygen concentrator or cold-chain refrigerator.
- Dependency prompts correctly request a reliable compatible power plan.
- Readiness coverage is separated into:
  Clinical care / Safe water / Hygiene / Shelter / Logistics-autonomy / Communication.
  This prevents one broad combined category from hiding a missing communication or shelter capability.
- The “no dependency gap” message now states explicitly that only dependencies modelled by this English-learning game were checked; it is not an exhaustive operational check.
- R5.1 high-contrast keyboard focus and save repair protections are retained.

3) PWA / SERVICE WORKER
- Cache version raised to v60 / Day 3 R6.
- Critical offline shell files are fetched afresh during service-worker installation instead of allowing a browser HTTP-cache copy to seed a new cache with an older build.
- Optional assets cannot block service-worker installation.
- HTML/JS/CSS remain network-first so GitHub Pages fixes are picked up quickly.
- pwa.js now waits for navigator.serviceWorker.ready before claiming offline access is ready.
- Connection-state messaging updates correctly both when going offline and when coming back online.
- Large audio/video are still not promised as guaranteed offline resources.

POST-PATCH QA PERFORMED
=======================
- HTML duplicate IDs: none.
- Broken aria-labelledby references: none.
- Images without alt text: none.
- Buttons missing type: none.
- Missing local links/assets in the three Day 3 pages: none.
- Service-worker referenced paths checked: 50 references, none missing.
- JavaScript syntax: valid for both inline games, pwa.js and service-worker.js.
- Responsive test at 320 / 375 / 768 / 1440 px: zero horizontal overflow, zero page errors.
- Individual activity full automated run through Missions 1–7: completed successfully.
- Final mission reload: score/progress preserved exactly, no duplicate points.
- Corrupt individual save test: repaired from impossible 23/23 + 0/4 to 0/23 + 0/4 with Mission 2 locked.
- Go-Bag full path tested through final report.
- Go-Bag dependency test with oxygen concentrator + cold-chain refrigerator + solar lamps but no generator: both power dependency warnings appear.
- Corrupt Go-Bag save test: safely falls back to a valid earlier round.

TRAINING-SCOPE NOTE
===================
The Go-Bag equipment bank, field scenarios and prioritisation prompts are fictional English-learning activities. They are not an official MSF packing list, clinical protocol, procurement guide or humanitarian-response certification.
