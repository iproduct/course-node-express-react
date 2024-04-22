import React from 'react';
import './App.css';
import { useRef } from 'react';
import { useState } from 'react';

function AppControlled() {
  const [name, setName] = useState('abcd');

  function handleSubmit(event) {
    console.log(name);
    alert('A name was submitted: ' + name);
    event.preventDefault();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={event => setName(event.target.value)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <p>{name}</p>
    </>
  );
}

export default AppControlled;
