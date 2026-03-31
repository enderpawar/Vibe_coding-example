import { useTodos } from './hooks/useTodos';
import { useTheme } from './hooks/useTheme';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { FilterBar } from './components/FilterBar';

function App() {
  const { todos, addTodo, updateTodo, deleteTodo, toggleComplete, filter, setFilter, reorderTodos } = useTodos();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex py-10 justify-center transition-colors'>
      <div className='w-full max-w-2xl px-4 flex flex-col gap-6'>
        <div className='flex items-center justify-between px-2'>
          <h1 className='text-3xl font-bold'>생산성 Todo</h1>
          <button
            onClick={toggleTheme}
            className='p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors'
            title='테마 전환'
          >
            {isDark ? '🌙' : '☀️'}
          </button>
        </div>

        <TodoForm onAddTodo={addTodo} />

        <FilterBar filter={filter} onFilterChange={setFilter} />

        <TodoList
          todos={todos}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          onToggleComplete={toggleComplete}
          onReorder={reorderTodos}
        />
      </div>
    </div>
  );
}

export default App;
