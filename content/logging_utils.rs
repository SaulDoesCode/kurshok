
const ALL_CLEAR: &str = "\e[0m";
const CLR_RED: &str = "\e[31m";
const CLR_GREEN: &str = "\e[32m";
const CLR_YELLOW: &str = "\e[33m";
const CLR_BLUE: &str = "\e[34m";
const CLR_MAGENTA: &str = "\e[35m";
const CLR_CYAN: &str = "\e[36m";
const CLR_DEFAULT: &str = "\e[39m";
const CLR_WHITE: &str = "\e[97m";
const CLR_LIGHT_GRAY: &str = "\e[37m";
const CLR_DARK_GRAY: &str = "\e[90m";
const CLR_LIGHT_RED: &str = "\e[91m";
const CLR_LIGHT_GREEN: &str = "\e[92m";
const CLR_LIGHT_YELLOW: &str = "\e[93m";
const CLR_LIGHT_BLUE: &str = "\e[94m";
const CLR_LIGHT_MAGENTA: &str = "\e[95m";
const CLR_LIGHT_CYAN: &str = "\e[96m";

const STYLE_BOLD: &str = "\e[1m";
const STYLE_DIM: &str = "\e[2m";
const STYLE_UNDERLINE: &str = "\e[4m";
const STYLE_BLINK: &str = "\e[5m";
const STYLE_INVERSE: &str = "\e[7m";

fn log_time(message: &str) {
println!("[{}]: {}", get_formatted_time(), message);
}

fn log_ok(message: &str) {
println!("{}[P]{} {}", CLR_GREEN, ALL_CLEAR, message);
}

fn log_fail(message: &str) {
println!("{}[F]{} {}", CLR_RED, ALL_CLEAR, message);
}

fn log_debug(message: &str) {
println!("{}[D]{} {}", CLR_MAGENTA, ALL_CLEAR, message);
}

fn log_info(message: &str) {
println!("{}[I]{} {}", CLR_CYAN, ALL_CLEAR, message);
}

fn log_warn(message: &str) {
println!("{}[W]{} {}", CLR_YELLOW, ALL_CLEAR, message);
}

fn log_error(message: &str) {
println!("{}[E]{} {}", CLR_RED, ALL_CLEAR, message);
}

fn log_end(message: &str) {
println!("{}[--]{} {}", CLR_MAGENTA, ALL_CLEAR, message);
}

fn log_yes() {
println!("{}✔{}", CLR_GREEN, ALL_CLEAR);
}

fn log_no() {
println!("{}✕{}", CLR_RED, ALL_CLEAR);
}

fn get_formatted_time() -> String {
let now = Local::now();
let formatted_time = if let Some(time_only) = env::var("TIME_ONLY") {
now.format("%T").to_string()
} else {
now.format("%Y-%m-%d %T").to_string()
};
formatted_time
}

fn __log_to_error(message: &str) {
println!("[{}]: {}", get_formatted_time(), message);
}

fn log_time_short(message: &str) {
__log_to_error(message);
}

fn log_debug_short(message: &str) {
__log_to_error(&format!("{}[D]{} {}", CLR_MAGENTA, ALL_CLEAR, message));
}

fn log_ok_short(message: &str) {
__log_to_error(&format!("{}[P]{} {}", CLR_GREEN, ALL_CLEAR, message));
}

fn log_fail_short(message: &str) {
__log_to_error(&format!("{}[F]{} {}", CLR_RED, ALL_CLEAR, message));
}

fn log_info_short(message: &str) {
__log_to_error(&format!("{}[I]{} {}", CLR_CYAN, ALL_CLEAR, message));
}

fn log_error_short(message: &str) {
__log_to_error(&format!("{}[E]{} {}", CLR_RED, ALL_CLEAR, message));
}

fn log_warn_short(message: &str) {
__log_to_error(&format!("{}[W]{} {}", CLR_YELLOW, ALL_CLEAR, message));
}

fn log_end_short(message: &str) {
__log_to_error(&format!("{}[--]{} {}", CLR_MAGENTA, ALL_CLEAR, message));
}

fn log_yes_short() {
__log_to_error(&format!("{}✔{}", CLR_GREEN, ALL_CLEAR));
}

fn log_no_short() {
__log_to_error(&format!("{}✕{}", CLR_RED, ALL_CLEAR));
}

