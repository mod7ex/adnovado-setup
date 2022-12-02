import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "~/assets/scss/index.scss";
// import App from "~/App";
import init, { sendMsgToSW } from "~/services/service-worker";

init();

// ReactDOM.createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//         <App />
//     </StrictMode>
// );

const App = () => {
    const handle = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = new FormData(e.target as HTMLFormElement);

        sendMsgToSW({ email: data.get("email"), name: data.get("name") });
    };

    return (
        <StrictMode>
            <form action="" method="POST" onSubmit={handle}>
                <input type="text" name="name" placeholder="name" />
                <input type="email" name="email" placeholder="e-mail" />
                <input type="submit" value="Submit" />
            </form>
        </StrictMode>
    );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);

// setTimeout(() => {
//     try {
//         fetch("/some-no-img.jpeg");
//     } finally {
//         //
//     }
// }, 5000);
