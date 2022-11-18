import styles from "~/assets/scss/modules/auth.module.scss";

const Outer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <main className={styles.container}>
            <div className={styles.auth}>{children}</div>
        </main>
    );
};

export default Outer;
