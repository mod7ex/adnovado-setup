import useTranslation from "~/hooks/useTranslation";

type Props = { children: (v: (c: string) => string) => React.ReactNode };

const Translate: React.FC<Props> = ({ children }) => {
    const { i18n } = useTranslation();

    return <>{children(i18n)}</>;
};

export default Translate;
