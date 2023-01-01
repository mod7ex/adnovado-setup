export enum SUPPORTED_LANGS {
    ENGLISH = "en",
    FRENCH = "fr",
}

/**
 * paths inside '~/i18n/locales/en/**' without <.json>
 */
export enum DICTIONARY_PARTIAL {
    OUTER_LOGIN = "outer/login",
    OUTER_REGISTER = "outer/register",
    INNER = "inner",
    PAGE_DASHBOARD = "pages/dashboard",
}

export const LANGUAGE_CONTEXT_DISPLAY_NAME = "language_context";

export const LOCAL_STORAGE_LANGUAGE_KEY = "language";

export const MODE = {
    TEST: import.meta.env.TEST_MODE === "true",
    PROD: import.meta.env.PROD,
    DEV: import.meta.env.DEV,
    STRICT_DEV: import.meta.env.DEV && !(import.meta.env.TEST_MODE === "true"),
};
