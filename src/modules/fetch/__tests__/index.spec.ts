import { /* Mutation, */ Query, AppURL } from "~/modules/fetch";

import { mockTestUrl } from "~/mocks/utils";

const { TEST_PAYLOAD } = mockTestUrl(["search", "username", "password", "hash"]);

describe("Query", () => {
    const url = new AppURL(TEST_PAYLOAD);

    const query = new Query(url.href!);

    it("works correctly", async () => {
        const result = await query.exe();

        expect(result.success).toEqual(true);
    });
});
