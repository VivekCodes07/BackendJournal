# Lesson 02 — Running Node.js

## What Am I Trying to Understand?

In the last lesson, I learned **what Node.js is** and understood that it allows JavaScript to run outside the browser.

Now I want to actually use it.

In this lesson, I will learn:

* How to check whether Node.js is installed
* How to check the Node.js version
* How to run a JavaScript file with Node.js
* How Node.js starts and executes a program
* What `process` is
* What `process.argv` does
* How command-line arguments reach my JavaScript program

---

# 1. Checking Node.js

Before running JavaScript with Node.js, I need to make sure Node.js is installed.

Open the terminal and run:

```bash
node --version
```

or:

```bash
node -v
```

I should get something similar to:

```text
v24.x.x
```

The exact version may be different depending on when Node.js is installed.

I can also check the npm version:

```bash
npm -v
```

For now, the important thing is:

```text
node → Node.js
npm  → Node Package Manager
```

We'll learn npm properly in a later lesson.

---

# 2. Running My First Node.js File

Create a file:

```text
app.js
```

Add:

```javascript
console.log("Hello from Node.js!");
```

Now open the terminal in the same folder and run:

```bash
node app.js
```

Node.js loads the file, executes the JavaScript, and prints:

```text
Hello from Node.js!
```

The basic pattern is:

```text
node <filename>
```

For example:

```bash
node app.js
node server.js
node index.js
```

---

# 3. What Happens When I Run `node app.js`?

When I type:

```bash
node app.js
```

I am asking Node.js to execute the JavaScript inside `app.js`.

The basic flow is:

```text
node app.js
     ↓
Node.js starts
     ↓
app.js is loaded
     ↓
JavaScript is executed
     ↓
Output is printed
     ↓
Program finishes
```

For a simple program, JavaScript statements execute from top to bottom.

For example:

```javascript
console.log("First");
console.log("Second");
console.log("Third");
```

Output:

```text
First
Second
Third
```

This is the basic execution model I should understand before learning asynchronous Node.js.

---

# 4. Node.js Creates a Process

When I run:

```bash
node app.js
```

Node.js starts a **process** for my program.

A process is basically a running instance of a program.

For example:

```text
Terminal
   ↓
node app.js
   ↓
Node.js Process
   ↓
My JavaScript Program
```

Node.js gives my program access to information about this running process through:

```javascript
process
```

I don't have to import it.

It is provided by Node.js.

---

# 5. The `process` Object

The `process` object contains useful information and functionality related to the currently running Node.js process.

For example:

```javascript
console.log(process.version);
```

This gives the Node.js version.

I can also use:

```javascript
console.log(process.platform);
```

to find the operating system.

And:

```javascript
console.log(process.pid);
```

to get the process ID.

So:

```text
process
   │
   ├── version
   ├── platform
   ├── pid
   └── argv
```

There are many more properties and methods, but these are enough for now.

---

# 6. `process.argv`

One of the useful things Node.js gives us is:

```javascript
process.argv
```

`argv` means **argument vector**.

It contains the command-line arguments passed to our Node.js program.

For example, suppose I have:

```javascript
console.log(process.argv);
```

and run:

```bash
node app.js
```

Node.js will provide an array containing information about how the process was started.

The exact output can vary, but conceptually it looks like:

```text
[
    path-to-node,
    path-to-app.js
]
```

---

# 7. Passing My Own Arguments

Now things get more interesting.

Suppose my `app.js` contains:

```javascript
console.log(process.argv);
```

I can run:

```bash
node app.js Vivek NodeJS
```

Now the arguments I provided are also available through `process.argv`.

Conceptually:

```text
node app.js Vivek NodeJS
        │      │      │
        │      │      └── argument
        │      └───────── argument
        └──────────────── file
```

The important part is that my own arguments appear after the Node.js and file information.

So I can access them using their indexes.

For example:

```javascript
const name = process.argv[2];

console.log(`Hello, ${name}!`);
```

Now:

```bash
node app.js Vivek
```

produces:

```text
Hello, Vivek!
```

---

# 8. Why Would I Need Command-Line Arguments?

At first, this may seem unnecessary.

But command-line arguments allow me to give information to a program **when starting it**.

For example:

```bash
node app.js Vivek
```

The program receives:

```text
Vivek
```

We could build a simple command-line application:

```bash
node app.js add "Learn Node.js"
```

or:

```bash
node app.js delete 10
```

This idea will become more useful when working with Node.js CLI applications.

---

# 9. A Small Example

Suppose I create:

```javascript
const name = process.argv[2];
const topic = process.argv[3];

console.log(`Student: ${name}`);
console.log(`Learning: ${topic}`);
```

Then I run:

```bash
node app.js Vivek NodeJS
```

Output:

```text
Student: Vivek
Learning: NodeJS
```

The flow is:

```text
Command
   ↓
node app.js Vivek NodeJS
   ↓
Node.js
   ↓
process.argv
   ↓
[ ..., ..., "Vivek", "NodeJS" ]
   ↓
process.argv[2] → "Vivek"
process.argv[3] → "NodeJS"
```

---

# 10. What I Should Remember

There are a few things worth remembering from this lesson.

### Running Node.js

```bash
node app.js
```

runs the JavaScript inside `app.js`.

### Checking the Node.js version

```bash
node -v
```

### Node process

When I run a Node.js program, Node creates a process for that program.

### `process`

Node.js provides the `process` object to interact with information about the running process.

### `process.argv`

```javascript
process.argv
```

contains command-line arguments passed to the Node.js program.

---

# 11. The Mental Model

For now, I can think about running a Node.js program like this:

```text
I write JavaScript
       ↓
    app.js
       ↓
I run: node app.js
       ↓
    Node.js
       ↓
Starts a process
       ↓
Loads my file
       ↓
Executes my JavaScript
       ↓
Program finishes
```

If I pass arguments:

```text
node app.js Vivek NodeJS
              │      │
              ↓      ↓
         process.argv
```

This is the basic foundation for understanding how Node.js programs are executed.

---

# Practice

Create an `app.js` that accepts three command-line arguments:

```bash
node app.js Vivek JavaScript Backend
```

and prints:

```text
Name: Vivek
Language: JavaScript
Goal: Backend
```

Try to solve it using only:

```javascript
process.argv
```

Don't worry about making it fancy. The goal is to become comfortable with how data enters a Node.js program from the terminal.

---

# Summary

In this lesson, I learned how to actually run Node.js programs.

The main things I learned are:

```text
node -v
node app.js
process
process.argv
```

The most important idea is:

> **When I run `node app.js`, Node.js starts a process, loads my JavaScript file, and executes the code inside it.**

Next, I'll start understanding **how Node.js organizes JavaScript code using modules**.
