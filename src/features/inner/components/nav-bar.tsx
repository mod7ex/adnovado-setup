import { NavLink, Link } from "react-router-dom";
import styles from "~/assets/scss/modules/inner.module.scss";
import useTranslation from "~/hooks/useTranslation";
type RawProps = React.ComponentPropsWithoutRef<"nav">;

const currentYear = new Date().getFullYear();

const listings = [];

const nav = [
    { to: "/listings", label: "Listings", disabled: false },
    { to: "/orders", label: "Orders", disabled: false },
    { to: "/settings", label: "Settings", disabled: false },
    { to: "/help", label: "Help", disabled: true },
];

const classHandler = <T extends { isActive?: boolean; isPending?: boolean; disabled?: boolean }>({ isActive, isPending, disabled }: T) => {
    let payload = "";
    if (isActive) payload += ` ${styles.active}`;
    if (isPending) payload += ` ${styles.pending}`;
    if (disabled) payload += ` ${styles.disabled}`;

    return payload;
};

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
                {nav.map(({ to, label, disabled }, i) => (
                    <li key={i}>
                        {disabled ? (
                            <span className={classHandler({ disabled, isActive: false })}>{t(label)}</span>
                        ) : (
                            <NavLink className={classHandler} to={to}>
                                {t(label)}
                            </NavLink>
                        )}
                    </li>
                ))}
            </ul>
            <div className={styles.footer}>
                <p>Copyright &#169;{currentYear} cBay</p>
            </div>
        </nav>
    );
};

export default NavBar;
