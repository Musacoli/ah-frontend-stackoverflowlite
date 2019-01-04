import { combineReducers } from 'redux';
import questions from './questions';
import authUser from './authUser';
import common from './common';
import { routerReducer } from 'react-router-redux'


export default combineReducers({
  questions,
  authUser,
  common,
  router: routerReducer
});