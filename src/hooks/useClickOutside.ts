import { type RefObject, useRef } from "react";
import useEventListener from "~/hooks/useEventListener";
import { isArray } from "~/utils/types";

// more precision : https://github.com/sandiiarov/use-events/blob/master/src/useClickOutside/index.tsx

export default function useClickOutside<T extends HTMLElement>(ref: RefObject<T> | RefObject<T>[], cb: (e: MouseEvent) => void, options = { condition: true }) {
    useEventListener(
        "click",
        (e) => {
            const target = e.target as Node | null;

            if (isArray(ref)) {
                for (let item of ref) {
                    // check if the click target exists and if it's not null
                    if (item.current == null || item.current.contains(target)) return;
                }
            } else if (ref.current == null || ref.current.contains(target)) return;

            cb(e);
        },
        useRef(document),
        options
    );
}
