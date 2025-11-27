import TodoList from "./TodoList.tsx";
import Search from "./Search.tsx";
import { useState } from "react";
import MenuBar from "./MenuBar.tsx";
import TaskInput from "./TaskInput.tsx";

export default function App() {
  const [searchStr, setSearchStr] = useState("");

  // TODO: Wrap text if it goes out of container
  return (
    <>
      <header>2do app</header>
      <MenuBar></MenuBar>
      <Search searchStr={searchStr} setSearchStr={setSearchStr}></Search>
      <TodoList searchStr={searchStr}></TodoList>
      <TaskInput></TaskInput>
      <footer>
        <p>Click on a todo to edit</p>
      </footer>
    </>
  );
}
