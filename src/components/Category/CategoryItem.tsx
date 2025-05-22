import React, { useState } from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';

interface CategoryItemProps {
  id: string;
  name: string;
  color: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  id,
  name,
  color,
  onEdit,
  onDelete,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg 
                 shadow-sm border border-gray-200 dark:border-gray-700 transition-all 
                 group hover:shadow-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center">
        <div
          className="w-4 h-4 rounded-full mr-3"
          style={{ backgroundColor: color }}
        />
        <span className="font-medium text-gray-800 dark:text-gray-200">{name}</span>
      </div>

      <div className={`flex space-x-1 transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onEdit(id)}
          aria-label={`Edit ${name} category`}
          className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <Edit2 size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(id)}
          aria-label={`Delete ${name} category`}
          className="p-1 text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CategoryItem;