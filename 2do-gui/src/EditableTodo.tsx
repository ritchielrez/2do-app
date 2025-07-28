import { useEffect, useRef } from "react";
import { Todo, todosEdit, todoToggleEditMode } from "./TodoList";

type EditableTodoProps = {
  todo: Todo
}

export default function EditableTodo({ todo }: EditableTodoProps) {
  const ref = useRef<HTMLSpanElement>(null)

  // Select task on mount
  useEffect(() => {
    const element = ref.current;
    if (element == null) return;
    element.focus();

    const range = document.createRange()
    range.selectNodeContents(element);

    const selection = document.getSelection();
    if (selection) {
      selection.removeAllRanges();
      selection.addRange(range); // This is important for the range to effect
    }
  }, []); // Pass an empty array as deps to ensure the effect runs only once after initial render


  // Exit edit mode when clicking outside the span
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        todoToggleEditMode(todo.id);
      }
    }
    document.addEventListener("mousedown", handleClick);
    // Cleanup when unmounting the effect
    return () => {
      document.removeEventListener("mousedown", handleClick);
    }
  }, []);

  return (
    <span
      ref={ref}
      autoFocus={true}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      className="editing-todo"
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          if (e.currentTarget.textContent == null) {
            e.currentTarget.textContent = todo.task;
            todoToggleEditMode(todo.id);
          }
          const edited_task = e.currentTarget.textContent.trim();
          todosEdit(todo.id, edited_task);
          todoToggleEditMode(todo.id);
        } else if (e.key == "Escape") {
          e.currentTarget.textContent = todo.task;
          todoToggleEditMode(todo.id);
        }
      }}
    >
      {todo.task}
    </span>
  )
}
