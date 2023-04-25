
import React, { Component } from 'react';

class UncontrolledFormClass extends Component<{}, {}> {
    inputRef = React.createRef<HTMLInputElement>();
    oldValue: string | undefined = undefined;
    handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = this.inputRef.current?.value;
        alert(`A name: ${value}, Changed: ${value !== this.oldValue}`);
        this.oldValue = value;
    }
    focus() {
        console.log("Focusing input:", this.inputRef.current);
        this.inputRef.current?.focus();
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Name:
                    <input ref={this.inputRef} />
                </label>
                <input type='submit' value='Submit' />
            </form>
        );
    }
}

export default UncontrolledFormClass;