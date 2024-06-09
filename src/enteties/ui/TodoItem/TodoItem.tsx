import { Radio } from "antd";
import styles from "./TodoItem.module.scss";
import { ITodo } from "../../../types";

export const TodoItem = (todo: ITodo) => {
  return (
    <article className={styles.root}>
      <Radio checked={todo.type === "completed"}>{todo.label}</Radio>
    </article>
  );
};
