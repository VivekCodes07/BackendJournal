import path from "node:path";

/*
  Node.js provides the built-in "path" module
  to work with file and directory paths.

  It helps me:
  - Create paths
  - Convert paths into absolute paths
  - Extract file names and directories
  - Parse paths
  - Format paths
  - Get file extensions
  - Check whether a path is absolute
*/

/*
  1. path.join()

  Combines multiple path segments into a single path.

  It automatically handles the path separators.
*/

const filePath = path.join("02-WorkingWithFiles", "L08-Paths", "app.js");

console.log(`1. File Path: ${filePath}`);

/*
  2. path.resolve()

  Creates an absolute path from the given path segments.

  It starts from the current working directory
  and builds the complete path.
*/

const absoluteFilePath = path.resolve(
  "02-WorkingWithFiles",
  "L08-Paths",
  "app.js",
);

console.log(`2. Absolute File Path: ${absoluteFilePath}`);

/*
  3. path.basename()

  Gives me the last part of a path.

  Usually, this is the file name.
*/

console.log(
  "3. BaseName of Absolute File Path:",
  path.basename(absoluteFilePath),
);

/*
  4. path.dirname()

  Gives me the directory containing the file.
*/

console.log("4. Directory Name of File Path:", path.dirname(filePath));

/*
  5. path.extname()

  Gives me the extension of a file.

  For example:
  app.js -> .js
*/

console.log("5. File Extension:", path.extname(absoluteFilePath));

/*
  6. path.parse()

  Breaks a path into different pieces.

  It gives me:
  - root
  - dir
  - base
  - ext
  - name
*/

console.log("6. Parsing Absolute File Path:\n", path.parse(absoluteFilePath));

/*
  7. path.format()

  Does almost the opposite of path.parse().

  It takes individual path pieces
  and creates a complete path from them.
*/

const filePath2 = path.format({
  dir: "/BackendJournal/L08-Paths",
  name: "app",
  ext: ".js",
});

console.log("7. Formatting filePath2:", filePath2);

/*
  8. path.isAbsolute()

  Checks whether a path is an absolute path.

  Returns:
  true  -> absolute path
  false -> relative path
*/

console.log("8. Is Absolute Path:", path.isAbsolute(absoluteFilePath));

console.log("   Is Relative Path Absolute:", path.isAbsolute(filePath));

/*
  9. path.normalize()

  Normalizes a path by resolving unnecessary
  "." and ".." segments and duplicate separators.
*/

const messyPath = "02-WorkingWithFiles/L08-Paths/../L08-Paths/app.js";

console.log("9. Normalized Path:", path.normalize(messyPath));

/*
  10. path.sep

  Gives me the platform-specific path separator.

  Windows -> \
  Linux/macOS -> /
*/

console.log("10. Path Separator:", path.sep);

/*
  11. path.delimiter

  Gives me the platform-specific delimiter
  used for environment variables such as PATH.

  Windows -> ;
  Linux/macOS -> :
*/

console.log("11. Path Delimiter:", path.delimiter);
