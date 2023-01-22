import { AppURL, IUriPayload } from "~/modules/fetch/utils";

const toSearchString = (v: IUriPayload["search"]) => {
    // @ts-ignore
    if (v) return `?${new URLSearchParams(v ?? undefined).toString()}`;
    return "";
};

const hash = "hash";
const port = 8000;
const hostname = "www.example.com";
const password = "password";
const username = "username";
const protocol = "https";
const pathname = "/some/path";
const search = { query: true };

const host = `${hostname}:${port}`;
const href = `${protocol}://${username}:${password}@${hostname}:${port}${pathname}${toSearchString(search)}#${hash}`;
const origin = `${protocol}://${hostname}:${port}`;

const TEST_PAYLOAD = {
    hash,
    hostname,
    port,
    password,
    username,
    protocol,
    pathname,
    search,
};

describe("AppURL class", () => {
    it("works correctly", () => {
        const url = new AppURL(TEST_PAYLOAD);

        Object.entries(TEST_PAYLOAD).forEach(([key, val]) => {
            expect(Reflect.get(url, key)).toBe(val);
        });

        expect(`${url}`).toBe(href);
        expect(url.toString()).toBe(href);
        expect(url.origin).toBe(origin);
        expect(url.href).toBe(href);
        expect(url.host).toBe(host);
    });

    it("works in case of undefined hostname", () => {
        const url = new AppURL({
            ...TEST_PAYLOAD,
            hostname: undefined,
        });

        Object.entries(TEST_PAYLOAD).forEach(([key, val]) => {
            if (key === "hostname") {
                expect(url.hostname).toBeUndefined();
            } else if (key === "host") {
                expect(url.host).toBeUndefined();
            } else expect(Reflect.get(url, key)).toBe(val);
        });

        expect(`${url}`).toBe(`undefined`);
        expect(url.toString()).toBe(``);
        expect(url.href).toBeUndefined();
    });
});
