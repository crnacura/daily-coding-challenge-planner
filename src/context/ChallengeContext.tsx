import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { AppState, Challenge, Category } from '../types';
import { loadState, saveState } from '../utils/storage';

const DEFAULT_CATEGORIES: Category[] = [
  { id: '1', name: 'CSS Experiments', color: '#3B82F6' },
  { id: '2', name: 'JavaScript Interactions', color: '#F59E0B' },
  { id: '3', name: 'GSAP Animation', color: '#8B5CF6' },
  { id: '4', name: 'Three.js & WebGL', color: '#10B981' },
  { id: '5', name: 'UI Concepts & Microinteractions', color: '#EC4899' },
];

const INITIAL_CHALLENGES: Challenge[] = [
  // May 2025
  {
    id: '1',
    title: 'Glassmorphism Card Hover Effect',
    categoryId: '1',
    date: '2025-05-10',
    completed: false,
    resourceLink: 'https://css-tricks.com/glass-effect-for-your-website/',
  },
  {
    id: '2',
    title: 'Infinite Scroll Gallery',
    categoryId: '2',
    date: '2025-05-15',
    completed: false,
    resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API',
  },
  {
    id: '3',
    title: 'Animated Logo Reveal',
    categoryId: '3',
    date: '2025-05-20',
    completed: false,
    resourceLink: 'https://greensock.com/docs/v3/Getting-Started',
  },
  // June 2025
  {
    id: '4',
    title: '3D Product Configurator',
    categoryId: '4',
    date: '2025-06-05',
    completed: false,
    resourceLink: 'https://threejs.org/docs/#manual/en/introduction/Creating-a-scene',
  },
  {
    id: '5',
    title: 'Custom Radio Button Animation',
    categoryId: '5',
    date: '2025-06-15',
    completed: false,
    resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_animations',
  },
  {
    id: '6',
    title: 'Scroll-Triggered Timeline',
    categoryId: '3',
    date: '2025-06-25',
    completed: false,
    resourceLink: 'https://greensock.com/scrolltrigger/',
  },
  // July 2025
  {
    id: '7',
    title: 'Responsive Grid Masonry',
    categoryId: '1',
    date: '2025-07-10',
    completed: false,
    resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout',
  },
  {
    id: '8',
    title: 'Drag & Drop Kanban Board',
    categoryId: '2',
    date: '2025-07-20',
    completed: false,
    resourceLink: 'https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API',
  },
  {
    id: '9',
    title: 'WebGL Particle System',
    categoryId: '4',
    date: '2025-07-30',
    completed: false,
    resourceLink: 'https://threejs.org/examples/#webgl_points_sprites',
  },
];

const initialState: AppState = {
  challenges: INITIAL_CHALLENGES,
  categories: DEFAULT_CATEGORIES,
};

type Action =
  | { type: 'ADD_CHALLENGE'; payload: Challenge }
  | { type: 'UPDATE_CHALLENGE'; payload: Challenge }
  | { type: 'DELETE_CHALLENGE'; payload: string }
  | { type: 'MOVE_CHALLENGE'; payload: { id: string; newDate: string } }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: Category }
  | { type: 'DELETE_CATEGORY'; payload: string };

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'ADD_CHALLENGE':
      return {
        ...state,
        challenges: [...state.challenges, action.payload],
      };
    case 'UPDATE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload.id ? action.payload : challenge
        ),
      };
    case 'DELETE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.filter(challenge => challenge.id !== action.payload),
      };
    case 'MOVE_CHALLENGE':
      return {
        ...state,
        challenges: state.challenges.map(challenge =>
          challenge.id === action.payload.id
            ? { ...challenge, date: action.payload.newDate }
            : challenge
        ),
      };
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(category =>
          category.id === action.payload.id ? action.payload : category
        ),
      };
    case 'DELETE_CATEGORY': {
      const newCategories = state.categories.filter(
        category => category.id !== action.payload
      );
      
      const defaultCategoryId = newCategories.length > 0 ? newCategories[0].id : '';
      
      const updatedChallenges = state.challenges.map(challenge =>
        challenge.categoryId === action.payload
          ? { ...challenge, categoryId: defaultCategoryId }
          : challenge
      );
      
      return {
        ...state,
        categories: newCategories,
        challenges: updatedChallenges,
      };
    }
    default:
      return state;
  }
};

interface ChallengeContextType {
  state: AppState;
  addChallenge: (challenge: Omit<Challenge, 'id'>) => void;
  updateChallenge: (challenge: Challenge) => void;
  deleteChallenge: (id: string) => void;
  moveChallenge: (id: string, newDate: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (category: Category) => void;
  deleteCategory: (id: string) => void;
  getChallengeForDate: (date: string) => Challenge | null;
}

const ChallengeContext = createContext<ChallengeContextType | undefined>(undefined);

export const ChallengeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState, () => {
    const savedState = loadState();
    return savedState || initialState;
  });

  useEffect(() => {
    saveState(state);
  }, [state]);

  const addChallenge = (challenge: Omit<Challenge, 'id'>) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'ADD_CHALLENGE', payload: { ...challenge, id } });
  };

  const updateChallenge = (challenge: Challenge) => {
    dispatch({ type: 'UPDATE_CHALLENGE', payload: challenge });
  };

  const deleteChallenge = (id: string) => {
    dispatch({ type: 'DELETE_CHALLENGE', payload: id });
  };

  const moveChallenge = (id: string, newDate: string) => {
    dispatch({ type: 'MOVE_CHALLENGE', payload: { id, newDate } });
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const id = crypto.randomUUID();
    dispatch({ type: 'ADD_CATEGORY', payload: { ...category, id } });
  };

  const updateCategory = (category: Category) => {
    dispatch({ type: 'UPDATE_CATEGORY', payload: category });
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: 'DELETE_CATEGORY', payload: id });
  };

  const getChallengeForDate = (date: string): Challenge | null => {
    return state.challenges.find(challenge => challenge.date === date) || null;
  };

  return (
    <ChallengeContext.Provider
      value={{
        state,
        addChallenge,
        updateChallenge,
        deleteChallenge,
        moveChallenge,
        addCategory,
        updateCategory,
        deleteCategory,
        getChallengeForDate,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenges = (): ChallengeContextType => {
  const context = useContext(ChallengeContext);
  if (context === undefined) {
    throw new Error('useChallenges must be used within a ChallengeProvider');
  }
  return context;
};