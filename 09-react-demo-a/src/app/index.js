import React from 'react';
import ReactDOM from 'react-dom';
import Hello from './hello';
import { hot } from 'react-hot-loader';

const root = document.getElementById('root');

const render = 
    (Component) => {
        ReactDOM.render(
            <Component name='Reactive World 9' />,
            root);
    }

    render(hot(module)(Hello));
