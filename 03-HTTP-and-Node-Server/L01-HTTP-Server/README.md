# Lesson 01 — HTTP Server

## What Am I Learning?

In the previous lesson, I learned how **HTTP communication works** between a client and a server.

Now I want to actually create my own server using Node.js.

Node already gives me a built-in module called `http`, so I don't need Express yet.

The basic idea is:

```text
Create Server
      ↓
Listen for Requests
      ↓
Receive Request
      ↓
Send Response
```

---

## The `http` Module

Node.js provides the built-in `http` module for creating HTTP servers.

I can import it using:

```js
import http from "node:http";
```

The `node:` prefix tells Node that this is a built-in module.

---

## Creating a Server

The main method I need is:

```js
http.createServer()
```

It creates an HTTP server.

To understand how this line works under the hood, here is the anatomy of the code:

*   **`const server =` creates a variable** that stores the brand new server object created by Node.js, allowing me to interact with it later (like starting it).
*   **`http` is an object** containing all the built-in tools Node.js provides for handling web traffic.
*   **`createServer` is a method (a function)** attached to that `http` object, accessed using dot notation.
*   **It takes another function as a callback** argument. This callback acts as the "brain" of the server, waiting to run automatically every time a request arrives.

```js
const server = http.createServer((req, res) => {
    // handle request
});
```

Here:

* `req` = Request coming from the client
* `res` = Response I will send back to the client

---

## Request and Response

When someone visits my server:

```text
Browser
   ↓
HTTP Request
   ↓
Node.js Server
   ↓
(req, res)
```

Node gives my callback two important objects:

### `req`

Contains information about the incoming request.

For example:

```js
req.url
req.method
req.headers
```

### `res`

Allows me to send a response back.

For example:

```js
res.end("Hello from Node.js");
```

So mentally:

```text
req → What did the client ask for?

res → What do I want to send back?
```

---

## Starting the Server

Creating the server is not enough.

I also need to tell it which port to listen on.

```js
server.listen(3000);
```

Now my server is listening on:

```text
http://localhost:3000
```

The complete flow becomes:

```text
http.createServer()
        ↓
Create server
        ↓
server.listen(3000)
        ↓
Server starts listening
        ↓
Browser sends request
        ↓
(req, res)
        ↓
res.end()
        ↓
Browser receives response
```

---

## My First Node.js Server

```js
import http from "node:http";

const server = http.createServer((req, res) => {
    res.end("Hello from my Node.js server!");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
```

Run it with:

```bash
node server.js
```

Then open:

```text
http://localhost:3000
```

I should see:

```text
Hello from my Node.js server!
```

---

## What Actually Happened?

When I opened:

```text
http://localhost:3000
```

the browser sent an HTTP request.

Node received it and executed:

```js
(req, res) => {
    res.end("Hello from my Node.js server!");
}
```

Then:

```js
res.end(...)
```

sent the response back to the browser.

So:

```text
Browser
   |
   | GET /
   ↓
Node.js Server
   |
   | req + res
   ↓
My callback runs
   |
   | res.end()
   ↓
HTTP Response
   |
   规律
Browser
```

---

## Why `res.end()`?

`res.end()` tells Node:

> "I am finished sending the response."

For a simple response, I can directly put the response data inside it:

```js
res.end("Hello!");
```

After this, the response is completed and sent to the client.

---

## Listening Callback

I can also give `server.listen()` a callback:

```js
server.listen(3000, () => {
    console.log("Server started");
});
```

This callback runs once the server has successfully started listening on the port.

It is useful for confirming that my server is running.

---

## Important Things I Learned

```text
http.createServer()
        ↓
Creates an HTTP server

req
        ↓
Represents the incoming request

res
        ↓
Represents the outgoing response

res.end()
        ↓
Finishes and sends the response

server.listen()
        ↓
Starts listening for incoming requests
```

---

## My Mental Model

I want to remember the server like this:

```text
                    NODE.JS SERVER

Browser ────────→  Request
                       ↓
                    (req, res)
                       ↓
                  My Server Code
                       ↓
                    res.end()
                       ↓
Browser ←────────  Response
```

The server is basically sitting there **waiting for requests**.

Whenever a request arrives, my callback runs, I decide what to return, and then I send the response.

---

## Next Lesson

### L02 — Routing

Right now, every request gets the same response.

Next, I will learn how to make my server behave differently depending on the URL:

```text
GET /
GET /about
GET /users
GET /products
```

This is where **routing** starts.
