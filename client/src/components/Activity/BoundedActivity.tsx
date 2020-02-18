import React from 'react';

const ActivityDot = (completed: boolean, id: number) => {
  return (
    <div className="activity-dot" key={id}>
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
      dots.push(ActivityDot(complete, i));
    }

    return (
      <div className="BoundedActivity list-item">
        <div className="completion-status">{dots}</div>
        <p className="activity-name">{name}</p>
      </div>
    );
  }
}

export default BoundedActivity;
