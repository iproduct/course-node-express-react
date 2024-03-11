import React from 'react'

export const Todo = ({ todo, onDelete }) => {
  function remove(event) {
    onDelete(todo)
  }
  return (
    <div key={todo.id} className="card my-1 d-flex flex-row justify-content-between">
      <span className="btn-group">
        <span className="btn btn-primary">{todo.id}</span>
        <span className="btn btn-default">{todo.text}</span>
      </span>
      <span className="d-flexcol-1 align-items-center justify-content-center">
        <span  className="badge  text-bg-success">{todo.status}</span>
        <span className="btn btn-danger" onClick={remove}>Del</span>
      </span>
    </div>
  )
}
