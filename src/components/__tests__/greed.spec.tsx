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

        const bioEl = screen.getByRole("textbox", { name: "Bio" });
        expect(bioEl).toBeInTheDocument();

        const pageHeading = screen.getByRole("heading", { level: 1 });
        expect(pageHeading).toBeInTheDocument();

        const sectionHeading = screen.getByRole("heading", { level: 2 });
        expect(sectionHeading).toBeInTheDocument();
    });

    it("Get by label text", () => {
        render(<Greet />);

        const el = screen.getByLabelText("Name", { selector: "input" });
        expect(el).toBeInTheDocument();

        const termsEl = screen.getByLabelText(/agree/);
        expect(termsEl).toBeInTheDocument();
    });

    it("Get by label placeholder text", () => {
        render(<Greet />);

        const el = screen.getByPlaceholderText("full name", { exact: false });
        expect(el).toBeInTheDocument();
    });

    it("Get by text", () => {
        render(<Greet />);

        const el = screen.getByText("All fields are mandatory");
        expect(el).toBeInTheDocument();
    });

    it("Get by display value", () => {
        render(<Greet />);

        const el = screen.getByDisplayValue((v) => v.startsWith("Mour"));
        expect(el).toBeInTheDocument();
    });

    it("Get by alt text", () => {
        render(<Greet />);

        const el = screen.getByAltText("some alt");
        expect(el).toBeInTheDocument();
    });

    it("Get by title", () => {
        render(<Greet />);

        const el = screen.getByTitle(/close/);
        expect(el).toBeInTheDocument();
    });

    it("Get by test id", () => {
        render(<Greet />);

        const el = screen.getByTestId("custom-el");
        expect(el).toBeInTheDocument();
    });
});
