import React from 'react';
import FancyButton from './FancyButton';
import logPropsHOC from './logPropsHOC';

class FancyForm extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.buttonRef = React.createRef();
    this.focusInput = this.focusInput.bind(this);
  }

  focusInput() {
    this.inputRef.current.focus();
    this.buttonRef.current.style.backgroundColor = this.props.color;
  }

  render() {
    return (
      <div>
        <input type="text" ref={this.inputRef} />
        <FancyButton ref={this.buttonRef} onClick={this.props.onClick}>
          Click me!
        </FancyButton>
      </div>
    );
  }
}

export default logPropsHOC(FancyForm);
