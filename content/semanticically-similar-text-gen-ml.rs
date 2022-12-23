use std::collections::HashMap;
use std::fs;
use std::path::Path;

struct SemanticRelationGraph {
    // A mapping from words to their semantic relations.
    // Each relation is represented as a (weight, target_word) pair.
    relations: HashMap<String, Vec<(f64, String)>>,
}

impl SemanticRelationGraph {
    // Adds a new relation from the given word to the given target word
    // with the given weight.
    fn add_relation(&mut self, word: &str, target: &str, weight: f64) {
        self.relations
            .entry(word.to_string())
            .or_insert_with(Vec::new)
            .push((weight, target.to_string()));
    }

    // Returns a list of (weight, target_word) pairs for the given word.
    fn get_relations(&self, word: &str) -> Vec<(f64, String)> {
        self.relations
            .get(word)
            .cloned()
            .unwrap_or_default()
    }
}

struct DictionaryDiskStore {
    // A mapping from words to their definitions.
    definitions: HashMap<String, String>,
    // The directory where the dictionary files are stored.
    directory: String,
}

impl DictionaryDiskStore {
    // Adds a new word and its definition to the dictionary.
    // If the dictionary already exists on disk, it is overwritten.
    fn add_word(&mut self, word: &str, definition: &str) {
        self.definitions.insert(word.to_string(), definition.to_string());
        let path = Path::new(&self.directory).join(word);
        fs::write(path, definition).expect("Failed to write to dictionary file");
    }

    // Returns the definition of the given word, if it exists in the dictionary.
    // If the word is not in the `HashMap`, it is restored from the corresponding
    // file in the dictionary directory on disk.
    fn get_definition(&mut self, word: &str) -> Option<String> {
        self.definitions
            .get(word)
            .cloned()
            .or_else(|| {
                let path = Path::new(&self.directory).join(word);
                if path.exists() {
                    Some(
                        fs::read_to_string(path)
                            .expect("Failed to read from dictionary file"),
                    )
                } else {
                    None
                }
            })
    }
}

struct TextGenerator {
    // A reference to the SemanticRelationGraph used to generate text.
    relations: &SemanticRelationGraph,
    // A reference to the DictionaryDiskStore used to look up definitions of words.
    dictionary: &DictionaryDiskStore,
}

impl TextGenerator {
    // Generates a new text by starting with the given word and following
    // semantic relations from the SemanticRelationGraph until a sentence
    // is formed.
    fn generate_text(&self, start_word: &str) -> String {
        let mut result = String::new();
        let mut current_word = start_word;
        loop {
            result.push_str(current_word);
            result.push(' ');

            let relations = self.relations.get_relations(current_word);
            if relations.is_empty() {
                // No more relations, end the sentence.
                break;
            }
            let next_word = relations[0].1; // Choose the first relation.
            if let Some(definition) = self.dictionary.get_definition(&next_word) {
                // Append the definition of the next word to the result.
                result.push_str(&definition);
                result.push(' ');
            }
            current_word = &next_word;
        }
        result
    }
}

struct TextAnalyzer<'a> {
    // A reference to the SemanticRelationGraph to be updated.
relations: &'a mut SemanticRelationGraph,
// A reference to the DictionaryDiskStore to be updated.
dictionary: &'a mut DictionaryDiskStore,
}

impl<'a> TextAnalyzer<'a> {
    // Analyzes the given text and updates the SemanticRelationGraph and
    // DictionaryDiskStore with the new information extracted from the text.
    fn analyze_text(&mut self, text: &str) {
        // Split the text into words.
        let words: Vec<&str> = text.split_whitespace().collect();
        // For each word, add a relation to the next word in the sequence.
        for i in 0..words.len() - 1 {
            let word = words[i];
            let next_word = words[i + 1];
            self.relations.add_relation(word, next_word, 1.0);
        }

        // For each word, add its definition to the dictionary if it doesn't exist.
        for word in words {
            if !self.dictionary.get_definition(word).is_some() {
                self.dictionary.add_word(word, "Dummy definition");
            }
        }
    }
}




