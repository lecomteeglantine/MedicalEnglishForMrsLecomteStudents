FGSM3 DAY 5 — R10 FULL AUDIT FIX
=================================

UPLOAD / REPLACE AT THE ROOT OF THE GITHUB REPOSITORY:
- fgsm3-day5.html
- fgsm3-day5-standalone-r8.html
- fgsm3-day5-standalone-r9.html
- fgsm3-day5-standalone-r10.html

BUILD: DAY5-R10-V55-AUDITED-20260904
STORAGE: V55, with one-time migration from V54. Reset clears both V55 and V54.

KEY FIXES
- First-impression ratings freeze as soon as the Criteria Check starts, so they cannot be rewritten after training/evidence.
- Evidence-based ratings freeze as soon as Board Calibration starts, preserving the final profile used by later missions.
- Greenlight decision cards no longer erase unsaved choices on the other three cards when one decision is saved.
- Saved progress is validated against the actual question banks; impossible/skipped mission flags are rolled back automatically.
- Scores, first-try counts and current indexes are rebuilt from saved answered/wrong IDs.
- Final decisions, evidence choices and ratings are sanitised on restore.
- R9 progress migrates to V55; Reset cannot accidentally resurrect V54 progress.
- R8 and R9 direct URLs redirect to R10.
