import React, { useState } from 'react';
import CalendarHeader from './CalendarHeader';
import CalendarGrid from './CalendarGrid';
import { useChallenges } from '../../context/ChallengeContext';
import { formatDate, getToday } from '../../utils/dateUtils';
import ChallengeModal from '../Challenge/ChallengeModal';

const Calendar: React.FC = () => {
  const { state, moveChallenge } = useChallenges();
  const [currentDate, setCurrentDate] = useState(getToday());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [draggedChallengeId, setDraggedChallengeId] = useState<string | null>(null);
  const [sourceDate, setSourceDate] = useState<string | null>(null);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(getToday());
  };

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCloseModal = () => {
    setSelectedDate(null);
  };

  const handleDragStart = (challengeId: string, date: string) => {
    setDraggedChallengeId(challengeId);
    setSourceDate(date);
  };

  const handleDrop = (targetDate: string) => {
    if (draggedChallengeId && sourceDate && sourceDate !== targetDate) {
      moveChallenge(draggedChallengeId, targetDate);
      setDraggedChallengeId(null);
      setSourceDate(null);
    }
  };

  return (
    <div className="w-full">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
        onToday={handleToday}
      />
      
      <CalendarGrid
        currentDate={currentDate}
        challenges={state.challenges}
        categories={state.categories}
        onDayClick={handleDayClick}
        onDragStart={handleDragStart}
        onDrop={handleDrop}
      />

      {selectedDate && (
        <ChallengeModal
          isOpen={!!selectedDate}
          onClose={handleCloseModal}
          date={selectedDate}
        />
      )}
    </div>
  );
};

export default Calendar;