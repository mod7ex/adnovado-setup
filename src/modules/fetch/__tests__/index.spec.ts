import { /* Mutation, */ Query, AppURL } from "~/modules/fetch";
import { users } from "~/mocks/handlers";
import { mockTestUrl } from "~/mocks/utils";

const { TEST_PAYLOAD } = mockTestUrl(["search", "username", "password", "hash"]);

type T = typeof users;

describe("Query", () => {
    const url = new AppURL(TEST_PAYLOAD);

    const query = new Query(url.href!);

    it("works correctly", async () => {
        const result = await query.exe();
        expect(result.success).toEqual(true);

        if (result.success === true) {
            expect(result.data).toBeUndefined(); // no exploiter was provided
        }
    });

    it("exploiter works correctly", async () => {
        const result = await query.exe<T>({ exploit: (r) => r.json() });

        if (result.success === true) {
            expect(result.data).toEqual(users);
        }
    });

    it("abortion works correctly", async () => {
        const result = await query.exe<T>({ timeout: 200 });

        expect(result.success).toBe(false);

        if (result.success === false) {
            expect((result.error as DOMException)?.name).toBe("AbortError");
        }
    });
});
