import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import Http from '../utils/Http';
import { get } from 'lodash';
import { API_URL } from '../utils/constants';
import { activateLoading, deactivateLoading } from './actions/ui';
import rootReducer from './reducers/rootReducer';

const http = new Http(API_URL);
const shouldLog = process.env.NODE_ENV === 'development';
const middleware = [thunk.withExtraArgument(http)];

/* istanbul ignore if */
if (shouldLog) {
  middleware.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleware));

// hook into the http (fetch process) and (de)activate a loader
http.onStart(() => store.dispatch(activateLoading()));
http.onFinished(() => store.dispatch(deactivateLoading()));

/* istanbul ignore next */
http.onFail(error => {
  const message = error && (error.detail || error.message);
  if (message) window.Notify.error(message);
});
// we will temporarily set the token from the local storage if it exists
http.setToken(get(JSON.parse(localStorage.getItem('user')), 'token'));

export default store;
