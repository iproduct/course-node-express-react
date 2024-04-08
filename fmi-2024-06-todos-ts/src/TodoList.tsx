import React from 'react'
import { Todo } from './todo-model'
import TodoItem from './TodoItem'

type TodoListProps = {
    todos: Todo[]
}

export default function TodoList({todos}: TodoListProps) {
  return (
    <div>{todos.map((td, index) => (<TodoItem key={td.id} todo={td} index={index + 1} />))}</div>
  )
}