import { MODE } from "~/constants";

const log = console.log;
const warn = console.warn;
const error = console.error;

type LogArgs = Parameters<typeof log>;
type WarnArgs = Parameters<typeof warn>;
type ErrorArgs = Parameters<typeof error>;

class Logger {
    private instance: Logger | null = null;

    constructor() {
        if (!this.instance) this.instance = this;

        return this.instance;
    }

    log(...args: LogArgs) {
        log(...args);
    }

    test_log(...args: LogArgs) {
        if (MODE.TEST) this.log(...args);
    }

    dev_log(...args: LogArgs) {
        if (MODE.DEV) this.log(...args);
    }

    strict_dev_log(...args: LogArgs) {
        if (MODE.STRICT_DEV) this.log(...args);
    }

    prod_log(...args: LogArgs) {
        if (MODE.PROD) this.log(...args);
    }

    error(...args: ErrorArgs) {
        error(...args);
    }

    warn(...args: WarnArgs) {
        warn(...args);
    }
}

export default new Logger();
