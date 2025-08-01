import { memo, useReducer } from "react";
import { loadTodos, saveTodos } from "./Storage.ts";
import EditableTodo from "./EditableTodo.tsx";

enum TodoActionType {
  add = 0,
  delete,
  toggleChecked,
  edit,
  toggleEditMode,
  reset,
}

export type Todo = {
  checked: boolean;
  editMode: boolean;
  task: string;
  id: number;
};

type TodoListProps = {
  searchStr: string;
};

type TodoAction = {
  task: string | null;
  type: TodoActionType;
  id: number | null;
  todos: Array<Todo> | null;
};

const initialTodo = loadTodos();
let nextId = initialTodo.length;
let saveTimer = 0;
export let todos: Array<Todo>;
let todosDispatch: React.ActionDispatch<[action: TodoAction]>;

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
    case TodoActionType.edit: {
      return todos.map((todo) => {
        if (todo.id == action.id) {
          todo.task = action.task ?? "";
        }
        return todo;
      });
    }
    case TodoActionType.toggleChecked: {
      return todos.map((todo) => {
        if (todo.id == action.id) {
          todo.checked = !todo.checked;
        }
        return todo;
      });
    }
    case TodoActionType.toggleEditMode: {
      return todos.map((todo) => {
        if (todo.id == action.id) {
          todo.editMode = !todo.editMode;
        }
        return todo;
      });
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

export function todosAdd(newTask: string) {
  if (newTask == null || newTask == "") {
    alert("Error: trying to add a todo with a empty name.");
    return;
  }
  clearTimeout(saveTimer);
  todosDispatch({
    task: null,
    type: TodoActionType.add,
    id: null,
    todos: [
      {
        checked: false,
        task: newTask,
        id: nextId++,
        editMode: false,
      },
    ],
  });
  // The todo list is not updated immediately, so wait for saving the todo list.
  saveTimer = setTimeout(() => {
    saveTodos();
  }, 250);
}
export function todosDelete(id: number) {
  clearTimeout(saveTimer);
  todosDispatch({
    task: null,
    type: TodoActionType.delete,
    id: id,
    todos: null,
  });
  // The todo list is not updated immediately, so wait for saving the todo list.
  saveTimer = setTimeout(() => {
    saveTodos();
  }, 250);
}
export function todosEdit(id: number, task: string) {
  clearTimeout(saveTimer);
  todosDispatch({
    task: task,
    type: TodoActionType.edit,
    id: id,
    todos: null,
  });
  // The todo list is not updated immediately, so wait for saving the todo list.
  saveTimer = setTimeout(() => {
    saveTodos();
  }, 250);
}
export function todosToggleChecked(id: number) {
  todosDispatch({
    task: null,
    type: TodoActionType.toggleChecked,
    id: id,
    todos: null,
  });
}
export function todoToggleEditMode(id: number) {
  todosDispatch({
    task: null,
    type: TodoActionType.toggleEditMode,
    id: id,
    todos: null,
  });
}
export function todosReset(todos: Array<Todo>) {
  todosDispatch({
    task: null,
    type: TodoActionType.reset,
    id: null,
    todos: todos,
  });
}

const TodoList = memo(function TodoList({ searchStr }: TodoListProps) {
  [todos, todosDispatch] = useReducer(todosReducer, initialTodo);
  const todos_filtered = todos.filter((todo) => todo.task.includes(searchStr));

  return (
    <div id="todo-list">
      {todos_filtered.map((todo) => (
        <div className="todo" key={todo.id}>
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => todosToggleChecked(todo.id)}
          ></input>
          {todo.editMode ? (
            <EditableTodo todo={todo} />
          ) : (
            <span
              className="non-editing-todo"
              onClick={() => todoToggleEditMode(todo.id)}
            >
              {todo.task}
            </span>
          )}
          <button aria-label="delete-task" onClick={() => todosDelete(todo.id)}>
            <img alt="Delete" src="assets/delete.svg"></img>
          </button>
        </div>
      ))}
    </div>
  );
});

document.addEventListener("visibilitychange", () => {
  // If the tab is closed or minimized, save the todo list.
  if (document.hidden == true) {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      saveTodos();
    }, 250);
  }
});

export default TodoList;
