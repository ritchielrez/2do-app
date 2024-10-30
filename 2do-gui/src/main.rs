use slint::ComponentHandle;
use slint::VecModel;
use slint::SharedString;
use std::rc::Rc;
use std::ffi::{CString, CStr};
use libc::{c_char, size_t};
slint::include_modules!();

// #[derive(Clone)]
// struct TodoItemData {
//     task: String,
//     checked: bool,
// }

#[repr(C)]
enum TodoErr {
  TodoErrEOF = -1,
  TodoSuccess,
  TodoErrOpen,
}

#[repr(C)]
struct TodoString {
    data: *const c_char,
    capacity: size_t,
    size: size_t,
}

#[repr(C)]
struct Todo {
  task: *mut TodoString,
  checked: bool,
}

#[repr(C)]
struct Todos {
    data: *mut Todo,
    capacity: size_t,
    size: size_t,
}

#[repr(C)]
struct TodoData {
    file_name: *const c_char,
    file_buffer: *mut TodoString,
    file_buffer_i: size_t,
    todos: *mut Todos,
}

// impl From<TodoItemData> for TodoItem {
//     fn from(data: TodoItemData) -> Self {
//         TodoItem {
//             task: data.task.into(),
//             checked: data.checked,
//         }
//     }
// }

extern "C" {
    fn string_init(capacity: size_t) -> *mut TodoString;
    fn string_delete(string: *mut TodoString);
    fn string_push_back(string: *mut TodoString, ch: c_char);
    fn string_assign(string: *mut TodoString, assigned_string: *mut c_char);
    fn todos_init(capacity: size_t) -> *mut Todos;
    fn todos_push_back(todos: *mut Todos, todo: Todo);
    fn todos_delete(todos: *mut Todos);
    fn todo_data_init(file_name: *const c_char) -> *mut TodoData;
    fn todo_data_delete(todo_data: *mut TodoData);
    fn consume(todo_data: *mut TodoData) -> c_char;
    fn peek(todo_data: *mut TodoData, offset: size_t) -> c_char;
    fn read_file(todo_data: *mut TodoData) -> TodoErr;
    fn add_task(todo_data: *mut TodoData, task: *mut c_char) -> TodoErr;
    fn search_task(task: *mut c_char) -> bool;
    fn done_task(task: *mut c_char) -> bool;
    fn remove_task(task: *mut c_char) -> bool;
}

fn main() -> Result<(), slint::PlatformError> {
    unsafe {
        let file_name = CString::new("2do.md").unwrap();
        let todo_data: *mut TodoData = todo_data_init(file_name.as_ptr());
        let err = read_file(todo_data);
    }
    let app = AppWindow::new()?;
    // let mut todos_data: Vec<TodoItemData> = Vec::new();
    let mut todos: Vec<TodoItem> = Vec::new();
    todos.push(TodoItem{task:SharedString::from("task1"), checked:false});
    todos.push(TodoItem{task:SharedString::from("task2"), checked:true});
    // let todos: Vec<TodoItem> = todos_data.iter()
    //     .map(|todo| todo.to_owned().into())
    //     .collect();
    let todos_model = Rc::new(VecModel::from(todos));
    app.set_todos(todos_model.into());
    app.run()
}
