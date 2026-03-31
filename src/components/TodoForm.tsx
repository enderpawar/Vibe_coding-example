import { useState } from 'react';
import type { Todo, Category } from '../types/todo';

export function TodoForm({
  onAddTodo,
}: {
  onAddTodo: (todo: Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'order'>) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<Category>('업무');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTodo({ title: title.trim(), priority: '중간', category, completed: false, tags: [] });
    setTitle('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="flex bg-white dark:bg-[#1a1a1a] p-2 pr-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.4)] items-center gap-6 border border-gray-100 dark:border-gray-800 animate-fadeInUp">
         <div className="flex gap-4 pl-6 pr-2 text-[13px] text-gray-400 font-semibold tracking-wide">
           <span className="text-[#121212] dark:text-white cursor-pointer px-1 flex flex-col items-center">
             <svg className="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3L4 9v12h16V9l-8-6zm0 2.5l6 4.5v9H-3v-6H9v6H6v-9l6-4.5z"/></svg>
           </span>
           <span className="hover:text-[#121212] dark:hover:text-white cursor-pointer px-1 transition-colors flex flex-col items-center">
              <svg className="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M3 9h18M9 21V9"/></svg>
           </span>
           <span className="hover:text-[#121212] dark:hover:text-white cursor-pointer px-1 transition-colors flex flex-col items-center">
              <svg className="w-5 h-5 mb-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 10-16 0"/></svg>
           </span>
         </div>
         <button
           onClick={() => setIsOpen(true)}
           className="w-12 h-12 rounded-full bg-[#121212] dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-[1.03] active:scale-[0.97] transition-all shadow-md ml-2"
         >
           <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 5v14M5 12h14"/></svg>
         </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-[#1a1a1a] rounded-[32px] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.12)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.4)] w-[90vw] max-w-[400px] mb-2 border border-gray-100 dark:border-gray-800 animate-popUp"
    >
      <div className="flex flex-col gap-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What do you need to do?"
          autoFocus
          className="w-full text-lg font-semibold bg-transparent border-none focus:outline-none dark:text-white placeholder-gray-300 dark:placeholder-gray-600"
        />
        <div className="flex items-center justify-between mt-3 pt-4 border-t border-gray-100 dark:border-gray-800/60">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="text-sm bg-gray-50 dark:bg-[#252525] rounded-full px-4 py-2.5 text-gray-700 dark:text-gray-200 border-none focus:ring-0 outline-none cursor-pointer font-medium appearance-none"
            style={{ textAlignLast: 'center' }}
          >
            <option value="업무">Workload</option>
            <option value="개인">Personal</option>
            <option value="공부">Study</option>
          </select>
          
          <div className="flex gap-2">
            <button type="button" onClick={() => setIsOpen(false)} className="px-4 py-2.5 text-gray-400 hover:text-black dark:hover:text-white font-semibold transition-colors text-sm rounded-full">
              Cancel
            </button>
            <button type="submit" disabled={!title.trim()} className="px-6 py-2.5 bg-[#121212] text-white dark:bg-white dark:text-black font-semibold flex items-center justify-center disabled:opacity-40 disabled:hover:scale-100 hover:scale-[1.03] active:scale-[0.97] transition-all rounded-full text-sm shadow-md">
              Add task
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
