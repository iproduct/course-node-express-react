import React from 'react';
import './App.css';

// import FancyButton from './FancyButton';
import FancyForm from './FancyForm';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  focus = () => {
    this.ref.current.focusInput();
  }

  render() {
    return (
      <FancyForm ref={this.ref} onClick={this.focus}></FancyForm>
    );
  }
  }

export default App;
