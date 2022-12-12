import { createBrowserRouter } from "react-router-dom";
import Auth from "~/pages/auth";
import Private from "~/router/Private";
import Public from "~/router/Public";
import Dashboard from "~/pages/dashboard";
import Outer from "~/layouts/outer";
import { Form as ListingForm, Index as ListingsIndex } from "~/pages/listings";
import { Fallback as ErrorPage } from "@/error-boundary";

const auth = true;

export const routes = [
    {
        path: "/auth",
        name: "Auth",
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
                name: "Dashboard",
            },

            {
                path: "profile",
                element: <h1>Profile</h1>,
                name: "Profile",
            },

            {
                path: "settings",
                element: <h1>Settings</h1>,
                name: "Settings",
            },

            {
                path: "orders",
                children: [
                    {
                        index: true,
                        element: <h1>Orders</h1>,
                        name: "Orders",
                    },
                    {
                        path: ":id",
                        element: <h1>Orders id</h1>,
                        name: "Order",
                    },
                    {
                        path: "add",
                        element: <h1>Orders id</h1>,
                        name: "AddOrder",
                    },
                ],
            },

            {
                path: "listings",
                children: [
                    {
                        index: true,
                        element: <ListingsIndex />,
                        name: "Listings",
                    },
                    {
                        path: ":id",
                        children: [
                            {
                                index: true,
                                element: <ListingForm />,
                                name: "Listing",
                            },
                            {
                                path: "edit",
                                element: <ListingForm />,
                                name: "EditListing",
                            },
                            {
                                path: "delete",
                                name: "DeleteListing",
                            },
                        ],
                    },
                    {
                        path: "add",
                        element: <h1>Listing id</h1>,
                        name: "AddListing",
                    },
                ],
            },

            {
                path: "help",
                element: <h1>help</h1>,
                name: "Help",
            },

            {
                path: "logout",
                name: "Logout",
            },
        ],
    },
];

export default createBrowserRouter(routes);
