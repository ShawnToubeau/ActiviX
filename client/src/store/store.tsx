import { createStore, applyMiddleware, compose, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

// Root reducer
import rootReducer from '../reducers/rootReducer';

export const history = createBrowserHistory();

let middleware = applyMiddleware(routerMiddleware(history), thunk);

// Rehydrate state
const initialState = {};

// Redux dev tools
if (process.env.NODE_ENV === 'development') {
  middleware = composeWithDevTools({ trace: true, traceLimit: 25 })(middleware);
} else {
  middleware = compose(middleware);
}

const store = createStore(rootReducer(history), initialState, middleware);

export default store;
