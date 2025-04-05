type TaskInputProps = {
  newTask: boolean;
  setNewTask: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function TaskInput(props: TaskInputProps) {
  if (!props.newTask) return <></>;
  return (
    <>
      <input
        id="task-input"
        type="text"
        style={{ margin: "0.3em 0 0.1em 0", padding: "0.2em", paddingLeft: "0.5em" }}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            props.setNewTask(!props.newTask);
          }
        }}
      ></input>
      <p style={{ margin: "0.5em 0 0.5em 0" }}>Press Esc key to cancel</p>
    </>
  );
}
