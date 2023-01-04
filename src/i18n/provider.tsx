import { createContext } from "react";
import { useLanguage, LANGUAGE_CONTEXT_DISPLAY_NAME } from "~/i18n";

type ContextPayload = Partial<ReturnType<typeof useLanguage>>;

export const Context = createContext<ContextPayload>({});

Context.displayName = LANGUAGE_CONTEXT_DISPLAY_NAME;

const Provider: React.FC<{ children: React.ComponentProps<React.Provider<ContextPayload>>["children"] }> = ({ children }) => {
    return <Context.Provider value={useLanguage()}>{children}</Context.Provider>;
};

export default Provider;
