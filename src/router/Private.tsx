import { Navigate, Outlet } from "react-router-dom";

const Private = () => {
    let auth = false;

    return auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default Private;
