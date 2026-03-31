import { DndContext, closestCenter } from '@dnd-kit/core';
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
    if (over && active.id !== over.id) {
      onReorder(String(active.id), String(over.id));
    }
  };

  if (todos.length === 0) {
    return (
      <div className="bg-white dark:bg-[#1a1a1a] rounded-[32px] p-10 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800 mt-2">
        <div className="text-4xl mb-4">✨</div>
        <h3 className="font-bold text-lg mb-1">You're all caught up!</h3>
        <p className="text-gray-400 text-sm">Add a new task to get started.</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-[32px] p-6 pb-4 pt-6 shadow-[0_8px_40px_rgba(0,0,0,0.04)] dark:shadow-none border border-gray-100 dark:border-gray-800/60 min-h-[200px] mt-2">
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col">
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
}
