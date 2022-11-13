import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "~/assets/scss/index.scss";
import { RouterProvider } from "react-router-dom/dist";
import router from "~/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
);
