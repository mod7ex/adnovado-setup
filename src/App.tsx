import { RouterProvider } from "react-router-dom";
import router from "~/router";
// import GreetAll from "@/greet-all";

function App() {
    return <RouterProvider router={router} />;
}

// function App() {
//     return <GreetAll skills={["ar", "fr", "en"]} />;
// }

export default App;
