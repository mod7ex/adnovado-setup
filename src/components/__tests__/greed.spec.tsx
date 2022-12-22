import Greet from "~/components/greet";

import { render, screen } from "~/../test-utils";

describe("Greet", () => {
    it("Get By role", () => {
        render(<Greet />);

        // screen.debug(inputEl);

        const inputEl = screen.getByRole("textbox", { name: "Name" });
        expect(inputEl).toBeInTheDocument();

        const dropDown = screen.getByRole("combobox");
        expect(dropDown).toBeInTheDocument();

        const checkbox = screen.getByRole("checkbox");
        expect(checkbox).toBeInTheDocument();

        const button = screen.getByRole("button");
        expect(button).toBeInTheDocument();

        const bioEl = screen.getByRole("textbox", { name: "Bio", exact: false });
        expect(bioEl).toBeInTheDocument();

        const pageHeading = screen.getByRole("heading", { level: 1 });
        expect(pageHeading).toBeInTheDocument();

        const sectionHeading = screen.getByRole("heading", { level: 2 });
        expect(sectionHeading).toBeInTheDocument();
    });

    it("Get by label text", () => {
        render(<Greet />);

        const nameEl = screen.getByLabelText("Name", { selector: "input" });
        expect(nameEl).toBeInTheDocument();

        const termsEl = screen.getByLabelText(/agree/);
        expect(termsEl).toBeInTheDocument();
    });

    it("Get by label placeholder text", () => {
        render(<Greet />);

        const nameEl = screen.getByPlaceholderText("full name", { exact: false });
        expect(nameEl).toBeInTheDocument();
    });

    it("Get by text", () => {
        render(<Greet />);

        const nameEl = screen.getByText("All fields are mandatory");
        expect(nameEl).toBeInTheDocument();
    });

    it("Get by display value", () => {
        render(<Greet />);

        const nameEl = screen.getByDisplayValue((v) => v.startsWith("Mour"));
        expect(nameEl).toBeInTheDocument();
    });

    it("Get by alt text", () => {
        render(<Greet />);

        const nameEl = screen.getByAltText("some alt");
        expect(nameEl).toBeInTheDocument();
    });

    it("Get by title", () => {
        render(<Greet />);

        const closeEl = screen.getByTitle("close");
        expect(closeEl).toBeInTheDocument();
    });

    it("Get by test id", () => {
        render(<Greet />);

        const customEl = screen.getByTestId("custom-el");
        expect(customEl).toBeInTheDocument();
    });
});
