import { isPlainObject, trimChar } from "~/utils";
import { PAGES } from "~/router";

export enum SUPPORTED_LANGUAGES {
    ENGLISH = "en",
    FRENCH = "fr",
}

export enum EXTENDED_SUPPORTED_LANGUAGES {
    ENGLISH = "english",
    FRENCH = "français",
}

/**
 * dictionary inside '~/i18n/locales/en/**' without <.json>
 */
const DICTIONARY_NAMESPACE = {
    INNER: { namespace: "inner" },
    COMMON: { namespace: "common" },
    PAGE_AUTH: { page: PAGES.AUTH, namespace: "auth" },
    PAGE_DASHBOARD: { page: PAGES.DASHBOARD, namespace: "pages/dashboard" },
    PAGE_LISTINGS: { page: PAGES.DASHBOARD, namespace: "pages/dashboard" },
} as const;

export enum DICTIONARY_NAMESPACES {
    INNER = "inner",
    COMMON = "common",
    PAGE_AUTH = "auth",
    PAGE_DASHBOARD = "pages/dashboard",
    PAGE_LISTINGS = "pages/dashboard",
}

// type IDN = {
//     [K in keyof typeof DICTIONARY_NAMESPACES]: {
//         namespace: K;
//         page: K extends `PAGE_${infer R extends string}` ? PAGES[R] : undefined;
//     };
// };

const DN = Object.entries(DICTIONARY_NAMESPACES).reduce((prev, [key, ns]) => {
    return {
        [key]: { namespace: ns, page: PAGES[key.replace("PAGE_", "") as keyof typeof PAGES] },
        ...prev,
    };
}, {});

// export type DICTIONARY_NAMESPACES = typeof DICTIONARY_NAMESPACE extends Record<string, { namespace: infer D }> ? D : never;

export const LANGUAGE_CONTEXT_DISPLAY_NAME = "language_context";

export const LOCAL_STORAGE_LANGUAGE_KEY = "language";

export type NAMESPACE_PAYLOAD = SetFallback<ObjectOfNested<string>>;

const raw_loader = async <T>(lang: SUPPORTED_LANGUAGES, name_space: DICTIONARY_NAMESPACES) => {
    const response = await fetch(`/locales/${lang}/${trimChar(name_space, "/")}.json`);

    return response.json() as Promise<T | undefined>;
};

export const load = async <T>(lang: SUPPORTED_LANGUAGES, name_space: DICTIONARY_NAMESPACES): Promise<T | undefined> => {
    let payload: T | undefined;

    try {
        payload = await raw_loader<T>(lang, name_space);
    } finally {
        if (payload) return payload;
    }

    try {
        payload = await raw_loader<T>(SUPPORTED_LANGUAGES.ENGLISH, name_space);
    } finally {
        if (payload) return payload;
    }
};

export const preferred_supported_language = () => {
    /*
     *
     * Detect preferred language
     *
     * https://developer.mozilla.org/en-US/docs/Web/API/Navigator/languages
     * In the returned array they are ordered by preference with the most preferred language first.
     */
    for (let v of navigator.languages) {
        const _language = v.substring(0, 2) as SUPPORTED_LANGUAGES;

        if (Object.values(SUPPORTED_LANGUAGES).includes(_language)) return _language;
    }

    return SUPPORTED_LANGUAGES.ENGLISH;
};

export const current_language = () => {
    let _language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY);

    if (!_language) {
        _language = preferred_supported_language();

        localStorage;
    }

    return JSON.parse(_language) as SUPPORTED_LANGUAGES;
};

export function getNestedValue<T extends NAMESPACE_PAYLOAD>(target: T, keys: string[]): string {
    if (keys.length === 0) return "";

    const [x, ..._keys] = keys;

    const _target = target[x];

    if (isPlainObject(_target)) return getNestedValue(_target, _keys);

    return _target ?? "";
}

const wrapScalar = <T extends Numberish | undefined>(value: T) => {
    return new Proxy(
        {},
        {
            get(_, key): any {
                if (key === "_value_") return value;

                if (key === Symbol.toPrimitive) return () => value;

                return wrapScalar(value);
            },
        }
    );
};

export const recursionProxy = <T extends NAMESPACE_PAYLOAD>(subject: T, fallback = "", fbKey = "_"): T =>
    new Proxy(subject, {
        get(target, key: string & keyof T) {
            const _target = target[key];

            if (isPlainObject(_target)) return recursionProxy(_target, fallback);

            // _ is a default fallback key for that level
            return wrapScalar((_target ?? target[fbKey] ?? fallback) as Numberish | undefined);
        },
    });

// --------------------------------------- i18n implementation ---------------------------------------

class Language {
    static instance?: Language;

    private state?: SUPPORTED_LANGUAGES;

    constructor() {
        if (!Language.instance) {
            this.state = this.load();

            Language.instance = this;
        }

        return Language.instance;
    }

    private load() {
        let _language = localStorage.getItem(LOCAL_STORAGE_LANGUAGE_KEY);

        if (!_language) {
            _language = preferred_supported_language();

            localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, _language);
        }

        return _language as SUPPORTED_LANGUAGES;
    }

    set(v: SUPPORTED_LANGUAGES) {
        localStorage.setItem(LOCAL_STORAGE_LANGUAGE_KEY, v);

        this.state = v;

        return this;
    }

    get() {
        return this.state!;
    }
}

class Dictionary {
    static instance?: Dictionary;

    private state?: Map<SUPPORTED_LANGUAGES, { [K in DICTIONARY_NAMESPACES]?: NAMESPACE_PAYLOAD }>;

    constructor(private readonly _language: Language) {
        if (!Dictionary.instance) {
            this.state = new Map();

            Dictionary.instance = this;
        }

        return Dictionary.instance;
    }

    get language() {
        return this._language.get();
    }

    set_language(v: SUPPORTED_LANGUAGES) {
        this._language.set(v);
    }

    set(name_space: DICTIONARY_NAMESPACES, name_space_payload: NAMESPACE_PAYLOAD) {
        const _language = this.language;

        let _dictionary = this.state!.get(_language);

        if (!_dictionary) {
            this.state!.set(_language, { [name_space]: name_space_payload });
            return;
        }

        if (name_space in _dictionary) return;

        _dictionary[name_space] = name_space_payload;
    }

    get(name_space: DICTIONARY_NAMESPACES): NAMESPACE_PAYLOAD | undefined {
        const _dictionary = this.state!.get(this.language);
        if (_dictionary) return _dictionary[name_space];
    }

    async load(name_space: DICTIONARY_NAMESPACES): Promise<NAMESPACE_PAYLOAD | never> {
        let payload = this.get(name_space);

        if (!payload) {
            payload = await load<NAMESPACE_PAYLOAD>(this.language, name_space);

            if (!payload) throw Error("Couldn't load translation");

            this.set(name_space, payload);
        }

        return payload;
    }

    clear() {
        this.state!.clear();
    }
}

export const $language = new Language();
export const $dictionary = new Dictionary($language);
