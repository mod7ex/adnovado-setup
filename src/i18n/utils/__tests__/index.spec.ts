import { Dictionary, Language, preferred_supported_language, $language } from "~/i18n/utils";
import { TEST_LANGUAGE, TEST_NAMESPACE, TEST_PAYLOAD } from "~/mocks/i18n";

/**
 * We expect that the preferred supported language is one of the items of the enum SUPPORTED_LANGUAGES
 */

describe("Language class", () => {
    let $language = new Language();

    it("defaults to the preferred supported language", () => {
        expect($language.get()).toBe(preferred_supported_language());
    });

    test("existence of one and unique instance <Singleton pattern>", () => {
        expect($language).toBe(new Language());
    });

    it("sets new language successfully", () => {
        $language.set(TEST_LANGUAGE);

        expect($language.get()).toBe(TEST_LANGUAGE);
    });

    it("resets successfully", () => {
        $language.reset();

        expect($language.get()).toBe(preferred_supported_language());
    });
});

describe("Dictionary class", () => {
    localStorage.clear();

    let $dictionary = new Dictionary(new Language());

    test("existence of one and unique instance <Singleton pattern>", () => {
        expect($dictionary).toBe(new Dictionary(new Language()));
    });

    test("language is by default preferred_supported_language", () => {
        expect($dictionary.language).toBe(preferred_supported_language());
    });

    test("ability to set language", () => {
        $dictionary.set_language(TEST_LANGUAGE);

        expect($dictionary.language).toBe(TEST_LANGUAGE);
    });

    test("by default there is no namespaces", () => {
        expect($dictionary.namespaces).toHaveLength(0);
    });

    it("loads payloads successfully based on the provided namespace", async () => {
        $dictionary.set_language(TEST_LANGUAGE);

        await $dictionary.load(TEST_NAMESPACE);

        // don't use toBe because there was a deep clone after <await response.json()> so not same reference
        expect($dictionary.get(TEST_NAMESPACE)).toEqual(TEST_PAYLOAD);

        expect($dictionary.namespaces).toEqual([TEST_NAMESPACE]);
    });
});
