import { Mutation, Query, AppURL } from "~/modules/fetch";

import { mockTestUrl } from "~/mocks/utils";

const { TEST_PAYLOAD } = mockTestUrl();

describe("Query", () => {
    const url = new AppURL(TEST_PAYLOAD);

    const query = new Query(url);

    it("works correctly", async () => {
        const result = await query.exe();
    });
});
