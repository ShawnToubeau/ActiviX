import React from 'react';
import { BActivity, UBActivity } from './types';
import BoundedActivity from './BoundedActivity';
import UnboundedActivity from './UnboundedActivity';

// Test data
const activities: (BActivity | UBActivity)[] = [
  {
    name: 'Brush Teeth',
    type: 'bounded',
    occurrence: 2,
    completed: 1
  },
  {
    name: 'Take Shower',
    type: 'bounded',
    occurrence: 1,
    completed: 1
  },
  {
    name: 'Eat',
    type: 'bounded',
    occurrence: 3,
    completed: 2
  },
  {
    name: 'Study',
    type: 'unbounded',
    duration: '02:03:40'
  },
  {
    name: 'Read',
    type: 'unbounded',
    duration: '00:30:00'
  },
  {
    name: 'Finish Homework',
    type: 'bounded',
    occurrence: 1,
    completed: 0
  }
];

const isBActivity = (object: any): object is BActivity => {
  return 'occurrence' in object && 'completed' in object;
};

const isUBActivity = (object: any): object is UBActivity => {
  return 'duration' in object;
};

const ActivityList = () => {
  return (
    <div className="ActivityList">
      <div className="list-items">
        {/* eslint-disable-next-line */}
        {activities.map((activity, id) => {
          if (isBActivity(activity)) {
            return (
              <BoundedActivity
                key={id}
                name={activity.name}
                occurrence={activity.occurrence}
                completed={activity.completed}
              />
            );
          } else if (isUBActivity(activity)) {
            return (
              <UnboundedActivity
                key={id}
                name={activity.name}
                duration={activity.duration}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default ActivityList;
