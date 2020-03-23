import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-regular-svg-icons';

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

interface SquareProps {
  id: number;
  date: String;
  moodScore: number;
}

const SquareTile = (props: SquareProps) => {
  const { date, moodScore, id } = props;
  let icon;

  if (moodScore < 3) {
    icon = faFrown;
  } else if (moodScore < 5) {
    icon = faMeh;
  } else {
    icon = faSmile;
  }

  return (
    <div className="weekly-square" onClick={e => console.log(id)}>
      <p>{date}</p>
      <FontAwesomeIcon icon={icon} size="3x" />
    </div>
  );
};

const generateSquares = (moodScores: MoodScore[]) => {
  const squares = moodScores.length;
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

    const moodAvg = Math.ceil(moodScores[i].total / moodScores[i].recordings);

    list.push(<SquareTile key={i} id={i} date={date} moodScore={moodAvg} />);
  }

  return list;
};

interface MoodScore {
  recordings: number;
  total: number;
}

interface Props {}

const WeeklyHistory = (props: Props) => {
  const moodScores = [
    { recordings: 3, total: 14 },
    { recordings: 2, total: 7 },
    { recordings: 4, total: 18 },
    { recordings: 2, total: 8 },
    { recordings: 3, total: 6 },
    { recordings: 1, total: 1 }
  ];

  return (
    <div className="WeeklyHistory">
      <div className="grid">{generateSquares(moodScores)}</div>
    </div>
  );
};

export default WeeklyHistory;
