# Lesson 08 — File System (`fs`)

## What Am I Learning?

Until now, I already understood how JavaScript works **inside the browser**.

I know that JavaScript itself runs on the **Call Stack**, while the browser provides things like Web APIs to handle asynchronous work.

My browser mental model was:

```text
JavaScript
     ↓
 Call Stack
     ↓
 Web APIs
     ↓
Async operation
     ↓
Task finishes
     ↓
 Queue
     ↓
 Event Loop
     ↓
 Call Stack
```

For example:

```js
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

console.log("End");
```

The browser handles the timer outside the JavaScript engine, and when the timer is ready, its callback becomes eligible to run through the Event Loop.

Now I'm learning **Node.js**, where JavaScript runs outside the browser.

So the question becomes:

> **If there is no browser, then who handles things like files, networking, operating-system operations, etc.?**

That's where Node.js APIs, **libuv**, and the Node.js Event Loop come in.

---

# 1. What Is `fs`?

`fs` stands for:

```text
File System
```

Node.js provides the `fs` module so JavaScript can work with files and directories.

Using `fs`, I can:

```text
Create files
Read files
Write files
Append data
Delete files
Create directories
Read directories
Rename files
Get file information
```

Because `fs` is a **Core Module**, I don't need to install anything with npm.

I can import it using:

```js
import fs from "node:fs";
```

---

# 2. First Understand the Simple Version — Synchronous

Before getting into callbacks, Promises, libuv, and the Event Loop, I should first understand what a normal file operation looks like.

Let's write a file:

```js
import fs from "node:fs";

fs.writeFileSync("notes.txt", "Learning Node.js");
```

After running the program:

```text
notes.txt
```

is created.

The important word here is:

```text
Sync
```

which means:

```text
Synchronous
```

---

# 3. What Does Synchronous Mean?

Look at this:

```js
console.log("Start");

fs.writeFileSync("notes.txt", "Hello");

console.log("End");
```

The execution is:

```text
console.log("Start")
        ↓
     Start
        ↓
writeFileSync()
        ↓
 WRITE THE FILE
        ↓
      WAIT
        ↓
 File operation done
        ↓
console.log("End")
        ↓
      End
```

So:

> **Synchronous code waits for the operation to finish before moving to the next line.**

Mental model:

```text
SYNC

Start operation
      ↓
    WAIT
      ↓
Operation finishes
      ↓
Continue JavaScript
```

---

# 4. Basic Synchronous `fs` Methods

Now that I understand what `Sync` means, the basic methods are easy.

## Write a file

```js
fs.writeFileSync("notes.txt", "Learning Node.js");
```

This creates the file if it doesn't exist.

If the file already exists, its content is replaced.

---

## Read a file

```js
const data = fs.readFileSync("notes.txt", "utf-8");

console.log(data);
```

---

## Append to a file

```js
fs.appendFileSync("notes.txt", "\nLearning Express.js");
```

Unlike `writeFileSync()`, this keeps the existing content and adds new content.

---

## Create a directory

```js
fs.mkdirSync("notes");
```

---

## Read a directory

```js
const files = fs.readdirSync(".");

console.log(files);
```

---

## Rename a file

```js
fs.renameSync("old.txt", "new.txt");
```

---

## Delete a file

```js
fs.unlinkSync("notes.txt");
```

---

## Get information about a file

```js
const stats = fs.statSync("notes.txt");

console.log(stats.size);
console.log(stats.isFile());
console.log(stats.isDirectory());
```

---

# 5. But Why Not Always Use `Sync`?

Now imagine Node.js is running a server.

```text
                 Node.js Server
                       │
        ┌──────────────┼──────────────┐
        ↓              ↓              ↓
     User 1          User 2         User 3
```

Suppose User 1 asks the server to read a huge file.

If I use:

```js
fs.readFileSync("huge-file.txt");
```

Node has to wait for that operation to finish before continuing that JavaScript execution.

So the idea becomes:

```text
Request
   ↓
Read huge file
   ↓
WAIT
   ↓
File finishes
   ↓
Continue
```

For a server, unnecessary blocking is bad.

So Node.js also gives us **asynchronous** versions of these APIs.

And THIS is where my previous browser knowledge becomes important.

---

# 6. Connecting Browser JavaScript to Node.js

