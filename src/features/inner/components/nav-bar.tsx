import { NavLink, Link } from "react-router-dom";
import styles from "~/assets/scss/modules/inner.module.scss";
import useTranslation from "~/hooks/useTranslation";
type RawProps = React.ComponentPropsWithoutRef<"nav">;

const currentYear = new Date().getFullYear();

const NavBar: React.FC<RawProps> = ({ ...props }) => {
    const { i18n: t } = useTranslation();

    return (
        <nav {...props}>
            <div className={styles.logo}>
                <Link to="/">
                    <img src={"/cropped-logo.svg"} alt="logo" />
                </Link>
            </div>
            <ul>
                <li>
                    <NavLink to="/profile">{t("profile")}</NavLink>
                </li>
                <li>
                    <NavLink to="/settings">{t("settings")}</NavLink>
                </li>
                <li>
                    <NavLink to="/orders">{t("orders")}</NavLink>
                </li>
                <li>
                    <NavLink to="/listings">{t("listings")}</NavLink>
                </li>
                <li>
                    <NavLink to="/help">{t("help")}</NavLink>
                </li>
                <li>
                    <NavLink to="/logout">{t("logout")}</NavLink>
                </li>
            </ul>
            <div className={styles.footer}>
                <p>Copyright &#169;{currentYear} cBay</p>
            </div>
        </nav>
    );
};

export default NavBar;
