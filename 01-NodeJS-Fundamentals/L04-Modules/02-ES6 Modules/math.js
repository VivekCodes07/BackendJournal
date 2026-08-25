/*
    I am keeping all my math-related functions
    inside this file instead of putting them
    directly inside app.js.

    This is one of the main benefits of modules.

    I can keep related code together and then
    export whatever I want to use in another file.
*/

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

/*
    Here I am using named exports.

    I am explicitly exporting add, subtract,
    and multiply by their names.

    Because these are named exports,
    I will have to use the same names
    when importing them.
*/

export { add, subtract, multiply };

/*
    Now I am creating another function that
    I want to use as the main/default export
    of this module.

    A module can have multiple named exports,
    but only one default export.
*/

function divide(a, b) {
  return a / b;
}

/*
    Here I am exporting divide as the default export.

    This means when another file imports the
    default export, it doesn't need to use { }.

    So this file now has:

    Named exports:
    - add
    - subtract
    - multiply

    Default export:
    - divide
*/

export default divide;
