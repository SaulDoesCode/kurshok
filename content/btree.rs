use std::fs::File;
use std::io::{BufReader, BufWriter};
use std::path::Path;

struct Node {
keys: Vec<i32>,
children: Vec<u64>,
is_leaf: bool,
next: Option<u64>,
}

impl Node {
fn new() -> Self {
Self {
keys: Vec::new(),
children: Vec::new(),
is_leaf: true,
next: None,
}
}

fn from_disk(file: &mut File, offset: u64) -> Self {
    let mut reader = BufReader::new(file);
    reader.seek(std::io::SeekFrom::Start(offset)).unwrap();

    let mut keys = Vec::new();
    let key_count = reader.read_u32::<LittleEndian>().unwrap();
    for _ in 0..key_count {
        keys.push(reader.read_i32::<LittleEndian>().unwrap());
    }

    let mut children = Vec::new();
    let child_count = reader.read_u32::<LittleEndian>().unwrap();
    for _ in 0..child_count {
        children.push(reader.read_u64::<LittleEndian>().unwrap());
    }

    let is_leaf = reader.read_u8().unwrap() == 1;
    let next = reader.read_u64::<LittleEndian>().unwrap();

    Self {
        keys,
        children,
        is_leaf,
        next: if next == 0 { None } else { Some(next) },
    }
}

fn to_disk(&self, file: &mut File, offset: u64) {
    let mut writer = BufWriter::new(file);
    writer.seek(std::io::SeekFrom::Start(offset)).unwrap();

    writer.write_u32::<LittleEndian>(self.keys.len() as u32).unwrap();
    for key in self.keys.iter() {
        writer.write_i32::<LittleEndian>(*key).unwrap();
    }

    writer.write_u32::<LittleEndian>(self.children.len() as u32).unwrap();
    for child in self.children.iter() {
        writer.write_u64::<LittleEndian>(*child).unwrap();
    }

    writer.write_u8(if self.is_leaf { 1 } else { 0 }).unwrap();
    writer.write_u64::<LittleEndian>(self.next.unwrap_or(0)).unwrap();
}
}

struct BTree {
degree: u32,
root: u64,
file: File,
}

impl BTree {
fn new(degree: u32, path: &Path) -> Self {
let file = File::create(path).unwrap();
let root = Self::allocate_node(&file);
Self {
degree,
root,
file,
}
}

fn from_disk(degree: u32, path: &Path) -> Self {
    let file = File::open(path).unwrap();
let root = Self::allocate_node(&file);
Self {
degree,
root,
file,
}
}

fn allocate_node(&self, file: &File) -> u64 {
    let metadata = file.metadata().unwrap();
    metadata.len()
}

fn insert(&mut self, key: i32) {
    let mut r = Node::from_disk(&mut self.file, self.root);

    if r.keys.len() == 2 * self.degree - 1 {
        let s = Node::new();
        self.root = self.allocate_node(&self.file);
        s.children.push(r.offset);
        s.is_leaf = false;
        self.split_child(&mut s, 0, &mut r);
        self.insert_nonfull(&mut s, key);
    } else {
        self.insert_nonfull(&mut r, key);
    }
}

fn split_child(&mut self, x: &mut Node, i: usize, y: &mut Node) {
    let z = Node::new();
    z.is_leaf = y.is_leaf;
    z.keys = y.keys.split_off(self.degree as usize);
    if !y.is_leaf {
        z.children = y.children.split_off(self.degree as usize);
    }

    x.keys.insert(i, y.keys[self.degree as usize - 1]);
    x.children.insert(i + 1, z.offset);

    y.to_disk(&mut self.file, y.offset);
    z.to_disk(&mut self.file, z.offset);
}

fn insert_nonfull(&mut self, x: &mut Node, k: i32) {
    let i = x.keys.len();
    if x.is_leaf {
        x.keys.push(k);
        x.to_disk(&mut self.file, x.offset);
    } else {
        let mut ci = Node::from_disk(&mut self.file, x.children[i]);
        if ci.keys.len() == 2 * self.degree - 1 {
            self.split_child(x, i, &mut ci);
            if k > x.keys[i] {
                ci = Node::from_disk(&mut self.file, x.children[i + 1]);















                use std::fs::File;
                use std::io::{BufReader, BufWriter};
                use std::collections::BTreeMap;
                
                const MAX_KEYS: usize = 5; // maximum number of keys per node
                
                struct DiskBTree {
                    file: BufReader<File>, // file handle for reading and writing
                    root: Node, // the root node of the tree
                }
                
                impl DiskBTree {
                    // creates a new, empty BTree
                    fn new(file: BufReader<File>) -> Self {
                        DiskBTree {
                            file,
                            root: Node::new(),
                        }
                    }
                
                    // inserts a key/value pair into the BTree
                    fn insert(&mut self, key: String, value: Vec<u8>) {
                        let (new_node, split_key) = self.root.insert(key, value);
                        if let Some(key) = split_key {
                            // create a new root node if the root node splits
                            self.root = Node::new_root(self.root, new_node, key);
                        }
                    }
                
                    // searches for a key in the BTree and returns its value, if found
                    fn search(&self, key: &str) -> Option<&Vec<u8>> {
                        self.root.search(key)
                    }
                }
                
                struct Node {
                    keys: Vec<String>,       // keys stored in this node
                    values: Vec<Vec<u8>>,    // values stored in this node
                    children: Vec<Node>,     // child nodes, if any
                    is_leaf: bool,           // true if this node is a leaf node, false otherwise
                    pos: u64,                // position of this node in the file
                }
                
                impl Node {
                    // creates a new, empty node
                    fn new() -> Self {
                        Node {
                            keys: Vec::new(),
                            values: Vec::new(),
                            children: Vec::new(),
                            is_leaf: true,
                            pos: 0,
                        }
                    }
                
                    // creates a new root node from two existing nodes and a split key
                    fn new_root(left: Node, right: Node, key: String) -> Self {
                        Node {
                            keys: vec![key],
                            values: Vec::new(),
                            children: vec![left, right],
                            is_leaf: false,
                            pos: 0,
                        }
                    }
                
                    // inserts a key/value pair into the subtree rooted at this node
                    fn insert
                



                    struct Writ {
                        tags: Vec<String>,
                        values: Vec<Vec<u8>>,
                        parent: &Writ,
                        children: Vec<&Writ>,
                        position: Vec<u64, u64, u64>,
                        root_level: bool,
                        stored_at: String,
                    }