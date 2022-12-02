type RawProps = React.ComponentPropsWithoutRef<"svg">;

interface Props extends RawProps {}

const Wrapper: React.FC<Props> = ({ children, width = 2, height = 2, ...rest }) => {
    return (
        <svg
            style={{
                width: `${width}rem`,
                height: `${height}rem`,
            }}
            {...rest}
        >
            {children}
        </svg>
    );
};

export default Wrapper;
