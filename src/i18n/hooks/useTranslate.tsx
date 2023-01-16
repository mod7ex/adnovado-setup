import { useCallback, useEffect, useMemo, useState, type DependencyList } from "react";
import { getNestedValue, recursionProxy, type NAMESPACE_PAYLOAD, DICTIONARY_NAMESPACES, $dictionary, useLanguage } from "~/i18n";
import { isFunction } from "~/utils";

export const FALLBACK_MESSAGE = "______NOT_TRANSLATED______";

type NS = DICTIONARY_NAMESPACES | ((payload: Record<keyof typeof DICTIONARY_NAMESPACES, DICTIONARY_NAMESPACES>) => DICTIONARY_NAMESPACES);

const useTranslate = (name_space: NS, dependencies: DependencyList = []) => {
    const { language } = useLanguage();

    const _namespace = useMemo(() => {
        if (isFunction(name_space)) {
            return name_space(DICTIONARY_NAMESPACES) as DICTIONARY_NAMESPACES;
        }

        return name_space;
    }, [name_space]);

    const [namespace_payload, set] = useState($dictionary.get(_namespace));

    useEffect(() => {
        $dictionary.load(_namespace).then((v) => set(v));
    }, [_namespace, language, ...dependencies]);

    const i18n = useCallback(
        (dictionary_path: string, fallback = "_") => {
            if (!namespace_payload) return fallback;

            const _translation = getNestedValue(namespace_payload, dictionary_path.split("."));

            // console.log(`[${dictionary_path}] :${_translation}, [NS]: ${namespace_payload}`);

            return _translation || fallback;
        },
        [namespace_payload]
    );

    const $t = useCallback((v: (proxied_payload: any) => any) => `${v(recursionProxy<NAMESPACE_PAYLOAD>(namespace_payload ?? {}, FALLBACK_MESSAGE))}`, [namespace_payload]);

    return {
        i18n,
        $t,
    };
};

export default useTranslate;
