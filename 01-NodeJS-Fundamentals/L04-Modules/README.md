# L04 — Modules

## What Am I Trying to Understand?

Until now, most of my code has been inside one file.

That works for small programs, but imagine building a backend with:

* Users
* Authentication
* Products
* Orders
* Payments
* Database
* Validation
* Utilities

Putting everything inside `app.js` would eventually become difficult to manage.

So I need a way to **split my code into multiple files** and then use that code wherever I need it.

That's what **modules** are for.

In this lesson, I will understand:

* Why modules are needed
* What a module actually is
* How Node.js works with modules
* CommonJS modules
* `module.exports`
* `require()`
* ES Modules
* `export`
* `import`
* Named exports
* Default exports
* CommonJS vs ES Modules
* How modules will be used later in Express

---

# 1. Why Do I Need Modules?

Suppose I have this:

```js
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

console.log(add(10, 5));
console.log(subtract(10, 5));
console.log(multiply(10, 5));
console.log(divide(10, 5));
```

It's perfectly fine for a small example.

But imagine this file becomes **2,000 lines long**.

I might have:

```text
app.js
│
├── User logic
├── Authentication logic
├── Product logic
├── Order logic
├── Database logic
├── Validation logic
└── Utility functions
```

That's where things start getting messy.

Instead, I can separate them:

```text
project/
│
├── app.js
├── math.js
├── users.js
├── products.js
└── database.js
```

Now each file has a specific responsibility.

This makes the application:

* Easier to understand
* Easier to maintain
* Easier to debug
* Easier to reuse
* Easier to scale

---

# 2. What Is a Module?

A **module is a separate file containing code that can be used by other files.**

For example:

```text
math.js
   ↓
contains mathematical functions

app.js
   ↓
uses those functions
```

The basic relationship is:

```text
        math.js
           │
           │ export
           ↓
        app.js
           │
           │ import
           ↓
      uses the code
```

So modules give me a way to:

```text
Split code
    ↓
Organize code
    ↓
Reuse code
```

---

# 3. The Two Module Systems

In Node.js, I will mainly encounter two module systems:

1. **CommonJS**
2. **ES Modules**

They solve the same basic problem:

> How can I share code between different files?

But their syntax is different.

### CommonJS

Uses:

```js
module.exports
```

to export code.

And:

```js
require()
```

to import code.

### ES Modules

Uses:

```js
export
```

to export code.

And:

```js
import
```

to import code.

I should understand both because I will encounter both in real projects.

For modern Node.js development, I will mainly use **ES Modules**.

---

# 4. CommonJS Modules

CommonJS is the older module system commonly associated with Node.js.

It uses:

```js
module.exports
```

to export code.

And:

```js
require()
```

to import code.

Let's build a complete example.

---

## 4.1 Project Structure

Create:

```text
L04-Modules/
│
├── app.js
└── math.js
```

---

## 4.2 Create `math.js`

```js
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

module.exports = {
    add,
    subtract,
    multiply,
    divide
};
```

Here I created four functions.

At the bottom:

```js
module.exports = {
    add,
    subtract,
    multiply,
    divide
};
```

means:

> "These are the things I want other files to be able to use."

---

## 4.3 Importing the Module

Now inside `app.js`:

```js
const math = require("./math");

console.log(math.add(10, 5));
console.log(math.subtract(10, 5));
console.log(math.multiply(10, 5));
console.log(math.divide(10, 5));
```

Run:

```bash
node app.js
```

Output:

```text
15
5
50
2
```

---

# 5. What Actually Happened?

This is the important part.

We had:

### `math.js`

Containing:

```js
function add(a, b) {
    return a + b;
}
```

And:

```js
module.exports = {
    add
};
```

Then in `app.js`:

```js
const math = require("./math");
```

So the exported object from `math.js` becomes available inside `app.js`.

Conceptually:

```text
math.js

add()
subtract()
multiply()
divide()
      │
      │ module.exports
      ↓
exported object
      │
      │ require("./math")
      ↓
app.js

math.add()
math.subtract()
math.multiply()
math.divide()
```

That's the core idea of CommonJS.

---

# 6. Why Do We Use `./`?

Look at:

```js
require("./math");
```

The:

```text
./
```

means:

> Look in the current directory.

Our structure is:

```text
L04-Modules/
│
├── app.js
└── math.js
```

