import styles from "~/assets/scss/modules/inner.module.scss";
import FullScreenSVG from "~/assets/svg/full-screen.svg";
import FullScreenQuitSVG from "~/assets/svg/full-screen-quit.svg";
import SearchSVG from "~/assets/svg/search.svg";
import BellSVG from "~/assets/svg/bell.svg";
import { NavLink } from "react-router-dom";
import useToggle from "~/hooks/useToggle";
import TextInput from "@/text-input";
import useFullScreen from "~/hooks/useFullScreen";

import { Transition } from "react-transition-group";
import { useRef } from "react";

type RawProps = React.ComponentPropsWithoutRef<"header">;

const FullScreenToggler = () => {
    const { enabled, toggle } = useFullScreen();

    return (
        <button onClick={toggle}>
            <img width={17} height={17} src={enabled ? FullScreenQuitSVG : FullScreenSVG} alt="full screen status" />
        </button>
    );
};

const ProfileNav = () => {
    const [collapsed, toggle] = useToggle(true);

    const nodeRef = useRef(null);

    return (
        <div className={styles.profile}>
            <button onClick={(e) => toggle((v) => !v)}>
                <img width={40} height={40} src="https://placeimg.com/100/100/people" alt="profile" />
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
                    {/* <input type="search" /> */}
                    <TextInput type="search" errable={false} />
                    <button>
                        <img width={20} height={20} src={SearchSVG} alt="search" />
                    </button>
                </span>
            </div>
            <div className={styles.right}>
                <ul>
                    {/* <li>
                        <button>
                            <img width={17} height={17} src={FullScreenSVG} alt="dark/light mode" />
                        </button>
                    </li> */}
                    <li className={styles.notifications}>
                        <button data-count="13">
                            <span>13</span>
                            <img width={17} height={17} src={BellSVG} alt="bell" />
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
