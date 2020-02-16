import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ConnectedRouter } from 'connected-react-router';

import setAuthToken from '../utils/setAuthToken';
import './App.scss';

// Components
import Login from './Login/Login';
import SignUp from './SignUp/SignUp';
import Dashboard from './Dashboard/Dashboard';
import NotFound from './NotFound/NotFound';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

import store, { history } from '../store/store';
// Actions
import { setCurrentUser, logoutUser } from '../actions/authActions';

// Interfaces
import { RootState } from 'typesafe-actions';

interface TokenDto {
  exp: number;
  iat: number;
}

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  // Set Axios auth header
  setAuthToken(token);
  // Set user
  const decodedUser = jwt_decode<TokenDto>(token);
  store.dispatch(setCurrentUser(decodedUser));
  // Check if token is expired
  const currentTime = Date.now() / 1000;
  if (decodedUser.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

const App = () => {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <h2 className="app-header">ActiviX</h2>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={SignUp} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </ConnectedRouter>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      logoutUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
