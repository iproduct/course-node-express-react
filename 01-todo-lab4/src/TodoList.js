import React from 'react';

const TodoList = ({todos, ...rest}) => {
    return (
        <ul className="list-group">
            {
                todos.map(todo => (<li>{todo.text} - {todo.status}</li>))
            }
        </ul>
    );
}

export default TodoList;

