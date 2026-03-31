const fs = require('fs');

const appTsx = `import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete, filter, setFilter, reorderTodos } = useTodos();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className=\\"min-h-screen bg-[#F4F5F5] dark:bg-[#0E0E0E] text-gray-900 dark:text-gray-100 flex flex-col items-center pb-32 font-sans transition-colors relative overflow-hidden\\">
      {/* Subtle background glow effect */}
      <div className=\\"absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gray-200/50 dark:bg-gray-900 rounded-full blur-[120px] -z-10 opacity-70\\"></div>

      <div className=\\"w-full max-w-md px-6 pt-16 flex flex-col gap-6 relative z-10 min-h-screen\\">
        <header className=\\"flex items-start justify-between mb-2\\">
          <div>
            <h1 className=\\"text-[26px] font-bold tracking-tight\\">Hey, User  👋</h1>
            <p className=\\"text-[#888] dark:text-gray-400 font-serif italic mt-1 text-[17px]\\">Let's make progress today!</p>
          </div>
          <button
            onClick={toggleTheme}
            className=\\"w-12 h-12 rounded-[18px] bg-white dark:bg-[#1a1a1a] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-gray-100/50 dark:border-gray-800 flex items-center justify-center hover:scale-105 transition-transform\\"        
          >
            <span className=\\"text-xl\\">{isDark ? '☀️' : '🌙'}</span>
          </button>
        </header>

        <FilterBar filter={filter} onFilterChange={setFilter} />

        <TodoList
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
          onReorder={reorderTodos}
        />

        <div className=\\"fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center\\">
           <TodoForm onAddTodo={addTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;`;

