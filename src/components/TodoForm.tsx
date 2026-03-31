import { useState } from 'react';
import type { Todo, Priority, Category } from '../types/todo';

export function TodoForm({
  onAddTodo,
}: {
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
}) {
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<Priority>('중간');
  const [category, setCategory] = useState<Category>('개인');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('제목을 입력해주세요.');
      return;
    }
    setError('');
    onAddTodo({
      title: title.trim(),
      priority,
      category,
      completed: false,
      tags: [],
    });
    setTitle('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700"
    >
      <div className="flex flex-col gap-4">
        <div>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="할 일을 입력하세요"
            className="w-full rounded-full border border-gray-200 dark:border-gray-600 px-6 py-4 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-sm mt-2 ml-4">{error}</p>}
        </div>
        <div className="flex gap-3">
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="높음">🔴 높음</option>
            <option value="중간">🟡 중간</option>
            <option value="낮음">🔵 낮음</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="업무">💼 업무</option>
            <option value="개인">🏠 개인</option>
            <option value="공부">📚 공부</option>
          </select>
          <button
            type="submit"
            className="ml-auto rounded-full bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 font-medium transition-colors"
          >
            추가
          </button>
        </div>
      </div>
    </form>
  );
}
