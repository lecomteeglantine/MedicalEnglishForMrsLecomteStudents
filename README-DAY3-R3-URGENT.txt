DAY 3 — URGENT CACHE / NAVIGATION FIX R3 — 1 SEPTEMBER 2026

UPLOAD THESE 3 FILES TO THE ROOT OF THE GITHUB REPOSITORY:
1. fgsm3-day3.html              (replace existing file)
2. pwa.js                       (replace existing file)
3. service-worker-v62.js        (new file)

DO NOT DELETE OR REPLACE:
- fgsm3-day3-go-bag.html
- fgsm3-day3-individual.html
- service-worker-v61.js (it can remain; pwa.js will now register v62)

WHAT THIS FIX DOES
- Keeps Day 3 as the Group / Individual activity hub.
- Adds cache-busting to the two Day 3 activity links.
- Bumps the PWA service worker from v61 to v62.
- v62 deletes old Medical English caches and pre-caches the current Day 3 hub and both activities.
- Keeps navigation network-first, with offline fallback.

AFTER UPLOAD
- Commit all 3 files in the same commit if possible.
- Open the site normally; pwa.js will register the new v62 worker.
- If a tab was already open before the upload, reload it once.
