#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
#![allow(dead_code, unused_imports, unused_variables, unused_must_use)]

#[macro_use]
extern crate wasm_bindgen;
#[macro_use]
extern crate lazy_static;
extern crate mastermind;
extern crate console_error_panic_hook;

use std::panic;
use wasm_bindgen::prelude::*;
use std::sync::Mutex;
use mastermind::*;
use std::fmt::Write;
use std::string::ToString;

lazy_static! {
    static ref STATE: Mutex<GameState> = Mutex::new(
        GameState::new_with_answer(vec![
            Peg::new(Color::Red),
            Peg::new(Color::Red),
            Peg::new(Color::Red),
            Peg::new(Color::Red)
        ])
    );
}

#[wasm_bindgen]
extern {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

#[wasm_bindgen]
pub fn init_mastermind(answer: String) {
    panic::set_hook(Box::new(console_error_panic_hook::hook));

    // STATE.replacewith new thing that has answer
    let mut state = STATE.lock().unwrap();

    let answer_vec = answer.split(" ")
        .map(|c| c.parse::<u32>())
        .filter(|res| res.is_ok())
        .map(|c| c.unwrap())
        .collect::<Vec<u32>>();

    log_u32(answer_vec[0]);
    log_u32(answer_vec[1]);
    log_u32(answer_vec[2]);
    log_u32(answer_vec[3]);

    *state = GameState::new_with_answer(vec![
        Peg::new(Color::new(answer_vec[0])),
        Peg::new(Color::new(answer_vec[1])),
        Peg::new(Color::new(answer_vec[2])),
        Peg::new(Color::new(answer_vec[3]))
    ])
}

#[wasm_bindgen]
pub fn step(guess: String) -> String {

    let pegs_guess: Vec<Peg> = guess.chars()
        .map(|c| c.into())
        .collect();

    let validity = STATE.lock().unwrap().step(pegs_guess);

    let mut validity_string = String::new();
    for correctness in validity {
        validity_string.push_str(match correctness {
            Correctness::Partial => "0",
            Correctness::Total => "1",
        })
    }

    validity_string
}

#[wasm_bindgen]
pub fn add(a: i32, b: i32) -> i32 {
    a + b
}
