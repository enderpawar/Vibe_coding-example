import { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TodoItem({ todo, onUpdate, onDelete, onToggleComplete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdate(todo.id, { title: editTitle.trim() });
    } else {
      setEditTitle(todo.title);
    }
    setIsEditing(false);
  };

  const handeKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={'flex items-center gap-3 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700 transition-opacity ' + (todo.completed ? 'opacity-50' : 'opacity-100')}
    >
      <button
        {...attributes}
        {...listeners}
        className='flex-shrink-0 cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 p-1'
        title='드래그하여 순서 변경'
      >
        ☰
      </button>
      <input
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggleComplete(todo.id)}
        className='w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer'
      />
      {isEditing ? (
        <input
          type='text'
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handeKeyDown}
          autoFocus
          className='flex-1 rounded-full border border-gray-200 dark:border-gray-600 px-4 py-1 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={'flex-1 text-gray-900 dark:text-gray-100 truncate cursor-pointer ' + (todo.completed ? 'line-through text-gray-500' : '')}
        >
          {todo.title}
        </span>
      )}
      {!isEditing && (
        <div className='flex items-center gap-2'>
          <span className='text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'>
            {todo.priority === '높음' ? '🔴' : todo.priority === '중간' ? '🟡' : '🔵'} {todo.priority}
          </span>
          <span className='text-xs px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'>
            {todo.category === '업무' ? '💼' : todo.category === '개인' ? '🏠' : '📚'} {todo.category}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className='text-gray-400 hover:text-blue-500 transition-colors'
          >
            수정
          </button>
          <button
            onClick={() => onDelete(todo.id)}
            className='text-gray-400 hover:text-red-500 transition-colors'
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
