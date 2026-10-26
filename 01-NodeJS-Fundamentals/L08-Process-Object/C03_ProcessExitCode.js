
console.log("Understanding Process Exit Codes\n");

/*
Imagine my school management backend needs a database connection
URL before it can work with student records.

If the required configuration is missing, my application should
report the problem instead of pretending everything is fine.

For this example, I'm only checking whether DATABASE_URL exists.
This does not verify that the URL is valid or that the database
server is actually reachable.
*/
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("Error: DATABASE_URL is missing.");

  /*
  An exit code tells the operating system how a program finished.

  By convention, exit code 0 means success, while a non-zero code
  indicates failure. Other programs and automation tools can use
  this result to decide what to do next.

  Setting process.exitCode to 1 marks this run as unsuccessful
  without immediately terminating Node.js.
  */
  process.exitCode = 1;
} else {
  console.log("Database configuration is available.");

  /*
  The required variable exists, so this basic configuration check
  has passed. It doesn't guarantee that the database connection
  itself will succeed.

  I set the exit code to 0 to explicitly report success.
  */
  process.exitCode = 0;
}

/*
The process object also provides information about the running
Node.js application.

process.version tells me which Node.js version is running, while
process.pid gives the operating system's process ID. These details
can be useful when debugging an application.
*/
console.log("\nNode.js version:", process.version);
console.log("Process ID:", process.pid);


/*
Now test the successful configuration check:

$env:DATABASE_URL="mysql://localhost/school_db"
node C03_ProcessExitCode.js
$LASTEXITCODE

Expected exit code: 0. The example only checks whether the variable exists; it doesn't connect to MySQL.
*/