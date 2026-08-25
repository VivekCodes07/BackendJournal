/*
    I am keeping all my math-related functions
    inside this separate file instead of putting
    everything inside app.js.

    This is the main reason I am learning modules.

    As my application becomes bigger, I don't want
    one file to contain all of my code.

    So I can create separate modules and give
    each module a specific responsibility.
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

function divide(a, b) {
  return a / b;
}

/*
    Here I am exporting multiple functions
    from this module.

    In CommonJS, I use module.exports
    to decide what other files can access.

    I am exporting an object containing
    all four functions.

    So when another file imports this module,
    it will receive an object like:

    {
        add: add,
        subtract: subtract,
        multiply: multiply,
        divide: divide
    }

    Because of object property shorthand,
    I can simply write:

    {
        add,
        subtract,
        multiply,
        divide
    }
*/

module.exports = { add, subtract, multiply, divide };

/*
    Important:

    I could also export just one value like this:

    module.exports = add;

    In that case, require("./math") would directly
    return the add function instead of an object.

    But I am not doing that here because I want
    this module to provide multiple math functions.
*/
