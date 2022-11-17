import useLocalStorage from "~/hooks/useLocalStorage";
import Outer from "~/layouts/outer";
import { lazy, Suspense } from "react";
import useToggle from "~/hooks/useToggle";

const LazyLogin = lazy(() => import("~/features/auth/login/components"));
const LazyRegistration = lazy(() => import("~/features/auth/registration/components"));

const Auth = () => {
    const [value, setValue] = useLocalStorage<boolean>("has_ever_logged", true);

    const [show, toggleShow] = useToggle(() => value);

    return (
        <Outer>
            <button onClick={() => toggleShow((v) => !v)}>toggle</button>

            <Suspense fallback={<h1>loading ...</h1>}>{show ? <LazyLogin /> : <LazyRegistration />}</Suspense>
        </Outer>
    );
};

export default Auth;
