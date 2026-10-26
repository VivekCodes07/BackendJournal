
import http from "node:http";

const server = http.createServer((req, res) => {
  // Request: what the client is asking for
  console.log(`${req.method} ${req.url}`);

  // Response: what the server sends back
  if (req.method === "GET" && req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my Node.js server!");
  } else if (req.method === "GET" && req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is the About page.");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page not found");
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
