export const MODE = {
    TEST: import.meta.env.TEST_MODE === "true",
    PROD: import.meta.env.PROD,
    DEV: import.meta.env.DEV,
    STRICT_DEV: import.meta.env.DEV && !(import.meta.env.TEST_MODE === "true"),
};
