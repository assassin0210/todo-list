import styles from "./TodoList.module.scss";
import { TodosFooter } from "./components/TodosFooter/TodosFooter";
import { TodosHeader } from "./components/TodosHeader/TodosHeader";
import { TodoItem } from "./components/TodoItem/TodoItem";
import { useTodo } from "../../entities/todosContext/TodosContext";
import { motion, AnimatePresence } from "framer-motion";
import { EmptyList } from "./components/EmptyList/EmptyList";
import { TTodoType } from "../../shared/types";
import { todoVariants } from "./constants";

export const TodoList = () => {
  const { todos, setCompleteTodo, filteredTodos, type } = useTodo();

  return (
    <div className={styles.root}>
      <h1>TODOS</h1>
      <div className={styles.section}>
        <TodosHeader />
        <div className={styles.content}>
          <ul>
            {todos.length > 0 ? (
              <AnimatePresence>
                {filteredTodos.length === 0 ? (
                  <EmptyList variant={type as TTodoType} />
                ) : (
                  filteredTodos.map((todo) => (
                    <motion.li
                      key={todo.id}
                      variants={todoVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      transition={{ duration: 0.3 }}
                    >
                      <TodoItem setCompleteTodo={setCompleteTodo} {...todo} />
                    </motion.li>
                  ))
                )}
              </AnimatePresence>
            ) : (
              <EmptyList variant={"all"} />
            )}
          </ul>

          <TodosFooter />
        </div>
      </div>
      <div className={styles.shadow}></div>
      <div className={`${styles.shadow} ${styles.second}`}></div>
    </div>
  );
};
