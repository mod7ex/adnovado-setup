import { AppLink } from "~/router/components";
import styles from "~/assets/scss/components/link.module.scss";

type Props = React.ComponentProps<typeof AppLink>;

const Link: React.FC<Props> = ({ children, className, ...rest }) => {
    return (
        <AppLink className={`${className} ${styles.root}`} {...rest}>
            {children}
        </AppLink>
    );
};

export default Link;
