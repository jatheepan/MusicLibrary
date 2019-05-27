import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeArgs = [applyMiddleware(thunk)];
if(process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION__) {
  composeArgs.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}
const store = createStore(
  rootReducer,
  compose(...composeArgs)
);

export default store;
