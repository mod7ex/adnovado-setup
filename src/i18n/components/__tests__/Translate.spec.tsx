import { Translate, $language, FALLBACK_MESSAGE, useLanguage } from "~/i18n";
import { waitFor, render, screen, userEvent } from "~/../test-utils";
import { TEST_LANGUAGE, TEST_NAMESPACE, TEST_PAYLOAD, OTHER_TEST_LANGUAGE, OTHER_TEST_PAYLOAD } from "~/mocks/i18n";

const TestComponent = () => {
    const { set_language, language } = useLanguage();

    return (
        <Translate ns={TEST_NAMESPACE}>
            {({ $t, i18n }) => (
                <>
                    <h1>{language}</h1>

                    <h3>{i18n("key.nested")}</h3>

                    <h3>{$t((v) => v.key.nested)}</h3>

                    <p role={"paragraph"}>{i18n("some.none.existing.path")}</p>

                    <p role={"paragraph"}>{$t((v) => v.some.none.existing.key)}</p>

                    <button onClick={() => set_language(OTHER_TEST_LANGUAGE)}>switch language</button>
                </>
            )}
        </Translate>
    );
};

describe("Translate", () => {
    test("Correct workflow", async () => {
        $language.set(TEST_LANGUAGE);

        render(<TestComponent />);

        const languageContainer = screen.getByRole("heading", { level: 1 });

        const switcher = screen.getByRole("button");

        await waitFor(() => {
            expect(languageContainer).toHaveTextContent(TEST_LANGUAGE);

            screen.getAllByRole("heading", { level: 3 }).forEach((item) => {
                expect(item).toHaveTextContent(TEST_PAYLOAD.key.nested);
            });

            screen.getAllByRole("paragraph").forEach((item, i) => {
                if (i === 0) expect(item).toHaveTextContent("_");
                else expect(item).toHaveTextContent(FALLBACK_MESSAGE);
            });
        });

        await userEvent.click(switcher);

        await waitFor(() => {
            expect(languageContainer).toHaveTextContent(OTHER_TEST_LANGUAGE);

            screen.getAllByRole("heading", { level: 3 }).forEach((item) => {
                expect(item).toHaveTextContent(OTHER_TEST_PAYLOAD.key.nested);
            });

            screen.getAllByRole("paragraph").forEach((item, i) => {
                if (i === 0) expect(item).toHaveTextContent("_");
                else expect(item).toHaveTextContent(FALLBACK_MESSAGE);
            });
        });
    });
});
