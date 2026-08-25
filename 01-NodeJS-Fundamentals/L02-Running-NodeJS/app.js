// L02 — Running Node.js

console.log("Hello from Node.js!");

// Node.js gives us information about the
// environment in which our program is running.

console.log("\nNode.js Environment");

console.log(`Node.js version: ${process.version}`);
console.log(`Operating system: ${process.platform}`);
console.log(`Process ID: ${process.pid}`);

// process.argv contains the arguments
// passed to our program from the terminal.

console.log("\nCommand-line Arguments");

console.log(process.argv);

// The first two values are provided by Node.js.
// Our own arguments start from index 2.

const name = process.argv[2];
const language = process.argv[3];
const goal = process.argv[4];

console.log("\nStudent Information");

console.log(`Name: ${name}`);
console.log(`Language: ${language}`);
console.log(`Goal: ${goal}`);