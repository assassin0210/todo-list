import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { TodosHeader } from "./TodosHeader";
import {
  TodoProvider,
  useTodo,
} from "../../../shared/todosContext/TodosContext";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../../../shared/todosContext/TodosContext", () => ({
  ...jest.requireActual("../../../shared/todosContext/TodosContext"),
  useTodo: jest.fn() as jest.Mock,
}));

describe("TodosHeader", () => {
  test("renders button and input", () => {
    render(
      <TodoProvider>
        <TodosHeader />
      </TodoProvider>,
    );

    const button = screen.getByRole("button");
    const input = screen.getByPlaceholderText("What need to be one?");

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();
  });

  test("calls toggleAllTodos on button click", () => {
    const toggleAllTodos = jest.fn();
    (useTodo as jest.Mock).mockReturnValue({ toggleAllTodos });
    render(
      <TodoProvider>
        <TodosHeader />
      </TodoProvider>,
    );
    const button = screen.getByRole("button");

    fireEvent.click(button);

    expect(toggleAllTodos).toHaveBeenCalled();
  });

  test("calls addTodo on Enter key press", () => {
    const addTodo = jest.fn();
    (useTodo as jest.Mock).mockReturnValue({ addTodo });
    render(
      <TodoProvider>
        <TodosHeader />
      </TodoProvider>,
    );
    const input = screen.getByPlaceholderText("What need to be one?");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.keyDown(input, { key: "Enter", keyCode: 13 });

    expect(addTodo).toHaveBeenCalledWith({
      type: "active",
      id: expect.any(Number),
      label: "New Todo",
    });
  });
});
