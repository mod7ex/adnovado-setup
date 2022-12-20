const Greed: React.FC<{ name?: string }> = ({ name }) => {
    if (name)
        return (
            <div>
                Greed {name} {"(:"}
            </div>
        );

    return <div>Greed</div>;
};

export default Greed;
