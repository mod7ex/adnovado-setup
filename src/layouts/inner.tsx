import React from "react";

const Outer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <main>{children}</main>;
};

export default Outer;
