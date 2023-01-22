import React from "react";
import styles from "~/assets/scss/modules/boundary.module.scss";
import ErrorSVG from "@/svg/Error";
import { Translate, DICTIONARY_NAMESPACES } from "~/i18n";
import { logger } from "~/modules";

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
}

export const Fallback: React.FC<{ message?: string }> = ({ message = "Opps! Something went wrong" }) => {
    return (
        <div className={`${styles.boundary} ${styles.root}`}>
            <Translate ns={DICTIONARY_NAMESPACES.COMMON}>{({ i18n }) => <p className={styles.content}> {i18n(message)} </p>}</Translate>
            <button className={styles.btn}>
                <small className={styles.btnInner}>
                    <ErrorSVG />
                </small>
            </button>
        </div>
    );
};

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: unknown) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: unknown, errorInfo: any) {
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, errorInfo);
        logger.dev_log(error, errorInfo);
    }

    render() {
        return this.state.hasError ? this.props.fallback ?? <Fallback /> : this.props.children;
    }
}

export default ErrorBoundary;
