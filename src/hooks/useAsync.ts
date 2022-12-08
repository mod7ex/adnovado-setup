import { useEffect, useState, useCallback } from "react";
import useToggle from "~/hooks/useToggle";

export default function useAsync<T, Er = unknown>(cb: () => Promise<T>, dependecies: any[] = []) {
    const [pending, toggle] = useToggle(false);
    const [value, setValue] = useState<T | TEmpty>(undefined);
    const [error, setError] = useState<Er | TEmpty>(undefined);

    const cbMemo = useCallback(() => {
        toggle(true);
        setError(undefined);
        setValue(undefined);

        cb()
            .then((v) => {
                setValue(v);
                setError(undefined);
            })
            .catch((v: Er) => {
                if (import.meta.env.DEV) console.error(v);
                setValue(undefined);
                setError(v);
            })
            .finally(() => toggle(false));
    }, dependecies);

    useEffect(cbMemo, [cbMemo]);

    return { pending, value, error } as const;
}
