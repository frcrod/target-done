import React, { useEffect, useState } from 'react';
import { type Todo as TodoType } from '../Utils/types';
import { Button, List } from 'antd';
import Checkbox, { CheckboxChangeEvent } from 'antd/es/checkbox';

export default function Landing() {
  const [todos, setTodos] = useState<TodoType[]>([
    { id: 'asf13', content: 'Hello World', isDone: false },
    { id: 'asdfadf1a', content: 'Hello World!', isDone: true },
    { id: 'asfasdf11', content: 'Hello World!!', isDone: false },
  ]);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

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

  const checkBoxOnChange = (e: CheckboxChangeEvent, id: string) => {
    updateTodoStatus(id, e.target.checked);
  };

  return (
    <List
      dataSource={todos}
      bordered
      renderItem={(todo) => {
        return (
          <List.Item key={todo.id}>
            <Checkbox
              style={{
                textDecoration: todo.isDone ? 'line-through' : 'none',
              }}
              checked={todo.isDone}
              onChange={(event) => checkBoxOnChange(event, todo.id)}>
              {todo.content}
              <Button onClick={() => removeTodo(todo.id)}>X</Button>
            </Checkbox>
          </List.Item>
        );
      }}
    />
  );
}
