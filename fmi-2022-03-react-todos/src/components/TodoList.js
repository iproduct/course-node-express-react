import './TodoList.css'
import React from 'react'
import PropTypes from 'prop-types'
import { ALL_STATUSES, ACTIVE, CANCELED, COMPLETED, TodoStatus } from '../model/todo-model'
import TodoItem from './TodoItem'

const TodoList = ({ todos }) => {
    return (
        <ul className="TodoList-items">
            {todos.map(todo => (
                <TodoItem key={todo.id} todo={todo} />
            ))}
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        status: PropTypes.oneOf([ALL_STATUSES, ACTIVE, COMPLETED, CANCELED])
    })).isRequired
}

export default TodoList