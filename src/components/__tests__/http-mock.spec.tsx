import Users from "@/http-mock";
import { render, screen } from "~/../test-utils";
import { users } from "~/mocks/handlers";

describe("Users", () => {
    test("renders correctly", async () => {
        render(<Users />);

        const textEl = await screen.findByText("Users");
        expect(textEl).toBeInTheDocument();
    });

    test("renders a list of users", async () => {
        render(<Users />);

        const usersList = await screen.findAllByRole("listitem");

        screen.debug();

        expect(usersList).toHaveLength(users.length);
    });
});
