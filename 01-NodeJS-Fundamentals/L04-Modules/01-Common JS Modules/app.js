/*
    I am importing my math module using require().

    Since math.js is in the same directory as app.js,
    I use:

    "./math"

    The "./" means:

    "Look in the current directory."

    I don't need to write ".js" here because
    CommonJS allows Node.js to resolve the file
    without me explicitly writing the extension.
*/

const math = require("./math");

/*
    require("./math") gives me whatever I exported
    using module.exports inside math.js.

    Since math.js exported an object containing
    four functions, the math variable now contains
    that object.

    Conceptually:

    math = { add, subtract, multiply, divide }
*/

/*
    Now I can access each exported function
    through the math object.

    I don't need to rewrite the actual function
    logic here because that logic already exists
    inside math.js.
*/

console.log("Addition:", math.add(10, 5));

console.log("Subtraction:", math.subtract(10, 5));

console.log("Multiplication:", math.multiply(10, 5));

console.log("Division:", math.divide(10, 5));

/*
    I can also take individual functions out of
    the object using destructuring.

    Instead of writing:

    const add = math.add;

    I can write:

    const { add, subtract } = math;

    Now I can directly use:

    add(10, 5)
    subtract(10, 5)

    This isn't a special CommonJS feature.

    It is simply JavaScript object destructuring
    being used with the object returned by require().
*/

const { add, subtract } = math;

console.log("Using destructuring:", add(20, 10));

console.log("Using destructuring:", subtract(20, 10));

/*
    The important thing I want to understand here is:

    math.js
       ↓
    module.exports
       ↓
    exports an object
       ↓
    require("./math")
       ↓
    app.js receives that object
       ↓
    I can use the exported functions
*/
