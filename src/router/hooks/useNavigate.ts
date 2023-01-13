import { useNavigate, type NavigateOptions } from "react-router-dom";
import { type ITo, resolve_payload } from "~/router/utils";
import { isPlainObject } from "~/utils/types";

export default () => {
    const _navigate = useNavigate();

    return (to: ITo | string, options?: NavigateOptions) => {
        let pathname: any = to;

        if (isPlainObject(to) && "name" in to) {
            pathname = resolve_payload(to);
        }

        _navigate({ pathname }, options);
    };
};
