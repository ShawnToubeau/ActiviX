import React from 'react';

import './WeeklyHistory.scss';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const generateSquares = () => {
  const squares = 6;
  let list = [];

  for (let i = 0; i < squares; i++) {
    const today = new Date();
    let dayOfWeek = today.getDay() - i - 1;
    const month = today.getMonth() + 1;
    const day = today.getDate() - i - 1;

    // Resets dayOfWeek to Saturday
    if (dayOfWeek < 0) {
      dayOfWeek = dayOfWeek + 7;
    }

    const date = `${daysOfWeek[dayOfWeek]} ${month}/${day}`;

    list.push(<div className="weekly-square">{date}</div>);
  }

  return list;
};

interface Props {}

const WeeklyHistory = (props: Props) => {
  return (
    <div className="WeeklyHistory">
      <div className="grid">{generateSquares()}</div>
    </div>
  );
};

export default WeeklyHistory;
