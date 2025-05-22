import React, { useMemo } from 'react';
import { useChallenges } from '../../context/ChallengeContext';
import { formatDate, getToday } from '../../utils/dateUtils';

const Statistics: React.FC = () => {
  const { state } = useChallenges();
  
  const stats = useMemo(() => {
    const total = state.challenges.length;
    const completed = state.challenges.filter(c => c.completed).length;
    const completion = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Calculate streak (consecutive days with completed challenges)
    let currentStreak = 0;
    let maxStreak = 0;
    
    // Sort challenges by date
    const sortedDates = state.challenges
      .filter(c => c.completed)
      .map(c => c.date)
      .sort();
    
    if (sortedDates.length > 0) {
      // Check if the most recent completed challenge is today or yesterday
      const today = formatDate(getToday());
      const yesterday = formatDate(new Date(getToday().setDate(getToday().getDate() - 1)));
      
      const mostRecentDate = sortedDates[sortedDates.length - 1];
      const streakActive = mostRecentDate === today || mostRecentDate === yesterday;
      
      if (streakActive) {
        currentStreak = 1; // Start with 1 for the most recent day
        
        // Count backwards from the most recent date
        for (let i = sortedDates.length - 2; i >= 0; i--) {
          const currentDate = new Date(sortedDates[i]);
          const nextDate = new Date(sortedDates[i + 1]);
          
          // Check if dates are consecutive
          const diffTime = Math.abs(nextDate.getTime() - currentDate.getTime());
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            currentStreak++;
          } else {
            break;
          }
        }
      }
      
      // Calculate max streak
      let tempStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const currentDate = new Date(sortedDates[i]);
        const prevDate = new Date(sortedDates[i - 1]);
        
        const diffTime = Math.abs(currentDate.getTime() - prevDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
          tempStreak++;
        } else {
          maxStreak = Math.max(maxStreak, tempStreak);
          tempStreak = 1;
        }
      }
      
      maxStreak = Math.max(maxStreak, tempStreak, currentStreak);
    }
    
    // Calculate category distribution
    const categoryDistribution = state.categories.map(category => {
      const count = state.challenges.filter(c => c.categoryId === category.id).length;
      return {
        ...category,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      };
    }).sort((a, b) => b.count - a.count);
    
    return {
      total,
      completed,
      completion,
      currentStreak,
      maxStreak,
      categoryDistribution,
    };
  }, [state.challenges, state.categories]);
  
  const renderProgressBar = (value: number, color = 'bg-blue-500') => (
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
      <div 
        className={`${color} h-2.5 rounded-full transition-all duration-500 ease-out`} 
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Statistics</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Completion Rate</div>
          <div className="mt-1 flex items-baseline">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {stats.completion}%
            </div>
            <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              ({stats.completed}/{stats.total})
            </div>
          </div>
          {renderProgressBar(stats.completion)}
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Streak</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stats.currentStreak} {stats.currentStreak === 1 ? 'day' : 'days'}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Keep it going!
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Longest Streak</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            {stats.maxStreak} {stats.maxStreak === 1 ? 'day' : 'days'}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {stats.currentStreak >= stats.maxStreak && stats.maxStreak > 0 
              ? "You're at your best!" 
              : "Your record to beat"}
          </div>
        </div>
      </div>
      
      {stats.total > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Category Distribution</h3>
          <div className="space-y-2">
            {stats.categoryDistribution.filter(c => c.count > 0).map((category) => (
              <div key={category.id}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium text-gray-700 dark:text-gray-300">{category.name}</span>
                  <span className="text-gray-500 dark:text-gray-400">{category.count} ({category.percentage}%)</span>
                </div>
                <div 
                  className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2"
                >
                  <div 
                    className="h-2 rounded-full transition-all duration-500 ease-out"
                    style={{ 
                      width: `${category.percentage}%`, 
                      backgroundColor: category.color
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {stats.total === 0 && (
        <p className="text-gray-500 dark:text-gray-400 text-sm italic">
          Add your first challenge to start seeing statistics.
        </p>
      )}
    </div>
  );
};

export default Statistics;