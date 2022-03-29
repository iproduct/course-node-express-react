import './TodoList.css'
import React from 'react'
import PropTypes from 'prop-types'
import { ALL_STATUSES, ACTIVE, CANCELED, COMPLETED } from '../model/todo-model'
import TodoItem from './TodoItem'

const TodoList = ({ todos, filter, ...props }) => {
    return (
        <ul className="TodoList-items">
            {todos
            .filter(todo => todo.status === filter || filter === ALL_STATUSES)
            .map(todo => (
                <TodoItem key={todo.id} todo={todo} {...props} />
            ))}
        </ul>
    )
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        status: PropTypes.oneOf([ALL_STATUSES, ACTIVE, COMPLETED, CANCELED])
    })).isRequired,
    filter: PropTypes.number.isRequired
}

export default TodoList