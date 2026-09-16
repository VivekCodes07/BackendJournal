# Lesson 02 — HTTP Methods & Routing

## Where Am I Right Now?

In the previous lesson, I created my first HTTP server using Node.js.

I learned how to:

* Import the `http` module
* Create a server using `http.createServer()`
* Receive a request through `req`
* Send a response through `res`
* Start the server using `server.listen()`

My server currently looks something like this:

```js
import http from "node:http";

const server = http.createServer((req, res) => {
    res.end("Hello from my server");
});

server.listen(3000);
```

This works, but there is an obvious problem.

No matter what URL I request, my server sends the same response.

If I visit:

```text
http://localhost:3000/
```

I get:

```text
Hello from my server
```

If I visit:

```text
http://localhost:3000/about
```

I still get:

```text
Hello from my server
```

That isn't how a real backend works.

A real server needs to understand **what the client is asking for** and then decide **which code should handle that request**.

This is the problem I am solving in this lesson.

---

# What Am I Going To Learn?

In this lesson, I am going to learn two things:

### 1. HTTP Methods

HTTP methods tell my server **what kind of operation the client wants to perform**.

For example:

```text
GET
POST
PUT
PATCH
DELETE
```

### 2. Routing

Routing allows my server to decide:

> "For this particular request, which piece of code should run?"

For example:

```text
GET  /
GET  /about
GET  /users
POST /users
DELETE /users
```

So the overall idea is:

```text
HTTP Request
     ↓
Method + URL
     ↓
Find matching route
     ↓
Run route logic
     ↓
Send response
```

Before writing the routing code, I need to understand what these requests actually mean.

---

# 1. What Is an HTTP Method?

An HTTP method describes the **intention of a request**.

For example, when I send:

```text
GET /users
```

I am basically saying:

> "I want to get the users."

When I send:

```text
POST /users
```

I am saying:

> "I want to create a new user."

The method gives meaning to the request.

---

# 2. The Important HTTP Methods

I don't need to memorize every HTTP method.

For backend development, these are the important ones I will use regularly.

| Method | Purpose               |
| ------ | --------------------- |
| GET    | Retrieve data         |
| POST   | Create new data       |
| PUT    | Replace existing data |
| PATCH  | Partially update data |
| DELETE | Delete data           |

---

## GET

`GET` is used when I want to **retrieve something**.

Example:

```text
GET /users
```

Meaning:

> Give me the users.

Another example:

```text
GET /users/10
```

Meaning:

> Give me the user with ID 10.

---

## POST

`POST` is generally used when I want to **create something new**.

Example:

```text
POST /users
```

Meaning:

> Create a new user.

The information for that new user will usually be sent in the request body.

I will learn how to properly handle request bodies in the next lesson.

---

## PUT

`PUT` is generally used when I want to **replace an existing resource**.

Example:

```text
PUT /users/10
```

The idea is:

> Replace the existing user with ID 10 with the new representation I am sending.

---

## PATCH

`PATCH` is used when I want to **partially update** an existing resource.

Example:

```text
PATCH /users/10
```

For example, if the user has:

```text
name
email
age
```

I might only want to change:

```text
name
```

without replacing the entire user.

---

## DELETE

`DELETE` is used when I want to **remove a resource**.

Example:

```text
DELETE /users/10
```

Meaning:

> Delete the user with ID 10.

---

# 3. HTTP Methods Give Meaning to URLs

This is an important concept.

Consider these two requests:

```text
GET /users
POST /users
```

The URL is exactly the same:

```text
/users
```

But the meaning is different.

```text
GET /users
↓
Retrieve users


POST /users
↓
Create a user
```

So I should not think of a route as just a URL.

A better mental model is:

```text
Route
=
HTTP Method + URL
```

For example:

```text
GET /users
POST /users
DELETE /users
```

These are different routes.

---

# 4. What Is Routing?

Now I can understand routing.

Routing is the process of deciding:

> **Which code should handle a particular HTTP request?**

Suppose my server receives:

```text
GET /about
```

My server needs to figure out:

```text
Method → GET
URL    → /about
```

Then it can find the matching route:

```text
GET /about
    ↓
About route
    ↓
Run About logic
    ↓
Send response
```

I can think of routing as a **traffic controller**.

Different requests arrive at the same server, and routing directs each request to the correct piece of code.

```text
                    Node.js Server
                          |
          ┌───────────────┼───────────────┐
          ↓               ↓               ↓
       GET /          GET /about       GET /users
          ↓               ↓               ↓
      Home Code       About Code       Users Code
```

---

# 5. How Does Node Know What the Client Requested?

In the previous lesson, I learned about:

```js
(req, res)
```

Now I need to look inside the `req` object.

Two properties are especially important for routing:

```js
req.method
req.url
```

### `req.method`

Tells me which HTTP method was used.

For example:

```js
console.log(req.method);
```

could give:

```text
GET
```

### `req.url`

Tells me which URL path was requested.

For example:

```js
console.log(req.url);
```

could give:

```text
/about
```

So if the client sends:

```text
GET /about
```

I can think of it as:

```text
req.method → "GET"
req.url    → "/about"
```

Now my server has the information it needs to perform basic routing.

---

# 6. My First Manual Route

Now I can combine what I have learned.

I can check the method and URL:

```js
if (req.method === "GET" && req.url === "/") {
    res.end("Home Page");
}
```

This means:

> If the request is a `GET` request and the URL is `/`, send the Home Page response.

I can add another route:

```js
if (req.method === "GET" && req.url === "/about") {
    res.end("About Page");
}
```

Now my server can behave differently depending on the request.

---

# 7. Building Multiple Routes

My complete server can now look like this:

