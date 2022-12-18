import { isPlainObject } from "~/utils/types";
import { trimChar } from "~/utils";
import { SUPPORTED_LANGS, DICTIONARY_PARTIAL } from "~/constants";

export type LangDictionary = SetFallback<ObjectOfNested<string>>;

const raw_loader = <T>(lang: SUPPORTED_LANGS, partial: DICTIONARY_PARTIAL) => import(`~/i18n/locales/${lang}/${trimChar(partial, "/")}.json`) as Promise<{ default: T | undefined }>;

export const load = async <T>(lang: SUPPORTED_LANGS, partial: DICTIONARY_PARTIAL): Promise<T | undefined> => {
    let payload: T | undefined;

    try {
        payload = (await raw_loader<T>(lang, partial)).default;
    } finally {
        if (payload) return payload;
    }

    try {
        payload = (await raw_loader<T>(SUPPORTED_LANGS.ENGLISH, partial)).default;
    } catch {
        if (payload) return payload;
    }
};

export function getNestedValue<T extends LangDictionary>(target: T, keys: string[]): string {
    if (keys.length === 0) return "";

    const [x, ..._keys] = keys;

    const _target = target[x];

    if (isPlainObject(_target)) return getNestedValue(_target, _keys);

    return _target ?? "";
}

export const recursionProxy = <T extends LangDictionary>(subject: T, fallback = "", fbKey = "_"): T =>
    new Proxy(subject, {
        get(target, key: string & keyof T) {
            const _target = target[key];

            if (isPlainObject(_target)) return recursionProxy(_target, fallback);

            // _ is a default fallback key for that level
            return _target ?? target[fbKey] ?? fallback;
        },
    });

export const preferred_supported_language = () => {
    /*
     *
     * Detect preferred language
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages
     * In the returned array they are ordered by preference with the most preferred language first.
     */
    for (let v of navigator.languages) {
        const _language = v.substring(0, 2) as SUPPORTED_LANGS;

        if (Object.values(SUPPORTED_LANGS).includes(_language)) return _language;
    }

    return SUPPORTED_LANGS.ENGLISH;
};
