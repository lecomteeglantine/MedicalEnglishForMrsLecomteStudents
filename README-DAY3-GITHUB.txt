FGSM3 DAY 3 — GITHUB PATCH
==========================

UPLOAD THESE 3 HTML FILES TO THE ROOT OF THE EXISTING REPOSITORY:

1) fgsm3-day3.html
   Replaces the current Day 3 landing page with the same two-card structure used on Day 1 / Day 2:
   - Group activity (3–4 students, one shared device)
   - Individual activity (1 student, one device)
   The two cards are side by side on desktop and stack cleanly on smaller screens.

2) fgsm3-day3-go-bag.html
   New group activity: MSF Go-Bag Challenge.
   Flow:
   - choose exactly 10 items from 24;
   - flooding update: up to 3 replacements;
   - medical update: up to 2 replacements;
   - logistics/access update: up to 1 replacement;
   - classify the final 10 items as 3 Essential / 4 Very important / 3 Useful;
   - request one additional emergency item;
   - prepare a 2-minute final team briefing in which every student speaks.
   Progress is stored only in localStorage on the device.

3) fgsm3-day3-individual.html
   Preserves access to the current audited Humanitarian Field Mission after fgsm3-day3.html becomes the Day 3 activity hub.
   It loads the existing Day 3 game from the frozen GitHub source snapshot d903561, then uses the repository's existing CSS, JS and media assets. After a successful load, the source HTML is also cached locally in the browser as an offline fallback.

DO NOT DELETE OR REPLACE THE EXISTING DAY 3 ASSETS.
The new pages deliberately reuse the images already present in:
assets/fgsm3/day3/images/

QA PERFORMED
------------
- HTML parsed successfully.
- No duplicate element IDs.
- Inline JavaScript passes node --check.
- All literal JavaScript ID references resolve to existing elements.
- Exactly 24 equipment choices are defined.
- Bag size is capped at 10.
- Replacement limits are enforced at 3 / 2 / 1.
- Priority stage requires exactly 3 / 4 / 3 labels.
- Emergency stage requires exactly one additional item.
- Continue buttons remain disabled until the required selection AND speaking confirmation are complete.
- Local progress is saved only in the browser.
- Responsive layout and reduced-motion support are included.
- No analytics, account, score upload or student-name collection is added.

Existing referenced site files (styles-v37.css, pwa.js, accessibility.js and Day 3 images) are already present in the live repository and are NOT duplicated in this patch.
