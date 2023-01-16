import { useLanguage, $language } from "~/i18n";
import { preferred_supported_language } from "~/i18n/utils";
import { renderHook, act, type RenderHookResult } from "~/../test-utils";
import { TEST_LANGUAGE } from "~/mocks/i18n";

describe("useLanguage", () => {
    let handler: RenderHookResult<ReturnType<typeof useLanguage>, void>;

    beforeEach(() => {
        handler = renderHook(useLanguage);
    });

    it("at first & by default the chosen language is <preferred_supported_language>", () => {
        expect(handler.result.current.language).toBe(preferred_supported_language());
    });

    it("is able to set language", async () => {
        act(() => {
            handler.result.current.set_language(TEST_LANGUAGE);
        });

        expect(handler.result.current.language).toBe(TEST_LANGUAGE);
        expect(handler.result.current.language).toBe($language.get());
    });
});
