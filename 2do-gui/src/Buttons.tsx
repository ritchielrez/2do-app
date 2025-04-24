import { useContext } from "react";
import { StateContext, todosAdd } from "./App";

export function Buttons() {
  const state = useContext(StateContext);

  return (
    <div id="btns">
      <button
        onClick={() => {
          if (state.newTask != undefined) state.setNewTask(undefined);
        }}
      >
        {state.newTask != undefined ? "Cancel" : "Upload"}
      </button>
      <button onClick={() => {
        if(state.newTask == undefined) {
            state.setNewTask("");
        } else {
            console.log(state.newTask);
            todosAdd(state.newTask);
            state.setNewTask(undefined);
        }}} >Add Task</button>
    </div>
  );
}
