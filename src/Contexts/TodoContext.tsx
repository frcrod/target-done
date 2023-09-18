import { useState, createContext, useEffect } from "react";
import { type ReactNode } from "react";
import { type Todo } from "../Utils/types";

type TodoProviderProps = {
  children: ReactNode;
};

export type TodoContext = {
  todos: Todo[];
  removeTodo: (id: string) => void;
  addTodo: (content: string) => void;
  updateTodoStatus: (id: string, status: boolean) => void;
  updateTodoContent: (id: string, content: string) => void;
};

export const TodoContext = createContext<TodoContext | undefined>(undefined);

export default function TodoProvider({ children }: TodoProviderProps) {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: "asf13",
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum eaque ipsa officia harum asperiores ipsam sint dolorum labore mollitia natus! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Earum eaque ipsa officia harum asperiores ipsam sint dolorum labore mollitia natus!",
      isDone: false,
    },
    { id: "asdfadf1a", content: "Hello World!", isDone: true },
    { id: "asfasdf11", content: "Hello World!!", isDone: false },
  ]);

  const removeTodo = (id: string) => {
    setTodos([...todos.filter((value) => value.id !== id)]);
  };

  const addTodo = (content: string) => {
    todos.push({ id: crypto.randomUUID(), content, isDone: false });

    setTodos([...todos]);
  };

  const updateTodoContent = (id: string, content: string) => {
    const update = todos.map((value) => {
      if (value.id === id) {
        return { ...value, content };
      }

      return value;
    });

    setTodos([...update]);
    console.log(todos, content);
  };

  const updateTodoStatus = (id: string, status: boolean) => {
    const update = todos.map((value) => {
      if (value.id === id) {
        return { ...value, isDone: status };
      }

      return value;
    });

    setTodos([...update]);
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        removeTodo,
        addTodo,
        updateTodoContent,
        updateTodoStatus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}