import PageWrapper from "~/layouts/page-wrapper";
import { useTranslate } from "~/i18n";

const Dashboard = () => {
    const { i18n } = useTranslate((v) => v.PAGE_DASHBOARD);

    return (
        <PageWrapper title={i18n("title")}>
            <div>...</div>
        </PageWrapper>
    );
};

export default Dashboard;
