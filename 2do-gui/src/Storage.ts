import { useContext } from "react";
import { StateContext, Todo } from "./App.tsx";

function parseTodos(data: string): Array<Todo> {
  const todos = Array<Todo>();
  let nextId = 0;

  data
    .replace(/[\r\n]+$/, "")
    .split("\n")
    .forEach((line, index) => {
      let checked = false;
      if (line.startsWith("- [X]")) checked = true;
      else if (!line.startsWith("- [ ]")) {
        throw new Error(
          `Parse error: todoList in localStorage does not start with neither \`- [ ]\` nor \`- [X]\` on line ${index + 1}`
        );
      }
      if (line.length <= 7) {
        throw new Error(
          `Parser error: todoList in localStorage does not have enough characters on line ${index + 1}`
        );
      }
      let task = line.slice(6);
      todos.push({ checked: checked, task: task, id: nextId++ });
    });

  return todos;
}

export function saveTodos(todos: Array<Todo>) {
  let data = "";
  todos.forEach((todo) => {
    if (todo.checked == true) data += "- [X] ";
    else data += "- [ ] ";

    data += todo.task;
    data += "\n";
  });
  localStorage.setItem("todo-list", data);
}

export function exportTodos() {
  const element = document.createElement("a");
  const todoList = localStorage.getItem("todo-list");
  if (todoList == null) {
    throw new Error(
      "Error: `saveTodosAs()` is called when `todo-list` is empty"
    );
  }
  const data = new Blob([todoList]);
  element.download = "2do.md";
  element.href = URL.createObjectURL(data);
  element.click();
}

export function loadTodos(): Array<Todo> {
  const data = localStorage.getItem("todo-list");
  if (data == null) {
    localStorage.setItem("todo-list", "- [ ] task1\n- [X] task2");
    return Array<Todo>(
      { checked: false, task: "task1", id: 0 },
      { checked: true, task: "task2", id: 1 }
    );
  } else {
    return parseTodos(data);
  }
}
