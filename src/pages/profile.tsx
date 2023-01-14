import { useTranslate } from "~/i18n";
import PageWrapper from "~/layouts/page-wrapper";

const Profile = () => {
    const { i18n } = useTranslate((v) => v.COMMON);

    return (
        <PageWrapper title={i18n("title")}>
            <div>
                <p>...</p>
            </div>
        </PageWrapper>
    );
};

export default Profile;
