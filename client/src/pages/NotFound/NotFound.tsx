import React from 'react';

class NotFound extends React.Component {
  render() {
    return (
      <div className="NotFound">
        <h3 className="component-header">404 Not Found</h3>
        <a href="/login">Back to Login</a>
      </div>
    );
  }
}

export default NotFound;
