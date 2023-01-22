import { useState, useDeferredValue, useEffect } from "react";
import { isFunction } from "~/utils/types";
import { logger } from "~/modules";

function getStoredValue<T>(key: string, initialValue: ValueOrGenerator<T>) {
    const savedValue = localStorage.getItem(key);
    if (savedValue != null) {
        try {
            return JSON.parse(savedValue) as T;
        } catch {
            return savedValue as T;
        }
    }
    return (isFunction(initialValue) ? initialValue() : initialValue) as T;
}

export default function useLocalStorage<T>(key: string, _default_value: ValueOrGenerator<T>) {
    const [value, setValue] = useState(() => getStoredValue(key, _default_value));

    const deferredValue = useDeferredValue(value);

    useEffect(() => {
        if (deferredValue == null) return localStorage.removeItem(key);

        localStorage.setItem(key, JSON.stringify(deferredValue));

        logger.strict_dev_log("saved in local storage");
    }, [deferredValue]);

    return [value, setValue] as const;
}