So:

```js
require("./math");
```

points to:

```text
math.js
```

### What if the file is inside a folder?

Suppose the structure is:

```text
L04-Modules/
│
├── app.js
└── utils/
    └── math.js
```

Then I would write:

```js
require("./utils/math");
```

The `./` tells Node.js that I'm referring to a **relative path**.

---

# 7. Exporting a Single Value

I don't always have to export an object.

For example, `math.js` could contain:

```js
function add(a, b) {
    return a + b;
}

module.exports = add;
```

Then `app.js`:

```js
const add = require("./math");

console.log(add(10, 5));
```

Output:

```text
15
```

Here:

```js
module.exports = add;
```

means that the value returned by:

```js
require("./math")
```

is directly the `add` function.

So I can call:

```js
add(10, 5);
```

instead of:

```js
math.add(10, 5);
```

---

# 8. ES Modules

Now let's look at the modern JavaScript module system.

ES Modules use:

```js
export
```

and:

```js
import
```

The same calculator example can be written using ES Modules.

---

# 9. ES Modules Project

Create:

```text
L04-Modules/
│
├── package.json
├── app.js
└── math.js
```

In `package.json`:

```json
{
    "type": "module"
}
```

This tells Node.js:

> Treat `.js` files in this project as ES Modules.

---

# 10. Exporting with ES Modules

Inside `math.js`:

```js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    return a / b;
}
```

Here I'm using **named exports**.

I am saying:

```text
Export:
    add
    subtract
    multiply
    divide
```

---

# 11. Importing Named Exports

Now `app.js`:

```js
import {
    add,
    subtract,
    multiply,
    divide
} from "./math.js";

console.log(add(10, 5));
console.log(subtract(10, 5));
console.log(multiply(10, 5));
console.log(divide(10, 5));
```

Run:

```bash
node app.js
```

Output:

```text
15
5
50
2
```

Notice something important.

With ES Modules, I normally include:

```js
"./math.js"
```

rather than:

```js
"./math"
```

So the file extension is normally written explicitly for local ES Module imports.

---

# 12. Understanding Named Exports

When I write:

```js
export function add(a, b) {
    return a + b;
}
```

I'm exporting `add` **by its name**.

Therefore I can import it like this:

```js
import { add } from "./math.js";
```

If I want multiple functions:

```js
import {
    add,
    subtract
} from "./math.js";
```

The names must match the exported names.

For example:

```js
export function add() {}
```

can be imported as:

```js
import { add } from "./math.js";
```

---

# 13. Exporting at the Bottom

I can also write the ES Module like this:

```js
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

export {
    add,
    subtract,
    multiply,
    divide
};
```

This does the same thing as:

```js
export function add(a, b) {
    return a + b;
}
```

It's mostly a matter of how I want to organize the file.

---

# 14. Default Export

There is another type of ES Module export called a **default export**.

Suppose `greet.js` contains:

```js
function greet(name) {
    return `Hello ${name}`;
}

export default greet;
```

Now I can import it:

```js
import greet from "./greet.js";

console.log(greet("Vivek"));
```

Output:

```text
Hello Vivek
```

Notice that I don't use `{ }`.

```js
import greet from "./greet.js";
```

Compare this with a named export:

```js
import { add } from "./math.js";
```

---

# 15. Named Export vs Default Export

## Named Export

```js
export function add(a, b) {
    return a + b;
}
```

Import:

```js
import { add } from "./math.js";
```

The name matters.

If I exported:

```js
export function add() {}
```

then I normally import:

```js
import { add } from "./math.js";
```

---

## Default Export

```js
export default add;
```

Import:

```js
import add from "./math.js";
```

With a default export, the name used during import can be chosen by me.

For example:

```js
import addition from "./math.js";
```

This can still refer to the same default export.

### Easy way to remember

```text
Named Export
    ↓
import { sameName }

Default Export
    ↓
import anyName
```

---

# 16. CommonJS vs ES Modules

Now I can compare the complete examples.

## CommonJS

### `math.js`

```js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = {
    add,
    subtract
};
```

### `app.js`

```js
const math = require("./math");

console.log(math.add(10, 5));
console.log(math.subtract(10, 5));
```

---

## ES Modules

### `math.js`

```js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

### `app.js`

```js
import {
    add,
    subtract
} from "./math.js";

