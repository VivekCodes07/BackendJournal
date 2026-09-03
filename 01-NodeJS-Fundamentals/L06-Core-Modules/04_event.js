/*
  Node.js follows an event-driven architecture.

  The events module allows us to create
  and handle our own events.

  EventEmitter is the main class
  we use for this.
*/

import { EventEmitter } from "events";

/*
  We create an instance of EventEmitter.

  This object can now listen for events
  and emit events.
*/

const emitter = new EventEmitter();

/*
  on() is used to create an event listener.

  Whenever the "greet" event occurs,
  the callback function will execute.
*/

emitter.on("greet", () => {
  console.log("Hello Vivek!");
});

/*
  emit() is used to trigger an event.

  When "greet" is emitted, the listener
  we created above will execute.
*/

emitter.emit("greet");

/*
  We can also pass data when emitting
  an event.

  The data will be received by the
  callback function of the listener.
*/

emitter.on("userJoined", (username) => {
  console.log(`${username} joined the server!`);
});

emitter.emit("userJoined", "Vivek");

/*
  We can attach multiple listeners
  to the same event.

  All of them will execute when
  the event is emitted.
*/

emitter.on("message", () => {
  console.log("First listener executed.");
});

emitter.on("message", () => {
  console.log("Second listener executed.");
});

emitter.emit("message");

/*
  once() works like on(), but the listener
  will execute only one time.

  Even if we emit the event multiple times,
  the callback will only run once.
*/

emitter.once("login", () => {
  console.log("User logged in!");
});

/*
  The first emit triggers the listener.
*/

emitter.emit("login");

/*
  The second emit does not trigger
  the listener because it already ran once.
*/

emitter.emit("login");
