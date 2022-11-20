export const scheduleTask = (job: Parameters<typeof setTimeout>[0], tm = 0) => {
    // queue Macro Task, you can queue a Micro Task using the api queueMicrotask
    return setTimeout(job, tm);
};
