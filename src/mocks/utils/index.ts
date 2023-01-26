import { payloadToUrlString, IUriPayload, payloadToQueryString, payloadToHostString, payloadToOriginString } from "~/modules/fetch";

export enum LOCAL_STORAGE_DEFAULTS {
    KEY = "test key",
    VALUE = "test value",
}

export class LocalStorageMock {
    private store: Map<string, string>;

    constructor() {
        this.store = new Map();

        this.setItem(LOCAL_STORAGE_DEFAULTS.KEY, LOCAL_STORAGE_DEFAULTS.VALUE);
    }

    get length() {
        return this.store.size;
    }

    clear() {
        this.store.clear();
    }

    reset() {
        this.clear();
        this.setItem(LOCAL_STORAGE_DEFAULTS.KEY, LOCAL_STORAGE_DEFAULTS.VALUE);
    }

    getItem(key: string) {
        return this.store.get(key) ?? null;
    }

    setItem(key: string, value: string) {
        this.store.set(key, value);
    }

    removeItem(key: string) {
        return this.store.delete(key);
    }

    key(index: number) {
        let _key = null;

        if (this.length > index) {
            _key = Array.from(this.store.entries())[index]?.[0] ?? null;
        }

        return _key;
    }
}

export const mockTestUrl = (exclude: (keyof IUriPayload)[] = []) => {
    const TEST_PAYLOAD = {
        hash: "hash",
        port: 8000,
        hostname: "www.example.com",
        password: "password",
        username: "username",
        protocol: "https:",
        pathname: "/some/random/path",
        search: { query: true },
        ...exclude.reduce((prev, curr) => ({ ...prev, [curr]: undefined }), {}),
    };

    return {
        TEST_PAYLOAD,
        queryString: payloadToQueryString(TEST_PAYLOAD.search),
        host: payloadToHostString(TEST_PAYLOAD),
        href: payloadToUrlString(TEST_PAYLOAD),
        origin: payloadToOriginString(TEST_PAYLOAD),
    };
};

export { createMemoryRouter as createRouter } from "react-router-dom";
