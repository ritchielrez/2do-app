import { memo } from "react";
import { todosAdd } from "./TodoList";

export type ButtonProps = {
  newTask: string | null;
  setNewTask: React.Dispatch<React.SetStateAction<string | null>>;
};

function CancelButton({ newTask, setNewTask }: ButtonProps) {
  if (newTask != null) {
    return (
      <button
        onClick={() => {
          setNewTask(null);
        }}
      >
        Cancel
      </button>
    );
  }
}

function AddButton({ newTask, setNewTask }: ButtonProps) {
  return (
    <button
      onClick={() => {
        if (newTask == null) {
          setNewTask("");
        } else {
          todosAdd(newTask);
          setNewTask(null);
        }
      }}
    >
      Add Task
    </button>
  );
}

export function Buttons({ newTask, setNewTask }: ButtonProps) {
  return (
    <div id="btns">
      <CancelButton newTask={newTask} setNewTask={setNewTask}></CancelButton>
      <AddButton newTask={newTask} setNewTask={setNewTask}></AddButton>
    </div>
  );
}
