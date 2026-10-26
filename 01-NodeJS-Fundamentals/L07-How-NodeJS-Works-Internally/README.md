# Lesson 02 — How Node.js Works Internally

## Why Am I Learning This?

In the previous lesson, I learned what Node.js is and why developers use it to build backend applications.

But I still have an important question: **how does Node.js actually run my JavaScript and handle work in the background?**

For example, imagine I am building a school management application. A student requests their attendance record, and my backend needs to fetch it from a database.

While the database is processing that request, other students might be logging in, teachers might be checking attendance, and administrators might be updating student details.

If my server had to stop everything and wait for every operation to finish, handling multiple requests efficiently would become difficult.

Node.js has a way to manage this kind of work. To understand it properly, I need to look beyond the JavaScript code I write and understand what happens inside the runtime.

That is what I am going to learn in this lesson.

## What Am I Going to Learn?

I will follow this progression so that every concept builds on the previous one.

1. **The problem Node.js solves:** Why a backend needs to handle multiple operations without unnecessarily waiting.
2. **The big picture:** What components make up the Node.js runtime and how they fit together.
3. **V8 and JavaScript execution:** How my JavaScript code actually runs.
4. **Node.js APIs:** How JavaScript gets access to files, networking, and other capabilities outside the core language.
5. **libuv and asynchronous operations:** How Node.js coordinates asynchronous work and why not every operation needs a separate JavaScript thread.
6. **The event loop:** How completed operations lead to callbacks being executed.
7. **The complete flow:** What happens when I read a file using Node.js.
8. **Threads and performance:** What people mean when they say Node.js is single-threaded, and why synchronous CPU-heavy code can block a server.

By the end, I want to be able to explain how Node.js works in my own words instead of just memorizing terms such as V8, libuv, and event loop.

---

## 1. First, Understand the Problem

Before learning the internal components, I want to understand why Node.js needs them.

Imagine a restaurant with one waiter serving several tables.

If the waiter takes an order and then stands in the kitchen waiting for that food to finish cooking, every other customer has to wait too.

A better approach is for the waiter to pass the order to the kitchen, continue serving other tables, and return when the food is ready.

A backend faces a similar problem.

When my application requests information from a database or reads a file, that operation can take time. The application should not have to block its JavaScript thread while waiting for every I/O operation to complete.

This is where Node.js's asynchronous capabilities become useful.

```text
Student A requests attendance
              |
              v
        Backend starts
        database query
              |
              | Waiting for result
              |
              +----> Handle Student B's request
              |
              +----> Handle Student C's request
              |
              v
        Database result arrives
              |
              v
        Send Student A's
        attendance response
```

This is a simplified illustration, not a literal description of every internal step.

The important idea is that **waiting for I/O does not necessarily mean JavaScript must stop doing all other work**.

Now I can ask the next question: which parts of Node.js make this possible?

## 2. The Big Picture — What Is Inside Node.js?

Node.js is more than the V8 engine. It combines a JavaScript engine with runtime APIs and native components that let JavaScript interact with the outside world.

Here is the simplified picture:

```text
              My JavaScript Code
                      |
                      v
             +------------------+
             |    Node.js       |
             |                  |
             |  +------------+  |
             |  |     V8     |  |
             |  | Executes JS|  |
             |  +------------+  |
             |                  |
             |  Node.js APIs    |
             |       |          |
             |     libuv        |
             +--------|---------+
                      |
                      v
             Operating System
                      |
                      v
             Files and Network
```

This is a conceptual diagram. The actual architecture has more connections, and different operations follow different paths.

For now, I want to remember four main pieces:

- **V8** executes JavaScript.
- **Node.js APIs** provide features such as file-system and HTTP operations.
- **libuv** provides the event loop and support for asynchronous operations.
- **The operating system** performs or supports low-level tasks such as file access and network communication.

I will understand these components one at a time, starting with the engine that executes my code.

## 3. V8 — How My JavaScript Runs

Consider this code:

```js
const student = "Rahul";

console.log(student);
```

I write the code in JavaScript, but the computer's processor does not directly execute the source code in the form I wrote it.

Node.js uses **V8**, a JavaScript engine developed by Google, to execute my JavaScript.

V8 parses and executes JavaScript and uses techniques such as just-in-time compilation to improve performance.

But V8 alone is not the complete Node.js runtime.

For example, `const` and `function` belong to JavaScript, while `readFile()` from Node.js's file-system API is a capability provided by the runtime.

That distinction matters because a JavaScript engine and a runtime solve different problems.

```text
JavaScript language
        |
        v
       V8
        |
        v
 Executes my JavaScript

Node.js runtime
        |
        +---- Uses V8
        +---- Provides Node.js APIs
        +---- Integrates native components
              and operating-system facilities
```

**My mental model:** V8 is the engine that executes my JavaScript. Node.js provides the larger environment in which that JavaScript can perform backend work.

However, executing JavaScript is only one part of a backend application. I also need to read files, create servers, and communicate over networks.

That brings me to Node.js APIs.

## 4. Node.js APIs — Giving JavaScript More Capabilities

Suppose my school management application stores some information in a file called `students.txt`.

I can read it using Node.js:

```js
import { readFile } from "node:fs";

readFile("./students.txt", "utf8", (error, data) => {
    if (error) {
        console.error(error.message);
        return;
    }

    console.log(data);
});
```

Here, `readFile()` is provided by Node.js's file-system API. It is not a core JavaScript language feature.

Node.js provides APIs for working with files, paths, HTTP servers, processes, and more.

These APIs connect the JavaScript I write to functionality implemented by Node.js and its underlying native components.

But notice something interesting about the example: I start reading the file and provide a callback to handle the result.

