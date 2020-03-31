import React from 'react';
import WeekTile from './WeekTile';

import './WeeklyHistory.scss';

interface WeeklyData {
  mood: number;
  time: string;
}

const recentData: WeeklyData[][] = [
  [
    {
      mood: 4,
      time: '10:03 AM'
    },
    {
      mood: 4,
      time: '12:03 PM'
    },
    {
      mood: 5,
      time: '7:03 PM'
    }
  ],
  [
    {
      mood: 2,
      time: '11:03 AM'
    },
    {
      mood: 2,
      time: '4:03 PM'
    },
    {
      mood: 1,
      time: '9:03 PM'
    }
  ],
  [
    {
      mood: 3,
      time: '11:03 AM'
    },
    {
      mood: 3,
      time: '4:03 PM'
    },
    {
      mood: 1,
      time: '9:03 PM'
    }
  ],
  [
    {
      mood: 1,
      time: '11:03 AM'
    },
    {
      mood: 2,
      time: '4:03 PM'
    },
    {
      mood: 1,
      time: '9:03 PM'
    }
  ],
  [
    {
      mood: 5,
      time: '11:03 AM'
    },
    {
      mood: 2,
      time: '4:03 AM'
    },
    {
      mood: 1,
      time: '9:03 AM'
    }
  ],
  [
    {
      mood: 5,
      time: '11:03 AM'
    },
    {
      mood: 4,
      time: '4:03 AM'
    },
    {
      mood: 4,
      time: '9:03 AM'
    }
  ]
];

const generateTiles = (weeklyHistory: WeeklyData[][]) => {
  const numTiles = weeklyHistory.length;
  let list = [];

  for (let i = 0; i < numTiles; i++) {
    let totalMoodScore = 0;

    weeklyHistory[i].forEach(recording => {
      totalMoodScore = totalMoodScore + recording.mood;
    });

    const avgMoodScore = Math.ceil(totalMoodScore / weeklyHistory[i].length);

    list.push(
      <WeekTile
        key={i}
        id={i}
        moodScore={avgMoodScore}
        times={weeklyHistory[i]}
      />
    );
  }

  return list;
};

const WeeklyHistory = () => {
  return (
    <div className="WeeklyHistory">
      {recentData.length > 0 ? (
        <div className="grid">{generateTiles(recentData)}</div>
      ) : (
        <p>No weekly data.</p>
      )}
    </div>
  );
};

export default WeeklyHistory;
