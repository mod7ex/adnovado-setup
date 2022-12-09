import { NavLink } from "react-router-dom";
import { to as resolve } from "~/router";

type RawProps = React.ComponentProps<typeof NavLink>;

const AppNavLink: React.FC<RawProps> = ({ children, to }) => {
    const _to = typeof to === "string" ? resolve(to) : to;

    return <NavLink to={_to}>{children}</NavLink>;
};

export default AppNavLink;
