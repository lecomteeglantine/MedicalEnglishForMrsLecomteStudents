FGSM3 DAY 4 — AI CLINICAL CONTROL — TARGETED BUG FIX
Date: 2 September 2026

UPLOAD TO THE ROOT OF THE GITHUB REPOSITORY:
- fgsm3-day4-game.js   (overwrite the existing file)

WHAT THE AUDIT FOUND
1. CRITICAL / BLOCKING: the published fgsm3-day4-game.js contains literal line breaks inside normal quoted JavaScript strings. This is invalid JavaScript syntax and prevents the complete Day 4 game script from parsing.
2. Because the script cannot parse, mission boot, unlocking, scoring, local progress, sound controls, music logic, speech synthesis, final test and reset logic cannot initialise reliably.
3. The HTML structure itself is coherent: Game 1 and Game 2 are clearly separated, the mission route is visible, images have alt text, and the page contains explicit human-in-the-loop / non-medical-advice wording.
4. The question banks already randomise answer order in the original game logic, so the correct answer is not permanently displayed in the first position.

WHAT THIS FIX DOES
- Preserves the complete original 995-line game logic and all existing question banks.
- Loads the exact pinned original source from commit 5ff7ff2.
- Repairs only illegal newline characters occurring inside ordinary single- and double-quoted JavaScript strings.
- Leaves template literals, comments, questions, scoring rules, progression rules, music, video behaviour, speech synthesis and stored progress unchanged.
- Adds a visible error message if the source cannot be loaded instead of leaving students with an inert interface.

WHY A PINNED COMMIT IS USED
The repaired loader must not fetch the current main-branch fgsm3-day4-game.js after it replaces that file, otherwise it would fetch itself recursively. Commit 5ff7ff2 is the published source audited on 2 September 2026.

DEPLOYMENT
1. Unzip.
2. Upload fgsm3-day4-game.js to the repository root.
3. Confirm overwrite/replacement of the existing file.
4. Wait for GitHub Pages to redeploy, then hard-refresh the Day 4 page (Ctrl+F5).

No other site file needs to be replaced for this targeted correction.
