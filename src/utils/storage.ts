import type { Todo } from '../types/todo';

const STORAGE_KEY = 'todo_mvp_data_v1';

export const storage = {
  get: (): Todo[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      console.error('Failed to parse localStorage data');
      return [];
    }
  },
  set: (todos: Todo[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
    } catch {
      console.error('Failed to save localStorage data');
    }
  },
};