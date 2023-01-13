import { createBrowserRouter } from "react-router-dom";
import Auth from "~/pages/auth";
import Public from "~/router/Public";
import Private from "~/router/Private";
import Dashboard from "~/pages/dashboard";
import Profile from "~/pages/profile";
import Outer from "~/layouts/outer";
import { Form as ListingForm, Index as ListingsIndex } from "~/pages/listings";
import { RouterBoundary } from "@/error";

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
        errorElement: <RouterBoundary />,
        children: [
            {
                index: true,
                element: <Dashboard />,
                name: "Dashboard",
            },

            {
                path: "profile",
                element: <Profile />,
                name: "Profile",
            },

            {
                path: "settings",
                element: <h1>Settings</h1>,
                name: "Settings",
            },

            {
                path: "users",
                children: [
                    {
                        index: true,
                        element: <h1>Users</h1>,
                        name: "Users",
                    },
                    {
                        path: ":id",
                        children: [
                            {
                                index: true,
                                element: <h1>User id</h1>,
                                name: "User",
                            },
                            {
                                path: "edit",
                                element: <h1>edit User id</h1>,
                                name: "EditUser",
                            },
                            {
                                path: "delete",
                                name: "DeleteUser",
                            },
                        ],
                    },
                    {
                        path: "add",
                        element: <h1>Users id</h1>,
                        name: "AddUser",
                    },
                ],
            },

            /* {
                path: "customers",
                children: [
                    {
                        index: true,
                        element: <h1>Customers</h1>,
                        name: "Customers",
                    },
                    {
                        path: ":id",
                        children: [
                            {
                                index: true,
                                element: <h1>Customer id</h1>,
                                name: "Customer",
                            },
                            {
                                path: "edit",
                                element: <h1>edit Customer id</h1>,
                                name: "EditCustomer",
                            },
                            {
                                path: "delete",
                                name: "DeleteCustomer",
                            },
                        ],
                    },
                    {
                        path: "add",
                        element: <h1>Customers id</h1>,
                        name: "AddCustomer",
                    },
                ],
            }, */

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

export enum PAGES {
    AUTH = "Auth",
    DASHBOARD = "Dashboard",
    PROFILE = "Profile",
    SETTINGS = "Settings",
    USERS = "Users",
    USER = "User",
    EDITUSER = "EditUser",
    DELETEUSER = "DeleteUser",
    ADDUSER = "AddUser",
    CUSTOMERS = "Customers",
    CUSTOMER = "Customer",
    EDITCUSTOMER = "EditCustomer",
    DELETECUSTOMER = "DeleteCustomer",
    ADDCUSTOMER = "AddCustomer",
    LISTINGS = "Listings",
    LISTING = "Listing",
    EDITLISTING = "EditListing",
    DELETELISTING = "DeleteListing",
    ADDLISTING = "AddListing",
    HELP = "Help",
    LOGOUT = "Logout",
}
