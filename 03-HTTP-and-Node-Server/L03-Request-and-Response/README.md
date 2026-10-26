# Lesson 03 — Understanding HTTP Request and Response

## Why Am I Learning This?

Until now, I have learned how to create an HTTP server in Node.js and how HTTP methods and routing work at a basic level.

But I still need to understand something much more important: **what actually happens when a client communicates with my server?**

Imagine I am building a school management application. A student opens the frontend, clicks on "View Students", and the application needs to retrieve a list of students from my backend.

How does my backend know what the frontend wants?

How does the frontend send that information?

How does the backend return the students?

And how does the frontend know whether the request succeeded or failed?

These questions lead me to one of the most fundamental concepts in backend development: HTTP request and response.

I don't want to learn `req` and `res` as two variables that I simply pass into a callback. I want to understand where they come from, what information they contain, and how I use them to communicate with a client.

I am also learning this before Express.js deliberately. Express provides convenient ways to handle requests and responses, but I want to understand the underlying Node.js behavior first.

## What Am I Going to Learn?

By the end of this lesson, I want to be able to:

- Visualize the complete request-response lifecycle.
- Understand the structure of an HTTP request and response.
- Explain what Node.js gives me through `req` and `res`.
- Read the request method, URL, headers and query parameters.
- Understand status codes and response headers.
- Receive a request body and understand why it arrives as a stream.
- Return plain text and JSON responses correctly.
- Understand why a response must be finished and why I cannot send it twice.
- Connect everything I learn here to how Express works.

---

# 1. First, I Need to Understand the Conversation

Before writing more code, I want to think about the problem from the client's perspective.

Suppose my school management application has a frontend and a backend.

The frontend needs a list of students, but the student data is handled by the backend. The frontend cannot simply access a variable inside the backend's JavaScript process.

Instead, it sends a request to the server.

The server receives that request, performs the required work and sends a response.

```text
           SCHOOL MANAGEMENT APP

          FRONTEND (CLIENT)
                  |
                  | "Give me the students"
                  |
                  v
          NODE.JS BACKEND
                  |
                  | Understand the request
                  | Process the required operation
                  | Prepare the result
                  |
                  v
          HTTP RESPONSE
                  |
                  | "Here are the students"
                  |
                  v
          FRONTEND (CLIENT)
```

This is the basic request-response model.

The client initiates the request, and the server sends a response. In a typical HTTP exchange, the client waits for the server's response to that request.

Now I want to make this more concrete.

Imagine the frontend requests:

```text
http://localhost:3000/students
```

The browser sends an HTTP request to my Node.js server. The server doesn't automatically know that `/students` means "fetch all students". I have to implement that behavior.

For now, I can make the server return a simple message. Later, the same endpoint could retrieve records from MongoDB and return them as JSON.

The important thing is that the communication mechanism remains the same.

**The client sends a request. My backend processes it. My backend sends a response.**

That is the foundation of everything I will build with Node.js and Express.

---

# 2. What Does an Actual HTTP Request Look Like?

I understand the general idea, but I want to know what the client actually sends.

A simplified HTTP request might look like this:

```http
GET /students HTTP/1.1
Host: localhost:3000
Accept: application/json
```

At first, this might look like a collection of random lines. But each part has a purpose.

## 2.1 The method tells me the intended operation

Look at the first line:

```http
GET /students HTTP/1.1
```

`GET` is the HTTP method.

It tells the server that the client wants to retrieve information.

Now consider these requests:

```text
GET    /students
POST   /students
GET    /students/101
PATCH  /students/101
DELETE /students/101
```

They all involve students, but they express different intentions.

| Request | What I intend to do |
|---|---|
| `GET /students` | Retrieve the student collection. |
| `POST /students` | Submit data to create a student. |
| `GET /students/101` | Retrieve a particular student. |
| `PATCH /students/101` | Partially update that student. |
| `DELETE /students/101` | Delete that student. |

