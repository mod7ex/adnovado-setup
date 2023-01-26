import { AppURL } from "~/modules/fetch/utils";
import { mockTestUrl } from "~/mocks/utils";

const { TEST_PAYLOAD, href, host, origin: _origin, queryString } = mockTestUrl();

describe("AppURL class", () => {
    it("works correctly", () => {
        const url = new AppURL(TEST_PAYLOAD);

        Object.entries(TEST_PAYLOAD).forEach(([key, val]) => {
            expect(Reflect.get(url, key)).toBe(val);
        });

        expect(`${url}`).toBe(href);
        expect(url.toString()).toBe(href);
        expect(url.origin).toBe(_origin);
        expect(url.href).toBe(href);
        expect(url.host).toBe(host);
        expect(url.queryString).toBe(queryString);
    });

    it("works in case of undefined hostname", () => {
        const url = new AppURL({
            ...TEST_PAYLOAD,
            hostname: undefined,
        });

        Object.entries(TEST_PAYLOAD).forEach(([key, val]) => {
            if (key === "hostname") {
                expect(url.hostname).toBeUndefined();
            } else expect(Reflect.get(url, key)).toBe(val);
        });

        expect(url.href).toBeUndefined();
        expect(url.host).toBeUndefined();
        expect(url.origin).toBeUndefined();
        expect(`${url}`).toBe(`undefined`);
        expect(url.toString()).toBe(``);
    });
});
