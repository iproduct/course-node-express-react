import React from 'react';
import { useState } from "react"
import { Active, Canceled, Completed, Todo, TodoStatus } from "./todo-model"

const TodoInput = ({ onCreateTodo, onError }) => {
    const [text, setText] = useState('');
    const [status, setStatus] = useState('active');

    function submitTodo(event) {
        event.preventDefault();
        if (text.length === 0) {
            onError(`All field are required`)
            return;
        }
        const created = new Todo(text, status);
        onCreateTodo(created);
        reset();
    }

    function reset(event) {
        setText('');
        setStatus('active');
        onError(undefined);
    }

    return (
        <form className='TodoInput-form row row-cols-lg-auto g-3 align-items-center' onSubmit={submitTodo} onReset={reset}>
            <div className="input-group">
                <input className="form-control ms-1 col-8" type="text" placeholder="What to do?" value={text} onChange={(event) => { setText(event.target.value) }} />
                <select className="form-select ms-1 col-3" placeholder="Todo status" value={status} onChange={(event) => { setStatus(event.target.value) }}>
                    <option value="active">Active</option>
                    <option value="completed">Completed</option>
                    <option value="canceled">Canceled</option>
                </select>
                <button type="submit" className="btn btn-primary ms-1 ">Submit</button>
                <button type="reset" className="btn btn-danger ms-1 ">Reset</button>
            </div>
        </form>
    )
}

export default TodoInput;