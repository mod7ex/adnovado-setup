import { useState, useCallback, useEffect, useMemo } from "react";
import { getNestedValue, recursionProxy, load, type LangDictionary } from "~/i18n/utils";

// "generate:locales": "quicktype person.json -o Person.ts" // https://quicktype.io/typescript

import useLanguage from "~/i18n/hooks/useLanguage";

const FALLBACK_MESSAGE = "______NOT_TRANSLATED______";

const useTranslate = () => {
    const [language, set_language] = useLanguage();

    const [payload, setPayload] = useState<LangDictionary>({});

    useEffect(() => {
        load(language).then((v) => {
            v && setPayload(v);
        });
    }, [language]);

    const i18n = useCallback(
        (key: string, fallback: string = "_") => {
            return getNestedValue(payload, key.split(".")) || fallback;
        },
        [payload]
    );

    // const i18n = (v: string) => `-${v}-`;

    const $t = useMemo<LangDictionary>(() => {
        return recursionProxy<LangDictionary>(payload as LangDictionary, FALLBACK_MESSAGE);
    }, [payload]);

    return {
        language,
        set_language,
        i18n,
        $t,
    };
};

export default useTranslate;
