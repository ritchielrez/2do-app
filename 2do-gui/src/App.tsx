import TodoList from "./TodoList.tsx";
import Search from "./Search.tsx";
import TaskInput from "./TaskInput.tsx";
import React, { useState } from "react";

export type Todo = {
  checked: boolean;
  task: string;
  id: number;
};

export default function App() {
  const [searchStr, setSearchStr] = useState("");
  const [todos, setTodos] = useState(
    Array<Todo>(
      { checked: false, task: "task1", id: 1 },
      { checked: true, task: "task2", id: 2 },
      { checked: false, task: "2task", id: 3 },
      { checked: true, task: "ta1sk", id: 4 }
    )
  );
  const [newTask, setNewTask] = useState(false);

  return (
    <>
      <header>
        <h1>2do app</h1>
      </header>
      <Search value={searchStr} setValue={setSearchStr}></Search>
      <TodoList
        searchStr={searchStr}
        todos={todos}
        setTodos={setTodos}
        newTask={newTask} setNewTask={setNewTask}
      ></TodoList>
      <div id="btns">
        <button>Upload</button>
        <button onClick={() => setNewTask(true)}>Add Task</button>
      </div>
    </>
  );
}
