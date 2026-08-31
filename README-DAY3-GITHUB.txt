FGSM3 DAY 3 — MEGA-AUDITED R3 FINAL — 31 AUG 2026

UPLOAD THE THREE HTML FILES IN THIS ZIP TO THE ROOT OF THE EXISTING GITHUB REPOSITORY.

1. fgsm3-day3.html
   - REPLACE the current file.
   - This becomes the Day 3 activity-choice hub.
   - Desktop: Group + Individual side by side, matching Day 1 / Day 2.
   - Mobile: the two activity cards stack cleanly.

2. fgsm3-day3-go-bag.html
   - ADD this file.
   - Group activity: Humanitarian Go-Bag Challenge.
   - One shared device for 3–4 students; no hidden roles or split information.

3. fgsm3-day3-individual.html
   - ADD this file.
   - Full standalone copy of the existing Humanitarian Field Mission.
   - It no longer depends on the Day 3 hub URL or on a remote loader.

YOU DO NOT NEED TO DELETE OR EDIT:
- styles-v37.css
- pwa.js
- accessibility.js
- manifest.webmanifest
- the assets/ folder
- the old fgsm3-day3-game.js (it can stay in the repository; these three R3 pages do not depend on it)

MAIN R3 FIXES
- Fixes the major deployment bug: fgsm3-day3.html is now the activity hub rather than the individual game.
- Adds the missing Group Activity and Individual Activity pages.
- Preserves the complete individual Humanitarian Field Mission as a standalone page.
- Removes the fragile remote-loader architecture from the individual route.
- Group challenge has explicit sequential instructions and one shared information stream.
- Enforces exactly 10 initial items.
- Enforces replacement limits: maximum 3, then 2, then 1.
- Enforces the final 3 Essential / 4 Very important / 3 Useful classification.
- Enforces exactly one emergency request.
- Continue buttons remain locked until the required task is complete and the group-speaking confirmation is ticked.
- Print / Save Report prints the final report only.
- Saved Go-Bag state is validated and repaired when stale or malformed.
- Safe fallback for browsers without structuredClone.
- Replaced Object.hasOwn dependency for older-browser compatibility.
- Protected reduced-motion handling when matchMedia is unavailable.
- Safe localStorage access.
- Reset confirmation prevents accidental loss of saved Go-Bag progress.
- Keyboard focus is moved to the new round after navigation.
- No duplicate HTML IDs.
- No missing aria-labelledby targets or broken internal fragment links.
- Every HTML button has an explicit type.
- Added horizontal-overflow protection for narrow screens while retaining the site's mobile navigation behaviour.
- Existing Day 3 illustrations are reused locally from the repository (no fragile third-party image URLs).
- Training disclaimer makes clear that the Go-Bag is an English-learning simulation, not an official MSF packing list, procurement guide or clinical protocol.
- Privacy / GDPR text retained: no account, analytics, advertising or server-side student database.

QA COMPLETED BEFORE PACKAGING
- HTML/ID/accessibility-reference checks on all 3 pages.
- JavaScript syntax checks.
- Chromium test of the entire Go-Bag path from Round 1 to final report.
- Chromium test of the individual game's Mission 1 launch.
- Replacement-limit abuse test completed separately during audit.
- Existing Day 3 image URLs checked on the live site.

AFTER UPLOAD
Open:
https://lecomteeglantine.github.io/MedicalEnglishForMrsLecomteStudents/fgsm3-day3.html
You should see the two activity cards, not the old individual game directly.
