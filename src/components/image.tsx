import { ROOT_URL } from "~/helpers";

type RawProps = Exclude<React.ImgHTMLAttributes<HTMLImageElement>, "width" | "height">;

type RawPropsKeys = "src" | "decoding" | "loading" | "className" | "width" | "height";

type Props =
    | ({
          fill: true;
      } & {
          [K in Exclude<RawPropsKeys, "width" | "height">]: RawProps[K];
      })
    | ({
          fill: false;
      } & {
          [K in RawPropsKeys]: RawProps[K];
      });

const SVGRegex = /\.svg$/i;

// prettier-ignore
const Image: React.FC<Partial<Props>> = ({
        decoding = "async",
        loading = "lazy",
        src = "",
        fill = false,
        className = "",
        ...rest
    }) => {
    src = new URL(src, `${ROOT_URL}/assets/${SVGRegex.test(src) ? "svg" : "img"}/`).pathname;

    // prettier-ignore
    return <img
                src={src}
                decoding={decoding}
                loading={loading}
                className={(className + ` ${fill ? 'expand' : ''}`).trim()}
                {...rest}
            />;
};

export default Image;
