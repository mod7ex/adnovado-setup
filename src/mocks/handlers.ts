import { rest } from "msw";

export const users = [
    { id: 0, name: "Mourad" },
    { id: 1, name: "Brian Tracy" },
    { id: 2, name: "Jeff besoss" },
];

export const handlers = [
    rest.get("https://jsonplaceholder.typicode.com/users", (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(users));
    }),
];
