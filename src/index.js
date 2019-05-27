import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import rootReducer from './reducers';

const composeArgs = [applyMiddleware(thunk)];
if(process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  composeArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
const store = createStore(
  rootReducer,
  compose(...composeArgs)
);

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
