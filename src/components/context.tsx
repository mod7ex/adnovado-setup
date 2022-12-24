import { createContext, useState, useContext } from "react";

type ContextValue = { theme?: boolean; set_theme?: React.Dispatch<React.SetStateAction<boolean>> };

const Context = createContext<ContextValue>({});

export const useTheme = () => {
    return useContext(Context);
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [theme, set_theme] = useState(false);

    return <Context.Provider value={{ theme, set_theme }}>{children}</Context.Provider>;
};

const App = () => {
    const { theme, set_theme } = useTheme();

    return (
        <>
            <h1>theme {theme ? "dark" : "light"}</h1>
            <button onClick={() => set_theme!((v) => !v)}>switch theme</button>
        </>
    );
};

export default App;
