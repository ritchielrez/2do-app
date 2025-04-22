import { StateContext } from "./App.tsx";
import { useContext } from "react";

export default function TaskInput() {
  const state = useContext(StateContext);

  if (!state.newTask) return <></>;
  return (
    <>
      <input
        id="task-input"
        type="text"
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            state.setNewTask(!state.newTask);
          }
        }}
      ></input>
      <p style={{ margin: "0.5em 0 0.5em 0" }}>Press Esc key to cancel</p>
    </>
  );
}
