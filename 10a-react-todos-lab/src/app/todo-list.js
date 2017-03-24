import React from 'react';

const TodoList  = (props) => (
  <ul>
      {props.todos.map(
        todo => (<li key={todo.id}> {todo.text}</li>)
      )}
  </ul>
);

export default TodoList;