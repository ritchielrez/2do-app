import { useContext } from "react";
import { StateContext, todosAdd } from "./App";

export function Buttons() {
  const state = useContext(StateContext);

  return (
    <div id="btns">
      <button
        onClick={() => {
          if (state.newTask != null) state.setNewTask(null);
        }}
      >
        {state.newTask != null ? "Cancel" : "Upload"}
      </button>
      <button
        onClick={() => {
          if (state.newTask == null) {
            state.setNewTask("");
          } else {
            console.log(state.newTask);
            todosAdd(state.newTask);
            state.setNewTask(null);
          }
        }}
      >
        Add Task
      </button>
    </div>
  );
}
