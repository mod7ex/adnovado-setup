// import { describe, expect, test } from "vitest";

import App from "./App";

import { render, screen, userEvent } from "../test-utils";

test("the title is visible", () => {
    render(<App />);

    const welcomeText = screen.getByText(/Hello Vite \+ React!/i);

    // screen.debug(welcomeText);

    expect(welcomeText).toBeInTheDocument();
});

// test("should increment count on click", async () => {
//     render(<App />);

//     userEvent.click(screen.getByRole("button"));

//     expect(await screen.findByText(/count is: 1/i)).toBeInTheDocument();
// });
