import React, { ForwardedRef} from 'react';

type ClassComponentType<T, P> = T extends React.Component<P> ? {new (props: P): T} : never;
type ExoticComponentType<T, P> = React.ExoticComponent<P & React.RefAttributes<T>>;

function logPropsHOC<T, P>(WrappedComponent: ClassComponentType<T, P> | React.FunctionComponent<P> | ExoticComponentType<T, P>) {
  class LogProps extends React.Component<P & {fRef: ForwardedRef<T>}, {}> {
    componentDidUpdate(prevProps: P) {
      console.log('old props:', prevProps);
      console.log('new props:', this.props);
    }
    render() {
      return <WrappedComponent ref={this.props.fRef} {...this.props} />;
    }
  }
   return React.forwardRef<T, P>((props, fRef) => <LogProps fRef={fRef} {...props} />);
}

export default logPropsHOC;