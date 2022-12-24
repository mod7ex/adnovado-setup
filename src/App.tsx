// import { RouterProvider } from "react-router-dom";
// import router from "~/router";
// import Increment from "@/increment";
import Context, { ThemeProvider } from "@/context";

// function App() {
//     return <RouterProvider router={router} />;
// }

function App() {
    return (
        <ThemeProvider>
            <Context />
        </ThemeProvider>
    );
}

export default App;
