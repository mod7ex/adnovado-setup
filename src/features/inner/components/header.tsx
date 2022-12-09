import styles from "~/assets/scss/modules/inner.module.scss";
import { NavLink } from "react-router-dom";
import useToggle from "~/hooks/useToggle";
import TextInput from "@/text-input";
import useFullScreen from "~/hooks/useFullScreen";
import { Transition } from "react-transition-group";
import { useRef } from "react";
import useClickOutside from "~/hooks/useClickOutside";
import Icon from "@/icon";
import { ExternalImg } from "@/image";

type RawProps = React.ComponentPropsWithoutRef<"header">;

const FullScreenToggler = () => {
    const { enabled, toggle } = useFullScreen();

    return (
        <button onClick={toggle}>
            <Icon name={`full-screen${enabled ? "-quit" : ""}`} alt="full screen status" />
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
        !collapsed
    );

    return (
        <div className={styles.profile}>
            <button ref={btnRef} onClick={(e) => toggle((v) => !v)}>
                <ExternalImg width={40} height={40} src="https://placeimg.com/100/100/people" alt="profile" />
            </button>

            {
                <Transition nodeRef={nodeRef} in={!collapsed} timeout={125}>
                    {(state) => (
                        <nav ref={nodeRef} className={`${"show-up-and-fade"} show-up-and-fade__${state}`}>
                            <p>Mourad EL CADI</p>
                            <ul>
                                <li>
                                    <NavLink to={"/profile"}>Profile Settings</NavLink>
                                </li>
                                <li>
                                    <NavLink to={"/logout"}>Sign Out</NavLink>
                                </li>
                            </ul>
                        </nav>
                    )}
                </Transition>
            }
        </div>
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
                    {/* <li>
                        <button>
                            <Icon name="full-screen" alt="dark/light mode" />
                        </button>
                    </li> */}
                    <li className={styles.notifications}>
                        <button data-count="13">
                            <span>13</span>
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