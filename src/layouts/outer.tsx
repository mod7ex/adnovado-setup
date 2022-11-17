import styles from "~/assets/scss/modules/auth.module.scss";

const Outer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <main className={styles.container}>{children}</main>;
};

export default Outer;
