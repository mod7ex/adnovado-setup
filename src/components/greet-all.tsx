import { useEffect, useState } from "react";

export type Skills = string[];

const GreetAll: React.FC<{ skills: Skills }> = ({ skills }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsLoggedIn((v) => !v);
        }, 1001);
    }, []);

    return (
        <>
            <ul>
                {skills.map((skill, key) => (
                    <li key={key}>{skill}</li>
                ))}
            </ul>
            {isLoggedIn ? <button>Start learning</button> : <button onClick={() => setIsLoggedIn(true)}>Login</button>}
        </>
    );
};

export default GreetAll;
