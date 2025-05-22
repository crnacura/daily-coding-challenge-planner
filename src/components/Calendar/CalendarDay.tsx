import React from 'react';
import { Challenge, Category } from '../../types';
import { formatDate } from '../../utils/dateUtils';
import { CheckCircle2, Circle, Plus } from 'lucide-react';

interface CalendarDayProps {
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  challenge: Challenge | null;
  categories: Category[];
  onDayClick: (date: Date) => void;
  onDragStart?: (challengeId: string, date: string) => void;
  onDrop?: (date: string) => void;
}

const CalendarDay: React.FC<CalendarDayProps> = ({
  date,
  isCurrentMonth,
  isToday,
  challenge,
  categories,
  onDayClick,
  onDragStart,
  onDrop,
}) => {
  const dateString = formatDate(date);
  const category = challenge 
    ? categories.find(cat => cat.id === challenge.categoryId) 
    : null;

  const handleDragStart = (e: React.DragEvent) => {
    if (challenge && onDragStart) {
      e.dataTransfer.setData('challengeId', challenge.id);
      onDragStart(challenge.id, dateString);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (onDrop) {
      const challengeId = e.dataTransfer.getData('challengeId');
      if (challengeId) {
        onDrop(dateString);
      }
    }
  };

  return (
    <div
      className={`
        min-h-[100px] border border-gray-200 dark:border-gray-700 p-2
        ${isCurrentMonth 
          ? isToday
            ? 'bg-blue-50 dark:bg-blue-900/20'
            : 'bg-white dark:bg-gray-800'
          : 'bg-gray-50 dark:bg-gray-900'
        }
        transition-all duration-200
        hover:bg-gray-50 dark:hover:bg-gray-750
        cursor-pointer
        group
        relative
      `}
      onClick={() => onDayClick(date)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex justify-between items-center mb-1">
        <span
          className={`text-sm font-medium ${
            isCurrentMonth
              ? isToday
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-900 dark:text-gray-100'
              : 'text-gray-400 dark:text-gray-500'
          }`}
        >
          {date.getDate()}
        </span>
      </div>

      {challenge ? (
        <div
          className={`
            mt-1 p-1.5 rounded-md shadow-sm transition-all duration-200
            ${challenge.completed 
              ? 'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500' 
              : 'bg-gray-50 dark:bg-gray-700/30 border-l-4'
            }
            ${category ? `border-l-[${category.color}]` : 'border-gray-300 dark:border-gray-600'}
          `}
          draggable={true}
          onDragStart={handleDragStart}
          style={{ borderLeftColor: category?.color || '#9CA3AF' }}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs font-medium truncate" style={{ color: category?.color }}>
              {category?.name || 'Uncategorized'}
            </span>
            <span className="ml-1 text-gray-500 dark:text-gray-400">
              {challenge.completed ? (
                <CheckCircle2 size={14} className="text-green-500" />
              ) : (
                <Circle size={14} />
              )}
            </span>
          </div>
          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 mt-0.5 truncate">
            {challenge.title}
          </p>
        </div>
      ) : (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Plus size={16} className="text-gray-400 dark:text-gray-500" />
        </div>
      )}
    </div>
  );
};

export default CalendarDay;