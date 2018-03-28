import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello';
import { hot } from 'react-hot-loader';

const root = document.getElementById('root');

const render = (Component, props) => {
  ReactDOM.render(<Component ...props />, root);
};

render(hot(module)(Hello), {name: 'Reactive World 2'});

// ReactDOM.render(
//   <Hello name='Reactive World' />,
//   document.getElementById('app')
// );
