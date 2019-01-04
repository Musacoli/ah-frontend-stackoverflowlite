import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createHistory from 'history/createBrowserHistory';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

export const history = createHistory();

export const store = createStore(
  rootReducer, composeWithDevTools(applyMiddleware(thunk)));