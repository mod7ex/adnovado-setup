let sw;

const init = () => {
    if (!("serviceWorker" in navigator)) return console.log("Service worker are not supported");

    // 1 - register the Service worker
    navigator.serviceWorker
        .register("../../sw.ts", { scope: "/" })
        .then((registration) => {
            console.log("[Handler] Service worker: Registered");
            sw = registration.installing || registration.waiting || registration.active;
        })
        .catch((err) => console.log(`[Handler] Service worker: Error ${err}`));

    // 2 - see if the current page has a running service worker
    if (navigator.serviceWorker.controller) {
        console.log("[Handler] Service worker: Installed");
    }

    // 3 - register a handler to detect when a new or updated service worker is installed & activated
    navigator.serviceWorker.oncontrollerchange = (e) => {
        console.log("[Handler] Service worker: Activated");
    };

    /*
    // 4 - remove/unregister service worker
    navigator.serviceWorker.getRegistrations().then((regs) => { for (let reg of regs) { reg.unregister().then((isUnreg) => console.log(isUnreg)); } });
    */
};

window.addEventListener("load", init);

export default init;
