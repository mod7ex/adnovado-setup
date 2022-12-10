import { Link } from "react-router-dom";
import { type ITo, resolve_payload } from "~/router/utils";
import { isObject } from "~/utils/types";

type RawProps = React.ComponentProps<typeof Link>;

interface Props extends RawProps {
    to: ITo | RawProps["to"];
}

const AppLink: React.FC<Props> = ({ children, to, ...props }) => {
    let _to: Props["to"] = to;

    if (isObject(to) && "name" in to) {
        _to = resolve_payload(to);
    }

    return (
        <Link to={_to} {...props}>
            {children}
        </Link>
    );
};

export default AppLink;
