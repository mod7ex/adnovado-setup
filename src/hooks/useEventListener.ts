import { RefObject, useEffect, useRef } from "react";
import useIsomorphicLayoutEffect from "~/hooks/useIsomorphicLayoutEffect";

/**
 *
 * @param eventName
 * @param handler
 * @param element
 * @param condition this is a dynamic condition to register and unregister listeners sometimes no need to have listeners registered
 * @param options
 */

// MediaQueryList Event based useEventListener interface
function useEventListener<K extends keyof MediaQueryListEventMap>(eventName: K, handler: (event: MediaQueryListEventMap[K]) => void, element: RefObject<MediaQueryList>, condition?: boolean, options?: boolean | AddEventListenerOptions): void;

// Window Event based useEventListener interface
function useEventListener<K extends keyof WindowEventMap>(eventName: K, handler: (event: WindowEventMap[K]) => void, element?: undefined, condition?: boolean, options?: boolean | AddEventListenerOptions): void;

// Element Event based useEventListener interface
function useEventListener<K extends keyof HTMLElementEventMap, T extends HTMLElement = HTMLDivElement>(eventName: K, handler: (event: HTMLElementEventMap[K]) => void, element: RefObject<T>, condition?: boolean, options?: boolean | AddEventListenerOptions): void;

// Document Event based useEventListener interface
function useEventListener<K extends keyof DocumentEventMap>(eventName: K, handler: (event: DocumentEventMap[K]) => void, element: RefObject<Document>, condition?: boolean, options?: boolean | AddEventListenerOptions): void;

function useEventListener<KW extends keyof WindowEventMap, KH extends keyof HTMLElementEventMap, KM extends keyof MediaQueryListEventMap, T extends HTMLElement | MediaQueryList | void = void>(
    eventName: KW | KH | KM,
    handler: (event: WindowEventMap[KW] | HTMLElementEventMap[KH] | MediaQueryListEventMap[KM] | Event) => void,
    element?: RefObject<T>,
    condition: boolean = true,
    options?: boolean | AddEventListenerOptions
) {
    // Create a ref that stores handler
    const savedHandler = useRef(handler);

    useIsomorphicLayoutEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        if (!condition) return;

        // Define the listening target
        const targetElement: T | Window = element?.current ?? window;

        if (!targetElement?.addEventListener) return;

        // Create event listener that calls handler function stored in ref
        const listener: typeof handler = (e) => savedHandler.current(e);

        targetElement.addEventListener(eventName, listener, options);

        // Remove event listener on cleanup
        return () => {
            targetElement.removeEventListener(eventName, listener);
        };
    }, [condition, eventName, element, options]);
}

/**
 *
 * WindowEventMap, HTMLElementEventMap, DocumentEventMap, MediaQueryList
 * See: https://usehooks-ts.com/react-hook/use-isomorphic-layout-effect
 *
 */

export default useEventListener;