fn __log_to_error_all_colour(colour: &str, message: &str) {
println!("{}[{}]: {}", colour, get_formatted_time(), message);
}

fn log_time_short_all_colour(colour: &str, message: &str) {
__log_to_error_all_colour(colour, message);
}

fn log_debug_short_all_colour(colour: &str, message: &str) {
__log_to_error_all_colour(colour, &format!("[D] {}", message));
}

fn log_ok_short_all_colour(colour: &str, message: &str) {
__log_to_error_all_colour(colour, &format!("[P] {}", message));
}

fn log_fail_short_all_colour(colour: &str, message: &str) {
__log_to_error_all_colour(colour, &format!("[F] {}", message));
}

fn log_info_short_all_colour(colour: &str, message: &str) {
__log_to_error_all_colour(colour, &format!("[I] {}", message));
}

fn log_error_short_all_colour(colour: &str, message: &str) {
__log_to_error_all_colour(colour, &format!("[E] {}", message));
}

fn log_warn_short_all_colour(colour: &str, message: &str) {
__log_to_error_all_colour(colour, &format!("[W] {}", message));
}

fn log_end_short_all_colour(colour: &str, message: &str) {
__log_to_error_all_colour(colour, &format!("[--] {}", message));
}

fn log_yes_short_all_colour(colour: &str) {
__log_to_error_all_colour(colour, "✔");
}

fn log_no_short_all_colour(colour: &str) {
__log_to_error_all_colour(colour, "✕");
}

fn log_time_long(message: &str) {
println!("[{}]: {}", get_formatted_time(), message);
}

fn log_debug_long(message: &str) {
println!("{}[D]{} {}", CLR_MAGENTA, ALL_CLEAR, message);
}

fn log_ok_long(message: &str) {
println!("{}[P]{} {}", CLR_GREEN, ALL_CLEAR, message);
}

fn log_fail_long(message: &str) {
println!("{}[F]{} {}", CLR_RED, ALL_CLEAR, message);
}

fn log_info_long(message: &str) {
println!("{}[I]{} {}", CLR_CYAN, ALL_CLEAR, message);
}

fn log_error_long(message: &str) {
println!("{}[E]{} {}", CLR_RED, ALL_CLEAR, message);
}

fn log_warn_long(message: &str) {
println!("{}[W]{} {}", CLR_YELLOW, ALL_CLEAR, message);
}

fn log_end_long(message: &str) {
println!("{}[--]{} {}", CLR_MAGENTA, ALL_CLEAR, message);
}

fn log_yes_long() {
println!("{}✔{}", CLR_GREEN, ALL_CLEAR);
}

fn log_no_long() {
println!("{}✕{}", CLR_RED, ALL_CLEAR);
}


fn test() {
let short = env::var("SHORT").is_ok();
let log_short = env::var("LOG_SHORT").is_ok();
if short {
    log_time_short("This is a time log with no type set");
    log_debug_short("This is a debug log");
    log_ok_short("This is an okay log");
    log_fail_short("This is a failure log");
    log_info_short("This is an info log");
    log_error_short("This is an error log");
    log_warn_short("This is a warning log");
    log_end_short("This is an end log");
    log_yes_short();
    log_no_short();
} else if log_short {
    log_time_short_all_colour(CLR_DEFAULT, "This is a time log with no type set");
    log_debug_short_all_colour(CLR_MAGENTA, "This is a debug log");
    log_ok_short_all_colour(CLR_GREEN, "This is an okay log");
    log_fail_short_all_colour(CLR_RED, "This is a failure log");
    log_info_short_all_colour(CLR_CYAN, "This is an info log");
    log_error_short_all_colour(CLR_RED, "This is an error log");
    log_warn_short_all_colour(CLR_YELLOW, "This is a warning log");
    log_end_short_all_colour(CLR_MAGENTA, "This is an end log");
    log_yes_short_all_colour(CLR_GREEN);
    log_no_short_all_colour(CLR_RED);
} else {
    log_time_long("This is a time log with no type set");
    log_debug_long("This is a debug log");
    log_ok_long("This is an okay log");
    log_fail_long("This is a failure log");
    log_info_long("This is an info log");
    log_error_long("This is an error log");
    log_warn_long("This is a warning log");
    log_end_long("This is an end log");
    log_yes_long();
    log_no_long();
}
}