console.log(add(10, 5));
console.log(subtract(10, 5));
```

The result is the same:

```text
15
5
```

The difference is mainly the module syntax and how Node.js interprets the files.

---

# 17. CommonJS vs ES Modules — Quick Comparison

| Feature              | CommonJS                    | ES Modules                 |
| -------------------- | --------------------------- | -------------------------- |
| Import               | `require()`                 | `import`                   |
| Export               | `module.exports`            | `export`                   |
| Typical import       | `const x = require(...)`    | `import x from ...`        |
| Local file extension | Often omitted               | Usually included           |
| History              | Older Node.js module system | Modern JavaScript standard |
| Common usage         | Older Node.js projects      | Modern Node.js projects    |

The easiest way to remember it:

### CommonJS

```text
Export → module.exports
Import → require()
```

### ES Modules

```text
Export → export
Import → import
```

---

# 18. Modules in a Real Backend

This is where modules become really useful.

Imagine I'm building an Express application.

I don't want:

```text
app.js
│
├── User routes
├── Product routes
├── Authentication
├── Database connection
├── Validation
├── Error handling
├── Business logic
└── Everything else
```

Instead:

```text
src/
│
├── app.js
│
├── routes/
│   ├── userRoutes.js
│   └── productRoutes.js
│
├── controllers/
│   ├── userController.js
│   └── productController.js
│
├── services/
│   └── userService.js
│
├── models/
│   └── userModel.js
│
└── utils/
    └── validation.js
```

For example:

```text
userRoutes.js
      ↓
userController.js
      ↓
userService.js
      ↓
userModel.js
      ↓
MongoDB
```

Each file has a job.

This is the direction I'll eventually take when I start building proper Express backends.

---

# 19. A Simple Mental Model

Think of every module as a **small box**.

```text
┌─────────────────┐
│     math.js     │
│                 │
│   add()         │
│   subtract()    │
│   multiply()    │
└────────┬────────┘
         │
       export
         ↓
┌─────────────────┐
│     app.js      │
│                 │
│     import      │
│                 │
│     use code    │
└─────────────────┘
```

The module decides:

> "This is the code I want other files to use."

The other file says:

> "Give me that code so I can use it."

That's the whole idea.

---

# 20. What I Should Remember

I don't need to memorize every module feature right now.

The core idea is:

> **Modules allow me to split my application into separate files and share code between those files.**

## CommonJS

### Export

```js
module.exports = {
    add,
    subtract
};
```

### Import

```js
const math = require("./math");
```

---

## ES Modules

### Export

```js
export function add(a, b) {
    return a + b;
}
```

### Import

```js
import { add } from "./math.js";
```

---

# Practice

I want to practice **both module systems**.

## Part 1 — CommonJS

Create:

```text
commonjs/
│
├── app.js
└── math.js
```

In `math.js`, create and export:

* `add()`
* `subtract()`
* `multiply()`
* `divide()`

Then import them into `app.js` using:

```js
require()
```

and:

```js
module.exports
```

---

## Part 2 — ES Modules

Create:

```text
esm/
│
├── package.json
├── app.js
└── math.js
```

`package.json`:

```json
{
    "type": "module"
}
```

Export the same four functions using:

```js
export
```

and import them using:

```js
import
```

---

## Expected Output

Both implementations should produce:

```text
Addition: 15
Subtraction: 5
Multiplication: 50
Division: 2
```

Try writing the code yourself **before looking back at the examples above**.

The important thing isn't just getting the output.

I want to understand this flow:

```text
math.js
   ↓
functions are created
   ↓
functions are exported
   ↓
app.js imports them
   ↓
app.js uses them
```

---

# Summary

In this lesson, I learned how Node.js applications can be divided into multiple modules.

I learned two module systems:

```text
CommonJS
    ↓
module.exports
require()
```

and:

```text
ES Modules
    ↓
export
import
```

I also learned:

* Named exports
* Default exports
* Relative module paths
* Why `./` is used
* Why modules are important for large applications
* How CommonJS and ES Modules differ
* How modules will help me organize Express applications

The main idea I want to remember is:

> **A module is a separate piece of code that can expose functionality for other parts of my application to use.**

As I move into Express, this will become much more practical because I'll start separating:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
Database
```

into their own modules.

---

## Next Lesson

**L05 — npm & package.json**