use bincode::{deserialize, serialize};
use tokio::fs;
use tokio::path::Path;
use tokio::sync::Mutex;

struct StructStore<T> {
    // The directory where the struct files are stored.
    directory: String,
    // A mutex to protect access to the struct files on disk.
    lock: Mutex<()>,
}

impl<T> StructStore<T>
where
    T: Send + Sync + Serialize + for<'a> Deserialize<'a>,
{
    // Adds the given struct to the store.
    // If the struct already exists in the store, it is overwritten.
    async fn add(&self, id: &str, value: &T) {
        let path = Path::new(&self.directory).join(id);
        let data = serialize(value).expect("Failed to serialize struct");
        let _guard = self.lock.lock().await;
        fs::write(path, &data).await.expect("Failed to write to struct file");
    }

    // Returns the struct with the given id, if it exists in the store.
    // If the struct is not found, `None` is returned.
    async fn get(&self, id: &str) -> Option<T> {
        let path = Path::new(&self.directory).join(id);
        let exists = fs::metadata(path).await.is_ok();
        if exists {
            let _guard = self.lock.lock().await;
            let data = fs::read(path).await.expect("Failed to read from struct file");
            deserialize(&data).expect("Failed to deserialize struct")
        } else {
            None
        }
    }
}

/*

This implementation defines a `Blog` struct with the required fields and methods, as well as routes for creating, updating, deleting, and searching for blogs. It uses the `oxide-auth` crate to handle user authentication and authorization, and the `tantivy` crate to index and search the blogs in the database.

Note that this implementation is just a sketch and may not be complete or correct. It is intended to give an idea of how these crates can be used together to implement a blog API in Rust.

*/



use actix_web::{get, post, web, HttpResponse};
use oxide_auth::endpoint::OxideAuth;
use oxide_auth::primitives::AuthAction;
use oxide_auth::primitives::VerifiedJwt;
use oxide_auth::web::{Auth, JwtConfig};
use serde::{Deserialize, Serialize};
use tantivy::collector::TopDocs;
use tantivy::query::QueryParser;
use tantivy::schema::{Facet, Field, Schema, TEXT};
use tantivy::{DocAddress, Index};

// Define the schema for the Blog struct.
fn define_schema() -> Schema {
    let mut schema_builder = Schema::builder();
    let title = schema_builder.add_text_field("title", TEXT);
    let body = schema_builder.add_text_field("body", TEXT);
    let tags = schema_builder.add_facet_field("tags");
    let private = schema_builder.add_boolean_field("private");
    schema_builder.build()
}

// Define the Blog struct.
#[derive(Deserialize, Serialize)]
struct Blog {
    id: Option<i64>,
    title: String,
    body: String,
    tags: Vec<String>,
    private: bool,
}

// Define the routes for the Blog API.
#[get("/blogs")]
async fn get_blogs(
    query: web::Query<HashMap<String, String>>,
    auth: Auth,
    index: web::Data<Arc<Index>>,
    schema: web::Data<Schema>,
) -> HttpResponse {
    let mut query_parser = QueryParser::for_index(&index, vec![title, body, tags]);
    let query_string = query
        .get("q")
        .map(|q| q.to_owned())
        .unwrap_or_else(String::new);
    let query = query_parser.parse_query(&query_string);
    let tags: Vec<String> = query
        .get("tags")
        .map(|tags| tags.split(",").map(str::to_owned).collect())
        .unwrap_or_else(Vec::new);
    // If the user is not authenticated, only return non-private blogs.
    let mut filter = if auth.authenticated().is_err() {
        Term::from_field_i64(private, 0)
    } else {
        Term::match_all()
    };

    // Filter the results by the given tags, if any.
    for tag in tags {
        filter = filter.and(Term::from_field_text(tags, &tag));
    }

    // Search the index using the given query and filter.
    let top_docs = index
        .reader()
        .unwrap()
        .searcher()
        .search(&query, &filter, &TopDocs::with_limit(100))
        .await
        .unwrap();

    // Retrieve the matching documents and return them as a JSON array.
    let docs: Vec<Blog> = top_docs
        .iter()
        .map(|doc| {
            let addr = DocAddress(doc.1 as u32, 0);
            let mut blog = index
                .reader()
                .unwrap()
                .doc_reader()
                .unwrap()
                .get_first(addr)
                .unwrap();
            let id = blog.get_first(id).unwrap();
            let title = blog.get_first(title).unwrap();
            let body = blog.get_first(body).unwrap();
            let tags = blog.get_facet(tags).unwrap();
            let private = blog.get_first(private).unwrap();
            Blog {
                id: Some(id),
                title: title.to_owned(),
                body: body.to_owned(),
                tags: tags.iter().map(str::to_owned).collect(),
                private: private != 0,
            }
        })
        .collect();

    HttpResponse::Ok().json(docs)

}

