import TodoList from "./TodoList.tsx";
import Search from "./Search.tsx";
import { useState } from "react";

export default function App() {
  const [searchStr, setSearchStr] = useState("");

  return (
    <>
      <header>
      <h1 style={{fontSize: '2.5em'}}>2do app</h1>
      </header>
      <Search value={searchStr} setValue={setSearchStr}></Search>
      <TodoList searchStr={searchStr}></TodoList>
    </>
  );
}
