import React from 'react';

export class TodoApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { todos: ['Todo 1', 'Todo 2', 'Todo 3', 'Todo 4', 'Todo 5'] };
    }
    
    render() {
        return (
            <div className="container">
                <div className="row">
                    <h2>React TODOs Demo</h2> 
                </div>
            </div>
    }
}