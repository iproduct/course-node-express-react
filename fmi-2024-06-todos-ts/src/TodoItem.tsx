import React from 'react'
import { Todo } from './todo-model';

type TodoitemProps = {
    todo: Todo;
}

const TodoItem = ({todo}: TodoitemProps) => {
  return (
    <div key={todo.id} className="card my-1 d-flex flex-row justify-content-between">
    <span className="btn-group">
      <span className="btn btn-primary">{todo.id}</span>
      <span className="btn btn-default">{todo.text}</span>
    </span>
    <span className="d-flexcol-1 align-items-center justify-content-center">
      <span  className="badge  text-bg-success">{todo.status}</span>
      <span className="btn btn-danger" onClick={() => {}}>Del</span>
    </span>
  </div>
  )
}

export default TodoItem