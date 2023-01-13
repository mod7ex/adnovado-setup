import { RouterProvider } from "react-router-dom";
import { router } from "~/router";

const Provider = () => {
    return <RouterProvider router={router} />;
};

export default Provider;
