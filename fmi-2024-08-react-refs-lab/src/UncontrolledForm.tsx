import React, { Component } from 'react'

interface Props {
}
interface State {
}

export default class UncontrolledForm extends Component<Props, State> {
    inputRef = React.createRef<HTMLInputElement>();

    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        alert(`A name: '${this.inputRef.current?.value}' was sumitted.`);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name: 
                    <input type="text" ref={this.inputRef} />
                </label>
            <input type="submit" value="Submit" />
            </form>
        );
    }
}
