import Button from "@/button";
import { random_items_from_array } from "~/utils/testing";
import { render, screen } from "~/../test-utils";

describe("Button", () => {
    const label = "Click";

    it("renders correctly", () => {
        render(<Button label={label} />);

        const button = screen.getByRole("button");

        expect(button).toBeInTheDocument();

        expect(button).toHaveTextContent(label);

        expect(button).toContainHTML(`<p>${label}</p>`);
    });

    it("renders correctly with left and right props", () => {
        render(
            <Button left={<p>left</p>} right={<p>right</p>}>
                {label}
            </Button>
        );

        const button = screen.getByRole("button");

        expect(button).toContainHTML(`<p>left</p>${label}<p>right</p>`);
    });

    it("correctly disabled", () => {
        render(<Button label={label} disabled />);

        const button = screen.getByRole("button");

        expect(button).toBeDisabled();
    });

    it("correctly uses classes", () => {
        const SIZES = ["primary", "success", "danger", "link"];

        const TYPES = ["small", "large"];

        const _CLASSES = [...SIZES, ...TYPES];

        const _active_classes = [random_items_from_array(SIZES), random_items_from_array(TYPES)].flat();

        const CLASSES = _CLASSES.reduce((prev, curr) => ({ ...prev, [curr]: curr }), { root: "root" });

        const active_classes = { [_active_classes[0]]: true, [_active_classes[1]]: true };

        render(<Button label={label} classes={CLASSES} {...active_classes} />);

        const button = screen.getByRole("button");

        expect(button).toHaveClass("root", ..._active_classes);

        screen.debug();
    });
});
