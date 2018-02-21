import './assets/css/main.pcss';
import './assets/images/react-redux.png';

import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Hello from './containers/hello';

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root')
  );
};

render(Hello);

if (module.hot) {
  module.hot.accept('./containers/hello', () => { render(Hello) });
}