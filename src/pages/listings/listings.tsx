import { Index } from "~/features/listings";
import useTranslation from "~/hooks/useTranslation";
import PageWrapper from "~/layouts/page-wrapper";

const Listings = () => {
    const { i18n: t } = useTranslation();

    return (
        <PageWrapper title={t("Listings")}>
            <Index />
        </PageWrapper>
    );
};

export default Listings;
