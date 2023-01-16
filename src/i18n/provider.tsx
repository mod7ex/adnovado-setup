import { createContext, useCallback, useState } from "react";
import { $language, type SUPPORTED_LANGUAGES, LANGUAGE_CONTEXT_DISPLAY_NAME } from "~/i18n";

type ContextPayload = { language?: SUPPORTED_LANGUAGES; set_language?: (lang: SUPPORTED_LANGUAGES) => void };

export const Context = createContext<ContextPayload>({});

Context.displayName = LANGUAGE_CONTEXT_DISPLAY_NAME;

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, _set] = useState($language.get());

    const set_language = useCallback((language: SUPPORTED_LANGUAGES) => {
        try {
            $language.set(language);
        } finally {
            _set(language);
        }
    }, []);

    return <Context.Provider value={{ language, set_language }}>{children}</Context.Provider>;
};

export default Provider;
