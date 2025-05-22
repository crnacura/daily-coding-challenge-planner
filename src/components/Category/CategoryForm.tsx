import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Category } from '../../types';

// Predefined color options
const colorOptions = [
  '#3B82F6', // Blue
  '#8B5CF6', // Purple
  '#06B6D4', // Cyan
  '#10B981', // Green
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#EC4899', // Pink
  '#F97316', // Orange
];

interface CategoryFormProps {
  initialCategory?: Category;
  onSave: (category: Omit<Category, 'id'>) => void;
  onUpdate: (category: Category) => void;
  onCancel: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  initialCategory,
  onSave,
  onUpdate,
  onCancel,
}) => {
  const [name, setName] = useState('');
  const [color, setColor] = useState(colorOptions[0]);

  useEffect(() => {
    if (initialCategory) {
      setName(initialCategory.name);
      setColor(initialCategory.color);
    }
  }, [initialCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const categoryData = {
      name: name.trim(),
      color,
    };
    
    if (initialCategory) {
      onUpdate({ ...categoryData, id: initialCategory.id });
    } else {
      onSave(categoryData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter category name"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     shadow-sm focus:ring-blue-500 focus:border-blue-500
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category Color
        </label>
        <div className="grid grid-cols-8 gap-2">
          {colorOptions.map((colorOption) => (
            <button
              key={colorOption}
              type="button"
              className={`w-8 h-8 rounded-full transition-all border-2 
                         ${color === colorOption ? 'border-gray-900 dark:border-white scale-110' : 'border-transparent hover:scale-105'}`}
              style={{ backgroundColor: colorOption }}
              onClick={() => setColor(colorOption)}
              aria-label={`Select color ${colorOption}`}
            />
          ))}
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!name.trim()}
        >
          {initialCategory ? 'Update' : 'Create'} Category
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;