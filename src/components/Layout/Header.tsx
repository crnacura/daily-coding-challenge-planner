import React from 'react';
import ThemeToggle from '../ui/ThemeToggle';
import { Code2 } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Code2 className="h-8 w-8 text-blue-500" />
            <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-gray-100">
              Daily Frontend Coding Challenge Planner
            </h1>
          </div>
          
          <div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;