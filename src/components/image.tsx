// https://github.com/rollup/plugins/tree/master/packages/dynamic-import-vars#limitations

import useAsync from "~/hooks/useAsync";

type RawProps = React.ComponentProps<"img">;

type Props = { fill?: true } & RawProps;

// prettier-ignore
const Img: React.FC<Partial<Omit<Props, "src"> & {name: string}>> = ({
        decoding = "async",
        loading = "lazy",
        name,
        fill,
        className = "",
        ...rest
    }) => {
    const { pending, value, error } = useAsync(async () => {
        const response = await import(`../assets/img/${name}.webp`);
        return response.default;
    });

    if (pending) return <>&#x21bb;</>; /* <>&#8226;&#8226;&#8226;</> */

    if (error) return <span className="err" >&#9888;</span>;

    // prettier-ignore
    return <img
                src={value}
                decoding={decoding}
                loading={loading}
                className={(className + ` ${fill ? 'expand' : ''}`).trim()}
                {...rest}
            />;
};

export default Img;

export const ExternalImg: React.FC<Props> = ({ fill, src, decoding = "async", loading = "lazy", className = "", ...rest }) => {
    // prettier-ignore
    return <img
                src={src}
                decoding={decoding}
                loading={loading}
                className={(className + ` ${fill ? 'expand' : ''}`).trim()}
                {...rest}
            />;
};
