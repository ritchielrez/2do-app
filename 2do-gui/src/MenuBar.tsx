import { useContext } from "react";
import { exportTodos, saveTodos } from "./Storage.ts";
import { StateContext } from "./App.tsx";

export default function MenuBar() {
  const state = useContext(StateContext);
  return (
    <div id="menu-bar">
      <button>Open</button>
      <button
        onClick={() => {
          saveTodos(state.todos);
        }}
      >
        Save
      </button>
      <button onClick={exportTodos}>Export</button>
    </div>
  );
}
