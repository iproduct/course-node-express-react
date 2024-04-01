import React from 'react'
import { Todo } from './todo-model'
import TodoItem from './TodoItem'

type TodoListProps = {
    todos: Todo[]
}

export default function TodoList({todos}: TodoListProps) {
  return (
    <div>{todos.map(td => (<TodoItem todo={td} />))}</div>
  )
}