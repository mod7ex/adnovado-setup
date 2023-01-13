import { Outlet } from "react-router-dom";
import Inner from "~/layouts/inner";

import { AppNavigate, PAGES } from "~/router";

const Private: React.FC<{ auth?: boolean }> = ({ auth }) => {
    return auth ? (
        <Inner>
            <Outlet />
        </Inner>
    ) : (
        <AppNavigate to={{ name: PAGES.AUTH }} />
    );
};

export default Private;
