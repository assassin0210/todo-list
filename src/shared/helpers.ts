import { ITodo, TTodoType } from "./types";
import { localStorageConstants } from "./constants";

export const getLSType = (): TTodoType | null =>
  (localStorage.getItem(localStorageConstants.type) as TTodoType) ?? null;

export const getLSTodos = (): ITodo[] =>
  JSON.parse(localStorage.getItem(localStorageConstants.todos) || "[]");

export const setLSTodo = (data: ITodo[]) =>
  localStorage.setItem(localStorageConstants.todos, JSON.stringify(data));

export const setLSType = (newType: TTodoType) =>
  localStorage.setItem(localStorageConstants.type, JSON.stringify(newType));
