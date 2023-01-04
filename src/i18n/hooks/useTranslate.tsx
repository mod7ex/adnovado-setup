import { useCallback, useContext, useEffect, useMemo, useState, type DependencyList } from "react";
import { getNestedValue, recursionProxy, type NAMESPACE_PAYLOAD, type DICTIONARY_NAMESPACES, $dictionary, Context } from "~/i18n";

const FALLBACK_MESSAGE = "______NOT_TRANSLATED______";

const useTranslate = (name_space: DICTIONARY_NAMESPACES, dependencies: DependencyList = []) => {
    const { language } = useContext(Context);

    const [namespace_payload, set] = useState($dictionary.get(name_space));

    console.log(namespace_payload);

    useEffect(() => {
        $dictionary.load(name_space).then((v) => set(v));
    }, [name_space, language, ...dependencies]);

    const i18n = useCallback(
        (dictionary_path: string, fallback: string = "_") => {
            if (!namespace_payload) return fallback;

            const _translation = getNestedValue(namespace_payload, dictionary_path.split("."));

            console.log(_translation);

            return _translation || fallback;
        },
        [namespace_payload]
    );

    const $t = useMemo<any>(() => {
        return recursionProxy<NAMESPACE_PAYLOAD>(namespace_payload ?? {}, FALLBACK_MESSAGE);
    }, [namespace_payload]);

    return {
        i18n,
        $t,
    };
};

export default useTranslate;
