import { Index } from "~/features/listings";
import { useTranslate } from "~/i18n";
import PageWrapper from "~/layouts/page-wrapper";

const Listings = () => {
    const { i18n } = useTranslate((v) => v.PAGE_DASHBOARD);

    return (
        <PageWrapper title={i18n("Listings")}>
            <Index />
        </PageWrapper>
    );
};

export default Listings;
