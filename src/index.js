import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import {createStore, applyMiddleware } from 'redux';
import reducer from './reducer.js';
import { composeWithDevTools } from 'redux-devtools-extension';

const store = createStore(reducer,composeWithDevTools(
  applyMiddleware(),
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
