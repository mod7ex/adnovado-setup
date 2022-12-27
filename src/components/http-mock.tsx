import useAsync from "~/hooks/useAsync";

type User = {
    id: number;
    name?: string;
    username?: string;
    email?: string;
    address: {
        street?: string;
        suite?: string;
        city?: string;
        zipcode?: string;
        geo: {
            lat?: string;
            lng?: string;
        };
    };
    phone?: string;
    website?: string;
    company: {
        name?: string;
        catchPhrase?: string;
        bs?: string;
    };
};

const Http = () => {
    const { value, error, pending } = useAsync<User[]>(async () => {
        const res = await fetch("https://jsonplaceholder.typicode.com/users");
        return await res.json();
    });

    if (pending) return <p>loading ...</p>;

    if (error) return <p>{JSON.stringify(error, null, 2)}</p>;

    return (
        <div>
            <h1>Users</h1>

            <ul>
                {value?.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Http;
