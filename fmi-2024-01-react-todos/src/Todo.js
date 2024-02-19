import React from 'react'

export const Todo = (todo) => {
  return (
    <div key={todo.id} className="card my-1">
        <div className="card-body d-flex flex-row justify-content-between">
          <span>
            <span>{todo.id}</span>
            <span>{todo.text}</span>
          </span>
          <span>{todo.status}</span>
        </div>
      </div>
  )
}
