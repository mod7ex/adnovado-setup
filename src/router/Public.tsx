import { AppNavigate, PAGES } from "~/router";

const Public: React.FC<{ children: React.ReactElement; auth?: boolean }> = ({ children, auth }) => {
    return auth ? <AppNavigate to={{ name: PAGES.DASHBOARD }} /> : children;
};

export default Public;