I already know this browser flow:

```text
                BROWSER

JavaScript
    ↓
Call Stack
    ↓
Web APIs
    ↓
Async operation
    ↓
Operation finishes
    ↓
Queue
    ↓
Event Loop
    ↓
Call Stack
```

Node.js follows the same **big idea**, but the environment is different.

Instead of browser Web APIs:

```text
                NODE.JS

JavaScript
    ↓
Call Stack
    ↓
Node.js APIs
    ↓
libuv / OS
    ↓
Async operation
    ↓
Operation finishes
    ↓
Node Event Loop
    ↓
Call Stack
```

This is the connection I want to remember.

---

# 7. Asynchronous `fs`

Now let's read a file asynchronously.

```js
import fs from "node:fs";

fs.readFile("notes.txt", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log(data);
});
```

The function:

```js
(err, data) => {
    console.log(data);
}
```

is the **callback**.

I'm basically telling Node:

> "Start reading this file. When you're done, run this function."

---

# 8. The Most Important Flow of This Lesson

Let's understand this code:

```js
fs.readFile("notes.txt", "utf-8", callback);
```

The flow is:

```text
                    fs.readFile()
                         ↓
                  Call Stack
                         ↓
                Node.js / libuv
                         ↓
                  File operation
                         ↓
                 File is reading...
                         ↓
             JavaScript DOES NOT WAIT
                         ↓
                Call Stack is free
                         ↓
              File operation finishes
                         ↓
                Callback is ready
                         ↓
                Node Event Loop
                         ↓
                  Callback runs
                         ↓
                    Call Stack
```

This is the **main flow** I need to understand.

---

# 9. Let's Walk Through It Line by Line

Consider:

```js
console.log("1");

fs.readFile("notes.txt", "utf-8", () => {
    console.log("File done");
});

console.log("2");
```

### Step 1

Node executes:

```js
console.log("1");
```

Output:

```text
1
```

---

### Step 2

Node reaches:

```js
fs.readFile(...)
```

The call itself runs on the Call Stack.

Then Node starts the asynchronous file operation.

Conceptually:

```text
Call Stack
    ↓
fs.readFile()
    ↓
Node.js / libuv
    ↓
File operation starts
```

`fs.readFile()` doesn't sit there waiting for the entire file to finish.

It returns control to JavaScript.

---

### Step 3

JavaScript continues.

So this runs:

```js
console.log("2");
```

Output:

```text
2
```

At this point:

```text
1
2
```

have been printed.

Meanwhile:

```text
File operation
      ↓
still happening...
```

---

### Step 4

Eventually the file operation finishes.

```text
File operation
      ↓
     DONE
```

Now Node has the callback:

```js
() => {
    console.log("File done");
}
```

that needs to be executed.

---

### Step 5

The callback becomes ready to be processed by Node's asynchronous/Event Loop machinery.

Eventually:

```text
Node Event Loop
      ↓
Callback can execute
      ↓
Call Stack
```

Then:

```js
console.log("File done");
```

runs.

Final output:

```text
1
2
File done
```

---

# 10. VERY IMPORTANT — Where Does the Finished File Operation Go?

This is where my browser knowledge can cause confusion.

For a browser timer:

```js
setTimeout(callback, 0);
```

I learned the simplified model:

```text
setTimeout()
    ↓
Web API
    ↓
Timer finishes
    ↓
Macrotask / Task Queue
    ↓
Event Loop
    ↓
Call Stack
```

So it is tempting to think:

```text
fs.readFile()
    ↓
File finishes
    ↓
Macrotask Queue
```

But **Node.js should not be visualized that way.**

---

# 11. Node.js Does Not Have One Giant "Macrotask Queue"

Node.js has an Event Loop with different **phases**.

A simplified view is:

```text
                 NODE EVENT LOOP

                    Timers
                       ↓
               Pending Callbacks
                       ↓
                     Poll
                       ↓
                    Check
                       ↓
               Close Callbacks
                       ↓
                    repeat
```

The **Poll phase** is especially important when thinking about I/O.

So for a filesystem operation, a better mental model is:

```text
fs.readFile()
      ↓
Node.js / libuv
      ↓
File operation
      ↓
File finishes
      ↓
I/O callback becomes ready
      ↓
Event Loop / I/O processing
      ↓
Callback executes
```

