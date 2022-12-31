import { type DependencyList, useState, useCallback } from "react";

// export type AsyncState<T> =
//     | {
//           loading: boolean;
//           error?: undefined;
//           value?: undefined;
//       }
//     | {
//           loading: true;
//           error?: Error | undefined;
//           value?: T;
//       }
//     | {
//           loading: false;
//           error: Error;
//           value?: undefined;
//       }
//     | {
//           loading: false;
//           error?: undefined;
//           value: T;
//       };

type AsyncState<T> = {
    loading: boolean;
    error?: Error;
    value?: T;
};

type StateFromAsyncFunction<T extends AsyncFunction> = AsyncState<PromiseType<ReturnType<T>>>;

const useAsyncFn = <T extends AsyncFunction>(fn: T, deps: DependencyList = [], initialState: StateFromAsyncFunction<T> = { loading: false }) => {
    const [state, set] = useState<AsyncState<T>>(initialState);

    const _fn = useCallback((...args: Parameters<T>): ReturnType<T> => {
        if (!state.loading) set((v) => ({ ...v, loading: true }));

        return fn(...args)
            .then((value) => {
                set({ value, loading: false });

                return value;
            })
            .catch((error) => {
                set({ error, loading: false });

                return error;
            }) as ReturnType<T>;
    }, deps);

    return [state, _fn] as const;
};

export default useAsyncFn;
