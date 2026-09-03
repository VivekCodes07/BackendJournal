# Lesson 6 — Node.js Core Modules

## What Am I Learning?

Node.js comes with many **built-in modules** that give me useful functionality without installing anything from npm.

These are called **Core Modules**.

For example, if I want to:

* work with file and folder paths → `path`
* create, read, update or delete files → `fs`
* get information about my computer → `os`
* work with URLs → `url`
* handle events → `events`
* create a web server → `http`

I can use Node's built-in modules instead of building all of this myself.

---

## What Are Core Modules?

Core modules are modules that are already included with Node.js.

I don't need to install them using npm.

Since I'm using **ES Modules**, I'll import them using `import`.

For example:

```js
import os from "node:os";

console.log(os.platform());
```

There is no need to run:

```bash
npm install os
```

because `os` is already part of Node.js.

Some commonly used Core Modules are:

```text
path
fs
os
url
events
http
```

---

# 1. The `path` Module

The `path` module helps me work with **file and folder paths**.

Instead of manually creating paths, I can let Node.js handle them.

```js
import path from "node:path";

const filePath = path.join("users", "vivek", "app.js");

console.log(filePath);
```

Output:

```text
users/vivek/app.js
```

### Useful `path` Methods

#### `path.join()`

Joins multiple parts of a path.

```js
import path from "node:path";

const filePath = path.join("backend", "src", "app.js");

console.log(filePath);
```

---

#### `path.basename()`

Gives me the file name.

```js
const filePath = "/backend/src/app.js";

console.log(path.basename(filePath));
```

Output:

```text
app.js
```

---

#### `path.dirname()`

Gives me the directory part.

```js
console.log(path.dirname(filePath));
```

Output:

```text
/backend/src
```

---

#### `path.extname()`

Gives me the file extension.

```js
console.log(path.extname(filePath));
```

Output:

```text
.js
```

### My Mental Model

```text
/backend/src/app.js
       │       │
       │       └── basename → app.js
       │
       └────────── dirname → /backend/src

extension → .js
```

---

# 2. The `fs` Module

`fs` stands for **File System**.

It allows me to interact with files and folders on my computer.

I can use it to:

```text
Create files
Read files
Write to files
Update files
Delete files
Create folders
```

Example:

```js
import fs from "node:fs";

fs.writeFileSync("message.txt", "Hello from Node.js!");

console.log("File created!");
```

Now Node.js creates:

```text
message.txt
```

with:

```text
Hello from Node.js!
```

---

## Reading a File

```js
import fs from "node:fs";

const data = fs.readFileSync("message.txt", "utf-8");

console.log(data);
```

Output:

```text
Hello from Node.js!
```

---

## Updating a File

```js
fs.appendFileSync("message.txt", "\nLearning Node.js!");
```

Now the file contains:

```text
Hello from Node.js!
Learning Node.js!
```

---

## Deleting a File

```js
fs.unlinkSync("message.txt");

console.log("File deleted!");
```

---

# 3. The `os` Module

The `os` module gives me information about the **operating system and computer** running my Node.js program.

```js
import os from "node:os";

console.log("Platform:", os.platform());
console.log("Architecture:", os.arch());
console.log("Home Directory:", os.homedir());
console.log("Hostname:", os.hostname());
```

Some useful methods are:

```text
os.platform()   → operating system
os.arch()       → CPU architecture
os.cpus()       → CPU information
os.homedir()    → home directory
os.hostname()   → computer hostname
os.totalmem()   → total memory
os.freemem()    → free memory
```

---

# 4. The `url` Module

The `url` module helps me work with URLs.

For example:

```text
https://example.com/products?id=10
```

A URL contains different parts:

```text
https://example.com/products?id=10
   │          │       │       │
protocol    host     path   query
```

Node provides the `URL` class to work with these parts.

```js
const myURL = new URL(
    "https://example.com/products?id=10"
);

console.log(myURL.protocol);
console.log(myURL.hostname);
console.log(myURL.pathname);
console.log(myURL.search);
```

Output:

```text
https:
example.com
/products
?id=10
```

This becomes especially useful when I start working with **HTTP servers and APIs**.

---

# 5. The `events` Module

Node.js is heavily based around **events**.

For example:

```text
Something happens
       ↓
   Event occurs
       ↓
Code responds to it
```

Node provides `EventEmitter` for creating and handling my own events.

```js
import EventEmitter from "node:events";

const emitter = new EventEmitter();

emitter.on("message", () => {
    console.log("Message event received!");
});

emitter.emit("message");
```

Output:

```text
Message event received!
```

Here:

```js
emitter.on()
```

means:

> "When this event happens, run this function."

And:

```js
emitter.emit()
```

means:

> "This event just happened."

I'll go deeper into `EventEmitter` later because it is an important Node.js concept.

---

# 6. The `http` Module

The `http` module allows me to create an **HTTP server** using Node.js.

A very basic server looks like this:

```js
import http from "node:http";

const server = http.createServer((req, res) => {
    res.end("Hello from my server!");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

Now if I open:

```text
http://localhost:3000
```

I'll get:

```text
Hello from my server!
```

This is where Node.js starts becoming really interesting because I'm actually creating a backend server.

I'll explore HTTP and servers properly in a later lesson.

---

# Importing Core Modules with ES Modules

Since I'm using **ES Modules**, I can import Node's built-in modules using `import`.

For example:

```js
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
```

Node also allows:

```js
import { readFile } from "node:fs/promises";
```

The `node:` prefix makes it clear that I'm importing a module provided by Node.js itself.

---

# Core Modules I'll Know

| Module   | What I Use It For                  |
| -------- | ---------------------------------- |
| `path`   | Working with file and folder paths |
| `fs`     | Working with files and folders     |
| `os`     | Getting system information         |
| `url`    | Working with URLs                  |
| `events` | Creating and handling events       |
| `http`   | Creating HTTP servers              |

---

# Why Are These Important for Backend Development?

Before Node.js, I mostly used JavaScript for things happening inside the browser.

Node.js gives JavaScript access to things outside the browser.

For example:

```text
JavaScript
    │
    ↓
Node.js
    │
    ├── Files
    ├── Operating System
    ├── Network
    ├── Servers
    ├── Events
    └── URLs
```

This is one of the main reasons Node.js is useful for backend development.

---

# What I Should Remember

### `path`

Used for working with paths.

```js
path.join()
path.basename()
path.dirname()
path.extname()
```

### `fs`

Used for working with the file system.

```js
fs.readFileSync()
fs.writeFileSync()
fs.appendFileSync()
fs.unlinkSync()
```

### `os`

Used for getting system information.

```js
os.platform()
os.arch()
os.cpus()
os.homedir()
```

### `url`

Used for working with URLs.

```js
new URL(...)
```

### `events`

Used for creating and handling events.

```js
emitter.on()
emitter.emit()
```

### `http`

Used for creating HTTP servers.

```js
http.createServer()
```

---

# Practice

Before moving to the next lesson, I should try these myself.

### Task 1 — `path`

Create a path like:

```text
BackendJournal/L06-Core-Modules/app.js
```

and print:

* complete path
* file name
* directory
* extension

---

### Task 2 — `fs`

Create a file called:

```text
notes.txt
```

Then:

1. Write something into it.
2. Read it.
3. Add another line.
4. Read it again.
5. Delete the file.

---

### Task 3 — `os`

Print:

```text
Operating System
CPU Architecture
Home Directory
Hostname
Free Memory
Total Memory
```

---

### Task 4 — `events`

Create an event called:

```text
login
```

When it happens, print:

```text
User logged in!
```

Then trigger the event yourself.

---

### Task 5 — Mini Challenge

Create a small program that uses at least **three Core Modules**.

For example:

```text
os
 ↓
Get system information

path
 ↓
Create a file path

fs
 ↓
Create/read a file
```

The goal isn't to make something complicated.

I just want to get comfortable using Node's built-in tools.

---

# Final Mental Model

```text
Node.js
   │
   └── Core Modules
          │
          ├── path   → paths
          ├── fs     → files
          ├── os     → system
          ├── url    → URLs
          ├── events → events
          └── http   → servers
```

The main thing I want to understand from this lesson is:

> **Node.js gives me built-in modules that let my JavaScript interact with the computer, files, network and operating system.**
