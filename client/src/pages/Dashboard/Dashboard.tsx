import React from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import store from '../../store/store';

// Components
import ActivityList from '../../components/Activity/ActivityList';
import Accordion from '../../components/Accordion/Accordion';
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
      <div className="Dashboard">
        <div className="header">
          <h2>Welcome {user.name}</h2>
          <button onClick={() => store.dispatch(logoutUser())}>Logout</button>
        </div>
        <Accordion
          sections={["Today's Activities", 'Weekly History', 'Monthly History']}
        >
          <div>
            <ActivityList />
          </div>
          <div>
            <p className="ActivityList">Weekly History WIP</p>
          </div>
          <div>
            <p className="ActivityList">Monthly History WIP</p>
          </div>
        </Accordion>
        <button className="button">Record Mood</button>
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
