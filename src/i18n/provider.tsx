import { createContext, useCallback, useState } from "react";
import { $language, type SUPPORTED_LANGUAGES } from "~/i18n";
import { LANGUAGE_CONTEXT_DISPLAY_NAME } from "~/i18n";

type ContextPayload = Partial<{ language: SUPPORTED_LANGUAGES; set_language: (language: SUPPORTED_LANGUAGES) => void }>;

export const Context = createContext<ContextPayload>({});

Context.displayName = LANGUAGE_CONTEXT_DISPLAY_NAME;

const Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, _set] = useState($language.get());

    const set_language = useCallback((language: SUPPORTED_LANGUAGES) => {
        _set(language);
        $language.set(language);
    }, []);

    return <Context.Provider value={{ language, set_language }}>{children}</Context.Provider>;
};

export default Provider;
