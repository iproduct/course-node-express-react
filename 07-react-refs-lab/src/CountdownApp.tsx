import React, { useRef } from 'react';
import './App.css';
import Countdown, { CountdownHandle } from './components/Countdown';

function App() {
  const ref = useRef<CountdownHandle>(null);
  return (
    <div className="App">
      <header className="App-header">
        <Countdown ref={ref}/>
        <button onClick={() => {ref.current?.start()}}>Alert</button>
        <button onClick={() => {ref.current?.focus()}}>Focus</button>
      </header>
    </div>
  );
}

export default App;
