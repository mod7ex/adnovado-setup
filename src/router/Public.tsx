import { AppNavigate } from "~/router/components";

const Public: React.FC<{ children: React.ReactElement; auth?: boolean }> = ({ children, auth }) => {
    return auth ? <AppNavigate to={{ name: "Dashboard" }} /> : children;
};

export default Public;
