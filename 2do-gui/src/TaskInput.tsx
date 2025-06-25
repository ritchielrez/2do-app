import { StateContext, todosAdd } from "./App.tsx";
import { useContext } from "react";

export default function TaskInput() {
  const state = useContext(StateContext);

  if (state.newTask == null) return <></>;
  return (
    <>
      <input
        autoFocus
        id="task-input"
        type="text"
        value={state.newTask}
        onKeyDown={(event) => {
          if (event.key == "Escape") {
            state.setNewTask(null);
          } else if (event.key == "Enter") {
            todosAdd();
          }
        }}
        onChange={(e) => {
          state.setNewTask(e.target.value);
        }}
      ></input>
    </>
  );
}
