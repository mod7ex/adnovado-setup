import { useRouteError, useNavigate } from "react-router-dom";
import styles from "~/assets/scss/modules/boundary.module.scss";
import ErrorSVG from "@/svg/Error";
import { logger } from "~/utils";

export const Boundary: React.FC<{ message?: string }> = ({ message = "Opps! page not found (Go home)" }) => {
    let error = useRouteError();

    const navigate = useNavigate();

    logger.dev_log(error);

    return (
        <div className={`${styles.boundary} ${styles.root}`}>
            <p className={styles.content}> {message} </p>
            <button className={styles.btn} onClick={() => navigate({ pathname: "/" })}>
                <small className={styles.btnInner}>
                    <ErrorSVG />
                </small>
            </button>
        </div>
    );
};

export default Boundary;
