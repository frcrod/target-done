import { useContext } from "react";
import { TodoContext } from "../Contexts/TodoContext";
import { type TodoContext as TodoContextType } from "../Utils/types";

export default function useTodoContext(){
  const { todos, updateTodoStatus, addTodo, removeTodo, updateTodoContent } = useContext(TodoContext) as TodoContextType;

  if(todos === undefined) throw Error();

  return { todos, addTodo, removeTodo, updateTodoContent, updateTodoStatus}
}