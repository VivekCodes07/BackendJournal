# Lesson 01 — What Is Node.js?

## Why Am I Learning This?

I already know JavaScript, and I know that it can run inside a browser. But when I started learning backend development, I came across Node.js, Express, APIs, and databases.

Before jumping into Express, I want to understand what makes backend JavaScript possible in the first place.

The key idea is:

> **JavaScript is the language. Node.js provides an environment where I can run that language outside the browser.**

I don't want to memorize this definition and move on. I want to understand what it means, why it matters, and how Node.js fits into the backend applications I want to build.

By the end of this lesson, I should understand:

- What Node.js is and why it became important
- What a JavaScript engine does
- What V8 is and how it differs from Node.js
- What a runtime environment means
- How Node.js differs from a browser environment
- What Node.js can do for a backend application
- How Node.js, Express, and MongoDB fit together

---

## 1. Start With the Problem: Where Does JavaScript Run?

When I write JavaScript for a webpage, the browser provides an environment in which that code can run.

For example:

```javascript
console.log("Hello from JavaScript!");
```

The browser can execute this code using its JavaScript engine.

But imagine that I want to write a backend server. My application needs to receive requests, read files, communicate over a network, and interact with a database.

I want to use JavaScript for that work too. How can JavaScript run without opening a browser?

**Node.js makes this possible.** It lets me execute JavaScript outside the browser and provides APIs that are useful for programs and servers.

```text
JavaScript in a browser

JavaScript
    |
    v
Browser runtime
    |
    v
Web page and browser features
```

```text
JavaScript with Node.js

JavaScript
    |
    v
Node.js runtime
    |
    +---- Files
    +---- Network
    +---- Operating-system features
    +---- Backend application
```

These diagrams are simplified. They show the purpose of each environment, not every internal step involved in executing code.

## 2. What Exactly Is Node.js?

**Node.js is an open-source JavaScript runtime environment that lets JavaScript execute outside a web browser.**

Let's unpack that definition instead of treating it as a sentence to memorize.

- **JavaScript** is the programming language I write.
- **Runtime environment** is the environment that executes my program and provides APIs it can use.
- **Outside the browser** means I can run JavaScript as a standalone program or server without needing a webpage.

Node.js is not a new language. I can use the JavaScript concepts I already know—variables, functions, objects, arrays, classes, and promises—in Node.js too.

What changes is the environment and the capabilities it provides.

For example, Node.js has built-in modules for working with files and HTTP:

```javascript
import { readFile } from "node:fs/promises";

const content = await readFile("./notes.txt", "utf8");

console.log(content);
```

This code uses Node.js's file-system API to read a file. Ordinary browser JavaScript does not get unrestricted access to the computer's file system.

I'll explore file operations later. For now, I only need to notice that Node.js gives JavaScript capabilities that are useful outside a browser.

---

## 3. If JavaScript Is the Language, Who Executes It?

A programming language needs an implementation that can execute its code. In the case of JavaScript, that implementation is a **JavaScript engine**.

Different browsers use different engines:

| Browser | JavaScript engine |
|---|---|
| Google Chrome | V8 |
| Microsoft Edge | V8 |
| Mozilla Firefox | SpiderMonkey |
| Apple Safari | JavaScriptCore |

A JavaScript engine takes JavaScript code and executes it. Modern engines also use techniques such as just-in-time compilation to help code run efficiently.

For this course, the engine I need to know about first is **V8**, because Node.js uses it.

## 4. What Is V8?

V8 is an open-source JavaScript engine originally developed by Google.

Suppose I write:

```javascript
const studentName = "Vivek";

console.log(studentName);
```

The JavaScript engine is responsible for executing the JavaScript instructions. In this example, the program creates a variable and asks the runtime to print its value.

A simplified picture is:

```text
JavaScript source code
          |
          v
    JavaScript engine
          |
          v
   Program execution
```

But here is the important distinction:

> **V8 executes JavaScript; V8 alone is not Node.js.**

An engine is one part of the bigger environment. To build a useful server-side runtime, JavaScript also needs APIs and a way to interact with the operating system and network.

That's where Node.js comes in.

---

## 5. V8 vs Node.js — What Is the Difference?

This distinction is worth getting right now because it will help me understand Node.js internals later.

### V8

V8 is the JavaScript engine. It executes JavaScript code.

### Node.js

Node.js uses V8 and adds runtime capabilities, including built-in APIs that let JavaScript work with files, networks, processes, and other system resources.

For example:

```javascript
import { readFile } from "node:fs/promises";
```

Here, `node:fs/promises` is a Node.js built-in module. V8 itself does not provide this Node-specific file API.

