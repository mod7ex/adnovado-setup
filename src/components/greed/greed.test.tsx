import { Greed } from "@/greed";

import { render, screen, userEvent } from "~/../test-utils";

test("Greed renders correctly", () => {
    render(<Greed />);

    const txtElement = screen.getByText("Greed");

    // screen.debug(txtElement);

    expect(txtElement).toBeInTheDocument();
});

test("Greed renders with a name", () => {
    const name = "Mourad";

    render(<Greed name={name} />);

    const txtElement = screen.getByText(`Greed ${name} (:`);

    screen.debug(txtElement);

    expect(txtElement).toBeInTheDocument();
});
