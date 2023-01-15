import "@testing-library/jest-dom";
import { server } from "./src/mocks/server";
import { LocalStorageMock } from "./src/mocks/utils";
import { fetch } from "cross-fetch";

/* 
    Poly-filling fetch, fetch will run indifferent environments node, browser ...
    so run `npm install --save-dev cross-fetch`
*/

global.fetch = fetch;
global.localStorage = new LocalStorageMock();

beforeAll(() => {
    localStorage.reset();
    server.listen({ onUnhandledRequest: `error` });
});

afterEach(() => {
    localStorage.reset();
    server.resetHandlers();
});

afterAll(() => server.close());
