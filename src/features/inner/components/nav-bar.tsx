import { AppLink, AppNavLink } from "~/router/components";
import styles from "~/assets/scss/modules/inner.module.scss";
import useTranslation from "~/hooks/useTranslation";
type RawProps = React.ComponentPropsWithoutRef<"nav">;

const currentYear = new Date().getFullYear();

const listings = [];

const nav = [
    { name: "Listings", label: "Listings", disabled: false },
    { name: "Orders", label: "Orders", disabled: false },
    { name: "Settings", label: "Settings", disabled: false },
    { name: "Help", label: "Help", disabled: true },
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
                <AppLink to={{ name: "Dashboard" }}>
                    <img src={"/cropped-logo.svg"} alt="logo" />
                </AppLink>
            </div>
            <ul>
                {nav.map(({ name, label, disabled }, i) => (
                    <li key={i}>
                        {disabled ? (
                            <span className={classHandler({ disabled, isActive: false })}>{t(label)}</span>
                        ) : (
                            <AppNavLink className={classHandler} to={{ name }}>
                                {t(label)}
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
