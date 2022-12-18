import { useState, useEffect } from "react";
import { load, type LangDictionary } from "~/i18n/utils";
import { SUPPORTED_LANGS, DICTIONARY_PARTIAL } from "~/constants";

const useDictionary = <T extends LangDictionary>(language: SUPPORTED_LANGS, partial: DICTIONARY_PARTIAL) => {
    const [payload, setPayload] = useState<T | undefined>();

    useEffect(() => {
        load<T>(language, partial).then((v) => {
            v && setPayload(v);
        });
    }, [language]);

    return payload;
};

export default useDictionary;
