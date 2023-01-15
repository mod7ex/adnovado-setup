import { rest } from "msw";
import { type SUPPORTED_LANGUAGES, type DICTIONARY_NAMESPACES, end_point } from "~/i18n/utils";

/**
 * We expect that the preferred supported language is one of the items of the enum SUPPORTED_LANGUAGES
 */

export const TEST_LANGUAGE = "__TEST_LANGUAGE__" as SUPPORTED_LANGUAGES;

export const TEST_NAMESPACE = "__TEST_NAMESPACE__" as DICTIONARY_NAMESPACES;

export const TEST_PAYLOAD = {
    key: {
        nested: "test",
    },
};

export default rest.get(end_point(TEST_LANGUAGE, TEST_NAMESPACE), (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(TEST_PAYLOAD));
});
