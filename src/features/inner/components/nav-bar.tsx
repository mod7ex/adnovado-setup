import { AppLink, AppNavLink } from "~/router/components";
import styles from "~/assets/scss/modules/inner.module.scss";
import useTranslation from "~/hooks/useTranslation";
import Icon from "~/components/icon";
type RawProps = React.ComponentPropsWithoutRef<"nav">;

const currentYear = new Date().getFullYear();

const nav = [
    { name: "Listings", icon: "listings", label: "Listings" },
    { name: "Orders", icon: "orders", label: "Orders" },
    { name: "Settings", icon: "settings", label: "Settings" },
    { name: "Help", icon: "help", label: "Help", disabled: true },
];

const classHandler = <T extends { isActive?: boolean; isPending?: boolean; disabled?: boolean }>({ isActive, isPending, disabled }: T) => {
    let payload = styles.navItem;

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
                <AppLink to={{ name: "Dashboard" }}>
                    <img src={"/cropped-logo.svg"} alt="logo" />
                </AppLink>
            </div>
            <ul>
                {nav.map(({ name, label, disabled, icon }, i) => (
                    <li key={i}>
                        {disabled ? (
                            <span className={classHandler({ disabled, isActive: false })}>
                                <Icon name={icon} disabled={disabled} />
                                <p>{t(label)}</p>
                            </span>
                        ) : (
                            <AppNavLink className={classHandler} to={{ name }}>
                                <Icon name={icon} /> <p>{t(label)}</p>
                            </AppNavLink>
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
