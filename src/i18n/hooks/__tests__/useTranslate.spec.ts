import { useTranslate, $language, FALLBACK_MESSAGE } from "~/i18n";
import { renderHook, type RenderHookResult, waitFor } from "~/../test-utils";
import { TEST_LANGUAGE, TEST_NAMESPACE, TEST_PAYLOAD } from "~/mocks/i18n";

describe("useTranslate", () => {
    let handler: RenderHookResult<ReturnType<typeof useTranslate>, void>;

    beforeEach(() => {
        $language.set(TEST_LANGUAGE);

        handler = renderHook(() => useTranslate(TEST_NAMESPACE));
    });

    it("translates successfully", async () => {
        await waitFor(() => {
            expect(handler.result.current.i18n("key.nested")).toEqual(TEST_PAYLOAD.key.nested);

            expect(`${handler.result.current.$t((v) => v.key.nested)}`).toEqual(TEST_PAYLOAD.key.nested);
        });
    });

    it("uses the fall backs correctly", async () => {
        await waitFor(() => {
            expect(handler.result.current.i18n("none.existing.value", "fallback value")).toEqual("fallback value");

            expect(`${handler.result.current.$t((v) => v.some.none.existing.key)}`).toEqual(FALLBACK_MESSAGE);
        });
    });
});
