# 03 — HTTP and Node.js Server

## What Am I Learning?

So far, I have learned how Node.js works internally, how modules work, how Node handles files, events, and asynchronous operations.

Now I am moving from **running JavaScript with Node.js** to actually using Node.js to **build a backend server**.

The main question here is:

> How does a browser communicate with my Node.js application?

The answer starts with **HTTP**.

---

## What Is HTTP?

HTTP stands for **HyperText Transfer Protocol**.

It is the protocol used for communication between a **client** and a **server**.

For example, when I open:

```text
https://example.com
```

my browser acts as the **client** and sends a request to a server.

The server processes that request and sends a response back.

```text
Client (Browser)
       |
       | HTTP Request
       ↓
    Server
       |
       | HTTP Response
       ↓
Client (Browser)
```

This request-response cycle is the basic foundation of web applications.

---

## Client vs Server

### Client

The client is the side that **requests something**.

Examples:

* Browser
* Mobile app
* Frontend application
* Postman

### Server

The server is the side that **receives the request, processes it, and sends a response**.

In my case, Node.js will allow me to create that server.

```text
Browser
   ↓
HTTP Request
   ↓
Node.js Server
   ↓
My JavaScript Code
   ↓
HTTP Response
   ↓
Browser
```

---

## What Is an HTTP Request?

An HTTP request is a message sent by the client to the server.

A request contains information such as:

```text
Method
URL
Headers
Body
```

For example:

```http
GET /users
```

This basically means:

> "Server, give me the users resource."

---

## HTTP Methods

HTTP methods tell the server **what kind of operation the client wants to perform**.

The main methods I need to know are:

| Method | Purpose               |
| ------ | --------------------- |
| GET    | Get data              |
| POST   | Create data           |
| PUT    | Replace/update data   |
| PATCH  | Partially update data |
| DELETE | Delete data           |

For example:

```text
GET    /users
POST   /users
GET    /users/10
PATCH  /users/10
DELETE /users/10
```

The URL can be similar, but the **HTTP method changes what the request means**.

---

## What Is an HTTP Response?

After receiving a request, the server sends a response back.

A response contains things such as:

```text
Status Code
Headers
Body
```

Example:

```http
HTTP/1.1 200 OK

{
    "message": "Users fetched successfully"
}
```

---

## HTTP Status Codes

The status code tells the client what happened with the request.

Some important ones:

| Status Code | Meaning               |
| ----------- | --------------------- |
| 200         | OK                    |
| 201         | Created               |
| 204         | No Content            |
| 400         | Bad Request           |
| 401         | Unauthorized          |
| 403         | Forbidden             |
| 404         | Not Found             |
| 500         | Internal Server Error |

I don't need to memorize every status code.

I mainly need to understand **why a particular status code is being sent**.

---

## Request → Processing → Response

The basic backend flow is:

```text
Client
   |
   | Request
   ↓
Node.js Server
   |
   | Process request
   ↓
Application Logic
   |
   | Create response
   ↓
Node.js Server
   |
   | Response
   ↓
Client
```

This same basic pattern will continue even when I later build:

* REST APIs
* Authentication systems
* MongoDB applications
* Full-stack applications

---

## What Happens When I Visit a Website?

Suppose I open:

```text
http://localhost:3000
```

The browser sends a request to my Node.js server.

```text
Browser
   |
   | GET /
   ↓
localhost:3000
   |
   ↓
Node.js Server
   |
   ↓
My Code
   |
   ↓
Response
   |
   ↓
Browser
```

My Node.js application decides what response should be returned.

For example:

```text
GET /
```

could return:

```text
Hello from my server
```

---

## Why `localhost`?

When I use:

```text
localhost
```

I am referring to **my own computer**.

For example:

```text
http://localhost:3000
```

means:

```text
My Computer
    ↓
Port 3000
```

The Node.js server is running on my machine and listening for requests on that port.

---

## What Is a Port?

A port allows multiple applications on the same computer to communicate over the network.

For example:

```text
localhost:3000
localhost:5000
localhost:8080
```

These can represent different servers or applications running on my computer.

Think of the IP address as the **building** and the port as the **specific door**.

```text
localhost
   |
   +---- 3000 → Node Server
   |
   +---- 5000 → Another Server
   |
   +---- 8080 → Another Application
```

---

## Node.js and HTTP

Node.js provides a built-in `http` module that allows me to create an HTTP server.

```js
import http from "node:http";
```

I can then create a server that listens for incoming requests.

The basic idea is:

```text
Create Server
      ↓
Listen on a Port
      ↓
Receive Request
      ↓
Process Request
      ↓
Send Response
```

I will write the actual server code in the next lesson.

---

## What I Need To Understand Before Moving On

At this point, I should be comfortable with these ideas:

```text
Client
Server
HTTP
Request
Response
HTTP Methods
Status Codes
Headers
Body
localhost
Port
```

The most important mental model is:

```text
REQUEST

Client
  ↓
HTTP Request
  ↓
Server
  ↓
Process


RESPONSE

Server
  ↓
HTTP Response
  ↓
Client
```

Everything I build later with Express, REST APIs, authentication, and databases will build on this same foundation.

---

## Next Lesson

### L01 — HTTP Server

Now I will actually create my **first Node.js HTTP server** using the built-in `http` module.

I will learn:

```text
http.createServer()
server.listen()
request
response
```

and understand what happens internally when I open:

```text
http://localhost:3000
```