const filterBarTsx = `import type { Filter } from '../types/todo';

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  const status = filter.completed === undefined ? 'all' : filter.completed ? 'completed' : 'pending';

  const setStatus = (s: 'all' | 'completed' | 'pending') => {
     onFilterChange({ ...filter, completed: s === 'all' ? undefined : s === 'completed' });
  };

  return (
    <div className=\\"flex bg-white dark:bg-[#1a1a1a] p-1.5 rounded-full shadow-sm w-full mx-auto justify-between border border-gray-100 dark:border-gray-800\\">
      <button
        onClick={() => setStatus('all')}
        className={`flex-1 py-3 rounded-full text-sm font-semibold tracking-wide transition-all \${status === 'all' ? 'bg-[#121212] text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        ✦ To do
      </button>
      <button
        onClick={() => setStatus('completed')}
        className={`flex-1 py-3 rounded-full text-sm font-semibold tracking-wide transition-all gap-1.5 flex items-center justify-center \${status === 'completed' ? 'bg-[#121212] text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        ✓ Completed
      </button>
      <button
        onClick={() => setStatus('pending')}
        className={`flex-1 py-3 rounded-full text-sm font-semibold tracking-wide transition-all gap-1.5 flex items-center justify-center \${status === 'pending' ? 'bg-[#121212] text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'}`}
      >
        ⏱ Pending
      </button>
    </div>
  );
}`;

const todoListTsx = `import { DndContext, closestCenter } from '@dnd-kit/core';
import type { DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
  onReorder: (activeId: string, overId: string) => void;
}

export function TodoList({ todos, onUpdate, onDelete, onToggleComplete, onReorder }: TodoListProps) {
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over ; active.id !== over.id) {
      onReorder(String(active.id), String(over.id));
    }
  };

  if (todos.length === 0) {
    return (
      <div className=\\"bg-white dark:bg-[#1a1a1a] rounded-[32px] p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 mt-2\\">
        <div className=\\"text-4xl mb-4\\">✨</div>
        <h3 className=\\"font-bold text-lg mb-1\\">You're all caught up!</h3>   
        <p className=\\"text-gray-400 text-sm\\">Add a new task to get started.</p>
      </div>
    );
  }

  return (
    <div className=\\"bg-white dark:bg-[#1a1a1a] rounded-[32px] p-6 pb-4 pt-4 shadow-[0_8px_40px_rgb(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 min-h-[300px] mt-2\\">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}> 
        <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className=\\"flex flex-col\\">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onUpdate={onUpdate}
                onDelete={onDelete}
                onToggleComplete={onToggleComplete}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}`;

const todoItemTsx = `import { useState } from 'react';
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
    if (editTitle.trim() ; editTitle !== todo.title) {
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
    '업무': '👔',
    '개인': '🌱',
    '공부': '📚'
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group flex flex-col py-4 border-b border-gray-100/80 dark:border-gray-800 last:border-0 relative bg-white dark:bg-[#1a1a1a] \${isDragging ? 'shadow-xl rounded-xl' : ''}`}
    >
      <div className=\\"flex items-center gap-4\\">
        <div
          onClick={() => onToggleComplete(todo.id)}
          className={`w-[22px] h-[22px] rounded-[6px] flex items-center justify-center cursor-pointer transition-all border shrink-0 \${
            todo.completed
              ? 'bg-[#121212] border-[#121212] text-white dark:bg-white dark:border-white dark:text-black scale-[0.9]'
              : 'border-gray-300 dark:border-gray-500 hover:border-gray-400'    
          }`}
        >
          {todo.completed ; <span className=\\"text-[14px] font-bold leading-none\\">✓</span>}
        </div>

        {isEditing ? (
          <input
            type=\\"text\\"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            autoFocus
            className=\\"flex-1 bg-gray-50 dark:bg-gray-800 px-3 py-1.5 rounded-lg outline-none font-medium text-[15px]\\"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className={`flex-1 cursor-text transition-colors text-[15px] \${   
              todo.completed ? 'text-gray-400 line-through' : 'text-gray-800 dark:text-gray-100 font-medium'
            }`}
          >
            <span className=\\"mr-2.5 opacity-90 inline-block w-4 text-center\\">{emojis[todo.category] ; '📌'}</span>
            {todo.title}
          </span>
        )}

        <div className=\\"opacity-0 lg:group-hover:opacity-100 transition-opacity flex items-center gap-1.5 pr-1 shrink-0\\">
          <button onClick={() => onDelete(todo.id)} className=\\"text-gray-300 hover:text-red-500 p-1 flex items-center\\" aria-label=\\"Delete\\">
            <svg width=\\"14\\" height=\\"14\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" strokeWidth=\\"2.5\\" strokeLinecap=\\"round\\"><path d=\\"M18 6L6 18M6 6l12 12\\"></path></svg>
          </button>
          <button
            {...attributes}
            {...listeners}
            className=\\"cursor-grab active:cursor-grabbing text-gray-300 hover:text-gray-600 dark:hover:text-gray-400 p-1\\"
            aria-label=\\"Drag to reorder\\"
          >
            <svg width=\\"15\\" height=\\"15\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" strokeWidth=\\"2\\" strokeLinecap=\\"round\\">
              <line x1=\\"4\\" y1=\\"8\\" x2=\\"20\\" y2=\\"8\\"/>
              <line x1=\\"4\\" y1=\\"16\\" x2=\\"20\\" y2=\\"16\\"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}`;

const todoFormTsx = `import { useState } from 'react';
import type { Todo, Priority, Category } from '../types/todo';

