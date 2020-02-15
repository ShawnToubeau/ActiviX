import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import authReducer from './authReducer';

const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer
  });

export default rootReducer;
