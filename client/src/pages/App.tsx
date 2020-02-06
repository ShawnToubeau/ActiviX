import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

// Components
import Login from './Login';
import SignUp from './SignUp';

const App = () => {
  return (
    <div className="App">
      <Router>
        <h2 className="app-header">ActiviX</h2>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
