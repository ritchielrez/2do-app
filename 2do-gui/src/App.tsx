import TodoList from "./TodoList.tsx";
import Search from "./Search.tsx";

export default function App() {
  return (
    <>
      <h1 style={{fontSize: '2.5em'}}>2do app</h1>
      <Search></Search>
      <TodoList></TodoList>
    </>
  );
}
