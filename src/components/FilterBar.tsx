import type { Filter } from '../types/todo';

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
  counts: {
    all: number;
    completed: number;
    pending: number;
  };
}

export function FilterBar({ filter, onFilterChange, counts }: FilterBarProps) {
  const status = filter.completed === undefined ? 'all' : filter.completed ? 'completed' : 'pending';

  const setStatus = (s: 'all' | 'completed' | 'pending') => {
    onFilterChange({ ...filter, completed: s === 'all' ? undefined : s === 'completed' });
  };

  const options: Array<{
    id: 'all' | 'completed' | 'pending';
    label: string;
    count: number;
  }> = [
    { id: 'all', label: 'All', count: counts.all },
    { id: 'completed', label: 'Done', count: counts.completed },
    { id: 'pending', label: 'Live', count: counts.pending },
  ];

  return (
    <div className="hairline-card animate-reveal rounded-[30px] p-2 stagger-2">
      <div className="grid grid-cols-3 gap-2">
        {options.map((option) => {
          const selected = status === option.id;

          return (
            <button
              key={option.id}
              onClick={() => setStatus(option.id)}
              className={
                'group relative overflow-hidden rounded-[22px] border px-4 py-4 text-left transition-all duration-300 ' +
                (selected
                  ? 'border-black bg-black text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)] dark:border-white dark:bg-white dark:text-black'
                  : 'border-black/10 bg-white/60 text-black hover:-translate-y-0.5 hover:border-black/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:hover:border-white/20')
              }
            >
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.18),transparent_65%)] opacity-80 dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.06),transparent_65%)]" />
              <span className="relative block text-[11px] font-semibold uppercase tracking-[0.28em] opacity-70">{option.label}</span>
              <span className="headline-serif relative mt-2 block text-3xl leading-none">{option.count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
