import React from 'react';
import TodoItem from './todo-item';

export default ({todos, ...props}) => (
    <ul className="todo-list">
        { todos.map((todo, index) => (<TodoItem todo={todo} index={index} {...props} key={todo.id}></TodoItem>)) }
    </ul>
);
