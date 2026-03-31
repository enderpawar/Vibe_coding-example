import { useState, type KeyboardEvent } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  index: number;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export function TodoItem({ todo, index, onUpdate, onDelete, onToggleComplete }: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: todo.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.55 : 1,
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') {
      setEditTitle(todo.title);
      setIsEditing(false);
    }
  };

  const categoryCodes: Record<string, string> = {
    '업무': 'WRK',
    '개인': 'LFE',
    '공부': 'STD',
  };
  const itemNumber = String(index + 1).padStart(2, '0');
  const itemState = todo.completed ? 'Archived' : 'Active';

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={
        'group relative py-2 transition-[transform,box-shadow,opacity] duration-300 ' +
        (isDragging ? 'z-20 scale-[1.01]' : '')
      }
    >
      <div
        className={
          'relative grid gap-4 rounded-[28px] border px-4 py-4 transition-all duration-300 sm:grid-cols-[auto_auto_minmax(0,1fr)_auto] sm:px-5 ' +
          (todo.completed
            ? 'border-black/10 bg-black/[0.03] text-black/55 dark:border-white/10 dark:bg-white/[0.03] dark:text-white/55'
            : 'border-black/10 bg-white/72 text-black shadow-[0_14px_30px_rgba(0,0,0,0.04)] hover:-translate-y-0.5 hover:border-black/20 dark:border-white/10 dark:bg-white/[0.02] dark:text-white dark:hover:border-white/18') +
          (isDragging ? ' shadow-[0_22px_60px_rgba(0,0,0,0.16)] dark:shadow-[0_28px_90px_rgba(0,0,0,0.55)]' : '')
        }
      >
        <div className="absolute inset-x-5 top-0 h-px bg-black/8 dark:bg-white/8" />

        <div className="hidden items-start pt-1 sm:flex">
          <span className="headline-serif text-3xl leading-none text-black/26 dark:text-white/22">{itemNumber}</span>
        </div>

        <button
          onClick={() => onToggleComplete(todo.id)}
          className={
            'relative mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ' +
            (todo.completed
              ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
              : 'border-black/18 bg-white/70 text-black hover:scale-105 dark:border-white/18 dark:bg-white/[0.03] dark:text-white')
          }
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          <span className="absolute inset-[5px] rounded-full border border-current opacity-15" />
          {todo.completed ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.2 4.2L19 7" />
            </svg>
          ) : (
            <span className="h-2 w-2 rounded-full bg-current opacity-70" />
          )}
        </button>

        <div className="min-w-0">
          <div className="mb-3 flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/42">
            <span>{categoryCodes[todo.category] || 'TAG'}</span>
            <span className="inline-block h-1 w-1 rounded-full bg-current opacity-60" />
            <span>{itemState}</span>
          </div>

          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={handleKeyDown}
              autoFocus
              className="w-full rounded-[18px] border border-black/12 bg-black/[0.03] px-4 py-3 text-base font-medium outline-none transition focus:border-black/25 dark:border-white/12 dark:bg-white/[0.04] dark:focus:border-white/24"
            />
          ) : (
            <button
              type="button"
              onDoubleClick={() => setIsEditing(true)}
              className="block w-full cursor-text text-left"
            >
              <span
                className={
                  'block text-[1rem] leading-7 transition-colors sm:text-[1.08rem] ' +
                  (todo.completed
                    ? 'line-through text-black/40 dark:text-white/36'
                    : 'font-medium text-black dark:text-white')
                }
              >
                {todo.title}
              </span>
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-2 sm:justify-end">
          <span className="headline-serif text-2xl leading-none text-black/24 dark:text-white/20 sm:hidden">{itemNumber}</span>
          <div className="flex items-center gap-1.5 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
            <button
              onClick={() => onDelete(todo.id)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-transparent text-black/34 transition-all hover:border-black/12 hover:text-black dark:text-white/34 dark:hover:border-white/12 dark:hover:text-white"
              aria-label="Delete"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <button
              {...attributes}
              {...listeners}
              className="flex h-10 w-10 cursor-grab items-center justify-center rounded-full border border-transparent text-black/34 transition-all active:cursor-grabbing hover:border-black/12 hover:text-black dark:text-white/34 dark:hover:border-white/12 dark:hover:text-white"
              aria-label="Drag to reorder"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="7" y1="8" x2="17" y2="8" />
                <line x1="7" y1="12" x2="17" y2="12" />
                <line x1="7" y1="16" x2="17" y2="16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
