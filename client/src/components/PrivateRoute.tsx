import React from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { connect } from 'react-redux';

// Reducers
import { Auth } from '../reducers/authReducer';
// Interfaces
// import { RootState } from 'typesafe-actions';

interface Props extends RouteProps {
  auth?: Auth;
}

class PrivateRoute extends Route<Props> {
  render() {
    const { component, path, auth } = this.props;

    if (auth && auth.isAuthenticated) {
      return <Route path={path} component={component} />;
    }

    return <Redirect to={{ pathname: '/login' }} />;
  }
}

const mapStateToProps = (state: any) => ({
  auth: state.auth
});

export default connect(mapStateToProps, null)(PrivateRoute);
