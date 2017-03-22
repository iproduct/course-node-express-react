import './assets/css/main.css';
import './assets/css/animation.css';
// import './assets/images/react-redux.png';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { TodoApp } from './todo-app';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(TodoApp);

if (module.hot) {
  module.hot.accept('./todo-app', () => { render(TodoApp); });
}