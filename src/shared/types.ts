export type TTodoType = "active" | "completed";

export interface ITodo {
  label: string;
  type: TTodoType;
  id: number;
}

export interface IContextType {
  todos: ITodo[];
  filteredTodos: ITodo[];
  type: TTodoType | null;
  changeType: (type: TTodoType | null) => void;
  addTodo: (todo: ITodo) => void;
  setCompleteTodo: (id: number) => void;
  clearComplete: () => void;
  toggleAllTodos: () => void;
}
