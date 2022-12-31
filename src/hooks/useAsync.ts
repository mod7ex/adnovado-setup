import { useEffect, useState, useCallback, type DependencyList } from "react";
import useToggle from "~/hooks/useToggle";
import { logger } from "~/utils";

export default function useAsync<T, Er = unknown>(fn: () => Promise<T>, dependecies: DependencyList = []) {
    const [pending, toggle] = useToggle(false);
    const [value, setValue] = useState<T | TEmpty>(undefined);
    const [error, setError] = useState<Er | TEmpty>(undefined);

    const cbMemo = useCallback(() => {
        toggle(true);
        setError(undefined);
        setValue(undefined);

        fn()
            .then((v) => {
                setValue(v);
                setError(undefined);
            })
            .catch((v: Er) => {
                logger.strict_dev_log(v);
                setValue(undefined);
                setError(v);
            })
            .finally(() => toggle(false));
    }, dependecies);

    useEffect(cbMemo, [cbMemo]);

    return { pending, value, error } as const;
}
