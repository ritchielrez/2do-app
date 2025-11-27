import { memo, useState } from "react";
import { Buttons } from "./Buttons";
import { todosAdd } from "./TodoList";

const TaskInput = memo(function TaskInput() {
  const [newTask, setNewTask] = useState<string>("");
  return (
    <>
      <input
        autoFocus
        id="task-input"
        type="text"
        value={newTask}
        placeholder="New task"
        onKeyDown={(event) => {
          if (event.key == "Escape") {
            setNewTask("");
          } else if (event.key == "Enter") {
            todosAdd(newTask);
            setNewTask("");
          }
        }}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      ></input>
    </>
  );
});

export default TaskInput;
