import type { Filter, Priority, Category } from '../types/todo';

interface FilterBarProps {
  filter: Filter;
  onFilterChange: (filter: Filter) => void;
}

export function FilterBar({ filter, onFilterChange }: FilterBarProps) {
  return (
    <div className="flex flex-wrap gap-3 bg-white dark:bg-gray-800 p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-transparent dark:border-gray-700">
      <input
        type="text"
        placeholder="검색..."
        value={filter.search || ''}
        onChange={(e) => onFilterChange({ ...filter, search: e.target.value })}
        className="flex-1 min-w-[120px] rounded-full border border-gray-200 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <select
        value={filter.priority || ''}
        onChange={(e) => onFilterChange({ ...filter, priority: e.target.value as Priority || undefined })}
        className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">모든 우선순위</option>
        <option value="높음">🔴 높음</option>
        <option value="중간">🟡 중간</option>
        <option value="낮음">🔵 낮음</option>
      </select>
      <select
        value={filter.category || ''}
        onChange={(e) => onFilterChange({ ...filter, category: e.target.value as Category || undefined })}
        className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">모든 카테고리</option>
        <option value="업무">💼 업무</option>
        <option value="개인">🏠 개인</option>
        <option value="공부">📚 공부</option>
      </select>
      <select
        value={filter.completed?.toString() || ''}
        onChange={(e) => {
          const val = e.target.value;
          onFilterChange({ ...filter, completed: val === '' ? undefined : val === 'true' });
        }}
        className="rounded-full border border-gray-200 dark:border-gray-600 px-4 py-2 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">모든 상태</option>
        <option value="false">진행중</option>
        <option value="true">완료됨</option>
      </select>
    </div>
  );
}