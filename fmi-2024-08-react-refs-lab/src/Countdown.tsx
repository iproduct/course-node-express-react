import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import useEffectOnMount from './hooks/useEffectOnMount';

// Define the handle types which will be passed to the forwardRef
export type CountdownHandle = {
    start: () => void;
    stop: () => void;
    focus: () => void;
};

type CountdownProps = {};

const Countdown = forwardRef<CountdownHandle, CountdownProps>((props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        // start() has type inference here
        start() {
            console.log("Timer started")
            if (!interval.current) {
                interval.current = setInterval(() => {
                    setCounter(ctr => ctr + 1);
                }, 1000);
            }
        },
        stop() {
            console.log("Timer stopped")
            if (interval.current) {
                clearInterval(interval.current);
                interval.current = undefined;
            }
        },
        focus() {
            inputRef.current?.focus();
        }
    }));

    const [counter, setCounter] = useState(0);
    const interval = useRef<NodeJS.Timer>();

    useEffectOnMount(() => {
        interval.current = setInterval(() => {
            setCounter(ctr => ctr + 1);
        }, 1000);
        return () => {
            clearInterval(interval.current);
        }
    });

    return (
        <>
            <h2>Counter: {counter} </h2>
            <input ref={inputRef} />
        </>
    )
});

export default Countdown;