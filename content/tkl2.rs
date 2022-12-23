use std::collections::HashMap;
use rand::Rng;

// Create a mutable global hashtable to store the random weights
// that will be used to determine the results of the interpreter
let mut weights: HashMap<String, f32> = HashMap::new();

// Define a function to interpret a vector of strings
fn interpret(tokens: Vec<String>) {
    // Initialize a variable to store the last saved value
    let mut last_saved: f32 = 0.0;

    // Iterate over the vector of tokens
    for token in tokens {
        // Parse and interpret the current token based on its value
        match token.as_str() {
            "in" => {
                // Generate a random weight between 0 and 1
                // and add it to the global hashtable
                let weight: f32 = rand::thread_rng().gen_range(0.0, 1.0);
                weights.insert(token, weight);
            },
            "out" => {
                // Print the value of the random weight associated
                // with the "in" token to the console
                let weight: f32 = weights.get("in").unwrap();
                println!("{}", weight);
            },
            "input" => {
                // Get user input and save it as a random weight
                // in the global hashtable
                let mut input = String::new();
                std::io::stdin().read_line(&mut input).unwrap();
                let weight: f32 = input.trim().parse().unwrap();
                weights.insert(token, weight);
            },
            "save" => {
                // Save the value of the random weight associated
                // with the "input" token in the "last_saved" variable
                let weight: f32 = weights.get("input").unwrap();
                last_saved = weight;
            },
            "output_last_saved" => {
                // Print the value of the "last_saved" variable to the console
                println!("{}", last_saved);
            },
            "+" => {
                // Add the values of the random
