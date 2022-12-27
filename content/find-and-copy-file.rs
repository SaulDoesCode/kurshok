use std::env;
use std::fs;
use std::path::Path;

fn main() {
    // Parse command-line arguments
    let args: Vec<String> = env::args().collect();
    let search_name = &args[1];
    let dest_path = &args[2];

    // Walk through the directory tree recursively
    let root_dir = Path::new(".");
    for entry in fs::read_dir(root_dir).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        if path.is_dir() {
            // If the entry is a directory, recurse into it
            walk_dir(&path, search_name, dest_path);
        } else {
            // If the entry is a file, check its name
            let file_name = path.file_name().unwrap().to_str().unwrap();
            if file_name == search_name {
                // If the file name matches, copy the file to the destination path
                fs::copy(&path, dest_path).unwrap();
            }
        }
    }
}

fn walk_dir(dir: &Path, search_name: &str, dest_path: &str) {
    for entry in fs::read_dir(dir).unwrap() {
        let entry = entry.unwrap();
        let path = entry.path();
        if path.is_dir() {
            // If the entry is a directory, recurse into it
            walk_dir(&path, search_name, dest_path);
        } else {
            // If the entry is a file, check its name
            let file_name = path.file_name().unwrap().to_str().unwrap();
            if file_name == search_name {
                // If the file name matches, copy the file to the destination path
                fs::copy(&path, dest_path).unwrap();
            }
        }
    }
}


/*vlang
    import fs

    fn main() {
    // Parse command-line arguments
    args := os.args()
    search_name := args[1]
    dest_path := args[2]

    // Walk through the directory tree recursively
    root_dir := "."
    walk_dir(root_dir, search_name, dest_path)
    }

    fn walk_dir(dir: string, search_name: string, dest_path: string) {
    entries := fs.read_dir(dir)
    for entry in entries {
        path := entry.path()
        if fs.is_dir(path) {
        // If the entry is a directory, recurse into it
        walk_dir(path, search_name, dest_path)
        } else {
        // If the entry is a file, check its name
        file_name := fs.file_name(path)
        if file_name == search_name {
            // If the file name matches, copy the file to the destination path
            fs.copy(path, dest_path)
        }
        }
    }
    }

*/