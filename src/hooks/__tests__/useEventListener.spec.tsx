import useEventListener, { Options } from "~/hooks/useEventListener";
import { vi } from "vitest";
import { renderHook, fireEvent } from "~/../test-utils";

const TEST_EVENT = "test-event";

declare global {
    interface WindowEventMap {
        [TEST_EVENT]: CustomEvent;
    }

    interface HTMLElementEventMap {
        [TEST_EVENT]: CustomEvent;
    }

    interface DocumentEventMap {
        [TEST_EVENT]: CustomEvent;
    }

    interface MediaQueryListEventMap {
        [TEST_EVENT]: CustomEvent;
    }
}

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

const TARGETS = {
    window: {
        add: vi.spyOn(window, "addEventListener"),
        remove: vi.spyOn(window, "removeEventListener"),
    },

    element: (() => {
        const ref = { current: document.createElement("div") };
        const add = vi.spyOn(ref.current, "addEventListener");
        const remove = vi.spyOn(ref.current, "removeEventListener");

        return { ref, add, remove };
    })(),

    document: (() => {
        const ref = { current: window.document };
        const add = vi.spyOn(ref.current, "addEventListener");
        const remove = vi.spyOn(ref.current, "removeEventListener");

        return { ref, add, remove };
    })(),

    media_query: (() => {
        const ref = { current: window.matchMedia("(max-width: 600px)") };
        const add = vi.spyOn(ref.current, "addEventListener");
        const remove = vi.spyOn(ref.current, "removeEventListener");

        return { ref, add, remove };
    })(),
};

describe("useEventListener()", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("should bind/unbind the event listener to the window when element is not provided", () => {
        const handler = vi.fn();

        const { unmount } = renderHook(() => useEventListener(TEST_EVENT, handler));

        expect(TARGETS.window.add).toHaveBeenCalledTimes(1);
        expect(TARGETS.window.add).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function), undefined);

        unmount();

        expect(TARGETS.window.remove).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function));
    });

    it("should bind/unbind the event listener to the element when element is provided", () => {
        const handler = vi.fn();

        const { unmount } = renderHook(() => useEventListener(TEST_EVENT, handler, TARGETS.element.ref));

        expect(TARGETS.element.add).toHaveBeenCalledTimes(1);

        expect(TARGETS.element.add).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function), undefined);

        unmount();

        expect(TARGETS.element.remove).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function));
    });

    it("should bind/unbind the event listener to the document when document is provided", () => {
        const handler = vi.fn();

        const { unmount } = renderHook(() => useEventListener(TEST_EVENT, handler, TARGETS.document.ref));

        expect(TARGETS.document.add).toHaveBeenCalledTimes(1);
        expect(TARGETS.document.add).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function), undefined);

        unmount();

        expect(TARGETS.document.remove).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function));
    });

    it("should bind/unbind the event listener to the media query list when it is provided", () => {
        const handler = vi.fn();

        const { unmount } = renderHook(() => useEventListener(TEST_EVENT, handler, TARGETS.media_query.ref));

        expect(TARGETS.media_query.add).toHaveBeenCalledTimes(1);

        expect(TARGETS.media_query.add).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function), undefined);

        unmount();

        expect(TARGETS.media_query.remove).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function));
    });

    it("should pass the options to the event listener", () => {
        const condition = Math.random() > 0.5;

        const handler = vi.fn();
        const options: Options = {
            condition,
            raw: {
                passive: true,
                once: true,
                capture: true,
            },
        };

        const { unmount } = renderHook(() => useEventListener(TEST_EVENT, handler, undefined, options));

        unmount();

        if (condition) {
            expect(TARGETS.window.add).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function), options.raw);
            expect(TARGETS.window.remove).toHaveBeenCalledWith(TEST_EVENT, expect.any(Function));
        } else {
            expect(TARGETS.window.add).not.toBeCalled();
            expect(TARGETS.window.remove).not.toBeCalled();
        }
    });

    it("should call the event listener handler when the event is triggered", () => {
        const handler = vi.fn();

        renderHook(() => useEventListener("click", handler, TARGETS.element.ref));

        fireEvent.click(TARGETS.element.ref.current);

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it("should have the correct event type", () => {
        const clickHandler = vi.fn();
        const keydownHandler = vi.fn();

        renderHook(() => useEventListener("click", clickHandler, TARGETS.element.ref));
        renderHook(() => useEventListener("keydown", keydownHandler, TARGETS.element.ref));

        fireEvent.click(TARGETS.element.ref.current);
        fireEvent.keyDown(TARGETS.element.ref.current);

        expect(clickHandler).toHaveBeenCalledWith(expect.any(MouseEvent));
        expect(keydownHandler).toHaveBeenCalledWith(expect.any(KeyboardEvent));
    });
});
