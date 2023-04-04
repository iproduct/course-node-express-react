import React, { Component } from 'react';
import logo from './logo.svg';
import './AppClass.css';

interface AppProps {
  name: string;
}

interface AppState {
  count: number;
  message: string,
  error: string;
}

class AppClass extends Component<AppProps, AppState> {
  state: Readonly<AppState> = {
    count: 0,
    message: 'Hi',
    error: ''
  }
  interval: NodeJS.Timer | undefined = undefined;

  constructor(props: AppProps) {
    super(props);
    this.incrementCount = this.incrementCount.bind(this);
  }
  incrementCount() {
    this.setState(({ count }) => ({
      count: count + 1
    }));
  }
  componentDidMount(): void {
    this.interval = setInterval(this.incrementCount, 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Hello {this.props.name}</h2>
          <h3>Count: {this.state.count}</h3>
          <button onClick={this.incrementCount}>Increment</button>
        </header>
      </div>
    );
  }
}

export default AppClass;
