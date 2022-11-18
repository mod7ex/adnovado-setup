import styles from "~/assets/scss/components/button.module.scss";

type RawProps = React.ComponentPropsWithoutRef<"button">;

interface _Props extends Omit<RawProps, "children"> {
    right?: React.ReactNode;
    left?: React.ReactNode;
}

type Size = { large?: true | 1 } | { small?: true | 1 };

type Content = { children: RawProps["children"] } | { label: React.ReactNode };

type Props = _Props & Size & Content;

const Button: React.FC<Props> = ({ left, right, className, ...props }) => {
    let content;

    if ("label" in props) content = props.label;
    else if ("children" in props) content = props.children;

    const _left = left ? <p>{left}</p> : null;
    const _right = right ? <p>{right}</p> : null;

    let _class = (className ?? "") + ` ${styles.root}`;
    if ("small" in props) _class += ` ${styles.sm}`;
    if ("large" in props) _class += ` ${styles.lg}`;

    return (
        <button className={_class.trim()} {...props}>
            {_left}
            <p>{content}</p>
            {_right}
        </button>
    );
};

export default Button;
