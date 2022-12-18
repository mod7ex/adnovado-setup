import { useCallback, useMemo } from "react";
import { getNestedValue, recursionProxy, type LangDictionary } from "~/i18n/utils";

const FALLBACK_MESSAGE = "______NOT_TRANSLATED______";

const useTranslate = <T extends LangDictionary>(dictionary: T) => {
    const i18n = useCallback(
        (key: string, fallback: string = "_") => {
            if (!dictionary) return "";
            return getNestedValue(dictionary, key.split(".")) || fallback;
        },
        [dictionary]
    );

    // const i18n = (v: string) => `-${v}-`;

    const $t = useMemo<LangDictionary>(() => {
        return recursionProxy<LangDictionary>(dictionary ?? {}, FALLBACK_MESSAGE);
    }, [dictionary]);

    return {
        i18n,
        $t,
    };
};

export default useTranslate;
