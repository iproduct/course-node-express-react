import './TodoItem.css'
import React from 'react'
import PropTypes from 'prop-types'
import { ALL_STATUSES, ACTIVE, CANCELED, COMPLETED, TodoStatus } from '../model/todo-model'

const TodoItem = ({ todo }) => {
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
                <span className='TodoItem-buttons'>
                    <button type="button" onClick={() => { }}>DELETE</button>
                </span>
            </span>
        </div>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        status: PropTypes.oneOf([ALL_STATUSES, ACTIVE, COMPLETED, CANCELED])
    })
}

export default TodoItem