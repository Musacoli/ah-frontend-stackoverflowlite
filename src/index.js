// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './store';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './assets/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { getUser } from './store/actions/actions'
import ErrorBoundary from './components/ErrorBoundary';

import './sass/app.scss';

if(localStorage.Auth) {
  store.dispatch({type: 'SET_USER', user: JSON.parse(localStorage.Auth)})
  var _id = JSON.parse(localStorage.Auth)._id
  getUser(_id).then((res) => {
      store.dispatch({type: 'SET_USER', user: res})
  })
}

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <Switch>
        <ErrorBoundary>
          <Route path="/" component={App} />
        </ErrorBoundary>
        </Switch>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root')
 );
serviceWorker.unregister();