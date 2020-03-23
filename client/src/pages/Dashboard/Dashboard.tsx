import React from 'react';
import { bindActionCreators, Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import store from '../../store/store';

// Components
import ActivityList from '../../components/Activity/ActivityList';
import Accordion from '../../components/Accordion/Accordion';
import WeeklyHistory from '../../components/WeeklyHistory/WeeklyHistory';
import Modal from '../../components/Modal/Modal';
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

interface State {
  isModalOpen: boolean;
  currentMood: number | null;
  error: string | null;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isModalOpen: false,
      currentMood: null,
      error: null
    };
  }

  createMoodScoreBtns = (numBtns: number) => {
    const { currentMood } = this.state;
    let btns = [];

    for (let i = 0; i < numBtns; i++) {
      btns.push(
        <button
          key={i}
          className={currentMood === i + 1 ? 'selected' : ''}
          onClick={e => this.setState({ currentMood: i + 1 })}
        >
          {i + 1}
        </button>
      );
    }

    return btns;
  };

  submitMoodScore = () => {
    const { currentMood } = this.state;

    if (currentMood === null) {
      this.setState({ error: 'Please select a mood score' });
      return;
    }

    // API call to backend
    console.log('Recording mood: ', currentMood);

    this.setState({ currentMood: null, isModalOpen: false });
  };

  render() {
    const { auth } = this.props;
    const { isModalOpen, error } = this.state;
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
            <WeeklyHistory />
          </div>
          <div>
            <p className="ActivityList">Monthly History WIP</p>
          </div>
        </Accordion>
        <button
          className="button"
          onClick={e => this.setState({ isModalOpen: true })}
        >
          Record Mood
        </button>

        {isModalOpen ? (
          <Modal
            closeModal={() =>
              this.setState({
                isModalOpen: false,
                currentMood: null,
                error: null
              })
            }
            headerText="Record Mood"
          >
            <div className="button-row">{this.createMoodScoreBtns(5)}</div>
            {error ? <p className="error">{error}</p> : null}
            <button onClick={e => this.submitMoodScore()}>Submit</button>
          </Modal>
        ) : null}
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
      logoutUser
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
