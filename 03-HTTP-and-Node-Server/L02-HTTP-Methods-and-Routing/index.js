import http from "node:http";

// Creating my HTTP server
// req = request coming from the client
// res = response I will send back
const server = http.createServer((req, res) => {

    // Checking both the HTTP method and URL
    // because the same URL can be used for different operations
    if (req.method === "GET" && req.url === "/") {
        res.statusCode = 200;
        res.end("Home Page");
    }

    // Handling the GET request for the /about route
    else if (req.method === "GET" && req.url === "/about") {
        res.statusCode = 200;
        res.end("About Page");
    }

    // Handling the GET request for /users
    else if (req.method === "GET" && req.url === "/users") {
        res.statusCode = 200;
        res.end("Users Page");
    }

    // POST means I want to create a new user
    else if (req.method === "POST" && req.url === "/users") {
        res.statusCode = 201;
        res.end("User created");
    }

    // PUT means I want to replace the user
    else if (req.method === "PUT" && req.url === "/users") {
        res.statusCode = 200;
        res.end("User replaced");
    }

    // PATCH means I want to partially update the user
    else if (req.method === "PATCH" && req.url === "/users") {
        res.statusCode = 200;
        res.end("User updated");
    }

    // DELETE means I want to remove the user
    else if (req.method === "DELETE" && req.url === "/users") {
        res.statusCode = 200;
        res.end("User deleted");
    }

    // If no route matches, I send a 404 response
    else {
        res.statusCode = 404;
        res.end("404 - Route not found");
    }
});

// Starting my server on port 3000
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});