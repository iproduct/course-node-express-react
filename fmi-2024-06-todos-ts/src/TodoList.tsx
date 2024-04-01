import React from 'react'
import { Todo } from './todo-model'

type TodoListProps = {
    todos: Todo[]
}

export default function TodoList({todos}: TodoListProps) {
  return (
    <div>TodoList</div>
  )
}