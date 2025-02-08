import TodoList from "./TodoList.tsx";
import SearchBar from "./SearchBar.tsx";

export default function App() {
  return (
    <>
      <h1 style={{fontSize: '2.5em'}}>2do app</h1>
      <SearchBar></SearchBar>
      <TodoList></TodoList>
    </>
  );
}
