import styles from "./TodoList.module.scss";
import { TodosFooter } from "../../enteties/ui/TodosFooter/TodosFooter";
import { TodosHeader } from "../../enteties/ui/TodosHeader/TodosHeader";
import { TodoItem } from "../../enteties/ui/TodoItem/TodoItem";
import { useTodo } from "../../shared/todosContext/TodosContext";
import { motion, AnimatePresence } from "framer-motion";
import { EmptyList } from "../../enteties/ui/EmptyList/EmptyList";
import { TTodoType } from "../../types";

const todoVariants = {
  hidden: { opacity: 0, x: -100 },
  visible: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 100 },
};

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
