import React from 'react';
import { BActivity, UBActivity } from './types';
import BoundedActivity from './BoundedActivity';
import UnboundedActivity from './UnboundedActivity';

// Test data
const activities: (BActivity | UBActivity)[] = [
  {
    name: 'brush teeth',
    type: 'bounded',
    occurrence: 2,
    completed: 1
  },
  {
    name: 'take shower',
    type: 'bounded',
    occurrence: 1,
    completed: 0
  },
  {
    name: 'go outside',
    type: 'unbounded',
    duration: '02:03:40'
  }
];

const isBActivity = (object: any): object is BActivity => {
  return 'occurrence' in object && 'completed' in object;
};

const isUBActivity = (object: any): object is UBActivity => {
  return 'duration' in object;
};

// Constructs a list of both types of activities
const createActivityList = () => {
  return activities.map(activity => {
    if (isBActivity(activity)) {
      return (
        <BoundedActivity
          name={activity.name}
          occurrence={activity.occurrence}
          completed={activity.completed}
        />
      );
    } else if (isUBActivity(activity)) {
      return (
        <UnboundedActivity name={activity.name} duration={activity.duration} />
      );
    }
  });
};

const ActivityList = () => {
  return (
    <div>
      List
      {createActivityList()}
    </div>
  );
};

export default ActivityList;
