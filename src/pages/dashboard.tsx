import PageWrapper from "~/layouts/page-wrapper";
import useTranslation from "~/hooks/useTranslation";

const Dashboard = () => {
    const { i18n: t } = useTranslation();

    return (
        <PageWrapper title={t("Dashboard")}>
            <div>
                <h1>Dashboard</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam saepe optio quo voluptas inventore suscipit possimus quaerat eaque aspernatur. Itaque obcaecati quisquam nostrum animi eveniet repudiandae veniam quae numquam iure?</p>
            </div>
        </PageWrapper>
    );
};

export default Dashboard;
