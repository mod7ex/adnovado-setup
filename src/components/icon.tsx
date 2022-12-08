// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

type RawProps = Omit<React.ComponentProps<"img">, "src">;

import useAsync from "~/hooks/useAsync";

const Icon: React.FC<RawProps & { name: string }> = ({ decoding = "async", loading = "lazy", name, height = 20, width = 20, ...rest }) => {
    const { pending, value, error } = useAsync(async () => {
        const response = await import(`../assets/svg/${name}.svg`);
        return response.default;
    });

    if (pending) return <>&#x21bb;</>; /* <>&#8226;&#8226;&#8226;</> */

    if (error) return <span style={{ color: "red" }}>&#9888;</span>;

    // prettier-ignore
    return <img
                decoding={decoding}
                loading={loading}
                height={height}
                width={width}
                src={value}
                {...rest}
            />;
};

export default Icon;
