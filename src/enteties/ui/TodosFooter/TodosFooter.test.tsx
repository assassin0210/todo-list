import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { TodosFooter } from "./TodosFooter";
import {
  TodoProvider,
  useTodo,
} from "../../../shared/todosContext/TodosContext";
import "@testing-library/jest-dom/extend-expect";

jest.mock("../../../shared/todosContext/TodosContext", () => ({
  ...jest.requireActual("../../../shared/todosContext/TodosContext"),
  useTodo: jest.fn(),
}));

describe("TodosFooter", () => {
  test("renders footer correctly", () => {
    (useTodo as jest.Mock).mockReturnValue({
      type: "all",
      changeType: jest.fn(),
      todos: [{ id: 1, label: "Todo 1", type: "active" }],
      clearComplete: jest.fn(),
    });

    render(
      <TodoProvider>
        <TodosFooter />
      </TodoProvider>,
    );

    expect(screen.getByText("1 items left")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  test("calls changeType when clicking buttons", () => {
    const changeType = jest.fn();
    (useTodo as jest.Mock).mockReturnValue({
      type: "all",
      changeType,
      todos: [],
      clearComplete: jest.fn(),
    });

    render(
      <TodoProvider>
        <TodosFooter />
      </TodoProvider>,
    );

    fireEvent.click(screen.getByText("Active"));
    fireEvent.click(screen.getByText("Completed"));

    expect(changeType).toHaveBeenCalledTimes(2);
    expect(changeType).toHaveBeenCalledWith("active");
    expect(changeType).toHaveBeenCalledWith("completed");
  });

  test("calls clearComplete when 'Clear completed' button is clicked", () => {
    const clearComplete = jest.fn();
    (useTodo as jest.Mock).mockReturnValue({
      type: "all",
      changeType: jest.fn(),
      todos: [{ id: 1, label: "Todo 1", type: "completed" }],
      clearComplete,
    });

    render(
      <TodoProvider>
        <TodosFooter />
      </TodoProvider>,
    );

    fireEvent.click(screen.getByText("Clear completed"));

    expect(clearComplete).toHaveBeenCalledTimes(1);
  });

  test("does not call clearComplete when no completed todos", () => {
    const changeType = jest.fn();

    (useTodo as jest.Mock).mockReturnValue({
      type: "all",
      changeType: jest.fn(),
      todos: [],
      clearComplete: jest.fn(),
    });
    render(
      <TodoProvider>
        <TodosFooter />
      </TodoProvider>,
    );

    const all = screen.getByTestId("all");
    const active = screen.getByTestId("active");
    const completed = screen.getByTestId("completed");
    fireEvent.click(all);
    fireEvent.click(active);
    fireEvent.click(completed);

    expect(changeType).not.toHaveBeenCalled();
  });

  test("enables 'Clear completed' button when there are completed todos", () => {
    (useTodo as jest.Mock).mockReturnValue({
      type: "all",
      changeType: jest.fn(),
      todos: [{ id: 1, label: "Todo 1", type: "completed" }],
      clearComplete: jest.fn(),
    });

    render(
      <TodoProvider>
        <TodosFooter />
      </TodoProvider>,
    );

    const clearCompletedButton = screen.getByText("Clear completed");

    expect(clearCompletedButton).toBeInTheDocument();
  });
});
