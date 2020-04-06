import React from 'react';

function logPropsHOC(WrappedComponent) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }

    render() {
      const {forwardedRef, ...rest} = this.props;

      // Assign the custom prop "forwardedRef" as a ref
      return <WrappedComponent ref={forwardedRef} {...rest} />;
    }
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to LogProps as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardedRef={ref} />;
  });
}
  //   class LogProps extends React.Component {
  //     componentDidUpdate(prevProps) {
  //       console.log('old props:', prevProps);
  //       console.log('new props:', this.props);
  //     }
  
  //     render() {
  //       return <WrappedComponent {...this.props} />;
  //     }
  //   }
  
  //   return LogProps;
  // }

export default logPropsHOC;