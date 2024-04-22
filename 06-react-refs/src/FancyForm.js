import React from 'react';
import FancyButton from './FancyButton';
import logPropsHOC from './logPropsHOC';

class FancyForm extends React.Component {
  static displayName = 'FancyForm';
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.buttonRef = React.createRef();
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.buttonRef.current.focus();
    this.buttonRef.current.style.backgroundColor = this.props.color;
  }

  render() {
    return (
      <div>
        <h2 style={{color:this.props.color}}>Input Text (coror demo)</h2>
        <input type="text" ref={this.inputRef} />
        <FancyButton ref={this.buttonRef} onClick={this.props.onClick}>
          Click me <ul><li>NOW</li><li>OR NEVER</li></ul>!
        </FancyButton>
      </div>
    );
  }
}

export default logPropsHOC(FancyForm);
