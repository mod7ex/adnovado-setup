import { Link } from "react-router-dom";
import styles from "~/assets/scss/components/link.module.scss";

type Props = React.ComponentProps<typeof Link>;

const AppLink: React.FC<Props> = ({ children, className, ...rest }) => {
    return (
        <Link className={`${className} ${styles.root}`} {...rest}>
            {children}
        </Link>
    );
};

export default AppLink;
