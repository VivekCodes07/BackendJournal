/*
  The fs (File System) module is a built-in
  Node.js module used to work with files
  and directories.

  We are using fs/promises so that we can
  work with async/await.
*/

import fs from "node:fs/promises";

/*
  writeFile() creates a file and writes
  data into it.

  If the file already exists, its old
  content will be replaced.
*/

await fs.writeFile("notes.txt", "Learning Node.js Core Modules");

console.log("File created and data written!");

/*
  readFile() reads the contents of a file.

  "utf-8" tells Node.js to return the
  file content as a string.
*/

const data = await fs.readFile("notes.txt", "utf-8");

console.log(data);

/*
  appendFile() adds new content to an
  existing file.

  Unlike writeFile(), it does not remove
  the existing content.
*/

await fs.appendFile("notes.txt", "\nI am learning the fs module.");

console.log("Content appended!");

/*
  stat() gives us information about
  a file or directory.

  We can use methods like isFile()
  and isDirectory() on the result.
*/

const info = await fs.stat("notes.txt");

console.log(info);

console.log("Is it a file?", info.isFile());
console.log("Is it a directory?", info.isDirectory());

/*
  mkdir() creates a new directory.

  recursive: true allows Node.js to create
  parent directories if they don't exist.
*/

await fs.mkdir("test-folder", { recursive: true });

console.log("Directory created!");

/*
  readdir() reads the contents of a directory.

  It returns the names of the files and
  folders present inside that directory.
*/

const files = await fs.readdir(".");

console.log(files);

/*
  rename() changes the name of a file
  or moves it to another location.
*/

await fs.rename("notes.txt", "my-notes.txt");

console.log("File renamed!");

/*
  unlink() deletes a file from
  the file system.
*/

await fs.unlink("my-notes.txt");

console.log("File deleted!");
