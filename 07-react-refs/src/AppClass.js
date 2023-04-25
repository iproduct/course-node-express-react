import React from 'react';
import './App.css';

class AppClass extends React.Component {
  textInputRef = React.createRef();
  state = {background: "white"};
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // Explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    // this.textInput.current.focus();
    this.textInputRef.current.focus();
    // this.textInputRef.current.style.background="yellow";
    this.setState({background: "green"})
  }

  render() {
    // tell React that we want to associate the <input> ref
    // with the `textInput` that we created in the constructor
    return (
      <div>
        <input type="text" ref={this.textInputRef} style={this.state} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

export default AppClass;
