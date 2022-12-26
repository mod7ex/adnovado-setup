import { useState, useDeferredValue, useEffect } from "react";
import { isFunction } from "~/utils/types";

function getStoredValue<T>(key: string, initialValue: ValueOrGenerator<T>) {
    const savedValue = localStorage.getItem(key);
    if (savedValue) return JSON.parse(savedValue) as T;
    return (isFunction(initialValue) ? initialValue() : initialValue) as T;
}

export default function useLocalStorage<T>(key: string, _default_value: ValueOrGenerator<T>) {
    const [value, setValue] = useState(() => getStoredValue(key, _default_value));

    const deferredValue = useDeferredValue(value);

    useEffect(() => {
        if (deferredValue == null) return localStorage.removeItem(key);
        localStorage.setItem(key, JSON.stringify(deferredValue));

        if (import.meta.env.DEV) console.log("saved in local storage");
    }, [deferredValue]);

    return [value, setValue] as const;
}
