FGSM3 DAY 4 — MEGA TARGETED AUDIT + DETERMINISTIC GROUP ACTIVITY FIX
=====================================================================

FILE TO REPLACE ON GITHUB
-------------------------
Replace the root file:
  fgsm3-day4.html
with the corrected fgsm3-day4.html contained in this ZIP.

No new image/video asset upload is required by this patch.
The page keeps using the existing Day 4 assets already referenced by the site.

MAIN FIX: SAME CHOICE = SAME NEXT OPTIONS ON EVERY DEVICE
---------------------------------------------------------
The AI Clinical Control activity now uses scenario set:
  D4-AI-BOARD-V3

The six cases are fixed.
Each case always displays A, B and C in the same order.
There is no randomisation, no shuffling and no device/viewport-dependent JavaScript branch.
Previous choices do NOT alter the next case or the next A/B/C option set.

Therefore, for students using the SAME version of the page:
- same choice path on laptop = same choice path on phone/tablet
- same next cases
- same A/B/C wording and order
- same consequences
- same score calculations
- same final verdict
- same decision code

Only the intentionally selected GROUP SIZE changes the final speaking-role distribution:
- 4 students -> 4 recap cards
- 3 students -> Student 3 also covers governance
It does not change the cases, options, consequences or scores.

BUGS / RISKS CORRECTED
----------------------
1. JavaScript robustness
   - Replaced fragile state logic with a validated V3 state schema.
   - New storage key prevents old/broken saved progress from contaminating the new activity.
   - Invalid/corrupt saved progress is rejected safely.

2. Refresh/reload continuity
   - If a student refreshes AFTER choosing an option but BEFORE pressing Next, the page now restores the SAME decision, selected option, consequence and score instead of silently advancing.

3. Deterministic cross-device branching
   - Fixed case list.
   - Fixed A/B/C order.
   - No Math.random().
   - No shuffle.
   - No user-agent, touch, screen-width or device-specific branching in game logic.

4. Score calculation
   - Removed the misleading single /24 denominator for all four axes.
   - Each percentage is now calculated against the actual maximum achievable score for that axis:
       Safety: 24
       Evidence: 23
       Patient trust: 20
       Efficiency: 21
   - This prevents impossible 100% values and misleading percentages.

5. State score integrity
   - Scores are rebuilt from the saved A/B/C keys on restore instead of trusting previously saved score numbers.
   - This prevents stale/tampered score data from producing an inconsistent final result.

6. Mid-activity reset
   - Added a visible Restart board button during the board activity.
   - Students are no longer trapped after an accidental choice or wrong group setup.
   - Reset requires confirmation.

7. Group size consistency
   - Group size is locked once the board has started.
   - This prevents recap-role changes halfway through the activity.

8. Media resilience
   - Added a direct video link next to the embedded video.
   - Added graceful video/image fallback handling.

9. Responsive/mobile behaviour
   - Group + Individual activity cards remain side by side on normal tablet/desktop widths.
   - They stack cleanly on narrow phones.
   - No horizontal page overflow in the tested widths.

10. Accessibility / interaction robustness
    - Reduced-motion preference is respected by JavaScript scrolling.
    - Selected group-size state remains exposed through aria-pressed.
    - Selected answers are locked after one click to prevent double submission.

PEDAGOGICAL ANSWER DISTRIBUTION
-------------------------------
The strongest safeguard-oriented option is deliberately NOT always in the same position.
Current sequence across the six cases:
  B - C - A - C - B - A
This avoids training students to click the same letter automatically.

QA PERFORMED
------------
Static / source tests:
- HTML IDs checked: no duplicates.
- Inline JavaScript syntax checked with Node: PASS.
- 6 cases detected.
- Every case has exactly 3 fixed options: A, B, C.
- Math.random/random shuffle detected: NONE.
- Device-dependent game branching detected: NONE.

Exhaustive deterministic simulation:
- All possible 6-decision paths: 3^6 = 729 paths.
- Paths tested: 729.
- Determinism failures: 0.
- Distinct next-option sequences across all 729 paths: 1.
  (This is intentional: future A/B/C choices are fixed and never depend on device or previous branch.)

Browser interaction tests in headless Chromium:
- Desktop viewport: 1366 x 900.
- Mobile viewport: 390 x 844.
- Compared all case titles, every A/B/C option text, consequences, running scores,
  final decision code, final scores, verdict, decision recap and speaking cards.
- Representative paths tested on BOTH device sizes:
    A-A-A-A-A-A
    B-B-B-B-B-B
    C-C-C-C-C-C
    B-C-A-C-B-A
    C-A-B-A-C-B
- Desktop/mobile semantic differences: NONE.
- Browser JavaScript errors during these interaction tests: NONE.

Additional responsive checks:
- 320 px phone: no horizontal overflow; activity cards stacked.
- 768 px tablet: no horizontal overflow; two activity cards side by side.
- 1024 px: no horizontal overflow; two activity cards side by side.

Persistence tests:
- Refresh after a selected answer before Next: PASS.
- Same case/selection/outcome/scores restored: PASS.
- Corrupt saved-state rejection: PASS.

Group recap tests:
- 3-person group -> 3 speaking cards, governance added to Student 3: PASS.
- 4-person group -> 4 speaking cards: PASS.
- Every speaking card says approximately 2 minutes: PASS.

Reset tests:
- Restart during board returns to clean initial state: PASS.
- Group size can be selected again after reset: PASS.

IMPORTANT NOTE
--------------
This is a client-side GitHub Pages activity with no shared server/database.
It does NOT live-synchronise clicks between devices. What is guaranteed is deterministic parity:
if two students are on the same scenario version and make the same A/B/C choices, they see the same cases/options/results.

Generated audit patch: 2026-09-02
