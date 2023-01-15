import useLocalStorage from "~/hooks/useLocalStorage";
import { renderHook, act } from "~/../test-utils";
import { LOCAL_STORAGE_DEFAULTS } from "~/mocks/utils";

enum TEST {
    FIRST = "first value ...",
    SECOND = "second value ...",
}

describe("useLocalStorage", () => {
    it("uses the values found in localStorage by default", () => {
        const { result } = renderHook(() => useLocalStorage(LOCAL_STORAGE_DEFAULTS.KEY, "anything"));

        expect(result.current[0]).toBe(LOCAL_STORAGE_DEFAULTS.VALUE);

        act(() => {
            result.current[1](TEST.FIRST);
        });

        expect(result.current[0]).toBe(TEST.FIRST);

        const value_stored_in_local_storage = localStorage.getItem(LOCAL_STORAGE_DEFAULTS.KEY)!;

        expect(JSON.parse(value_stored_in_local_storage)).toEqual(TEST.FIRST);
    });

    it("changes correctly", () => {
        const KEY = "key";

        const { result } = renderHook(() => useLocalStorage(KEY, TEST.FIRST));

        expect(result.current[0]).toBe(TEST.FIRST);

        act(() => {
            result.current[1](TEST.SECOND);
        });

        expect(result.current[0]).toBe(TEST.SECOND);

        const value_stored_in_local_storage = localStorage.getItem(KEY)!;

        expect(JSON.parse(value_stored_in_local_storage)).toEqual(TEST.SECOND);
    });
});
