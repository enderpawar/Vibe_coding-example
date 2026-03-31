import { useState, useEffect } from 'react';
import type { Todo, Filter } from '../types/todo';
import { storage } from '../utils/storage';
import { arrayMove } from '@dnd-kit/sortable';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => storage.get());
  const [filter, setFilter] = useState<Filter>({});

  useEffect(() => {
    storage.set(todos);
  }, [todos]);

  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
    const newTodo: Todo = {
      ...todo,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      order: todos.length > 0 ? Math.max(...todos.map((t) => t.order)) + 1 : 0,
    };
    setTodos((prev) => [...prev, newTodo]);
  };
  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates, updatedAt: Date.now() } : t)));
  };
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const toggleComplete = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed, updatedAt: Date.now() } : t)));
  };

  const reorderTodos = (activeId: string, overId: string) => {
    setTodos((prev) => {
      const oldIndex = prev.findIndex((t) => t.id === activeId);
      const newIndex = prev.findIndex((t) => t.id === overId);
      if (oldIndex === -1 || newIndex === -1) return prev;
      
      const moved = arrayMove(prev, oldIndex, newIndex);
      return moved.map((t, index) => ({ ...t, order: index }));
    });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter.completed !== undefined && todo.completed !== filter.completed) return false;
    if (filter.priority && todo.priority !== filter.priority) return false;
    if (filter.category && todo.category !== filter.category) return false;
    if (filter.search && !todo.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => a.order - b.order);

  return {
    todos: sortedTodos,
    filter,
    setFilter,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    reorderTodos,
  };
}
