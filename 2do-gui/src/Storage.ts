import { Todo } from "./App.tsx";

function parseData(data: string) {
}

function loadData(): Array<Todo> {
    const data = localStorage.getItem("todoList");
    if (!data) {
        localStorage.setItem("todoList", "- [ ] task1\n- [X] task2");
        return Array<Todo>();
    } else {
        parseData(data);
        return Array<Todo>();
    }
}