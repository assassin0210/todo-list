import { render, screen, fireEvent } from "@testing-library/react";
import { TodoItem } from "./TodoItem";
import {
  TodoProvider,
  useTodo,
} from "../../../../entities/todosContext/TodosContext";

jest.mock("../../../shared/todosContext/TodosContext", () => ({
  ...jest.requireActual("../../../shared/todosContext/TodosContext"),
  useTodo: jest.fn(),
}));
describe("TodoItem", () => {
  test("calls setCompleteTodo when radio button is clicked", () => {
    const setCompleteTodo = jest.fn();

    (useTodo as jest.Mock).mockReturnValue({
      type: "all",
      changeType: jest.fn(),
      todos: [{ id: 1, label: "Todo 1", type: "active" }],
      clearComplete: jest.fn(),
      setCompleteTodo,
    });

    render(
      <TodoProvider>
        <TodoItem
          id={1}
          label="Todo 1"
          type="active"
          setCompleteTodo={setCompleteTodo}
        />
      </TodoProvider>,
    );

    const radioButton = screen.getByRole("radio");
    fireEvent.click(radioButton);
    expect(setCompleteTodo).toHaveBeenCalledWith(1);
  });
});
