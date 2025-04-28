import { useRef } from 'react';
import './App.css';
import Countdown, { CountdownHandle } from './Countdown';
// import CountdownClass from './CountdownClass';

function CountDownApp() {
  const ref = useRef<CountdownHandle>(null);
  return (
    <div className="App">
      <header className="App-header">
        <Countdown ref={ref}/>
        <button onClick={() => {ref.current?.start()}}>Start</button>
        <button onClick={() => {ref.current?.stop()}}>Stop</button>
        <button onClick={() => {ref.current?.focus()}}>Focus</button>
      </header>
    </div>
  );
}

export default CountDownApp;
