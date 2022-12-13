import styles from "~/assets/scss/modules/inner.module.scss";

type RawProps = {
    title?: string;
    children?: React.ReactNode;
};

const Wrapper: React.FC<RawProps> = ({ title, children }) => {
    return (
        <div id="page-wrapper" className={styles.wrapper}>
            <h1 className={styles.title}>{title}</h1>
            {children}
        </div>
    );
};

export default Wrapper;
