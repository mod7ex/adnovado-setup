import Form, { TEST_ID } from "@/form";
import { render, screen, userEvent as user } from "~/../test-utils";
import { createRouter } from "~/mocks/utils";
import { RouterProvider } from "react-router-dom";
import { vi } from "vitest";

// https://reactrouter.com/en/6.6.1/routers/picking-a-router#testing

// type Router = React.ComponentProps<typeof RouterProvider>["router"];

const simulate = (element: JSX.Element) => {
    const router = createRouter([
        {
            path: "/",
            element,
        },
    ]);

    return <RouterProvider router={router} />;
};

describe("Form", () => {
    const fn = vi.fn();

    beforeEach(() => {
        fn.mockClear();
    });

    it("renders correctly with defaults", () => {
        const Provider = simulate(<Form />);

        render(Provider);

        const form = screen.getByRole("form");
        const form_children = screen.getAllByTestId(TEST_ID);
        const fieldset = screen.getByRole("group");
        const submit = screen.getByRole("button", { name: /submit/i });

        expect(form).toBeInTheDocument();
        expect(form_children).toHaveLength(1);
        expect(form).toContainElement(form_children[0]);
        expect(fieldset).toBe(form_children[0]);
        expect(fieldset).toContainElement(submit);
        expect(submit).toContainHTML("<p>Submit</p>");
    });

    it("renders correctly with props", async () => {
        const header = "Form title";
        const footer = "Form footer";

        const Provider = simulate(
            <Form header={header} footer={<p>{footer}</p>} cta="Click" onSubmit={fn}>
                <label htmlFor="field">
                    <span>Field</span>
                    <input type="text" id="field" name="field" />
                </label>
            </Form>
        );

        render(Provider);

        const form = screen.getByRole("form");
        const form_children = screen.getAllByTestId(TEST_ID);
        const fieldset = screen.getByRole("group");
        const headerEl = screen.getByText(header, { selector: "p" });
        const footerEl = screen.getByText(footer, { selector: "p" });
        const submit = screen.getByRole("button", { name: /click/i });

        expect(fieldset).toContainElement(screen.getByLabelText(/field/i));

        expect(form).toBeInTheDocument();
        form_children.forEach((item) => expect(form).toContainElement(item));
        expect(form_children).toHaveLength(3);
        expect(fieldset).toContainElement(submit);
        expect(form_children[0]).toContainElement(headerEl);
        expect(form_children[1]).toBe(fieldset);
        expect(form_children[2]).toContainElement(footerEl);
        expect(submit).toContainHTML("<p>Click</p>");

        await user.click(submit);

        expect(fn).toHaveBeenCalledTimes(1);
    });

    it("can be disabled", async () => {
        const Provider = simulate(<Form disabled onSubmit={fn} />);

        render(Provider);

        const fieldset = screen.getByRole("group");
        const submit = screen.getByRole("button");

        expect(fieldset).toBeDisabled();

        await user.click(submit);

        expect(fn).not.toBeCalled();
    });
});
