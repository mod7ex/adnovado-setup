import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "~/assets/scss/index.scss";
import App from "~/App";
import ErrorBoundary from "@/error-boundary";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
        <StrictMode>
            <App />
        </StrictMode>
    </ErrorBoundary>
);
