import { useContext } from "react"
import { StateContext } from "./App"

export function Buttons() {
    const state = useContext(StateContext);

    return (
        <div id="btns">
            <button onClick={() => {
                if(state.newTask) state.setNewTask(false);
            }}>{state.newTask ? "Cancel": "Upload"}</button>
            <button onClick={() => state.setNewTask(true)}>Add Task</button>
        </div>
    )
}