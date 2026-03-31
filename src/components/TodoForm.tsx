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
  const categories: Array<{ value: Category; label: string; code: string }> = [
    { value: '업무', label: 'Work', code: 'WRK' },
    { value: '개인', label: 'Life', code: 'LFE' },
    { value: '공부', label: 'Study', code: 'STD' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onAddTodo({ title: title.trim(), priority: '중간', category, completed: false, tags: [] });
    setTitle('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="hairline-card flex w-full items-center justify-between gap-4 overflow-hidden rounded-full px-5 py-4 animate-reveal xl:min-w-[26rem]">
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-black/45 dark:text-white/45">New Entry</p>
          <p className="headline-serif mt-1 truncate text-2xl leading-none">Shape the next move.</p>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-black text-white transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] dark:bg-white dark:text-black"
          aria-label="Open task composer"
        >
          <span className="absolute inset-0 animate-sheen bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.28)_50%,transparent_80%)] dark:bg-[linear-gradient(115deg,transparent_20%,rgba(0,0,0,0.12)_50%,transparent_80%)]" />
          <svg className="relative" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="hairline-card w-full max-w-[32rem] animate-popUp rounded-[34px] p-6 sm:p-7 xl:min-w-[30rem]"
    >
      <div className="flex flex-col gap-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-black/45 dark:text-white/45">Task Composer</p>
          <h3 className="headline-serif mt-3 text-[2.3rem] leading-none">Write it once. Make it count.</h3>
        </div>

        <div className="rounded-[26px] border border-black/10 bg-white/65 p-4 dark:border-white/10 dark:bg-white/[0.03]">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Describe the next decisive task"
            autoFocus
            className="w-full bg-transparent text-lg font-medium outline-none placeholder:text-black/28 dark:placeholder:text-white/24"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((item) => {
            const selected = category === item.value;

            return (
              <button
                key={item.value}
                type="button"
                onClick={() => setCategory(item.value)}
                className={
                  'rounded-full border px-4 py-2.5 text-left transition-all duration-300 ' +
                  (selected
                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                    : 'border-black/10 bg-white/60 text-black hover:border-black/18 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:hover:border-white/18')
                }
              >
                <span className="block text-[10px] uppercase tracking-[0.32em] opacity-60">{item.code}</span>
                <span className="mt-1 block text-sm font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-black/10 pt-4 dark:border-white/10">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-full px-4 py-2.5 text-sm font-semibold uppercase tracking-[0.2em] text-black/42 transition-colors hover:text-black dark:text-white/42 dark:hover:text-white"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <span className="hidden text-[11px] uppercase tracking-[0.24em] text-black/38 dark:text-white/38 sm:inline">
              Enter to commit
            </span>
            <button
              type="submit"
              disabled={!title.trim()}
              className="rounded-full bg-black px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:translate-y-0 dark:bg-white dark:text-black"
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
