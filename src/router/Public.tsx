import React from "react";

import { Navigate } from "react-router-dom";

const Public: React.FC<{ children: React.ReactElement; auth?: boolean }> = ({ children, auth }) => {
    return auth ? <Navigate to="/" /> : children;
};

export default Public;
