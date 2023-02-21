import * as React from 'react';
import { Todo, TodoStatus } from '../model/todos';

interface TodoListProps {
    todos: Todo[];
}

export const TodoList = ({todos}: TodoListProps) => {
    return (
        <ul>
            {
                todos.map(todo => (
                    <li key={todo.id}>{todo.id}: {todo.text} - {TodoStatus[todo.status]}</li>
                ))   
            }
        </ul>
    );
}
