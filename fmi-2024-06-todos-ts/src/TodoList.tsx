import React, { useMemo } from 'react'
import { Todo, TodoStatus } from './todo-model'
import TodoItem from './TodoItem'
import { TodoFilterType } from './TodoFilter';

type TodoListProps = {
    todos: Todo[],
    filter: TodoStatus | undefined;
    onDelete: (todo: Todo) => void;
}

export default function TodoList({todos, filter, ...rest}: TodoListProps) {
  const visibleTodos = useMemo(
    () => ((tds: Todo[] , fltr: TodoFilterType) => todos.filter(td => !filter || filter === td.status)),
    [todos, filter]
  );
  return (
    <div>{
      visibleTodos(todos, filter).map((td, index) => (<TodoItem key={td.id} todo={td} index={index + 1} {...rest} />))}</div>
  )
}