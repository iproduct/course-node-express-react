import React from 'react';
import './App.css';
import { useRef } from 'react';

function AppUncontrolled() {
  const inputRef = useRef();

  function handleSubmit(event) {
    console.log(inputRef);
    alert('A name was submitted: ' + inputRef.current.value);
    event.preventDefault();
  }

  return (<form onSubmit={handleSubmit}>
    <label>
      Name:
      <input type="text" ref={inputRef} />
    </label>
    <input type="submit" value="Submit" />
  </form>
  );
}

export default AppUncontrolled;
