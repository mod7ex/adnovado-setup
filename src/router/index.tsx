import { createBrowserRouter } from "react-router-dom";
import Auth from "~/pages/auth";
import Private from "~/router/Private";
import Public from "~/router/Public";
import Dashboard from "~/pages/dashboard";
import Inner from "~/layouts/inner";
import Outer from "~/layouts/outer";
import { Fallback as ErrorPage } from "@/error-boundary";

const auth = true;

export default createBrowserRouter([
    {
        path: "/auth",
        element: (
            <Public auth={auth}>
                <Outer>
                    <Auth />
                </Outer>
            </Public>
        ),
    },

    {
        path: "/",
        element: <Private auth={auth} />,
        errorElement: <ErrorPage message={"404 Page Not Found"} />,
        children: [
            {
                index: true,
                element: <Dashboard />,
            },

            {
                path: "profile",
                element: <h1>Profile</h1>,
            },

            {
                path: "settings",
                element: <h1>Settings</h1>,
            },

            {
                path: "orders",
                children: [
                    {
                        index: true,
                        element: <h1>Orders</h1>,
                    },
                    {
                        path: ":id",
                        element: <h1>Orders id</h1>,
                    },
                ],
            },

            {
                path: "listings",
                element: <h1>Listings</h1>,
            },

            {
                path: "help",
                element: <h1>help</h1>,
            },

            {
                path: "logout",
                element: <></>,
            },
        ],
    },
]);
