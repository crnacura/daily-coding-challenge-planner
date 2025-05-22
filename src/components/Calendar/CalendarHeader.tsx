import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { getMonthName } from '../../utils/dateUtils';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onToday: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({
  currentDate,
  onPrevMonth,
  onNextMonth,
  onToday,
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          {getMonthName(currentDate)} {currentDate.getFullYear()}
        </h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onToday}
          className="px-3 py-1.5"
        >
          Today
        </Button>
        
        <div className="flex">
          <Button
            variant="outline"
            size="sm"
            onClick={onPrevMonth}
            aria-label="Previous month"
            className="rounded-r-none border-r-0"
          >
            <ChevronLeft size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onNextMonth}
            aria-label="Next month"
            className="rounded-l-none"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;