import useRenderCount from "~/hooks/useRenderCount";
import { renderHook } from "~/../test-utils";

describe("useRenderCount", () => {
    it("Works correctly", () => {
        const { result, rerender } = renderHook(useRenderCount);

        expect(result.current).toBe(1);

        rerender();

        expect(result.current).toBe(2);

        const random = Math.floor(Math.random() * 10);

        let i = 0;

        while (i < random) {
            i++;
            rerender();
        }

        expect(result.current).toBe(2 + random);
    });
});
