import React from "react";

const i18n = (v: string) => `${v}`;

type Props = { children: (v: typeof i18n) => React.ReactNode };

const Trans: React.FC<Props> = ({ children }) => <>{children(i18n)}</>;

export default () => {
    return { i18n, Trans };
};
