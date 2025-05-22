export interface Challenge {
  id: string;
  title: string;
  categoryId: string;
  date: string; // ISO string format
  completed: boolean;
  resourceLink?: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface DayWithChallenge {
  date: Date;
  challenge: Challenge | null;
  isCurrentMonth: boolean;
  isToday: boolean;
}

export interface AppState {
  challenges: Challenge[];
  categories: Category[];
}

export type DragItem = {
  type: 'CHALLENGE';
  id: string;
  date: string;
};

export type ThemeMode = 'light' | 'dark';