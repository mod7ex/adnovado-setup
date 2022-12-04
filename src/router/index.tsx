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
                element: (
                    <Inner>
                        <Dashboard />
                    </Inner>
                ),
            },

            {
                path: "profile",
                element: (
                    <Inner>
                        <h1>Profile</h1>
                    </Inner>
                ),
            },

            {
                path: "settings",
                element: (
                    <Inner>
                        <h1>Settings</h1>
                    </Inner>
                ),
            },

            {
                path: "orders",
                children: [
                    {
                        index: true,
                        element: (
                            <Inner>
                                <h1>Orders</h1>
                            </Inner>
                        ),
                    },
                    {
                        path: ":id",
                        element: (
                            <Inner>
                                <h1>Orders id</h1>
                            </Inner>
                        ),
                    },
                ],
            },

            {
                path: "listings",
                element: (
                    <Inner>
                        <h1>Listings</h1>
                    </Inner>
                ),
            },

            {
                path: "help",
                element: (
                    <Inner>
                        <h1>help</h1>
                    </Inner>
                ),
            },

            {
                path: "logout",
            },
        ],
    },
]);
