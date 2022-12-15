import { isPlainObject } from "~/utils/types";
import { SUPPORTED_LANGS } from "~/constants";

export type LangDictionary = SetFallback<ObjectOfNested<string>>;

export const load = async (lang: SUPPORTED_LANGS): Promise<LangDictionary | undefined> => {
    let payload;

    try {
        payload = (await import(`../i18n/json/${lang}.json`)).default;
    } finally {
        if (payload) return payload;
    }

    try {
        payload = (await import(`../i18n/json/${SUPPORTED_LANGS.ENGLISH}.json`)).default;
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
