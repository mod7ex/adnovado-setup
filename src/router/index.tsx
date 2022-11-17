import { createBrowserRouter, Outlet } from "react-router-dom";
import Auth from "~/pages/auth";

export default createBrowserRouter([
    {
        path: "/auth",
        element: <Auth />,
        children: [],
    },
    {
        path: "/",
        element: (
            <>
                <h3>inner</h3>
                <hr />
                <Outlet />
            </>
        ),
        children: [
            {
                index: true,
                element: <h1>Dashboard</h1>,
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
                element: <h1>Orders</h1>,
                children: [
                    {
                        path: ":id",
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
            },
        ],
    },
]);
