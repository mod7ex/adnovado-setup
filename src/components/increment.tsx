import { useState } from "react";

const Increment = () => {
    const [v, setV] = useState(0);
    const [amount, setAmount] = useState(0);

    return (
        <>
            <h1>{v}</h1>
            <button onClick={() => setV((v) => v + 1)}> Increment </button>

            <hr />

            <input type="number" name="number" value={amount} onChange={(e) => setAmount(parseInt(e.target.value))} />
            <button onClick={() => setV(amount)}>Set</button>
        </>
    );
};

export default Increment;
