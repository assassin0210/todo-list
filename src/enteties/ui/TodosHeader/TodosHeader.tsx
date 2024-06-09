import { Button, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./TodosHeader.module.scss";
import { useState } from "react";
import { useTodo } from "../../../shared/todosContext/TodosContext";

export const TodosHeader = () => {
  const { addTodo, todos } = useTodo();

  const [value, setValue] = useState("");

  return (
    <article className={styles.root}>
      <Button size="middle" type="text" icon={<DownOutlined />} />
      <Input
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTodo({ type: "active", id: todos.length, label: value });
            setValue("");
          }
        }}
        onChange={(e) => setValue(e.target.value)}
        size="middle"
        placeholder="What need to be one?"
      />
    </article>
  );
};
