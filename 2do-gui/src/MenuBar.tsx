import { exportTodos } from "./Storage.ts";

export default function MenuBar() {
  return (
    <div id="menu-bar">
      <button>Open</button>
      <button>Save</button>
      <button onClick={exportTodos}>Export</button>
    </div>
  );
}
