import React, { Component } from 'react';
import { Todo } from '../model/todos';
import { MOCK_TODOS } from '../model/mock-todos';
import { TodoList } from './TodoList';

interface AppState {
    todos: Todo[];
}

export class TodoAppClass extends Component<{}, AppState> {
    state: Readonly<AppState> = {
        todos: MOCK_TODOS
    };
        
    public render() {
        return (
            <div>
                <h2>Todos List</h2>
                <TodoList todos={this.state.todos} />
            </div>
        );
    }
}
