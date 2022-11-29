const VERSION = 3;

const STATIC_CACHE = `static_cache-${VERSION}`;
const DYNAMIC_CACHE = `dynamic_cache-${VERSION}`;
const FONT_CACHE = `font_cache-${VERSION}`;
const IMG_CACHE = `img_cache-${VERSION}`;

const assets = ["/", "/logo.svg", "vite.svg"];

self.addEventListener("install", (e) => {
    // ------------> [ExtendableEvent]

    // @ts-ignore
    self.skipWaiting(); // skip waiting to activate (but... the page will not be using the sw yet, needs to claim clients)

    // @ts-ignore
    e.waitUntil(
        caches.open(STATIC_CACHE).then((cache) => {
            cache
                .addAll(assets)
                .then(() => console.log(`[CACHE] ${STATIC_CACHE} updated`))
                .catch(() => console.log(`[CACHE] ${STATIC_CACHE} faild to update`));
        })
    );

    console.log(`Version ${VERSION} installed`);
});

self.addEventListener("activate", (e) => {
    // ------------> [ExtendableEvent]
    console.log("[SW]: Activated");

    // @ts-ignore
    clients.claim().then(() => {
        // claim means that the html file will use this new service worker.
        console.log("the service worker has now claimed all the pages so they can use the service worker");
    });

    // @ts-ignore
    e.waitUntil(
        // delete old caches
        caches.keys().then((items) => {
            return Promise.all(
                items.map((v) => {
                    v !== STATIC_CACHE &&
                        caches
                            .delete(v)
                            .then((c) => {
                                c && console.log(`[cache] ${v} deleted`);
                            })
                            .catch(() => {
                                console.log(`[cache] ${v} failed to be deleted`);
                            });
                })
            );
        })
    );
});

const cacheByOrogine = (req, res) => {
    /**
     * we decide in wich cache bottle we will store the data based on it's nature
     */
    let CACHE = STATIC_CACHE;

    const type = res.headers.get("content-type");

    if (type) {
        // @ts-ignore
        if (type.match(/^text\css/i) || req.url.match(/fonts.googleapis.com/i)) {
            CACHE = DYNAMIC_CACHE;
        }
    }

    return CACHE;
};

self.addEventListener("fetch", (e) => {
    // ------------> [ExtendableEvent]
    // service worker intercepted a fetch call
    // @ts-ignore
    // console.log("[SW]: Intercepted http request", e.request);

    // @ts-ignore
    // e.respondWith(fetch(e.request));

    // e.respondWith(
    //     // @ts-ignore
    //     caches.match(e.request).then((res) => {
    //         if (res) return res;
    //         // @ts-ignore
    //         else return fetch(e.request);
    //     })
    // );

    const request: Request = e.request;

    // @ts-ignore
    e.respondWith(
        caches.match(request).then((res) => {
            if (res) return res;

            return Promise.resolve().then(() => {
                const options: RequestInit = {
                    mode: request.mode, // cors, no-cors, same-origine, navigate
                    cache: "no-cache",
                };

                if (!request.url.startsWith(location.origin)) {
                    // [SECURITY] requesting some other origine
                    (options.mode = "cors"), (options.credentials = "omit");
                }

                return fetch(request, options)
                    .then((fetchResp) => {
                        if (fetchResp.ok) {
                            let CACHE = cacheByOrogine(request, fetchResp);

                            return caches.open(CACHE).then((cache) => {
                                cache.put(request, fetchResp.clone());

                                return fetchResp;
                            });
                        }

                        if (fetchResp.status === 404) {
                            console.log("404 in top");
                            return caches.open(STATIC_CACHE).then((cache) => cache.match(assets[1]));
                        }
                    })
                    .catch(() => {
                        console.log("404 xaxaxaxaxaxaxaxaxaxaxax");
                        return caches.open(STATIC_CACHE).then((cache) => cache.match(assets[1]));
                    });
            });
        })
    );
});

self.addEventListener("message", (e) => {
    // ------------> [ExtendableEvent]
    // message from webpage
});

// https://www.youtube.com/playlist?list=PLyuRouwmQCjl4iJgjH3i61tkqauM-NTGj          7
