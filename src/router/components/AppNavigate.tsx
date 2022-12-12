import { Navigate } from "react-router-dom";
import { type ITo, resolve_payload } from "~/router/utils";
import { isObject } from "~/utils/types";

type RawProps = React.ComponentProps<typeof Navigate>;

interface Props extends RawProps {
    to: ITo | RawProps["to"];
}

const AppNavigate: React.FC<Props> = ({ to, ...props }) => {
    let _to: Props["to"] = to;

    if (isObject(to) && "name" in to) {
        _to = resolve_payload(to);
    }

    return <Navigate to={_to} {...props} />;
};

export default AppNavigate;