The method does not perform the operation automatically. It communicates the intended operation to my server, and my code determines what happens next.

For example, if I implement only a `GET /students` handler, sending a `POST /students` request won't magically create a student.

This is why the method and the URL work together.

## 2.2 The URL tells me what the client is requesting

Consider:

```text
/students
/students/101
/teachers
```

I can design these endpoints to represent:

- `/students` — the collection of students.
- `/students/101` — the student with ID `101`.
- `/teachers` — the collection of teachers.

The path identifies the resource or endpoint the client wants to access.

But I need to remember that these meanings come from my application's design. Node.js doesn't have built-in knowledge of my school's students or teachers.

I create that meaning through my server's logic.

## 2.3 Headers provide additional information

A request can also contain headers.

For example:

```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer example-token
```

I want to understand why these exist instead of memorizing their names.

Imagine the frontend submits a new student as JSON. The server needs to know what format the submitted body uses. That's where `Content-Type` helps.

`Accept` communicates the response formats the client can accept.

`Authorization` can carry credentials or a token that the server can use when implementing authentication.

Headers provide metadata about the request. They do not automatically validate the submitted data or prove that a user is authorized. My application must perform those checks.

## 2.4 The request body contains submitted data

Suppose the frontend wants to create a student.

It might send this JSON:

```json
{
  "name": "John",
  "age": 18,
  "course": "Computer Science"
}
```

The request could be represented like this:

```http
POST /students HTTP/1.1
Host: localhost:3000
Content-Type: application/json

{"name":"John","age":18,"course":"Computer Science"}
```

Now the request has a body containing the submitted data.

I can think of the four main parts this way:

```text
REQUEST
  |
  ├── Method  → What operation is intended?
  ├── URL     → Which endpoint is being requested?
  ├── Headers → What metadata accompanies the request?
  └── Body    → What data is being submitted?
```

Not every request needs a body. For example, a typical `GET /students` request doesn't need to submit a student object.

At this point, I understand what the client can send. Next, I need to understand what happens when this request reaches Node.js.

---

# 3. What Happens When the Request Reaches Node.js?

I already know how to create an HTTP server using Node.js:

```js
import http from "node:http";

const server = http.createServer((req, res) => {
    // Handle the incoming request.
});

server.listen(3000);
```

Previously, I might have focused mainly on getting the server running. Now I want to understand the callback.

The important line is:

```js
http.createServer((req, res) => {
    // Handle the incoming request.
});
```

When an incoming HTTP request is received, Node.js invokes this callback and supplies two objects.

I choose to name them `req` and `res`, but the names themselves are not special. The important part is what Node.js passes into the callback.

## 3.1 Understanding `req`

`req` is an `http.IncomingMessage` object representing the incoming request.

It gives me access to information such as:

```js
req.method
req.url
req.headers
```

For example, if a client sends:

```text
GET /students
```

I can inspect the request:

```js
console.log(req.method);
console.log(req.url);
```

The output will typically be:

```text
GET
/students
```

This means my code can inspect what the client requested and decide how to handle it.

I can also inspect the headers:

```js
console.log(req.headers);
```

Node.js exposes the incoming headers through this object.

There is one more important detail: `req` is also a readable stream. That matters when the client sends a request body, and I will explore it after understanding the basic response flow.

## 3.2 Understanding `res`

`res` is an `http.ServerResponse` object representing the outgoing response I am constructing.

For example:

```js
res.statusCode = 200;
res.setHeader("Content-Type", "text/plain");
res.end("Welcome to the School API");
```

I am doing three related but different things:

1. Setting the HTTP status code.
2. Setting a response header.
3. Ending the response and sending the supplied body.

The request object helps me understand the incoming message. The response object allows me to construct and send the outgoing message.

This is the distinction I want to remember:

```text
req → Information received from the client

res → Response I construct for the client
```

Now that I understand the two objects, I can build a complete example.

