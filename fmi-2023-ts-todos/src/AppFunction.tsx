import React, { useState } from 'react';

interface AppProps {
    name: string;
}

export function AppFunction(props: AppProps) {
    const [counter, setCounter] = useState<number>(0);
    return (
        <div>
            <h2>Hello {props.name}, from AppFunction Component!</h2>
            <h2>Counter:{counter}</h2>
            <button onClick={() => setCounter(oldval => oldval + 1 )}>
                <h2>Update Counter</h2>
            </button>
        </div>
    );
}
