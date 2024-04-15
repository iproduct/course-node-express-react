import React from 'react'
import { Todo, TodoStatus } from './todo-model';

type TodoitemProps = {
    todo: Todo;
    index: number;
    onDelete: (todo: Todo) => void;
}

const TodoItem = ({ todo, index, onDelete }: TodoitemProps) => {
    return (
        <div key={todo.id} className="card my-1 d-flex flex-row justify-content-between">
            <span className="btn-group">
                <span className="btn btn-primary">{index}</span>
                <span className="btn btn-default">{todo.text}</span>
            </span>
            <span className="align-items-center justify-content-between">
                <span className="badge  bg-secondary py-2 ms-2">{TodoStatus[todo.status]}</span>
                <span className="btn btn-danger ms-2" onClick={(event) => {onDelete(todo)}}>Del</span>
            </span>
        </div>
    )
}

export default TodoItem