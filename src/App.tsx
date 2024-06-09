import React from "react";
import styles from "./App.module.scss";
import { TodoList } from "./feature/TodoList/TodoList";
import { TodoProvider } from "./entities/todosContext/TodosContext";

export const App = () => {
  return (
    <section className={styles.root}>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </section>
  );
};
