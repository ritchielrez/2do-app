import TodoList from "./TodoList.tsx";
import Search from "./Search.tsx";
import React, { createContext, useState, useReducer } from "react";

export let StateContext: React.Context<State>;

let nextId = 0;

enum TodoActionType {
  add = 0,
  del = 1,
  tog = 2,
  ed = 3,
}

type Todo = {
  checked: boolean;
  task: string;
  id: number;
};

type TodoAction = {
  type: TodoActionType;
  id: number | null;
  todo: Todo | null;
};

export type State = {
  searchStr: string;
  setSearchStr: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  todosDispatch: React.ActionDispatch<[action: TodoAction]>;
  newTask: boolean;
  setNewTask: React.Dispatch<React.SetStateAction<boolean>>;
};

function todosReducer(todos: Array<Todo>, action: TodoAction): Array<Todo> {
  switch (action.type) {
    case TodoActionType.add: {
    }
    case TodoActionType.del: {
    }
    case TodoActionType.tog: {
      let todos_new = todos.slice();
      todos.forEach((todo) => {
        if(todo.id == action.id) {
          todo.checked = !todo.checked;
        }
      });
      return todos_new;        
    }
    case TodoActionType.ed: {

    }
    default: {
      throw Error(`Unknown action: {action.type}`);
    }
  }
}

let state: State;

export default function App() {
  const [searchStr, setSearchStr] = useState("");
  const [todos, todosDispath] = useReducer(
    todosReducer,
    Array<Todo>(
      { checked: false, task: "task1", id: nextId++ },
      { checked: true, task: "task2", id: nextId++ },
      { checked: false, task: "2task", id: nextId++ },
      { checked: true, task: "ta1sk", id: nextId++ }
    )
  );

  const [newTask, setNewTask] = useState(false);
  state = {
    searchStr: searchStr,
    setSearchStr: setSearchStr,
    todos: todos,
    todosDispatch: todosDispath,
    newTask: newTask,
    setNewTask: setNewTask,
  };
  StateContext = createContext(state);

  return (
    <>
      <header>
        <h1>2do app</h1>
      </header>
      <Search></Search>
      <TodoList></TodoList>
      <div id="btns">
        <button>Upload</button>
        <button onClick={() => setNewTask(true)}>Add Task</button>
      </div>
    </>
  );
}

export function todosToggle(id: number) {
  state.todosDispatch({type: TodoActionType.tog, id: id, todo: null});
}