import { createContext } from "react";
import { LANGUAGE_CONTEXT_DISPLAY_NAME, DICTIONARY_PARTIAL } from "~/constants";
import { useDictionary, useTranslate, useLanguage } from "~/i18n/hooks";

type TranslationHook = TRequired<Partial<ReturnType<typeof useTranslate>>, "i18n">;

export const Language = createContext<TranslationHook>({
    i18n: (v: string) => `${v}`,
});

Language.displayName = LANGUAGE_CONTEXT_DISPLAY_NAME;

const LanguageProvider: React.FC<{ children: React.ReactNode; partial: DICTIONARY_PARTIAL }> = ({ children, partial }) => {
    const [language] = useLanguage();

    const dictionary = useDictionary(language, partial);

    const data = useTranslate(dictionary ?? {});

    return <Language.Provider value={data}>{children}</Language.Provider>;
};

export default LanguageProvider;