export function TodoForm({
  onAddTodo,
}: {
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('개인');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTodo({ title: title.trim(), priority: '중간', category, completed: false, tags: [] });
    setTitle('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className=\\"flex bg-white dark:bg-[#1a1a1a] p-2 pr-2.5 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] items-center gap-6 border border-gray-100 dark:border-gray-800 animate-fadeInUp\\"> 
         <div className=\\"flex gap-4 pl-6 pr-2 text-[13px] text-gray-400 font-semibold tracking-wide\\">
           <span className=\\"text-[#121212] dark:text-white cursor-pointer px-1 flex flex-col items-center\\">
             <svg className=\\"w-5 h-5 mb-0.5\\" viewBox=\\"0 0 24 24\\" fill=\\"currentColor\\"><path d=\\"M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9h-3v-6H9v6H6v-9l6-4.5z\\"/></svg>
           </span>
           <span className=\\"hover:text-[#121212] dark:hover:text-white cursor-pointer px-1 transition-colors flex flex-col items-center\\">
              <svg className=\\"w-5 h-5 mb-0.5\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" strokeWidth=\\"2.5\\"><rect x=\\"3\\" y=\\"3\\" width=\\"18\\" height=\\"18\\" rx=\\"4\\"/><path d=\\"M3 9h18M9 21V9\\"/></svg>
           </span>
           <span className=\\"hover:text-[#121212] dark:hover:text-white cursor-pointer px-1 transition-colors flex flex-col items-center\\">
              <svg className=\\"w-5 h-5 mb-0.5\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" strokeWidth=\\"2.5\\"><circle cx=\\"12\\" cy=\\"8\\" r=\\"4\\"/><path d=\\"M20 21a8 8 0 10-16 0\\"/></svg>
           </span>
         </div>
         <button
           onClick={() => setIsOpen(true)}
           className=\\"w-12 h-12 rounded-full bg-[#121212] dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] transition-all shadow-md ml-2\\"
         >
           <svg width=\\"22\\" height=\\"22\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" strokeWidth=\\"2.5\\" strokeLinecap=\\"round\\"><path d=\\"M12 5v14M5 12h14\\"/></svg>
         </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className=\\"bg-white dark:bg-[#1a1a1a] rounded-[32px] p-6 shadow-[0_20px_40px_rgb(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgb(0,0,0,0.4)] w-[90vw] max-w-[400px] mb-2 border border-gray-100 dark:border-gray-800 animate-popUp\\"
    >
      <div className=\\"flex flex-col gap-4\\">
        <input
          type=\\"text\\"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=\\"What do you need to do?\\"
          autoFocus
          className=\\"w-full text-lg font-semibold bg-transparent border-none focus:outline-none dark:text-white placeholder-gray-300 dark:placeholder-gray-600\\"
        />
        <div className=\\"flex items-center justify-between mt-3 pt-4 border-t border-gray-100 dark:border-gray-800/60\\">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className=\\"text-sm bg-gray-50 dark:bg-[#252525] rounded-full px-4 py-2.5 text-gray-700 dark:text-gray-200 border-none focus:ring-0 outline-none cursor-pointer font-medium appearance-none\\"
            style={{ textAlignLast: 'center' }}
          >
            <option value=\\"업무\\">👔 Workload</option>
            <option value=\\"개인\\">🌱 Personal</option>
            <option value=\\"공부\\">📚 Study</option>
          </select>

          <div className=\\"flex gap-2\\">
            <button type=\\"button\\" onClick={() => setIsOpen(false)} className=\\"px-4 py-2.5 text-gray-400 hover:text-black dark:hover:text-white font-semibold transition-colors text-sm rounded-full\\">
              Cancel
            </button>
            <button type=\\"submit\\" disabled={!title.trim()} className=\\"px-6 py-2.5 bg-[#121212] text-white dark:bg-white dark:text-black font-semibold flex items-center justify-center disabled:opacity-40 disabled:hover:scale-100 hover:scale-[1.03] active:scale-[0.97] transition-all rounded-full text-sm shadow-md\\">
              Add task
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}`;

const tailwindConfigTs = `import type { Config } from 'tailwindcss'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'ui-serif', 'serif'],
      },
      keyframes: {
        popUp: {
          '0%': { opacity: '0', transform: 'translateY(15px) scale(0.97)' },    
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },        
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(15px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        popUp: 'popUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        fadeInUp: 'fadeInUp 0.3s ease-out forwards',
      }
    },
  },
  plugins: [],
} satisfies Config`;

fs.writeFileSync('src/App.tsx', appTsx);
fs.writeFileSync('src/components/FilterBar.tsx', filterBarTsx);
fs.writeFileSync('src/components/TodoList.tsx', todoListTsx);
fs.writeFileSync('src/components/TodoItem.tsx', todoItemTsx);
fs.writeFileSync('src/components/TodoForm.tsx', todoFormTsx);
fs.writeFileSync('tailwind.config.ts', tailwindConfigTs);
"`, and this is the output of running that command instead:
Set-Content: A positional parameter cannot be found that accepts argument 'min-h-screen'.

Command exited with code 1