---

# 4. Building My First Request-Response Server

I will create the following file:

`C01_RequestAndResponse.js`

```js
import http from "node:http";

const server = http.createServer((req, res) => {
    console.log("Request received");
    console.log("Method:", req.method);
    console.log("URL:", req.url);

    res.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");

    res.end("Hello from my Node.js server");
});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
```

I want to understand this in the order it executes.

First, `http.createServer()` creates the server and registers the callback that will handle incoming requests.

Then `server.listen(3000, ...)` starts listening on port `3000`.

When the server successfully starts listening, the callback passed to `listen()` logs the address.

When a client sends a request, Node.js invokes the request handler.

Inside that handler, I inspect the request and construct the response.

Finally, `res.end()` finishes the response.

## Let me run it

```bash
node C01_RequestAndResponse.js
```

My terminal should display:

```text
Server running at http://localhost:3000
```

Now I open:

```text
http://localhost:3000/students
```

The browser displays:

```text
Hello from my Node.js server
```

My terminal displays something similar to:

```text
Request received
Method: GET
URL: /students
```

Notice something interesting: I requested `/students`, but the server returned the same message it would return for `/teachers` or `/anything`.

Why?

Because I haven't written any routing logic yet. My current server handles every request in exactly the same way.

This is not a problem with Node.js. The server is doing precisely what I programmed it to do.

Now I want to improve it.

---

# 5. Teaching My Server to Understand Different Requests

Suppose I want the school API to behave differently for different endpoints.

I want:

- `/` to return a welcome message.
- `/students` to return a students message.
- `/teachers` to return a teachers message.
- Unknown endpoints to return a `404` response.

I can implement this with conditional statements.

**File:** `C02_RoutingAndStatusCodes.js`

```js
import http from "node:http";

const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "text/plain");

    if (req.method === "GET" && req.url === "/") {
        res.statusCode = 200;
        res.end("Welcome to the School API");
        return;
    }

    if (req.method === "GET" && req.url === "/students") {
        res.statusCode = 200;
        res.end("Here are the students");
        return;
    }

    if (req.method === "GET" && req.url === "/teachers") {
        res.statusCode = 200;
        res.end("Here are the teachers");
        return;
    }

    res.statusCode = 404;
    res.end("Route not found");
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

I can now test these endpoints:

| Path | Expected result |
|---|---|
| `/` | Welcome to the School API |
| `/students` | Here are the students |
| `/teachers` | Here are the teachers |
| `/unknown` | `404 Route not found` |

I am checking both `req.method` and `req.url` because a URL can be used with different HTTP methods.

For example, `GET /students` and `POST /students` express different intentions.

## Why am I using `return`?

Look at this section:

```js
if (req.method === "GET" && req.url === "/students") {
    res.statusCode = 200;
    res.end("Here are the students");
    return;
}
```

After sending the response, `return` exits the callback.

Without it, the code could continue executing and reach another response statement. Trying to write to a response after it has ended can cause an error.

The `return` statement doesn't send the response. It controls the execution of my JavaScript code.

I now have a basic routing system, but I am already writing conditional statements for every endpoint.

As the application grows, manually managing routing and response handling becomes repetitive. This is one of the problems Express will help me solve.

Before moving to Express, though, I want to understand two more parts of the request: its URL parameters and its body.

---

# 6. Understanding Query Parameters

Suppose the frontend wants only second-year CSE students.

I could design a URL like this:

```text
/students?course=cse&year=2
```

The path is `/students`. The part after `?` contains query parameters.

Query parameters let the client provide additional information, commonly for filtering, searching, pagination or sorting.

For example:

```text
/students?course=cse
/students?year=2
/students?course=cse&year=2
```

I can use the standard `URL` class to read them.

```js
const url = new URL(req.url, "http://localhost:3000");

