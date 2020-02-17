import React from 'react';

const ActivityDot = (completed: boolean) => {
  return (
    <div className="activity-dot">
      <div className={`inner-dot ${completed ? 'completed' : ''}`}></div>
    </div>
  );
};

interface Props {
  name: String;
  occurrence: number;
  completed: number;
}

class BoundedActivity extends React.Component<Props> {
  render() {
    const { name, occurrence, completed } = this.props;
    const dots = [];

    for (let i = 0; i < occurrence; i++) {
      const complete = i <= completed - 1;
      dots.push(ActivityDot(complete));
    }

    return (
      <div className="bounded-activity">
        {dots}
        {name}
      </div>
    );
  }
}

export default BoundedActivity;
