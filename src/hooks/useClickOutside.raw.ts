import { useCallback, useEffect, type RefObject } from "react";
import useToggle from "./useToggle";

/* Coppied from https://github.com/sandiiarov/use-events */

export default <T extends HTMLElement>(refs: RefObject<T>[], cb: (e: MouseEvent) => void): [boolean] => {
    const [isActive, setActive] = useToggle();

    const isOutside = useCallback(
        (e: MouseEvent) => {
            const test = refs.map((ref) => {
                return ref.current !== null && !ref.current.contains(e.target as HTMLElement);
            });

            return test.every(Boolean);
        },
        [refs]
    );

    const mousedown = useCallback(
        (e: MouseEvent) => {
            if (isOutside(e)) {
                setActive(true);
                cb(e);
            }
        },
        [isOutside, cb]
    );

    const mouseup = useCallback(
        (e: MouseEvent) => {
            if (isOutside(e)) {
                setActive(false);
            }
        },
        [isOutside]
    );

    useEffect(() => {
        document.addEventListener("mousedown", mousedown);
        document.addEventListener("mouseup", mouseup);

        return () => {
            document.removeEventListener("mousedown", mousedown);
            document.removeEventListener("mouseup", mousedown);
        };
    }, [mousedown, mousedown]);

    return [isActive];
};
