import React, { useRef } from 'react';
import './App.css';
import Countdown, { CountdownHandle } from './components/Countdown';

function App() {
  const ref1 = useRef<CountdownHandle>(null);
  const ref2 = useRef<CountdownHandle>(null);
  return (
    <div className="App">
      <header className="App-header">
        <Countdown ref={ref1} start={10}/>
        <Countdown ref={ref2}/>
        <button onClick={() => {ref1.current?.start()}}>Alert 1</button>
        <button onClick={() => {ref2.current?.start()}}>Alert 2</button>
        <button onClick={() => {ref1.current?.focus()}}>Focus 1</button>
        <button onClick={() => {ref2.current?.focus()}}>Focus 2</button>
      </header>
    </div>
  );
}

export default App;
