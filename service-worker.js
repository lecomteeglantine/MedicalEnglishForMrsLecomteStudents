const CACHE_NAME = "mrs-lecomte-medical-english-v23-day2-sydney-20260823";

const APP_SHELL = [
  "./",
  "./index.html",
  "./dictionary.html",
  "./fgsm2.html",
  "./fgsm3.html",
  "./fgsm2-day1.html",
  "./fgsm2-day2.html",
  "./fgsm2-day3.html",
  "./fgsm2-day4.html",
  "./fgsm2-day5.html",
  "./fgsm3-day1.html",
  "./fgsm3-day2.html",
  "./fgsm3-day3.html",
  "./fgsm3-day4.html",
  "./fgsm3-day5.html",
  "./games.html",
  "./flashcards.html",
  "./notebook.html",
  "./privacy.html",
  "./accessibility.html",
  "./404.html",
  "./styles-v8.css",
  "./styles-v9.css",
  "./styles-v10.css",
  "./styles-v12.css",
  "./styles-v13.css",
  "./styles-v14.css",
  "./styles-v15.css",
  "./styles-v16.css",
  "./styles-v17.css",
  "./styles-v18.css",
  "./styles-v19.css",
  "./styles-v20.css",
  "./styles-v21.css",
  "./styles-v22.css",
  "./styles-v23.css",
  "./fgsm3-day1-game.js",
  "./fgsm3-day2-game.js",
  "./assets/fgsm3/day1/images/fgsm3-day1-control-room.webp",
  "./assets/fgsm3/day1/images/fgsm3-day1-patient01-headache.webp",
  "./assets/fgsm3/day1/images/fgsm3-day1-patient02-ankle.webp",
  "./assets/fgsm3/day1/images/fgsm3-day1-patient03-fatigue.webp",
  "./assets/fgsm3/day1/images/fgsm3-day1-patient04-medication.webp",
  "./assets/fgsm3/day1/music/fgsm3-day1-control-room-theme.mp3",
  "./app.js",
  "./home.js",
  "./games.js",
  "./flashcards.js",
  "./notebook.js",
  "./student-data.js",
  "./pwa.js",
  "./accessibility.js",
  "./data/vocabulary.js",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
          return response;
        })
        .catch(async () => {
          return (await caches.match(request, {ignoreSearch: true})) ||
                 (await caches.match("./index.html"));
        })
    );
    return;
  }

  event.respondWith(
    caches.match(request, {ignoreSearch: true}).then(cached => {
      if (cached) return cached;

      return fetch(request).then(response => {
        if (response && response.ok) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(request, copy));
        }
        return response;
      });
    })
  );
});
