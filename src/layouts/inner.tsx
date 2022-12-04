import React from "react";
import { NavBar, Header } from "~/features/inner";
import styles from "~/assets/scss/modules/inner.module.scss";

const Outer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className={styles.container}>
            <Header className={styles.header} />

            <NavBar id="nav-bar" className={styles.navBar} />

            <main className={styles.content}>{children}</main>
        </div>
    );
};

export default Outer;
