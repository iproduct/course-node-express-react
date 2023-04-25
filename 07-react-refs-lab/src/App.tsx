import React, { Component, ComponentClass, ComponentElement, ComponentProps, ComponentType, useRef, useState} from 'react';
import './App.css';
import FForm,  {FancyForm} from './components/FancyForm';


function App() {
  const [color, setColor] = useState<string>('green');
  const formRef = useRef<FancyForm>(null);
  const focus = () => {
    setColor(col => (col === 'red' ? 'blue' : 'red'));
    formRef.current?.focusButton();
  }
  return (
    <div className="App">
      <header className="App-header">
        <FForm ref={formRef} color={color} onClick={focus} />
      </header>
    </div>
  );
}

export default App;

