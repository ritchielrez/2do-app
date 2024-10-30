fn main() {
    let config = slint_build::CompilerConfiguration::new()
        .with_style("fluent-dark".into());
    slint_build::compile_with_config("ui/todo.slint", config).unwrap();
    println!("cargo:rust-link-search=native=../2do-lib/");
    println!("cargo:rust-link-lib=static=todo_lib");
}
