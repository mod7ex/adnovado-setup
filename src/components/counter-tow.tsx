type Props = {
    count?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
};

const Counter: React.FC<Props> = ({ count, onDecrement, onIncrement }) => {
    return (
        <div>
            <h1>Counter Tow</h1>
            <p>{count ?? null}</p>

            {onIncrement && <button onClick={() => onIncrement()}>increment</button>}
            {onDecrement && <button onClick={() => onDecrement()}>decrement</button>}
        </div>
    );
};

export default Counter;
