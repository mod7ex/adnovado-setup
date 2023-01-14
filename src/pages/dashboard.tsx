import PageWrapper from "~/layouts/page-wrapper";
import { useTranslate, DICTIONARY_NAMESPACES } from "~/i18n";

const Dashboard = () => {
    const { i18n } = useTranslate(DICTIONARY_NAMESPACES.PAGE_DASHBOARD);

    return (
        <PageWrapper title={i18n("title")}>
            <div>...</div>
        </PageWrapper>
    );
};

export default Dashboard;
