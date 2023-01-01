import { RouterProvider } from "react-router-dom";
import { default as raw_router } from "~/router";

const Provider: React.FC<{ router?: typeof raw_router }> = ({ router = raw_router }) => {
    return <RouterProvider router={router} />;
};

export default Provider;
