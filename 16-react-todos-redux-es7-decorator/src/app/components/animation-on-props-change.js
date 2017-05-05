import React from 'react';
import { PropTypes } from 'prop-types';
import shallowEquals from '../common/utils/shallow-equals';

class AnimationOnPropsChange extends React.Component {
  static propTypes = {
    children: PropTypes.element
  };

  constructor(props) {
    super(props);
    this.state = { currentProps: props, nextProps: props, classes: [], active: false };
  }

  componentWillReceiveProps({shouldFadeOut, ...nextProps}) {
    if (!shallowEquals(nextProps, this.state.nextProps)) {
      if(shouldFadeOut)
        this.setState({ nextProps, classes: ['fade-out'], active: true });
      else {
        this.setState({ currentProps: nextProps, nextProps, classes: ['fade-in'], active: true });
      }
    }
  }

  handleAnimationEnd = (e) => {
    console.log('Animation End: ', e);
    if (e.animationName && e.animationName === 'fadeout' && this.state.active) {
      if( this.props.shouldFadeIn )
        this.setState(prevState => ({ currentProps: prevState.nextProps, classes: ['fade-in'] }) ); //shedule fadeIn amination
      else
        this.setState(prevState => ({ currentProps: prevState.nextProps, classes: [] }) ); //shedule fadeIn amination
    } else {
      this.setState(prevState => ({ classes: [] }) ); //aftr fadeIn
    }
  }

  render() {
    let child = null;
    let classes = 'fade-out';
    if ( this.state.currentProps.shouldFadeIn && React.Children.count(this.props.children) == 1) {
      child = React.Children.only(this.props.children);
      child = React.cloneElement(child, this.state.currentProps);
    }
    classes = this.state.classes.join(' ');
    return (<div key="fade" className={classes} onAnimationEnd={this.handleAnimationEnd} >{child}</div>);
  }

}

export default AnimationOnPropsChange;
