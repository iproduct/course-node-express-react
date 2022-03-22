import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Todo } from '../model/todo-model'

export default class TodoInput extends Component {
    static propTypes = {
        onSubmitTodo: PropTypes.func.isRequired
    }
    state = {
        text: ''
    }
    submitTodo = (event) => {
        event.preventDefault();
        const text = this.state.text.trim();
        if (text.length > 0) {
            this.setState({ text: '' })
            this.props.onSubmitTodo(new Todo(text));
        }
    }
    changeText = (event) => {
        this.setState({ text: event.target.value })
    }
    render() {
        return (
            <form className="TodoInput-form" onSubmit={this.submitTodo}>
                <input id="text" type="text" placeholder="What to do next?"
                    value={this.state.text} onChange={this.changeText} />
                <button className="button button1" type="submit">Submit TODO</button>
            </form>
        )
    }
}
