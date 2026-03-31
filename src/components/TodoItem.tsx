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
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : 1,
  };

  const handleSave = () => {
    if (editTitle.trim() && editTitle !== todo.title) {
      onUpdate(todo.id, { title: editTitle.trim() });
    } else {
      setEditTitle(todo.title);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  const emojis: Record<string, string> = {
    '업무': 'W',
    '개인': 'P',
    '공부': 'S'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={"group flex flex-col py-4 border-b border-gray-100/80 dark:border-gray-800 last:border-0 relative bg-white dark:bg-[#1a1a1a] " + (isDragging ? 'shadow-xl rounded-xl' : '')}
    >
      <div className="flex items-center gap-4">
        <div
          onClick={() => onToggleComplete(todo.id)}
          className={"w-[22px] h-[22px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all border shrink-0 " + (
            todo.completed
              ? 'bg-[#121212] border-[#121212] text-white dark:bg-white dark:border-white dark:text-black scale-[0.9]'
              : 'border-gray-300 dark:border-gray-500 hover:border-gray-400'
          )}
        >
          {todo.completed && <span className="text-[14px] font-bold leading-none">V</span>}
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className="flex-1 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg outline-none font-medium text-[15px]"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={"flex-1 cursor-text transition-colors text-[15px] " + (
              todo.completed ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-gray-100 font-medium'
            )}
          >
            <span className="mr-2.5 opacity-90 inline-block w-4 text-center">{emojis[todo.category] || 'C '}</span>
            {todo.title}
          </span>
        )}

        <div className="opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pr-1 shrink-0">
          <button onClick={() => onDelete(todo.id)} className="text-gray-300 hover:text-red-500 p-1 flex items-center" aria-label="Delete">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"></path></svg>
          </button>
          <button
            {...attributes}
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 p-1"
            aria-label="Drag to reorder"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="8" x2="20" y2="8"/>
              <line x1="4" y1="16" x2="20" y2="16"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
