import React, { useRef } from 'react';
import './App.css';

function App() {
  const inputRef = useRef();

  function focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    // this.textInput.current.focus();
    inputRef.current.focus();
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <input
        type="button"
        value="Focus the text input"
        onClick={focusTextInput}
      />
    </div>
  );
}

export default App;
