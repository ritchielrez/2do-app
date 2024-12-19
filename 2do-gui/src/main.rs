use leptos::prelude::*;

#[component]
fn App() -> impl IntoView {
    let (count, set_count) = signal(0);
    view! {
    }
}

fn main() {
    leptos::mount::mount_to_body(App);
}
