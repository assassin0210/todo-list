import { Button, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./TodosHeader.module.scss";
import { useState } from "react";
import { useTodo } from "../../../../entities/todosContext/TodosContext";

export const TodosHeader = () => {
  const { addTodo, toggleAllTodos } = useTodo();

  const [value, setValue] = useState("");

  return (
    <header className={styles.root}>
      <Button
        onClick={toggleAllTodos}
        size="middle"
        type="text"
        icon={<DownOutlined />}
      />
      <Input
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value.length) {
            addTodo({ type: "active", id: Date.now(), label: value });
            setValue("");
          }
        }}
        onChange={(e) => setValue(e.target.value)}
        size="middle"
        placeholder="What need to be one?"
      />
    </header>
  );
};
