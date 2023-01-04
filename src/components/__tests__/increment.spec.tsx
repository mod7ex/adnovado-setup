import Increment from "@/increment";
import { render, screen } from "~/../test-utils";
import user from "@testing-library/user-event";

it("renders correctly", () => {
    render(<Increment />);

    const heading = screen.getByRole("heading");
    expect(heading).toBeInTheDocument();

    const btn = screen.getByRole("button", { name: /increment/i });
    expect(btn).toBeInTheDocument();
});

it("renders a count of 0", () => {
    render(<Increment />);

    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent("0");
});

it("renders a count of 1 after clicking the increment button", async () => {
    user.setup();

    render(<Increment />);

    const btn = screen.getByRole("button", { name: /increment/i });

    await user.click(btn);

    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent("1");
});

it("renders a count of 2 after clicking the increment button twice", async () => {
    user.setup();

    render(<Increment />);

    const btn = screen.getByRole("button", { name: /increment/i });

    await user.dblClick(btn);
    // await user.click(btn);

    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent("2");
});

it("renders a count of 10 after clicking the set button", async () => {
    user.setup();

    render(<Increment />);

    const amountInput = screen.getByRole("spinbutton");

    await user.type(amountInput, "10");

    expect(amountInput).toHaveValue(10);

    const btn = screen.getByRole("button", { name: /set/i });

    await user.click(btn);

    const heading = screen.getByRole("heading");

    expect(heading).toHaveTextContent("10");
});

it("focus order", async () => {
    user.setup();

    render(<Increment />);

    const amountInput = screen.getByRole("spinbutton");
    const setBtn = screen.getByRole("button", { name: /set/i });
    const incrementBtn = screen.getByRole("button", { name: /increment/i });

    await user.tab();

    expect(incrementBtn).toHaveFocus();

    await user.tab();

    expect(amountInput).toHaveFocus();

    await user.tab();

    expect(setBtn).toHaveFocus();
});

const TextArea: React.FC<{ defaultValue: string }> = ({ defaultValue }) => {
    return (
        <div>
            <textarea name="" id="" cols={30} rows={10} defaultValue={defaultValue}></textarea>
        </div>
    );
};

it("text area", async () => {
    user.setup();

    const _text = "some text";

    render(<TextArea defaultValue={_text} />);

    const textAreaEl = screen.getByRole("textbox");
    // const textAreaEl = screen.getByText(_text);

    expect(textAreaEl).toHaveTextContent(_text);

    await user.click(textAreaEl, { skipHover: true });

    expect(textAreaEl).toHaveFocus();

    await user.keyboard("{Control>}A{/Control} ");
    expect(textAreaEl).toHaveValue(" ");

    /*
    await user.clear(textAreaEl);
    expect(textAreaEl).toHaveValue("");
    */
});
