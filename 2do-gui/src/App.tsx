import TodoList from "./TodoList.tsx";
import Search from "./Search.tsx";
import React, { createContext, useState, useReducer } from "react";
import { Buttons } from "./Buttons.tsx";
import { loadTodos, saveTodos } from "./Storage.ts";
import MenuBar from "./MenuBar.tsx";

export let StateContext: React.Context<State>;

enum TodoActionType {
  add = 0,
  delete,
  toggle,
  edit,
  editModeToggle,
  reset,
}

export type Todo = {
  checked: boolean;
  editing: boolean;
  task: string;
  id: number;
};

type TodoAction = {
  type: TodoActionType;
  id: number | null;
  todos: Array<Todo> | null;
};

export type State = {
  searchStr: string;
  setSearchStr: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  todosDispatch: React.ActionDispatch<[action: TodoAction]>;
  newTask: string | null;
  setNewTask: React.Dispatch<React.SetStateAction<string | null>>;
  nextId: number;
};

function todosReducer(todos: Array<Todo>, action: TodoAction): Array<Todo> {
  switch (action.type) {
    case TodoActionType.add: {
      if (action.todos == null)
        throw Error("`action.todos` is null when `todosAdd()` is being called");
      return [...todos, action.todos[0]];
    }
    case TodoActionType.delete: {
      return todos.filter((todo) => todo.id != action.id);
    }
    case TodoActionType.toggle: {
      let todos_new = todos.slice();
      todos.forEach((todo) => {
        if (todo.id == action.id) {
          todo.checked = !todo.checked;
        }
      });
      return todos_new;
    }
    case TodoActionType.edit: {
    }
    case TodoActionType.reset: {
      if (action.todos == null)
        throw Error(
          "`action.todos` is null when `todosReset()` is being called"
        );
      return action.todos;
    }
    default: {
      throw Error(`Unknown action: {action.type}`);
    }
  }
}

let state: State;
let saveTimer = 0;
const initialTodo = loadTodos();

export function todosAdd(task: string) {
  clearTimeout(saveTimer);
  state.todosDispatch({
    type: TodoActionType.add,
    id: null,
    todos: [{ checked: false, editing: false, task: task, id: state.nextId++ }],
  });
  // The todo list is not updated immediately, so wait for saving the todo list.
  saveTimer = setTimeout(() => {
    saveTodos(state.todos);
  }, 250);
}
export function todosDelete(id: number) {
  clearTimeout(saveTimer);
  state.todosDispatch({ type: TodoActionType.delete, id: id, todos: null });
  // The todo list is not updated immediately, so wait for saving the todo list.
  saveTimer = setTimeout(() => {
    saveTodos(state.todos);
  }, 250);
}
export function todosToggle(id: number) {
  state.todosDispatch({ type: TodoActionType.toggle, id: id, todos: null });
}
export function todosReset(todos: Array<Todo>) {
  state.todosDispatch({ type: TodoActionType.reset, id: null, todos: todos });
}

export default function App() {
  const [searchStr, setSearchStr] = useState("");
  const [todos, todosDispatch] = useReducer(todosReducer, initialTodo);

  const [newTask, setNewTask] = useState<string | null>(null);
  state = {
    searchStr: searchStr,
    setSearchStr: setSearchStr,
    todos: todos,
    todosDispatch: todosDispatch,
    newTask: newTask,
    setNewTask: setNewTask,
    nextId: todos.length,
  };
  StateContext = createContext(state);

  // TODO: Wrap text if it goes out of container
  return (
    <>
      <header>
        <h1>2do app</h1>
      </header>
      <MenuBar></MenuBar>
      <Search></Search>
      <TodoList></TodoList>
      <Buttons></Buttons>
    </>
  );
}

document.addEventListener("visibilitychange", () => {
  // If the tab is closed or minimized, save the todo list.
  if (document.hidden == true) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTodos(state.todos);
    }, 250);
  }
});
