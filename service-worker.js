const CACHE_PREFIX = "mrs-lecomte-medical-english-";
const CORE_CACHE = `${CACHE_PREFIX}v59-core-day3-r5.1-20260831`;
const RUNTIME_CACHE = `${CACHE_PREFIX}v59-runtime-day3-r5.1-20260831`;

// Keep the first install deliberately small. Large videos and music remain runtime-only.
// Day 3 HTML and its small WebP illustrations are pre-cached so both activities can reopen offline.
const CORE_SHELL = [
  "./",
  "./index.html",
  "./dictionary.html",
  "./fgsm2.html",
  "./fgsm3.html",
  "./grammar.html",
  "./pronunciation.html",
  "./games.html",
  "./flashcards.html",
  "./notebook.html",
  "./privacy.html",
  "./accessibility.html",
  "./404.html",
  "./fgsm3-day3.html",
  "./fgsm3-day3-go-bag.html",
  "./fgsm3-day3-individual.html",
  "./assets/fgsm3/day3/images/day3-displacement-context.webp",
  "./assets/fgsm3/day3/images/day3-cnn-msf-poster.webp",
  "./assets/fgsm3/day3/images/day3-humanitarian-archive.webp",
  "./assets/fgsm3/day3/images/day3-field-clinical.webp",
  "./styles-v8.css",
  "./styles-v9.css",
  "./styles-v19.css",
  "./styles-v29.css",
  "./styles-v37.css",
  "./styles-v47.css",
  "./styles-v54.css",
  "./styles-v55.css",
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

const REQUIRED_SHELL = [
  "./",
  "./index.html",
  "./fgsm3.html",
  "./fgsm3-day3.html",
  "./fgsm3-day3-go-bag.html",
  "./fgsm3-day3-individual.html",
  "./styles-v37.css",
  "./pwa.js",
  "./accessibility.js",
  "./manifest.webmanifest"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CORE_CACHE);
    // Critical Day 3 shell: fail the install only if one of these files is missing.
    await cache.addAll(REQUIRED_SHELL);
    // Everything else is useful offline, but one optional asset must never block an update.
    const optional = CORE_SHELL.filter(url => !REQUIRED_SHELL.includes(url));
    await Promise.allSettled(optional.map(url => cache.add(url)));
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys
          .filter(key => key.startsWith(CACHE_PREFIX) && ![CORE_CACHE, RUNTIME_CACHE].includes(key))
          .map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});


async function fetchFresh(request) {
  // Avoid serving a just-deployed HTML/JS/CSS file from the browser HTTP cache.
  // If a browser does not accept the cache option here, fall back to a normal fetch.
  try {
    return await fetch(request, {cache: "no-store"});
  } catch (_) {
    return fetch(request);
  }
}

async function putRuntime(request, response) {
  if (!response || !response.ok || response.status === 206) return response;
  try {
    const cache = await caches.open(RUNTIME_CACHE);
    await cache.put(request, response.clone());
  } catch (_) {}
  return response;
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  // Browsers use Range requests for seeking in audio/video. Passing them directly
  // to the network avoids broken partial-response caching and scrubber failures.
  if (request.headers.has("range")) {
    event.respondWith(fetch(request));
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith((async () => {
      try {
        return await putRuntime(request, await fetchFresh(request));
      } catch (_) {
        return (await caches.match(request, {ignoreSearch:true})) ||
               (await caches.match("./index.html"));
      }
    })());
    return;
  }

  const isCode = /\.(?:js|css|json|webmanifest)$/i.test(url.pathname);
  const isMedia = /\.(?:mp4|mp3|m4a|wav|ogg|webm)$/i.test(url.pathname);

  // Code is network-first so fixes published on GitHub Pages are picked up quickly.
  if (isCode) {
    event.respondWith((async () => {
      try {
        return await putRuntime(request, await fetchFresh(request));
      } catch (_) {
        return caches.match(request, {ignoreSearch:true});
      }
    })());
    return;
  }

  // Large media is not proactively cached. If a browser requests the complete
  // file, keep a runtime copy after a successful visit; Range requests bypass it.
  if (isMedia) {
    event.respondWith((async () => {
      try {
        return await putRuntime(request, await fetch(request));
      } catch (_) {
        return caches.match(request, {ignoreSearch:true});
      }
    })());
    return;
  }

  // Images and other static assets: cache-first with a background refresh.
  event.respondWith((async () => {
    const cached = await caches.match(request, {ignoreSearch:true});
    const network = fetch(request)
      .then(response => putRuntime(request, response))
      .catch(() => null);
    if (cached) {
      event.waitUntil(network);
      return cached;
    }
    return (await network) || Response.error();
  })());
});
