use std::collections::HashMap;
use std::path::Path;
use serde::{Deserialize, Serialize};

// This macro creates a serializable struct that derives the Serialize and
// Deserialize traits, which are used by Serde to convert between the struct
// and its JSON representation.
#[derive(Serialize, Deserialize)]
struct JSON_DB {
    // We use a HashMap to store the key-value pairs in the database.
    data: HashMap<String, String>,
}

impl JSON_DB {
    fn new() -> Self {
        // This creates a new JSON_DB with an empty data HashMap.
        JSON_DB {
            data: HashMap::new(),
        }
    }

    fn set<T: Serialize>(&mut self, key: &str, value: &T) -> Result<(), String> {
        // This function serializes the value using Serde and stores it in the
        // data HashMap under the given key.

        // First, we create the path where the serialized value will be stored.
        // This uses the format "./data/{key}/{value}.json".
        let value_path = format!("./data/{}/{}.json", key, value);

        // Then we serialize the value using Serde.
        let serialized_value = serde_json::to_string(value).map_err(|e| e.to_string())?;

        // Finally, we store the serialized value in the data HashMap.
        self.data.insert(key.to_owned(), serialized_value);

        // If everything goes well, we return Ok(()).
        Ok(())
    }

    fn get<T: Deserialize>(&self, key: &str) -> Result<T, String> {
        // This function retrieves the serialized value from the data HashMap
        // and deserializes it using Serde.

        // First, we get the serialized value from the data HashMap.
        let serialized_value = self
            .data
            .get(key)
            .ok_or_else(|| format!("Key not found: {}", key))?;

        // Then we deserialize the value using Serde.
        let value = serde_json::from_str(serialized_value).map_err(|e| e.to_string())?;

        // Finally, we return the deserialized value.
        Ok(value)
    }

    fn save(&self) -> Result