#[post("/blogs")]
async fn upsert_blog(
    blog: web::Json<Blog>,
    auth: Auth,
    index: web::Data<Arc<Index>>,
    schema: web::Data<Schema>,
) -> HttpResponse {
    // Ensure that the user is authenticated.
    let jwt = auth
    .authenticated()
    .map_err(|e| HttpResponse::Unauthorized().body(e.to_string()))?;
    // Ensure that the user is authorized to write to the index.    // Ensure that the user has the correct permissions.
    let claims: VerifiedJwt = jwt.claims;
    if !claims.has_permission("blog:upsert") {
        return HttpResponse::Forbidden().body("Missing required permission");
    }

    // Update or insert the given blog in the index.
    let mut index_writer = index.writer().unwrap();
    let id = blog.id.unwrap_or(index_writer.doc_id_term(0));
    let mut schema_builder = Schema::builder();
    let mut blog_doc = Document::default();
    blog_doc.add_i64(id, id);
    blog_doc.add_text(title, &blog.title);
    blog_doc.add_text(body, &blog.body);
    blog_doc.add_facet(tags, &blog.tags);
    blog_doc.add_i64(private, if blog.private { 1 } else { 0 });
    index_writer.add_document(blog_doc);
    index_writer.commit().unwrap();
    HttpResponse::Ok().body("Blog upserted")
}

#[post("/blogs/{id}/remove")]
async fn remove_blog(
    id: web::Path<i64>,
    auth: Auth,
    index: web::Data<Arc<Index>>,
    schema: web::Data<Schema>,
) -> HttpResponse {
    // Ensure that the user is authenticated.
    let jwt = auth
    .authenticated()
    .map_err(|e| HttpResponse::Unauthorized().body(e.to_string()))?;
    // Ensure that the user has the correct permissions.
    let claims: VerifiedJwt = jwt.claims;
    if !claims.has_permission("blog:remove") {
        return HttpResponse::Forbidden().body("Missing required permission");
    }

    // Remove the blog with the given id from the index.
    let mut index_writer = index.writer().unwrap();
    index_writer.delete_term(Term::from_field_i64(id, id));
    index_writer.commit().unwrap();

    HttpResponse::Ok().body("Blog removed")
}

#[get("/blog/{id}")]
async fn get_blog(
id: web::Path<i64>,
auth: Auth,
index: web::Data<Arc<Index>>,
schema: web::Data<Schema>,
) -> HttpResponse {
// Ensure that the user is authenticated.
let jwt = auth
.authenticated()
.map_err(|e| HttpResponse::Unauthorized().body(e.to_string()))?;

// Ensure that the user has the correct permissions.
let claims: VerifiedJwt = jwt.claims;
if !claims.has_permission("blog:view") {
    return HttpResponse::Forbidden().body("Missing required permission");
}
// Retrieve the blog with the given id from the index.
let addr = DocAddress(id.into_inner() as u32, 0);
let blog = index
    .reader()
    .unwrap()
    .doc_reader()
    .unwrap()
    .get_first(addr)
    .unwrap();
let id = blog.get_first(id).unwrap();
let title = blog.get_first(title).unwrap();
let body = blog.get_first(body).unwrap();
let tags = blog.get_facet(tags).unwrap();
let private = blog.get_first(private).unwrap();

// If the blog is private and the user does not have the correct permissions,
// return a forbidden response.
if private != 0 && !claims.has_permission("blog:view_private") {
    return HttpResponse::Forbidden().body("Missing required permission");
}

HttpResponse::Ok().json(Blog {
    id: Some(id),
    title: title.to_owned(),
    body: body.to_owned(),
    tags: tags.iter().map(str::to_owned).collect(),
    private: private != 0,
})
}

