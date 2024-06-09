import React, { createContext, ReactNode, useContext } from "react";
import { IContextType } from "../../shared/types";
import { defaultValue } from "../../shared/constants";
import { useTodoContext } from "./useTodoContext";

const TodoContext = createContext<IContextType>(defaultValue);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const context = useTodoContext();

  return (
    <TodoContext.Provider value={context}>{children}</TodoContext.Provider>
  );
};

export const useTodo = (): IContextType => {
  return useContext(TodoContext);
};
