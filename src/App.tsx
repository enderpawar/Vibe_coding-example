import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

function App() {
  const { allTodos, todos, addTodo, updateTodo, deleteTodo, toggleComplete, filter, setFilter, reorderTodos } = useTodos();
  const { isDark, toggleTheme } = useTheme();
  const totalCount = allTodos.length;
  const completedCount = allTodos.filter((todo) => todo.completed).length;
  const pendingCount = totalCount - completedCount;
  const completionRate = totalCount === 0 ? 0 : Math.round((completedCount / totalCount) * 100);
  const todayLabel = new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  }).format(new Date());
  const statusLabel =
    filter.completed === undefined ? 'All tasks in focus' : filter.completed ? 'Completed archive' : 'Pending only';
  const signalLabel =
    pendingCount === 0
      ? 'Everything is cleared.'
      : pendingCount === 1
        ? 'One sharp objective remains.'
        : `${pendingCount} sharp objectives remain.`;

  return (
    <div className="editorial-shell film-grain relative min-h-screen overflow-hidden px-4 py-4 text-gray-950 transition-colors sm:px-6 lg:px-8 dark:text-gray-50">
      <div className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.92),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(0,0,0,0.08),transparent_28%)] dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.08),transparent_22%)]" />
      <div className="pointer-events-none absolute left-[-8rem] top-12 -z-10 h-72 w-72 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />
      <div className="pointer-events-none absolute bottom-[-6rem] right-[-4rem] -z-10 h-80 w-80 rounded-full bg-black/10 blur-3xl dark:bg-white/10" />

      <div className="hero-grid relative mx-auto flex min-h-[calc(100vh-2rem)] w-full max-w-7xl overflow-hidden rounded-[32px] border border-black/10 bg-white/40 px-0 dark:border-white/10 dark:bg-black/20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.44),transparent_48%,rgba(0,0,0,0.04))] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent_48%,rgba(255,255,255,0.02))]" />
        <div className="relative z-10 grid min-h-[calc(100vh-2rem)] w-full gap-8 px-5 py-5 sm:px-8 sm:py-8 xl:grid-cols-[0.95fr_1.05fr] xl:gap-10">
          <section className="flex flex-col justify-between gap-8 xl:pr-4">
            <div className="flex items-center justify-between animate-reveal">
              <div>
                <p className="eyebrow-label mb-2">Monochrome Task System</p>
                <p className="text-sm text-black/55 dark:text-white/55">{todayLabel}</p>
              </div>
              <button
                onClick={toggleTheme}
                className="hairline-card group relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full transition-transform duration-300 hover:-translate-y-1"
                aria-label="Toggle color theme"
              >
                <span className="absolute inset-0 animate-sheen bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.72)_50%,transparent_80%)] dark:bg-[linear-gradient(115deg,transparent_20%,rgba(255,255,255,0.14)_50%,transparent_80%)]" />
                <span className="relative text-xs font-semibold uppercase tracking-[0.35em]">
                  {isDark ? 'LIT' : 'NOIR'}
                </span>
              </button>
            </div>

            <div className="max-w-2xl">
              <div className="inline-flex animate-reveal items-center gap-3 rounded-full border border-black/10 bg-black px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white dark:border-white/15 dark:bg-white dark:text-black">
                <span className="h-2 w-2 animate-pulse rounded-full bg-white dark:bg-black" />
                Editorial Minimalism
              </div>
              <h1 className="headline-serif mt-6 animate-reveal text-[4rem] leading-[0.88] text-balance sm:text-[5.25rem] lg:text-[6.3rem] xl:text-[7rem]">
                Make your
                <br />
                list look
                <br />
                legendary.
              </h1>
              <p className="stagger-1 mt-6 max-w-xl animate-reveal text-base leading-7 text-black/62 sm:text-lg dark:text-white/62">
                A stark black-and-white workspace with magazine-grade spacing, deliberate motion, and a task flow that
                feels more like a designed object than a utility.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <article className="hairline-card animate-reveal rounded-[28px] p-5 stagger-1">
                <p className="eyebrow-label">Completion</p>
                <div className="mt-6 flex items-end justify-between gap-4">
                  <span className="headline-serif text-5xl leading-none">{completionRate}</span>
                  <span className="pb-1 text-sm uppercase tracking-[0.3em] text-black/45 dark:text-white/45">%</span>
                </div>
                <div className="mt-4 h-px origin-left animate-pulseLine bg-black/70 dark:bg-white/70" />
              </article>
              <article className="hairline-card animate-reveal rounded-[28px] p-5 stagger-2">
                <p className="eyebrow-label">Open Focus</p>
                <div className="mt-6 flex items-end gap-3">
                  <span className="headline-serif text-5xl leading-none">{pendingCount}</span>
                  <span className="pb-1 text-sm uppercase tracking-[0.3em] text-black/45 dark:text-white/45">items</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/55">{signalLabel}</p>
              </article>
              <article className="hairline-card animate-reveal rounded-[28px] p-5 stagger-3">
                <p className="eyebrow-label">Current View</p>
                <p className="headline-serif mt-6 text-[2rem] leading-none">{statusLabel}</p>
                <p className="mt-4 text-sm leading-6 text-black/55 dark:text-white/55">
                  Double click to edit, tap the edge to complete, drag the row to reorder.
                </p>
              </article>
            </div>

            <article className="hairline-card stagger-4 relative hidden animate-reveal overflow-hidden rounded-[32px] p-6 xl:block">
              <div className="absolute inset-y-6 left-6 w-px bg-black/10 dark:bg-white/10" />
              <div className="pl-8">
                <p className="eyebrow-label">Design Note</p>
                <p className="headline-serif mt-4 text-4xl leading-none">Precision over clutter.</p>
                <p className="mt-5 max-w-lg text-sm leading-7 text-black/58 dark:text-white/58">
                  The interface keeps the monochrome palette severe and clean, then uses typography, spacing, and motion
                  to create presence. Every interaction should feel intentional.
                </p>
              </div>
            </article>
          </section>

          <section className="flex min-h-0 flex-col gap-5 xl:py-3">
            <div className="hairline-card animate-reveal rounded-[32px] p-6 stagger-1 sm:p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="eyebrow-label">Task Ledger</p>
                  <h2 className="headline-serif mt-4 text-[2.2rem] leading-none sm:text-[2.8rem]">Curated for momentum.</h2>
                </div>
                <div className="grid grid-cols-3 gap-3 text-center sm:min-w-[290px]">
                  {[
                    ['All', totalCount],
                    ['Done', completedCount],
                    ['Live', pendingCount],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[22px] border border-black/10 bg-white/60 px-3 py-4 dark:border-white/10 dark:bg-white/[0.03]">
                      <div className="text-[11px] uppercase tracking-[0.28em] text-black/45 dark:text-white/45">{label}</div>
                      <div className="mt-2 text-xl font-semibold">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <FilterBar
              filter={filter}
              onFilterChange={setFilter}
              counts={{
                all: totalCount,
                completed: completedCount,
                pending: pendingCount,
              }}
            />

            <TodoList
              todos={todos}
              onUpdate={updateTodo}
              onDelete={deleteTodo}
              onToggleComplete={toggleComplete}
              onReorder={reorderTodos}
            />
          </section>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white/80 to-transparent dark:from-black/80" />

        <div className="fixed bottom-5 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-[28rem] -translate-x-1/2 justify-center sm:bottom-8 xl:left-auto xl:right-10 xl:w-auto xl:max-w-none xl:translate-x-0">
          <TodoForm onAddTodo={addTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
