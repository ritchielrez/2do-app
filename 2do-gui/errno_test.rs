use errno;
use libc;
use std::ffi::CString;
use std::os::raw::c_char;
fn main() {
    let file_name = String::from("tet1.txt");
    let file_name_cstr = CString::new(file_name).unwrap();
    let mode = String::from("r");
    let mode_cstr = CString::new(mode).unwrap();
    unsafe {
        let file = libc::fopen(file_name_cstr.as_ptr(), mode_cstr.as_ptr());
        
        if file.is_null() {
            let e = errno::errno();
            println!("{}", e);
        }
    }
}