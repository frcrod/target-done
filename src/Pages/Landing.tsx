import React, { useState } from "react";
import useTodoContext from "../Hooks/useTodoContext";
import { List, Form, Input, Radio, RadioChangeEvent } from "antd";
import Todo from "../Components/Todo";

type CreateFormFieldType = {
  content?: string;
};

type RenderType = "all" | "current" | "done";

export default function Landing() {
  const { todos, addTodo, removeTodo, updateTodoStatus, updateTodoContent } =
    useTodoContext();
  const [renderType, setRenderType] = useState<RenderType>("all");

  const [form] = Form.useForm();

  const formOnSubmit = (data: CreateFormFieldType) => {
    addTodo(data?.content ?? "");
    form.resetFields();
  };

  const radioOnChange = (e: RadioChangeEvent) => {
    setRenderType(e.target.value);
  };

  const currTodos = todos
    .filter((todo) => {
      switch (renderType) {
        case "current":
          return !todo.isDone;
        case "done":
          return todo.isDone;
        default:
          return true;
      }
    })
    .sort((a, b) => Number(a.isDone) - Number(b.isDone));

  return (
    <section style={{ margin: "40px" }}>
      {/* TODO Search */}
      <Form
        name="create"
        layout="vertical"
        onFinish={formOnSubmit}
        form={form}
        requiredMark={false}
      >
        <Form.Item<CreateFormFieldType>
          name="content"
          label="Todo"
          rules={[{ required: true }]}
          style={{ fontWeight: "bold" }}
          tooltip="This input is required"
        >
          <Input allowClear />
        </Form.Item>
      </Form>
      <Radio.Group
        style={{ marginBottom: "20px" }}
        onChange={radioOnChange}
        defaultValue="all"
      >
        <Radio.Button value="all">All</Radio.Button>
        <Radio.Button value="current">Current</Radio.Button>
        <Radio.Button value="done">Done</Radio.Button>
      </Radio.Group>
      <List
        dataSource={currTodos}
        bordered
        renderItem={(todo) => {
          return (
            <List.Item
              key={todo.id}
              style={{
                backgroundColor: todo.isDone ? "#f2f2f2" : "",
              }}
            >
              <Todo
                {...todo}
                removeTodo={removeTodo}
                updateTodoStatus={updateTodoStatus}
                updateTodoContent={updateTodoContent}
              />
            </List.Item>
          );
        }}
      />
    </section>
  );
}
