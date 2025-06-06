import { useContext } from "react";
import { exportTodos, openTodos, saveTodos } from "./Storage.ts";
import { StateContext } from "./App.tsx";

export default function MenuBar() {
  const state = useContext(StateContext);
  return (
    <div id="menu-bar">
      <button onClick={() => openTodos()}>Open</button>
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