#[post("/login")]
async fn login(auth: Auth) -> HttpResponse {
// Authenticate the user using the provided credentials.
let result = auth
.authenticate(AuthAction::Login)
.await
.map_err(|e| HttpResponse::Unauthorized().body(e.to_string()))?;

// Return the JWT token to the client.
HttpResponse::Ok().json(result)
}

#[post("/logout")]
async fn logout(auth: Auth) -> HttpResponse {
// Log out the authenticated user.
auth.logout();

HttpResponse::Ok().body("Logged out")
}

// Define the web server and its dependencies.
#[actix_rt::main]
async fn main() -> Result<(), std::io::Error> {
let index_path = PathBuf::from("./index");
let index = Index::open_in_dir(&index_path).unwrap();
let schema = define_schema();

// Set up the JWT configuration.
let jwt_config = JwtConfig::default();
let auth = Auth::new(jwt_config);

// Start the web server.
HttpServer::new(move || {
    App::new()
        .wrap(auth.clone())
        .data(index.clone())
        .data(schema.clone())
        .service(get_blogs)
        .service(upsert_blog)
        .service(remove_blog)
        .service(get_blog)
        .service(login)
        .service(logout)
})
.bind("127.0.0.1:8080")?
.run()
.await
}


use comrak::{markdown_to_html, ComrakOptions};

struct Blog {
    title: String,
    tags: Vec<String>,
    author: String,
    raw_content: String,
    content: String,
    content_type: ContentType,
}

impl Blog {
    fn new(title: String, tags: Vec<String>, author: String, raw_content: String, content_type: ContentType) -> Self {
        let content = match content_type {
            ContentType::Markdown => {
                let mut comrak_options = ComrakOptions::default();
                comrak_options.ext_strikethrough = true;
                comrak_options.ext_table = true;
                markdown_to_html(&raw_content, &comrak_options)
            }
            ContentType::HTML => raw_content,
        };

        Blog {
            title,
            tags,
            author,
            raw_content,
            content,
            content_type,
        }
    }

    fn edit(&mut self, raw_content: String, content_type: ContentType) {
        self.raw_content = raw_content;
        self.content_type = content_type;
        self.content = match content_type {
            ContentType::Markdown => {
                let mut comrak_options = ComrakOptions::default();
                comrak_options.ext_strikethrough = true;
                comrak_options.ext_table = true;
                markdown_to_html(&raw_content, &comrak_options)
            }
            ContentType::HTML => raw_content,
        };
    }

    fn render(&self) -> String {
        self.content.clone()
    }

    fn save(&self, file_path: &str) -> std::io::Result<()> {
        use std::fs::File;
        use std::io::Write;

        let mut file = File::create(file_path)?;
        file.write_all(self.content.as_bytes())?;
        Ok(())
    }
}

enum ContentType {
    Markdown,
    HTML,
}













use tokio::fs;
use tokio::prelude::*;
use std::collections::HashMap;

#[derive(Debug)]
struct Auth {
    users: HashMap<String, User>,
}

#[derive(Debug)]
struct User {
    username: String,
    password: String,
    permissions: Vec<String>,
    blobs: HashMap<String, Vec<u8>>,
}

impl Auth {
    async fn new() -> Self {
        Auth {
            users: HashMap::new(),
        }
    }

