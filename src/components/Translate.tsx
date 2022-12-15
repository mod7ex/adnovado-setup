import { useContext } from "react";
import { Language } from "~/contexts";

type Props = { children: (v: (c: string) => string) => React.ReactNode };

const Translate: React.FC<Props> = ({ children }) => {
    const { i18n } = useContext(Language);

    return <>{children(i18n!)}</>;
};

export default Translate;
