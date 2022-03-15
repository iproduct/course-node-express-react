import './TodoList.css'
import React from 'react'
import PropTypes from 'prop-types'
import { ALL_STATUSES, ACTIVE, CANCELED, COMPLETED, TodoStatus } from '../model/todo-model'

const TodoList = ({ todos }) => {
    return (
        <ul className="TodoList-items">
            {todos.map(todo => (
                <li key={todo.id}>{todo.id}: {todo.text} - {TodoStatus[todo.status]}</li>
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