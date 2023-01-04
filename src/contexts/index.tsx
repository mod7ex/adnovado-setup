import { Provider as LanguageProvider } from "~/i18n";
import { default as RouterProvider } from "~/contexts/router";
// import { default as StoreProvider } from "~/contexts/store";

const Provider = () => {
    return (
        <LanguageProvider>
            <RouterProvider />
        </LanguageProvider>
    );
};

export default Provider;
