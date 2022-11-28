self.addEventListener("install", (e) => {
    console.log("[SW] Installed");
});

self.addEventListener("activate", (e) => {
    console.log("[SW] Activated");
});

self.addEventListener("fetch", (e) => {
    // service worker intercepted a fetch call
    // @ts-ignore
    console.log("[SW] Intercepted http request", e.request);
});

self.addEventListener("message", (e) => {
    // message from webpage
});
