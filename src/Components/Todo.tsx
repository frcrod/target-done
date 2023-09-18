import React from "react";
import { Checkbox, Button, Form, Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { type CheckboxChangeEvent } from "antd/es/checkbox";

type TodoProps = {
  id: string;
  content: string;
  isDone: boolean;
  removeTodo: (id: string) => void;
  updateTodoStatus: (id: string, status: boolean) => void;
  updateTodoContent: (id: string, content: string) => void;
};

type UpdateFormField = {
  content?: string;
};

export default function Todo({
  id,
  content,
  isDone,
  removeTodo,
  updateTodoStatus,
  updateTodoContent,
}: TodoProps) {
  const checkBoxOnChange = (e: CheckboxChangeEvent, id: string) => {
    updateTodoStatus(id, e.target.checked);
  };

  const updateContentFormSubmit = (data: UpdateFormField) => {
    updateTodoContent(id, data?.content ?? "");
  };

  return (
    <React.Fragment>
      <section
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "left",
          width: "100%",
        }}
      >
        <Checkbox
          checked={isDone}
          onChange={(event) => checkBoxOnChange(event, id)}
          style={{ flexGrow: 0 }}
        />
        <Form
          name={`updateTodoContent-${id}`}
          style={{
            margin: "auto",
            fontSize: "1.05rem",
            flexGrow: "1",
            textOverflow: "ellipsis",
            overflow: "hidden",
            textDecoration: isDone ? "line-through" : "none",
          }}
          requiredMark={false}
          initialValues={{ content }}
          onFinish={updateContentFormSubmit}
        >
          <Form.Item<UpdateFormField>
            name="content"
            style={{ margin: "auto", fontSize: "1.1rem" }}
            tooltip="This a required field"
            required
          >
            <Input bordered={false} />
          </Form.Item>
        </Form>
      </section>
      <Button onClick={() => removeTodo(id)} icon={<CloseOutlined />} />
    </React.Fragment>
  );
}
