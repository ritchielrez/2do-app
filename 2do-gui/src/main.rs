use slint::ComponentHandle;
use slint::VecModel;
use slint::SharedString;
use std::rc::Rc;
use std::fs::File;
use std::io;
use std::path::Path;
use std::io::BufRead;
slint::include_modules!();

#[derive(Debug)]
#[allow(dead_code)]
enum TodoError {
    FileOpenError(io::Error),
    SlintError(slint::PlatformError),
    SyntaxError,
}

impl From<slint::PlatformError> for TodoError {
    fn from(data: slint::PlatformError) -> Self {
        TodoError::SlintError(data)
    }
}

impl From<io::Error> for TodoError {
    fn from(data: io::Error) -> Self {
        TodoError::FileOpenError(data)
    }
}

fn read_lines<P> (file_name: P) -> io::Result<io::Lines<io::BufReader<File>>>
where P: AsRef<Path>, {
    let file =  File::open(file_name)?;
    Ok(io::BufReader::new(file).lines())
}

fn main() -> Result<(), TodoError> {
    let app = AppWindow::new()?;
    app.on_print_tasks_cb(move || {
        let mut todo_buf = read_lines("2do.md").unwrap();
        for (index, line) in todo_buf.flatten().enumerate() {
            let mut item = TodoItem{checked: false, task: SharedString::new()};
            if line.starts_with("- [ ] ") {
                item.checked = false;
            } else if line.starts_with("- [X] ") {
                item.checked = true;
            } else {
                eprintln!("Invalid syntax on line {}, missing proper starting syntax(\"- [ ] \" or \"- [X] \")", index + 1);
                // return Err(TodoError::SyntaxError);
            }
            let mut buf = String::from("");
            for i in 6..line.len() {
                let c = line.as_bytes()[i] as char;
                buf.push(c);
            }
            item.task = buf.into();
        }
    });
    app.invoke_print_tasks_cb();
    Ok(app.run()?)
}
