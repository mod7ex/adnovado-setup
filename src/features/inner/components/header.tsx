import styles from "~/assets/scss/modules/inner.module.scss";
import { AppLink } from "~/router/components";
import useToggle from "~/hooks/useToggle";
import TextInput from "@/text-input";
import useFullScreen from "~/hooks/useFullScreen";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import Icon from "@/icon";
import { ExternalImg } from "@/image";
import { Translate, DICTIONARY_NAMESPACES, SUPPORTED_LANGUAGES, useLanguage, EXTENDED_SUPPORTED_LANGUAGES } from "~/i18n";

type RawProps = React.ComponentPropsWithoutRef<"header">;

const FullScreenToggler = () => {
    const { enabled, toggle } = useFullScreen();

    return (
        <button onClick={toggle}>
            <Icon name={`full-screen${enabled ? "-quit" : ""}`} />
        </button>
    );
};

const ProfileNav = () => {
    const [collapsed, toggle] = useToggle(true);

    const nodeRef = useRef(null);
    const btnRef = useRef(null);

    useClickOutside(
        [nodeRef, btnRef],
        () => {
            toggle(true);
        },
        { condition: !collapsed }
    );

    return (
        <Translate ns={DICTIONARY_NAMESPACES.INNER}>
            {({ i18n }) => (
                <div className={styles.profile}>
                    <button ref={btnRef} onClick={(e) => toggle((v) => !v)}>
                        <ExternalImg width={40} height={40} src="https://placeimg.com/100/100/people" />
                    </button>

                    {
                        <Transition nodeRef={nodeRef} in={!collapsed} timeout={125}>
                            {(state) => (
                                <nav ref={nodeRef} className={`${"show-up-and-fade"} show-up-and-fade__${state}`}>
                                    <p>Mourad EL CADI</p>
                                    <ul>
                                        <li>
                                            <AppLink to={{ name: "Profile" }}>
                                                <Icon name="profile" width={1} height={1} /> <p>{i18n("header.profile.settings")}</p>
                                            </AppLink>
                                        </li>
                                        <li>
                                            <AppLink to={{ name: "Logout" }}>
                                                <Icon name="sign-out" width={1} height={1} /> <p>{i18n("header.profile.logout")}</p>
                                            </AppLink>
                                        </li>
                                    </ul>
                                </nav>
                            )}
                        </Transition>
                    }
                </div>
            )}
        </Translate>
    );
};

const LanguageSwitcher = () => {
    const { language, set_language } = useLanguage();

    const [collapsed, toggle] = useToggle(true);

    const nodeRef = useRef(null);
    const btnRef = useRef(null);

    useClickOutside(
        [nodeRef, btnRef],
        () => {
            toggle(true);
        },
        { condition: !collapsed }
    );

    return (
        <>
            <button ref={btnRef} onClick={(e) => toggle((v) => !v)}>
                <p>{language}</p>

                <Icon name="arrow-down" className={collapsed ? "" : "rotate-180"} />
            </button>

            <Transition nodeRef={nodeRef} in={!collapsed} timeout={125}>
                {(state) => (
                    <ul ref={nodeRef} className={`${"show-up-and-fade"} show-up-and-fade__${state} ${styles.languageOptions}`}>
                        {Object.entries(SUPPORTED_LANGUAGES).map(([key, val], i) => (
                            <li key={i} onClick={() => set_language(val)}>
                                <p>{EXTENDED_SUPPORTED_LANGUAGES[key as keyof typeof EXTENDED_SUPPORTED_LANGUAGES]}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </Transition>
        </>
    );
};

const Header: React.FC<RawProps> = ({ ...props }) => {
    return (
        <header {...props}>
            <div className={styles.left}>
                <span className={styles.search}>
                    <TextInput type="search" errable={false} />
                    <button>
                        <Icon name="search" />
                    </button>
                </span>
            </div>
            <div className={styles.right}>
                <ul>
                    <li className={styles.language}>
                        <LanguageSwitcher />
                    </li>
                    <li className={styles.notifications}>
                        <button data-count="13">
                            <p>13</p>
                            <Icon name="bell" />
                        </button>
                    </li>
                    <li>
                        <FullScreenToggler />
                    </li>
                </ul>
                <ProfileNav />
            </div>
        </header>
    );
};

export default Header;
