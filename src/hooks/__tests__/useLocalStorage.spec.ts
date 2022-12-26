import useLocalStorage from "~/hooks/useLocalStorage";
import { renderHook, act } from "~/../test-utils";

describe("useCounter", () => {
    it("toggles correctly", () => {
        const { result } = renderHook(() => useLocalStorage("theme", false));

        expect(result.current[0]).toBe(false);

        act(() => {
            result.current[1](true);
        });

        expect(result.current[0]).toBe(true);
    });
});
