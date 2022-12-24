import { createContext } from "react";
import { LANGUAGE_CONTEXT_DISPLAY_NAME, DICTIONARY_PARTIAL } from "~/constants";
import { useDictionary, useTranslate, useLanguage } from "~/i18n/hooks";

type LanguageControll = ReturnType<typeof useLanguage>;

type ContextPayload = TRequired<Partial<ReturnType<typeof useTranslate>>, "i18n"> & { language?: LanguageControll[0]; set_language?: LanguageControll[1] };

export const Language = createContext<ContextPayload>({
    i18n: (v: string) => `${v}`,
});

Language.displayName = LANGUAGE_CONTEXT_DISPLAY_NAME;

const LanguageProvider: React.FC<{ children: React.ComponentProps<React.Provider<ContextPayload>>["children"]; partial: DICTIONARY_PARTIAL }> = ({ children, partial }) => {
    const [language, set_language] = useLanguage();

    const dictionary = useDictionary(language, partial);

    const data = useTranslate(dictionary ?? {});

    return <Language.Provider value={{ language, set_language, ...data }}>{children}</Language.Provider>;
};

export default LanguageProvider;
