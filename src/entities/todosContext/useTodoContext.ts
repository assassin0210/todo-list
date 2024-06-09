import { useMemo, useState } from "react";
import { ITodo, TTodoType } from "../../shared/types";
import {
  getLSTodos,
  getLSType,
  setLSTodo,
  setLSType,
} from "../../shared/helpers";
import { localStorageConstants } from "../../shared/constants";

export const useTodoContext = () => {
  const [type, setType] = useState<TTodoType | null>(getLSType());
  const [todos, setTodos] = useState<ITodo[]>(getLSTodos());

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (type) {
        case "active":
          return todo.type === "active";
        case "completed":
          return todo.type === "completed";
        default:
          return todo;
      }
    });
  }, [todos, type]);

  const changeType = (newType: TTodoType | null) => {
    if (newType !== null) {
      setLSType(newType);
    } else {
      localStorage.removeItem(localStorageConstants.type);
    }
    setType(newType);
  };

  const addTodo = (todo: ITodo) => {
    setTodos((prevTodos) => {
      const data = prevTodos.some(
        (prevTodo) =>
          prevTodo.label.toLowerCase().trim() ===
          todo.label.toLowerCase().trim(),
      )
        ? prevTodos
        : [...prevTodos, todo];
      setLSTodo(data);
      return data;
    });
  };

  const toggleAllTodos = () => {
    setTodos((prev) => {
      const isAllComplete = prev.every((todo) => todo.type === "completed");
      const data = prev.map((todo) => ({
        ...todo,
        type: (isAllComplete ? "active" : "completed") as TTodoType,
      }));
      setLSTodo(data);
      return data;
    });
  };

  const setCompleteTodo = (id: number) => {
    setTodos((prevTodos) => {
      const data = prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              type:
                todo.type === "completed"
                  ? "active"
                  : ("completed" as TTodoType),
            }
          : todo,
      );
      setLSTodo(data);
      return data;
    });
  };

  const clearComplete = () => {
    setTodos((prev) => {
      const data = prev.filter((todo) => todo.type !== "completed");
      setLSTodo(data);
      return data;
    });
  };

  return {
    type,
    todos,
    changeType,
    addTodo,
    setCompleteTodo,
    clearComplete,
    filteredTodos,
    toggleAllTodos,
  };
};
