import useLocalStorage from "~/hooks/useLocalStorage";
import { lazy, Suspense } from "react";
import Loader from "~/components/svg/loader";
import styles from "~/assets/scss/modules/auth.module.scss";

const LazyLogin = lazy(() => import("~/features/auth/login/components"));
const LazyRegistration = lazy(() => import("~/features/auth/registration/components"));

const AuthLoader = (
    <div className={styles.loader}>
        <Loader />
    </div>
);

const Auth = () => {
    const [value, setValue] = useLocalStorage<boolean>("has_ever_logged", false);

    const switchProcess = () => {
        setValue((v) => !v);
    };

    return <Suspense fallback={AuthLoader}>{value ? <LazyLogin onSwitchProcess={switchProcess} /> : <LazyRegistration onSwitchProcess={switchProcess} />}</Suspense>;
};

export default Auth;
