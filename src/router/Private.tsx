import { Navigate, Outlet } from "react-router-dom";
import Inner from "~/layouts/inner";

const Private: React.FC<{ auth?: boolean }> = ({ auth }) => {
    return auth ? (
        <Inner>
            <Outlet />
        </Inner>
    ) : (
        <Navigate to="/auth" />
    );
};

export default Private;
