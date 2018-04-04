import React from 'react';
import { render } from 'react-dom';
import TodoApp from './todo-app';
import { hot } from 'react-hot-loader';
import './assets/css/main.css';

const root = document.getElementById('root');
render(<TodoApp />, root);
