import { Radio } from "antd";
import styles from "./TodoItem.module.scss";
import { ITodo } from "../../../types";
import { memo } from "react";
import classNames from "classnames";

export const TodoItem = memo(
  ({
    setCompleteTodo,
    ...todo
  }: ITodo & { setCompleteTodo: (id: number) => void }) => {
    return (
      <article className={styles.root}>
        <Radio
          className={styles.radio}
          onClick={() => setCompleteTodo(todo.id)}
          checked={todo.type === "completed"}
        >
          <span
            className={classNames({
              [styles.complete]: todo.type === "completed",
            })}
          >
            {todo.label}
          </span>
        </Radio>
      </article>
    );
  },
);
