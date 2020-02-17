import React from 'react';

interface Props {
  name: String;
  duration: String;
}

class UnBoundedActivity extends React.Component<Props> {
  render() {
    const { name, duration } = this.props;

    return (
      <div className="bounded-activity">
        {duration}
        {name}
      </div>
    );
  }
}

export default UnBoundedActivity;
