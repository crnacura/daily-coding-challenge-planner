import React from 'react';
import CalendarDay from './CalendarDay';
import { getCalendarDays, isSameDay, getToday, formatDate, getDayName } from '../../utils/dateUtils';
import { Challenge, Category } from '../../types';

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

interface CalendarGridProps {
  currentDate: Date;
  challenges: Challenge[];
  categories: Category[];
  onDayClick: (date: Date) => void;
  onDragStart: (challengeId: string, sourceDate: string) => void;
  onDrop: (targetDate: string) => void;
}

const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  challenges,
  categories,
  onDayClick,
  onDragStart,
  onDrop,
}) => {
  const calendarDays = getCalendarDays(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  
  const today = getToday();
  
  const getChallengeForDate = (date: Date) => {
    const dateStr = formatDate(date);
    return challenges.find(challenge => challenge.date === dateStr) || null;
  };

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      {/* Days of week header */}
      <div className="grid grid-cols-7 border-b border-gray-200 dark:border-gray-700">
        {DAYS_OF_WEEK.map(day => (
          <div 
            key={day} 
            className="py-2 text-center text-sm font-medium text-gray-500 dark:text-gray-400"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar grid */}
      <div className="grid grid-cols-7">
        {calendarDays.map(day => (
          <CalendarDay
            key={day.toISOString()}
            date={day}
            isCurrentMonth={day.getMonth() === currentDate.getMonth()}
            isToday={isSameDay(day, today)}
            challenge={getChallengeForDate(day)}
            categories={categories}
            onDayClick={onDayClick}
            onDragStart={onDragStart}
            onDrop={onDrop}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarGrid;