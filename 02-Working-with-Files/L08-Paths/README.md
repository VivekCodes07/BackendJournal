# Lesson 7 — Node.js `path` Module

## What Am I Learning?

In the previous lesson, I learned that Node.js provides built-in modules called **Core Modules**.

One of them is the `path` module.

The `path` module helps me work with **file and folder paths** without manually dealing with `/` or `\`.

For example:

```text
BackendJournal
    └── L07-Path
        └── app.js
```

Instead of manually writing and combining these paths, I can use Node's `path` module.

---

# Why Do I Need the `path` Module?

Different operating systems use different path separators.

For example:

### Windows

```text
C:\Users\Vivek\BackendJournal\app.js
```

### Linux / macOS

```text
/home/vivek/BackendJournal/app.js
```

If I manually build paths using strings, my code can become platform-dependent.

The `path` module handles this for me.

```js
import path from "node:path";

const filePath = path.join("BackendJournal", "L07-Path", "app.js");

console.log(filePath);
```

Node creates the correct path for the operating system.

---

# Importing the `path` Module

Since I'm using ES Modules:

```js
import path from "node:path";
```

`node:path` tells Node that `path` is one of its built-in modules.

I don't need to install anything with npm.

---

# 1. `path.join()`

`path.join()` combines multiple path segments into one path.

```js
import path from "node:path";

const filePath = path.join("BackendJournal", "L07-Path", "app.js");

console.log(filePath);
```

On Windows, it can produce:

```text
BackendJournal\L07-Path\app.js
```

On Linux/macOS:

```text
BackendJournal/L07-Path/app.js
```

So instead of doing this:

```js
const filePath = "BackendJournal/" + "L07-Path/" + "app.js";
```

I can let `path.join()` handle it.

---

# 2. `path.resolve()`

`path.resolve()` creates an **absolute path**.

```js
import path from "node:path";

const filePath = path.resolve("BackendJournal", "L07-Path", "app.js");

console.log(filePath);
```

I might get something like:

```text
C:\Users\Vivek\BackendJournal\L07-Path\app.js
```

The important difference is:

```text
path.join()
    ↓
Combines path pieces

path.resolve()
    ↓
Creates an absolute path
```

---

# `join()` vs `resolve()`

This is important to understand.

```js
path.join("users", "vivek", "app.js");
```

gives me a path based on the segments I provide.

But:

```js
path.resolve("users", "vivek", "app.js");
```

turns those segments into an absolute path starting from the current working directory.

So:

```text
join()
→ "build a path"

resolve()
→ "give me the absolute location"
```

---

# 3. `path.basename()`

`path.basename()` gives me the **last part of a path**, usually the file name.

```js
import path from "node:path";

const filePath = "/BackendJournal/L07-Path/app.js";

console.log(path.basename(filePath));
```

Output:

```text
app.js
```

Think of it like:

```text
/BackendJournal/L07-Path/app.js
                              ↑
                           basename
```

---

# 4. `path.dirname()`

`path.dirname()` gives me the directory containing the file.

```js
import path from "node:path";

const filePath = "/BackendJournal/L07-Path/app.js";

console.log(path.dirname(filePath));
```

Output:

```text
/BackendJournal/L07-Path
```

Think of it like:

```text
/BackendJournal/L07-Path/app.js
 ↑
 dirname
```

---

# 5. `path.extname()`

`path.extname()` gives me the extension of a file.

```js
import path from "node:path";

const filePath = "/BackendJournal/L07-Path/app.js";

console.log(path.extname(filePath));
```

Output:

```text
.js
```

Another example:

```js
console.log(path.extname("photo.png"));
console.log(path.extname("index.html"));
console.log(path.extname("server.js"));
```

Output:

```text
.png
.html
.js
```

---

# 6. `path.parse()`

`path.parse()` breaks a path into different pieces.

```js
import path from "node:path";

const filePath = "/BackendJournal/L07-Path/app.js";

console.log(path.parse(filePath));
```

The result looks roughly like:

```text
{
    root: "/",
    dir: "/BackendJournal/L07-Path",
    base: "app.js",
    ext: ".js",
    name: "app"
}
```

So one path can be broken into:

```text
path
 │
 ├── root
 ├── dir
 ├── base
 ├── ext
 └── name
```

---

# 7. `path.format()`

`path.format()` does almost the opposite of `path.parse()`.

It takes path information and creates a path from it.

```js
import path from "node:path";

const filePath = path.format({
  dir: "/BackendJournal/L07-Path",
  name: "app",
  ext: ".js",
});

console.log(filePath);
```

Output:

```text
/BackendJournal/L07-Path/app.js
```

So I can remember:

```text
parse()
   ↓
Path → Object

format()
   ↓
Object → Path
```

---

# 8. `path.isAbsolute()`

Sometimes I need to check whether a path is absolute.

```js
import path from "node:path";

console.log(path.isAbsolute("/home/vivek/app.js"));
console.log(path.isAbsolute("app.js"));
```

Output:

```text
true
false
```

So:

```js
path.isAbsolute(path);
```

returns either:

```text
true
```

or:

```text
false
```

---

# 9. `path.sep`

`path.sep` gives me the separator used by the current operating system.

```js
import path from "node:path";

console.log(path.sep);
```

On Windows:

```text
\
```

On Linux/macOS:

```text
/
```

This is another reason I shouldn't hardcode path separators when building paths.

---

# A Practical Example

Let's say my project looks like this:

```text
BackendJournal/
│
├── L07-Path/
│   └── app.js
│
└── notes/
    └── node.txt
```

I want to create the path to `node.txt`.

Instead of manually writing:

```js
const filePath = "BackendJournal/notes/node.txt";
```

I can do:

```js
import path from "node:path";

const filePath = path.join("BackendJournal", "notes", "node.txt");

console.log(filePath);
```

Now I can also inspect that path:

```js
console.log("File:", path.basename(filePath));
console.log("Directory:", path.dirname(filePath));
console.log("Extension:", path.extname(filePath));
```

Output:

```text
File: node.txt
Directory: BackendJournal/notes
Extension: .txt
```

---

# `__dirname` and `__filename`

This is something I need to understand because I'll see it a lot in Node.js code.

In CommonJS, Node automatically provides:

```js
__dirname;
__filename;
```

But I'm using **ES Modules**, so these aren't available directly.

Instead, I can create them using:

```js
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__filename);
console.log(__dirname);
```

Here:

```js
import.meta.url;
```

gives me the URL of the current module.

Then:

```js
fileURLToPath();
```

converts that file URL into a normal file-system path.

Finally:

```js
path.dirname();
```

gives me the directory containing the current file.

I'll use this pattern later when working with files and folders in Node.js applications.

---

# Important Methods

These are the methods I should be comfortable with:

| Method              | What it does                 |
| ------------------- | ---------------------------- |
| `path.join()`       | Combines path segments       |
| `path.resolve()`    | Creates an absolute path     |
| `path.basename()`   | Gets the file name           |
| `path.dirname()`    | Gets the directory           |
| `path.extname()`    | Gets the extension           |
| `path.parse()`      | Breaks a path into parts     |
| `path.format()`     | Creates a path from parts    |
| `path.isAbsolute()` | Checks if a path is absolute |
| `path.sep`          | Gives the OS path separator  |

---

# My Mental Model

If I have:

```text
C:\Users\Vivek\BackendJournal\server.js
```

I can think of it like this:

```text
C:\
 │
 └── Users
      │
      └── Vivek
           │
           └── BackendJournal
                │
                └── server.js
```

And `path` gives me tools to work with this structure.

```text
path.join()
→ Build a path

path.resolve()
→ Get absolute path

path.basename()
→ server.js

path.dirname()
→ ...\BackendJournal

path.extname()
→ .js

path.parse()
→ Break everything apart
```

---

# What I Should Remember

I don't need to memorize every method right now.

The most important ones are:

```js
path.join();
path.resolve();
path.basename();
path.dirname();
path.extname();
path.parse();
```

And the main idea is:

> **The `path` module helps me safely create, inspect and manipulate file and folder paths in a way that works across operating systems.**

---

# Practice

### Task 1 — Build a Path

Create this path using `path.join()`:

```text
BackendJournal
    └── L07-Path
        └── practice
            └── app.js
```

---

### Task 2 — Inspect a Path

Given:

```text
BackendJournal/src/controllers/userController.js
```

Print:

```text
File name
Directory
Extension
```

Expected:

```text
File name: userController.js
Directory: BackendJournal/src/controllers
Extension: .js
```

---

### Task 3 — `parse()`

Use `path.parse()` on:

```text
BackendJournal/src/server.js
```

Try to understand what each returned property means.

---

### Task 4 — `resolve()`

Use `path.resolve()` to create an absolute path to:

```text
data/users.json
```

Print the result.

---

### Task 5 — Mini Challenge

Create a program that takes a file path and prints:

```text
File: ...
Directory: ...
Extension: ...
Is Absolute: ...
```

For example:

```text
File: server.js
Directory: BackendJournal/src
Extension: .js
Is Absolute: false
```

---

# Final Takeaway

```text
Node.js
   │
   └── path
        │
        ├── join()       → combine paths
        ├── resolve()    → absolute path
        ├── basename()   → file name
        ├── dirname()    → directory
        ├── extname()    → extension
        ├── parse()      → break path apart
        └── format()     → build path from parts
```

The goal of this lesson isn't to memorize every method.

I just want to understand **how Node.js lets me work with paths properly instead of treating them as random strings.**
