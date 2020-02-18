import React from 'react';

interface Props {
  name: String;
  duration: String;
}

class UnboundedActivity extends React.Component<Props> {
  render() {
    const { name, duration } = this.props;

    return (
      <div className="UnboundedActivity list-item">
        <p className="duration">{duration}</p>
        <p className="activity-name">{name}</p>
      </div>
    );
  }
}

export default UnboundedActivity;
