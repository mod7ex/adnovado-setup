import "@testing-library/jest-dom";

import { server } from "./src/mocks/server";
import { fetch } from "cross-fetch";
/* 
    Polyfilling fetch, fetch will run indifrent environments node, browser ...
    so run `npm install --save-dev cross-fetch`
*/

global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: `error` }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
