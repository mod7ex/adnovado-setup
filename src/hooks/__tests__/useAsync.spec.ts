import useAsync from "~/hooks/useAsync";
import { vi } from "vitest";
import { timeOut } from "~/utils";
import { renderHook, waitFor } from "~/../test-utils";

// https://github.com/testing-library/react-hooks-testing-library/issues/406 | https://github.com/testing-library/react-hooks-testing-library/blob/chore/migration-guide/MIGRATION_GUIDE.md

// Ex: https://github.com/streamich/react-use/blob/master/tests/useAsync.test.tsx

const { reset } = timeOut();

const GenMockFn = (resolve_to: string) => {
    return vi.fn().mockImplementation(
        () =>
            new Promise<string>((resolve) => {
                reset(() => {
                    resolve(resolve_to);
                }, 500);
            })
    );
};

describe("useAsync", () => {
    describe("initially starts loading and resolves", () => {
        let hook: any;

        const fn = GenMockFn("yay");

        beforeEach(() => {
            hook = renderHook(({ fn }) => useAsync(fn, [fn]), {
                initialProps: { fn },
            });
        });

        it("resolves", async () => {
            expect(hook.result.current.pending).toEqual(true);

            await waitFor(() => expect(hook.result.current.pending).toEqual(false));

            expect(fn).toHaveBeenCalledTimes(1);

            expect(hook.result.current.value).toEqual("yay");
            expect(hook.result.current.error).toBeUndefined();
        });
    });

    describe("initially starts loading and rejects", () => {
        let hook: any;

        const fn = vi.fn().mockImplementation(
            () =>
                new Promise<string>((_, reject) => {
                    reset(() => {
                        reject("yay");
                    }, 500);
                })
        );

        beforeEach(() => {
            hook = renderHook(({ fn }) => useAsync(fn, [fn]), {
                initialProps: { fn },
            });
        });

        it("rejects", async () => {
            expect(hook.result.current.pending).toEqual(true);

            await waitFor(() => expect(hook.result.current.pending).toEqual(false));

            expect(fn).toHaveBeenCalledTimes(1);

            expect(hook.result.current.error).toEqual("yay");
            expect(hook.result.current.value).toBeUndefined();
        });
    });

    describe("re-evaluates when dependencies change", () => {
        describe("the fn is a dependency", () => {
            let hook: any;

            const fn = GenMockFn("yay");

            beforeEach(() => {
                vi.clearAllMocks(); // https://stackoverflow.com/a/59792748/13278193

                hook = renderHook(({ fn }) => useAsync(fn, [fn]), {
                    initialProps: { fn },
                });
            });

            it("resolves", async () => {
                await waitFor(() => expect(hook.result.current.value).toEqual("yay"));

                expect(fn).toHaveBeenCalledTimes(1);
            });

            const _fn = GenMockFn("ayyay");

            it("resolves to a different value", async () => {
                hook.rerender({ fn: _fn }); // change the function refrence

                await waitFor(() => expect(hook.result.current.value).toEqual("ayyay"));

                expect(_fn).toHaveBeenCalledTimes(1);
            });
        });

        describe("additional dependencies", () => {
            let hook: any;

            const fn = GenMockFn("yay");

            beforeEach(() => {
                hook = renderHook(({ fn, count }) => useAsync<any>(fn, [fn, count]), {
                    initialProps: { fn, count: 0 },
                });
            });

            it("renders a different value when deps change", async () => {
                await waitFor(() => expect(hook.result.current.value).toEqual("yay"));

                hook.rerender({ fn, count: 1 });

                await waitFor(() => expect(hook.result.current.value).toEqual("yay"));

                expect(fn).toHaveBeenCalledTimes(2);
            });
        });
    });
});
