const CACHE_VERSION_ = "v2";

// Call install Event
self.addEventListener("install", (e) => {
    console.log("Service worker: Installed");

    // @ts-ignore
    e.waitUntil(
        caches
            .open(CACHE_VERSION)
            .then((cache) => {
                console.log("Service worker: Caching Files");
                cache.addAll(cacheAssets);
            })
            // @ts-ignore
            .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener("activate", (e) => {
    console.log("Service worker: Activated");

    // Remove unwated cahes
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
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
