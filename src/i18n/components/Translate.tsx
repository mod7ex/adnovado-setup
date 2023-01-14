import { useTranslate, DICTIONARY_NAMESPACES } from "~/i18n";

type Props = {
    children: (args: ReturnType<typeof useTranslate>) => React.ReactNode;
    ns: Parameters<typeof useTranslate>[0];
};

const Translate = ({ children, ns }: Props) => <>{children(useTranslate(ns))}</>;

export default Translate;
