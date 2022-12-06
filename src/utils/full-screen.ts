const fail = <T extends string>(msg: T) => {
    throw Error(msg);
};

export function open() {
    const el = document.documentElement;

    let open: () => Promise<void> = async () => {};

    if ("requestFullscreen" in el) {
        open = () => el.requestFullscreen();
    } else if ("webkitRequestFullscreen" in el) {
        alert("safari");
        /* Safari */
        // @ts-ignore
        open = () => el.webkitRequestFullscreen();
    } else if ("msRequestFullscreen" in el) {
        /* IE11 */
        // @ts-ignore
        open = () => el.msRequestFullscreen();
    }

    return open();
}

/* Close fullscreen */
export function close() {
    let close: () => Promise<void> = async () => {};

    if ("exitFullscreen" in document) {
        close = () => document.exitFullscreen();
    } else if ("webkitExitFullscreen" in document) {
        /* Safari */
        // @ts-ignore
        close = () => document.webkitExitFullscreen();
    } else if ("msExitFullscreen" in document) {
        /* IE11 */
        // @ts-ignore
        close = () => document.msExitFullscreen();
    }

    return close();
}
