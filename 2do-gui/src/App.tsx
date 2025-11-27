import TodoList from "./TodoList.tsx";
import MenuBar from "./MenuBar.tsx";
import TaskInput from "./TaskInput.tsx";

export default function App() {
  // TODO: Wrap text if it goes out of container
  return (
    <>
      <header>2do app</header>
      <MenuBar></MenuBar>
      <TaskInput></TaskInput>
      <TodoList></TodoList>
    </>
  );
}
