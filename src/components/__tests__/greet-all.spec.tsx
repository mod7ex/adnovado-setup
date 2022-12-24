import GreetAll, { type Skills } from "@/greet-all";

import { render, screen, logRoles } from "~/../test-utils";

describe("Greet All", () => {
    const skills = ["HTML", "CSS", "JS"];

    it("Get All by role", () => {
        render(<GreetAll skills={skills} />);

        // screen.debug(inputEl);

        const elementsList = screen.getByRole("list");
        expect(elementsList).toBeInTheDocument();
    });

    it("renders a list of skills", () => {
        render(<GreetAll skills={skills} />);

        const listItems = screen.getAllByRole("listitem");
        expect(listItems).toHaveLength(skills.length);
    });

    it("renders login button and start learning button is not rendered", () => {
        render(<GreetAll skills={skills} />);

        const loginBTN = screen.getByRole("button", { name: "Login" });
        expect(loginBTN).toBeInTheDocument();

        const startLearningBTN = screen.queryByRole("button", { name: /learning/ });
        expect(startLearningBTN).not.toBeInTheDocument();
    });

    it("Start learning button is eventually displayed", async () => {
        const view = render(<GreetAll skills={skills} />);

        logRoles(view.container);

        // screen.debug();

        const startLearningBTN = await screen.findByRole("button", { name: /learning/ }, { timeout: 2000 });
        expect(startLearningBTN).toBeInTheDocument();

        // screen.debug();
    });
});
