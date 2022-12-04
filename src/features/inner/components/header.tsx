type RawProps = React.ComponentPropsWithoutRef<"header">;
import SearchSVG from "~/assets/svg/search.svg";
import FullScreenSVG from "~/assets/svg/full-screen.svg";
import BellSVG from "~/assets/svg/bell.svg";
import styles from "~/assets/scss/modules/inner.module.scss";

const Header: React.FC<RawProps> = ({ ...props }) => {
    return (
        <header {...props}>
            <div className={styles.left}>
                <span className={styles.search}>
                    <input type="search" />
                    <button>
                        <img width={20} height={20} src={SearchSVG} alt="search" />
                    </button>
                </span>
            </div>
            <div className={styles.right}>
                <ul>
                    <li>
                        <button>
                            <img width={17} height={17} src={FullScreenSVG} alt="dark/light mode" />
                        </button>
                    </li>
                    <li className={styles.notifications}>
                        <button data-count="13">
                            <span>13</span>
                            <img width={17} height={17} src={BellSVG} alt="full screen" />
                        </button>
                    </li>
                    <li>
                        <button>
                            <img width={17} height={17} src={FullScreenSVG} alt="bill" />
                        </button>
                    </li>
                </ul>
                <button>
                    <img width={40} height={40} src="https://placeimg.com/100/100/people" alt="profile" />
                </button>
            </div>
        </header>
    );
};

export default Header;
