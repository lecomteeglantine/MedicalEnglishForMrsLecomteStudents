FGSM3 DAY 1 — R7 CACHE RECOVERY — 31 AUGUST 2026

UPLOAD THESE 5 FILES TO THE ROOT OF THE GITHUB REPOSITORY (branch main), replacing files when GitHub asks:
- fgsm3-day1-individual.html
- pwa.js
- service-worker.js
- service-worker-v61.js
- day1-cache-reset.html

WHY THIS PATCH EXISTS
The Day 1 R6 game engine itself passes a real Chromium click test. The remaining failure is consistent with an older registered service worker/cache continuing to serve stale code.

WHAT THIS PATCH DOES
1. service-worker.js becomes a one-time retirement worker for old installations: it deletes the old Medical English caches, reloads controlled pages once, and unregisters itself.
2. pwa.js now registers service-worker-v61.js instead.
3. service-worker-v61.js keeps navigation and code network-first.
4. fgsm3-day1-individual.html is the tested game build, marked R7.
5. day1-cache-reset.html is a manual emergency reset page.

AFTER UPLOAD
- Wait until the GitHub Pages action is green.
- Open: https://lecomteeglantine.github.io/MedicalEnglishForMrsLecomteStudents/day1-cache-reset.html
- It should redirect automatically to Day 1.
- On the game page you should see: CACHE RECOVERY · INDIVIDUAL R7

Do not upload the ZIP itself. Unzip it, then upload the five files.
