import { useCallback, useState, type DependencyList } from "react";
import { $language, type SUPPORTED_LANGUAGES } from "~/i18n";

const useLanguage = (dependencies: DependencyList = []) => {
    const [language, _set] = useState($language.get());

    const set_language = useCallback((language: SUPPORTED_LANGUAGES) => {
        _set(language);
        $language.set(language);
    }, dependencies);

    return { language, set_language };
};

export default useLanguage;
