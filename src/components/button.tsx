import styles from "~/assets/scss/components/button.module.scss";
import { scheduleTask } from "~/utils";

type RawProps = React.ComponentPropsWithoutRef<"button">;

interface _Props extends Omit<RawProps, "children"> {
    right?: React.ReactNode;
    left?: React.ReactNode;
}

type Size = { large?: true | 1 } | { small?: true | 1 };
type Type = { primary?: true | 1 } | { success?: true | 1 } | { danger?: true | 1 } | { link?: true | 1 };

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

const Button: React.FC<Props> = ({ left, right, className, disabled, ...props }) => {
    let content;

    if ("label" in props) content = props.label;
    else if ("children" in props) content = props.children;

    const _left = left ? <p>{left}</p> : null;
    const _right = right ? <p>{right}</p> : null;

    let _class = (className ?? "") + ` ${styles.root}`;
    if ("small" in props) _class += ` ${styles.small}`;
    if ("large" in props) _class += ` ${styles.large}`;

    if ("primary" in props) _class += ` ${styles.primary}`;
    else if ("success" in props) _class += ` ${styles.success}`;
    else if ("danger" in props) _class += ` ${styles.danger}`;
    else if ("link" in props) _class += ` ${styles.link}`;

    const handelClick = (e: React.MouseEvent) => {
        triggerAnimation(e);
    };

    return (
        <button className={_class.trim()} {...props} disabled={disabled} onClick={(e) => handelClick(e)}>
            {_left}
            <p>{content}</p>
            {_right}
        </button>
    );
};

export default Button;
