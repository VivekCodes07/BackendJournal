/*
    I am importing the named exports from math.js.

    Since add, subtract, and multiply were
    exported by their names, I need to use { }.

    The names also need to match the names
    I used while exporting them.
*/

import { add, subtract, multiply } from "./math.js";

/*
    I am also importing the default export
    from the same math.js file.

    Notice that I don't use { } here.

    Since divide is the default export,
    I can choose the name I want for it.

    I could call it divide, division, or anything
    else, but keeping the original name makes
    the code easier to understand.
*/

import divide from "./math.js";

/*
    Now I can use all four functions.

    The named exports and default export
    are coming from the same module.
*/

console.log("Addition:", add(10, 5));

console.log("Subtraction:", subtract(10, 5));

console.log("Multiplication:", multiply(10, 5));

console.log("Division:", divide(10, 5));
