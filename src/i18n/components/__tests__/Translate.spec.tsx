import { Translate, $language, FALLBACK_MESSAGE } from "~/i18n";
import { waitFor, render, screen } from "~/../test-utils";
import { TEST_LANGUAGE, TEST_NAMESPACE, TEST_PAYLOAD } from "~/mocks/i18n";

const Consumer = () => {
    return (
        <Translate ns={TEST_NAMESPACE}>
            {({ $t, i18n }) => (
                <>
                    <h1>{i18n("key.nested")}</h1>
                    <h2>{$t((v) => v.key.nested)}</h2>

                    <p>{i18n("some.none.existing.path")}</p>
                    <p>{$t((v) => v.some.none.existing.key)}</p>
                </>
            )}
        </Translate>
    );
};

describe("Translate", () => {
    beforeEach(() => {
        $language.set(TEST_LANGUAGE);

        render(<Consumer />);
    });

    it("Translates correctly", async () => {
        waitFor(() => {
            screen.getAllByRole("heading").forEach((item) => {
                expect(item).toHaveTextContent(TEST_PAYLOAD.key.nested);
            });

            screen.getAllByRole("paragraph").forEach((item, i) => {
                if (i === 0) expect(item).toHaveTextContent("_");
                else expect(item).toHaveTextContent(FALLBACK_MESSAGE);
            });
        });
    });
});
