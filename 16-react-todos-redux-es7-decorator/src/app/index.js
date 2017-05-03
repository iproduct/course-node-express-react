import './assets/css/main.css';
import './assets/css/animation.css';
// import './assets/images/react-redux.png';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { TodoApp } from './components/todo-app';


const store = createStore(
    rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );
};

render(TodoApp);

if (module.hot) {
  module.hot.accept('./components/todo-app', () => { render(TodoApp); });
}