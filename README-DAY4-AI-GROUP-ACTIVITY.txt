FGSM3 DAY 4 — AI CLINICAL CONTROL → GROUP ACTIVITY
===================================================

TARGETED REPLACEMENT
Replace ONLY this file in the root of the GitHub repository:
  fgsm3-day4.html

Do not delete conference-rescue.html or the existing Day 4 assets.
The corrected page deliberately reuses assets that already exist in the repository:
  assets/fgsm3/day4/images/day4-ai-medicine-vintage.webp
  assets/fgsm3/day4/images/day4-live-clinical-feed-poster.webp
  assets/fgsm3/day4/video/day4-ai-transforming-healthcare.mp4

WHAT CHANGED
- AI Clinical Control is now explicitly labelled GROUP ACTIVITY.
- The Conference Rescue remains an INDIVIDUAL ACTIVITY.
- New group format for teams of 3 or 4.
- Six discussion-and-choice rounds:
  1. early sepsis warning
  2. spine navigation
  3. EEG seizure detection
  4. evidence / Harvard study interpretation
  5. patient transparency
  6. accountability and governance
- Every choice has fixed consequences and fixed scores.
- NO Math.random(), NO shuffle, NO time/device-based branching.
- Same A/B/C decision path = same options, scores, verdict and recap on computer, tablet or phone.
- Four fixed score axes: Safety, Evidence, Patient trust, Efficiency.
- Final 2-minute recap cards for every student.
- Group of 3: Student 3 also covers Governance.
- Group of 4: Student 4 has a separate Governance recap.
- Responsive layout for phone/tablet/desktop.
- Existing Day 4 illustrations and video are reused, so no new asset upload is needed.
- Progress is stored locally only (localStorage); no student account or server sync.

IMPORTANT ABOUT “SAME CHOICE ON DIFFERENT DEVICES”
This version is deterministic, not synchronised.
Two students who independently select the same choices will always see the same next content and final result.
The activity does NOT live-sync one student's click to another student's device, because the site has no server/database.

DEPLOYMENT
1. Upload fgsm3-day4.html to the repository root and overwrite the current file.
2. Commit the change.
3. Wait for GitHub Pages to deploy.
4. Hard-refresh the page (Ctrl+Shift+R on Windows / Cmd+Shift+R on Mac).
5. Test:
   https://lecomteeglantine.github.io/MedicalEnglishForMrsLecomteStudents/fgsm3-day4.html#ai-clinical-control

TEST PATH
For a quick deterministic check, choose 4 students and then B for all six decisions.
Expected decision code: B-B-B-B-B-B
The same code must appear on desktop and mobile for the same choices.
