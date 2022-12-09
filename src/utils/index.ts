export const scheduleTask = (job: Parameters<typeof setTimeout>[0], tm = 0) => {
    // queue Macro Task, you can queue a Micro Task using the api queueMicrotask
    return setTimeout(job, tm);
};

export const catchErr = (fn: Tfunction, catcher: (e: unknown) => any) => {
    try {
        return fn();
    } catch (e: unknown) {
        return catcher(e);
    }
};

export const trimChar = (payload: string, target: string): string => {
    if (!payload) return payload;

    if (payload.startsWith(target)) {
        return trimChar(payload.slice(1, payload.length), target);
    }

    if (payload.endsWith(target)) {
        return trimChar(payload.slice(0, payload.length - 1), target);
    }

    return payload;
};

export const app_join = (payload: string[]) => {
    return payload
        .filter((v) => !!v)
        .map((v) => trimChar(v, "/"))
        .join("/");
};

export { close, open } from "~/utils/full-screen";
