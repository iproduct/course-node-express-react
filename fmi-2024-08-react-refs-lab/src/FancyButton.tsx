import React, { forwardRef } from 'react';
import './FancyButton.css';
import logPropsHOC from './logPropsHOC';

type FancyButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const FancyButton = forwardRef<HTMLButtonElement, FancyButtonProps>((props: FancyButtonProps, fRef) => {
  const { children, color, ...other } = props;
  return (
    <button {...other} ref={fRef} className="FancyButton"  style={{ backgroundColor: color }}>
      {props.children}
    </button>
  );
});

export default FancyButton;