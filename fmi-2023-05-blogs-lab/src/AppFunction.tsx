import './AppFunction.css';
import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';

interface AppProps {
    name: string;
}

export function AppFunction(props: AppProps) {
    const [count, setCount] = useState(0);
    const intervalRef: MutableRefObject<NodeJS.Timer | undefined> = useRef();
    const incrementCount = useCallback(
        () => {
            setCount(oldCount => oldCount + 1)
        }, []
    );
    useEffect(() => { //set effect callback
        intervalRef.current = setInterval(incrementCount, 1000);
      return () => { // clear effect callback 
        clearInterval(intervalRef.current);
      };
    }, [incrementCount]); // when incrementCount is changed

    return (
        <div className='App-root'>
            <h2>Hello {props.name}</h2>
            <h3>Count: {count}</h3>
            <button onClick={incrementCount}>Increment</button>
        </div>
    );
};
