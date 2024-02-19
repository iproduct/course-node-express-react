import React from 'react'

export const Todo = ({ todo }) => {
  return (
    <div key={todo.id} className="card my-1 d-flex flex-row justify-content-between">
      <span className="btn-group">
        <span className="btn btn-primary">{todo.id}</span>
        <span className="btn btn-default">{todo.text}</span>
      </span>
      <span className="d-flex badge text-bg-success col-1 align-items-center justify-content-center">
        {todo.status}
      </span>
    </div>
  )
}
