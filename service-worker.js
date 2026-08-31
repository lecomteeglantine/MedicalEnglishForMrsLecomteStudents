const CACHE_PREFIX = "mrs-lecomte-medical-english-";
self.addEventListener("install", event => {
  event.waitUntil(self.skipWaiting());
});
self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    try {
      const keys = await caches.keys();
      await Promise.all(keys.filter(key => key.startsWith(CACHE_PREFIX)).map(key => caches.delete(key)));
    } catch (_) {}
    try { await self.clients.claim(); } catch (_) {}
    try {
      const windows = await self.clients.matchAll({type:"window", includeUncontrolled:true});
      for (const client of windows) {
        try {
          const url = new URL(client.url);
          if (url.origin === self.location.origin && !url.searchParams.has("swreset")) {
            url.searchParams.set("swreset", String(Date.now()));
            await client.navigate(url.href);
          }
        } catch (_) {}
      }
    } catch (_) {}
    try { await self.registration.unregister(); } catch (_) {}
  })());
});
self.addEventListener("fetch", event => {
  if (event.request.method === "GET") event.respondWith(fetch(event.request));
});
