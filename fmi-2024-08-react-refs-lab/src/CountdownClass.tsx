import React, { Component, forwardRef, useImperativeHandle, useRef, useState } from 'react'
import useEffectOnMount from './hooks/useEffectOnMount';

// Define the handle types which will be passed to the forwardRef
export type CountdownHandle = {
    start: () => void;
    focus: () => void;
};

type CountdownState = {
    counter: number,
};

// const Countdown = forwardRef<CountdownHandle, CountdownProps>((props, ref) => {

class CountdownClass extends Component<{}, CountdownState> {
    interval: NodeJS.Timer | undefined;
    inputRef = React.createRef<HTMLInputElement>();

    state: CountdownState = {
        counter: 0,
    }

    componentDidMount(): void {
        this.interval = setInterval(() => {
            this.setState(({ counter }) => ({ counter: counter + 1 }));
        }, 1000);
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    start = () => {
        console.log("Timer started")
        if (!this.interval) {
            this.interval = setInterval(() => {
                this.setState(({ counter }) => ({ counter: counter + 1 }));
            }, 1000);
        }
    }

    stop = () => {
        console.log("Timer stopped")
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = undefined;
        }
    }

    focus = () => {
        console.log("Focus to second input")
        if (this.inputRef) {
           this.inputRef.current?.focus();
        }
    }

    render() {
        return (
            <>
                <h2>Counter: {this.state.counter} </h2>
                <input />
                <input ref={this.inputRef} />
            </>
        )
    };
}

export default CountdownClass;