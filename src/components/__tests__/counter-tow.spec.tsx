import Counter from "@/counter-tow";
import { render, screen } from "~/../test-utils";
import user from "@testing-library/user-event";
import { vi } from "vitest"; // https://dev.to/mbarzeev/from-jest-to-vitest-migration-and-benchmark-23pl

describe("Counter Tow", () => {
    it("Renders correctly", () => {
        render(<Counter count={0} />);

        const textEl = screen.getByText("Counter Tow");

        expect(textEl).toBeInTheDocument();
    });

    it("Handlers are called", async () => {
        user.setup();

        const onDecrement = vi.fn();
        const onIncrement = vi.fn();

        render(<Counter count={0} onDecrement={onDecrement} onIncrement={onIncrement} />);

        const incBTN = screen.getByRole("button", { name: /increment/i });
        const decBTN = screen.getByRole("button", { name: /decrement/i });

        await user.click(incBTN);
        await user.click(decBTN);

        expect(onIncrement).toHaveBeenCalledTimes(1);
        expect(onDecrement).toHaveBeenCalledTimes(1);
    });
});
