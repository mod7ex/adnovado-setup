/* eslint-disable import/export */

import { render } from "@testing-library/react";

const _render = (ui: React.ReactElement, options = {}) =>
    render(ui, {
        // wrap provider(s) here if needed

        wrapper: ({ children }) => children,

        ...options,
    });

export * from "@testing-library/react";

export { default as userEvent } from "@testing-library/user-event";

// override render export

export { _render as render };
