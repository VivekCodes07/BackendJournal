/*
  The os module is a built-in Node.js module
  that provides information about the operating
  system and the computer running Node.js.
*/

import os from "node:os";

/*
  os.type() returns the operating system name.
*/

console.log("Operating System:", os.type());

/*
  os.platform() returns the platform
  on which Node.js is running.
*/

console.log("Platform:", os.platform());

/*
  os.arch() returns the CPU architecture
  of the system.
*/

console.log("Architecture:", os.arch());

/*
  os.cpus() returns information about
  the CPU cores available on the system.
*/

console.log("CPU Information:", os.cpus());

/*
  Since os.cpus() returns an array,
  we can use .length to find the number
  of CPU cores.
*/

console.log("CPU Cores:", os.cpus().length);

/*
  os.totalmem() returns the total amount
  of system memory in bytes.
*/

console.log("Total Memory:", os.totalmem());

/*
  os.freemem() returns the amount of
  currently available system memory
  in bytes.
*/

console.log("Free Memory:", os.freemem());

/*
  os.homedir() returns the home directory
  of the current user.
*/

console.log("Home Directory:", os.homedir());

/*
  os.userInfo() returns information
  about the current user.
*/

console.log("User Information:", os.userInfo());

/*
  os.uptime() returns how long the system
  has been running, in seconds.
*/

console.log("System Uptime:", os.uptime());
