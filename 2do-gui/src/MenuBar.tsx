import { memo } from "react";
import { exportTodos, openTodos, saveTodos } from "./Storage.ts";

const MenuBar = memo(function MenuBar() {
  return (
    <div id="menu-bar">
      <button onClick={() => openTodos()}>Open</button>
      <button
        onClick={() => {
          saveTodos();
        }}
      >
        Save
      </button>
      <button onClick={exportTodos}>Export</button>
    </div>
  );
});

export default MenuBar;