```text
              Node.js runtime
             /               \
            v                 v
       JavaScript          Node.js APIs
          engine                |
            |                   +---- File system
            v                   +---- Networking
     Executes JS                +---- Processes
                                +---- Other capabilities
```

This is a conceptual diagram, not a complete map of Node.js internals. We'll study the runtime's components in Lesson 02.

---

## 6. What Does "Runtime Environment" Actually Mean?

The term sounds more complicated than the idea.

A **runtime environment** is the environment in which a program runs. It includes the engine and the surrounding APIs and facilities available to that program.

JavaScript can run in different environments. The language is still JavaScript, but the available features can differ.

### Browser runtime

A browser provides web-focused features, including:

```javascript
window
document
localStorage
```

These let JavaScript interact with the browser window, webpage, and browser storage. The exact APIs available can vary by browser and context.

For example:

```javascript
document.querySelector("h1");
```

This works in a normal webpage because the browser provides the DOM API.

### Node.js runtime

Node.js provides server- and system-oriented features, including built-in modules such as:

```javascript
node:fs
node:path
node:http
node:os
node:events
```

Node.js also provides the global `process` object, which exposes information about and controls for the running process.

For example, a Node.js program can create an HTTP server or read a file using the appropriate built-in APIs.

**The key idea:** the JavaScript language is shared, but the runtime determines which additional APIs are available. Some APIs, such as `fetch`, now exist in both modern browsers and modern Node.js, so the difference is not that every API belongs exclusively to one side.

---

## 7. Browser JavaScript vs Node.js

| Browser environment | Node.js environment |
|---|---|
| Runs JavaScript within a browser context | Runs JavaScript outside the browser |
| Provides the DOM for webpages | Does not provide the browser DOM by default |
| Usually provides `window` and `document` | Provides Node.js globals such as `process` |
| Provides browser-specific APIs | Provides Node.js built-in modules |
| Commonly used to build interactive user interfaces | Commonly used to build servers, APIs, scripts, and tools |
| Restricts direct access to local files for security | Provides file-system APIs, subject to the permissions of the running process |

For example, this is browser-specific code:

```javascript
document.querySelector("h1");
```

It won't work in a normal Node.js script because Node.js does not create a webpage or provide the DOM by default.

This, on the other hand, uses a Node.js built-in module:

```javascript
import path from "node:path";

console.log(path.basename("/school/students/marks.txt"));
```

It uses `node:path` to work with a file path. It doesn't need a browser.

I should not think of Node.js as simply "a browser without a screen." It is a different runtime designed to support JavaScript programs outside the browser.

---

## 8. Why Was Node.js a Big Deal?

JavaScript was already widely used for frontend development. Node.js made it practical to use JavaScript for server-side programs as well.

Before Node.js, developers commonly built backends using languages and platforms such as Java, PHP, Python, Ruby, and C#. Those options still exist and remain useful; Node.js did not replace them.

What Node.js changed was that a developer could use JavaScript across both sides of a web application.

```text
Frontend
   |
   v
JavaScript in the browser


Backend
   |
   v
JavaScript running with Node.js
```

This can make it easier to share some language knowledge and validation logic across a project. It doesn't mean every part of an application must use JavaScript, or that using one language automatically makes an application better.

For me, the practical benefit is straightforward: **I can use my existing JavaScript knowledge to build backend applications without learning a completely different language first.**

---

## 9. How Does Node.js Fit Into a Backend Application?

Let's use a school-management application as an example.

A student opens the website and requests their marks. The browser might send a request like:

```http
GET /api/students/101/marks
```

The backend needs to receive the request, work out what data is needed, retrieve it, and send a response.

A simplified flow looks like this:

```text
Student's browser
       |
       | HTTP request
       v
Node.js application
       |
       v
Request-handling logic
       |
       v
Database (e.g. MongoDB)
       |
       v
Student's marks
       |
       v
HTTP response to browser
```

Node.js provides the environment in which the server-side JavaScript runs. It can handle networking and execute the application's backend logic.

Later, we'll use **Express** to make routing and request handling more convenient, and **MongoDB** to store application data.

One important detail: Node.js does not automatically connect to MongoDB just because both are part of the stack. My application will use a suitable driver or library to communicate with the database.

---

## 10. What Can I Build With Node.js?

Backend servers and REST APIs are our main focus, but Node.js can be used for more than that.

### Web servers and REST APIs

I can build endpoints such as:

```text
GET    /api/students
GET    /api/students/101
POST   /api/students
PATCH  /api/students/101
DELETE /api/students/101
```

