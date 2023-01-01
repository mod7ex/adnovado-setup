import ErrorBoundary from "@/error-boundary";
import { RouterProvider } from "~/contexts";
// import Context, { ThemeProvider } from "@/context";

function App() {
    return (
        <ErrorBoundary>
            <RouterProvider />
        </ErrorBoundary>
    );
}

// function App() {
//     return (
//         <ThemeProvider>
//             <Context />
//         </ThemeProvider>
//     );
// }

export default App;