    async fn sign_up(&mut self, username: String, password: String) {
        let user = User {
            username,
            password,
            permissions: Vec::new(),
            blobs: HashMap::new(),
        };
        self.users.insert(username, user);
    }

    async fn sign_out(&mut self, username: &str) {
        self.users.remove(username);
    }

    async fn change_username(&mut self, old_username: &str, new_username: &str) {
        let user = self.users.remove(old_username).unwrap();
        let new_user = User {
            username: new_username.to_string(),
            password: user.password,
            permissions: user.permissions,
            blobs: user.blobs,
        };
        self.users.insert(new_username.to_string(), new_user);
    }

    async fn change_password(&mut self, username: &str, password: String) {
        let mut user = self.users.get_mut(username).unwrap();
        user.password = password;
    }

    async fn add_permission(&mut self, username: &str, permission: String) {
        let mut user = self.users.get_mut(username).unwrap();
        user.permissions.push(permission);
    }

    async fn revoke_permission(&mut self, username: &str, permission: &str) {
        let mut user = self.users.get_mut(username).unwrap();
        user.permissions.retain(|p| p != permission);
    }

    async fn upsert_blob(&mut self, username: &str, name: String, blob: Vec<u8>) {
        let mut user = self.users.get_mut(username).unwrap();
        user.blobs.insert(name, blob);
    }

    async fn get_blob(&self, username: &str, name: &str) -> Option<&Vec<u8>> {
        self.users
            .get(username)
            .and_then(|user| user.blobs.get(name))
    }

    async fn delete_blob(&mut self, username: &str, name: &str) {
        let mut user = self.users.get_mut(username).unwrap();
        user.blobs.remove(name);
    }

    async fn save(&self) -> Result<(), Box<dyn std::error::Error>> {
        for (username, user) in &self.users {
            let user_dir = format!("users/{}", username);
            fs::create_dir_all(&user_dir).await?;
            let profile_json = serde_json::to_string(user)?;
            fs::write(format!("{}/profile.json", user_dir), profile_json).await?;
    
            let blobs_dir = format!("{}/blobs", user_dir);
            fs::create_dir_all(&blobs_dir).await?;
    
            for (name, blob) in &user.blobs {
                fs::write(format!("{}/{}.blob", blobs_dir, name), blob).await?;
            }
        }
    
        Ok(())
    }
}


use bincode::{deserialize, serialize};
use tokio::fs;
use tokio::path::Path;
use tokio::sync::Mutex;
use argon2::{self, Config};

struct StructStore<T> {
    // The directory where the struct files are stored.
    directory: String,
    // A mutex to protect access to the struct files on disk.
    lock: Mutex<()>,
}

impl<T> StructStore<T>
where
    T: Send + Sync + Serialize + for<'a> Deserialize<'a>,
{
    // Adds the given struct to the store.
    // If the struct already exists in the store, it is overwritten.
    async fn add(&self, id: &str, value: &T) {
        let path = Path::new(&self.directory).join(id);
        let data = serialize(value).expect("Failed to serialize struct");
        let _guard = self.lock.lock().await;
        fs::write(path, &data).await.expect("Failed to write to struct file");
    }

    // Returns the struct with the given id, if it exists in the store.
    // If the struct is not found, `None` is returned.
    async fn get(&self, id: &str) -> Option<T> {
        let path = Path::new(&self.directory).join(id);
        let exists = fs::metadata(path).await.is_ok();
        if exists {
            let _guard = self.lock.lock().await;
            let data = fs::read(path).await.expect("Failed to read from struct file");
            deserialize(&data).expect("Failed to deserialize struct")
        } else {
            None
        }
    }

    // Returns a Vec of all the structs in the store.
    async fn get_all(&self) -> Vec<T> {
        let paths = fs::read_dir(&self.directory).await.expect("Failed to read struct directory");
        let mut structs = vec![];
        for path in paths {
            let id = path.file_name().into_string().expect("Failed to convert file name to string");
            let struct = self.get(&id).await.expect("Failed to get struct from store");
            structs.push(struct);
        }
        structs
    }
}

