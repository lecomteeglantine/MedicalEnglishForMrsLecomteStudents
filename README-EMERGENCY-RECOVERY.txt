MEDICAL ENGLISH — EMERGENCY RECOVERY — 31 AUG 2026

PURPOSE
This is a code-only recovery package for the GitHub Pages site.
It restores the site code from the last stable full build (V57, 28 Aug 2026), then reapplies the latest audited Day 1 / Day 2 / Day 3 files available on 31 Aug 2026.
Existing media/assets on GitHub are intentionally not duplicated in this ZIP.

UPLOAD TO GITHUB
1. Extract this ZIP on your computer.
2. Open the repository MedicalEnglishForMrsLecomteStudents, branch main.
3. Upload the CONTENTS of the extracted folder to the ROOT of the repository, preserving folders such as data/ and day*/.
4. Accept replacement of files with the same names.
5. Do NOT delete the existing assets/ or icons/ folders on GitHub.
6. Commit the upload.
7. After GitHub Pages republishes, hard-refresh the site (Ctrl+Shift+R).

IMPORTANT
- This package is meant to MERGE/REPLACE code files, not wipe the repository.
- Keep all existing large images, music and video assets already present on GitHub.

VALIDATION PERFORMED BEFORE PACKAGING
- Every external .js file in the rebuilt site passed Node.js syntax checking.
- Every inline JavaScript block passed syntax checking.
- The service-worker core-shell references all resolve to files present in the rebuilt site.
- Critical page asset references were checked for missing local files.
- Day 1 individual game: 120 JavaScript getElementById hooks matched existing HTML IDs.
- Day 1 individual game: startup smoke test passed; Start Mission, sound toggle and music toggle handlers executed without runtime exceptions in the test harness.
- ZIP integrity checked after creation.

BUILD SOURCES USED
- MedicalEnglishForMrsLecomteStudents-V57-STABLE-GITHUB.zip
- FGSM3-DAY1-R13-MEGA-AUDITED-FINAL-20260831.zip (Day 1 shell/group page)
- Day 1 Individual R5 hotfix candidate, syntax + startup smoke tested
- DAY2-POSTDEPLOY-AUDIT-FINAL-20260831.zip
- FGSM3-DAY3-R6-FINAL-HARDENING-20260831.zip
