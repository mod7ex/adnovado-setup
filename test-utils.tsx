/* eslint-disable import/export */

import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "@/context";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <ThemeProvider>{children}</ThemeProvider>;
};

const _render = (ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) => render(ui, { wrapper: Providers, ...options });

export * from "@testing-library/react";
export { _render as render }; // override the render function
export { default as userEvent } from "@testing-library/user-event";
