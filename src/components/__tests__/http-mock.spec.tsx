import Users from "@/http-mock";
import { render, screen } from "~/../test-utils";
import { users } from "~/mocks/handlers";
import { server } from "~/mocks/server";
import { rest } from "msw";

// https://testing-library.com/docs/react-testing-library/example-intro/#mock

describe("Users", () => {
    test("renders correctly", async () => {
        render(<Users />);

        const textEl = await screen.findByText("Users");
        expect(textEl).toBeInTheDocument();
    });

    test("renders a list of users", async () => {
        render(<Users />);

        const usersList = await screen.findAllByRole("listitem");

        expect(usersList).toHaveLength(users.length);
    });

    test("error message appears when errors occur", async () => {
        server.use(
            // override the initial "GET /greeting" request handler
            // to return a 500 Server Error
            rest.get("https://jsonplaceholder.typicode.com/users", (_, res, ctx) => res(ctx.status(500)))
        );

        render(<Users />);

        const errorEl = await screen.findByText(/went wrong/i);

        expect(errorEl).toBeInTheDocument();
    });
});
