import { createContext } from "react";
import { LANGUAGE_CONTEXT_DISPLAY_NAME } from "~/constants";
import useTranslate from "~/i18n/hooks";

type TranslationHook = TRequired<Partial<ReturnType<typeof useTranslate>>, "i18n">;

export const Language = createContext<TranslationHook>({
    i18n: (v: string) => `${v}`,
});

Language.displayName = LANGUAGE_CONTEXT_DISPLAY_NAME;

const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const data = useTranslate();

    return <Language.Provider value={data}>{children}</Language.Provider>;
};

export default LanguageProvider;
