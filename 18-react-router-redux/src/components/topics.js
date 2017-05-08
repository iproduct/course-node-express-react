import React from 'react'
import { connect } from 'react-redux';
import { increment, incrementAsync, incrementIfOdd, decrement } from '../actions/counter';

@connect(
  state => ({ number: state.counter.number }),  //map state to props
  dispatch => ({                          //map dispatch to props
    next: () => dispatch(increment(1)),
    nextAsync: () => dispatch(incrementAsync(1)),
    nextIfOdd: () => dispatch(incrementIfOdd(1)),
    previuos: () => dispatch(decrement(1)),
  })
)
export default class Topics extends React.Component {
  render() {
    return (
      <div>
        <h3>Blog Topics No: {this.props.number} Here!</h3>
        <button type="button" onClick={this.props.previuos} >Go to previous topic</button>{' '}
        <button type="button" onClick={this.props.next} >Go to next topic</button>{' '}
        <button type="button" onClick={this.props.nextAsync} >Go to next topic ASYNC</button>{' '}
        <button type="button" onClick={this.props.nextIfOdd} >Go to next topic IF ODD</button>
      </div>
    )
  };
}
