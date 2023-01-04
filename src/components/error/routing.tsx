import { useRouteError } from "react-router-dom";

const Boundary = () => {
    let error = useRouteError();
    console.error(error);

    return (
        <>
            <div>Dang!</div>
            <p>{JSON.stringify(error)}</p>
        </>
    );
};

export default Boundary;
