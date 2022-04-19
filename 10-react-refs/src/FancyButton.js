import React from 'react';

const FancyButton = React.forwardRef((props, ref) => {
  const { children, ...other } = props;
  return (
    <button {...other} ref={ref} className="FancyButton">
      {props.children}
    </button>
  );
});

export default FancyButton;