So I should NOT think:

```text
File finishes
      ↓
Macrotask Queue
```

Instead:

```text
File finishes
      ↓
I/O callback becomes ready
      ↓
Node Event Loop handles it
      ↓
Callback executes
```

---

# 12. Then Where Is the Queue?

There **are** internal queues and scheduling mechanisms inside Node.js.

But Node isn't accurately described as:

```text
ONE QUEUE

┌───────────────────────┐
│ timer callback        │
│ fs callback           │
│ network callback      │
│ everything else       │
└───────────────────────┘
```

Instead, Node organizes asynchronous work around its **Event Loop phases** and associated internal structures.

For learning purposes, think:

```text
                 Node.js Event Loop

        ┌──────────────────────────┐
        │ Timers                   │
        │                          │
        │ Pending callbacks        │
        │                          │
        │ Poll  ← I/O callbacks    │
        │                          │
        │ Check                    │
        │                          │
        │ Close callbacks          │
        └──────────────────────────┘
```

This is more accurate than forcing everything into the browser's "macrotask queue" model.

---

# 13. Where Does `setTimeout()` Fit in Node?

Node also has:

```js
setTimeout(() => {
    console.log("Timer");
}, 0);
```

Its callback is associated with the **Timers phase** of the Node Event Loop.

So:

```text
setTimeout()
     ↓
Timer becomes ready
     ↓
Timers phase
     ↓
Callback
```

Whereas:

```text
fs.readFile()
     ↓
File I/O
     ↓
I/O completes
     ↓
Poll / I/O processing
     ↓
Callback
```

This is why:

```text
setTimeout callback
```

and:

```text
fs callback
```

should not both simply be called "macrotasks" when I'm trying to understand Node internals.

---

# 14. Now Let's Bring Promises Into the Picture

I already learned about Promises in JavaScript.

For example:

```js
Promise.resolve().then(() => {
    console.log("Promise");
});
```

The `.then()` callback goes into the **Microtask Queue**.

So:

```text
Promise settles
      ↓
Microtask
      ↓
JavaScript executes it
```

This part of my browser knowledge still applies.

---

# 15. Node Has `process.nextTick()`

Node also has:

```js
process.nextTick(() => {
    console.log("nextTick");
});
```

Node gives `process.nextTick()` special treatment.

A simplified mental model is:

```text
Synchronous JavaScript
        ↓
process.nextTick()
        ↓
Promise Microtasks
        ↓
Event Loop phases
```

Example:

```js
console.log("Start");

process.nextTick(() => {
    console.log("nextTick");
});

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

Output:

```text
Start
End
nextTick
Promise
```

I don't need to memorize every internal detail yet.

I just need to remember:

```text
process.nextTick()
→ Node-specific special queue

Promise.then()
→ Microtask
```

---

# 16. `fs` + Promise-Based API

Callbacks work, but Node also provides a Promise-based version of `fs`.

Instead of:

```js
import fs from "node:fs";
```

I can use:

```js
import fs from "node:fs/promises";
```

Now:

```js
const data = await fs.readFile("notes.txt", "utf-8");

console.log(data);
```

This is much cleaner when using:

```text
async/await
```

---

# 17. What Actually Happens With `await`?

This:

```js
const data = await fs.readFile("notes.txt", "utf-8");
```

does NOT mean:

```text
STOP THE ENTIRE NODE.JS PROCESS
```

Instead:

```text
async function starts
        ↓
await fs.readFile()
        ↓
async function pauses
        ↓
file operation continues
        ↓
Node can handle other work
        ↓
file finishes
        ↓
Promise settles
        ↓
continuation is scheduled as a microtask
        ↓
async function continues
```

So:

> **`await` pauses the current async function, not the entire Node.js process.**

---

# 18. The Complete `fs` + Event Loop Picture

Now I can combine everything.

```text
                         NODE.JS
                            │
                            ▼
                    JavaScript / V8
                            │
                            ▼
                      Call Stack
                            │
                            ▼
                      fs.readFile()
                            │
                            ▼
                  Node.js / libuv
                            │
                            ▼
                    File operation
                            │
                            ▼
                    File is reading
                            │
                            │
                  JavaScript continues
                            │
                            ▼
                       Call Stack
                            │
                            ▼
                     Other JS code
                            │
                            │
                  File finishes later
                            │
                            ▼
                  I/O callback ready
                            │
                            ▼
                  Node Event Loop
                            │
                            ▼
                     Poll / I/O
                            │
                            ▼
                      Call Stack
                            │
                            ▼
                    fs callback runs