struct User {
    id: String,
    username: String,
    password_hash: String,
    permissions: Vec<String>,
    logged_in: bool,
}

struct Auth {
    store: StructStore<User>,
    config: Config,
}

impl Auth {
    // Adds the given user to the system.
    // If the user already exists in the system, it is overwritten.
    async fn add_user(&self, user: &User) {
        self.store.add(&user.id, user).await;
    }
// Returns the user with the given ID, if it exists in the system.
// If the user is not found, `None` is returned.
async fn get_user(&self, id: &str) -> Option<User> {
    self.store.get(id).await
}

// Returns the user with the given username, if it exists in the system.
// If the user is not found, `None` is returned.
async fn get_user_by_username(&self, username: &str) -> Option<User> {
    let users = self.store.get_all().await;
    users.into_iter().find(|user| user.username == username)
}

// Allows a user to log in to the system, given their username and password.
// If the username or password are incorrect, or if the user is already logged in,
// this method returns `false`. Otherwise, it returns `true`.
async fn login(&self, username: &str, password: &str) -> bool {
    let user = match self.get_user_by_username(username).await {
        Some(user) => user,
        None => return false,
    };

    if user.logged_in {
        return false;
    }

    let password_matched = argon2::verify_encoded(&user.password_hash, password.as_bytes()).unwrap_or(false);
    if !password_matched {
        return false;
    }

    user.logged_in = true;
    self.store.add(&user.id, &user).await;

    true
}

// Allows a user to log out of the system.
// If the user is not logged in, this method returns `false`.
// Otherwise, it returns `true`.
async fn logout(&self, id: &str) -> bool {
    let mut user = match self.get_user(id).await {
        Some(user) => user,
        None => return false,
    };

    if !user.logged_in {
        return false;
    }

    user.logged_in = false;
    self.store.add(&user.id, &user).await;

    true
}

// Adds a permission to the given user's list of permissions.
// If the user does not exist or the permission is already in the list,
// this method returns `false`. Otherwise, it returns `true`.
async fn add_permission(&self, id: &str, permission: &str) -> bool {
    let mut user = match self.get_user(id).await {
        Some(user) => user,
        None => return false,
    };

    if user.permissions.contains(permission) {
        return false;
    }

    user.permissions.push(permission.to_string());
    self.store.add(&user.id, &user).await;

    true
}

// Removes a permission from the given user's list of permissions.
// If the user does not exist or the permission is not in the list,
// this method returns false. Otherwise, it returns true.
async fn revoke_permission(&self, id: &str, permission: &str) -> bool {
    let mut user = match self.get_user(id).await {
        Some(user) => user,
        None => return false,
    };

    if !user.permissions.contains(permission) {
        return false;
    }

    user.permissions.retain(|p| p != permission);
    self.store.add(&user.id, &user).await;

    true
}

// Changes the given user's username.
// If the user does not exist or the new username is already taken,
// this method returns `false`. Otherwise, it returns `true`.
async fn change_username(&self, id: &str, new_username: &str) -> bool {
    let mut user = match self.get_user(id).await {
        Some(user) => user,
        None => return false,
    };

    if self.get_user_by_username(new_username).await.is_some() {
        return false;
    }

    user.username = new_username.to_string();
    self.store.add(&user.id, &user).await;

    true
}

// Changes the given user's password.
// If the user does not exist, this method returns `false`.
// Otherwise, it returns `true`.
async fn change_password(&self, id: &str, new_password: &str) -> bool {
    let mut user = match self.get_user(id).await {
        Some(user) => user,
        None => return false,
    };

    let password_hash = argon2::hash_encoded(new_password.as_bytes(), &self.config).unwrap();
    user.password_hash = password_hash;
    self.store.add(&user.id, &user).await;

    true
}
}


