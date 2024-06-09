import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useMemo,
} from "react";
import { ITodo, TTodoType } from "../../types";
import { localStorageConstants } from "../constants";

const getLSType = (): TTodoType | null =>
  (localStorage.getItem(localStorageConstants.type) as TTodoType) ?? null;

const getLSTodos = (): ITodo[] =>
  JSON.parse(localStorage.getItem(localStorageConstants.todos) || "[]");

interface IContextType {
  todos: ITodo[];
  filteredTodos: ITodo[];
  type: TTodoType | null;
  changeType: (type: TTodoType | null) => void;
  addTodo: (todo: ITodo) => void;
  setCompleteTodo: (id: number) => void;
  clearComplete: () => void;
  toggleAllTodos: () => void;
}

const defaultValue: IContextType = {
  todos: getLSTodos(),
  filteredTodos: getLSTodos(),
  type: getLSType(),
  changeType: () => null,
  addTodo: () => null,
  setCompleteTodo: () => null,
  clearComplete: () => null,
  toggleAllTodos: () => null,
};

const TodoContext = createContext<IContextType>(defaultValue);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
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
      localStorage.setItem(localStorageConstants.type, newType);
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
      localStorage.setItem(localStorageConstants.todos, JSON.stringify(data));
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
      localStorage.setItem(localStorageConstants.todos, JSON.stringify(data));
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
        filteredTodos,
        toggleAllTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  return useContext(TodoContext);
};
