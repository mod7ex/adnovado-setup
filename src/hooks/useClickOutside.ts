import { RefObject, useRef } from "react";
import useEventListener from "~/hooks/useEventListener";
import { isArray } from "~/utils/types";

export default function useClickOutside<T extends HTMLElement>(ref: RefObject<T> | RefObject<T>[], cb: (e: MouseEvent) => void, condition = true) {
    useEventListener(
        "click",
        (e) => {
            if (isArray(ref)) {
                for (let item of ref) {
                    // check if the click target exists and if it's not null
                    if (item.current == null || item.current.contains(e.target as Node | null)) return;
                }
            } else if (ref.current == null || ref.current.contains(e.target as Node | null)) return;

            cb(e);
        },
        useRef(document),
        condition
    );
}