struct BlogManager {
    entries: BTreeMap<String, Entry>,
    }
    
    impl BlogManager {
    fn new() -> BlogManager {
    BlogManager {
    entries: BTreeMap::new(),
    }
    }
    
    // Adds an entry to the blog.
    fn upsert(&mut self, entry: Entry) {
        self.entries.insert(entry.id, entry);
    }
    
    fn save(&self, id: &str) {
        let path = format!("./blog/entries/{}/entry.bin", id);
        let entry = self.entries.get(id).unwrap();
    
        let encoded = bincode::serialize(entry).unwrap();
        fs::write(path, encoded).unwrap();
    }
    
    fn render(&self, id: &str) -> String {
        let entry = self.entries.get(id).unwrap();
        let markdown = comrak::markdown_to_html(&entry.raw_content, &comrak::ComrakOptions::default());
    
        markdown
    }
    
    fn list_entries(&self) -> Vec<&Entry> {
        self.entries.values().collect()
    }
    
    fn get_entry(&self, id: &str) -> Option<&Entry> {
        self.entries.get(id)
    }
    
    fn delete_entry(&mut self, id: &str) {
        self.entries.remove(id);
    }
    }
    
    #[derive(Serialize, Deserialize)]
    struct Entry {
    id: String,
    title: String,
    raw_content: String,
    author: String,
    created: DateTime<Utc>,
    data: Option<BTreeMap<String, (String, Vec<u8>)>>,
    }



    // This function takes a vector of bytes and packs them into a vector of u32s,
// storing each byte in the least-significant bits of each u32.
fn pack_bits(bytes: Vec<u8>) -> Vec<u32> {
    let mut packed = Vec::new();

    // Keep track of the current u32 we're working on, and how many bits have
    // already been used in it.
    let mut current: u32 = 0;
    let mut used_bits = 0;

    for byte in bytes {
        // Shift the byte to the right position in the current u32, and OR it with
        // the existing value to combine the two.
        current |= (byte as u32) << used_bits;
        used_bits += 8;

        // If we've used all 32 bits in the current u32, we can store it and start
        // on a new one.
        if used_bits >= 32 {
            packed.push(current);
            current = 0;
            used_bits = 0;
        }
    }

    // If there are any bits left over in the current u32, we need to store it.
    if used_bits > 0 {
        packed.push(current);
    }

    packed
}

// This function takes a vector of u32s containing packed bits, and unpacks them
// into a vector of bytes.
fn unpack_bits(packed: Vec<u32>) -> Vec<u8> {
    let mut unpacked = Vec::new();

    // Keep track of the current u32 we're working on, and how many bits have
    // already been processed.
    let mut current: u32 = 0;
    let mut processed_bits = 0;

    for num in packed {
        // Shift the current u32 to the right to make room for the next set of bits.
        current |= num << processed_bits;
        processed_bits += 32;

        // While we have at least 8 bits available, we can extract a new byte.
        while processed_bits >= 8 {
            let byte = (current & 0xff) as u8;
            unpacked.push(byte);
            current >>= 8;
            processed_bits -= 8;
        }
    }

    unpacked
}



struct Bank {
    accounts: Vec<Account>,
}

impl Bank {
    // Creates a new bank with no accounts
    fn new() -> Bank {
        Bank { accounts: Vec::new() }
    }

    // Adds a new account to the bank
    fn add_account(&mut self, account: Account) {
        self.accounts.push(account);
    }

    // Transfers money from one account to another
    fn transfer(&mut self, from: usize, to: usize, amount: f64) -> Result<(), &'static str> {
        if from >= self.accounts.len() || to >= self.accounts.len() {
            return Err("Invalid account index");
        }

        let from_account = &mut self.accounts[from];
        let to_account = &mut self.accounts[to];

        if from_account.balance < amount {
            return Err("Insufficient funds");
        }

        from_account.balance -= amount;
        to_account.balance += amount;

        Ok(())
    }
}

struct Account {
    balance: f64,
}

impl Account {
    // Creates a new account with a given balance
    fn new(balance: f64) -> Account {
        Account { balance }
    }
}