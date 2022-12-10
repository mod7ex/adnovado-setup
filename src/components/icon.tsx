// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

// https://css-tricks.com/using-svg

type RawProps = React.ComponentProps<"span">;

import useAsync from "~/hooks/useAsync";

interface Props extends RawProps {
    height?: Numberish;
    width?: Numberish;
    name?: string;
}

const Icon: React.FC<Props> = ({ name, height = 1.2, width = 1.2, ...rest }) => {
    const { pending, value, error } = useAsync(async () => {
        const response = await import(`../assets/svg/${name}.svg`);
        return response.default;
    });

    if (pending) return <>&#x21bb;</>; /* <>&#8226;&#8226;&#8226;</> */

    const style = {
        display: "block",
        width: `${width}rem`,
        height: `${height}rem`,
    };

    if (error)
        return (
            <span style={{ ...style, color: "red" }} {...rest}>
                &#9888;
            </span>
        );

    // prettier-ignore
    // return <img
    //             decoding={decoding}
    //             loading={loading}
    //             height={height}
    //             width={width}
    //             src={value}
    //             {...rest}
    //         />;

    return (
        <span className="icon" style={style} {...rest} >
            <object type="image/svg+xml" className="icon-inner" data={value} style={style}>
            </object>
        </span>
    );
};

export default Icon;
