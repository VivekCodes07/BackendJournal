/*
  The path module is a built-in Node.js module
  used to work with file and directory paths.

  It provides useful methods for creating,
  joining, and analyzing paths.
*/

import path from "node:path";

/*
  path.join() joins multiple path segments
  together and creates a proper path.
*/

const filePath = path.join("users", "vivek", "documents", "file.txt");

console.log(`File Path: ${filePath}`);

/*
  path.resolve() creates an absolute path
  from the given path segments.
*/

const absolutePath = path.resolve("users", "vivek", "documents", "file.txt");

console.log(`Absolute Path: ${absolutePath}`);

/*
  path.basename() returns the last part
  of a path.

  In most cases, this will be the file name.
*/

const fileName = path.basename("/users/vivek/documents/file.txt");

console.log(fileName);

/*
  path.dirname() returns the directory
  part of a path.
*/

const directory = path.dirname("/users/vivek/documents/file.txt");

console.log(directory);

/*
  path.extname() returns the extension
  of a file.
*/

const extension = path.extname("profile.jpg");

console.log(extension);

/*
  path.parse() breaks a path into
  different useful parts such as:

  root
  dir
  base
  ext
  name
*/

const parsedPath = path.parse("/users/vivek/documents/file.txt");

console.log(parsedPath);
