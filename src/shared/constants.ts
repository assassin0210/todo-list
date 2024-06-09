import { IContextType } from "./types";
import { getLSTodos, getLSType } from "./helpers";

export enum localStorageConstants {
  type = "type",
  todos = "todos",
}

export const defaultValue: IContextType = {
  todos: getLSTodos(),
  filteredTodos: getLSTodos(),
  type: getLSType(),
  changeType: () => null,
  addTodo: () => null,
  setCompleteTodo: () => null,
  clearComplete: () => null,
  toggleAllTodos: () => null,
};
