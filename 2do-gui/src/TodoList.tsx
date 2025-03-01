import { useState } from "react";

type Todo = {
    checked: boolean;
    task: string;
}

type TodoListProps = {
    searchStr: string;
}

export default function TodoList(props: TodoListProps) {
    const [todos, setTodos] = useState(Array<Todo>(
        {checked: false, task: "task1"},
        {checked: true, task: "task2"},
        {checked: false, task: "2task"},
        {checked: true, task: "ta1sk"},
    ));

    const onTodoClick = (idx: number) => {
        let todos_new = todos.slice();
        todos_new[idx].checked = !todos_new[idx].checked;
        setTodos(todos_new);
    }

    const todos_filtered = todos.filter((todo) => todo.task.startsWith(props.searchStr));

    return(
        <div id="todo-list">
            {todos_filtered.map((todo, idx) => 
                <label className="todo">
                    <input type="checkbox" checked={todo.checked} onChange={() => onTodoClick(idx)}></input>
                    {todo.task}
                </label>
            )}
        </div>
    )
}