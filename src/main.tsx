import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "~/assets/scss/index.scss";
import App from "~/App";
import "~/services/service-worker";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <App />
    </StrictMode>
);
