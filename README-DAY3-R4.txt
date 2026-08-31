FGSM3 DAY 3 — R4 MEGA-AUDITED FINAL — 31 AUGUST 2026
Medical English for Mrs Lecomte's Students

UPLOAD TO THE ROOT OF THE GITHUB REPOSITORY:
- fgsm3-day3.html
- fgsm3-day3-go-bag.html
- fgsm3-day3-individual.html

These three files replace the previous versions with the same names.
Do not replace the site's global CSS, PWA files, service worker or existing Day 3 assets for this patch.

R4 AUDIT / FIXES
- Day 3 hub keeps Group Activity and Individual Activity side by side on desktop and stacked on mobile.
- Go-Bag: 10-item cap, 3/2/1 replacement limits, 3/4/3 priority rule and one emergency request are enforced.
- Go-Bag: impossible/corrupt partial saved bags are repaired instead of trapping the group in an unwinnable round.
- Go-Bag: keyboard focus is restored after dynamic item/priority/emergency selections.
- Go-Bag: back-navigation wording clarified; reconfirming an earlier bag deliberately rebuilds later rounds.
- Go-Bag: local-storage failure now shows an explicit warning instead of silently pretending progress will be saved.
- Go-Bag: final Print / Save Report prints the final report, not an earlier round.
- Individual: saved-state schema is validated and clamped on load.
- Individual: refresh immediately after the last correct answer can no longer produce an out-of-range question and crash the activity.
- Individual final mission: refresh after the last checkpoint can no longer replay that checkpoint or double-credit the score; total is clamped to 100.
- Individual: inconsistent legacy/downstream mission states are repaired automatically so later missions cannot remain cleared if an earlier prerequisite is incomplete.
- Individual: Missions 2–6 no longer destructively reset completed work when revisited.
- Individual: local-storage failure is reported clearly.
- Individual: structuredClone fallback and older-browser-safe property checks retained.
- Mobile: added extra protection for long Day 3 headings, score/status cards and very narrow screens.
- Accessibility: no duplicate IDs, no missing ARIA ID references, no missing image alt text, no buttons without explicit type.
- Local dependencies: no missing referenced local files in the audited Day 3 pages.
- JavaScript: inline scripts pass Node syntax validation.
- Saved-state edge cases tested: last-question refresh, final checkpoint refresh, malformed storage, impossible downstream state, invalid/duplicate Go-Bag items, invalid priority state and missing emergency request.
- Day 3 media checked: four WebP illustrations decode correctly; MP3 and MP4 containers probe correctly; manifest JSON parses correctly.

PEDAGOGICAL CHECK
- Go-Bag is explicitly described as a fictional English-learning simulation, not an official MSF packing list or clinical protocol.
- The individual pronunciation section retains British-English stress targets; key research-word stress was cross-checked against Cambridge Dictionary pronunciation data.

NOTE
No software can guarantee that every browser/device combination will never expose a new issue, but R4 removes the reproducible and code-level faults found in this audit and adds guards for the main failure modes.
