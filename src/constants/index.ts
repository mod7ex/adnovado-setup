export const MODE = {
    TEST: import.meta.env.TEST_MODE === "true",
    PROD: import.meta.env.PROD,
    DEV: import.meta.env.DEV,
    STRICT_DEV: import.meta.env.DEV && !(import.meta.env.TEST_MODE === "true"),
};

export const HOSTNAME = import.meta.env.VITE_HOSTNAME;
export const APP_NAME = import.meta.env.VITE_APP_TITLE;

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
