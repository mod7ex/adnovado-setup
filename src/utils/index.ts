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

export { close, open } from "~/utils/full-screen";
