import * as React from 'react';
import './AppFunction.css';

interface AppProps {
    name: string;
}

export function AppFunction(props: AppProps) {
    return (
      <div className='App-root'>
        <h2>Hello {props.name}</h2>
      </div>
    );
};
