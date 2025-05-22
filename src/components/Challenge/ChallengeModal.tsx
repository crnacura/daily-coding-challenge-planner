import React from 'react';
import Modal from '../ui/Modal';
import ChallengeForm from './ChallengeForm';
import { useChallenges } from '../../context/ChallengeContext';
import { formatDate } from '../../utils/dateUtils';

interface ChallengeModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date;
}

const ChallengeModal: React.FC<ChallengeModalProps> = ({ isOpen, onClose, date }) => {
  const { 
    state, 
    addChallenge, 
    updateChallenge, 
    deleteChallenge,
    getChallengeForDate
  } = useChallenges();
  
  const dateString = formatDate(date);
  const existingChallenge = getChallengeForDate(dateString);
  
  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handleSave = (challengeData: any) => {
    addChallenge(challengeData);
    onClose();
  };

  const handleUpdate = (challenge: any) => {
    updateChallenge(challenge);
    onClose();
  };

  const handleDelete = (id: string) => {
    deleteChallenge(id);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={existingChallenge ? 'Edit Challenge' : 'Add New Challenge'}
    >
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        {formattedDate}
      </p>
      
      <ChallengeForm
        date={date}
        categories={state.categories}
        initialChallenge={existingChallenge}
        onSave={handleSave}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onCancel={onClose}
      />
    </Modal>
  );
};

export default ChallengeModal;