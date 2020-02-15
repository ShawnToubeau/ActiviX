import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import './App.scss';

// Components
import Login from './Login';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import NotFound from './NotFound';
import PrivateRoute from '../components/PrivateRoute';

const App = () => {
  return (
    <div className="App">
      <Router>
        <h2 className="app-header">ActiviX</h2>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
