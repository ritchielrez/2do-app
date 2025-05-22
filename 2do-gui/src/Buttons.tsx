import { useContext } from "react";
import { StateContext, todosAdd } from "./App";

function CancelButton() {
  const state = useContext(StateContext);

  if (state.newTask != null) {
    return (
      <button
        onClick={() => {
          if (state.newTask != null) state.setNewTask(null);
        }}
      >
        Cancel
      </button>
    );
  }
}

function AddButton() {
  const state = useContext(StateContext);
  return (
    <button
      onClick={() => {
        if (state.newTask == null) {
          state.setNewTask("");
        } else {
          todosAdd(state.newTask);
          state.setNewTask(null);
        }
      }}
    >
      Add Task
    </button>
  );
}

export function Buttons() {
  return (
    <div id="btns">
      <CancelButton></CancelButton>
      <AddButton></AddButton>
    </div>
  );
}
