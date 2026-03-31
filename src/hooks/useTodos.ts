import { useState } from 'react';
import type { Todo, Filter } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>({});

  // CRUD 함수 시그니처 (Phase 3에서 구현)
  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {
    setTodos((prev) => [...prev, todo as Todo]);
  };
  const updateTodo = (id: string, updates: Partial<Todo>) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)));
  };
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };
  const toggleComplete = (id: string) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  // 정렬 함수 시그니처 (Phase 6에서 구현)
  const reorderTodos = (activeId: string, overId: string) => {
    setTodos((prev) => {
      // reorder logic (placeholder)
      if (activeId === overId) return prev;
      return prev;
    });
  };

  // 필터 적용 (Phase 5에서 확장)
  const filteredTodos = todos.filter((todo) => {
    if (filter.completed !== undefined && todo.completed !== filter.completed) return false;
    if (filter.priority && todo.priority !== filter.priority) return false;
    if (filter.category && todo.category !== filter.category) return false;
    if (filter.search && !todo.title.toLowerCase().includes(filter.search.toLowerCase())) return false;
    return true;
  });

  // order 기준으로 정렬
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
