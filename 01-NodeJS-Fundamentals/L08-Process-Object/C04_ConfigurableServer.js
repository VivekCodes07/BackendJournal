
import http from "node:http";

/*
In my previous HTTP lesson, I learned how to create a server
and send responses to clients.

Now imagine I'm running my school management backend locally.
I want to use port 3000 by default, but I might need port 4000
if another application is already using port 3000.

Instead of changing my code, I'll read the port from an environment
variable and fall back to 3000 when that variable isn't provided.
*/
const PORT = Number(process.env.PORT ?? 3000);

/*
Environment variables are external input, so I should validate
their values before using them.

A port must be an integer between 1 and 65535. For example,
"hello", 0, and 70000 should not be accepted as valid ports.

Checking this before starting the server makes configuration
errors easier to identify.
*/
if (!Number.isInteger(PORT) || PORT < 1 || PORT > 65535) {
  throw new Error("PORT must be a valid port number");
}

/*
createServer() registers a callback that Node.js runs whenever
a client sends an HTTP request.

The req object contains information about the incoming request,
such as its HTTP method and URL. The res object lets me construct
the response that I want to send back to the client.

For now, I'll return the same response for every URL because
this lesson focuses on process configuration rather than routing.
*/
const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");

  /*
  Setting the status code tells the client that the request
  succeeded. The Content-Type header tells the client that the
  response body contains plain text.

  res.end() sends the response body and marks the response as
  complete, so the client can finish receiving it.
  */
  res.end("Welcome to my school management backend!");
});

/*
server.listen() starts listening for incoming connections on
the selected port.

If PORT is not provided, the server uses 3000. If I set PORT=4000,
the same code starts listening on port 4000 instead.

The callback runs once the server has successfully started listening.
*/
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);

  /*
  These values help me identify the runtime and process when
  debugging my application.
  */
  console.log("Node.js version:", process.version);
  console.log("Process ID:", process.pid);
});


/*
Run with a different port:
$env:PORT="4000"
node C04_ConfigurableServer.js
*/