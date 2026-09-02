FGSM3 DAY 4 — AUDIT FIX
========================

FILE TO REPLACE
---------------
Replace only this file at the root of the GitHub repository:
  fgsm3-day4.html

DO NOT DELETE / CHANGE
----------------------
The fix reuses the existing Day 4 assets and the existing Conference Rescue page:
- conference-rescue.html
- assets/fgsm3/day4/images/day4-ai-medicine-vintage.webp
- assets/fgsm3/day4/images/day4-live-clinical-feed-poster.webp
- assets/fgsm3/day4/video/day4-ai-transforming-healthcare.mp4

WHAT THIS FIX DOES
------------------
1. Places the two Day 4 activity cards side by side on desktop/tablet:
   - GROUP ACTIVITY — AI Clinical Control · Board Decision
   - INDIVIDUAL ACTIVITY — The Conference Rescue
   On narrow phones they intentionally stack vertically to prevent overflow and tiny text.

2. Keeps AI Clinical Control as a deterministic GROUP activity:
   - 3 or 4 students
   - 6 fixed board decisions
   - no randomisation / no shuffled options
   - same A/B/C path = same options, same consequences, same scores and same final briefing on laptop or phone

3. Keeps the final speaking transfer explicit:
   - every student has an automatically generated role card
   - approximately 2 minutes speaking per student
   - 3-person teams automatically merge Governance into Student 3's recap

4. Fixes persistence/UI issues:
   - validates saved progress instead of trusting malformed/stale data
   - rebuilds scores from saved choices
   - preserves the selected group size visually after a reload
   - locks group size once the board has started
   - avoids jumping automatically to the final report when reopening a finished activity
   - uses a new v2 localStorage key so old incompatible progress cannot break the activity

5. Fixes answer-pattern predictability:
   - the strongest option is no longer always B
   - strong-choice sequence is deliberately distributed across A/B/C
   - option order remains fixed across all devices

6. Adds robustness/accessibility:
   - keyboard focus state on activity cards
   - aria-pressed state on group-size buttons
   - direct video fallback link if embedded playback is blocked
   - no duplicate IDs / no broken internal anchors
   - no Math.random() anywhere in the group activity

TESTS PERFORMED
---------------
- JavaScript syntax check: PASS
- 46 HTML IDs: all unique
- internal hash anchors: PASS
- all six cases contain exactly A/B/C once: PASS
- desktop chooser: group + individual cards side by side: PASS
- 390px mobile viewport: no horizontal overflow: PASS
- same deterministic path B-C-A-C-B-A on desktop and mobile: same labels, same result, same scores: PASS
- 4-person recap: 4 recap cards: PASS
- 3-person recap: 3 recap cards with Governance merged: PASS
- no JavaScript page errors during tested full paths: PASS

UPLOAD
------
Upload/replace fgsm3-day4.html in the SAME branch that GitHub Pages publishes.
Then wait for GitHub Pages deployment and hard-refresh the page (Ctrl+F5 on Windows).