```js
import http from "node:http";

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {
        res.end("Home Page");
    }

    else if (req.method === "GET" && req.url === "/about") {
        res.end("About Page");
    }

    else if (req.method === "GET" && req.url === "/users") {
        res.end("Users Page");
    }

    else {
        res.statusCode = 404;
        res.end("404 - Page Not Found");
    }

});

server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
```

Now different URLs produce different responses.

```text
GET /
↓
Home Page
```

```text
GET /about
↓
About Page
```

```text
GET /users
↓
Users Page
```

And an unknown route:

```text
GET /something
↓
404 - Page Not Found
```

---

# 8. Why Do I Need `404`?

What happens if someone requests:

```text
GET /random
```

and I haven't created a route for it?

My server needs to tell the client:

> "I don't have anything available at this URL."

That's what the `404 Not Found` status code represents.

I can set it using:

```js
res.statusCode = 404;
```

and then send the response:

```js
res.end("404 - Page Not Found");
```

So my routing logic now has two possibilities:

```text
Request
   ↓
Does a matching route exist?
   ↓
 ┌───────────────┐
 │               │
Yes              No
 │               │
 ↓               ↓
Run route       404
 │
 ↓
Response
```

---

# 9. Routing With Different HTTP Methods

Now I can use the same URL for different operations.

For example:

```text
GET /users
POST /users
```

My server can distinguish them using `req.method`.

```js
if (req.method === "GET" && req.url === "/users") {
    res.end("Getting users");
}

else if (req.method === "POST" && req.url === "/users") {
    res.end("Creating a user");
}
```

This is the point where HTTP methods and routing come together.

The server is essentially asking:

```text
What method?
      +
What URL?
      ↓
Which route?
```

---

# 10. The Complete Request Flow

I now want to connect everything together.

Suppose I make this request:

```text
GET /users
```

The flow is:

```text
Browser / Client
       ↓
HTTP Request
       ↓
Node.js HTTP Server
       ↓
req.method
       +
req.url
       ↓
Route Matching
       ↓
GET /users
       ↓
Users Route
       ↓
Route Logic
       ↓
res.end(...)
       ↓
HTTP Response
       ↓
Client
```

This is the basic foundation of backend routing.

---

# 11. What Am I Actually Doing in the Code?

When I write:

```js
if (req.method === "GET" && req.url === "/users") {
    res.end("Getting users");
}
```

I am manually implementing a very simple routing system.

I am saying:

```text
IF
    method is GET
AND
    URL is /users

THEN
    run this code
```

So the `if/else` statements aren't some special Node.js routing feature.

I am simply using normal JavaScript logic to inspect the request and decide what to do.

---

# 12. Why Is This Useful?

At first, this might look like a lot of `if/else` statements.

But it teaches me something important.

A backend server receives **many different requests**.

My application needs some mechanism to map:

```text
Request
   ↓
Route
   ↓
Handler
```

Node's basic `http` module gives me the low-level tools.

I can build the routing logic myself.

Later, frameworks such as Express will give me a much cleaner way to do the same thing.

---

# 13. Why Am I Learning This Before Express?

This is important for my learning.

In Express, I will eventually write something like:

```js
app.get("/users", ...)
app.post("/users", ...)
```

That looks very simple.

But if I learn Express first, I might only memorize:

```text
app.get()
app.post()
app.delete()
```

without understanding the problem these methods are solving.

Right now, I am seeing the lower-level version:

```js
if (req.method === "GET" && req.url === "/users") {
    // handle request
}
```

Express will later make this much cleaner.

So my progression is:

```text
Node HTTP
      ↓
Manual routing
      ↓
Understand the problem
      ↓
Express routing
      ↓
Build proper APIs
```

This is why I am learning routing manually first.

---

# 14. One Important Limitation

My current routing approach is very basic.

Imagine my application eventually has:

```text
GET /users
GET /users/10
GET /users/20
GET /products
GET /products/10
POST /users
PATCH /users/10
DELETE /users/10
...
```

Using a huge chain of `if/else` statements would quickly become difficult to manage.

That's one of the problems that Express helps solve.

But before moving to Express, I want to understand the lower-level concept properly.

---

# My Mental Model

The most important thing I want to remember from this lesson is:

```text
               HTTP REQUEST
                    ↓
             ┌─────────────┐
             │   Method    │
             │     +       │
             │     URL     │
             └──────┬──────┘
                    ↓
              Route Matching
                    ↓
             Matching Handler
                    ↓
              Application Logic
                    ↓
               HTTP Response
```

And in Node.js:

```text
req.method
    ↓
What operation?

req.url
    ↓
Which resource/path?

Together
    ↓
Which route should run?
```

---

# What I Should Know After This Lesson

Before moving forward, I should be able to explain these concepts in my own words:

### HTTP Method

A method describes the intention of the HTTP request.

```text
GET
POST
PUT
PATCH
DELETE
```

### Routing

Routing determines which code handles a particular request.

### Route

For my current understanding:

```text
Route = HTTP Method + URL
```

### `req.method`

Tells me the HTTP method of the incoming request.

### `req.url`

Tells me the requested URL.

### 404

Means the requested resource/route was not found.

---

# What Comes Next?

I now know **how to identify a request and choose a route**.

But I haven't yet explored the request and response themselves deeply.

For example:

* How do I read request headers?
* How do I set response headers?
* How do I set status codes?
* How does the request body work?
* How do I send JSON?
* How does data actually travel from the client to my server?

That is what I will learn next.

## Next Lesson — L03: Request & Response

I will go deeper into:

```text
Request
├── Method
├── URL
├── Headers
└── Body

Response
├── Status Code
├── Headers
└── Body
```

Once I understand this, I will have a much clearer picture of what is actually happening inside an HTTP API.
