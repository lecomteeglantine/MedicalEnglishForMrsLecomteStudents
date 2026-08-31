FGSM3 DAY 3 — R5 CONTENT + QA FINAL — 31 AUG 2026
====================================================

UPLOAD THESE FOUR FILES TO THE ROOT OF THE GITHUB REPOSITORY:
1. fgsm3-day3.html
2. fgsm3-day3-go-bag.html
3. fgsm3-day3-individual.html
4. service-worker.js

WHAT R5 FIXES
--------------
HUB / DEPLOYMENT
- Keeps the Day 3 hub with Group Activity and Individual Activity side by side on desktop.
- Corrects labels, output descriptions, metadata and a missing-space content typo.
- Keeps responsive stacking on smaller screens.

GROUP ACTIVITY — HUMANITARIAN GO-BAG CHALLENGE
- Clarifies that this is a fictional English-learning simulation, not an official MSF packing list or clinical protocol.
- Adds concise explanatory text to all 24 equipment choices.
- Uses clearer terminology: analgesics, basic procedural kit, maternal-care kit, chlorination supplies, cold-chain refrigerator, RUTF.
- Adds dependency prompts for vaccines/cold chain, refrigerator/power, oxygen concentrator/power, generator/fuel and fuel without an obvious use.
- Dependency prompts are discussion prompts, not automatic clinical scoring.
- Preserves exact constraints: 10 items; max 3 replacements; max 2; max 1; priorities 3/4/3; one extra emergency item.
- Preserves local-save sanitisation, quota protection, keyboard focus, reset and print report.
- Adds visible item descriptions and dependency-report styling.
- Final label changed to Humanitarian Team Briefing to avoid implying an official MSF protocol.

INDIVIDUAL ACTIVITY — HUMANITARIAN FIELD MISSION
- Clarifies zero conditional + first conditional + even if clauses terminology.
- Replaces the operationally weak model “If a shelter is full, people will have to find another one” with a response-planning formulation about identifying additional safe shelter capacity.
- Corrects the MSF principles framing: neutrality is distinct from impartiality; impartial care is based on medical need and urgency, not identical treatment for everyone.
- Updates Debate Question 1 accordingly while preserving the lesson's debate purpose.
- Adds an on-page MSF principle note so students do not learn the neutrality/impartiality distinction incorrectly.
- Rewrites the word-stress quick rule: main stress = prominence, not simply “louder and longer”.
- Limits the -tion/-sion/-cian pattern explicitly to the course words used in the activity instead of presenting it as an exceptionless universal rule.
- Keeps previous R4 save-state repairs, anti-score-duplication logic, compatibility fallbacks and mobile hardening.

PWA / OFFLINE
- Bumps the cache to v58.
- Pre-caches the three Day 3 HTML pages and the four small Day 3 WebP illustrations.
- Does NOT pre-cache the large MP4 video or MP3 music file.
- Existing network-first code behaviour remains unchanged.

QA PERFORMED
------------
- JavaScript syntax: PASS (group, individual, service worker).
- Duplicate HTML IDs: none found.
- aria-labelledby targets: no broken targets found.
- Images without alt text: none found.
- Buttons without explicit type: none found.
- Responsive DOM/browser checks: PASS at 320, 375, 768 and 1440 px; no horizontal overflow.
- Hub: exactly two activity cards with correct destinations.
- Go-Bag complete browser path: PASS through all seven phases.
- Go-Bag quota test: fourth replacement in max-3 round correctly rejected.
- Priority board: exact 3/4/3 constraint enforced.
- Final report: generated successfully with dependency section.
- Individual activity: Mission 1 starts correctly and opens Vocabulary Clearance.
- Content cross-check against the supplied Day 3 worksheet and official MSF principles completed.

NOTE
----
At audit time, GitHub raw files showed the R4 Day 3 files, while the public GitHub Pages URL was still returning the older single-game Day 3 page. Replacing the four files above, including service-worker.js, also forces a new PWA cache version. GitHub Pages can still take a short time to deploy a new commit.
