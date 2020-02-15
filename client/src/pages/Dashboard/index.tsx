import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { logoutUser } from '../../actions/authActions';

import { RootState } from 'typesafe-actions';
import { Auth } from '../../reducers/authReducer';
import User from '../../models/User';
interface Props {
  logoutUser: () => void;
  auth: Auth;
}

class Dashboard extends React.Component<Props> {
  render() {
    const { auth } = this.props;
    let user: User = {};

    if (auth && auth.isAuthenticated) {
      user = auth.user;
    }

    return (
      <div>
        <h1>Welcome</h1>
        <button onClick={() => this.props.logoutUser()}>Logout</button>
      </div>
    );
  }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
