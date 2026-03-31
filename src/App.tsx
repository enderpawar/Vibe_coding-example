import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete, filter, setFilter, reorderTodos } = useTodos();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-[#F4F5F5] dark:bg-[#0E0E0E] text-gray-900 dark:text-gray-100 flex flex-col items-center pb-32 font-sans transition-colors relative overflow-hidden">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gray-200/50 dark:bg-gray-900 rounded-full blur-[120px] -z-10 opacity-70"></div>
      
      <div className="w-full max-w-md px-6 pt-16 flex flex-col gap-6 relative z-10 min-h-screen">
        <header className="flex items-start justify-between mb-2">
          <div>
            <h1 className="text-[26px] font-bold tracking-tight">Hey, User 👊</h1>
            <p className="text-[#888] dark:text-gray-400 font-serif italic mt-1 text-[17px]">Let's make progress today!</p>
          </div>
          <button
            onClick={toggleTheme}
            className="w-12 h-12 rounded-[18px] bg-white dark:bg-[#1a1a1a] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100/50 dark:border-gray-800 flex items-center justify-center hover:scale-105 transition-transform"
          >
            <span className="text-xl">{isDark ? '☀️' : '🌙'}</span>
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

        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
            <TodoForm onAddTodo={addTodo} />
        </div>
      </div>
    </div>
  );
}

export default App;
