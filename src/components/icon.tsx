// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

// https://css-tricks.com/using-svg

type RawProps = React.ComponentProps<"span">;

import useAsync from "~/hooks/useAsync";

interface Props extends RawProps {
    height?: Numberish;
    width?: Numberish;
    name?: string;
    disabled?: true;
}

const Icon: React.FC<Props> = ({ name, height = 1.2, width = 1.2, disabled, ...rest }) => {
    const style = {
        display: "block",
        width: `${width}rem`,
        height: `${height}rem`,
    };

    const { pending, value, error } = useAsync(async () => {
        const response = await import(`../assets/svg/${name}.svg`);
        return response.default;
    });

    let inner;

    if (disabled) inner = <></>;
    else if (pending) inner = <>&#x21bb;</>; /* <>&#8226;&#8226;&#8226;</> */
    else if (error) inner = <>&#9888;</>;
    else {
        inner = (
            <object type="image/svg+xml" className="icon-inner" data={value} style={style}>
                <span style={{ ...style, color: "red" }} {...rest}>
                    &#9888;
                </span>
            </object>
        );
    }

    return (
        <span className="icon" role="icon" style={style} {...rest}>
            {inner}
        </span>
    );
};

export default Icon;
