// L01 — What is Node.js

/*
   This file demonstrates the basic idea behind Node.js:
  
   JavaScript can run outside the browser.
  
   Run this file with:
 
       node app.js
 */

// JavaScript running through Node.js
const userName = "Vivek";
const learning = "Node.js";

console.log("Hello from Node.js!");
console.log(`My name is ${userName}.`);
console.log(`I am learning ${learning}.`);

// Node.js provides access to information about
// the environment in which our program is running.

console.log("\nNode.js Environment:");
console.log(`Node.js version: ${process.version}`);
console.log(`Operating system: ${process.platform}`);
console.log(`Current process ID: ${process.pid}`);

/*
   The important thing to understand:
  
   This code is JavaScript, but we are NOT running it
   inside a browser.
  
   We are running it using the Node.js runtime:
  
       JavaScript
            ↓
          Node.js
            ↓
        Our Program
 */