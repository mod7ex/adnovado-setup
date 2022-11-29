let sw;

const sendMsgToSW = <T>(msg: T) => {
    navigator.serviceWorker.controller?.postMessage(msg);
};

const cacheSize = () => {
    if (!("storage" in navigator)) return console.log("Navigator does not support storage");
    if (!("estimate" in navigator.storage)) return console.log("No support for StorageManager methods");

    navigator.storage.estimate().then(({ usage, quota }) => {
        // quota, usage are in bytes (let's convert to kB)
        const usedKB = (usage ?? 0) / 1024;
        const quotaKB = (quota ?? 0) / 1024;
        console.log("---------->", "quota", quotaKB);
        console.log("---------->", "usage", usedKB);
    });

    // see if the storage can be set to persistent or stay
    navigator.storage.persist().then((v) => {
        console.log(`Browser grants persistent permission: ${v}`);
    });

    // ********** check cache size
    caches.open(`static_cache-${3}`).then((cache) => {
        cache.matchAll().then((matches) => {
            let total = 0;
            for (let response of matches) {
                total += response.headers.has("content-length") ? parseInt(response.headers.get("content-length") ?? "0") : 0;
                console.log(response.url);
            }
            console.log("total size is", total);
        });
    });
};

const init = () => {
    if (!("serviceWorker" in navigator)) return console.log("Service worker are not supported");

    // 1 - register the Service worker
    navigator.serviceWorker
        .register("../../sw.ts", { scope: "/" })
        .then((registration) => {
            console.log("[Handler] Service worker: Registered");
            sw = registration.installing || registration.waiting || registration.active;
        })
        .catch((err) => console.log(`[Handler] Service worker: Registration error ${err}`));

    // 2 - see if the current page has a running service worker
    if (navigator.serviceWorker.controller) console.log("[Handler] Service worker: There is an installed service worker");

    // 3 - register a handler to detect when a new or updated service worker is installed & activated
    navigator.serviceWorker.oncontrollerchange = (e) => {
        console.log("[Handler] Service worker: Activated");

        cacheSize();
    };

    /*
    // 4 - remove/unregister service worker
    navigator.serviceWorker.getRegistrations().then((regs) => { for (let reg of regs) { reg.unregister().then((isUnreg) => console.log(isUnreg)); } });
    */

    // 5 - listen to service worker messages
    navigator.serviceWorker.addEventListener("message", ({ data }) => {
        console.log(`web page received: ${data}`);
    });
};

window.addEventListener("load", init);

export default init;
