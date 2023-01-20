import { useEffect, useRef } from "react";

export default () => {
    let count = useRef<number>(1);

    useEffect(() => {
        count.current++;
    });

    return count.current;
};