These endpoints might list students, retrieve one student, create a record, update a record, or delete a record.

### File and automation tools

Node.js can read and write files, process data, automate repetitive tasks, and run command-line programs.

### Database-backed applications

A Node.js application can communicate with databases such as MongoDB, PostgreSQL, and MySQL through suitable drivers or libraries.

### Authentication and authorization

A backend can implement registration, login, sessions, token-based authentication, and permission checks. These features require careful design; Node.js doesn't provide a complete authentication system automatically.

### Real-time applications

Node.js can also be used for chat systems, live notifications, and dashboards that exchange updates in real time.

I don't need to master all these use cases today. They help me understand the range of problems Node.js can solve.

---

## 11. Node.js vs Express vs MongoDB

These technologies work together, but they do different jobs.

| Technology | What it does |
|---|---|
| **JavaScript** | The programming language I write |
| **V8** | The JavaScript engine that executes JavaScript |
| **Node.js** | The runtime environment for executing JavaScript outside the browser |
| **Express.js** | A web framework that simplifies building HTTP servers and APIs with Node.js |
| **MongoDB** | A database for storing and querying application data |

A useful mental model is:

```text
JavaScript
    |
    v
Node.js runtime
    |
    +---- Built-in APIs and runtime capabilities
    |
    +---- Express application
                |
                +---- Routes
                +---- Middleware
                +---- Request and response handling
                |
                +---- Database driver / library
                              |
                              v
                           MongoDB
```

Express runs within the Node.js environment. MongoDB is a separate database system that the application communicates with.

I will understand each connection properly as we progress through the course, rather than trying to learn the entire stack at once.

---

## 12. A Real-World Analogy

Imagine that I'm working in a workshop.

- **JavaScript is the language** I use to describe what I want to do.
- **V8 is the engine** that executes the JavaScript instructions.
- **Node.js is the working environment**, providing the facilities and tools my program can use.
- **Express is a web-development framework** that gives me convenient ways to organize request handling and API behavior.
- **MongoDB is a place to store and retrieve application data.**

The analogy is not exact, but it helps me remember that these pieces have different responsibilities. V8 and Node.js are related, but they are not interchangeable terms.

---

## 13. The Mental Model I Want to Keep

If I remember only one diagram from this lesson, it should be this:

```text
                  JavaScript
                The language
                      |
                      v
                     V8
              Executes JavaScript
                      |
                      v
                   Node.js
             The runtime environment
                      |
          +-----------+-----------+
          |           |           |
          v           v           v
       Files       Networking   Processes
                      |
                      v
              Backend application
                      |
                 Express.js
          Routes and request handling
                      |
             Database driver/library
                      |
                      v
                  MongoDB
```

This is a simplified learning model, not a literal execution pipeline. Express is a library running inside Node.js, and the application can use Node.js APIs directly as well.

The relationship I want to understand is:

> **JavaScript is the language. V8 executes JavaScript. Node.js provides the runtime and additional APIs. Express helps me build web APIs, and a database such as MongoDB stores application data.**

---

## 14. What I Don't Need to Understand Yet

I don't need to memorize Node.js internals after this first lesson.

I'll study these concepts at the right point in the course:

- **V8 internals:** how the JavaScript engine executes code in more detail
- **libuv:** an important part of Node.js's asynchronous I/O and event-loop implementation
- **The event loop:** how Node.js coordinates callbacks and asynchronous work
- **HTTP internals:** how clients and servers exchange requests and responses
- **Express internals:** how routing and middleware work

For now, I only need a reliable high-level picture. The next lesson will explain how the main pieces inside Node.js work together.

---

## Key Takeaways

- Node.js is a JavaScript runtime environment that allows JavaScript to run outside a browser.
- JavaScript is the language; Node.js is not a separate programming language or a web framework.
- V8 is the JavaScript engine used by Node.js.
- Node.js adds built-in APIs for capabilities such as file access, networking, and process information.
- Browser JavaScript and Node.js use the same language but run in different environments with different available APIs.
- Node.js can power backend servers, REST APIs, command-line tools, and other applications.
- Express simplifies web-server and API development on Node.js.
- MongoDB stores application data and is accessed through a driver or library.

## What Comes Next?

Now that I understand what Node.js is, I want to understand **what happens inside Node.js when my JavaScript program runs**.

In the next lesson, I'll build a mental model of:

- V8 and its role in execution
- The Node.js runtime beyond V8
- The role of libuv
- How Node.js interacts with the operating system
- How these pieces fit together when a backend application runs

**Next lesson: `L02 — How Node.js Works Internally`**
