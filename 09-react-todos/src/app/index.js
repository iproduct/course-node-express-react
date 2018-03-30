import './assets/css/main.css';
import './assets/css/animation.css';
// import './assets/images/react-redux.png';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import TodoApp from './todo-app';

ReactDOM.render(<TodoApp />,  document.getElementById('root'));
