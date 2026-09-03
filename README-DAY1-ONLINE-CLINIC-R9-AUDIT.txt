FGSM3 DAY 1 — ONLINE CLINIC BUILDER
R9 audit fix — 3 September 2026

FILE TO REPLACE ON GITHUB
- fgsm3-day1-online-clinic-builder.html

IMPORTANT FIXES
1. Cross-device determinism retained:
   - No Math.random() remains.
   - Equivalent clinic choices generate the same deterministic fingerprint.
   - The same final choices generate the same crisis and crisis options on every device.

2. Fixed stale-crisis bug:
   - Previously, a team could reach Step 11, go back, modify an earlier clinic choice,
     and keep the old crisis already stored in its local state.
   - This meant two teams with the same FINAL choices could still obtain different
     outcomes depending on the path they had taken.
   - R9 binds the crisis to the exact current clinic-design fingerprint.
   - Any upstream design change automatically invalidates the old crisis and its
     selected response before scores are recalculated.

3. Panel challenge consistency:
   - The panel-question deck is now also tied to the clinic-design fingerprint.
   - If the design changes, stale panel questions are discarded and the deterministic
     deck restarts from the updated design.

4. Save/build version cleanup:
   - Build metadata, console build ID, internal BUILD_ID, SAVE_KEY and SAVE_VERSION
     are now aligned on R9.
   - A new R9 save key prevents old cached state from contaminating the corrected game.

AUDIT CHECKS PASSED
- JavaScript syntax: PASS
- Deterministic equivalent-order test: PASS
- Same crisis for same design test: PASS
- Stale crisis invalidation after upstream change: PASS
- Math.random occurrences: 0
- Duplicate HTML IDs: 0
- Empty links: 0
- target=_blank links missing rel=noopener: 0
- Buttons missing explicit type: 0
- Images missing alt attribute: 0

DEPLOYMENT
Upload/replace ONLY fgsm3-day1-online-clinic-builder.html.
The README is for your reference and does not need to be uploaded.

NOTE
Because the save key has changed to R9, students who first open this corrected version
will start this activity with a fresh local save. This is intentional and prevents
older cached results from reappearing.
