import useLocalStorage from "~/hooks/useLocalStorage";
import Outer from "~/layouts/outer";
import { lazy, Suspense } from "react";
import Loader from "@/loader";

const LazyLogin = lazy(() => import("~/features/auth/login/components"));
const LazyRegistration = lazy(() => import("~/features/auth/registration/components"));

const Auth = () => {
    const [value, setValue] = useLocalStorage<boolean>("has_ever_logged", true);

    return (
        <Outer>
            <Suspense fallback={<Loader />}>{value ? <LazyLogin /> : <LazyRegistration />}</Suspense>
        </Outer>
    );
};

export default Auth;
