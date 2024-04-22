import React from 'react';
import './App.css';

// import FancyButton from './FancyButton';
import FancyForm from './FancyForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
    this.state= {
      color: 'green'
    };
  }

  focus = () => {
    this.setState(state => ({color: (state.color === 'red'? 'blue': 'red')}));
    this.ref.current.focusInput();

  }

  render() {
    return (
      <FancyForm ref={this.ref} color={this.state.color} onClick={this.focus}></FancyForm>
    );
  }
  }

export default App;
