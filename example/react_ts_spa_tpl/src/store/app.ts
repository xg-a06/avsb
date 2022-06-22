import createModel from '@/store/util';

export interface Todo {
  id: number;
  name: string;
  completed: boolean;
}

type Filter = 'all' | 'completed';

interface Store {
  key: string;
  todos: Todo[];
  filter: Filter;
  addTodo(todo: Omit<Todo, 'id'>): void;
  removeTodo(id: number): void;
  updateTodo(id: number, value: boolean): void;
  toggleFilter(filter: Filter): void;
}

let id = 1;

const model = createModel<Store>({
  key: 'app',
  todos: [],
  filter: 'all',
  addTodo(todo) {
    this.todos.push({
      ...todo,
      id: id++,
    });
  },
  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  },
  updateTodo(id, value) {
    const todo = this.todos.find((todo: any) => todo.id === id);
    if (todo) {
      todo.completed = value;
    }
  },
  toggleFilter(filter) {
    this.filter = filter;
  },
});

export const filters: Filter[] = ['all', 'completed'];

export default model;
