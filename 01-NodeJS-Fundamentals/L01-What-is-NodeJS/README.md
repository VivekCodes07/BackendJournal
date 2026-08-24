# Lesson 01 — What is Node.js?

## What Am I Trying to Understand?

Before learning Express.js, I need to understand **Node.js itself**.

I already know JavaScript runs inside the browser. Node.js introduces an important idea:

> **JavaScript can also run outside the browser.**

This allows JavaScript to be used for backend development.

In this lesson, I want to understand:

* What Node.js actually is
* Why Node.js was created
* How JavaScript runs outside the browser
* What the V8 JavaScript engine does
* What a runtime environment means
* Node.js vs Browser JavaScript
* Why Node.js is useful for backend development

---

# 1. What is Node.js?

**Node.js is a JavaScript runtime environment that allows JavaScript to run outside the browser.**

A simple way to think about it:

```text
Before Node.js

JavaScript
    ↓
Browser
    ↓
Web Page
```

With Node.js:

```text
JavaScript
    ↓
Node.js
    ↓
Operating System
    ↓
Files / Network / Server / Database
```

This is what makes JavaScript useful for backend development.

---

# 2. But JavaScript Already Existed

JavaScript was originally designed to run inside browsers.

For example:

```javascript
console.log("Hello World");
```

The browser takes this JavaScript and executes it using a JavaScript engine.

Different browsers use different JavaScript engines:

| Browser | JavaScript Engine |
| ------- | ----------------- |
| Chrome  | V8                |
| Edge    | V8                |
| Firefox | SpiderMonkey      |
| Safari  | JavaScriptCore    |

Chrome's **V8 engine** is particularly important because Node.js is built around it.

---

# 3. What is V8?

V8 is a **JavaScript engine developed by Google**.

Its job is to take JavaScript code and execute it.

For example:

```javascript
const name = "Vivek";

console.log(name);
```

The JavaScript engine is responsible for understanding and executing this code.

Conceptually:

```text
JavaScript Code
       ↓
    V8 Engine
       ↓
    Execution
```

But V8 alone isn't Node.js.

That's an important distinction.

---

# 4. V8 vs Node.js

This is one of the most important things to understand.

### V8

V8 is the **JavaScript engine**.

It understands and executes JavaScript.

### Node.js

Node.js provides a **runtime environment** around the JavaScript engine.

It gives JavaScript access to capabilities that aren't normally available to browser JavaScript.

For example:

```javascript
const fs = require("fs");
```

The `fs` module allows Node.js applications to work with files.

Browser JavaScript doesn't normally have unrestricted access to your computer's file system.

So:

```text
              Node.js
                 │
        ┌────────┴────────┐
        ↓                 ↓
      V8              Node APIs
        │                 │
        ↓                 ↓
  Runs JavaScript    Files / Network /
                     OS / Processes
```

This is the basic idea behind Node.js.

---

# 5. What Does "Runtime Environment" Mean?

This term sounds complicated, but the idea is simple.

A **runtime environment** is the environment that provides everything required to execute a program.

For JavaScript:

```text
JavaScript
     ↓
Runtime Environment
     ↓
JavaScript Engine + APIs + Runtime Features
```

The browser is one JavaScript runtime environment.

Node.js is another.

### Browser Runtime

A browser provides things such as:

```javascript
document
window
localStorage
fetch
DOM APIs
```

These allow JavaScript to interact with web pages and browser features.

### Node.js Runtime

Node.js provides things such as:

```javascript
fs
path
http
process
os
events
```

These allow JavaScript to interact with the server environment and operating system.

---

# 6. Browser vs Node.js

This is an important distinction.

| Browser                    | Node.js                         |
| -------------------------- | ------------------------------- |
| Runs JavaScript in browser | Runs JavaScript outside browser |
| DOM available              | No DOM by default               |
| `window` available         | `window` not available          |
| `document` available       | `document` not available        |
| Browser APIs               | Node.js APIs                    |
| Used heavily for frontend  | Used heavily for backend        |
| Can manipulate web pages   | Can create servers              |
| Limited system access      | Provides server/system APIs     |

For example:

```javascript
document.querySelector("h1");
```

works in a browser because the browser provides the DOM.

But Node.js doesn't have a browser DOM by default.

On the other hand:

```javascript
import fs from "node:fs";
```

allows Node.js to work with the file system.

---

# 7. Why Was Node.js Important?

Before Node.js became popular, JavaScript was primarily associated with frontend development.

A typical web application could look like:

```text
Frontend
   ↓
JavaScript
   ↓
Browser
```

Backend development was commonly done using languages such as:

```text
PHP
Java
Python
Ruby
C#
```

Node.js made it possible to use JavaScript on the server as well.

So developers could use:

```text
Frontend
   ↓
JavaScript

Backend
   ↓
JavaScript + Node.js
```

This was a major shift.

---

# 8. Node.js and Backend Development

A backend server has many responsibilities.

For example, suppose we have an e-commerce application.

A user requests:

```text
GET /products
```

The backend might:

```text
Client
   ↓
HTTP Request
   ↓
Node.js Server
   ↓
Express.js
   ↓
MongoDB
   ↓
Data
   ↓
HTTP Response
   ↓
Client
```

