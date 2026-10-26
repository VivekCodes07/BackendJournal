
console.log("Understanding Command-Line Arguments\n");

/*
Imagine I want to write a school management script that displays
details about a particular student.

I could hardcode the student's name in my program, but then I'd
have to edit the file every time I wanted to check another student.

Instead, I can pass the student's details when running the script.
Node.js makes these arguments available through process.argv.
*/
console.log("Node executable:", process.argv[0]);
console.log("Script path:", process.argv[1]);

/*
The first two entries in process.argv contain the Node.js
executable path and the path of the JavaScript file.

My own arguments begin at index 2. For example, when I run:

node C02_CommandLineArguments.js Vivek CSE

process.argv[2] contains "Vivek", and process.argv[3]
contains "CSE".
*/
const name = process.argv[2] ?? "Guest";
const course = process.argv[3] ?? "Computer Science";

console.log("\nStudent Details");
console.log("Name:", name);
console.log("Course:", course);

/*
The ?? operator provides default values if I don't supply
the corresponding arguments.

For example, running the script without any extra arguments
will use "Guest" as the name and "Computer Science" as the course.

This approach is useful for scripts that generate reports,
process files, or perform tasks based on user-provided input.
*/
