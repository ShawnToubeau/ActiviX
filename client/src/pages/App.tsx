import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './App.scss';

// Components
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import PrivateRoute from '../components/PrivateRoute';
import PublicRoute from '../components/PublicRoute';

// Redux
import store from '../store/store';
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
      <Router>
        <h2 className="app-header">ActiviX</h2>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <PublicRoute path="/login" component={Login} />
          <PublicRoute path="/signup" component={SignUp} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators(
    {
      logoutUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
