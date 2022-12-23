use rand::prelude::*;

fn interpret(tokens: Vec<String>) {
    let mut rng = rand::thread_rng();
    let mut saved_value: i32 = 0;
    let mut result: i32 = 0;

    for token in tokens {
        match token.as_str() {
            "in" => {
                result = rng.gen_range(1, 101);
            }
            "out" => {
                println!("{}", result);
            }
            "log" => {
                println!("{}", result);
                result = 0;
            }
            "input" => {
                let mut input = String::new();
                std::io::stdin().read_line(&mut input).unwrap();
                result = input.trim().parse().unwrap();
            }
            "save" => {
                saved_value = result;
            }
            "output_last_saved" => {
                println!("{}", saved_value);
            }
            "+" => {
                result += rng.gen_range(1, 101);
            }
            "-" => {
                result -= rng.gen_range(1, 101);
            }
            "/" => {
                result /= rng.gen_range(1, 101);
            }
            "*" => {
                result *= rng.gen_range(1, 101);
            }
            "=" => {
                if rng.gen() {
                    result += rng.gen_range(1, 101);
                } else {
                    result -= rng.gen_range(1, 101);
                }
            }
            "?" => {
                if rng.gen() {
                    println!("Yes");
                } else {
                    println!("No");
                }
            }
            _ => {}
        }
    }
}
