import { useState } from "react";

type Todo = {
    checked: boolean;
    task: string;
    id: number;
}

type TodoListProps = {
    searchStr: string;
}

export default function TodoList(props: TodoListProps) {
    const [todos, setTodos] = useState(Array<Todo>(
        {checked: false, task: "task1", id: 1},
        {checked: true, task: "task2", id: 2},
        {checked: false, task: "2task", id: 3},
        {checked: true, task: "ta1sk", id: 4},
    ));

    const onTodoClick = (id: number) => {
        let todos_new = todos.slice();
        // todos_new[idx].checked = !todos_new[idx].checked;
        todos_new.forEach((todo) => {
            if (todo.id === id) {
                todo.checked = !todo.checked;
            }
        })
        setTodos(todos_new);
    }

    const todos_filtered = todos.filter((todo) => todo.task.startsWith(props.searchStr));

    return(
        <div id="todo-list">
            {todos_filtered.map((todo) => 
                <label className="todo">
                    <input type="checkbox" checked={todo.checked} onChange={() => onTodoClick(todo.id)}></input>
                    {todo.task}
                </label>
            )}
        </div>
    )
}