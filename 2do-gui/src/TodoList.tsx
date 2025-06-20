import { StateContext, todosToggle } from "./App.tsx";
import TaskInput from "./TaskInput.tsx";
import { useContext } from "react";

export default function TodoList() {
  const state = useContext(StateContext);

  const todos_filtered = state.todos.filter((todo) =>
    todo.task.startsWith(state.searchStr)
  );

  return (
    <div id="todo-list">
      {todos_filtered.map((todo) => (
        <div className="todo" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => todosToggle(todo.id)}
          ></input>
          <span onClick={() => alert("hello")}>{todo.task}</span>
          <button aria-label="delete-task" onClick={() => todosDelete(todo.id)}>
            <img alt="Delete" src="assets/delete.svg"></img>
          </button>
        </div>
      ))}
      <TaskInput></TaskInput>
    </div>
  );
}
