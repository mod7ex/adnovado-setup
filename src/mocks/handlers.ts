import { rest } from "msw";
import i18nHandler from "~/mocks/i18n";

export const users = [
    { id: 0, name: "Mourad" },
    { id: 1, name: "Brian Tracy" },
    { id: 2, name: "Jeff bez" },
];

export const handlers = [
    rest.get("https://jsonplaceholder.typicode.com/users", (_, res, ctx) => {
        return res(ctx.status(200), ctx.json(users));
    }),
    i18nHandler,
];
