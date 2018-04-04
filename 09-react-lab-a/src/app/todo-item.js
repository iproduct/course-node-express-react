import React from 'react';

const TodoItem = ({todo, index, onStateChange}) => (
    <li key={todo.id}><span className="id">{index}. </span>
            {todo.title}</li>);

export default TodoItem;
