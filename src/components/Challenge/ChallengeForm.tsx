import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Category, Challenge } from '../../types';
import { ExternalLink, Trash2 } from 'lucide-react';

interface ChallengeFormProps {
  date: Date;
  categories: Category[];
  initialChallenge?: Challenge | null;
  onSave: (challengeData: Omit<Challenge, 'id'>) => void;
  onUpdate: (challenge: Challenge) => void;
  onDelete?: (id: string) => void;
  onCancel: () => void;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({
  date,
  categories,
  initialChallenge,
  onSave,
  onUpdate,
  onDelete,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [completed, setCompleted] = useState(false);
  const [resourceLink, setResourceLink] = useState('');

  useEffect(() => {
    if (initialChallenge) {
      setTitle(initialChallenge.title);
      setCategoryId(initialChallenge.categoryId);
      setCompleted(initialChallenge.completed);
      setResourceLink(initialChallenge.resourceLink || '');
    } else if (categories.length > 0) {
      setCategoryId(categories[0].id);
    }
  }, [initialChallenge, categories]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const challengeData = {
      title,
      categoryId,
      completed,
      resourceLink: resourceLink.trim() || undefined,
      date: date.toISOString().split('T')[0],
    };
    
    if (initialChallenge) {
      onUpdate({ ...challengeData, id: initialChallenge.id });
    } else {
      onSave(challengeData);
    }
  };

  const handleDelete = () => {
    if (initialChallenge && onDelete) {
      onDelete(initialChallenge.id);
    }
  };

  const isFormValid = title.trim() !== '' && categoryId !== '';

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Challenge Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter a title for your challenge"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                     shadow-sm focus:ring-blue-500 focus:border-blue-500
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          required
        />
      </div>
      
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Category
        </label>
        <div className="relative">
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                       shadow-sm focus:ring-blue-500 focus:border-blue-500
                       bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                       appearance-none"
            required
          >
            {categories.length === 0 ? (
              <option value="">No categories available</option>
            ) : (
              categories.map((category) => (
                <option 
                  key={category.id} 
                  value={category.id}
                  className="flex items-center gap-2"
                >
                  {category.name}
                </option>
              ))
            )}
          </select>
          {/* Color indicator */}
          <div 
            className="absolute right-8 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
            style={{ 
              backgroundColor: categories.find(c => c.id === categoryId)?.color || '#9CA3AF'
            }}
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="resourceLink" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Resource Link (Optional)
        </label>
        <div className="flex">
          <div className="relative flex-grow">
            <input
              type="url"
              id="resourceLink"
              value={resourceLink}
              onChange={(e) => setResourceLink(e.target.value)}
              placeholder="https://example.com/tutorial"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md
                         shadow-sm focus:ring-blue-500 focus:border-blue-500
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 pr-8"
            />
            {resourceLink && (
              <a
                href={resourceLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-blue-500 hover:text-blue-600"
                title="Open link"
              >
                <ExternalLink size={16} />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <input
          type="checkbox"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <label htmlFor="completed" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
          Mark as completed
        </label>
      </div>
      
      <div className="flex justify-between pt-2">
        <div className="flex space-x-2">
          {initialChallenge && onDelete && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              className="inline-flex items-center"
            >
              <Trash2 size={16} className="mr-1" />
              Delete
            </Button>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={!isFormValid}
          >
            {initialChallenge ? 'Update' : 'Save'} Challenge
          </Button>
        </div>
      </div>
    </form>
  );
};

export default ChallengeForm;