import useTranslation from "~/hooks/useTranslation";
import PageWrapper from "~/layouts/page-wrapper";

const Profile = () => {
    const { i18n: t } = useTranslation();

    return (
        <PageWrapper title={t("Profile")}>
            <div>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam saepe optio quo voluptas inventore suscipit possimus quaerat eaque aspernatur. Itaque obcaecati quisquam nostrum animi eveniet repudiandae veniam quae numquam iure?</p>
            </div>
        </PageWrapper>
    );
};

export default Profile;
