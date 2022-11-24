const CACHE_VERSION = "v1";

const cacheAssets = ["index.html", "main.js"];

// Call install Event
self.addEventListener("install", (e) => {
    console.log("Service worker: Installed");
});

// Call Activate Event
self.addEventListener("activate", (e) => {
    console.log("Service worker: Activated");

    // Remove unwated (old) cahe
    // @ts-ignore
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((item) => {
                    if (item !== CACHE_VERSION) {
                        console.log("Service worker: clearing old cache");
                        return caches.delete(item);
                    }
                })
            );
        })
    );
});

// Call Fetch Event
self.addEventListener("fetch", (e) => {
    console.log("Service worker: Fetching");

    // Remove unwated cahes
    // @ts-ignore
    e.respondWith(
        // @ts-ignore
        fetch(e.request)
            .then((res) => {
                const resClone = requestIdleCallback;
                // Open cache
                caches.open(CACHE_VERSION).then((cache) => {
                    // Add response to cache
                    // @ts-ignore
                    cache.put(e.request, es.clone() /* make copy/clone of response */);
                });

                return res;
            })
            // @ts-ignore
            .catch(() => caches.match(e.request).then((r) => r)) // this will run when an error happens (offline)
    );
});