Node.js provides the environment in which the server-side JavaScript can run.

Express.js will later make building that server much easier.

---

# 9. What Can Node.js Do?

Node.js can be used for many backend-related tasks.

### Web Servers

```text
Client
   ↓
Node.js
   ↓
Response
```

### REST APIs

```text
GET /users
POST /users
PATCH /users/10
DELETE /users/10
```

### File Operations

```javascript
read file
write file
update file
delete file
```

### Database Communication

Node.js applications can communicate with databases such as:

```text
MongoDB
PostgreSQL
MySQL
Redis
```

### Authentication

Node.js can handle:

```text
Registration
Login
Sessions
JWT
Authorization
```

### Real-Time Applications

Node.js can also be used for:

```text
Chat applications
Live notifications
Collaborative applications
Real-time dashboards
```

---

# 10. Node.js Is Not a Programming Language

This is another important distinction.

Node.js is **not**:

```text
❌ A programming language
❌ A replacement for JavaScript
❌ A framework
❌ A database
```

Instead:

```text
JavaScript
    ↓
Programming Language

V8
    ↓
JavaScript Engine

Node.js
    ↓
JavaScript Runtime Environment

Express.js
    ↓
Backend Web Framework

MongoDB
    ↓
Database
```

This distinction will become increasingly important as we learn the backend stack.

---

# 11. Node.js vs Express.js

Since Express.js is coming next, don't confuse these two.

### Node.js

Provides the runtime environment.

It gives us tools such as:

```text
http
fs
path
os
events
process
```

### Express.js

Is a web framework built for Node.js.

It makes common backend tasks much easier:

```text
Routing
Middleware
Request handling
Response handling
API development
```

Conceptually:

```text
Node.js
   │
   └── Express.js
          │
          ├── Routes
          ├── Middleware
          └── APIs
```

We'll understand this relationship much more deeply later.

---

# 12. A Real-World Analogy

Think of Node.js like a **workshop**.

JavaScript is the language you use to communicate with the workshop.

V8 is the mechanism that understands the language.

Node.js provides the workshop itself, including tools that JavaScript can use.

```text
JavaScript
    ↓
The language you speak

V8
    ↓
Understands the language

Node.js
    ↓
Provides the workshop + tools

Express.js
    ↓
Specialized tools for building web servers
```

And MongoDB is where your application's data can be stored.

```text
              Your Backend
                   │
            ┌──────┴──────┐
            ↓             ↓
        Node.js       Express.js
            │             │
            └──────┬──────┘
                   ↓
                MongoDB
```

---

# 13. The Most Important Mental Model

For now, remember this:

```text
                 JavaScript
                     │
                     ↓
              ┌─────────────┐
              │     V8      │
              │ JS Engine   │
              └──────┬──────┘
                     │
                     ↓
              ┌─────────────┐
              │   Node.js   │
              │   Runtime   │
              └──────┬──────┘
                     │
        ┌────────────┼────────────┐
        ↓            ↓            ↓
      Files        Network       OS
        │            │            │
        └────────────┼────────────┘
                     ↓
               Backend Server
                     │
                     ↓
                 Express.js
                     │
                     ↓
                  MongoDB
```

Don't worry if every part of this diagram isn't clear yet.

We'll build this understanding piece by piece.

---

# 14. What I Should Remember

### Node.js

> A JavaScript runtime environment that allows JavaScript to run outside the browser.

### V8

> A JavaScript engine that executes JavaScript.

### Express.js

> A web framework built on top of Node.js that makes backend development easier.

### MongoDB

> A database that stores application data.

The complete relationship is:

```text
JavaScript
    ↓
V8
    ↓
Node.js
    ↓
Express.js
    ↓
MongoDB
```

---

# 15. What I Don't Need to Memorize Yet

At this stage, I don't need to memorize:

* Node.js internals
* V8 internals
* libuv
* Event loop internals
* HTTP internals
* Express internals

We'll learn these at the appropriate point.

The goal of this lesson is simply to establish the foundation:

> **JavaScript is the language. V8 executes it. Node.js provides a runtime environment that lets JavaScript work outside the browser, including building backend applications.**

---

# Key Takeaways

* Node.js allows JavaScript to run outside the browser.
* Node.js is a runtime environment, not a programming language.
* V8 is the JavaScript engine used by Node.js.
* Node.js provides APIs for files, networking, processes, and other server-side tasks.
* Browser JavaScript and Node.js JavaScript share the JavaScript language but have different environments and APIs.
* Express.js is a web framework built on Node.js.
* Node.js is commonly used to build backend servers and APIs.
* MongoDB can be connected to Node.js applications to store application data.

---

# What Comes Next?

Now that I understand **what Node.js is**, the next step is to actually run JavaScript using Node.js.

In the next lesson, I'll learn:

* How Node.js is installed
* How to check the Node.js version
* How to execute a `.js` file
* How Node.js receives command-line input
* `process`
* `process.argv`
* Modern Node.js features such as `import.meta.dirname`

**Next Lesson:** `L02 — Running Node.js`
