export type TTodoType = "active" | "completed";

export interface ITodo {
  label: string;
  type: TTodoType;
  id: number;
}
