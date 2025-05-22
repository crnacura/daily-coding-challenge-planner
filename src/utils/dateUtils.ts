/**
 * Get an array of dates for a calendar month view
 * Includes last days of previous month and first days of next month to fill the grid
 */
export const getCalendarDays = (year: number, month: number): Date[] => {
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  
  // Find the first day to display (might be from previous month)
  const firstDayOfCalendar = new Date(firstDayOfMonth);
  const dayOfWeek = firstDayOfMonth.getDay();
  firstDayOfCalendar.setDate(firstDayOfMonth.getDate() - dayOfWeek);
  
  // We'll show 6 weeks (42 days) to ensure we always have enough days
  const days: Date[] = [];
  
  for (let i = 0; i < 42; i++) {
    const day = new Date(firstDayOfCalendar);
    day.setDate(firstDayOfCalendar.getDate() + i);
    days.push(day);
    
    // Stop if we've gone past the end of the month and filled a complete week
    if (day.getMonth() > month && day.getDay() === 6 && days.length >= 35) {
      break;
    }
  }
  
  return days;
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const parseDate = (dateString: string): Date => {
  return new Date(dateString);
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

export const getDayName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'short' });
};

export const getMonthName = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long' });
};

export const getToday = (): Date => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
};