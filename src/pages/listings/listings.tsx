import { Index } from "~/features/listings";
import { useTranslate } from "~/i18n";
import PageWrapper from "~/layouts/page-wrapper";

const Listings = () => {
    const { i18n } = useTranslate((v) => v.PAGE_LISTINGS);

    return (
        <PageWrapper title={i18n("title")}>
            <Index />
        </PageWrapper>
    );
};

export default Listings;
