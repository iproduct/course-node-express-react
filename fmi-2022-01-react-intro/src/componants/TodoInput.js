import { Component } from "react";
import { Todo } from "../model/todo-model";
import PropTypes from 'prop-types';

export default class TodoInput extends Component {
    static propTypes ={
        onCreateTodo: PropTypes.func.isRequired
    }

    state = {
        text: ''
    }

    handleTextChanged = (event) => {
        this.setState({text: event.target.value})
    }

    handleTodoSubmit = (event) => {
        event.preventDefault();
        const text = this.state.text.trim();
        if(text.length > 0){
            this.props.onCreateTodo(new Todo(text))
            this.setState({text: ''})
        }
    }

    render() {
        return (
            <form className="TodoInput-container" onSubmit={this.handleTodoSubmit} >
                <label htmlFor="TodoInput-text">What to do next?</label>
                <input type="text" id="TodoInput-text" name="TodoInput-text" value={this.state.text} 
                    onChange={this.handleTextChanged} />
                <button className="button button5" type="submit">Submit</button>
            </form>
        );
    }
}