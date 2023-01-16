/* eslint-disable import/export */

import { type ReactElement } from "react";
import { render, type RenderOptions, renderHook, type RenderHookOptions, type Queries, queries } from "@testing-library/react";
import { ThemeProvider } from "@/context";
import { Provider as LanguageProvider } from "~/i18n";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider>
            <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
    );
};

const _render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => render(ui, { wrapper: Providers, ...options });

// prettier-ignore
const _renderHook = 
    <
        Result,
        Props,
        Q extends Queries = typeof queries,
        Container extends Element | DocumentFragment = HTMLElement,
        BaseElement extends Element | DocumentFragment = Container,
    >(
        hook: (initialProps: Props) => Result,
        options?: Omit<RenderHookOptions<Props, Q, Container, BaseElement>, 'wrapper'>
    ) => renderHook(hook, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { _render as render }; // override the render function
export { _renderHook as renderHook }; // override the _renderHook function
export { default as userEvent } from "@testing-library/user-event";
