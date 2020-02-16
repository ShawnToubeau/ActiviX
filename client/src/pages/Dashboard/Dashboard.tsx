import React from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import store from '../../store/store';

// Actions
import { logoutUser } from '../../actions/authActions';
// Reducers
import { Auth } from '../../reducers/authReducer';
// Interfaces
import { RootState } from 'typesafe-actions';
import User from '../../models/User';

interface Props {
  logoutUser: () => AnyAction;
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
        <h1>Welcome {user.name}</h1>
        <button onClick={() => store.dispatch(logoutUser())}>Logout</button>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  return bindActionCreators(
    {
      logout: logoutUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
