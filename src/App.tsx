import { ErrorBoundary } from "@/error";
import Provider from "~/contexts";
import { StrictMode } from "react";

function App() {
    return (
        <StrictMode>
            <ErrorBoundary>
                <Provider />
            </ErrorBoundary>
        </StrictMode>
    );
}

export default App;
