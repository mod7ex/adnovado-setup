import { Outlet } from "react-router-dom";
import Inner from "~/layouts/inner";
import { AppNavigate } from "~/router/components";

const Private: React.FC<{ auth?: boolean }> = ({ auth }) => {
    return auth ? (
        <Inner>
            <Outlet />
        </Inner>
    ) : (
        <AppNavigate to={{ name: "Auth" }} />
    );
};

export default Private;
