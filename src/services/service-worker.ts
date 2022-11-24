const init = () => {
    if ("serviceWorker" in navigator) {
        navigator.serviceWorker
            .register("../../sw.ts", { scope: "/" })
            .then((registration) => console.log("Service worker: Registered"))
            .catch((err) => console.log(`Service worker Error ${err}`));
    } else {
        console.log("Service worker are not supported");
    }
};

window.addEventListener("load", init);

export default init;
