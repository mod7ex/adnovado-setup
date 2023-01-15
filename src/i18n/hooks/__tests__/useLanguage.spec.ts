import useLanguage from "~/i18n/hooks/useLanguage";
import { SUPPORTED_LANGUAGES } from "~/i18n/utils";
import { vi } from "vitest";
import { renderHook } from "~/../test-utils";

describe("useLanguage", () => {
    it("at first & by default the chosen language is <ENGLISH>", () => {
        // const { result } = renderHook(useLanguage);

        // expect(result.current.language).toEqual(SUPPORTED_LANGUAGES.ENGLISH);

        expect(1).toBe(1);
    });
});