```

And for a Promise:

```text
                 fs Promise operation
                         ↓
                  File operation
                         ↓
                   Promise settles
                         ↓
                  Microtask Queue
                         ↓
                    Call Stack
                         ↓
                  JS continues
```

---

# 19. Browser vs Node — Final Comparison

This is the connection I want to keep in my head.

### Browser

```text
                BROWSER

             JavaScript
                  ↓
             Call Stack
                  ↓
              Web APIs
                  ↓
           Async operation
                  ↓
          Operation finishes
                  ↓
          Task / Microtask Queue
                  ↓
             Event Loop
                  ↓
             Call Stack
```

### Node.js

```text
                NODE.JS

             JavaScript
                  ↓
             Call Stack
                  ↓
           Node.js APIs
                  ↓
            libuv / OS
                  ↓
           Async operation
                  ↓
          Operation finishes
                  ↓
        Node Event Loop phases
                  ↓
             Call Stack
```

The **JavaScript execution model is still familiar**.

The environment around it is what changes.

---

# 20. Buffers

When reading a file without specifying an encoding:

```js
const data = fs.readFileSync("notes.txt");

console.log(data);
```

Node gives me a:

```text
Buffer
```

Example:

```text
<Buffer 48 65 6c 6c 6f>
```

A Buffer represents raw binary data.

Think:

```text
File
 ↓
Bytes
 ↓
Buffer
```

When I use:

```js
"utf-8"
```

Node decodes those bytes into a string.

```text
File
 ↓
Bytes
 ↓
UTF-8 decoding
 ↓
String
```

Buffers are especially useful when working with:

```text
Images
Audio
Videos
Files
Network data
Streams
```

---

# 21. The `fs` Methods I Should Know

At this point, I should know these common methods:

| Method             | Purpose                         |
| ------------------ | ------------------------------- |
| `writeFileSync()`  | Write a file synchronously      |
| `readFileSync()`   | Read a file synchronously       |
| `appendFileSync()` | Append data synchronously       |
| `mkdirSync()`      | Create a directory              |
| `readdirSync()`    | Read directory contents         |
| `renameSync()`     | Rename a file/directory         |
| `unlinkSync()`     | Delete a file                   |
| `statSync()`       | Get file information            |
| `accessSync()`     | Check accessibility             |
| `writeFile()`      | Write asynchronously            |
| `readFile()`       | Read asynchronously             |
| `appendFile()`     | Append asynchronously           |
| `mkdir()`          | Create directory asynchronously |
| `readdir()`        | Read directory asynchronously   |
| `rename()`         | Rename asynchronously           |
| `unlink()`         | Delete asynchronously           |

The most important distinction is:

```text
Sync methods
→ block / wait

Async methods
→ don't block the JavaScript execution while the I/O work is happening
```

---

# 22. My Final Mental Model

If I get confused about `fs`, I should return to this:

```text
                 I CALL fs.readFile()
                           │
                           ▼
                    Call Stack
                           │
                           ▼
                   Node.js / libuv
                           │
                           ▼
                   File operation
                           │
                           ▼
                  JavaScript continues
                           │
                           ▼
                    Call Stack
                      becomes free
                           │
                           │
                   File finishes
                           │
                           ▼
                 I/O callback ready
                           │
                           ▼
                 Node Event Loop
                           │
                           ▼
                  I/O processing
                           │
                           ▼
                     Call Stack
                           │
                           ▼
                   Callback executes
```

For Promises:

```text
Promise settles
      ↓
Microtask
      ↓
Call Stack
      ↓
JavaScript continues
```

For timers:

```text
setTimeout()
      ↓
Timer becomes ready
      ↓
Timers phase
      ↓
Callback executes
```

---

# 23. The One Thing I Must Not Mix Up

### Browser simplification

```text
setTimeout()
    ↓
Macrotask Queue
    ↓
Event Loop
    ↓
Call Stack
```

### Node.js filesystem

```text
fs.readFile()
    ↓
libuv / OS
    ↓
File operation
    ↓
