import { useState } from 'react';
import { Todo, Filter } from '../types/todo';

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>({});

  // CRUD 함수 시그니처 (Phase 3에서 구현)
  const addTodo = (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => {};
  const updateTodo = (id: string, updates: Partial<Todo>) => {};
  const deleteTodo = (id: string) => {};
  const toggleComplete = (id: string) => {};

  // 정렬 함수 시그니처 (Phase 6에서 구현)
  const reorderTodos = (activeId: string, overId: string) => {};

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
