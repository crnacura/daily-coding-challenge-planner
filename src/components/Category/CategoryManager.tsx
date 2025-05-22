import React, { useState } from 'react';
import { useChallenges } from '../../context/ChallengeContext';
import CategoryItem from './CategoryItem';
import Button from '../ui/Button';
import Modal from '../ui/Modal';
import CategoryForm from './CategoryForm';
import { Category } from '../../types';
import { Plus } from 'lucide-react';

const CategoryManager: React.FC = () => {
  const { state, addCategory, updateCategory, deleteCategory } = useChallenges();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | undefined>(undefined);

  const handleAddCategory = () => {
    setEditingCategory(undefined);
    setIsModalOpen(true);
  };

  const handleEditCategory = (id: string) => {
    const category = state.categories.find(cat => cat.id === id);
    if (category) {
      setEditingCategory(category);
      setIsModalOpen(true);
    }
  };

  const handleSaveCategory = (categoryData: Omit<Category, 'id'>) => {
    addCategory(categoryData);
    setIsModalOpen(false);
  };

  const handleUpdateCategory = (category: Category) => {
    updateCategory(category);
    setIsModalOpen(false);
  };

  const handleDeleteCategory = (id: string) => {
    // Ask for confirmation since this affects all challenges with this category
    if (window.confirm('Are you sure you want to delete this category? All challenges using this category will be updated to use the first available category.')) {
      deleteCategory(id);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(undefined);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Categories</h2>
        <Button
          variant="primary"
          size="sm"
          onClick={handleAddCategory}
          className="inline-flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Add Category
        </Button>
      </div>

      <div className="space-y-2">
        {state.categories.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm italic">
            No categories yet. Create one to organize your challenges.
          </p>
        ) : (
          state.categories.map((category) => (
            <CategoryItem
              key={category.id}
              id={category.id}
              name={category.name}
              color={category.color}
              onEdit={handleEditCategory}
              onDelete={handleDeleteCategory}
            />
          ))
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={editingCategory ? 'Edit Category' : 'Add New Category'}
      >
        <CategoryForm
          initialCategory={editingCategory}
          onSave={handleSaveCategory}
          onUpdate={handleUpdateCategory}
          onCancel={closeModal}
        />
      </Modal>
    </div>
  );
};

export default CategoryManager;