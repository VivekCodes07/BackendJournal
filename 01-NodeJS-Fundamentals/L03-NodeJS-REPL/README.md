# Lesson 03 — Node.js REPL

## What Am I Trying to Understand?

In the previous lesson, I learned how to run a JavaScript file using:

```bash
node app.js
```

But sometimes I don't want to create a file just to test a small piece of JavaScript.

For example, I might simply want to check:

```javascript
2 + 3
```

or:

```javascript
"Hello".toUpperCase()
```

Node.js gives me a way to do this directly from the terminal.

It is called the **REPL**.

In this lesson, I will learn:

* What the Node.js REPL is
* How to start it
* How to execute JavaScript inside it
* How variables work inside the REPL
* How to use Node.js features inside the REPL
* How to exit the REPL
* When the REPL is useful

---

# 1. What is REPL?

REPL stands for:

```text
Read
Evaluate
Print
Loop
```

These four words describe exactly what the REPL does.

```text
Read
  ↓
Read what I type

Evaluate
  ↓
Execute it

Print
  ↓
Show the result

Loop
  ↓
Wait for the next command
```

Then the process repeats.

---

# 2. Starting the Node.js REPL

Open the terminal and simply type:

```bash
node
```

You should see something similar to:

```text
Welcome to Node.js v24.x.x.
Type ".help" for more information.
>
```

The `>` means Node.js is waiting for JavaScript code.

I am now inside the Node.js REPL.

---

# 3. Running JavaScript in the REPL

I can directly write JavaScript:

```javascript
> 10 + 20
30
```

Node reads my input:

```text
10 + 20
```

evaluates it:

```text
30
```

and prints the result.

Then it waits again:

```text
>
```

That's the **Read → Evaluate → Print → Loop** process.

---

# 4. Trying Different Expressions

I can use normal JavaScript expressions.

```javascript
> 10 * 5
50
```

```javascript
> "Hello " + "Vivek"
'Hello Vivek'
```

```javascript
> 20 > 10
true
```

```javascript
> [1, 2, 3].length
3
```

The REPL is simply executing JavaScript and showing me the result immediately.

---

# 5. Creating Variables

I can also create variables:

```javascript
> const name = "Vivek"
```

The REPL doesn't print anything because the variable was created successfully.

Now I can use it:

```javascript
> name
'Vivek'
```

I can also do:

```javascript
> const age = 20
> age + 5
25
```

The important thing is that the REPL keeps running, so the variables remain available while I stay inside that REPL session.

---

# 6. Using Node.js Features

The REPL isn't limited to basic JavaScript.

I can also access things provided by Node.js.

For example:

```javascript
> process.version
'v24.x.x'
```

I can check the platform:

```javascript
> process.platform
'win32'
```

I can also use Node's built-in modules.

For example:

```javascript
> const path = require("node:path")
```

Then:

```javascript
> path.basename("/users/vivek/app.js")
'app.js'
```

This gives me a quick way to experiment with Node.js APIs.

---

# 7. REPL Commands

The REPL also has some special commands.

These aren't normal JavaScript.

For example:

```text
.help
```

shows available REPL commands.

```text
.exit
```

exits the REPL.

I can also press:

```text
Ctrl + C
```

to interrupt the current input.

Pressing `Ctrl + C` twice can exit the REPL.

---

# 8. REPL vs JavaScript File

There are two different ways I can run JavaScript.

### REPL

```bash
node
```

Then:

```javascript
> 10 + 20
30
```

This is useful for quick experiments.

### JavaScript File

```bash
node app.js
```

This runs the code stored inside `app.js`.

For example:

```javascript
console.log("Hello from Node.js");
```

The difference is:

```text
REPL
→ Quick experiments

JavaScript file
→ Actual programs
```

---

# 9. When Should I Use the REPL?

The REPL is useful when I want to quickly test something.

For example, I might wonder:

> "What does this JavaScript method return?"

Instead of creating a file, I can simply try:

```javascript
> "nodejs".toUpperCase()
'NODEJS'
```

Or I might want to check a Node.js API:

```javascript
> process.version
'v24.x.x'
```

Or experiment with an array:

```javascript
> [10, 20, 30].map(n => n * 2)
[ 20, 40, 60 ]
```

This makes the REPL a small **JavaScript playground inside the terminal**.

---

# 10. The Important Mental Model

I can think about the REPL like this:

```text
             node
              ↓
        Start Node.js REPL
              ↓
              >
              ↓
        I type JavaScript
              ↓
            Read
              ↓
          Evaluate
              ↓
           Print
              ↓
            Loop
              ↓
              >
```

It keeps repeating until I exit.

---

# 11. One Important Difference

The REPL is temporary.

If I start:

```bash
node
```

and create:

```javascript
> const name = "Vivek"
```

the variable exists during that REPL session.

If I exit:

```text
.exit
```

and start Node again:

```bash
node
```

the previous variable is gone.

That's because I started a new process and therefore a new REPL session.

If I want something to be saved permanently, I put it inside a JavaScript file.

---

# 12. What I Should Remember

### REPL

```text
Read
Evaluate
Print
Loop
```

### Start it

```bash
node
```

### Exit it

```text
.exit
```

### Use it for

```text
Quick experiments
Testing JavaScript
Testing Node.js APIs
Checking small expressions
```

### Use `.js` files for

```text
Actual programs
Projects
Reusable code
Backend applications
```

---

# Practice

Start the Node.js REPL:

```bash
node
```

Then try these yourself:

```javascript
10 + 20
```

```javascript
const name = "Vivek"
```

```javascript
name
```

```javascript
name.toUpperCase()
```

```javascript
[1, 2, 3, 4, 5].map(n => n * 2)
```

Then check:

```javascript
process.version
```

and:

```javascript
process.platform
```

Finally, exit using:

```text
.exit
```

The goal isn't to memorize REPL commands. I just want to become comfortable with the idea that **Node.js can execute JavaScript interactively without needing a `.js` file**.

---

# Summary

In this lesson, I learned that the Node.js REPL is an interactive environment for running JavaScript directly from the terminal.

The basic flow is:

```text
Read
 ↓
Evaluate
 ↓
Print
 ↓
Loop
```

I can start it with:

```bash
node
```

and exit it with:

```text
.exit
```

The REPL is especially useful for quickly experimenting with JavaScript and Node.js APIs.

**Next Lesson:** `L04 — Modules`
