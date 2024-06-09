import styles from "./TodoList.module.scss";
import { TodosFooter } from "../../enteties/ui/TodosFooter/TodosFooter";
import { TodosHeader } from "../../enteties/ui/TodosHeader/TodosHeader";
import { TodoItem } from "../../enteties/ui/TodoItem/TodoItem";
import { useTodo } from "../../shared/todosContext/TodosContext";

export const TodoList = () => {
  const { addTodo, todos } = useTodo();

  return (
    <div className={styles.root}>
      <TodosHeader />
      <div className={styles.content}>
        <div>
          {todos.map((todo) => (
            <TodoItem {...todo} />
          ))}
        </div>

        <TodosFooter />
      </div>
    </div>
  );
};
