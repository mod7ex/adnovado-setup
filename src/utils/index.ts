export const scheduleTask = (job: Parameters<typeof setTimeout>[0], tm = 0) => {
    // queue Macro Task, you can queue a Micro Task using the api queueMicrotask
    return setTimeout(job, tm);
};

export const trimChar = (payload: string, target: string): string => {
    if (!payload) return payload;

    if (payload.startsWith(target)) return trimChar(payload.slice(1, payload.length), target);

    if (payload.endsWith(target)) return trimChar(payload.slice(0, payload.length - 1), target);

    return payload;
};

export type ApiPayload = Record<Numberish, Numberish | boolean>;

export const app_join = (payload: string[], separator = "/") => {
    return payload
        .filter((v) => !!v)
        .map((v) => trimChar(v, "/"))
        .join(separator);
};

export const replaceParams = (_path: string, params: ApiPayload) => {
    Object.entries(params).forEach(([key, val]) => {
        _path = _path.replace(`:${key}`, val.toString());
    });

    return _path;
};

export const queryToString = (payload: ApiPayload) => {
    // @ts-ignore
    return new URLSearchParams(payload ?? undefined).toString();
};

// --------------------------------------------------------

export const fail = <T extends string>(msg: T) => {
    throw Error(msg);
};

export const sleep = <T>(time: number = 1000, resolve_to?: T) => {
    return new Promise<T>((resolve) => {
        const _resolve = resolve_to === undefined ? resolve : () => resolve(resolve_to);

        // @ts-ignore
        scheduleTask(_resolve, time);
    });
};

export const timeOut = () => {
    let t: NodeJS.Timeout | undefined;

    const set = (fn: Parameters<typeof setTimeout>[0], time = 0) => {
        t = setTimeout(fn, time);
    };

    const clear = () => {
        if (t == null) {
            clearTimeout(t);
            t = undefined;
        }
    };

    const reset = (fn: Parameters<typeof setTimeout>[0], time = 0) => {
        clear();
        set(fn, time);
    };

    return { set, clear, reset };
};

export const trace = () => {
    let _pst = Error.prepareStackTrace;

    let _caller_file = "";
    try {
        const err = new Error();
        let currentfile;

        Error.prepareStackTrace = (_, stack) => stack;

        // @ts-ignore
        currentfile = err.stack.shift().getFileName();

        // @ts-ignore
        while (err.stack.length) {
            // @ts-ignore
            _caller_file = err.stack.shift().getFileName();

            if (currentfile !== _caller_file) break;
        }
    } finally {
        Error.prepareStackTrace = _pst;

        return _caller_file;
    }
};

type Payload = { fn: (...args: any[]) => any; count: number; delay: number };

export const retry = ({ fn, count, delay }: Payload) => {
    let current = 0;

    return async () => {
        while (true) {
            try {
                fn();
                break;
            } catch (error: any) {
                current++;

                if (current > count) {
                    console.log("Retry maximum reached. Exiting");
                    break;
                }
            }

            if (delay != null) await sleep(delay);
        }
    };
};

export { close, open } from "~/utils/full-screen";
export * from "~/utils/types";
