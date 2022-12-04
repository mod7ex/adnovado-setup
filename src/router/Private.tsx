import { Navigate, Outlet } from "react-router-dom";

const Private: React.FC<{ auth?: boolean }> = ({ auth }) => {
    return auth ? <Outlet /> : <Navigate to="/auth" />;
};

export default Private;
