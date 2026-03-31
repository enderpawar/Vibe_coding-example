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
      <div className="hairline-card animate-reveal mt-1 rounded-[34px] px-8 py-14 text-center stagger-3">
        <p className="eyebrow-label">Zero State</p>
        <h3 className="headline-serif mt-5 text-5xl leading-none sm:text-6xl">Silence looks good here.</h3>
        <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-black/58 dark:text-white/58">
          There are no visible tasks in this view. Add something new or switch the filter to bring the board back to
          life.
        </p>
        <div className="mx-auto mt-8 h-px w-32 animate-pulseLine bg-black/70 dark:bg-white/70" />
      </div>
    );
  }
  
  return (
    <div className="hairline-card relative min-h-[260px] overflow-hidden rounded-[34px] p-4 sm:p-5">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/70 to-transparent dark:from-white/[0.04]" />
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={todos.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          <div className="relative flex flex-col">
            {todos.map((todo, index) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                index={index}
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
