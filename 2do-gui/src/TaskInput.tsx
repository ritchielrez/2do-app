import { memo, useState } from "react";
import { ButtonProps, Buttons } from "./Buttons";
import { todosAdd } from "./TodoList";

const TaskInput = memo(function TaskInput() {
  const [newTask, setNewTask] = useState<string | null>(null);
  if (newTask == null)
    return <Buttons newTask={newTask} setNewTask={setNewTask}></Buttons>;
  return (
    <>
      <input
        autoFocus
        id="task-input"
        type="text"
        value={newTask}
        onKeyDown={(event) => {
          if (event.key == "Escape") {
            setNewTask(null);
          } else if (event.key == "Enter") {
            todosAdd(newTask);
            setNewTask(null);
          }
        }}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      ></input>
      <Buttons newTask={newTask} setNewTask={setNewTask}></Buttons>
    </>
  );
});

export default TaskInput;
