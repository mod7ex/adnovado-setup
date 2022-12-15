import useLocalStorage from "~/hooks/useLocalStorage";
import { useState, useCallback, useEffect, useMemo } from "react";
import { SUPPORTED_LANGS, LOCAL_STORAGE_LANGUAGE } from "~/constants";
import { getNestedValue, recursionProxy, load, type LangDictionary } from "~/i18n/utils";

const FALLBACK_MESSAGE = "______NOT_TRANSLATED______";

const useTranslate = () => {
    const [lang, set_lang] = useLocalStorage<SUPPORTED_LANGS>(LOCAL_STORAGE_LANGUAGE, SUPPORTED_LANGS.ENGLISH);

    const [payload, setPayload] = useState<LangDictionary>({});

    useEffect(() => {
        load(lang).then((v) => {
            v && setPayload(v);
        });
    }, [lang]);

    const i18n = useCallback(
        (key: string) => {
            return getNestedValue(payload, key.split("."));
        },
        [payload]
    );

    const $t = useMemo<any>(() => {
        return recursionProxy(payload, FALLBACK_MESSAGE);
    }, [payload]);

    return {
        language: lang,
        set_lang,
        i18n,
        $t,
    };
};

export default useTranslate;
