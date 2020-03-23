import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile, faMeh, faFrown } from '@fortawesome/free-regular-svg-icons';
import Modal from '../Modal/Modal';

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

const generateDate = (i: number) => {
  const today = new Date();
  let dayOfWeek = today.getDay() - i - 1;
  const month = today.getMonth() + 1;
  const day = today.getDate() - i - 1;

  // Resets dayOfWeek to Saturday
  if (dayOfWeek < 0) {
    dayOfWeek = dayOfWeek + 7;
  }

  const date = `${daysOfWeek[dayOfWeek]} ${month}/${day}`;

  return date;
};

interface SquareProps {
  id: number;
  moodScore: number;
  times: { mood: number; time: string }[];
}

const WeekTile = (props: SquareProps) => {
  const { moodScore, id, times } = props;
  const [isModalOpen, setModalOpen] = useState(false);
  const date = generateDate(id);
  let icon;

  // Open to suggestions on how we pick which icon to show
  if (moodScore < 3) {
    icon = faFrown;
  } else if (moodScore < 5) {
    icon = faMeh;
  } else {
    icon = faSmile;
  }

  return (
    <div className="weekly-tile">
      <div
        className="tile-content"
        onClick={e => setModalOpen(true)}
        style={{ height: '100%' }}
      >
        <p>{date}</p>
        <FontAwesomeIcon icon={icon} size="3x" />
      </div>

      {isModalOpen ? (
        <Modal
          closeModal={() => setModalOpen(false)}
          headerText={`${date} Overview`}
        >
          <p>Mood Record Times</p>
          {times.map((time, id) => (
            <p key={id}>
              {time.time}: {time.mood}
            </p>
          ))}
        </Modal>
      ) : null}
    </div>
  );
};

export default WeekTile;
