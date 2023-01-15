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

export { createMemoryRouter as createRouter } from "react-router-dom";
