import { useEffect, useState } from "react";

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
    const [users, setUsers] = useState<User[]>([]);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch(() => setError("Something went wrong !"));
    }, []);

    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Users</h1>

            <ul>
                {users?.map(({ name, id }) => (
                    <li key={id}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Http;
