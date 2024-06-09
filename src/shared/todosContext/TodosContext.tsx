import React, { createContext, useState, useContext, ReactNode } from "react";
import { ITodo, TTodoType } from "../../types";
import { localStorageConstants } from "../constants";

const getLSType = (): TTodoType | null =>
  (localStorage.getItem(localStorageConstants.type) as TTodoType) ?? null;

const getLSTodos = (): ITodo[] =>
  JSON.parse(localStorage.getItem(localStorageConstants.todos) || "[]");

interface IContextType {
  todos: ITodo[];
  type: TTodoType | null;
  changeType: (type: TTodoType | null) => void;
  addTodo: (todo: ITodo) => void;
  setCompleteTodo: (id: number) => void;
  clearComplete: () => void;
}

const defaultValue: IContextType = {
  todos: getLSTodos(),
  type: getLSType(),
  changeType: () => null,
  addTodo: () => null,
  setCompleteTodo: () => null,
  clearComplete: () => null,
};

const TodoContext = createContext<IContextType>(defaultValue);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<TTodoType | null>(getLSType());
  const [todos, setTodos] = useState<ITodo[]>(getLSTodos());

  const changeType = (newType: TTodoType | null) => {
    if (newType !== null) {
      localStorage.setItem(localStorageConstants.type, newType); // Исправлено на newType
    } else {
      localStorage.removeItem(localStorageConstants.type);
    }
    setType(newType);
  };

  const addTodo = (todo: ITodo) => {
    setTodos((prevTodos) => {
      const data = [...prevTodos, todo];
      localStorage.setItem(localStorageConstants.todos, JSON.stringify(data));
      return data;
    });
  };

  const setCompleteTodo = (id: number) => {
    setTodos((prevTodos) => {
      const data = prevTodos.filter((todo) => todo.id !== id);
      localStorage.setItem(localStorageConstants.todos, JSON.stringify(data));
      return data;
    });
  };

  const clearComplete = () => {
    setTodos((prev) => {
      const data = prev.filter((todo) => todo.type !== "completed");
      localStorage.setItem(localStorageConstants.todos, JSON.stringify(data));

      return data;
    });
  };
  return (
    <TodoContext.Provider
      value={{
        type,
        todos,
        changeType,
        addTodo,
        setCompleteTodo,
        clearComplete,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};
