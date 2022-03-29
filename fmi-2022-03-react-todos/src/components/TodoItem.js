import './TodoItem.css'
import React from 'react'
import PropTypes from 'prop-types'
import { ALL_STATUSES, ACTIVE, CANCELED, COMPLETED, TodoStatus } from '../model/todo-model'

const TodoItem = ({ todo, onDelete, onStatusChange }) => {
    function statusChanged(newStatus) {
        onStatusChange({ ...todo, status: newStatus })
    }
    return (
        <div className="TodoItem">
            <span className='TodoItem-text'>
                <span className='TodoItem-id'>
                    {todo.id}
                </span>
                {todo.text}
            </span>
            <span className='TodoItem-right'>
                <span className='TodoItem-status'>
                    {TodoStatus[todo.status]}
                </span>
                <span className="TodoItem-button fas fa-check-circle" title="Complete Todo"
                    onClick={() => statusChanged(COMPLETED)} />
                <span className="TodoItem-button danger fas fa-ban" title="Cancel Todo"
                    onClick={() => statusChanged(CANCELED)} />
                <span className="TodoItem-button danger fas fa-times-circle" title="Delete Todo"
                    onClick={() => onDelete(todo)} />
            </span>
        </div>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        status: PropTypes.oneOf([ALL_STATUSES, ACTIVE, COMPLETED, CANCELED])
    }),
    onDelete: PropTypes.func.isRequired,
    onStatusChange: PropTypes.func.isRequired
}

export default TodoItem