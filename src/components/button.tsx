import styles from "~/assets/scss/components/button.module.scss";
import { scheduleTask } from "~/utils";
import { isObject } from "~/utils/types";

type RawProps = React.ComponentPropsWithoutRef<"button">;

interface _Props extends Omit<RawProps, "children"> {
    right?: React.ReactNode;
    left?: React.ReactNode;
    classes?: Record<string, string>;
}

type Size = { large?: true } | { small?: true };
type Type = { primary?: true } | { success?: true } | { danger?: true } | { link?: true };
type Content = { children: RawProps["children"] } | { label: React.ReactNode };

type Props = _Props & Size & Content & Type;

const triggerAnimation = (e: React.MouseEvent) => {
    const x = e.clientX - (e.target as HTMLElement).offsetLeft;
    const y = e.clientY - (e.target as HTMLElement).offsetTop;

    const ripple = document.createElement("span");
    ripple.classList.add(styles.ripple);
    ripple.style.left = x + "px";
    ripple.style.top = y + "px"; // Fix

    e.currentTarget.appendChild(ripple);

    scheduleTask(() => {
        ripple.remove();
    }, 1000);
};

const CUSTOM_PROPS = ["label", "children", "small", "large", "primary", "success", "danger", "link"];

const cleanUp = <T extends Props>(props: T) => {
    for (let key of CUSTOM_PROPS) {
        if (key in props) Reflect.deleteProperty(props, key);
    }

    return props;
};

const Button: React.FC<Props> = ({ classes = styles, left, right, className, disabled, ...props }) => {
    let content;

    if ("label" in props) content = <p>{props.label}</p>;
    else if ("children" in props) content = props.children;

    const _left = isObject(left) ? left : left == null ? null : <p>{left}</p>;
    const _right = isObject(right) ? right : right == null ? null : <p>{right}</p>;

    let _class = (className ?? "") + ` ${classes.root}`;

    // size
    if ("small" in props) _class += ` ${classes.small}`;
    if ("large" in props) _class += ` ${classes.large}`;

    // type
    if ("primary" in props) _class += ` ${classes.primary}`;
    else if ("success" in props) _class += ` ${classes.success}`;
    else if ("danger" in props) _class += ` ${classes.danger}`;
    else if ("link" in props) _class += ` ${classes.link}`;

    const handelClick = (e: React.MouseEvent) => {
        triggerAnimation(e);
    };

    return (
        <button className={_class.trim()} {...cleanUp(props)} disabled={disabled} onClick={(e) => handelClick(e)}>
            {_left}
            {content}
            {_right}
        </button>
    );
};

export default Button;
