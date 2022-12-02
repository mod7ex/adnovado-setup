import React from "react";
import useTranslation from "~/hooks/useTranslation";
import styles from "~/assets/scss/modules/boundary.module.scss";
import ErrorSVG from "@/svg/Error";

interface Props {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface State {
    hasError: boolean;
}

const Fallback = () => {
    const { Trans } = useTranslation();

    return (
        <div className={`${styles.boundary} ${styles.root}`}>
            <Trans>{(t) => <p className={styles.content}> {t("Opps! Something went wrong")} </p>}</Trans>
            <button className={styles.btn}>
                <small className={styles.btnInner}>
                    <ErrorSVG />
                </small>
            </button>
        </div>
    );
};

export default class ErrorBoundary extends React.Component<Props, State> {
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
        import.meta.env.DEV && console.log(error, errorInfo);
    }

    render() {
        return this.state.hasError ? this.props.fallback ?? <Fallback /> : this.props.children;
    }
}
