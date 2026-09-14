import http from "node:http";
import fs from "node:fs";

const server = http.createServer((req, res) => {
  console.log("Request received");
  console.log("Request Method: ", req.method);
  console.log("Request Headers: ", req.headers);

  const date = new Date().toLocaleString();
  const content = `New request received at, Date: ${date},\nURL: ${req.url}\n\n`;

  // Explicitly passing 'utf8' fixes the v24 ESM callback positioning bug
  fs.appendFile("Log.txt", content, "utf8", (error) => {
    if (error) {
      console.error("Error writing to file:", error);
    } else {
      console.log("Log appended successfully.");
    }
  });

  res.end("Welcoming you to my first Node Server");
});

server.listen(3000, () => {
  console.log("Server running on PORT: 3000");
});
