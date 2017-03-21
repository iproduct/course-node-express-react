import React from 'react';

export default (props) => (
  <ul>
    {props.todos.map(
      todo => (<li key={todo.id}>{todo.text}</li>)
    )}
  </ul>
);