console.log(url.pathname);
console.log(url.searchParams.get("course"));
console.log(url.searchParams.get("year"));
```

For `/students?course=cse&year=2`, the output is:

```text
/students
cse
2
```

I am using a base URL because `req.url` generally contains a request target, not a complete absolute URL.

The distinction matters:

- `req.url` contains the request target.
- `url.pathname` gives me the path.
- `url.searchParams` allows me to access query parameters.

Notice that extracting a query parameter doesn't automatically filter the students. It only gives me the value supplied by the client. I still need to use that value in my application's logic.

For example, a real application might use the `course` value to filter a database query.

Later, Express will expose query parameters through `req.query`, making this process more convenient.

---

# 7. Understanding the Request Body and Streams

I now understand how to read the method and URL. But how do I receive the student information that the frontend submits?

Suppose the client sends:

```json
{
  "name": "John",
  "age": 18,
  "course": "CSE"
}
```

This data belongs in the request body.

My first instinct might be to write:

```js
console.log(req.body);
```

But this does not work as expected with Node.js's built-in HTTP server because Node.js does not automatically parse the request body into a `req.body` property.

Why?

Remember that `req` is a readable stream.

The body data can arrive in chunks rather than as one complete JavaScript object. My application needs to consume those chunks and, if the body contains JSON, parse the collected text.

This is a useful example because it shows me that HTTP data and JavaScript objects are not the same thing.

The client sends JSON text over HTTP. My server must interpret that text before treating it as a JavaScript object.

## Reading and parsing the body

Here is the core process:

```js
let body = "";

for await (const chunk of req) {
    body += chunk;
}

const student = JSON.parse(body);
```

Let me break this down.

First, I create an empty string to collect the incoming data.

Then I use `for await...of` to consume the readable stream. Each chunk is added to the string, and the loop finishes when the stream ends.

After that, `JSON.parse()` converts the JSON text into a JavaScript value.

For example:

```text
Incoming JSON text
        |
        v
Collect stream chunks
        |
        v
Complete body string
        |
        v
JSON.parse(body)
        |
        v
JavaScript object
```

However, `JSON.parse()` can throw an error if the incoming text is not valid JSON. I therefore need to handle parsing errors.

**File:** `C04_RequestBody.js`

```js
import http from "node:http";

