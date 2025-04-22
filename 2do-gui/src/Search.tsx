import { StateContext } from "./App.tsx";
import { useContext } from "react";

export default function Search() {
  const state = useContext(StateContext);

  return (
    <div id="search">
      <input
        value={state.searchStr}
        onChange={(e) => state.setSearchStr(e.target.value)}
        type="text"
      ></input>
    </div>
  );
}
