const log = console.log;
const warn = console.warn;
const error = console.error;

const IS_TEST_MODE = import.meta.env.TEST_MODE === "true";
const IS_PROD_MODE = import.meta.env.PROD;
const IS_DEV_MODE = import.meta.env.DEV;
const IS_STRICT_DEV_MODE = IS_DEV_MODE && !IS_TEST_MODE;

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
        if (IS_TEST_MODE) this.log(...args);
    }

    dev_log(...args: LogArgs) {
        if (IS_DEV_MODE) this.log(...args);
    }

    strict_dev_log(...args: LogArgs) {
        if (IS_STRICT_DEV_MODE) this.log(...args);
    }

    prod_log(...args: LogArgs) {
        if (IS_PROD_MODE) this.log(...args);
    }

    error(...args: ErrorArgs) {
        error(...args);
    }

    warn(...args: WarnArgs) {
        warn(...args);
    }
}

export default new Logger();
