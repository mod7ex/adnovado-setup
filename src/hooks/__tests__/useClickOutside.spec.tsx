import useClickOutside from "~/hooks/useClickOutside";
import useRawClickOutside from "~/hooks/useClickOutside.raw";
import { vi } from "vitest";
import { render, screen, userEvent as user } from "~/../test-utils";
import { useRef } from "react";

// Example : https://github.com/sandiiarov/use-events/blob/master/__tests__/useClickOutside.test.tsx

describe("useClickOutside", () => {
    const fn = vi.fn();

    const TestComp = ({ condition = true }) => {
        const ref = useRef(null);

        useClickOutside(
            ref,
            (e) => {
                fn(e);
            },
            { condition }
        );

        return (
            <div>
                <div ref={ref}>
                    <h1>header</h1>
                    <p>inside</p>
                </div>
                <p>outside</p>
            </div>
        );
    };

    beforeEach(() => {
        fn.mockClear();
    });

    it("works correctly with a click outside", async () => {
        render(<TestComp />);

        const outside = screen.getByText(/outside/i);

        await user.click(outside);

        expect(fn).toHaveBeenCalledTimes(1);

        expect(fn.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    });

    it("works correctly with a click inside", async () => {
        render(<TestComp />);

        await Promise.all([screen.getByRole("heading"), screen.getByText(/inside/i)].map((v) => user.click(v)));

        expect(fn).not.toBeCalled();
    });

    it("works correctly with a false condition inside", async () => {
        render(<TestComp condition={false} />);

        await Promise.all([screen.getByRole("heading"), screen.getByText(/inside/i), screen.getByText(/outside/i)].map((v) => user.click(v)));

        expect(fn).not.toBeCalled();
    });
});

describe("useRawClickOutside", () => {
    const fn = vi.fn();

    const TestComp = () => {
        const ref = useRef(null);

        useRawClickOutside([ref], (e) => {
            fn(e);
        });

        return (
            <div>
                <div ref={ref}>
                    <h1>header</h1>
                    <p>inside</p>
                </div>
                <p>outside</p>
            </div>
        );
    };

    beforeEach(() => {
        fn.mockClear();
    });

    it("works correctly with a click outside", async () => {
        render(<TestComp />);

        const outside = screen.getByText(/outside/i);

        await user.click(outside);

        expect(fn).toHaveBeenCalledTimes(1);

        expect(fn.mock.calls[0][0]).toBeInstanceOf(MouseEvent);
    });

    it("works correctly with a click inside", async () => {
        render(<TestComp />);

        await Promise.all([screen.getByRole("heading"), screen.getByText(/inside/i)].map((v) => user.click(v)));

        expect(fn).not.toBeCalled();
    });
});
