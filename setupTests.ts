import "@testing-library/jest-dom";

// src/setupTests.js
// import { server } from "~/mocks/server";
import { server } from "./src/mocks/server";
// Establish API mocking before all tests.
beforeAll(() => {
    console.log("start --------------------------------------------------------------------------");
    server.listen();
});

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => {
    console.log("end --------------------------------------------------------------------------");
    server.close();
});
