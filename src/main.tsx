import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "~/assets/scss/index.scss";
// import App from "~/App";
// import "~/services/service-worker";
import "~/services/service-worker";

// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//         <App />
//     </StrictMode>
// );

setTimeout(() => {
    try {
        fetch("/some-no-img.jpeg");
    } finally {
        //
    }
}, 5000);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <></>
    </StrictMode>
);
