import React from 'react';
import ReactDOM from 'react-dom';
import TodoApp from './todo-app';
import { hot } from 'react-hot-loader';

const root = document.getElementById('root');

const render = Component => ReactDOM.render(<Component />, root);

render(hot(module)(TodoApp));
