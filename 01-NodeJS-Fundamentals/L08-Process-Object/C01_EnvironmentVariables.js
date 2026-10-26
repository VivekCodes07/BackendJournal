
console.log("Understanding Environment Variables\n");

/*
Imagine I'm building a school management backend. During development,
I want my server to run on port 3000, but when I deploy it, the hosting
platform might provide a different port.

I don't want to edit my JavaScript code every time the configuration
changes. Instead, I can provide environment variables from outside
the application and read them through Node.js.
*/
console.log("PORT:", process.env.PORT);
console.log("NODE_ENV:", process.env.NODE_ENV);

/*
For example, if I set PORT=4000, Node.js reads the value as the
string "4000", not the number 4000.

The Number() function converts that string into a number so I can
use it as a port number. The ?? operator provides 3000 when PORT
is missing or undefined.
*/
const port = Number(process.env.PORT ?? 3000);

console.log("\nSelected port:", port);
console.log("Port type:", typeof port);

/*
Configuration comes from outside my code, so I shouldn't blindly
trust it. Someone could accidentally set PORT to "hello", 0, or
70000, none of which is a valid port for my server.

Checking the value before using it helps me catch configuration
mistakes early instead of debugging confusing errors later.
*/
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be a valid port number");
}

console.log("Port configuration is valid.");

/*
For local development, I can keep settings in a .env file rather
than repeatedly setting environment variables in my terminal.

For example, my .env file can contain:

PORT=4000
NODE_ENV=development

Node.js doesn't automatically load a .env file just because it
exists. I can explicitly load it when starting my program with:

node --env-file=.env C01_EnvironmentVariables.js

If the file contains database credentials or other secrets, I
should add .env to .gitignore so I don't accidentally push those
values to GitHub. A .env file is not encrypted; it simply keeps
configuration separate from my source code.
*/
