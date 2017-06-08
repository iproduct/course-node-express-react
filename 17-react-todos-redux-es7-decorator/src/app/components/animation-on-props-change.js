/* Copyright 2017 IPT - Intellectual Products & Technologies Ltd.
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 1. Redistributions of source code must retain the above copyright notice, this list of 
 *    conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice, this list 
 *    of conditions and the following disclaimer in the documentation and/or other materials 
 *    provided with the distribution.
 * 3. Neither the name of the copyright holder nor the names of its contributors may be used 
 *    to endorse or promote products derived from this software without specific prior written 
 *    permission.
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS 
 * OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY 
 * AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR 
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL 
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, 
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER 
 * IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT 
 * OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

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
