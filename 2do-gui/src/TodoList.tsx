import { useState } from "react";

type Todo = {
    checked: boolean;
    task: string;
}

export default function TodoList() {
    let [todos, setTodos] = useState(Array<Todo>(
        {checked: false, task: "task1"},
        {checked: true, task: "task2"}
    ));

    const onTodoClick = (idx: number) => {
        let todos_new = todos.slice();
        todos_new[idx].checked = !todos_new[idx].checked;
        setTodos(todos_new);
    }

    return(
        <div id="todo-list">
            {todos.map((todo, idx) => 
                <label className="todo">
                    <input type="checkbox" checked={todo.checked} onChange={() => onTodoClick(idx)}></input>
                    {todo.task}
                </label>
            )}
        </div>
    )
}