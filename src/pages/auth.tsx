import useLocalStorage from "~/hooks/useLocalStorage";
import Outer from "~/layouts/outer";
import { lazy, Suspense } from "react";
import Loader from "@/loader";

const LazyLogin = lazy(() => import("~/features/auth/login/components"));
const LazyRegistration = lazy(() => import("~/features/auth/registration/components"));

const Auth = () => {
    const [value, setValue] = useLocalStorage<boolean>("has_ever_logged", true);

    const switchProcess = () => {
        setValue((v) => !v);
    };

    return (
        <Outer>
            <Suspense fallback={<Loader />}>{value ? <LazyLogin onSwitchProcess={switchProcess} /> : <LazyRegistration onSwitchProcess={switchProcess} />}</Suspense>
        </Outer>
    );
};

export default Auth;
