import store from "~/store";
import { Provider } from "react-redux";
import React from "react";

const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
