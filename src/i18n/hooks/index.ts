import useLocalStorage from "~/hooks/useLocalStorage";
import { useState, useCallback, useEffect } from "react";
import en from "~/i18n/json/en.json";
import { SUPPORTED_LANGS } from "~/constants";
// import useAsync from "./useAsync";
import { getNestedValue, recursionProxy } from "~/i18n/utils";

type LangDictionary = typeof en;

const FALLBACK_MESSAGE = "______EMPTY______";

export default function useTranslate() {
    const [lang, setLang] = useLocalStorage<SUPPORTED_LANGS>("language", SUPPORTED_LANGS.ENGLISH);

    const [payload, setPayload] = useState<LangDictionary>(en);

    const [fallback, setFallback] = useLocalStorage<SUPPORTED_LANGS>("fallback_language", SUPPORTED_LANGS.ENGLISH);

    const [fallbackPayload, setFallbackPayload] = useState<LangDictionary>(en);

    // three languages max will be imported and we won't use tow of them

    useEffect(() => {
        import(`../i18n/${lang}.json`)
            .then(({ default: data }) => {
                setPayload(data);
            })
            .catch(() => {
                setPayload(en);
            });
    }, [lang]);

    useEffect(() => {
        import(`../i18n/${fallback}.json`)
            .then(({ default: data }) => {
                setFallbackPayload(data);
            })
            .catch(() => {
                setFallbackPayload(en);
            });
    }, [fallback]);

    const translate = useCallback(
        (key: string) => {
            return getNestedValue(payload, key.split(".")) ?? getNestedValue(recursionProxy(fallbackPayload, FALLBACK_MESSAGE), key.split("."));
        },
        [payload, fallbackPayload]
    );

    return {
        language: lang,
        fallbackLanguage: fallback,
        setLanguage: setLang,
        setFallbackLanguage: setFallback,
        t: translate,
        SUPPORTED_LANGS,
    };
}
