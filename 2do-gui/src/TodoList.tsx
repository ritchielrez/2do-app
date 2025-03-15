import { useState } from "react";
import { Todo } from "./App.tsx";

type TodoListProps = {
  searchStr: string;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export default function TodoList(props: TodoListProps) {
  const onTodoClick = (id: number) => {
    let todos_new = props.todos.slice();
    todos_new.forEach((todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
    });
    props.setTodos(todos_new);
  };

  const todos_filtered = props.todos.filter((todo) =>
    todo.task.startsWith(props.searchStr)
  );

  return (
    <div id="todo-list">
      {todos_filtered.map((todo) => (
        <label className="todo">
          <input
            type="checkbox"
            checked={todo.checked}
            onChange={() => onTodoClick(todo.id)}
          ></input>
          {todo.task}
        </label>
      ))}
    </div>
  );
}
