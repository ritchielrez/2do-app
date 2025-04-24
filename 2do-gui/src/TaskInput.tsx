import { StateContext } from "./App.tsx";
import { useContext } from "react";

export default function TaskInput() {
  const state = useContext(StateContext);

  if (state.newTask == undefined) return <></>;
  return (
    <>
      <input
        id="task-input"
        type="text"
        value={state.newTask}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            state.setNewTask(undefined);
          }
        }}
        onChange={(e) => {state.setNewTask(e.target.value)}}
      ></input>
    </>
  );
}
