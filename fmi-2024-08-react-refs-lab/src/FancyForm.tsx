import React, { ComponentPropsWithRef, NamedExoticComponent, ComponentProps, RefObject, ReactElement, LegacyRef, Component } from 'react';
import FancyButton from './FancyButton';
import logPropsHOC from './logPropsHOC';

interface FancyFormProps {
  color: string;
  onClick: () => void;
}

export class FancyForm extends React.Component<FancyFormProps, {}> {
  static displayName = 'FancyForm';
  inputRef = React.createRef<HTMLInputElement>();
  buttonRef = React.createRef<HTMLButtonElement>();

  focusButton = () => {
    console.log(`Focusing button: ${this.buttonRef.current}`);
    this.buttonRef.current?.focus();
  }

  render() {
    return (
      <div>
        <h2 style={{ color: this.props.color }}>Input Text (color demo)</h2>
        <input type="text" placeholder="name" />
        <input type="number" ref={this.inputRef} placeholder="age" />
        <FancyButton ref={this.buttonRef} color={this.props.color} onClick={this.props.onClick}>
          Click <b>me</b> <i>now</i>!
        </FancyButton>
      </div>
    );
  }
}

export default logPropsHOC(FancyForm);
