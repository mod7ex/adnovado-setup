import App from "@/context";
import { render, screen } from "~/../test-utils";
import user from "@testing-library/user-event";

describe("Testing components wrapped in a context", () => {
    it("renders text correctly", async () => {
        render(<App />);

        const heading = screen.getByRole("heading");

        expect(heading).toHaveTextContent("theme light");

        const btn = screen.getByRole("button");

        await user.click(btn);

        expect(heading).toHaveTextContent("theme dark");
    });
});
