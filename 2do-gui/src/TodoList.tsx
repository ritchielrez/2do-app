import { TodoActionType, StateContext } from "./App.tsx";
import TaskInput from "./TaskInput.tsx";
import { useContext } from "react";

export default function TodoList() {
  const state = useContext(StateContext);
  // const onTodoClick = (id: number) => {
  //   let todos_new = state.todos.slice();
  //   todos_new.forEach((todo) => {
  //     if (todo.id === id) {
  //       todo.checked = !todo.checked;
  //     }
  //   });
  //   state.setTodos(todos_new);
  // };

  const todos_filtered = state.todos.filter((todo) =>
    todo.task.startsWith(state.searchStr)
  );

  return (
    <div id="todo-list">
      {todos_filtered.map((todo) => (
        <label className="todo" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() =>
              state.todosDispatch({
                type: TodoActionType.chg,
                id: todo.id,
                todo: { ...todo, checked: !todo.checked },
              })
            }
          ></input>
          {todo.task}
        </label>
      ))}
      <TaskInput></TaskInput>
    </div>
  );
}
