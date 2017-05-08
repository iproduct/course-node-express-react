import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import './index.css';

import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';

import thunk from 'redux-thunk';

import reducers from './reducers'; // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();
console.log(history);

// Build the middleware for intercepting and dispatching navigation actions
const middleware = [routerMiddleware(history), thunk];

// Enable Redux Devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  /* preloadedState, */ 
  composeEnhancers(
    applyMiddleware(...middleware)
  )
);

// Now you can dispatch navigation actions from anywhere!
store.dispatch(push('/repos/react/redux')); 

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
        <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
