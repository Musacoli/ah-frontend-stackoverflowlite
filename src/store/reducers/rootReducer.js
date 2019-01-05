import { combineReducers } from 'redux';
import questions from './questions';
import common from './common';
import authentication from './authentication';
import forms from './forms';
import { routerReducer } from 'react-router-redux';


export default combineReducers({
  questions,
  authentication,
  forms,
  common,
  router: routerReducer
});