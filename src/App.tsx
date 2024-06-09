import React from "react";
import "./App.css";
import { TodoList } from "./feature/TodoList/TodoList";
import { TodoProvider } from "./shared/todosContext/TodosContext";

export const App = () => {
  return (
    <section>
      <TodoProvider>
        <TodoList />
      </TodoProvider>
    </section>
  );
};
