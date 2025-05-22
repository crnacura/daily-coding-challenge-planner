import { AppState } from '../types';

const STORAGE_KEY = 'coding-challenge-planner';

export const saveState = (state: AppState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

export const loadState = (): AppState | undefined => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (!serializedState) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    console.error('Error loading from localStorage:', error);
    return undefined;
  }
};

export const saveTheme = (theme: string): void => {
  try {
    localStorage.setItem('theme-mode', theme);
  } catch (error) {
    console.error('Error saving theme to localStorage:', error);
  }
};

export const loadTheme = (): string | null => {
  try {
    return localStorage.getItem('theme-mode');
  } catch (error) {
    console.error('Error loading theme from localStorage:', error);
    return null;
  }
};

export const clearStorage = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem('theme-mode');
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};