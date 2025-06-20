import { Todo, todosReset } from "./App.tsx";

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
      todos.push({
        checked: checked,
        editing: false,
        task: task,
        id: nextId++,
      });
    });

  return todos;
}

export function openTodos() {
  const element = document.createElement("input");
  const reader = new FileReader();
  element.type = "file";
  element.accept = ".md";
  // The input element needs to be appended in order to work.
  element.style.display = "none";
  document.body.append(element);
  element.addEventListener("cancel", () => {
    element.remove();
    console.error("User canceled file open operation.");
  });
  element.addEventListener("change", async () => {
    const file = element.files?.[0];
    const file_text = await file?.text();
    todosReset(parseTodos(file_text ?? ""));
  });

  if ("showPicker" in HTMLInputElement.prototype) {
    element.showPicker();
  } else {
    element.click();
  }
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
      "Error: `exportTodos()` is called when `todo-list` is empty"
    );
  }
  const data = new Blob([todoList]);
  element.download = "2do.md";
  element.href = URL.createObjectURL(data);
  element.click();
  URL.revokeObjectURL(element.href);
}

export function loadTodos(): Array<Todo> {
  const data = localStorage.getItem("todo-list");
  if (data == null) {
    localStorage.setItem("todo-list", "- [ ] task1\n- [X] task2\n");
    return Array<Todo>(
      { checked: false, editing: false, task: "task1", id: 0 },
      { checked: true, editing: false, task: "task2", id: 1 }
    );
  } else {
    return parseTodos(data);
  }
}
