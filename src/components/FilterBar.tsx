import type { Filter } from '../types/todo';

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
    <div className="flex bg-white dark:bg-[#1a1a1a] p-1.5 rounded-full shadow-sm w-full mx-auto justify-between border border-gray-100 dark:border-gray-800">
      <button 
        onClick={() => setStatus('all')}
        className={"flex-1 py-3 rounded-full text-sm font-semibold tracking-wide transition-all " + (status === 'all' ? 'bg-[#121212] text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-200')}
      >
        To do
      </button>
      <button 
        onClick={() => setStatus('completed')}
        className={"flex-1 py-3 rounded-full text-sm font-semibold tracking-wide transition-all gap-1.5 flex items-center justify-center " + (status === 'completed' ? 'bg-[#121212] text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-200')}
      >
        Completed
      </button>
      <button 
        onClick={() => setStatus('pending')}
        className={"flex-1 py-3 rounded-full text-sm font-semibold tracking-wide transition-all gap-1.5 flex items-center justify-center " + (status === 'pending' ? 'bg-[#121212] text-white dark:bg-white dark:text-black shadow-md' : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-200')}
      >
        Pending
      </button>
    </div>
  );
}
