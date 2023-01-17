import "@testing-library/jest-dom";
import { server } from "./src/mocks/server";
import { LocalStorageMock } from "./src/mocks/utils";
import { fetch } from "cross-fetch";
import { $language } from "./src/i18n/utils";

/* 
    Poly-filling fetch, fetch will run indifferent environments node, browser ...
    so run `npm install --save-dev cross-fetch`
*/

global.fetch = fetch;
global.localStorage = new LocalStorageMock();

beforeAll(() => {
    localStorage.reset();
    $language.reset();
    server.listen({ onUnhandledRequest: `error` });
});

afterEach(() => {
    server.resetHandlers();
});

afterAll(() => {
    localStorage.reset();
    server.close();
});
