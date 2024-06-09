import { Button } from "antd";
import styles from "./TodosFooter.module.scss";
import { useTodo } from "../../../shared/todosContext/TodosContext";
export const TodosFooter = () => {
  const { type, changeType, todos, clearComplete, filteredTodos } = useTodo();

  const emptyTodos = todos.length === 0;
  return (
    <article className={styles.root}>
      <p className={styles.leftItems}>{todos.length} items left</p>
      <div>
        <Button
          size="small"
          disabled={emptyTodos}
          onClick={() => changeType(null)}
          type={type ? "text" : "primary"}
        >
          All
        </Button>
        <Button
          size="small"
          disabled={emptyTodos}
          onClick={() => changeType("active")}
          type={type === "active" ? "primary" : "text"}
        >
          Active
        </Button>
        <Button
          size="small"
          disabled={emptyTodos}
          onClick={() => changeType("completed")}
          type={type === "completed" ? "primary" : "text"}
        >
          Completed
        </Button>
      </div>
      {todos.some((todo) => todo.type === "completed") ? (
        <Button
          onClick={clearComplete}
          size="small"
          disabled={emptyTodos}
          type="text"
        >
          Clear completed
        </Button>
      ) : (
        <div />
      )}
    </article>
  );
};
