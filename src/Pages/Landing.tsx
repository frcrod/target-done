import React from "react";
import useTodoContext from "../Hooks/useTodoContext";
import { List, Form, Input } from "antd";
import { type CheckboxChangeEvent } from "antd/es/checkbox";
import Todo from "../Components/Todo";

type CreateFormFieldType = {
  content?: string;
};

export default function Landing() {
  const { todos, addTodo, removeTodo, updateTodoStatus, updateTodoContent } =
    useTodoContext();

  const [form] = Form.useForm();

  const checkBoxOnChange = (e: CheckboxChangeEvent, id: string) => {
    updateTodoStatus(id, e.target.checked);
  };

  const formOnSubmit = (data: CreateFormFieldType) => {
    addTodo(data?.content ?? "");
    form.resetFields();
  };

  return (
    <section style={{ margin: "40px" }}>
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
      <List
        dataSource={todos}
        bordered
        renderItem={(todo) => {
          return (
            <List.Item key={todo.id}>
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