const server = http.createServer(async (req, res) => {
    if (req.method !== "POST" || req.url !== "/students") {
        res.statusCode = 404;
        res.end("Route not found");
        return;
    }

    let body = "";

    for await (const chunk of req) {
        body += chunk;
    }

    try {
        const student = JSON.parse(body);

        res.statusCode = 201;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({
            message: "Student received successfully",
            data: student
        }));
    } catch {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");

        res.end(JSON.stringify({
            message: "Invalid JSON"
        }));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

This example demonstrates the request-body flow, but it is not yet production-ready. A real server should also consider body-size limits, content-type validation, input validation and stream errors.

One more distinction: this example returns the submitted student data. It does not save the student to MongoDB. I will need a separate database operation to persist it.

---

# 8. Returning JSON Instead of Plain Text

So far, I have returned simple strings such as:

```js
res.end("Here are the students");
```

That works for learning, but real APIs commonly return structured data.

Imagine my application wants to return a student:

```js
const student = {
    id: 101,
    name: "John",
    course: "CSE"
};
```

I cannot pass this JavaScript object directly to `res.end()` as the response body.

I need to serialize the object into JSON text.

```js
res.setHeader("Content-Type", "application/json");
res.end(JSON.stringify(student));
```

`JSON.stringify()` converts the JavaScript value into JSON text, and the content-type header tells the client how to interpret the response.

The resulting body looks like this:

```json
{"id":101,"name":"John","course":"CSE"}
```

This distinction is important:

```text
JavaScript object
       |
       | JSON.stringify()
       v
JSON text
       |
       | Sent in HTTP response
       v
Client receives response body
```

The reverse process occurs when I receive JSON: I collect the incoming text and use `JSON.parse()` to convert it into a JavaScript value.

I will use these two operations frequently when building APIs.

---

# 9. Status Codes, Headers and Ending a Response

I have used `res.statusCode`, `res.setHeader()` and `res.end()` throughout this lesson. Now I want to understand why they are separate.

Consider:

```js
res.statusCode = 201;
res.setHeader("Content-Type", "application/json");

res.end(JSON.stringify({
    message: "Student created successfully"
}));
```

Each statement has a distinct responsibility.

**`res.statusCode`** sets the HTTP status code. Here, `201` communicates that a resource was created.

**`res.setHeader()`** configures a response header. Here, `Content-Type` communicates that the body contains JSON.

**`res.end()`** finishes the response and sends the supplied body.

Setting the status code doesn't finish the response. Setting a header doesn't finish it either.

I need to complete the response when my handler has finished preparing it.

## Why can't I send two final responses?

Consider:

```js
res.end("First response");
res.end("Second response");
```

This is incorrect because the response has already been ended by the first call.

An HTTP request should receive one coherent final response. My code must avoid trying to send additional response content after the response has finished.

This is why I use `return` after a completed response when I need to prevent the rest of the handler from executing.

I also need to remember that a `204 No Content` response must not include a response body. Status codes have specific semantics, so I should choose the status and body together.

---

# 10. Connecting Everything to Express

At this point, I have manually implemented several things:

- Inspecting the request method and URL.
- Matching endpoints using conditional statements.
- Reading query parameters.
- Collecting and parsing JSON request bodies.
- Setting status codes and response headers.
- Serializing and sending JSON responses.
- Handling unknown endpoints.

This is useful because I now understand what the server needs to do.

But imagine an application with dozens of routes, authentication, validation, logging, database operations and error handling.

Manually repeating the same patterns would make the application harder to maintain.

This is where Express comes in.

For example, my Node.js routing code might look like:

```js
if (req.method === "GET" && req.url === "/students") {
    res.statusCode = 200;
    res.end("Here are the students");
    return;
}
```

With Express, I can write:

```js
app.get("/students", (req, res) => {
    res.send("Here are the students");
});
```

And instead of manually collecting a JSON request body for every applicable route, I can register:

```js
app.use(express.json());
```

Express provides routing and middleware abstractions that simplify these common tasks.

However, the fundamentals remain the same: a request arrives, my application processes it, and a response is sent back.

I am now ready to learn Express with an understanding of what its features are helping me accomplish.

---

# 11. What I Want to Remember From This Lesson

The most important thing I learned is not a particular method or status code. It is the flow of communication between a client and a server.

```text
CLIENT
  |
  | Sends HTTP request
  v
NODE.JS
  |
  | req → Inspect incoming information
  |
  | Application → Process the request
  |
  | res → Prepare status, headers and body
  v
CLIENT RECEIVES HTTP RESPONSE
```

I now understand that:

- The request method and URL help my server determine what the client wants.
- Headers carry metadata about the request and response.
- The request body can contain submitted data.
- Node.js exposes the incoming request through `req`.
- Node.js exposes the outgoing response through `res`.
- Query parameters can provide filters or other input.
- Request bodies may arrive as streams and need to be parsed.
- JSON serialization converts JavaScript values into response text.
- Status codes communicate the outcome of a request.
- A response must be finished correctly.
- Returning data to the client does not automatically save it to a database.

**My main takeaway:** I now understand the basic HTTP communication that takes place underneath a Node.js backend. Express will make request handling more convenient, but I won't be learning it blindly because I understand the problem it solves.

---

# Next Lesson — Building a Small HTTP API

Before moving to Express, I will combine these concepts into a small school API.

I will organize multiple endpoints, return consistent JSON responses, choose meaningful status codes, and handle invalid requests.

This will help me recognize the limitations of manual HTTP handling and understand why Express is useful.

After that, I will move to Express fundamentals, routing and middleware.