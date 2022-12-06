import useToggle from "~/hooks/useToggle";
import { useCallback, useEffect } from "react";
import { open, close } from "~/utils";

const useFullScreen = () => {
    const [_, reRrender] = useToggle(); // Just to trigger (force) re-render

    const enabled = !!document.fullscreenElement;

    // no need for useCallback but ...
    const handler = useCallback(() => {
        reRrender(); // trigger a re-render
    }, []);

    useEffect(() => {
        document.addEventListener("fullscreenchange", handler);

        return () => {
            document.removeEventListener("fullscreenchange", handler);
        };
    });

    let toggle = async () => {
        try {
            if (enabled) await close();
            else await open();
        } catch {
            if (import.meta.env.DEV) console.log(`failed to ${enabled ? "quit" : "open"}`);
        }
    };

    return {
        enabled,
        toggle,
    };
};

export default useFullScreen;
