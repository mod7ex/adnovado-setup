import { isPlainObject } from "~/utils/types";

type TPayload = SetFallback<ObjectOfNested<string>>;

export function getNestedValue<T extends TPayload>(target: T, keys: string[]): string {
    if (keys.length === 0) return "";

    const [x, ..._keys] = keys;

    const _target = target[x];

    if (isPlainObject(_target)) return getNestedValue(_target, _keys);

    return _target ?? "";
}

export const recursionProxy = <T extends TPayload>(subject: T, fallback = "", fbKey = "_"): T =>
    new Proxy(subject, {
        get(target, key: string & keyof T) {
            const _target = target[key];

            if (isPlainObject(_target)) return recursionProxy(_target, fallback);

            // _ is a default fall back for that level
            return _target ?? target[fbKey] ?? fallback;
        },
    });
