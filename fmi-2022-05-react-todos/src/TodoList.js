import React from 'react';
import Todo from './Todo';

const TodoList = ({todos, ...rest}) =>
    (<ul className="list-group">
        {todos.map(
            todo => (<li key={todo.id} className="list-group-item">
                <Todo todo={todo} {...rest} />
            </li>)
        )}
    </ul>);

export default TodoList;