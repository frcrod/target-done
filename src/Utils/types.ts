export type Todo = {
  id: string;
  content: string;
  isDone: boolean;
};

export type TodoContext = {
  todos: Todo[];
  removeTodo: (id: string) => void;
  addTodo: (content: string) => void;
  updateTodoStatus: (id: string, status: boolean) => void;
  updateTodoContent: (id: string, content: string) => void;
};