export type Priority = '높음' | '중간' | '낮음';
export type Category = '업무' | '개인' | '공부';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  priority: Priority;
  category: Category;
  tags: string[];
  order: number;
  createdAt: number;
  updatedAt: number;
}

export interface Filter {
  priority?: Priority;
  category?: Category;
  completed?: boolean;
  search?: string;
}