I/O completes
    ↓
Node Event Loop / I/O processing
    ↓
Call Stack
```

So when I ask:

> **"Where does the completed file operation go?"**

The answer is:

> **It doesn't simply get thrown into one generic Macrotask Queue. The completed filesystem I/O becomes ready for Node's asynchronous I/O processing, and the Node.js Event Loop coordinates when its callback can execute on the JavaScript Call Stack.**

That's the mental model I want to carry forward.

---

# 24. Practice

I should now practice in this order.

### Part 1 — Synchronous

1. Create a file using `writeFileSync()`
2. Read it using `readFileSync()`
3. Append using `appendFileSync()`
4. Create a directory using `mkdirSync()`
5. Read the directory using `readdirSync()`
6. Rename a file using `renameSync()`
7. Delete a file using `unlinkSync()`

---

### Part 2 — Asynchronous

Rewrite the important operations using:

```js
readFile()
writeFile()
appendFile()
```

and understand the callbacks.

---

### Part 3 — Promises

Use:

```js
import fs from "node:fs/promises";
```

and rewrite the operations using:

```text
async/await
```

---

### Part 4 — Event Loop Practice

Predict the output before running:

```js
console.log("Start");

setTimeout(() => {
    console.log("Timer");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");
```

Expected:

```text
Start
End
Promise
Timer
```

---

### Part 5 — `fs` Flow

Predict the general order:

```js
import fs from "node:fs";

console.log("1");

fs.readFile("notes.txt", "utf-8", () => {
    console.log("File");
});

console.log("2");
```

Expected:

```text
1
2
File
```

Then explain **why** instead of just memorizing the output.

---

# 25. Mini Project — Notes Manager

Build a small Notes Manager.

```text
notes/
├── node.txt
├── express.txt
└── mongodb.txt
```

It should be able to:

```text
Create Note
Read Note
Update Note
Delete Note
List Notes
```

For the final version, use:

```js
import fs from "node:fs/promises";
```

and:

```text
async/await
```

The goal isn't just file manipulation.

The goal is understanding this:

```text
JavaScript
     ↓
Call Stack
     ↓
Node.js fs API
     ↓
libuv / OS
     ↓
File I/O
     ↓
File completes
     ↓
Node Event Loop
     ↓
Callback / Promise continuation
     ↓
Call Stack
     ↓
JavaScript continues
```

---

# What I Learned

I started this lesson already knowing how JavaScript execution works from the **browser perspective**.

Now I've connected that knowledge to Node.js.

I learned:

* What the `fs` module is
* How to create, read, write, append and delete files
* How to work with directories
* The difference between synchronous and asynchronous file operations
* Why synchronous file operations can block
* How callbacks work with asynchronous `fs`
* How Node.js handles filesystem operations
* What libuv does
* What the Thread Pool is
* How completed file I/O gets handled by Node's Event Loop
* Why `fs` callbacks should not simply be thought of as "macrotasks"
* How Node's Event Loop phases differ from the simple browser queue model
* How Promises use the Microtask Queue
* What `process.nextTick()` is
* How `async/await` works with `fs/promises`
* What Buffers are
* How the browser and Node.js runtime models connect

---

# Final Takeaway

I already knew:

```text
Browser

JavaScript
    ↓
Call Stack
    ↓
Web APIs
    ↓
Queues
    ↓
Event Loop
    ↓
Call Stack
```

Now I can extend that knowledge to Node.js:

```text
Node.js

JavaScript
    ↓
Call Stack
    ↓
Node.js APIs
    ↓
libuv / OS
    ↓
Async operation
    ↓
Operation completes
    ↓
Node Event Loop
    ↓
Call Stack
```

And the most important example is:

```text
fs.readFile()
      ↓
Node starts file operation
      ↓
JavaScript doesn't wait
      ↓
File is read outside the JS execution
      ↓
File operation finishes
      ↓
I/O callback becomes ready
      ↓
Node Event Loop processes it
      ↓
Callback runs on the Call Stack
```

While Promises have their own path:

```text
Promise settles
      ↓
Microtask Queue
      ↓
Call Stack
      ↓
JavaScript continues
```

So I don't need to forget everything I learned about JavaScript in the browser.

**I'm taking the same JavaScript execution knowledge and learning what changes when the runtime is Node.js.**
