import React from 'react'
import { Todo } from './Todo'


export const TodoList = ({todos}) => {
    return todos.map(todo =>
    (<Todo key={todo.id} todo={todo} className="card my-1" />)
    )
}


