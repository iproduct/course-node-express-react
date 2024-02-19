import { Component } from 'react';
import './App.css';

class App extends Component{
  state = {
    counter: 0,
  }

  componentDidMount(){
    this.interval = setInterval(() => {
      this.setState(state => ({counter: state.counter + 1}))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Hello React - Class Components!</h1>
          <h2>Counter: {this.state.counter}</h2>
        </header>
      </div>
    );
  }
}

export default App;