How does Node.js arrange for the file operation to happen without blocking my JavaScript until the read finishes?

To understand that, I need to learn about libuv.

## 5. libuv — Coordinating Asynchronous Work

Node.js uses **libuv**, a native library that provides its event loop, cross-platform asynchronous I/O support, and a worker pool for certain operations.

The worker pool is important, but I should not assume that every asynchronous operation runs on a worker thread.

For example, many network operations use operating-system facilities, while certain file-system operations use libuv's worker pool.

The exact mechanism depends on the operation.

A simplified file-reading flow looks like this:

```text
My JavaScript
     |
     v
Node.js file-system API
     |
     v
Native implementation / libuv
     |
     v
File read takes place
     |
     v
Operation completes
     |
     v
Callback is scheduled
     |
     v
JavaScript handles the result
```

The diagram skips internal details, but it shows the relationship between my JavaScript and the work happening underneath it.

I do not need to manage the worker pool manually when using the ordinary `readFile()` API. Node.js handles the underlying coordination for me.

Now I understand that libuv helps coordinate asynchronous operations. But what happens when an operation completes and its callback is ready?

That leads to the event loop.

## 6. The Event Loop — When Does My Callback Run?

I have already studied callbacks, Promises, and `async/await`. Here, I want to connect that knowledge to Node.js's internals.

Consider this example:

```js
import { readFile } from "node:fs";

console.log("1. Start");

readFile("./students.txt", "utf8", (error, data) => {
    if (error) {
        console.error(error.message);
        return;
    }

    console.log("3. File read completed");
});

console.log("2. Continue executing");
```

Assuming the program runs normally, the expected ordering is:

```text
1. Start
2. Continue executing
3. File read completed
```

Why?

1. JavaScript executes the first `console.log()`.
2. Node.js starts the asynchronous file read.
3. JavaScript continues to the next statement without waiting for the file read to finish.
4. When the operation completes, Node.js arranges for the callback to run.
5. The callback executes when the JavaScript thread is available to process it.

The event loop is part of the machinery that coordinates this asynchronous work.

It does not mean that callbacks execute simultaneously with ordinary JavaScript on the same thread. JavaScript execution on the main thread still happens one piece of work at a time.

I also need to remember that the event loop is not responsible for making every operation asynchronous. The API and underlying implementation determine how the work is performed.

## 7. Put the Pieces Together — What Actually Happens?

Now I can connect everything I have learned.

Imagine a student requests an attendance record from my backend.

```text
Student sends HTTP request
            |
            v
Node.js receives the request
            |
            v
JavaScript handler executes
            |
            v
Backend starts database I/O
            |
            v
JavaScript can handle other
ready work while I/O is pending
            |
            v
Database response arrives
            |
            v
Relevant callback or continuation
becomes ready to execute
            |
            v
JavaScript processes the result
            |
            v
Backend sends HTTP response
```

The real flow depends on the database driver and its implementation, but this is the mental model I want for ordinary asynchronous database access.

V8 executes the JavaScript. Node.js APIs expose networking and other capabilities. Native components and the operating system handle or coordinate the underlying work. The event loop helps schedule JavaScript callbacks when they are ready.

These components work together; none of them alone explains the entire behavior.

## 8. Is Node.js Single-Threaded?

I often hear that Node.js is single-threaded, but that statement needs context.

**Ordinary JavaScript execution in Node.js normally happens on one main JavaScript thread. The complete Node.js runtime, however, can use additional threads for certain tasks.**

For example:

- V8 executes my application JavaScript on the main JavaScript thread.
- libuv has a worker pool for certain operations.
- V8 and other runtime components can use additional threads for internal tasks.
- The operating system manages its own threads and I/O facilities.

This is why I should not imagine Node.js creating a new JavaScript thread for every incoming request.

Instead, Node.js can manage many network connections asynchronously and execute their JavaScript handlers as work becomes ready.

This works particularly well for I/O-heavy applications, such as REST APIs that spend time waiting for databases or external services.

But there is an important limitation.

## 9. What If My JavaScript Performs Heavy Work?

Consider this example:

```js
console.log("Calculation started");

let total = 0;

for (let i = 0; i < 5_000_000_000; i++) {
    total += i;
}

console.log("Calculation finished");
```

This loop performs synchronous CPU work. The main JavaScript thread must keep executing the loop before it can move on to the next statement.

While the loop is running, other JavaScript callbacks generally cannot run on that same thread.

In a backend server, this can delay other requests. This is called **blocking the event loop**.

The example uses an enormous loop to illustrate the problem, so I should not run it expecting it to finish quickly.

For CPU-heavy tasks, I might need worker threads, separate worker processes, background jobs, or another suitable architecture.

This teaches me that Node.js is not automatically the best choice for every kind of computation. Its asynchronous I/O model is particularly useful for applications that spend significant time waiting for external operations.

## 10. What Have I Understood?

I can now explain the major pieces without treating them as unrelated definitions:

| Component | What it does |
|---|---|
| V8 | Executes JavaScript |
| Node.js APIs | Expose features such as file access and HTTP servers |
| libuv | Provides the event loop and asynchronous I/O support, including a worker pool for certain operations |
| Operating system | Performs or supports underlying tasks such as file and network I/O |
| Event loop | Coordinates the execution of ready asynchronous callbacks |
| Main JavaScript thread | Executes JavaScript and can be blocked by long-running synchronous work |

The main thing I have learned is that Node.js does not make JavaScript itself magically multithreaded. It combines a JavaScript engine with runtime APIs, native components, and operating-system facilities to make asynchronous backend development possible.

## What Comes Next?

Now that I understand how Node.js works internally, I want to become more comfortable using it directly.
