import useToggle from "~/hooks/useToggle";
import { renderHook, act } from "~/../test-utils";

describe("useCounter", () => {
    it("toggles correctly", () => {
        const initialProps = Math.random() < 0.5;

        const { result } = renderHook(useToggle, { initialProps });

        expect(result.current[0]).toBe(initialProps);

        act(() => {
            result.current[1]();
        });

        expect(result.current[0]).toBe(!initialProps);

        act(() => {
            result.current[1]();
        });

        expect(result.current[0]).toBe(initialProps);
    });

    it("toggle works using a value", () => {
        const initialProps = Math.random() < 0.5;

        const { result } = renderHook(useToggle, { initialProps: () => initialProps });

        const _initialProps = Math.random() > 0.5;

        act(() => {
            result.current[1](_initialProps);
        });

        expect(result.current[0]).toBe(_initialProps);
    });

    it("toggle works using a function", () => {
        const initialProps = Math.random() < 0.5;

        const { result } = renderHook(useToggle, { initialProps: () => initialProps });

        act(() => {
            result.current[1]((v) => !v);
        });

        expect(result.current[0]).toBe(!initialProps);
    });
});
