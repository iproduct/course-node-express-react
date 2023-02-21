import React, { Component } from 'react';

interface AppProps {
    name: string;
}

interface AppState {
    counter: number;
}

export class AppClass extends Component<AppProps, AppState> {
    state: Readonly<AppState> = {
        counter: 0
    };
    interval: NodeJS.Timer | undefined;
    componentDidMount() {
        this.interval = setInterval(() => this.setState(state => ({counter: state.counter + 1})), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.interval)
    }
        
    public render() {
        return (
            <div>
                <h2>Hello {this.props.name}, from AppClass Component!</h2>
                <h2>Counter: {this.state.counter}</h2>
                {/* <button onClick={() => this.setState(state => ({counter: state.counter + 1}))}>
                    <h2>Update Counter</h2>
                </button> */}
            </div>
        );
    }
}
