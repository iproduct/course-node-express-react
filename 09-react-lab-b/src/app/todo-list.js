import React from 'react';

export default ({todos}) => (
    <ul className="todo-list">
        { todos.map(todo => (<li key={todo.id}><span className="id">{todo.id}. </span>
            {todo.title} - {todo.status} 
            <span className="buttons">...</span>
        </li>)) }
    </ul>
);
