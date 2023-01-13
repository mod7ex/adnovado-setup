import { NavLink } from "react-router-dom";
import { type ITo, resolve_payload } from "~/router/utils";
import { isPlainObject } from "~/utils/types";

type RawProps = React.ComponentProps<typeof NavLink>;

interface Props extends RawProps {
    to: ITo | RawProps["to"];
}

const AppNavLink: React.FC<Props> = ({ children, to, ...props }) => {
    let _to: Props["to"] = to;

    if (isPlainObject(to) && "name" in to) {
        _to = resolve_payload(to);
    }

    return (
        <NavLink to={_to} {...props}>
            {children}
        </NavLink>
    );
};

export default AppNavLink;
